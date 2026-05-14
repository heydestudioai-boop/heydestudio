import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseJson, rateLimit } from '@/lib/apiSecurity';
import { subscribeBrevoContact } from '@/lib/brevo';

const newsletterSchema = z.object({
  email: z.string().trim().email().max(254),
  name: z.string().trim().max(120).optional().default(''),
  source: z.string().trim().max(80).optional().default('website_newsletter'),
  website: z.string().trim().max(500).optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, 'newsletter-subscribe', 5, 60_000);
    if (limited) return limited;

    const parsed = await parseJson(request, newsletterSchema);
    if (!parsed.ok) return parsed.response;

    const { email, name, source, website } = parsed.data;

    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const result = await subscribeBrevoContact({
      email,
      name,
      source,
    });

    if (!result.ok) {
      console.error('Newsletter subscription failed:', result.details || result.error);
      return NextResponse.json(
        { error: 'Could not subscribe this email right now.' },
        { status: result.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Subscribed successfully.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Could not subscribe this email right now.' },
      { status: 500 }
    );
  }
}
