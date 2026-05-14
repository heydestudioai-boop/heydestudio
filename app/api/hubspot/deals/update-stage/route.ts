import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  parseJson,
  rateLimit,
  validateInternalRequest,
} from '@/lib/apiSecurity';
import { isHubSpotConfigured, updateHubSpotDealStage } from '@/lib/hubspot';

const validStages = [
  'appointmentscheduled',
  'qualifiedtobuy',
  'presentationscheduled',
  'decisionmakerboughtin',
  'contractsent',
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
 * - presentationscheduled: Follow-up presentation scheduled
 * - decisionmakerboughtin: Decision maker bought in
 * - contractsent: System proposal or contract sent
 * - closedwon: Contract signed, project started
 * - closedlost: Declined or no fit
 */

export async function PATCH(req: NextRequest) {
  try {
    const unauthorized = validateInternalRequest(req);
    if (unauthorized) return unauthorized;

    const limited = rateLimit(req, 'hubspot-deal-stage', 30, 60_000);
    if (limited) return limited;

    if (!isHubSpotConfigured()) {
      return NextResponse.json(
        { error: 'CRM service not configured' },
        { status: 500 }
      );
    }

    const parsed = await parseJson(req, dealStageSchema);
    if (!parsed.ok) return parsed.response;

    const { dealId, stage } = parsed.data;

    const result = await updateHubSpotDealStage(dealId, stage);

    if (!result.ok) {
      console.error('HubSpot API error:', result.error);
      return NextResponse.json(
        { error: 'Failed to update deal stage' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      dealId: result.id,
      stage: result.stage,
    });
  } catch (error) {
    console.error('Deal update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
