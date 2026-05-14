import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseJson, rateLimit } from '@/lib/apiSecurity';
import { isHubSpotConfigured, upsertHubSpotContact } from '@/lib/hubspot';

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().min(1).max(2000),
  website: z.string().trim().max(500).optional().default(''),
});

export async function POST(req: NextRequest) {
  try {
    const limited = rateLimit(req, 'contact-submit', 5, 60_000);
    if (limited) return limited;

    if (!isHubSpotConfigured()) {
      return NextResponse.json(
        { error: 'CRM service not configured' },
        { status: 500 }
      );
    }

    const parsed = await parseJson(req, contactSchema);
    if (!parsed.ok) return parsed.response;

    const { name, email, company, message, website } = parsed.data;
    if (website) {
      return NextResponse.json({ success: true });
    }

    const hubspotResult = await upsertHubSpotContact({
      name,
      email,
      company,
      message,
      source: 'website',
      lifecycleStage: 'lead',
    });

    if (!hubspotResult.ok) {
      console.error('HubSpot API error:', hubspotResult.error);
      return NextResponse.json(
        { error: 'Failed to create contact' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
