/**
 * Email Template Generators for HEYDE Studio Audit Workflow
 * Generates HTML email content for confirmation, reminder, and follow-up sequences
 */

interface ConfirmationEmailProps {
  clientName: string;
  auditDate: string;
  auditTime: string;
  questionnaireLinkUrl: string;
  calendlyEventId?: string;
}

interface ReminderEmailProps {
  clientName: string;
  auditDate: string;
  auditTime: string;
  calendlyEventUrl: string;
}

interface FollowUpEmailProps {
  clientName: string;
  brandName: string;
  auditDate: string;
  currentState: string;
  mainGap: string;
  systemOpportunity: string;
  investmentLevel: 'low' | 'medium' | 'high';
  nextStepsRecommended: string;
  proposalUrl?: string;
}

const bodyStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const buttonStyles = `
  display: inline-block;
  background-color: #d033f0;
  color: white;
  padding: 12px 28px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  margin: 20px 0;
`;

const footerStyles = `
  border-top: 1px solid #e0e0e0;
  margin-top: 40px;
  padding-top: 20px;
  font-size: 12px;
  color: #888;
`;

/**
 * Confirmation Email - Sent immediately after Calendly booking
 * Contains: Welcome, booking details, questionnaire link, what to expect
 */
export function generateConfirmationEmail({
  clientName,
  auditDate,
  auditTime,
  questionnaireLinkUrl,
}: ConfirmationEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Audit is Confirmed</title>
</head>
<body style="${bodyStyles}">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #000; font-size: 28px; margin: 0;">Your Free Audit is Confirmed ✓</h1>
  </div>

  <p>Hi ${clientName},</p>

  <p>Thanks for scheduling your free visual system audit with HEYDE Studio. We're excited to dive into your brand and see where a system could transform your production.</p>

  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <h3 style="margin-top: 0; color: #d033f0;">Audit Scheduled</h3>
    <p style="margin: 8px 0;"><strong>Date:</strong> ${auditDate}</p>
    <p style="margin: 8px 0;"><strong>Time:</strong> ${auditTime}</p>
    <p style="margin: 8px 0; color: #666; font-size: 14px;">We'll meet via Zoom. Link in your calendar invite.</p>
  </div>

  <h3 style="color: #000; margin-top: 30px;">Next: Quick Pre-Audit Questionnaire</h3>
  <p>To make the most of our 20 minutes together, please fill out a short questionnaire about your current visual production setup. Takes about 5 minutes.</p>

  <div style="text-align: center;">
    <a href="${questionnaireLinkUrl}" style="${buttonStyles}">
      Complete Questionnaire →
    </a>
  </div>

  <p style="font-size: 14px; color: #666; margin-top: 20px;">
    <strong>Deadline:</strong> Please complete this by <strong>24 hours before your audit</strong> so we can personalize the conversation.
  </p>

  <h3 style="color: #000; margin-top: 30px;">What to Expect</h3>
  <ul style="color: #333; line-height: 1.8;">
    <li><strong>10 min prep:</strong> Review your current setup</li>
    <li><strong>20 min audit:</strong> Discuss your visual system needs</li>
    <li><strong>1 hour followup:</strong> Custom recommendation via email</li>
  </ul>

  <p style="color: #666; font-size: 14px; margin-top: 30px;">
    Can't make it? Reply to this email and we'll find another time.
  </p>

  <div style="${footerStyles}">
    <p style="margin: 5px 0;">© 2026 HEYDE Studio</p>
    <p style="margin: 5px 0;">AI Visual Systems for Modern Brands</p>
    <p style="margin: 5px 0;"><a href="https://heyde.studio" style="color: #d033f0; text-decoration: none;">heyde.studio</a></p>
  </div>
</body>
</html>
  `;
}

/**
 * Reminder Email - Sent 24 hours before audit
 * Contains: Time confirmation, Zoom link, prep tips, agenda
 */
export function generateReminderEmail({
  clientName,
  auditDate,
  auditTime,
  calendlyEventUrl,
}: ReminderEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reminder: Your Audit Tomorrow</title>
</head>
<body style="${bodyStyles}">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #000; font-size: 28px; margin: 0;">Audit Tomorrow!</h1>
  </div>

  <p>Hi ${clientName},</p>

  <p>Quick reminder: your free visual system audit is scheduled for <strong>tomorrow at ${auditTime}</strong>.</p>

  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <h3 style="margin-top: 0; color: #d033f0;">Audit Details</h3>
    <p style="margin: 8px 0;"><strong>Date:</strong> ${auditDate}</p>
    <p style="margin: 8px 0;"><strong>Time:</strong> ${auditTime}</p>
    <p style="margin: 8px 0;"><strong>Duration:</strong> 20 minutes</p>
    <p style="margin: 8px 0;">Zoom link is in your calendar invite</p>
  </div>

  <h3 style="color: #000;">Quick Prep (Optional)</h3>
  <p>To make the conversation richer, consider having these handy:</p>
  <ul style="color: #333; line-height: 1.8;">
    <li>Your brand guidelines (if you have them)</li>
    <li>Examples of recent visual production (ads, posts, campaigns)</li>
    <li>Your design tools (Figma, Adobe, etc.)</li>
  </ul>

  <p style="color: #666; font-size: 14px; margin-top: 30px;">
    No prep needed though—we'll guide the conversation.
  </p>

  <div style="text-align: center;">
    <a href="${calendlyEventUrl}" style="${buttonStyles}">
      View Calendar Invite →
    </a>
  </div>

  <div style="${footerStyles}">
    <p style="margin: 5px 0;">© 2026 HEYDE Studio</p>
    <p style="margin: 5px 0;">AI Visual Systems for Modern Brands</p>
    <p style="margin: 5px 0;"><a href="https://heyde.studio" style="color: #d033f0; text-decoration: none;">heyde.studio</a></p>
  </div>
</body>
</html>
  `;
}

/**
 * Follow-Up Email - Sent after audit completion
 * Contains: Personalized findings, 5-key-questions summary, investment estimate, next steps
 */
export function generateFollowUpEmail({
  clientName,
  brandName,
  currentState,
  mainGap,
  systemOpportunity,
  investmentLevel,
  nextStepsRecommended,
  proposalUrl,
}: FollowUpEmailProps): string {
  const investmentText = {
    low: '3–6 months, $15k–$30k',
    medium: '6–12 months, $30k–$75k',
    high: '12+ months, $75k+',
  };

  const investmentLabel = {
    low: 'Low to Moderate',
    medium: 'Moderate to High',
    high: 'Strategic Investment',
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Visual System Audit Findings</title>
</head>
<body style="${bodyStyles}">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #000; font-size: 28px; margin: 0;">Your Audit Findings</h1>
    <p style="color: #666; font-size: 16px; margin: 10px 0 0 0;">Personalized recommendations for ${brandName}</p>
  </div>

  <p>Hi ${clientName},</p>

  <p>Thanks for taking the time today. We learned a lot about your visual production and where a system could move the needle for ${brandName}.</p>

  <h3 style="color: #d033f0; font-size: 20px; margin-top: 30px;">The 5 Key Questions (Answered)</h3>

  <div style="background: #fafafa; padding: 20px; border-left: 4px solid #d033f0; margin: 20px 0;">
    <h4 style="margin-top: 0; color: #000;">1. Current State</h4>
    <p style="color: #333; margin: 0;">${currentState}</p>
  </div>

  <div style="background: #fafafa; padding: 20px; border-left: 4px solid #d033f0; margin: 20px 0;">
    <h4 style="margin-top: 0; color: #000;">2. The Gap</h4>
    <p style="color: #333; margin: 0;">${mainGap}</p>
  </div>

  <div style="background: #fafafa; padding: 20px; border-left: 4px solid #d033f0; margin: 20px 0;">
    <h4 style="margin-top: 0; color: #000;">3. System Opportunity</h4>
    <p style="color: #333; margin: 0;">${systemOpportunity}</p>
  </div>

  <div style="background: #fafafa; padding: 20px; border-left: 4px solid #d033f0; margin: 20px 0;">
    <h4 style="margin-top: 0; color: #000;">4. Investment Required</h4>
    <p style="color: #333; margin: 0;"><strong>${investmentLabel[investmentLevel]}:</strong> ${investmentText[investmentLevel]}</p>
  </div>

  <div style="background: #fafafa; padding: 20px; border-left: 4px solid #d033f0; margin: 20px 0;">
    <h4 style="margin-top: 0; color: #000;">5. Next Steps</h4>
    <p style="color: #333; margin: 0;">${nextStepsRecommended}</p>
  </div>

  <h3 style="color: #000; margin-top: 30px;">What Happens Now</h3>
  <p>You have three options:</p>

  <ul style="color: #333; line-height: 1.8;">
    <li><strong>Explore on your own:</strong> Use these findings + resources we sent to start building</li>
    <li><strong>Schedule a follow-up call:</strong> Dive deeper on strategy, timeline, team structure</li>
    <li><strong>Ready to build:</strong> We'll scope a formal proposal and kickoff date</li>
  </ul>

  ${
    proposalUrl
      ? `
  <div style="text-align: center;">
    <a href="${proposalUrl}" style="${buttonStyles}">
      View Proposal →
    </a>
  </div>
  `
      : `
  <p style="color: #666; font-size: 14px;">Reply to this email to discuss next steps, and we'll tailor a path forward.</p>
  `
  }

  <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 30px 0;">
    <h4 style="margin-top: 0; color: #000;">Quick Resources</h4>
    <ul style="color: #333; font-size: 14px; margin: 10px 0;">
      <li><a href="https://heyde.studio/blog" style="color: #d033f0; text-decoration: none;">Read our case studies</a> to see systems in action</li>
      <li><a href="https://heyde.studio/how-we-work" style="color: #d033f0; text-decoration: none;">Learn our process</a> end-to-end</li>
      <li>Questions? Reply directly—we respond within 24 hours</li>
    </ul>
  </div>

  <p style="color: #666; font-size: 14px; margin-top: 30px;">
    This audit is valid for 90 days. Schedule a follow-up before then to keep momentum.
  </p>

  <div style="${footerStyles}">
    <p style="margin: 5px 0;">© 2026 HEYDE Studio</p>
    <p style="margin: 5px 0;">AI Visual Systems for Modern Brands</p>
    <p style="margin: 5px 0;"><a href="https://heyde.studio" style="color: #d033f0; text-decoration: none;">heyde.studio</a></p>
    <p style="margin: 5px 0;">contact@heydestudio.com</p>
  </div>
</body>
</html>
  `;
}

/**
 * Plain text versions for email clients that don't support HTML
 */
export function generateConfirmationEmailText({
  clientName,
  auditDate,
  auditTime,
  questionnaireLinkUrl,
}: ConfirmationEmailProps): string {
  return `
Your Free Audit is Confirmed ✓

Hi ${clientName},

Thanks for scheduling your free visual system audit with HEYDE Studio. We're excited to dive into your brand and see where a system could transform your production.

AUDIT SCHEDULED
Date: ${auditDate}
Time: ${auditTime}

We'll meet via Zoom. Link in your calendar invite.

NEXT: QUICK PRE-AUDIT QUESTIONNAIRE

To make the most of our 20 minutes together, please fill out a short questionnaire about your current visual production setup. Takes about 5 minutes.

${questionnaireLinkUrl}

Deadline: Please complete this by 24 hours before your audit so we can personalize the conversation.

WHAT TO EXPECT
- 10 min prep: Review your current setup
- 20 min audit: Discuss your visual system needs
- 1 hour followup: Custom recommendation via email

Can't make it? Reply to this email and we'll find another time.

© 2026 HEYDE Studio
AI Visual Systems for Modern Brands
heyde.studio
  `;
}

export function generateReminderEmailText({
  clientName,
  auditDate,
  auditTime,
  calendlyEventUrl,
}: ReminderEmailProps): string {
  return `
Audit Tomorrow!

Hi ${clientName},

Quick reminder: your free visual system audit is scheduled for tomorrow at ${auditTime}.

AUDIT DETAILS
Date: ${auditDate}
Time: ${auditTime}
Duration: 20 minutes
Zoom link is in your calendar invite

QUICK PREP (OPTIONAL)

To make the conversation richer, consider having these handy:
- Your brand guidelines (if you have them)
- Examples of recent visual production (ads, posts, campaigns)
- Your design tools (Figma, Adobe, etc.)

No prep needed though—we'll guide the conversation.

${calendlyEventUrl}

© 2026 HEYDE Studio
AI Visual Systems for Modern Brands
heyde.studio
  `;
}

export function generateFollowUpEmailText({
  clientName,
  brandName,
  currentState,
  mainGap,
  systemOpportunity,
  investmentLevel,
  nextStepsRecommended,
}: FollowUpEmailProps): string {
  const investmentText = {
    low: '3–6 months, $15k–$30k',
    medium: '6–12 months, $30k–$75k',
    high: '12+ months, $75k+',
  };

  const investmentLabel = {
    low: 'Low to Moderate',
    medium: 'Moderate to High',
    high: 'Strategic Investment',
  };

  return `
Your Visual System Audit Findings
Personalized recommendations for ${brandName}

Hi ${clientName},

Thanks for taking the time today. We learned a lot about your visual production and where a system could move the needle for ${brandName}.

THE 5 KEY QUESTIONS (ANSWERED)

1. CURRENT STATE
${currentState}

2. THE GAP
${mainGap}

3. SYSTEM OPPORTUNITY
${systemOpportunity}

4. INVESTMENT REQUIRED
${investmentLabel[investmentLevel]}: ${investmentText[investmentLevel]}

5. NEXT STEPS
${nextStepsRecommended}

WHAT HAPPENS NOW

You have three options:
- Explore on your own: Use these findings + resources to start building
- Schedule a follow-up call: Dive deeper on strategy, timeline, team structure
- Ready to build: We'll scope a formal proposal and kickoff date

Reply to this email to discuss next steps, and we'll tailor a path forward.

QUICK RESOURCES
- Read our case studies to see systems in action: heyde.studio/blog
- Learn our process end-to-end: heyde.studio/how-we-work
- Questions? Reply directly—we respond within 24 hours

This audit is valid for 90 days. Schedule a follow-up before then to keep momentum.

© 2026 HEYDE Studio
AI Visual Systems for Modern Brands
heyde.studio
contact@heydestudio.com
  `;
}
