function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function buildBrandInquiryConfirmationEmail({
  name,
  company,
}: {
  name: string;
  company: string;
}) {
  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company);

  return {
    subject: 'Project inquiry received',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #171717;">
        <p style="font-size: 16px; line-height: 1.6;">Hi ${safeName},</p>
        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for telling HEYDE Studio about ${safeCompany}. Your project inquiry has been received.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          We will review the context and get back to you with a considered next step.
        </p>
        <p style="margin-top: 28px; font-size: 14px; line-height: 1.6; color: #666;">
          HEYDE Studio<br />Creative production for brands and teams
        </p>
      </div>
    `,
    textContent: `Hi ${name},

Thank you for telling HEYDE Studio about ${company}. Your project inquiry has been received.

We will review the context and get back to you with a considered next step.

HEYDE Studio
Creative production for brands and teams`,
  };
}
