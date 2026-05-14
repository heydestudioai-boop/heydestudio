import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  parseJson,
  rateLimit,
  validateInternalRequest,
} from '@/lib/apiSecurity';
import { sendBrevoEmail } from '@/lib/brevo';

const sendEmailSchema = z.object({
  to: z.string().trim().email().max(254),
  toName: z.string().trim().max(120).optional(),
  subject: z.string().trim().min(1).max(180),
  htmlContent: z.string().min(1).max(100_000),
  textContent: z.string().max(20_000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const unauthorized = validateInternalRequest(request);
    if (unauthorized) return unauthorized;

    const limited = rateLimit(request, 'emails-send', 30, 60_000);
    if (limited) return limited;

    const parsed = await parseJson(request, sendEmailSchema);
    if (!parsed.ok) return parsed.response;

    const { to, toName, subject, htmlContent, textContent } = parsed.data;

    const brevoResult = await sendBrevoEmail({
      to: [{ email: to, name: toName }],
      subject,
      htmlContent,
      textContent: textContent || 'Email content',
    });

    if (!brevoResult.ok) {
      console.error('Brevo API error:', brevoResult.details || brevoResult.error);

      return NextResponse.json(
        {
          error: 'Failed to send email',
        },
        { status: brevoResult.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        messageId: brevoResult.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email send error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
