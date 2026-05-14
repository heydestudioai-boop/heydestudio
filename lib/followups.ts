import { sendBrevoEmail } from '@/lib/brevo';
import {
  generateFollowUpEmail,
  generateFollowUpEmailText,
  generateReminderEmail,
  generateReminderEmailText,
} from '@/lib/emailTemplates';
import {
  getHubSpotContactById,
  listHubSpotDealsForFollowups,
  updateHubSpotDealDescription,
  type HubSpotContactRecord,
  type HubSpotDealRecord,
} from '@/lib/hubspot';

const MARKERS = {
  reminder: '[HEYDE_FOLLOWUP:AUDIT_REMINDER_SENT]',
  postAudit: '[HEYDE_FOLLOWUP:POST_AUDIT_SENT]',
  noResponse: '[HEYDE_FOLLOWUP:NO_RESPONSE_SENT]',
} as const;

const CLOSED_OR_PROPOSAL_STAGES = new Set([
  'contractsent',
  'closedwon',
  'closedlost',
]);

interface FollowupResult {
  configured: boolean;
  dryRun: boolean;
  scannedDeals: number;
  eligibleDeals: number;
  sent: number;
  wouldSend: number;
  failed: number;
  skipped: number;
}

function hasMarker(deal: HubSpotDealRecord, marker: string) {
  return Boolean(deal.properties.description?.includes(marker));
}

function appendMarker(description: string | undefined, marker: string) {
  const current = description?.trim() || '';
  const line = `${marker} ${new Date().toISOString()}`;
  return current ? `${current}\n${line}` : line;
}

function contactName(contact: HubSpotContactRecord) {
  const firstName = contact.properties.firstname?.trim();
  const lastName = contact.properties.lastname?.trim();
  return [firstName, lastName].filter(Boolean).join(' ') || 'there';
}

function firstName(contact: HubSpotContactRecord) {
  return contact.properties.firstname?.trim() || contactName(contact).split(/\s+/)[0] || 'there';
}

function brandName(contact: HubSpotContactRecord, deal: HubSpotDealRecord) {
  return (
    contact.properties.company?.trim() ||
    deal.properties.dealname?.replace(/^Visual System Audit -\s*/i, '').trim() ||
    'your brand'
  );
}

function formatAuditDateTime(date: Date) {
  const auditDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  const auditTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);

  return { auditDate, auditTime };
}

function getDealStart(deal: HubSpotDealRecord) {
  const raw = deal.properties.closedate;
  if (!raw) return null;

  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function shouldSkipStage(deal: HubSpotDealRecord) {
  return CLOSED_OR_PROPOSAL_STAGES.has(deal.properties.dealstage || '');
}

function chooseFollowup(deal: HubSpotDealRecord, now: Date) {
  if (shouldSkipStage(deal)) return null;

  const startTime = getDealStart(deal);
  if (!startTime) return null;

  const hoursUntil = (startTime.getTime() - now.getTime()) / (60 * 60 * 1000);
  const hoursSince = (now.getTime() - startTime.getTime()) / (60 * 60 * 1000);
  const daysSince = hoursSince / 24;

  if (
    hoursUntil >= 12 &&
    hoursUntil <= 36 &&
    !hasMarker(deal, MARKERS.reminder)
  ) {
    return 'reminder' as const;
  }

  if (hoursSince >= 2 && !hasMarker(deal, MARKERS.postAudit)) {
    return 'postAudit' as const;
  }

  if (
    daysSince >= 5 &&
    hasMarker(deal, MARKERS.postAudit) &&
    !hasMarker(deal, MARKERS.noResponse)
  ) {
    return 'noResponse' as const;
  }

  return null;
}

function buildReminderEmail(contact: HubSpotContactRecord, startTime: Date) {
  const { auditDate, auditTime } = formatAuditDateTime(startTime);
  const calendlyUrl = 'https://calendly.com/heyde-studio/20min';

  return {
    marker: MARKERS.reminder,
    subject: 'Reminder: Your Visual System Audit is Tomorrow',
    htmlContent: generateReminderEmail({
      clientName: firstName(contact),
      auditDate,
      auditTime,
      calendlyEventUrl: calendlyUrl,
    }),
    textContent: generateReminderEmailText({
      clientName: firstName(contact),
      auditDate,
      auditTime,
      calendlyEventUrl: calendlyUrl,
    }),
  };
}

function buildPostAuditEmail(contact: HubSpotContactRecord, deal: HubSpotDealRecord) {
  const brand = brandName(contact, deal);

  return {
    marker: MARKERS.postAudit,
    subject: `${brand}: Your Visual System Audit Follow-up`,
    htmlContent: generateFollowUpEmail({
      clientName: firstName(contact),
      brandName: brand,
      auditDate: new Date().toLocaleDateString('en-US'),
      currentState: 'Your brand has a clear visual opportunity, but the system around production is where consistency and speed can improve.',
      mainGap: 'The main bottleneck is turning creative direction into repeatable assets without rebuilding decisions each time.',
      systemOpportunity: 'A documented visual system can lock identity, reusable rules, and production workflows so assets scale with less friction.',
      investmentLevel: 'medium',
      nextStepsRecommended: 'Reply to this email with any questions, or book a short follow-up call so we can map the right next step.',
    }),
    textContent: generateFollowUpEmailText({
      clientName: firstName(contact),
      brandName: brand,
      auditDate: new Date().toLocaleDateString('en-US'),
      currentState: 'Your brand has a clear visual opportunity, but the system around production is where consistency and speed can improve.',
      mainGap: 'The main bottleneck is turning creative direction into repeatable assets without rebuilding decisions each time.',
      systemOpportunity: 'A documented visual system can lock identity, reusable rules, and production workflows so assets scale with less friction.',
      investmentLevel: 'medium',
      nextStepsRecommended: 'Reply to this email with any questions, or book a short follow-up call so we can map the right next step.',
    }),
  };
}

function buildNoResponseEmail(contact: HubSpotContactRecord, deal: HubSpotDealRecord) {
  const brand = brandName(contact, deal);
  const name = firstName(contact);
  const callLink = 'https://calendly.com/heyde-studio/20min';

  return {
    marker: MARKERS.noResponse,
    subject: `Still useful to explore this for ${brand}?`,
    htmlContent: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#171717;line-height:1.6;">
        <h1 style="font-size:26px;margin:0 0 20px;">One more thought</h1>
        <p>Hi ${name},</p>
        <p>Just checking in after your visual system audit. If this is still relevant for ${brand}, the next useful step is a short implementation conversation.</p>
        <p>The opportunity is usually not just making better assets. It is creating a repeatable system so visual quality, speed, and consistency stop depending on one-off effort.</p>
        <p style="margin:28px 0;">
          <a href="${callLink}" style="display:inline-block;background:#d033f0;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:700;">Book a follow-up call</a>
        </p>
        <p>If priorities changed, no stress. You can also reply and I will close the loop on my side.</p>
        <p>Best,<br/>HEYDE Studio</p>
      </div>
    `,
    textContent: `Hi ${name},

Just checking in after your visual system audit. If this is still relevant for ${brand}, the next useful step is a short implementation conversation.

Book a follow-up call: ${callLink}

If priorities changed, no stress. You can also reply and I will close the loop on my side.

Best,
HEYDE Studio`,
  };
}

async function getPrimaryContact(deal: HubSpotDealRecord) {
  const contactId = deal.contactIds[0];
  if (!contactId) return null;

  const result = await getHubSpotContactById(contactId);
  if (!result.ok) {
    console.error('Followup contact lookup failed:', result.error);
    return null;
  }

  return result.contact.properties.email ? result.contact : null;
}

export async function runFollowups({ dryRun = false } = {}): Promise<FollowupResult> {
  const dealsResult = await listHubSpotDealsForFollowups();
  if (!dealsResult.ok) {
    console.error('Followup deal lookup failed:', dealsResult.error);
    return {
      configured: false,
      dryRun,
      scannedDeals: 0,
      eligibleDeals: 0,
      sent: 0,
      wouldSend: 0,
      failed: 1,
      skipped: 0,
    };
  }

  const now = new Date();
  const result: FollowupResult = {
    configured: true,
    dryRun,
    scannedDeals: dealsResult.deals.length,
    eligibleDeals: 0,
    sent: 0,
    wouldSend: 0,
    failed: 0,
    skipped: 0,
  };

  for (const deal of dealsResult.deals) {
    const followup = chooseFollowup(deal, now);
    if (!followup) {
      result.skipped += 1;
      continue;
    }

    result.eligibleDeals += 1;
    const contact = await getPrimaryContact(deal);
    const startTime = getDealStart(deal);

    if (!contact || !contact.properties.email || !startTime) {
      result.failed += 1;
      continue;
    }

    const email =
      followup === 'reminder'
        ? buildReminderEmail(contact, startTime)
      : followup === 'postAudit'
        ? buildPostAuditEmail(contact, deal)
        : buildNoResponseEmail(contact, deal);

    if (dryRun) {
      result.wouldSend += 1;
      continue;
    }

    const emailResult = await sendBrevoEmail({
      to: [{ email: contact.properties.email, name: contactName(contact) }],
      subject: email.subject,
      htmlContent: email.htmlContent,
      textContent: email.textContent,
    });

    if (!emailResult.ok) {
      console.error('Followup email failed:', emailResult);
      result.failed += 1;
      continue;
    }

    const updateResult = await updateHubSpotDealDescription(
      deal.id,
      appendMarker(deal.properties.description, email.marker)
    );

    if (!updateResult.ok) {
      console.error('Followup marker update failed:', updateResult.error);
      result.failed += 1;
      continue;
    }

    result.sent += 1;
  }

  return result;
}
