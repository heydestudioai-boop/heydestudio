import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

async function source(path) {
  return readFile(join(root, path), 'utf8');
}

test('local commercial pages expose the approved audit CTA before deeper detail', async () => {
  const [plans, studio, cases, contact] = await Promise.all([
    source('app/(es)/planes/page.tsx'),
    source('app/(es)/estudio/page.tsx'),
    source('app/(es)/casos/page.tsx'),
    source('components/pages/BrandInquiryPageContent.tsx'),
  ]);

  assert.match(plans, /href="\/audit" label="Pedir auditoría gratuita"/);
  assert.match(plans, /href="#planes-mensuales" label="Comparar planes"/);
  assert.match(studio, /href="\/audit" label="Pedir auditoría gratuita"/);
  assert.match(cases, /href="\/audit" label="Pedir auditoría"/);
  assert.match(contact, /href="#project-inquiry" label="Start the project brief"/);
});

test('Spanish verticals prioritize audit and retain WhatsApp as a secondary contact path', async () => {
  const vertical = await source('components/pages/LocalVerticalPage.tsx');

  assert.ok(vertical.indexOf('href={primaryCta.href}') < vertical.indexOf('quickFacts.map'));
  assert.equal((vertical.match(/href=\{primaryCta\.href\}/g) ?? []).length, 2);
  assert.match(vertical, /model\.locale === 'es'/);
  assert.match(vertical, /href="https:\/\/wa\.me\/34671141135"/);
  assert.match(vertical, /variant="secondary"/);
  assert.doesNotMatch(vertical, /primaryCta\.external \? primaryCta\.href : 'https:\/\/wa\.me/);
});

test('the cases page states the business and HEYDE Lab hierarchy without fabricated proof', async () => {
  const cases = await source('app/(es)/casos/page.tsx');

  assert.match(cases, /Cómo trabajo con negocios\. Qué exploro en HEYDE Lab\./);
  assert.match(cases, /HEYDE Lab no representa clientes ni resultados comerciales/);
  assert.match(cases, /sin atribuir nombres, resultados ni métricas/);
});

test('heavy autoplay media is deferred and the home hero is desktop-only video', async () => {
  const [deferred, home, cases, brands] = await Promise.all([
    source('components/DeferredAutoplayVideo.tsx'),
    source('components/pages/HomePageContent.tsx'),
    source('app/(es)/casos/page.tsx'),
    source('app/(en)/marcas/page.tsx'),
  ]);

  assert.match(deferred, /IntersectionObserver/);
  assert.match(deferred, /requestIdleCallback/);
  assert.match(home, /posterPriority/);
  assert.match(home, /desktopOnly/);
  assert.match(home, /absoluteFill/);
  for (const page of [home, cases, brands]) {
    assert.match(page, /DeferredAutoplayVideo/);
    assert.doesNotMatch(page, /<video\b/);
  }
});

test('SEO intent is explicit on Home and Cases without competing local photography keywords', async () => {
  const seo = await source('lib/seo.ts');

  assert.match(seo, /Fotografía, vídeo y redes sociales en Toledo \| HEYDE Studio/);
  assert.match(seo, /Proceso de producción audiovisual y HEYDE Lab \| HEYDE Studio/);
  assert.match(seo, /proyectos autoiniciados de HEYDE Lab, siempre separados del trabajo de cliente/);
  assert.doesNotMatch(seo, /keywords:/);
});

test('responsive editorial images declare their rendered layout sizes', async () => {
  const [home, studio, cases, brands] = await Promise.all([
    source('components/pages/HomePageContent.tsx'),
    source('app/(es)/estudio/page.tsx'),
    source('app/(es)/casos/page.tsx'),
    source('app/(en)/marcas/page.tsx'),
  ]);

  assert.ok((home.match(/sizes=/g) ?? []).length >= 2);
  assert.match(home, /posterSizes="100vw"/);
  assert.match(studio, /sizes="\(min-width: 768px\) 40vw, 100vw"/);
  assert.match(cases, /sizes="\(min-width: 768px\) 33vw, 100vw"/);
  assert.match(brands, /sizes="\(min-width: 768px\) 33vw, 100vw"/);
});
