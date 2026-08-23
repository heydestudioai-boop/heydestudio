import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  brandInquirySchema,
  buildBrandInquiryMessage,
  createBrandInquiryRequestId,
  getBrandInquiryBrevoIdempotencyKey,
  hubSpotProjectType,
  normalizeBrandInquiry,
  parseBrandInquiryMessage,
} from '../lib/brandInquiryCore.ts';
import { executeBrandInquiry } from '../lib/brandInquiryWorkflow.ts';
import { buildBrandInquiryAnalyticsPayload } from '../lib/brandInquiryAnalytics.ts';
import { buildBrandInquiryConfirmationEmail } from '../lib/emailTemplates/brandInquiryConfirmation.ts';

const payload = {
  name: 'QA Brand Contact',
  company: 'QA Brand Company',
  email: 'qa+brand@example.com',
  presence: 'qa-brand.example.com',
  projectType: 'campaign',
  brief: 'A clearly fictional campaign brief for controlled testing.',
  privacyConsent: true,
  fax: '',
};

function record() {
  const normalized = normalizeBrandInquiry(brandInquirySchema.parse(payload));
  return {
    ...normalized,
    requestId: 'brand_v1_11111111-1111-5111-8111-111111111111',
    requestedAt: new Date('2026-08-24T10:00:00.000Z'),
    privacyConsentAt: new Date('2026-08-24T10:00:00.000Z'),
    isTest: true,
  };
}

test('accepts the short brand inquiry and requires consent', () => {
  assert.equal(brandInquirySchema.safeParse(payload).success, true);
  assert.equal(
    brandInquirySchema.safeParse({ ...payload, privacyConsent: false }).success,
    false
  );
});

test('creates a stable daily request id without exposing PII', () => {
  const request = normalizeBrandInquiry(brandInquirySchema.parse(payload));
  const first = createBrandInquiryRequestId({
    request,
    secret: 'test-secret',
    now: new Date('2026-08-24T10:00:00.000Z'),
  });
  const duplicate = createBrandInquiryRequestId({
    request,
    secret: 'test-secret',
    now: new Date('2026-08-24T20:00:00.000Z'),
  });
  const nextDay = createBrandInquiryRequestId({
    request,
    secret: 'test-secret',
    now: new Date('2026-08-25T00:00:00.000Z'),
  });

  assert.equal(first, duplicate);
  assert.notEqual(first, nextDay);
  assert.equal(first.includes(payload.email), false);
  assert.match(getBrandInquiryBrevoIdempotencyKey(first), /^[0-9a-f-]{36}$/);
});

test('stores a durable non-PII marker alongside the brief', () => {
  const saved = buildBrandInquiryMessage(record(), 'sent');
  const parsed = parseBrandInquiryMessage(saved);
  assert.equal(parsed?.requestId, record().requestId);
  assert.equal(parsed?.confirmationStatus, 'sent');
  assert.equal(saved.includes(payload.email), false);
  assert.equal(saved.includes(payload.brief), true);
});

test('lead_type and project_type remain separate concepts', () => {
  assert.equal(hubSpotProjectType('campaign'), 'campaign');
  assert.equal(hubSpotProjectType('visual_development'), 'digital_identity');
  assert.equal(hubSpotProjectType('real_production'), undefined);
});

test('persists the Contact before sending one confirmation', async () => {
  const calls = [];
  const result = await executeBrandInquiry(record(), {
    saveRecord: async (_record, status) => {
      calls.push(`save:${status}`);
      return {
        ok: true,
        created: true,
        contactId: 'contact-test',
        confirmationStatus: status,
      };
    },
    sendConfirmationEmail: async () => {
      calls.push('email');
      return true;
    },
    updateConfirmationStatus: async (_id, _record, status) => {
      calls.push(`update:${status}`);
      return true;
    },
  });
  assert.deepEqual(calls, ['save:pending', 'email', 'update:sent']);
  assert.deepEqual(result, {
    accepted: true,
    duplicate: false,
    emailStatus: 'sent',
  });
});

test('an idempotent duplicate creates no second email', async () => {
  let emailCalls = 0;
  const result = await executeBrandInquiry(record(), {
    saveRecord: async () => ({
      ok: true,
      created: false,
      contactId: 'contact-test',
      confirmationStatus: 'sent',
    }),
    sendConfirmationEmail: async () => {
      emailCalls += 1;
      return true;
    },
    updateConfirmationStatus: async () => true,
  });
  assert.equal(emailCalls, 0);
  assert.deepEqual(result, {
    accepted: true,
    duplicate: true,
    emailStatus: 'sent',
  });
});

test('fails closed on HubSpot failure and does not send email', async () => {
  let emailCalls = 0;
  const result = await executeBrandInquiry(record(), {
    saveRecord: async () => ({ ok: false, reason: 'provider_unavailable' }),
    sendConfirmationEmail: async () => {
      emailCalls += 1;
      return true;
    },
    updateConfirmationStatus: async () => true,
  });
  assert.equal(emailCalls, 0);
  assert.deepEqual(result, {
    accepted: false,
    reason: 'provider_unavailable',
  });
});

test('keeps the Contact and marks confirmation failed when Brevo fails', async () => {
  const statuses = [];
  const result = await executeBrandInquiry(record(), {
    saveRecord: async () => ({
      ok: true,
      created: true,
      contactId: 'contact-test',
      confirmationStatus: 'pending',
    }),
    sendConfirmationEmail: async () => false,
    updateConfirmationStatus: async (_id, _record, status) => {
      statuses.push(status);
      return true;
    },
  });
  assert.deepEqual(statuses, ['failed']);
  assert.deepEqual(result, {
    accepted: true,
    duplicate: false,
    emailStatus: 'delayed',
  });
});

test('retries a failed confirmation without creating another Contact', async () => {
  let emailCalls = 0;
  const result = await executeBrandInquiry(record(), {
    saveRecord: async () => ({
      ok: true,
      created: false,
      contactId: 'contact-test',
      confirmationStatus: 'failed',
    }),
    sendConfirmationEmail: async () => {
      emailCalls += 1;
      return true;
    },
    updateConfirmationStatus: async () => true,
  });
  assert.equal(emailCalls, 1);
  assert.deepEqual(result, {
    accepted: true,
    duplicate: true,
    emailStatus: 'sent',
  });
});

test('confirmation email has no scheduling, pricing or legacy delivery', () => {
  const email = buildBrandInquiryConfirmationEmail(record());
  const content = `${email.subject}\n${email.textContent}`.toLowerCase();
  assert.match(email.subject, /project inquiry received/i);
  for (const forbidden of [
    'calendly',
    '20min',
    'visual system audit',
    'questionnaire',
    'template',
    'avatar',
    'price',
    'within 48',
    'within 72',
  ]) {
    assert.equal(content.includes(forbidden), false, forbidden);
  }
});

test('analytics payload is allowlisted and contains no PII', () => {
  const analytics = buildBrandInquiryAnalyticsPayload();
  assert.deepEqual(Object.keys(analytics).sort(), [
    'event_category',
    'locale',
    'page_path',
  ]);
  assert.equal(JSON.stringify(analytics).includes(payload.email), false);
  assert.equal(JSON.stringify(analytics).includes(payload.company), false);
  assert.equal(JSON.stringify(analytics).includes(payload.brief), false);
});

test('active contact flow has no Deal, Calendly or legacy endpoint dependency', async () => {
  const files = await Promise.all(
    [
      '../app/api/contact/submit/route.ts',
      '../app/(en)/contact/page.tsx',
      '../components/pages/BrandInquiryPageContent.tsx',
      '../lib/emailTemplates/brandInquiryConfirmation.ts',
    ].map((path) => readFile(new URL(path, import.meta.url), 'utf8'))
  );
  const source = files.join('\n').toLowerCase();
  for (const forbidden of [
    'createproposaldeal',
    '/objects/deals',
    'calendly',
    '/api/lead-capture',
    'visual system audit',
    'system documentation',
    'questionnaire',
  ]) {
    assert.equal(source.includes(forbidden), false, forbidden);
  }
});
