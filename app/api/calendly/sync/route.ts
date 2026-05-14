import { NextRequest, NextResponse } from 'next/server';
import { validateInternalRequest } from '@/lib/apiSecurity';
import {
  createHubSpotDeal,
  findHubSpotDealByCalendlyEvent,
  isHubSpotConfigured,
  upsertHubSpotContact,
} from '@/lib/hubspot';

interface CalendlyEvent {
  name: string;
  uri: string;
  start_time: string;
  status: string;
  event_type: string;
}

interface CalendlyInvitee {
  name: string;
  email: string;
  status: string;
}

const CALENDLY_API_BASE = 'https://api.calendly.com';

function getCalendlyToken() {
  return process.env.CALENDLY_ACCESS_TOKEN || '';
}

async function calendlyFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${CALENDLY_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${getCalendlyToken()}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<T>;
}

function eventId(eventUri: string) {
  return eventUri.split('/').pop() || eventUri;
}

async function syncCalendlyBookings() {
  if (!getCalendlyToken()) {
    return { configured: false, processed: 0, createdDeals: 0 };
  }

  if (!isHubSpotConfigured()) {
    return { configured: true, hubspotConfigured: false, processed: 0, createdDeals: 0 };
  }

  const user = await calendlyFetch<{
    resource: { current_organization: string };
  }>('/users/me');

  const minStart = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const events = await calendlyFetch<{ collection: CalendlyEvent[] }>(
    `/scheduled_events?organization=${encodeURIComponent(user.resource.current_organization)}&min_start_time=${encodeURIComponent(minStart)}&sort=start_time:desc`
  );

  let processed = 0;
  let createdDeals = 0;

  for (const event of events.collection) {
    if (event.status !== 'active') continue;

    const existingDeal = await findHubSpotDealByCalendlyEvent(event.uri);
    if (existingDeal.id) continue;

    const invitees = await calendlyFetch<{ collection: CalendlyInvitee[] }>(
      `/scheduled_events/${encodeURIComponent(eventId(event.uri))}/invitees`
    );

    const invitee = invitees.collection.find((item) => item.status === 'active');
    if (!invitee) continue;

    processed += 1;
    const startTime = new Date(event.start_time);
    const contact = await upsertHubSpotContact({
      name: invitee.name,
      email: invitee.email,
      source: 'audit',
      lifecycleStage: 'lead',
    });

    if (!contact.ok || !contact.id) {
      console.error('Calendly sync contact failed:', contact.error);
      continue;
    }

    const deal = await createHubSpotDeal({
      contactId: contact.id,
      dealName: `Visual System Audit - ${invitee.name}`,
      dealStage: 'appointmentscheduled',
      closeDate: startTime,
      amount: 0,
      description: `Free audit booked via Calendly.\nCalendly event: ${event.uri}`,
    });

    if (deal.ok && deal.id) {
      createdDeals += 1;
    } else if (!deal.ok) {
      console.error('Calendly sync deal failed:', deal.error);
    }
  }

  return {
    configured: true,
    hubspotConfigured: true,
    scannedEvents: events.collection.length,
    processed,
    createdDeals,
  };
}

function validateCronRequest(request: NextRequest): NextResponse | null {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}

async function runSync() {
  try {
    return NextResponse.json(await syncCalendlyBookings());
  } catch (error) {
    console.error('Calendly sync error:', error);
    return NextResponse.json({ error: 'Calendly sync failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = validateInternalRequest(request);
  if (unauthorized) return unauthorized;

  return runSync();
}

export async function GET(request: NextRequest) {
  const unauthorized = validateCronRequest(request);
  if (unauthorized) return unauthorized;

  return runSync();
}
