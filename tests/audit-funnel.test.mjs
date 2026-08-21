import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  AUDIT_STATUSES,
  assessProposalDealEligibility,
  auditRequestSchema,
  createAuditRequestId,
  isAllowedAuditTestRecipient,
  isAuditFormEnabled,
  isAuditTestMode,
  normalizeAuditRequest,
  proposalDealAuditMarker,
} from '../lib/auditFunnelCore.ts';
import { buildAuditAnalyticsPayload } from '../lib/auditAnalytics.ts';
import { buildAuditRequestConfirmationEmail } from '../lib/emailTemplates/auditRequestConfirmation.ts';
import { executeAuditRequest } from '../lib/auditRequestWorkflow.ts';

const validPayload = {
  businessName: 'Negocio de Prueba',
  cityArea: 'Toledo',
  businessPresence: '@negocio.prueba',
  contactName: 'Persona Prueba',
  email: 'qa+audit@example.com',
  phone: '',
  privacyConsent: true,
  locale: 'es',
  fax: '',
};

function workflowRecord() {
  return {
    ...normalizeAuditRequest(auditRequestSchema.parse(validPayload)),
    requestId: 'audit_v1_test',
    requestedAt: new Date('2026-08-21T10:00:00.000Z'),
    privacyConsentAt: new Date('2026-08-21T10:00:00.000Z'),
    isTest: true,
  };
}

test('accepts the canonical short audit brief', () => {
  const parsed = auditRequestSchema.safeParse(validPayload);
  assert.equal(parsed.success, true);
});

test('requires explicit privacy consent and rejects internal client flags', () => {
  assert.equal(
    auditRequestSchema.safeParse({ ...validPayload, privacyConsent: false }).success,
    false
  );
  assert.equal(
    auditRequestSchema.safeParse({ ...validPayload, is_test: true }).success,
    false
  );
});

test('accepts a website or Instagram handle and rejects arbitrary text', () => {
  assert.equal(
    auditRequestSchema.safeParse({ ...validPayload, businessPresence: 'negocio.es' }).success,
    true
  );
  assert.equal(
    auditRequestSchema.safeParse({ ...validPayload, businessPresence: 'instagram.com/negocio' })
      .success,
    true
  );
  assert.equal(
    auditRequestSchema.safeParse({ ...validPayload, businessPresence: 'sin presencia' }).success,
    false
  );
});

test('generates stable daily idempotency IDs without exposing the email', () => {
  const request = normalizeAuditRequest(auditRequestSchema.parse(validPayload));
  const first = createAuditRequestId({
    request,
    secret: 'test-secret',
    now: new Date('2026-08-21T10:00:00.000Z'),
  });
  const duplicate = createAuditRequestId({
    request,
    secret: 'test-secret',
    now: new Date('2026-08-21T22:00:00.000Z'),
  });
  const nextDay = createAuditRequestId({
    request,
    secret: 'test-secret',
    now: new Date('2026-08-22T00:00:00.000Z'),
  });

  assert.equal(first, duplicate);
  assert.notEqual(first, nextDay);
  assert.equal(first.includes(validPayload.email), false);
});

test('marks local and preview requests as test and gates test recipients', () => {
  assert.equal(isAuditTestMode({ NODE_ENV: 'development' }), true);
  assert.equal(isAuditTestMode({ NODE_ENV: 'production' }), true);
  assert.equal(isAuditTestMode({ NODE_ENV: 'production', VERCEL_ENV: 'preview' }), true);
  assert.equal(isAuditTestMode({ NODE_ENV: 'production', VERCEL_ENV: 'production' }), false);
  assert.equal(
    isAllowedAuditTestRecipient('qa@example.com', 'owner@example.com, qa@example.com'),
    true
  );
  assert.equal(isAllowedAuditTestRecipient('contact@example.com', 'qa@example.com'), false);
});

test('keeps the public form closed unless its server flag is explicitly true', () => {
  assert.equal(isAuditFormEnabled({}), false);
  assert.equal(isAuditFormEnabled({ AUDIT_FORM_ENABLED: 'false' }), false);
  assert.equal(isAuditFormEnabled({ AUDIT_FORM_ENABLED: 'true' }), true);
});

test('keeps the audit lifecycle on Contact and outside the commercial Deal lifecycle', () => {
  assert.deepEqual(AUDIT_STATUSES, [
    'audit_requested',
    'audit_in_preparation',
    'audit_ready',
    'audit_delivered',
  ]);
});

test('analytics payload is allowlisted and contains no form data or PII', () => {
  const payload = buildAuditAnalyticsPayload('es');
  assert.deepEqual(Object.keys(payload).sort(), ['event_category', 'locale', 'page_path']);
  assert.equal(JSON.stringify(payload).includes(validPayload.email), false);
  assert.equal(JSON.stringify(payload).includes(validPayload.businessName), false);
});

test('confirmation email stays short and excludes legacy promises and scheduling', () => {
  const email = buildAuditRequestConfirmationEmail({
    contactName: validPayload.contactName,
    businessName: validPayload.businessName,
  });
  const content = `${email.subject}\n${email.textContent}`.toLowerCase();

  assert.match(content, /72 horas/);
  for (const forbidden of [
    'calendly',
    '20min',
    'precio',
    'sistema visual',
    'inteligencia artificial',
    'cuestionario',
    'diagnóstico preliminar',
  ]) {
    assert.equal(content.includes(forbidden), false, forbidden);
  }

  const english = buildAuditRequestConfirmationEmail({
    contactName: validPayload.contactName,
    businessName: validPayload.businessName,
    locale: 'en',
  });
  assert.match(english.subject, /audit request/i);
  assert.match(english.textContent, /within 72 hours/i);
  assert.equal(english.textContent.toLowerCase().includes('calendly'), false);
});

test('persists the Contact before sending and completes one successful confirmation', async () => {
  const calls = [];
  const result = await executeAuditRequest(
    workflowRecord(),
    {
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
      updateConfirmationStatus: async (contactId, status) => {
        assert.equal(contactId, 'contact-test');
        calls.push(`update:${status}`);
        return true;
      },
    }
  );

  assert.deepEqual(calls, ['save:pending', 'email', 'update:sent']);
  assert.deepEqual(result, {
    accepted: true,
    duplicate: false,
    emailStatus: 'sent',
  });
});

test('does not resend email for an idempotent duplicate', async () => {
  let emailCalls = 0;
  const result = await executeAuditRequest(
    workflowRecord(),
    {
      saveRecord: async () => ({
        ok: true,
        created: false,
        contactId: 'contact-existing',
        confirmationStatus: 'sent',
      }),
      sendConfirmationEmail: async () => {
        emailCalls += 1;
        return true;
      },
      updateConfirmationStatus: async () => true,
    }
  );

  assert.equal(emailCalls, 0);
  assert.deepEqual(result, {
    accepted: true,
    duplicate: true,
    emailStatus: 'sent',
  });
});

test('fails closed when HubSpot is unavailable', async () => {
  let emailCalls = 0;
  const result = await executeAuditRequest(
    workflowRecord(),
    {
      saveRecord: async () => ({ ok: false, reason: 'provider_unavailable' }),
      sendConfirmationEmail: async () => {
        emailCalls += 1;
        return true;
      },
      updateConfirmationStatus: async () => true,
    }
  );

  assert.equal(emailCalls, 0);
  assert.deepEqual(result, { accepted: false, reason: 'provider_unavailable' });
});

test('keeps the CRM record and marks delayed when Brevo is unavailable', async () => {
  const statuses = [];
  const result = await executeAuditRequest(
    workflowRecord(),
    {
      saveRecord: async (_record, status) => ({
        ok: true,
        created: true,
        contactId: 'contact-test',
        confirmationStatus: status,
      }),
      sendConfirmationEmail: async () => false,
      updateConfirmationStatus: async (_contactId, status) => {
        statuses.push(status);
        return true;
      },
    }
  );

  assert.deepEqual(statuses, ['failed']);
  assert.deepEqual(result, {
    accepted: true,
    duplicate: false,
    emailStatus: 'delayed',
  });
});

test('rejects a non-allowlisted dark test before the CRM workflow', async () => {
  const submitRoute = await readFile(
    new URL('../app/api/audit/requests/route.ts', import.meta.url),
    'utf8'
  );
  const gatePosition = submitRoute.indexOf('if (!emailPermitted)');
  const workflowPosition = submitRoute.lastIndexOf('executeAuditRequest');

  assert.notEqual(gatePosition, -1);
  assert.ok(gatePosition < workflowPosition);
  assert.match(submitRoute.slice(gatePosition, workflowPosition), /status: 403/);
});

test('proposal Deal eligibility requires an explicit delivered, non-test Contact match', () => {
  const requestId = 'audit_v1_'.concat('a'.repeat(48));
  assert.deepEqual(
    assessProposalDealEligibility(
      {
        auditRequestId: requestId,
        auditStatus: 'audit_delivered',
        isTest: false,
      },
      requestId
    ),
    { allowed: true }
  );
  assert.deepEqual(
    assessProposalDealEligibility(
      {
        auditRequestId: requestId,
        auditStatus: 'audit_delivered',
        isTest: true,
      },
      requestId
    ),
    { allowed: false, reason: 'test_contact' }
  );
  assert.deepEqual(
    assessProposalDealEligibility(
      {
        auditRequestId: requestId,
        auditStatus: 'audit_ready',
        isTest: false,
      },
      requestId
    ),
    { allowed: false, reason: 'audit_not_delivered' }
  );
  assert.match(proposalDealAuditMarker(requestId), /HEYDE_AUDIT_REQUEST/);
});

test('the submit route cannot create Deals and Calendly is absent from the v1 funnel', async () => {
  const submitRoute = await readFile(
    new URL('../app/api/audit/requests/route.ts', import.meta.url),
    'utf8'
  );
  assert.equal(submitRoute.includes('createProposalDeal'), false);
  assert.equal(submitRoute.includes('/objects/deals'), false);

  const funnelFiles = await Promise.all(
    [
      '../app/audit/page.tsx',
      '../components/pages/AuditPageContent.tsx',
      '../lib/auditAnalytics.ts',
      '../lib/emailTemplates/auditRequestConfirmation.ts',
    ].map((path) => readFile(new URL(path, import.meta.url), 'utf8'))
  );
  assert.equal(funnelFiles.join('\n').toLowerCase().includes('calendly'), false);
});
