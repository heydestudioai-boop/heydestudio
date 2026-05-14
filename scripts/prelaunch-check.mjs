import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const envPath = join(root, '.env.local');

function readEnvFile(path) {
  if (!existsSync(path)) {
    return {};
  }

  return Object.fromEntries(
    readFileSync(path, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const index = line.indexOf('=');
        return [line.slice(0, index), line.slice(index + 1)];
      })
  );
}

const fileEnv = readEnvFile(envPath);
const getValue = (key) => process.env[key] || fileEnv[key] || '';

const requiredEnv = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_APP_URL',
  'INTERNAL_API_TOKEN',
  'CALENDLY_WEBHOOK_TOKEN',
  'BREVO_API_KEY',
  'BREVO_SENDER_EMAIL',
  'NEXT_PUBLIC_GA_ID',
];

const hasHubSpotToken = Boolean(getValue('HUBSPOT_ACCESS_TOKEN') || getValue('HUBSPOT_API_KEY'));

const requiredAssets = [
  'public/images/hero-fallback-cover.jpg',
  'public/videos/hero.mp4',
  'public/images/oliver-heyde.jpeg',
  'public/images/work-solea-cover.jpg',
  'public/images/work-eden-cover.jpg',
  'public/images/work-motion-cover.mp4',
  'public/logos/heyde-logo-nav-black.png',
  'public/logos/heyde-logo-nav-white.png',
];

const missingEnv = requiredEnv.filter((key) => !getValue(key));
if (!hasHubSpotToken) {
  missingEnv.push('HUBSPOT_ACCESS_TOKEN');
}
const missingAssets = requiredAssets.filter((asset) => !existsSync(join(root, asset)));

console.log('HEYDE Studio pre-launch check');
console.log('');

if (missingEnv.length) {
  console.log('Missing environment variables:');
  for (const key of missingEnv) {
    console.log(`- ${key}`);
  }
} else {
  console.log('Environment variables: OK');
}

if (missingAssets.length) {
  console.log('');
  console.log('Missing required public assets:');
  for (const asset of missingAssets) {
    console.log(`- ${asset}`);
  }
} else {
  console.log('Required public assets: OK');
}

const siteUrl = getValue('NEXT_PUBLIC_SITE_URL');
const appUrl = getValue('NEXT_PUBLIC_APP_URL');

if (siteUrl && appUrl && siteUrl !== appUrl) {
  console.log('');
  console.log(`Warning: NEXT_PUBLIC_SITE_URL (${siteUrl}) differs from NEXT_PUBLIC_APP_URL (${appUrl}).`);
}

console.log('');
console.log('Next steps: run npm run lint, npm run build, then complete docs/PRE_LAUNCH_CHECKLIST.md in production.');

if (missingAssets.length) {
  process.exitCode = 1;
}
