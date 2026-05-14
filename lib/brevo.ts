interface BrevoRecipient {
  email: string;
  name?: string;
}

interface SendBrevoEmailInput {
  to: BrevoRecipient[];
  subject: string;
  htmlContent: string;
  textContent: string;
  senderName?: string;
}

interface BrevoSuccess {
  ok: true;
  messageId?: string;
}

interface BrevoFailure {
  ok: false;
  status: number;
  error: string;
  details?: unknown;
}

export type BrevoResult = BrevoSuccess | BrevoFailure;

const BREVO_API_URL = 'https://api.brevo.com/v3';

function brevoHeaders(apiKey: string) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'api-key': apiKey,
  };
}

export function isBrevoConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
}

export function getBrevoSenderEmail(): string {
  return process.env.BREVO_SENDER_EMAIL || 'contact@heydestudio.com';
}

export function getBrevoNotificationEmail(): string {
  return process.env.BREVO_NOTIFICATION_EMAIL || getBrevoSenderEmail();
}

export function getBrevoNewsletterListIds(): number[] {
  const raw =
    process.env.BREVO_NEWSLETTER_LIST_IDS ||
    process.env.BREVO_NEWSLETTER_LIST_ID ||
    '3';

  return raw
    .split(',')
    .map((value) => Number.parseInt(value.trim(), 10))
    .filter((value) => Number.isInteger(value) && value > 0);
}

export async function sendBrevoEmail({
  to,
  subject,
  htmlContent,
  textContent,
  senderName = 'HEYDE Studio',
}: SendBrevoEmailInput): Promise<BrevoResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey || !senderEmail) {
    return {
      ok: false,
      status: 500,
      error: 'Email service not configured',
    };
  }

  try {
    const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        ...brevoHeaders(apiKey),
      },
      body: JSON.stringify({
        sender: {
          email: senderEmail,
          name: senderName,
        },
        to,
        subject,
        htmlContent,
        textContent,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: 'Failed to send email',
        details: result,
      };
    }

    return {
      ok: true,
      messageId: typeof result.messageId === 'string' ? result.messageId : undefined,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown Brevo error',
    };
  }
}

export async function subscribeBrevoContact({
  email,
  name,
  source = 'website_newsletter',
}: {
  email: string;
  name?: string;
  source?: string;
}): Promise<
  | { ok: true; listIds: number[] }
  | { ok: false; status: number; error: string; details?: unknown }
> {
  const apiKey = process.env.BREVO_API_KEY;
  const listIds = getBrevoNewsletterListIds();

  if (!apiKey || listIds.length === 0) {
    return {
      ok: false,
      status: 500,
      error: 'Newsletter service not configured',
    };
  }

  const [firstName, ...rest] = (name || '').trim().split(/\s+/).filter(Boolean);
  const attributes: Record<string, string> = {
    SOURCE: source,
  };

  if (firstName) attributes.FIRSTNAME = firstName;
  if (rest.length > 0) attributes.LASTNAME = rest.join(' ');

  try {
    const response = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: brevoHeaders(apiKey),
      body: JSON.stringify({
        email,
        attributes,
        listIds,
        updateEnabled: true,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: 'Failed to subscribe contact',
        details: result,
      };
    }

    return { ok: true, listIds };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : 'Unknown Brevo error',
    };
  }
}

export async function checkBrevoConnection(): Promise<
  | {
      configured: true;
      accountStatus: number;
      senderEmail: string;
      notificationEmail: string;
    }
  | {
      configured: false;
      accountStatus?: number;
      error: string;
    }
> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey || !senderEmail) {
    return {
      configured: false,
      error: 'BREVO_API_KEY and BREVO_SENDER_EMAIL are required',
    };
  }

  try {
    const response = await fetch(`${BREVO_API_URL}/account`, {
      headers: {
        Accept: 'application/json',
        'api-key': apiKey,
      },
    });

    if (!response.ok) {
      return {
        configured: false,
        accountStatus: response.status,
        error: 'Brevo account check failed',
      };
    }

    return {
      configured: true,
      accountStatus: response.status,
      senderEmail,
      notificationEmail: getBrevoNotificationEmail(),
    };
  } catch (error) {
    return {
      configured: false,
      error: error instanceof Error ? error.message : 'Unknown Brevo error',
    };
  }
}
