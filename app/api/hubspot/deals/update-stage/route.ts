import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  parseJson,
  rateLimit,
  validateInternalRequest,
} from '@/lib/apiSecurity';

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

const validStages = [
  'appointmentscheduled',
  'qualifiedtobuy',
  'proposalsenttocontact',
  'negotiation',
  'closedwon',
  'closedlost',
] as const;

const dealStageSchema = z.object({
  dealId: z.string().trim().min(1).max(80),
  stage: z.enum(validStages),
});

/**
 * Deal pipeline stages for audit workflow:
 * - appointmentscheduled: Initial booking confirmed
 * - qualifiedtobuy: Questionnaire completed, opportunity identified
 * - proposalsenttocontact: System proposal sent
 * - negotiation: In discussion about implementation
 * - closedwon: Contract signed, project started
 * - closedlost: Declined or no fit
 */

export async function PATCH(req: NextRequest) {
  try {
    const unauthorized = validateInternalRequest(req);
    if (unauthorized) return unauthorized;

    const limited = rateLimit(req, 'hubspot-deal-stage', 30, 60_000);
    if (limited) return limited;

    if (!HUBSPOT_API_KEY) {
      return NextResponse.json(
        { error: 'CRM service not configured' },
        { status: 500 }
      );
    }

    const parsed = await parseJson(req, dealStageSchema);
    if (!parsed.ok) return parsed.response;

    const { dealId, stage } = parsed.data;

    // Update deal stage
    const res = await fetch(`https://api.hubapi.com/crm/v3/objects/deals/${dealId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          dealstage: stage,
        },
      }),
    });

    if (!res.ok) {
      console.error('HubSpot API error:', await res.text());
      return NextResponse.json(
        { error: 'Failed to update deal stage' },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      success: true,
      dealId: data.id,
      stage: data.properties.dealstage,
    });
  } catch (error) {
    console.error('Deal update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
