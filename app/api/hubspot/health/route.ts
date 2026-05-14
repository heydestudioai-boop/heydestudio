import { NextRequest, NextResponse } from 'next/server';
import { validateInternalRequest } from '@/lib/apiSecurity';
import { checkHubSpotConnection } from '@/lib/hubspot';

export async function GET(request: NextRequest) {
  const unauthorized = validateInternalRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const status = await checkHubSpotConnection();
    const healthy = status.configured && status.contactsRead && status.dealsRead;

    return NextResponse.json(status, {
      status: healthy ? 200 : 500,
    });
  } catch (error) {
    console.error('HubSpot health check error:', error);
    return NextResponse.json(
      { configured: true, contactsRead: false, dealsRead: false },
      { status: 500 }
    );
  }
}
