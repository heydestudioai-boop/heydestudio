import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  parseJson,
  rateLimit,
  validateInternalRequest,
} from '@/lib/apiSecurity';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const sendEmailSchema = z.object({
  to: z.string().trim().email().max(254),
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

    // Verify API key exists
    if (!BREVO_API_KEY) {
      return NextResponse.json(
        { error: 'BREVO_API_KEY not configured' },
        { status: 500 }
      );
    }

    if (!BREVO_SENDER_EMAIL) {
      return NextResponse.json(
        { error: 'BREVO_SENDER_EMAIL not configured' },
        { status: 500 }
      );
    }

    const parsed = await parseJson(request, sendEmailSchema);
    if (!parsed.ok) return parsed.response;

    const { to, subject, htmlContent, textContent } = parsed.data;

    // Send email via Brevo API
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        to: [{ email: to }],
        sender: {
          email: BREVO_SENDER_EMAIL,
          name: 'HEYDE Studio',
        },
        subject,
        htmlContent,
        textContent: textContent || 'Email content',
      }),
    });

    // Handle Brevo API errors
    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Brevo API error:', errorData);

      return NextResponse.json(
        {
          error: 'Failed to send email',
          details: errorData,
        },
        { status: brevoResponse.status }
      );
    }

    const result = await brevoResponse.json();

    return NextResponse.json(
      {
        success: true,
        messageId: result.messageId,
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
