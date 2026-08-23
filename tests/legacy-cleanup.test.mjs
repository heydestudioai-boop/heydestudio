import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import {
  FINAL_INDEXABLE_ROUTES,
  GONE_ROUTES,
  LEGACY_REDIRECTS,
} from '../lib/routePolicy.ts';
import { canonicalBrand } from '../lib/canonical.ts';
import { GET as getGoneArticle } from '../app/(es)/blog/luxury-brands-scale-production/route.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const expectedRedirects = [
  ['/pricing', '/planes'],
  ['/about', '/estudio'],
  ['/work', '/casos'],
  ['/services', '/marcas'],
  ['/pricing/avatar-system', '/marcas'],
  ['/pricing/image', '/marcas'],
  ['/pricing/video-reel', '/marcas'],
  ['/pricing/campaign', '/marcas'],
  ['/pricing/system-infrastructure', '/marcas'],
  ['/how-we-work', '/estudio#como-trabajo'],
  ['/process', '/estudio#como-trabajo'],
  ['/audit-questionnaire', '/audit'],
  ['/resources', '/audit'],
  ['/system-documentation-template', '/audit'],
  ['/blog/building-visual-systems-fashion-playbook', '/marcas'],
  ['/blog/why-ai-fashion-images-fail', '/marcas'],
];

const retiredEndpointFiles = [
  'app/api/audit/questionnaire/route.ts',
  'app/api/audit/webhooks/calendly/route.ts',
  'app/api/calendly/sync/route.ts',
  'app/api/download/template/route.ts',
  'app/api/emails/send/route.ts',
  'app/api/followups/run/route.ts',
  'app/api/hubspot/deals/update-stage/route.ts',
  'app/api/internal/audit/brevo-test/route.ts',
  'app/api/lead-capture/route.ts',
  'app/api/lead-magnet/route.ts',
  'app/api/newsletter/subscribe/route.ts',
  'app/api/template-download/submit/route.ts',
  'app/api/test/email/route.ts',
];

const activeEndpointFiles = [
  'app/api/audit/requests/route.ts',
  'app/api/contact/submit/route.ts',
  'app/api/hubspot/health/route.ts',
  'app/api/brevo/health/route.ts',
  'app/api/internal/audit/create-proposal-deal/route.ts',
];

const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx']);

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await sourceFiles(path)));
    } else if (sourceExtensions.has(extname(entry.name))) {
      files.push(path);
    }
  }

  return files;
}

async function runtimeSources() {
  const directories = ['app', 'components', 'lib'];
  const files = (
    await Promise.all(directories.map((directory) => sourceFiles(join(root, directory))))
  ).flat();

  return Promise.all(
    files
      .filter((path) => !path.endsWith(join('lib', 'routePolicy.ts')))
      .map(async (path) => ({
        path: relative(root, path),
        source: await readFile(path, 'utf8'),
      }))
  );
}

test('legacy URLs redirect directly to their approved canonical destinations', () => {
  assert.deepEqual(
    LEGACY_REDIRECTS.map(({ source, destination }) => [source, destination]),
    expectedRedirects
  );
  assert.equal(LEGACY_REDIRECTS.every(({ permanent }) => permanent === true), true);

  const legacySources = new Set(LEGACY_REDIRECTS.map(({ source }) => source));
  const finalPaths = new Set(FINAL_INDEXABLE_ROUTES);

  for (const { destination } of LEGACY_REDIRECTS) {
    const destinationPath = destination.split('#')[0];
    assert.equal(legacySources.has(destinationPath), false, `${destination} creates a redirect chain`);
    assert.equal(finalPaths.has(destinationPath), true, `${destination} is not a final indexable route`);
  }
});

test('the fabricated Soleá article is the sole explicit 410 route', async () => {
  assert.deepEqual(GONE_ROUTES, ['/blog/luxury-brands-scale-production']);

  const response = getGoneArticle();
  assert.equal(response.status, 410);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.equal(await response.text(), 'Gone');
});

test('the sitemap is driven only by final routes and HEYDE Lab projects', async () => {
  const sitemapSource = await readFile(join(root, 'app/sitemap.ts'), 'utf8');
  assert.match(sitemapSource, /FINAL_INDEXABLE_ROUTES/);
  assert.match(sitemapSource, /labProjects/);
  assert.doesNotMatch(sitemapSource, /articles|LEGACY_REDIRECTS|GONE_ROUTES/);

  const legacySources = new Set(LEGACY_REDIRECTS.map(({ source }) => source));
  assert.equal(FINAL_INDEXABLE_ROUTES.some((route) => legacySources.has(route)), false);
  assert.equal(FINAL_INDEXABLE_ROUTES.some((route) => GONE_ROUTES.includes(route)), false);
});

test('canonical host and structured data represent the current studio without fake proof', async () => {
  assert.equal(canonicalBrand.siteUrl, 'https://www.heydestudio.com');

  const schemaSource = await readFile(join(root, 'components/layout/SiteRoot.tsx'), 'utf8');
  const faqSource = await readFile(join(root, 'app/(es)/faq/page.tsx'), 'utf8');

  assert.match(schemaSource, /Fotografía, vídeo y redes para negocios locales/);
  assert.match(schemaSource, /`\$\{siteUrl\}\/estudio`/);
  assert.doesNotMatch(schemaSource, /aggregateRating|review|award|`\$\{siteUrl\}\/about`/i);
  assert.match(faqSource, /'@type': 'FAQPage'/);
  assert.match(faqSource, /localFaqSections/);
});

test('retired endpoints are absent while current funnels and health checks remain', () => {
  for (const path of retiredEndpointFiles) {
    assert.equal(existsSync(join(root, path)), false, `${path} should be retired`);
  }

  for (const path of activeEndpointFiles) {
    assert.equal(existsSync(join(root, path)), true, `${path} must remain available`);
  }
});

test('active runtime has no internal links to legacy destinations', async () => {
  const legacyLinks = expectedRedirects.map(([source]) => source);

  for (const { path, source } of await runtimeSources()) {
    for (const legacyLink of legacyLinks) {
      assert.equal(
        source.includes(`'${legacyLink}'`) || source.includes(`\"${legacyLink}\"`),
        false,
        `${path} links to ${legacyLink}`
      );
    }
  }
});

test('known fabricated proof and legacy positioning cannot ship in runtime', async () => {
  const forbidden = [
    /AI Visual Systems/i,
    /Visual System Audit/i,
    /visual bottleneck/i,
    /Identity Lock/i,
    /Avatar System/i,
    /Visual Infrastructure/i,
    /Sarah Johnson/i,
    /\bmaison\b/i,
    /\b650\b/,
    /\b990\b/,
    /716%/,
    /€?321k/i,
    /\bCalendly\b/i,
  ];

  for (const { path, source } of await runtimeSources()) {
    for (const pattern of forbidden) {
      assert.doesNotMatch(source, pattern, `${path} contains ${pattern}`);
    }
  }
});
