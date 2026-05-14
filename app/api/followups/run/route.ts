import { NextRequest, NextResponse } from 'next/server';
import { validateInternalRequest } from '@/lib/apiSecurity';
import { runFollowups } from '@/lib/followups';

function validateCronRequest(request: NextRequest): NextResponse | null {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}

async function run(request: NextRequest) {
  try {
    const dryRun = request.nextUrl.searchParams.get('dryRun') === '1';
    return NextResponse.json(await runFollowups({ dryRun }));
  } catch (error) {
    console.error('Followup run failed:', error);
    return NextResponse.json({ error: 'Followup run failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = validateInternalRequest(request);
  if (unauthorized) return unauthorized;

  return run(request);
}

export async function GET(request: NextRequest) {
  const unauthorized = validateCronRequest(request);
  if (unauthorized) return unauthorized;

  return run(request);
}
