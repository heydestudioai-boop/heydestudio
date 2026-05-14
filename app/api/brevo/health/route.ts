import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, validateInternalRequest } from '@/lib/apiSecurity';
import { checkBrevoConnection } from '@/lib/brevo';

export async function GET(request: NextRequest) {
  const unauthorized = validateInternalRequest(request);
  if (unauthorized) return unauthorized;

  const limited = rateLimit(request, 'brevo-health', 20, 60_000);
  if (limited) return limited;

  const result = await checkBrevoConnection();
  const status = result.configured ? 200 : 500;

  return NextResponse.json(result, { status });
}
