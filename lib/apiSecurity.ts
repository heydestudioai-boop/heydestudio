import { NextRequest, NextResponse } from 'next/server';
import { ZodError, type ZodSchema } from 'zod';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitEntry>();

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

export function rateLimit(
  request: NextRequest,
  key: string,
  limit = 5,
  windowMs = 60_000
): NextResponse | null {
  const now = Date.now();
  const clientIp = getClientIp(request);
  const bucketKey = `${key}:${clientIp}`;
  const entry = buckets.get(bucketKey);

  if (!entry || entry.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (entry.count >= limit) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429 }
    );
  }

  entry.count += 1;
  return null;
}

export async function parseJson<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<
  | { ok: true; data: T }
  | { ok: false; response: NextResponse }
> {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return { ok: true, data };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        ok: false,
        response: NextResponse.json(
          {
            error: 'Invalid request',
            details: error.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
          },
          { status: 400 }
        ),
      };
    }

    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      ),
    };
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function validateInternalRequest(request: NextRequest): NextResponse | null {
  const expectedToken = process.env.INTERNAL_API_TOKEN || process.env.BREVO_API_KEY;

  if (!expectedToken) {
    return NextResponse.json(
      { error: 'Internal API token not configured' },
      { status: 500 }
    );
  }

  const providedToken = request.headers.get('x-internal-token');
  if (providedToken !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}
