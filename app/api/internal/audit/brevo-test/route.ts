import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isAllowedAuditTestRecipient } from '@/lib/auditFunnelCore';
import { parseJson, rateLimit, validateInternalRequest } from '@/lib/apiSecurity';
import { sendBrevoEmail } from '@/lib/brevo';
import { buildAuditRequestConfirmationEmail } from '@/lib/emailTemplates/auditRequestConfirmation';

export const runtime = 'nodejs';

const brevoAuditTestSchema = z
  .object({
    recipient: z.string().trim().email().max(254),
    locale: z.enum(['es', 'en']).default('es'),
  })
  .strict();

export async function POST(request: NextRequest) {
  const unauthorized = validateInternalRequest(request);
  if (unauthorized) return unauthorized;

  const limited = rateLimit(request, 'audit-brevo-test', 2, 10 * 60_000);
  if (limited) return limited;

  const parsed = await parseJson(request, brevoAuditTestSchema);
  if (!parsed.ok) return parsed.response;

  if (
    !isAllowedAuditTestRecipient(
      parsed.data.recipient,
      process.env.AUDIT_TEST_EMAIL_ALLOWLIST
    )
  ) {
    console.warn('[audit-brevo-test] blocked_not_allowlisted');
    return NextResponse.json(
      { success: false, error: 'Recipient is not allowlisted' },
      { status: 403 }
    );
  }

  const email = buildAuditRequestConfirmationEmail({
    contactName: 'QA HEYDE',
    businessName: 'Negocio TEST HEYDE',
    locale: parsed.data.locale,
  });
  const result = await sendBrevoEmail({
    to: [{ email: parsed.data.recipient, name: 'QA HEYDE' }],
    ...email,
  });

  if (!result.ok) {
    console.error('[audit-brevo-test] provider_error', {
      status: result.status,
    });
    return NextResponse.json(
      { success: false, error: 'Brevo test failed' },
      { status: 502 }
    );
  }

  console.info('[audit-brevo-test] sent');
  return NextResponse.json({ success: true, messageId: result.messageId });
}
