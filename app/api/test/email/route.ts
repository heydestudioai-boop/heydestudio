import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  parseJson,
  rateLimit,
  validateInternalRequest,
} from '@/lib/apiSecurity';

const testEmailSchema = z.object({
  to: z.string().trim().email().max(254),
});

/**
 * POST /api/test/email
 * Test email sending to verify Brevo API key works
 * Body: { to: "test@example.com" }
 */
export async function POST(request: NextRequest) {
  try {
    const unauthorized = validateInternalRequest(request);
    if (unauthorized) return unauthorized;

    const limited = rateLimit(request, 'test-email', 10, 60_000);
    if (limited) return limited;

    if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const parsed = await parseJson(request, testEmailSchema);
    if (!parsed.ok) return parsed.response;

    const { to } = parsed.data;

    const emailPayload = {
      to: [{ email: to }],
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: 'HEYDE Studio',
      },
      subject: 'Test Email from HEYDE Studio',
      htmlContent: `
        <h1>Email Test Successful ✓</h1>
        <p>If you received this, your Brevo API key is working correctly.</p>
        <p>You can now:</p>
        <ul>
          <li>Register the Calendly webhook</li>
          <li>Start testing the audit booking flow</li>
        </ul>
      `,
      textContent: 'Test email successful. Brevo API key is working.',
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Brevo API error:', result);
      return NextResponse.json(
        {
          error: 'Failed to send test email',
          details: result,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId,
        recipientEmail: to,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process test request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
