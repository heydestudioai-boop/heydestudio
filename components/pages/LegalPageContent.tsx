'use client';

import { useLanguage } from '@/lib/language';

const legalCopy = {
  EN: {
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: August 21, 2026',
      intro:
        'HEYDE Studio collects only the information needed to respond to enquiries, run audits, and improve the website.',
      sections: [
        {
          title: 'Information We Collect',
          body: 'We may collect contact details, business name, city or area, website or Instagram profile, optional phone number, form messages, privacy-consent timestamp, analytics events, and basic technical data such as browser, device, and page interactions.',
        },
        {
          title: 'How We Use Information',
          body: 'We use information to respond to requests, manage audit and project-enquiry workflows, improve website performance, and maintain CRM or email-service records when you submit a form.',
        },
        {
          title: 'Third-Party Services',
          body: 'The website may use HubSpot to keep request records, Brevo for transactional email, and Google Analytics after consent. These services process data according to their own terms and privacy policies.',
        },
        {
          title: 'Security',
          body: 'Forms and internal endpoints use validation, rate limiting, anti-spam controls, protected internal tokens, and security headers. No website can be guaranteed perfectly secure, but the system is designed to reduce common risks.',
        },
        {
          title: 'Your Choices',
          body: 'You can request access, correction, or deletion of your personal information by contacting contact@heydestudio.com.',
        },
      ],
    },
    terms: {
      title: 'Terms of Use',
      updated: 'Last updated: May 7, 2026',
      intro:
        'By using the HEYDE Studio website or its forms, you agree to use them lawfully and responsibly.',
      sections: [
        {
          title: 'Website Content',
          body: 'Website copy, frameworks, and examples are provided for general informational purposes and do not create a client relationship unless a separate agreement is signed.',
        },
        {
          title: 'Service Enquiries',
          body: 'Submitting a form does not guarantee availability, pricing, timeline, or acceptance of a project. Project scope is confirmed separately in writing.',
        },
        {
          title: 'Acceptable Use',
          body: 'You must not misuse forms, attempt to access internal endpoints, interfere with website security, or submit unlawful, abusive, or misleading content.',
        },
        {
          title: 'Contact',
          body: 'For questions about these terms, contact contact@heydestudio.com.',
        },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      updated: 'Last updated: May 14, 2026',
      intro:
        'HEYDE Studio uses necessary storage for core website preferences and optional analytics only if you consent.',
      sections: [
        {
          title: 'Necessary Storage',
          body: 'We use local storage to remember your language preference and cookie consent choice. This is required for the website to work consistently and cannot be disabled from the banner.',
        },
        {
          title: 'Analytics',
          body: 'If you accept analytics, Google Analytics may measure page views and non-personal interactions. Form values, names, emails, phone numbers, and business identifiers are not sent as analytics event parameters. Analytics is not loaded until you accept it.',
        },
        {
          title: 'Changing Your Choice',
          body: 'You can reopen Cookie settings from the footer at any time and accept, reject, or change analytics consent.',
        },
      ],
    },
  },
  ES: {
    privacy: {
      title: 'Política De Privacidad',
      updated: 'Última actualización: 21 de agosto de 2026',
      intro:
        'HEYDE Studio recoge únicamente la información necesaria para responder solicitudes, gestionar auditorías y mejorar la web.',
      sections: [
        {
          title: 'Información Que Recogemos',
          body: 'Podemos recoger datos de contacto, nombre del negocio, ciudad o zona, web o perfil de Instagram, teléfono opcional, mensajes de formularios, fecha del consentimiento de privacidad, eventos de analítica y datos técnicos básicos como navegador, dispositivo e interacción con páginas.',
        },
        {
          title: 'Cómo Usamos La Información',
          body: 'Usamos la información para responder solicitudes, gestionar flujos de auditoría y consultas de proyecto, mejorar rendimiento y mantener registros en CRM o servicios de email cuando envías un formulario.',
        },
        {
          title: 'Servicios De Terceros',
          body: 'La web puede usar HubSpot para conservar solicitudes, Brevo para email transaccional y Google Analytics después del consentimiento. Estos servicios procesan datos según sus propias políticas y condiciones.',
        },
        {
          title: 'Seguridad',
          body: 'Los formularios y endpoints internos usan validación, rate limiting, controles anti-spam, tokens internos protegidos y cabeceras de seguridad. Ninguna web puede garantizar seguridad perfecta, pero el sistema reduce riesgos comunes.',
        },
        {
          title: 'Tus Opciones',
          body: 'Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a contact@heydestudio.com.',
        },
      ],
    },
    terms: {
      title: 'Términos De Uso',
      updated: 'Última actualización: 7 de mayo de 2026',
      intro:
        'Al usar la web o los formularios de HEYDE Studio aceptas usarlos de forma legal y responsable.',
      sections: [
        {
          title: 'Contenido De La Web',
          body: 'El copy, frameworks y ejemplos se ofrecen como información general y no crean una relación de cliente salvo que exista un acuerdo firmado aparte.',
        },
        {
          title: 'Solicitudes De Servicio',
          body: 'Enviar un formulario no garantiza disponibilidad, precios, plazos ni aceptación de un proyecto. El alcance se confirma por escrito.',
        },
        {
          title: 'Uso Aceptable',
          body: 'No debes abusar de formularios, intentar acceder a endpoints internos, interferir con la seguridad ni enviar contenido ilegal, abusivo o engañoso.',
        },
        {
          title: 'Contacto',
          body: 'Para preguntas sobre estos términos, escribe a contact@heydestudio.com.',
        },
      ],
    },
    cookies: {
      title: 'Política De Cookies',
      updated: 'Última actualización: 21 de agosto de 2026',
      intro:
        'HEYDE Studio usa almacenamiento necesario para preferencias básicas de la web y analítica opcional solo si das tu consentimiento.',
      sections: [
        {
          title: 'Almacenamiento Necesario',
          body: 'Usamos local storage para recordar tu idioma y tu elección de consentimiento de cookies. Es necesario para que la web funcione de forma consistente y no se puede desactivar desde el banner.',
        },
        {
          title: 'Analítica',
          body: 'Si aceptas analítica, Google Analytics puede medir visitas e interacciones no personales. Los valores del formulario, nombres, emails, teléfonos e identificadores de negocio no se envían como parámetros de analítica. La analítica no se carga hasta que la aceptas.',
        },
        {
          title: 'Cambiar Tu Elección',
          body: 'Puedes reabrir Configurar cookies desde el footer en cualquier momento y aceptar, rechazar o cambiar el consentimiento de analítica.',
        },
      ],
    },
  },
} as const;

export function LegalPageContent({ type }: { type: 'privacy' | 'terms' | 'cookies' }) {
  const { language } = useLanguage();
  const page = legalCopy[language][type];

  return (
    <main className="bg-white">
      <section className="bg-black px-6 py-20 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-white/50">
            {page.updated}
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            {page.title}
          </h1>
          <p className="text-lg leading-relaxed text-white/75">{page.intro}</p>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl space-y-10">
          {page.sections.map((section) => (
            <section key={section.title} className="border-b border-gray-200 pb-10 last:border-0">
              <h2 className="mb-3 text-2xl font-bold text-gray-950">{section.title}</h2>
              <p className="leading-relaxed text-gray-700">{section.body}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
