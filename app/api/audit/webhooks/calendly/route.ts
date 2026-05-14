import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseJson, rateLimit } from '@/lib/apiSecurity';
import { sendBrevoEmail } from '@/lib/brevo';
import {
  generateConfirmationEmail,
  generateConfirmationEmailText,
} from '@/lib/emailTemplates';
import { createHubSpotDeal, isHubSpotConfigured, upsertHubSpotContact } from '@/lib/hubspot';

const calendlyWebhookSchema = z.object({
  event: z.string(),
  payload: z.object({
    scheduled_event: z.union([
      z.object({
        start_time: z.string().datetime().optional(),
        uri: z.string().optional(),
        calendar_event_id: z.string().optional(),
      }).passthrough(),
      z.string(),
    ]).optional(),
    event: z.string().optional(),
    first_name: z.string().optional().default(''),
    name: z.string().optional().default(''),
    email: z.string().email(),
    uri: z.string().optional(),
  }).passthrough(),
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

    const scheduledEvent =
      typeof payload.payload.scheduled_event === 'object'
        ? payload.payload.scheduled_event
        : undefined;

    // Extract booking details
    const clientName = payload.payload.name || payload.payload.first_name || 'Calendly invitee';
    const clientEmail = payload.payload.email;
    const startTime = scheduledEvent?.start_time
      ? new Date(scheduledEvent.start_time)
      : new Date();

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

    let contactId: string | null = null;
    let dealId: string | null = null;
    if (isHubSpotConfigured()) {
      const hubspotContact = await upsertHubSpotContact({
        name: clientName,
        email: clientEmail,
        source: 'audit',
        lifecycleStage: 'lead',
      });

      if (hubspotContact.ok && hubspotContact.id) {
        contactId = hubspotContact.id;
        console.log(`✓ HubSpot contact synced: ${contactId}`);
      } else if (!hubspotContact.ok) {
        console.error('Failed to sync HubSpot contact:', hubspotContact.error);
      }
    }

    // Create deal in HubSpot if contact was created
    if (contactId) {
      const hubspotDeal = await createHubSpotDeal({
        contactId,
        dealName: `Visual System Audit - ${clientName}`,
        dealStage: 'appointmentscheduled',
        closeDate: startTime,
        amount: 0,
        description: `Free audit booked for ${auditDate} at ${auditTime}`,
      });

      if (hubspotDeal.ok && hubspotDeal.id) {
        dealId = hubspotDeal.id;
        console.log(`✓ HubSpot deal created: ${hubspotDeal.id}`);
      } else if (!hubspotDeal.ok) {
        console.error('Failed to create HubSpot deal:', hubspotDeal.error);
      }
    }

    // Generate confirmation email after CRM sync so email failures do not block HubSpot.
    const htmlContent = generateConfirmationEmail({
      clientName,
      auditDate,
      auditTime,
      questionnaireLinkUrl,
      calendlyEventId: scheduledEvent?.calendar_event_id,
    });

    const textContent = generateConfirmationEmailText({
      clientName,
      auditDate,
      auditTime,
      questionnaireLinkUrl,
    });

    const emailResult = await sendBrevoEmail({
      to: [{ email: clientEmail, name: clientName }],
      subject: 'Your Free Visual System Audit is Confirmed',
      htmlContent,
      textContent,
    });

    let emailSent = false;
    if (emailResult.ok) {
      emailSent = true;
      console.log(`✓ Confirmation email sent to ${clientEmail}`);
    } else {
      console.error('Email sending failed:', emailResult);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Webhook processed',
        inviteeEmail: clientEmail,
        auditDate,
        auditTime,
        hubspotContactId: contactId,
        hubspotDealId: dealId,
        emailSent,
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
