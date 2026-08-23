import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import {
  aiPolicy,
  commercialConditions,
  launchOffer,
  rightsPolicy,
} from '../lib/canonical.ts';
import { buildAuditAnalyticsPayload } from '../lib/auditAnalytics.ts';
import { buildBrandInquiryAnalyticsPayload } from '../lib/brandInquiryAnalytics.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

async function source(path) {
  return readFile(join(root, path), 'utf8');
}

test('legal routes are Spanish server content with their own canonicals', async () => {
  const legal = await source('components/pages/LegalPageContent.tsx');
  const seo = await source('lib/seo.ts');
  const cookiesPage = await source('app/(es)/cookies/page.tsx');

  assert.doesNotMatch(legal, /'use client'|useLanguage/);
  assert.match(legal, /Política de privacidad/);
  assert.match(legal, /Términos de uso/);
  assert.match(legal, /Política de cookies/);
  assert.match(seo, /path: '\/privacy'/);
  assert.match(seo, /path: '\/terms'/);
  assert.match(cookiesPage, /pageSeo\.cookies/);
  assert.match(seo, /path: '\/cookies'/);
});

test('structured data does not turn a service area into an unverified legal address', async () => {
  const schema = await source('components/layout/SiteRoot.tsx');

  assert.match(schema, /areaServed: \['Toledo', 'Castilla-La Mancha', 'Madrid', 'Costa Blanca'\]/);
  assert.doesNotMatch(schema, /PostalAddress|addressLocality|addressCountry/);
});

test('the shared shell does not nest the page main landmark', async () => {
  const shell = await source('components/layout/SiteRoot.tsx');
  const pages = await Promise.all([
    source('components/pages/HomePageContent.tsx'),
    source('components/pages/AuditPageContent.tsx'),
    source('components/pages/BrandInquiryPageContent.tsx'),
    source('components/pages/LegalPageContent.tsx'),
  ]);

  assert.doesNotMatch(shell, /<main className="pt-16"/);
  for (const page of pages) assert.match(page, /<main\b/);
});

test('global accessibility styles preserve focus and reduced-motion preferences', async () => {
  const styles = await source('app/globals.css');

  assert.match(styles, /:focus-visible/);
  assert.match(styles, /outline: 3px solid currentColor/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /scroll-behavior: auto !important/);
  assert.match(styles, /transition-duration: 0\.01ms !important/);
});

test('privacy text separates the two current funnels and names only active services', async () => {
  const legal = await source('components/pages/LegalPageContent.tsx');

  for (const expected of [
    '/audit',
    '/contact',
    'HubSpot',
    'Brevo',
    'Google Analytics',
    'Vercel',
    'WhatsApp',
  ]) {
    assert.match(legal, new RegExp(expected.replace('/', '\\/')));
  }

  assert.match(legal, /No se convierte automáticamente en una auditoría local ni\s+crea un Deal/);
  assert.match(legal, /no se envían como parámetros de esos\s+eventos/);
  assert.doesNotMatch(
    legal,
    /Calendly|questionnaire|Visual System Audit|resource|template|follow-up/i
  );
});

test('terms remain subordinate to the contract and consume canonical conditions', async () => {
  const legal = await source('components/pages/LegalPageContent.tsx');

  assert.match(legal, /No sustituyen un presupuesto ni el contrato/);
  assert.match(legal, /commercialConditions\[0\]/);
  assert.match(legal, /commercialConditions\[1\]/);
  assert.match(legal, /commercialConditions\[2\]/);
  assert.match(legal, /rightsPolicy/);
  assert.match(legal, /aiPolicy\.short/);
  assert.match(legal, /aiPolicy\.disclosure/);
  assert.match(legal, /launchOffer\.active/);

  assert.equal(commercialConditions[0].includes('3 meses'), true);
  assert.equal(commercialConditions[0].includes('30 días'), true);
  assert.equal(commercialConditions[1].includes('IVA'), true);
  assert.equal(rightsPolicy.includes('brutos y proyectos editables'), true);
  assert.equal(aiPolicy.disclosure.includes('inducir a error'), true);
  assert.equal(launchOffer.active, true);
});

test('analytics consent gates GA loading and revocation disables and clears identifiers', async () => {
  const consent = await source('components/CookieConsentManager.tsx');

  assert.match(consent, /if \(!gaId \|\| !enabled\) return null/);
  assert.match(consent, /googletagmanager\.com\/gtag\/js/);
  assert.match(consent, /ga-disable-/);
  assert.match(consent, /cookieNames = \['?_ga'?, '?_gid'?, '?_gat'?\]/);
  assert.match(consent, /heyde-open-cookie-settings/);
  assert.match(consent, /choose\(false\)/);
  assert.match(consent, /choose\(true\)/);
  assert.doesNotMatch(consent, /Calendly|iframe/i);
});

test('first-party funnel analytics payloads are fixed and contain no PII', () => {
  assert.deepEqual(buildAuditAnalyticsPayload('es'), {
    event_category: 'audit_funnel',
    page_path: '/audit',
    locale: 'es',
  });
  assert.deepEqual(buildBrandInquiryAnalyticsPayload(), {
    event_category: 'brand_inquiry',
    page_path: '/contact',
    locale: 'en',
  });

  for (const payload of [
    buildAuditAnalyticsPayload('es'),
    buildBrandInquiryAnalyticsPayload(),
  ]) {
    for (const forbidden of ['email', 'name', 'phone', 'company', 'brief', 'website']) {
      assert.equal(Object.hasOwn(payload, forbidden), false);
    }
  }
});
