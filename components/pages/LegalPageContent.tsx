'use client';

import { useLanguage } from '@/lib/language';

const legalCopy = {
  EN: {
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: May 7, 2026',
      intro:
        'HEYDE Studio collects only the information needed to respond to enquiries, deliver requested resources, run audits, and improve the website.',
      sections: [
        {
          title: 'Information We Collect',
          body: 'We may collect contact details, company information, form messages, audit questionnaire answers, analytics events, and basic technical data such as browser, device, and page interactions.',
        },
        {
          title: 'How We Use Information',
          body: 'We use information to respond to requests, send resources, manage audit workflows, improve website performance, and maintain CRM or email-service records when you submit a form.',
        },
        {
          title: 'Third-Party Services',
          body: 'The website may use services such as Brevo, HubSpot, Calendly, and Google Analytics. These services process data according to their own terms and privacy policies.',
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
        'By using the HEYDE Studio website, resources, forms, or booking flows, you agree to use them lawfully and responsibly.',
      sections: [
        {
          title: 'Website Content',
          body: 'All website copy, templates, frameworks, and examples are provided for general informational purposes and do not create a client relationship unless a separate agreement is signed.',
        },
        {
          title: 'Free Resources',
          body: 'Downloadable resources are provided as practical guides. You may use them internally, but you may not resell, redistribute, or present them as your own product.',
        },
        {
          title: 'Service Enquiries',
          body: 'Submitting a form or booking a call does not guarantee availability, pricing, timeline, or acceptance of a project. Project scope is confirmed separately in writing.',
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
  },
  ES: {
    privacy: {
      title: 'Política De Privacidad',
      updated: 'Última actualización: 7 de mayo de 2026',
      intro:
        'HEYDE Studio recoge únicamente la información necesaria para responder solicitudes, entregar recursos, gestionar auditorías y mejorar la web.',
      sections: [
        {
          title: 'Información Que Recogemos',
          body: 'Podemos recoger datos de contacto, información de empresa, mensajes de formularios, respuestas de auditoría, eventos de analítica y datos técnicos básicos como navegador, dispositivo e interacción con páginas.',
        },
        {
          title: 'Cómo Usamos La Información',
          body: 'Usamos la información para responder solicitudes, enviar recursos, gestionar flujos de auditoría, mejorar rendimiento y mantener registros en CRM o servicios de email cuando envías un formulario.',
        },
        {
          title: 'Servicios De Terceros',
          body: 'La web puede usar servicios como Brevo, HubSpot, Calendly y Google Analytics. Estos servicios procesan datos según sus propias políticas y condiciones.',
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
        'Al usar la web, recursos, formularios o flujos de reserva de HEYDE Studio aceptas usarlos de forma legal y responsable.',
      sections: [
        {
          title: 'Contenido De La Web',
          body: 'El copy, plantillas, frameworks y ejemplos se ofrecen como información general y no crean una relación de cliente salvo que exista un acuerdo firmado aparte.',
        },
        {
          title: 'Recursos Gratuitos',
          body: 'Los recursos descargables son guías prácticas. Puedes usarlos internamente, pero no revenderlos, redistribuirlos ni presentarlos como producto propio.',
        },
        {
          title: 'Solicitudes De Servicio',
          body: 'Enviar un formulario o reservar una llamada no garantiza disponibilidad, precios, plazos ni aceptación de un proyecto. El alcance se confirma por escrito.',
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
  },
} as const;

export function LegalPageContent({ type }: { type: 'privacy' | 'terms' }) {
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
