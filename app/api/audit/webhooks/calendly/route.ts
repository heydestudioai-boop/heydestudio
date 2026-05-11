import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseJson, rateLimit } from '@/lib/apiSecurity';
import {
  generateConfirmationEmail,
  generateConfirmationEmailText,
} from '@/lib/emailTemplates';

interface SendEmailRequest {
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
}

const calendlyWebhookSchema = z.object({
  event: z.string(),
  payload: z.object({
    scheduled_event: z.object({
      start_time: z.string().datetime(),
      calendar_event_id: z.string().optional(),
      invitees: z.array(
        z.object({
          first_name: z.string().optional().default(''),
          name: z.string().optional().default(''),
          email: z.string().email(),
        })
      ).min(1),
    }),
  }),
});

function validateCalendlyWebhook(request: NextRequest): NextResponse | null {
  const expectedToken = process.env.CALENDLY_WEBHOOK_TOKEN;

  if (!expectedToken) {
    return NextResponse.json(
      { error: 'Calendly webhook token not configured' },
      { status: 500 }
    );
  }

  const providedToken =
    request.headers.get('x-calendly-webhook-token') ||
    request.nextUrl.searchParams.get('token');

  if (providedToken !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}

/**
 * POST /api/audit/webhooks/calendly
 * Receives Calendly webhook events for audit bookings
 * Sends confirmation email with questionnaire link
 */
export async function POST(request: NextRequest) {
  try {
    const unauthorized = validateCalendlyWebhook(request);
    if (unauthorized) return unauthorized;

    const limited = rateLimit(request, 'calendly-webhook', 60, 60_000);
    if (limited) return limited;

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      return NextResponse.json(
        { error: 'App URL not configured' },
        { status: 500 }
      );
    }

    const parsed = await parseJson(request, calendlyWebhookSchema);
    if (!parsed.ok) return parsed.response;

    const payload = parsed.data;

    // Only process booking creation events
    if (payload.event !== 'invitee.created') {
      return NextResponse.json(
        { message: 'Webhook received but not processed' },
        { status: 200 }
      );
    }

    const scheduledEvent = payload.payload.scheduled_event;
    const firstInvitee = scheduledEvent.invitees[0];

    if (!firstInvitee) {
      return NextResponse.json(
        { error: 'No invitee found in booking' },
        { status: 400 }
      );
    }

    // Extract booking details
    const clientName = firstInvitee.name || firstInvitee.first_name;
    const clientEmail = firstInvitee.email;
    const startTime = new Date(scheduledEvent.start_time);

    // Format date and time for email
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    const auditDate = dateFormatter.format(startTime);
    const auditTime = timeFormatter.format(startTime);

    // Generate questionnaire link
    // Encodes the booking data so questionnaire can reference it
    const questionnaireLinkUrl = `${process.env.NEXT_PUBLIC_APP_URL}/audit-questionnaire?email=${encodeURIComponent(clientEmail)}&name=${encodeURIComponent(clientName)}&date=${encodeURIComponent(auditDate)}`;

    // Generate confirmation email
    const htmlContent = generateConfirmationEmail({
      clientName,
      auditDate,
      auditTime,
      questionnaireLinkUrl,
      calendlyEventId: scheduledEvent.calendar_event_id,
    });

    const textContent = generateConfirmationEmailText({
      clientName,
      auditDate,
      auditTime,
      questionnaireLinkUrl,
    });

    // Send confirmation email via Brevo API
    const emailPayload: SendEmailRequest = {
      to: clientEmail,
      subject: 'Your Free Visual System Audit is Confirmed ✓',
      htmlContent,
      textContent,
    };

    const emailResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/emails/send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-token':
            process.env.INTERNAL_API_TOKEN || process.env.BREVO_API_KEY || '',
        },
        body: JSON.stringify(emailPayload),
      }
    );

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Email sending failed:', emailResult);
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    let contactId: string | null = null;
    if (process.env.HUBSPOT_API_KEY) {
      // Create contact in HubSpot
      const hubspotContactRes = await fetch(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              firstname: clientName,
              email: clientEmail,
              lead_source: 'audit',
              lifecyclestage: 'lead',
            },
          }),
        }
      );

      if (hubspotContactRes.ok) {
        const contactData = await hubspotContactRes.json();
        contactId = contactData.id;
        console.log(`✓ HubSpot contact created: ${contactId}`);
      } else {
        console.error('Failed to create HubSpot contact:', await hubspotContactRes.text());
      }
    }

    // Create deal in HubSpot if contact was created
    if (contactId && process.env.HUBSPOT_API_KEY) {
      const dealName = `Visual System Audit - ${clientName}`;
      const hubspotDealRes = await fetch(
        'https://api.hubapi.com/crm/v3/objects/deals',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              dealname: dealName,
              dealstage: 'qualifiedtobuy',
              closedate: startTime.getTime(),
              amount: 0,
              description: `Free audit booked for ${auditDate} at ${auditTime}`,
            },
            associations: [
              {
                type: 'contact_to_deal',
                id: contactId,
              },
            ],
          }),
        }
      );

      if (hubspotDealRes.ok) {
        const dealData = await hubspotDealRes.json();
        console.log(`✓ HubSpot deal created: ${dealData.id}`);
      } else {
        console.error('Failed to create HubSpot deal:', await hubspotDealRes.text());
      }
    }

    console.log(`✓ Confirmation email sent to ${clientEmail}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Confirmation email sent and contact created',
        inviteeEmail: clientEmail,
        auditDate,
        auditTime,
        hubspotContactId: contactId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Calendly webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/audit/webhooks/calendly
 * Verify webhook is active (Calendly sends GET request to verify)
 */
export async function GET() {
  return NextResponse.json(
    { message: 'Webhook endpoint is active' },
    { status: 200 }
  );
}
