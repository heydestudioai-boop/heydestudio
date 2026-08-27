import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getLanguagePair, LANGUAGE_PAIRS } from '../lib/languageRoutes.ts';
import { calculateCustomerEquivalent } from '../lib/planEquivalence.ts';
import { monthlyPlans } from '../lib/canonical.ts';
import {
  COMMERCIAL_ANALYTICS_EVENTS,
  buildCommercialAnalyticsPayload,
  trackCommercialEvent,
} from '../lib/commercialAnalytics.ts';

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('language controls resolve only the four reciprocal pairs', () => {
  assert.equal(LANGUAGE_PAIRS.length, 4);
  for (const pair of LANGUAGE_PAIRS) {
    assert.equal(getLanguagePair(pair.es), pair);
    assert.equal(getLanguagePair(pair.en), pair);
    assert.notEqual(pair.es, pair.en);
  }
  for (const path of ['/', '/planes', '/audit', '/casos', '/estudio', '/faq', '/hosteleria', '/bodegas', '/marcas', '/contact', '/en/planes']) {
    assert.equal(getLanguagePair(path), undefined);
  }
});

test('commercial event payloads cannot carry form data, arbitrary paths or labels', () => {
  assert.deepEqual(buildCommercialAnalyticsPayload('cta_auditoria_click', '/planes', 'hero'), {
    source_path: '/planes', cta_location: 'hero',
  });
  assert.deepEqual(buildCommercialAnalyticsPayload('cta_auditoria_click', '/audit?email=qa@example.invalid', 'qa@example.invalid'), {
    source_path: 'other', cta_location: 'content',
  });
  for (const event of COMMERCIAL_ANALYTICS_EVENTS.filter(event => event !== 'cta_auditoria_click')) {
    assert.deepEqual(buildCommercialAnalyticsPayload(event, 'any-user-value', 'any-user-value'), {});
  }
});

test('commercial events are discarded before consent, after revocation and with invalid consent', () => {
  const original = globalThis.window;
  let calls = 0;
  try {
    for (const raw of [null, 'invalid', '{}', '{"analytics":true}', '{"analytics":false,"decidedAt":"2026-08-27"}']) {
      globalThis.window = { localStorage: { getItem: () => raw }, gtag: () => calls++ };
      assert.equal(trackCommercialEvent('telefono_click'), false);
    }
    assert.equal(calls, 0);
  } finally {
    if (original === undefined) delete globalThis.window;
    else globalThis.window = original;
  }
});

test('accepted analytics reuses gtag with a closed event list and minimal payload', () => {
  const original = globalThis.window;
  const calls = [];
  try {
    globalThis.window = {
      localStorage: { getItem: () => '{"analytics":true,"decidedAt":"2026-08-27"}' },
      gtag: (...args) => calls.push(args),
    };
    assert.equal(trackCommercialEvent('cta_auditoria_click', '/planes', 'hero'), true);
    assert.equal(trackCommercialEvent('whatsapp_click'), true);
    assert.equal(trackCommercialEvent('unknown_event'), false);
    assert.deepEqual(calls, [
      ['event', 'cta_auditoria_click', {source_path:'/planes', cta_location:'hero'}],
      ['event', 'whatsapp_click', {}],
    ]);
  } finally {
    if (original === undefined) delete globalThis.window;
    else globalThis.window = original;
  }
});

test('equivalence uses the canonical price and rounds upward without invalid arithmetic', () => {
  const price = monthlyPlans.find(plan => plan.id === 'growth').price;
  assert.equal(calculateCustomerEquivalent(price, '100'), 9);
  assert.equal(calculateCustomerEquivalent(price, '89'), 10);
  assert.equal(calculateCustomerEquivalent(price, '120,50'), 8);
  assert.equal(calculateCustomerEquivalent(price, '120.50'), 8);
  assert.equal(calculateCustomerEquivalent(price, '1000'), 1);
  for (const invalid of ['', ' ', '0', '-5', 'NaN', 'Infinity', '1e3', '1.2.3', '10.001', '<script>']) {
    assert.equal(calculateCustomerEquivalent(price, invalid), null);
  }
  assert.equal(calculateCustomerEquivalent(NaN, '10'), null);
});

test('calculator input is ephemeral and not part of analytics, a form or a backend', async () => {
  const [calculator, plans] = await Promise.all([source('components/PlanEquivalence.tsx'), source('app/(es)/planes/page.tsx')]);
  assert.match(plans, /price=\{growthPlan\.price\} priceLabel=\{growthPlan\.priceLabel\}/);
  assert.match(calculator, /no una estimación de resultados/);
  assert.match(calculator, /Redondeo al cliente entero superior/);
  assert.doesNotMatch(calculator, /fetch\(|localStorage|sessionStorage|gtag|track.*Event|<form|\b890\b/);
});

test('cookie layout retains all consent choices, with named region and touch targets', async () => {
  const consent = await source('components/CookieConsentManager.tsx');
  assert.match(consent, /role="region"/);
  assert.match(consent, /aria-labelledby="cookie-settings-title"/);
  assert.match(consent, /grid grid-cols-3 gap-2/);
  assert.ok((consent.match(/min-h-11/g) ?? []).length >= 4);
  assert.match(consent, /choose\(false\)/);
  assert.match(consent, /choose\(true\)/);
  assert.match(consent, /choose\(analytics\)/);
  assert.match(consent, /if \(!gaId \|\| !enabled\) return null/);
});

test('skip link targets the actual focusable main in both languages; hero is eager when prioritized', async () => {
  const shell = await source('components/layout/SiteRoot.tsx');
  assert.match(shell, /href="#main-content" className="skip-link"/);
  assert.match(shell, /'Skip to content' : 'Saltar al contenido'/);
  for (const page of ['HomePageContent', 'AuditPageContent', 'BrandInquiryPageContent', 'LegalPageContent', 'LocalVerticalPage']) {
    assert.match(await source(`components/pages/${page}.tsx`), /<main id="main-content" tabIndex=\{-1\}/);
  }
  assert.match(await source('components/DeferredAutoplayVideo.tsx'), /loading=\{posterPriority \? 'eager' : 'lazy'\}/);
  assert.match(shell, /telephone: false/);
  assert.match(shell, /founder: \{ '@id': `\$\{siteUrl\}\/#oliver-heyde` \}/);
});

test('metadata alternates are conditional on a real language pair and keywords are absent', async () => {
  const seo = await source('lib/seo.ts');
  assert.doesNotMatch(seo, /keywords/);
  assert.match(seo, /alternateLocale: languages/);
  const toggle = await source('components/layout/LanguageToggle.tsx');
  assert.match(toggle, /if \(!pair\) return null/);
  assert.match(toggle, /<Link/);
  assert.doesNotMatch(toggle, /router\.push|setLanguage/);
});

test('audit tracking starts only on a field and submit event follows backend success', async () => {
  const audit = await source('components/pages/AuditPageContent.tsx');
  assert.match(audit, /event\.target instanceof HTMLInputElement/);
  assert.match(audit, /event\.target\.name === 'fax'/);
  assert.match(audit, /if \(started\.current\) return/);
  assert.equal((audit.match(/trackCommercialEvent\('form_auditoria_submit'\)/g) ?? []).length, 1);
  assert.ok(audit.indexOf("trackCommercialEvent('form_auditoria_submit')") > audit.indexOf('if (!response.ok)'));
});
