import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseJson, rateLimit } from '@/lib/apiSecurity';

const leadMagnetSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  source: z.string().trim().max(120).optional().default('lead_magnet'),
  website: z.string().trim().max(500).optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, 'lead-magnet', 5, 60_000);
    if (limited) return limited;

    const parsed = await parseJson(request, leadMagnetSchema);
    if (!parsed.ok) return parsed.response;

    const { name, email, source, website } = parsed.data;
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // TODO: In production, integrate with your email service
    // Examples:
    // - SendGrid
    // - Mailchimp
    // - ConvertKit
    // - Custom database

    // For now, log the submission
    console.log('Lead magnet submission:', {
      name,
      email,
      source,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send welcome email with PDF attachment
    // TODO: Add to email list
    // TODO: Track in CRM

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully submitted. Check your email for the template.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lead magnet error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
