import { NextRequest, NextResponse } from 'next/server';
import {
  auditRequestSchema,
  createAuditRequestId,
  isAllowedAuditTestRecipient,
  isAuditFormEnabled,
  isAuditTestMode,
  normalizeAuditRequest,
} from '@/lib/auditFunnelCore';
import {
  isAuthorizedPreviewQaRequest,
  parseJson,
  rateLimit,
} from '@/lib/apiSecurity';
import { sendBrevoEmail } from '@/lib/brevo';
import { buildAuditRequestConfirmationEmail } from '@/lib/emailTemplates/auditRequestConfirmation';
import {
  saveHubSpotAuditContactRequest,
  updateHubSpotAuditContactConfirmationStatus,
} from '@/lib/hubspot';
import { executeAuditRequest } from '@/lib/auditRequestWorkflow';

export const runtime = 'nodejs';

function serviceUnavailable(reason: 'not_configured' | 'schema_invalid' | 'provider_unavailable') {
  const message =
    reason === 'schema_invalid'
      ? 'El formulario está en preparación. Inténtalo de nuevo más tarde.'
      : 'No hemos podido registrar la solicitud ahora mismo. Inténtalo de nuevo más tarde.';

  return NextResponse.json({ success: false, error: message }, { status: 503 });
}

export async function POST(request: NextRequest) {
  if (!isAuditFormEnabled(process.env)) {
    const expectedToken = process.env.INTERNAL_API_TOKEN;
    const providedToken = request.headers.get('x-internal-token');
    if (
      (!expectedToken || providedToken !== expectedToken) &&
      !isAuthorizedPreviewQaRequest(request)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'El formulario todavía no está disponible públicamente.',
        },
        { status: 503 }
      );
    }
  }

  const limited = rateLimit(request, 'audit-request', 4, 10 * 60_000);
  if (limited) {
    return NextResponse.json(
      { success: false, error: 'Demasiados intentos. Espera unos minutos y vuelve a probar.' },
      { status: 429 }
    );
  }

  const parsed = await parseJson(request, auditRequestSchema);
  if (!parsed.ok) return parsed.response;

  if (parsed.data.fax) {
    return NextResponse.json({ success: true });
  }

  const idempotencySecret =
    process.env.AUDIT_IDEMPOTENCY_SECRET || process.env.INTERNAL_API_TOKEN;
  if (!idempotencySecret) {
    return serviceUnavailable('not_configured');
  }

  const normalized = normalizeAuditRequest(parsed.data);
  const now = new Date();
  const isTest = isAuditTestMode(process.env);
  const requestId = createAuditRequestId({
    request: normalized,
    secret: idempotencySecret,
    now,
  });
  const emailPermitted =
    !isTest ||
    isAllowedAuditTestRecipient(
      normalized.email,
      process.env.AUDIT_TEST_EMAIL_ALLOWLIST
    );

  if (!emailPermitted) {
    return NextResponse.json(
      {
        success: false,
        error: 'El destinatario de prueba no está autorizado.',
      },
      { status: 403 }
    );
  }

  const record = {
    ...normalized,
    requestId,
    requestedAt: now,
    privacyConsentAt: now,
    isTest,
  };

  const result = await executeAuditRequest(
    record,
    {
      saveRecord: saveHubSpotAuditContactRequest,
      updateConfirmationStatus: updateHubSpotAuditContactConfirmationStatus,
      sendConfirmationEmail: async (savedRecord) => {
        const email = buildAuditRequestConfirmationEmail(savedRecord);
        const sent = await sendBrevoEmail({
          to: [
            {
              email: savedRecord.email,
              name: savedRecord.contactName,
            },
          ],
          ...email,
        });

        return sent.ok;
      },
    }
  );

  if (!result.accepted) return serviceUnavailable(result.reason);

  return NextResponse.json(
    {
      success: true,
      duplicate: result.duplicate,
      emailStatus: result.emailStatus,
      isTest,
    },
    { status: result.emailStatus === 'delayed' ? 202 : 200 }
  );
}
