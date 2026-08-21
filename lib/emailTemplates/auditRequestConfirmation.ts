function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || 'Hola';
}

export function buildAuditRequestConfirmationEmail({
  contactName,
  businessName,
  locale = 'es',
}: {
  contactName: string;
  businessName: string;
  locale?: 'es' | 'en';
}) {
  const safeName = escapeHtml(firstName(contactName));
  const safeBusiness = escapeHtml(businessName);

  if (locale === 'en') {
    return {
      subject: 'We received your audit request',
      htmlContent: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#171717;line-height:1.6;">
          <p>Hi ${safeName},</p>
          <p>We received the free audit request for <strong>${safeBusiness}</strong>.</p>
          <p>I will review the digital presence you shared and send the audit by email within 72 hours.</p>
          <p>You do not need to book a call or send any more information now.</p>
          <p>Best,<br/>Oliver<br/>HEYDE Studio</p>
        </div>
      `,
      textContent: `Hi ${firstName(contactName)},

We received the free audit request for ${businessName}.

I will review the digital presence you shared and send the audit by email within 72 hours.

You do not need to book a call or send any more information now.

Best,
Oliver
HEYDE Studio`,
    };
  }

  return {
    subject: 'Hemos recibido tu solicitud de auditoría',
    htmlContent: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#171717;line-height:1.6;">
        <p>Hola ${safeName},</p>
        <p>Hemos recibido la solicitud de auditoría gratuita para <strong>${safeBusiness}</strong>.</p>
        <p>Revisaré la presencia digital que nos has indicado y recibirás la auditoría por correo en 72 horas. Si estás en Toledo, también puedo llevártela en persona.</p>
        <p>No necesitas reservar una llamada ni enviarnos más información ahora.</p>
        <p>Un saludo,<br/>Oliver<br/>HEYDE Studio</p>
      </div>
    `,
    textContent: `Hola ${firstName(contactName)},

Hemos recibido la solicitud de auditoría gratuita para ${businessName}.

Revisaré la presencia digital que nos has indicado y recibirás la auditoría por correo en 72 horas. Si estás en Toledo, también puedo llevártela en persona.

No necesitas reservar una llamada ni enviarnos más información ahora.

Un saludo,
Oliver
HEYDE Studio`,
  };
}
