import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { escapeHtml, parseJson, rateLimit } from '@/lib/apiSecurity';
import { getBrevoNotificationEmail, sendBrevoEmail } from '@/lib/brevo';
import { upsertHubSpotContact } from '@/lib/hubspot';

const leadCaptureSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).optional().default(''),
  service: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
  website: z.string().trim().max(500).optional().default(''),
});

function buildTemplateEmail({
  name,
  company,
  service,
  message,
}: {
  name: string;
  company: string;
  service: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company);
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message);

  return {
    subject: 'Your Visual System Documentation Template is Ready',
    htmlContent: `
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
    `,
    textContent: `Hi ${name},

Thanks for your interest in HEYDE Studio. We've prepared your visual system documentation template.

Download: https://heydestudio.com/downloads/system-documentation-template.pdf

${company ? `Company: ${company}\n` : ''}
${service ? `Service Interest: ${service}\n` : ''}
${message ? `Message: ${message}\n` : ''}

Have questions? Schedule a call: https://calendly.com/heyde-studio/20min

Best,
HEYDE Studio Team
contact@heydestudio.com`,
  };
}

function buildContactConfirmationEmail({ name }: { name: string }) {
  const safeName = escapeHtml(name);

  return {
    subject: 'We received your message',
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #880808; margin-bottom: 20px;">Hi ${safeName},</h2>
        <p style="color: #171717; line-height: 1.6; margin-bottom: 16px;">
          Thanks for reaching out to HEYDE Studio. We received your message and will get back to you soon.
        </p>
        <p style="color: #171717; line-height: 1.6; margin-bottom: 24px;">
          If you'd like to speak sooner, you can also schedule a 20-minute call here:
          <a href="https://calendly.com/heyde-studio/20min" style="color: #880808; text-decoration: none;">calendly.com/heyde-studio/20min</a>
        </p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;">
        <p style="color: #888888; font-size: 14px;">
          Best,<br/>
          <strong>HEYDE Studio Team</strong>
        </p>
      </div>
    `,
    textContent: `Hi ${name},

Thanks for reaching out to HEYDE Studio. We received your message and will get back to you soon.

If you'd like to speak sooner, you can schedule a 20-minute call here:
https://calendly.com/heyde-studio/20min

Best,
HEYDE Studio Team`,
  };
}

function buildInternalLeadNotification({
  name,
  email,
  company,
  service,
  message,
}: {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message);

  return {
    subject: `New website lead: ${name}`,
    htmlContent: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #171717;">New website lead</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
        ${safeService ? `<p><strong>Service:</strong> ${safeService}</p>` : ''}
        ${safeMessage ? `<p><strong>Message:</strong><br/>${safeMessage}</p>` : ''}
      </div>
    `,
    textContent: `New website lead

Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ''}
${service ? `Service: ${service}\n` : ''}
${message ? `Message: ${message}\n` : ''}`,
  };
}

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, 'lead-capture', 5, 60_000);
    if (limited) return limited;

    const parsed = await parseJson(request, leadCaptureSchema);
    if (!parsed.ok) return parsed.response;

    const { name, email, company, service, message, website } = parsed.data;
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const isTemplateRequest = service === 'System Documentation';
    const emailContent = isTemplateRequest
      ? buildTemplateEmail({ name, company, service, message })
      : buildContactConfirmationEmail({ name });

    const brevoResult = await sendBrevoEmail({
      to: [{ email, name }],
      ...emailContent,
    });

    if (!brevoResult.ok) {
      console.error('Brevo API error:', brevoResult.details || brevoResult.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: brevoResult.status }
      );
    }

    const hubspotResult = await upsertHubSpotContact({
      name,
      email,
      company,
      service,
      message,
      source: service === 'System Documentation' ? 'template_download' : 'website',
      lifecycleStage: 'lead',
    });

    if (!hubspotResult.ok) {
      console.error('HubSpot sync failed:', hubspotResult.error);
    }

    if (!isTemplateRequest) {
      const notificationContent = buildInternalLeadNotification({
        name,
        email,
        company,
        service,
        message,
      });
      const notificationResult = await sendBrevoEmail({
        to: [{ email: getBrevoNotificationEmail(), name: 'HEYDE Studio' }],
        ...notificationContent,
      });

      if (!notificationResult.ok) {
        console.error(
          'Internal lead notification failed:',
          notificationResult.details || notificationResult.error
        );
      }
    }

    // Log lead capture
    console.log(`Lead captured: ${name} (${email}) - Service: ${service || 'Not specified'}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully. Check your inbox!',
        crmSynced: hubspotResult.ok && !hubspotResult.skipped,
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
