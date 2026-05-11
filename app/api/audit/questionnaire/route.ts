import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseJson, rateLimit } from '@/lib/apiSecurity';
import {
  generateFollowUpEmail,
  generateFollowUpEmailText,
} from '@/lib/emailTemplates';

interface QuestionnaireSubmission {
  brandName: string;
  monthlyAssets: string;
  currentSystem: string;
  biggestPain: string;
  productionTimeline: string;
  email: string;
}

interface SendEmailRequest {
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
}

const questionnaireSchema = z.object({
  brandName: z.string().trim().min(1).max(160),
  monthlyAssets: z.enum(['1-10', '11-50', '51-100', '100+']),
  currentSystem: z.enum([
    'no-system',
    'loose-guidelines',
    'some-system',
    'solid-system',
  ]),
  biggestPain: z.string().trim().min(10).max(3000),
  productionTimeline: z.enum([
    'hours',
    '1-2-days',
    '3-7-days',
    '1-2-weeks',
    '2-4-weeks',
    '1-2-months',
    '2plus-months',
  ]),
  email: z.string().trim().email().max(254),
  website: z.string().trim().max(500).optional().default(''),
});

/**
 * Analyze questionnaire answers and generate audit findings
 * Returns personalized insights based on responses
 */
function analyzeQuestionnaire(data: QuestionnaireSubmission) {
  const assetVolume = data.monthlyAssets;
  const systemStatus = data.currentSystem;
  const painPoint = data.biggestPain.toLowerCase();

  // Determine current state description
  let currentState = 'No formal visual system in place.';
  if (systemStatus === 'loose-guidelines') {
    currentState = 'Loose brand guidelines document exists, but not systematized.';
  } else if (systemStatus === 'some-system') {
    currentState = 'Partial system with inconsistent implementation across teams.';
  } else if (systemStatus === 'solid-system') {
    currentState = 'Solid foundational system, but gaps remain in scale and automation.';
  }

  // Identify main gap from pain points
  let mainGap = 'Production scaling challenges with inconsistent outputs.';
  if (
    painPoint.includes('time') ||
    painPoint.includes('slow') ||
    painPoint.includes('weeks')
  ) {
    mainGap = 'Production timeline stretched—simple assets take weeks to produce.';
  } else if (painPoint.includes('inconsist')) {
    mainGap = 'Visual inconsistency across campaigns limiting brand strength.';
  } else if (painPoint.includes('freelancer') || painPoint.includes('team')) {
    mainGap =
      'Inconsistent handoffs with external teams and freelancers creating revision loops.';
  }

  // System opportunity
  let systemOpportunity =
    'Implement a documented visual system with design tokens and locked components.';

  if (assetVolume === '100+') {
    systemOpportunity =
      'Build an AI-augmented visual system with production automation to handle volume at scale.';
  } else if (assetVolume === '51-100') {
    systemOpportunity =
      'Establish system architecture with reusable templates and consistent token library.';
  }

  // Investment level based on volume and current state
  let investmentLevel: 'low' | 'medium' | 'high' = 'medium';
  if (assetVolume === '100+' || systemStatus === 'no-system') {
    investmentLevel = 'high';
  } else if (assetVolume === '1-10' && systemStatus === 'solid-system') {
    investmentLevel = 'low';
  }

  // Next steps recommendation
  let nextStepsRecommended =
    'Schedule a follow-up strategy call to map system scope and timeline. Begin with documentation audit.';

  if (investmentLevel === 'low') {
    nextStepsRecommended =
      'Light implementation: Start with design tokens and template library. Can execute in 3-6 months.';
  } else if (investmentLevel === 'high') {
    nextStepsRecommended =
      'Strategic build required: We recommend full system architecture with AI integration. Plan for 12+ months engagement.';
  }

  return {
    currentState,
    mainGap,
    systemOpportunity,
    investmentLevel,
    nextStepsRecommended,
  };
}

/**
 * POST /api/audit/questionnaire
 * Receives completed questionnaire from audit booking flow
 * Sends personalized follow-up email with preliminary findings
 */
export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, 'audit-questionnaire', 5, 60_000);
    if (limited) return limited;

    const parsed = await parseJson(request, questionnaireSchema);
    if (!parsed.ok) return parsed.response;

    const { website, ...body } = parsed.data;
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Analyze questionnaire to generate findings
    const findings = analyzeQuestionnaire(body);

    // Generate personalized follow-up email
    const auditDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const clientName = body.email.split('@')[0];

    const htmlContent = generateFollowUpEmail({
      clientName,
      brandName: body.brandName,
      auditDate,
      currentState: findings.currentState,
      mainGap: findings.mainGap,
      systemOpportunity: findings.systemOpportunity,
      investmentLevel: findings.investmentLevel,
      nextStepsRecommended: findings.nextStepsRecommended,
    });

    const textContent = generateFollowUpEmailText({
      clientName,
      brandName: body.brandName,
      auditDate,
      currentState: findings.currentState,
      mainGap: findings.mainGap,
      systemOpportunity: findings.systemOpportunity,
      investmentLevel: findings.investmentLevel,
      nextStepsRecommended: findings.nextStepsRecommended,
    });

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      return NextResponse.json(
        { error: 'App URL not configured' },
        { status: 500 }
      );
    }

    // Send follow-up email via Brevo API
    const emailPayload: SendEmailRequest = {
      to: body.email,
      subject: `${body.brandName}: Your Preliminary Visual System Audit Findings`,
      htmlContent,
      textContent,
    };

    const emailResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/emails/send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-token':
            process.env.INTERNAL_API_TOKEN || process.env.BREVO_API_KEY || '',
        },
        body: JSON.stringify(emailPayload),
      }
    );

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Follow-up email sending failed:', emailResult);
      return NextResponse.json(
        { error: 'Failed to send follow-up email' },
        { status: 500 }
      );
    }

    // TODO: Store questionnaire response in database with:
    // - All form fields (brandName, monthlyAssets, etc.)
    // - Generated findings (currentState, mainGap, etc.)
    // - status: 'questionnaire_received'
    // - completedAt timestamp

    console.log(
      `✓ Questionnaire received and follow-up sent to ${body.email}`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Questionnaire received. Follow-up email sent.',
        clientEmail: body.email,
        brandName: body.brandName,
        findings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Questionnaire submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process questionnaire' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/audit/questionnaire
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json(
    { message: 'Questionnaire endpoint is active' },
    { status: 200 }
  );
}
