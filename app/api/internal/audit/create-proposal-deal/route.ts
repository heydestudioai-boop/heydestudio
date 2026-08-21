import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseJson, rateLimit, validateInternalRequest } from '@/lib/apiSecurity';
import { createProposalDeal } from '@/lib/hubspot';

export const runtime = 'nodejs';

const proposalDealSchema = z
  .object({
    contactId: z.string().trim().min(1).max(80),
    auditRequestId: z
      .string()
      .trim()
      .regex(/^audit_v1_[a-f0-9]{48}$/),
    dealName: z.string().trim().min(1).max(160),
    amount: z.number().finite().nonnegative().optional(),
    closeDate: z.string().datetime({ offset: true }).optional(),
    description: z.string().trim().max(2_000).optional(),
  })
  .strict();

export async function POST(request: NextRequest) {
  const unauthorized = validateInternalRequest(request);
  if (unauthorized) return unauthorized;

  const limited = rateLimit(request, 'audit-create-proposal-deal', 3, 60_000);
  if (limited) return limited;

  const parsed = await parseJson(request, proposalDealSchema);
  if (!parsed.ok) return parsed.response;

  const result = await createProposalDeal({
    ...parsed.data,
    closeDate: parsed.data.closeDate
      ? new Date(parsed.data.closeDate)
      : undefined,
  });

  if (!result.ok) {
    const conflictReasons = new Set([
      'test_contact',
      'request_mismatch',
      'audit_not_delivered',
    ]);
    const status = conflictReasons.has(result.reason)
      ? 409
      : result.reason === 'contact_not_found'
        ? 404
        : result.reason === 'schema_invalid' || result.reason === 'not_configured'
          ? 503
          : 502;

    return NextResponse.json(
      { success: false, reason: result.reason },
      { status }
    );
  }

  return NextResponse.json({
    success: true,
    created: result.created,
    dealId: result.dealId,
  });
}
