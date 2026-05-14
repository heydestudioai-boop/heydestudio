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

export function isBrevoConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
}

export function getBrevoSenderEmail(): string {
  return process.env.BREVO_SENDER_EMAIL || 'contact@heydestudio.com';
}

export function getBrevoNotificationEmail(): string {
  return process.env.BREVO_NOTIFICATION_EMAIL || getBrevoSenderEmail();
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
        'Content-Type': 'application/json',
        'api-key': apiKey,
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
