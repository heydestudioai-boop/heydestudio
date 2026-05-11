import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { escapeHtml, parseJson, rateLimit } from '@/lib/apiSecurity';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'contact@heydestudio.com';
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const leadCaptureSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).optional().default(''),
  service: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
  website: z.string().trim().max(500).optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, 'lead-capture', 5, 60_000);
    if (limited) return limited;

    // Verify API key
    if (!BREVO_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const parsed = await parseJson(request, leadCaptureSchema);
    if (!parsed.ok) return parsed.response;

    const { name, email, company, service, message, website } = parsed.data;
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message);

    // Build email content
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #880808; margin-bottom: 20px;">Hi ${safeName},</h2>

        <p style="color: #171717; line-height: 1.6; margin-bottom: 16px;">
          Thanks for your interest in HEYDE Studio. We've prepared your visual system documentation template.
        </p>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 24px 0; text-align: center;">
          <a href="https://heydestudio.com/downloads/system-documentation-template.pdf"
             style="display: inline-block; background: #880808; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Download Your Template
          </a>
        </div>

        <p style="color: #171717; line-height: 1.6; margin-bottom: 16px;">
          ${safeCompany ? `<strong>Company:</strong> ${safeCompany}<br/>` : ''}
          ${safeService ? `<strong>Service Interest:</strong> ${safeService}<br/>` : ''}
        </p>

        ${safeMessage ? `<p style="color: #171717; line-height: 1.6; margin-bottom: 16px;"><strong>Message:</strong> ${safeMessage}</p>` : ''}

        <p style="color: #171717; line-height: 1.6; margin-bottom: 24px;">
          Have questions? <a href="https://calendly.com/heyde-studio/20min" style="color: #880808; text-decoration: none;">Schedule a 20-minute call</a>
        </p>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;">

        <p style="color: #888888; font-size: 14px; margin-bottom: 8px;">
          Best,<br/>
          <strong>HEYDE Studio Team</strong>
        </p>
        <p style="color: #888888; font-size: 12px;">
          contact@heydestudio.com | <a href="https://heydestudio.com" style="color: #880808; text-decoration: none;">heydestudio.com</a>
        </p>
      </div>
    `;

    const textContent = `Hi ${name},

Thanks for your interest in HEYDE Studio. We've prepared your visual system documentation template.

Download: https://heydestudio.com/downloads/system-documentation-template.pdf

${company ? `Company: ${company}\n` : ''}
${service ? `Service Interest: ${service}\n` : ''}
${message ? `Message: ${message}\n` : ''}

Have questions? Schedule a call: https://calendly.com/heyde-studio/20min

Best,
HEYDE Studio Team
contact@heydestudio.com`;

    // Send email via Brevo API
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        to: [{ email, name }],
        sender: {
          email: BREVO_SENDER_EMAIL,
          name: 'HEYDE Studio',
        },
        subject: 'Your Visual System Documentation Template is Ready',
        htmlContent,
        textContent,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Brevo API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Log lead capture
    console.log(`Lead captured: ${name} (${email}) - Service: ${service || 'Not specified'}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully. Check your inbox!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
