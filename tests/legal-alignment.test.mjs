import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
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

async function sourceFilesUnder(relativeDirectory) {
  const entries = await readdir(join(root, relativeDirectory), { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = join(relativeDirectory, entry.name);
      if (entry.isDirectory()) return sourceFilesUnder(relativePath);
      return /\.[cm]?[jt]sx?$/.test(entry.name) ? [relativePath] : [];
    })
  );
  return files.flat();
}

test('legal routes are static server content in Spanish and English with reciprocal SEO', async () => {
  const legal = await source('components/pages/LegalPageContent.tsx');
  const seo = await source('lib/seo.ts');
  const cookiesPage = await source('app/(es)/cookies/page.tsx');
  const englishPages = await Promise.all([
    source('app/(en)/en/privacy/page.tsx'),
    source('app/(en)/en/terms/page.tsx'),
    source('app/(en)/en/cookies/page.tsx'),
  ]);

  assert.doesNotMatch(legal, /'use client'|useLanguage/);
  assert.match(legal, /Política de privacidad/);
  assert.match(legal, /Términos de uso/);
  assert.match(legal, /Política de cookies/);
  assert.match(legal, /Privacy policy/);
  assert.match(legal, /Terms of use/);
  assert.match(legal, /Cookie policy/);
  assert.match(seo, /path: '\/privacy'/);
  assert.match(seo, /path: '\/terms'/);
  assert.match(cookiesPage, /pageSeo\.cookies/);
  assert.match(seo, /path: '\/cookies'/);
  assert.match(seo, /path: '\/en\/privacy'/);
  assert.match(seo, /path: '\/en\/terms'/);
  assert.match(seo, /path: '\/en\/cookies'/);
  assert.match(seo, /'x-default': '\/privacy'/);
  assert.match(seo, /'x-default': '\/terms'/);
  assert.match(seo, /'x-default': '\/cookies'/);
  for (const page of englishPages) assert.match(page, /locale="en"/);
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

  assert.match(legal, /Ninguno crea automáticamente un Deal/);
  assert.match(legal, /no contienen valores de formulario ni PII/);
  assert.doesNotMatch(legal, /Calendly/i);
  assert.doesNotMatch(legal, /questionnaire|Visual System Audit|resource|template|follow-up/i);
});

test('owner decisions define legal bases, marketing boundaries and retention in both languages', async () => {
  const legal = await source('components/pages/LegalPageContent.tsx');

  for (const expected of [
    'medidas precontractuales',
    'ejecución del contrato',
    'cumplimiento de obligaciones legales',
    'interés legítimo',
    'consentimiento separado y explícito',
    'máximo 12 meses',
    '6 años',
    'pre-contractual steps',
    'performance of a contract',
    'compliance with legal obligations',
    'legitimate interest',
    'no more than 12 months',
    '6 years',
  ]) {
    assert.match(legal, new RegExp(expected.replaceAll(' ', '\\s+')));
  }

  assert.match(legal, /no te incorpora a una newsletter/);
  assert.match(legal, /does not subscribe you to a newsletter/);
  for (const field of ['LEGAL_NAME', 'NIF', 'LEGAL_ADDRESS']) {
    assert.equal(legal.includes(`<${field}>`), false);
  }
});

test('legal identity is complete in six legal pages and isolated from non-legal runtime', async () => {
  const legalPath = 'components/pages/LegalPageContent.tsx';
  const legal = await source(legalPath);
  const identity = legal.match(
    /const legalOwner = \{\s*name: '([^']+)',\s*taxId: '([^']+)',\s*address: '([^']+)',\s*email: '([^']+)'/s
  );

  assert.ok(identity, 'legal owner data must be defined only in the legal component');
  const [, name, taxId, address, email] = identity;
  assert.ok(name.length > 0);
  assert.ok(taxId.length > 0);
  assert.ok(address.length > 0);
  assert.equal(email, 'contact@heydestudio.com');
  assert.equal((legal.match(/<LegalOwnerIdentity locale="es" \/>/g) ?? []).length, 3);
  assert.equal((legal.match(/<LegalOwnerIdentity locale="en" \/>/g) ?? []).length, 3);

  const runtimePaths = (
    await Promise.all(['app', 'components', 'lib'].map(sourceFilesUnder))
  ).flat();
  const nonLegalSources = await Promise.all(
    runtimePaths.filter((path) => path.replaceAll('\\', '/') !== legalPath).map(source)
  );

  for (const value of [name, taxId, address]) {
    for (const runtimeSource of nonLegalSources) assert.equal(runtimeSource.includes(value), false);
  }
});

test('provider roles and transfer limits are evidence-based rather than account assumptions', async () => {
  const legal = await source('components/pages/LegalPageContent.tsx');

  assert.match(legal, /Vercel.*encargado/s);
  assert.match(legal, /HubSpot.*SCC/s);
  assert.match(legal, /Brevo.*Francia, Alemania y Bélgica/s);
  assert.match(legal, /Google Analytics 4.*ajustes de compartición/s);
  assert.match(legal, /región real de la cuenta HEYDE no está verificada/);
  assert.match(legal, /contractual settings must be checked before Production/);
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
  assert.match(legal, /Se aplica la legislación española/);
  assert.match(legal, /Spanish law applies/);
  assert.match(legal, /sin imponer con\s+carácter universal los tribunales de Toledo/);
  assert.match(legal, /does not impose Toledo courts universally/);
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
  assert.match(consent, /language === 'EN' \? '\/en\/cookies' : '\/cookies'/);
  assert.doesNotMatch(consent, /Calendly|iframe/i);
});

test('English layouts, footer and form link to English legal information', async () => {
  const language = await source('lib/language.tsx');
  const footer = await source('components/layout/Footer.tsx');
  const brandForm = await source('components/pages/BrandInquiryPageContent.tsx');
  const auditForm = await source('components/pages/AuditPageContent.tsx');
  const routes = await source('lib/routePolicy.ts');

  assert.match(language, /pathname\.startsWith\('\/en\/'\)/);
  for (const route of ['/en/privacy', '/en/terms', '/en/cookies']) {
    const pattern = new RegExp(route.replaceAll('/', '\\/'));
    assert.match(footer, pattern);
    assert.match(routes, pattern);
  }
  assert.match(brandForm, /href="\/en\/privacy"/);
  assert.match(brandForm, /I request that HEYDE Studio use these details/);
  assert.match(auditForm, /href="\/privacy"/);
  assert.match(auditForm, /Solicito que HEYDE Studio tramite estos datos/);
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
