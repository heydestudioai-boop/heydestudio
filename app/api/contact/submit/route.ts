import { NextRequest, NextResponse } from 'next/server';
import {
  brandInquirySchema,
  createBrandInquiryRequestId,
  getBrandInquiryBrevoIdempotencyKey,
  isAllowedBrandInquiryTestRecipient,
  isBrandInquiryTestMode,
  normalizeBrandInquiry,
} from '@/lib/brandInquiryCore';
import { executeBrandInquiry } from '@/lib/brandInquiryWorkflow';
import { parseJson, rateLimit } from '@/lib/apiSecurity';
import { sendBrevoEmail } from '@/lib/brevo';
import { buildBrandInquiryConfirmationEmail } from '@/lib/emailTemplates/brandInquiryConfirmation';
import {
  saveHubSpotBrandInquiry,
  updateHubSpotBrandInquiryConfirmationStatus,
} from '@/lib/hubspot';

export const runtime = 'nodejs';

function serviceUnavailable() {
  return NextResponse.json(
    {
      success: false,
      error:
        'We could not register your inquiry right now. Please try again later.',
    },
    { status: 503 }
  );
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 'brand-inquiry', 4, 10 * 60_000);
  if (limited) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many attempts. Please wait a few minutes and try again.',
      },
      { status: 429 }
    );
  }

  const parsed = await parseJson(request, brandInquirySchema);
  if (!parsed.ok) return parsed.response;
  if (parsed.data.fax) return NextResponse.json({ success: true });

  const idempotencySecret = process.env.INTERNAL_API_TOKEN;
  if (!idempotencySecret) return serviceUnavailable();

  const normalized = normalizeBrandInquiry(parsed.data);
  const now = new Date();
  const isTest = isBrandInquiryTestMode(process.env);
  if (
    isTest &&
    !isAllowedBrandInquiryTestRecipient(
      normalized.email,
      process.env.AUDIT_TEST_EMAIL_ALLOWLIST
    )
  ) {
    return NextResponse.json(
      {
        success: false,
        error: 'This Preview recipient is not on the approved QA allowlist.',
      },
      { status: 403 }
    );
  }

  const record = {
    ...normalized,
    requestId: createBrandInquiryRequestId({
      request: normalized,
      secret: idempotencySecret,
      now,
    }),
    requestedAt: now,
    privacyConsentAt: now,
    isTest,
  };

  const result = await executeBrandInquiry(record, {
    saveRecord: saveHubSpotBrandInquiry,
    updateConfirmationStatus: updateHubSpotBrandInquiryConfirmationStatus,
    sendConfirmationEmail: async (savedRecord) => {
      const email = buildBrandInquiryConfirmationEmail(savedRecord);
      const sent = await sendBrevoEmail({
        to: [{ email: savedRecord.email, name: savedRecord.name }],
        ...email,
        idempotencyKey: getBrandInquiryBrevoIdempotencyKey(
          savedRecord.requestId
        ),
        tags: ['brand-inquiry-confirmation'],
      });
      return sent.ok;
    },
  });

  if (!result.accepted) return serviceUnavailable();

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
