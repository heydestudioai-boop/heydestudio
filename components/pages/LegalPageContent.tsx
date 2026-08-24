import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  aiPolicy,
  commercialConditions,
  launchOffer,
  rightsPolicy,
} from '@/lib/canonical';

type LegalPageType = 'privacy' | 'terms' | 'cookies';
type LegalLocale = 'es' | 'en';

interface LegalSection {
  title: string;
  body: ReactNode;
}

interface LegalPage {
  title: string;
  updated: string;
  intro: string;
  alternate: { href: string; label: string };
  sections: readonly LegalSection[];
}

const officialProviderLinks = {
  vercel: 'https://vercel.com/legal/dpa',
  hubspot: 'https://legal.hubspot.com/dpa',
  brevo: 'https://help.brevo.com/hc/en-us/articles/15403782599570-Where-can-I-find-the-Data-Processing-Agreement-DPA',
  google: 'https://support.google.com/analytics/answer/3379636',
  aepd: 'https://www.aepd.es/derechos-y-deberes/ejerce-tus-derechos',
} as const;

const legalOwner = {
  name: 'Oliver Heyde Arias',
  taxId: '03958826C',
  address: 'Calle Tempranillo 9, Toledo',
  email: 'contact@heydestudio.com',
} as const;

function LegalOwnerIdentity({ locale }: { locale: LegalLocale }) {
  if (locale === 'en') {
    return (
      <>
        The controller and service provider is <strong>{legalOwner.name}</strong>, Spanish tax ID{' '}
        <strong>{legalOwner.taxId}</strong>, with legal and tax address at{' '}
        <strong>{legalOwner.address}</strong>. He is a self-employed individual established in Spain
        operating under the HEYDE Studio brand, and services are directly contracted with and
        provided by him. Legal and privacy contact:{' '}
        <a href={`mailto:${legalOwner.email}`}>{legalOwner.email}</a>.
      </>
    );
  }

  return (
    <>
      El responsable y prestador de los servicios es <strong>{legalOwner.name}</strong>, con NIF{' '}
      <strong>{legalOwner.taxId}</strong> y domicilio legal y fiscal en{' '}
      <strong>{legalOwner.address}</strong>. Es una persona física autónoma establecida en España que
      opera bajo la marca HEYDE Studio, y los servicios se contratan y prestan directamente por él.
      Contacto legal y de privacidad:{' '}
      <a href={`mailto:${legalOwner.email}`}>{legalOwner.email}</a>.
    </>
  );
}

const privacyEs: LegalPage = {
  title: 'Política de privacidad',
  updated: 'Última actualización: 24 de agosto de 2026',
  intro:
    'Esta política explica cómo se tratan los datos en los formularios, servicios e infraestructura actuales de HEYDE Studio. No convierte una solicitud en consentimiento para marketing.',
  alternate: { href: '/en/privacy', label: 'Read in English' },
  sections: [
    {
      title: 'Responsable e identificación',
      body: <LegalOwnerIdentity locale="es" />,
    },
    {
      title: 'Auditoría local y consulta de proyecto',
      body: (
        <>
          En <code>/audit</code> se solicitan negocio, zona, web o Instagram, persona de contacto,
          email y teléfono opcional para registrar, preparar y entregar la auditoría
          (<code>lead_type=local_audit</code>). En <code>/contact</code> se solicitan nombre, empresa,
          email, presencia opcional, tipo de proyecto y brief para revisar y responder una consulta
          de marca (<code>lead_type=brand_inquiry</code>). Cada flujo registra un identificador,
          timestamps y estados de confirmación. Ninguno crea automáticamente un Deal.
        </>
      ),
    },
    {
      title: 'Finalidades y bases jurídicas',
      body: (
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Auditorías y consultas: aplicación de medidas precontractuales solicitadas por la
            persona interesada, cuando resulte aplicable.
          </li>
          <li>Prestación de servicios a clientes: ejecución del contrato.</li>
          <li>
            Facturación, contabilidad y obligaciones fiscales: cumplimiento de obligaciones
            legales.
          </li>
          <li>
            Logs técnicos mínimos, rate limiting, prevención de abuso y seguridad: interés legítimo
            limitado a proteger la web, los formularios y sus usuarios, aplicado de forma necesaria
            y proporcionada.
          </li>
          <li>
            Google Analytics 4: consentimiento, que puede rechazarse o retirarse en cualquier
            momento.
          </li>
        </ul>
      ),
    },
    {
      title: 'Qué significa la casilla de privacidad',
      body: (
        <>
          La casilla obligatoria de <code>/audit</code> y <code>/contact</code> confirma que has leído
          esta información y que solicitas la tramitación de la petición. No es una autorización
          general para todos los tratamientos, no te incorpora a una newsletter y no sustituye las
          bases jurídicas indicadas para contrato, obligaciones legales, seguridad o analítica.
        </>
      ),
    },
    {
      title: 'Marketing',
      body: (
        <>
          Las solicitudes de auditoría y proyecto no se añaden automáticamente a una lista de
          marketing. No se infiere consentimiento promocional del envío de esos formularios. Si en
          el futuro se introduce marketing para no clientes, necesitará una base apropiada y, cuando
          corresponda, un consentimiento separado y explícito.
        </>
      ),
    },
    {
      title: 'Conservación',
      body: (
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Leads y consultas que no se convierten en clientes: máximo 12 meses desde la última
            interacción significativa. Después se eliminan o anonimizan, salvo otra base legal
            documentada.
          </li>
          <li>
            Datos operativos de clientes: durante la relación y solo el tiempo posterior
            razonablemente necesario para cerrar el servicio o atender responsabilidades.
          </li>
          <li>
            Contratos, facturas y documentación contable o empresarial: 6 años cuando resulte
            necesario o apropiado para obligaciones mercantiles, fiscales o reclamaciones en España.
          </li>
          <li>
            Cuando termina la finalidad activa, los datos conservados exclusivamente por obligación
            legal o reclamaciones se bloquean o restringen y no se reutilizan comercialmente.
          </li>
        </ul>
      ),
    },
    {
      title: 'Proveedores y transferencias',
      body: (
        <div className="space-y-4">
          <p>
            Solo intervienen los proveedores que necesita el sistema actual. La configuración
            contractual y de cuenta debe contrastarse antes de Production:
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <a href={officialProviderLinks.vercel}>Vercel</a>: hosting e infraestructura. Su DPA
              describe a Vercel como encargado para datos del cliente, procesamiento principal en
              Estados Unidos y garantías como cláusulas contractuales tipo cuando resultan
              aplicables. Debe verificarse la cobertura del plan contratado.
            </li>
            <li>
              <a href={officialProviderLinks.hubspot}>HubSpot</a>: CRM y system of record. Su DPA
              contempla el rol de encargado para datos del cliente y SCC para transferencias
              restringidas. La región real de la cuenta HEYDE no está verificada públicamente.
            </li>
            <li>
              <a href={officialProviderLinks.brevo}>Brevo</a>: email transaccional. Publica un DPA
              integrado en sus términos y documenta almacenamiento de bases de datos en la UE
              (Francia, Alemania y Bélgica). Cualquier acceso de subencargados desde terceros países
              debe contrastarse con el contrato vigente.
            </li>
            <li>
              <a href={officialProviderLinks.google}>Google Analytics 4</a>: analítica solo tras
              consentimiento. Google publica términos de encargado para Analytics; determinados
              ajustes de compartición pueden implicar roles adicionales. Para transferencias,
              Google documenta mecanismos como marcos de adecuación y SCC cuando corresponden.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Analítica y canales externos',
      body: (
        <>
          Los eventos propios de <code>/audit</code> y <code>/contact</code> solo incluyen evento,
          categoría, ruta e idioma; no contienen valores de formulario ni PII. WhatsApp es un canal
          externo que se activa únicamente cuando eliges abrir su enlace. HEYDE Studio no envía los
          formularios a WhatsApp.
        </>
      ),
    },
    {
      title: 'Derechos y reclamaciones',
      body: (
        <>
          Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad, y
          retirar el consentimiento de analítica sin afectar al tratamiento previo, escribiendo a{' '}
          <a href="mailto:contact@heydestudio.com">contact@heydestudio.com</a>. La identidad podrá
          verificarse de forma proporcionada cuando sea necesario. También puedes presentar una
          reclamación ante la{' '}
          <a href={officialProviderLinks.aepd}>Agencia Española de Protección de Datos</a>.
        </>
      ),
    },
  ],
};

const privacyEn: LegalPage = {
  title: 'Privacy policy',
  updated: 'Last updated: 24 August 2026',
  intro:
    'This policy explains how data is processed through HEYDE Studio’s current forms, services and infrastructure. Submitting an inquiry does not create marketing consent.',
  alternate: { href: '/privacy', label: 'Versión original en español' },
  sections: [
    {
      title: 'Controller and identification',
      body: <LegalOwnerIdentity locale="en" />,
    },
    {
      title: 'Local audit and project inquiry',
      body: (
        <>
          <code>/audit</code> collects business, area, website or Instagram, contact name, email and
          optional phone details to register, prepare and deliver an audit
          (<code>lead_type=local_audit</code>). <code>/contact</code> collects name, company, email,
          optional online presence, project type and brief to review and answer a brand inquiry
          (<code>lead_type=brand_inquiry</code>). Each flow stores an identifier, timestamps and
          confirmation states. Neither creates a Deal automatically.
        </>
      ),
    },
    {
      title: 'Purposes and legal bases',
      body: (
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Audits and inquiries: pre-contractual steps requested by the data subject, where
            applicable.
          </li>
          <li>Client services: performance of a contract.</li>
          <li>Invoices, accounts and tax records: compliance with legal obligations.</li>
          <li>
            Minimal technical logs, rate limiting, abuse prevention and security: legitimate
            interest limited to protecting the website, forms and their users, applied where
            necessary and proportionate.
          </li>
          <li>Google Analytics 4: consent, which can be rejected or withdrawn at any time.</li>
        </ul>
      ),
    },
    {
      title: 'What the privacy checkbox means',
      body: (
        <>
          The required checkbox on <code>/audit</code> and <code>/contact</code> confirms that you have
          read this information and request that the inquiry be handled. It is not blanket consent
          for every processing activity, does not subscribe you to a newsletter and does not replace
          the legal bases stated for contracts, legal obligations, security or analytics.
        </>
      ),
    },
    {
      title: 'Marketing',
      body: (
        <>
          Audit and project submissions are not automatically added to a marketing list. Promotional
          consent is not inferred from either form. Marketing to non-clients introduced in the
          future would require an appropriate basis and, where required, separate explicit consent.
        </>
      ),
    },
    {
      title: 'Retention',
      body: (
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Leads and inquiries that do not become clients: no more than 12 months after the last
            meaningful interaction, then deletion or anonymisation unless another documented legal
            ground applies.
          </li>
          <li>
            Operational client data: for the relationship and only as long afterwards as reasonably
            necessary to close the service or address liabilities.
          </li>
          <li>
            Contracts, invoices and accounting or business documentation: 6 years where necessary
            or appropriate for Spanish commercial, tax or claims obligations.
          </li>
          <li>
            Data kept solely for legal duties or claims after its active purpose ends is blocked or
            restricted and is not reused for commercial purposes.
          </li>
        </ul>
      ),
    },
    {
      title: 'Providers and international transfers',
      body: (
        <div className="space-y-4">
          <p>
            Only providers required by the current system are listed. The applicable account and
            contractual settings must be checked before Production:
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <a href={officialProviderLinks.vercel}>Vercel</a>: hosting and infrastructure. Its DPA
              describes Vercel as processor for customer data, primary processing in the United
              States and safeguards such as Standard Contractual Clauses where applicable. Coverage
              under the contracted plan must be verified.
            </li>
            <li>
              <a href={officialProviderLinks.hubspot}>HubSpot</a>: CRM and system of record. Its DPA
              provides processor terms for customer data and SCCs for restricted transfers. The
              actual hosting region of the HEYDE account has not been publicly verified.
            </li>
            <li>
              <a href={officialProviderLinks.brevo}>Brevo</a>: transactional email. It publishes a
              DPA within its terms and documents database storage in the EU (France, Germany and
              Belgium). Access by subprocessors from third countries must be checked against the
              current agreement.
            </li>
            <li>
              <a href={officialProviderLinks.google}>Google Analytics 4</a>: analytics only after
              consent. Google publishes processor terms for Analytics; some data-sharing settings
              may introduce additional roles. Google documents adequacy frameworks and SCCs for
              international transfers where applicable.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Analytics and external channels',
      body: (
        <>
          First-party <code>/audit</code> and <code>/contact</code> events contain only event name,
          category, route and language, never form values or PII. WhatsApp is an external channel
          opened only when you choose its link; HEYDE Studio does not send form data to WhatsApp.
        </>
      ),
    },
    {
      title: 'Your rights and complaints',
      body: (
        <>
          You may request access, rectification, erasure, restriction, objection and portability,
          and withdraw analytics consent without affecting prior processing, by emailing{' '}
          <a href="mailto:contact@heydestudio.com">contact@heydestudio.com</a>. Identity may be
          verified proportionately where needed. You may also complain to the{' '}
          <a href={officialProviderLinks.aepd}>Spanish Data Protection Agency (AEPD)</a>.
        </>
      ),
    },
  ],
};

const termsEs: LegalPage = {
  title: 'Términos de uso',
  updated: 'Última actualización: 24 de agosto de 2026',
  intro:
    'Estos términos regulan el uso de la web y resumen condiciones públicas verificadas. No sustituyen un presupuesto ni el contrato de prestación de servicios.',
  alternate: { href: '/en/terms', label: 'Read in English' },
  sections: [
    {
      title: 'Identificación del prestador',
      body: (
        <>
          <LegalOwnerIdentity locale="es" /> No se atribuyen inscripción mercantil, colegio
          profesional ni profesión regulada no confirmados.
        </>
      ),
    },
    {
      title: 'Web, solicitudes y contratación',
      body: (
        <>
          El contenido es informativo. Enviar <code>/audit</code> o <code>/contact</code> no garantiza
          disponibilidad, aceptación, alcance, precio ni fecha, y no crea por sí solo una relación
          contractual. Cada proyecto se confirma por escrito; el presupuesto o contrato aceptado
          prevalece si existe alguna diferencia.
        </>
      ),
    },
    {
      title: 'Precios, IVA y planes',
      body: (
        <>
          {commercialConditions[1]} Los precios «desde» y los proyectos sin tarifa cerrada requieren
          presupuesto. {commercialConditions[0]}
        </>
      ),
    },
    {
      title: 'Entregables, derechos y archivos',
      body: (
        <>
          {rightsPolicy} El alcance, formatos, usos y excepciones deben constar en el presupuesto o
          contrato aceptado.
        </>
      ),
    },
    {
      title: 'Desplazamientos',
      body: (
        <>
          {commercialConditions[2]} Los desplazamientos fuera de esa zona se presupuestan según el
          proyecto.
        </>
      ),
    },
    {
      title: 'Producción e inteligencia artificial',
      body: (
        <>
          {aiPolicy.short} {aiPolicy.disclosure} El encargo escrito determina las técnicas y
          entregables de cada proyecto.
        </>
      ),
    },
    {
      title: 'Oferta de lanzamiento',
      body: launchOffer.active ? (
        <>
          Mientras la web la muestre activa, se publican {launchOffer.slots} plazas del plan
          Crecimiento a {launchOffer.priceLabel} en lugar de {launchOffer.listPriceLabel},{' '}
          {launchOffer.duration}, {launchOffer.consideration}. Enviar un formulario no reserva una
          plaza; disponibilidad y condiciones se confirman por escrito.
        </>
      ) : (
        'No hay una oferta de lanzamiento activa.'
      ),
    },
    {
      title: 'Ley aplicable y controversias',
      body: (
        <>
          Se aplica la legislación española. Cualquier controversia se someterá a los juzgados y
          tribunales que resulten competentes conforme a la legislación aplicable, sin imponer con
          carácter universal los tribunales de Toledo. Los contratos B2B concretos pueden incluir su
          propia cláusula de jurisdicción tras revisión separada. Los derechos imperativos de
          consumidores, cuando resulten aplicables, no quedan limitados por esta web.
        </>
      ),
    },
    {
      title: 'Uso aceptable',
      body: (
        <>
          No se permite abusar de los formularios, intentar acceder a endpoints internos, interferir
          con la seguridad o enviar contenido ilícito o engañoso.
        </>
      ),
    },
  ],
};

const termsEn: LegalPage = {
  title: 'Terms of use',
  updated: 'Last updated: 24 August 2026',
  intro:
    'These terms govern use of the website and summarise verified public conditions. They do not replace a quote or a service contract.',
  alternate: { href: '/terms', label: 'Versión original en español' },
  sections: [
    {
      title: 'Service-provider identification',
      body: (
        <>
          <LegalOwnerIdentity locale="en" /> No unconfirmed commercial-register, professional-body
          or regulated-profession information is stated.
        </>
      ),
    },
    {
      title: 'Website, inquiries and contracting',
      body: (
        <>
          Website content is informational. Sending <code>/audit</code> or <code>/contact</code> does
          not guarantee availability, acceptance, scope, price or delivery date and does not itself
          create a contract. Each project is confirmed in writing; an accepted quote or contract
          prevails if there is any difference.
        </>
      ),
    },
    {
      title: 'Prices, VAT and monthly plans',
      body: (
        <>
          Published prices exclude 21% VAT. Prices described as “from” and projects without a fixed
          fee require a quote. Monthly plans have an initial three-month commitment and may then be
          cancelled with 30 days’ notice.
        </>
      ),
    },
    {
      title: 'Deliverables, rights and working files',
      body: (
        <>
          Final deliverables belong to the client under the terms of the contract. Raw files and
          editable project files are not included unless expressly agreed. Scope, formats, permitted
          uses and exceptions must be set out in the accepted quote or contract.
        </>
      ),
    },
    {
      title: 'Travel',
      body: (
        <>
          Travel is included within Toledo city and nearby areas. Travel outside that area is quoted
          according to the project.
        </>
      ),
    },
    {
      title: 'Production and artificial intelligence',
      body: (
        <>
          Shoots are real, using camera or mobile craft. AI may extend formats and variants when it
          adds value. Materially generated or manipulated content is identified where required by
          law and where omission could mislead people about the business, its products, people or
          experiences. The written engagement defines the techniques and deliverables used.
        </>
      ),
    },
    {
      title: 'Launch offer',
      body: launchOffer.active ? (
        <>
          While shown as active, the website publishes {launchOffer.slots} Growth plan places at
          €690/month instead of €890/month for six months, in exchange for a Google review and a
          publishable case study. A form submission does not reserve a place; availability and terms
          are confirmed in writing.
        </>
      ) : (
        'No launch offer is currently active.'
      ),
    },
    {
      title: 'Governing law and disputes',
      body: (
        <>
          Spanish law applies. Any dispute shall be submitted to the courts and tribunals that are
          competent under applicable law; the website does not impose Toledo courts universally.
          Specific B2B contracts may contain their own jurisdiction clause after separate review.
          Mandatory consumer rights, where applicable, are not restricted by this website.
        </>
      ),
    },
    {
      title: 'Acceptable use and language',
      body: (
        <>
          You may not abuse forms, attempt to access internal endpoints, interfere with security or
          submit unlawful or misleading material. This English version provides equivalent
          information; the Spanish version is the original reference for interpretation without
          reducing the rights described here.
        </>
      ),
    },
  ],
};

const cookiesEs: LegalPage = {
  title: 'Política de cookies',
  updated: 'Última actualización: 24 de agosto de 2026',
  intro:
    'La web usa almacenamiento local necesario para recordar preferencias y Google Analytics 4 únicamente si aceptas la analítica opcional.',
  alternate: { href: '/en/cookies', label: 'Read in English' },
  sections: [
    {
      title: 'Responsable',
      body: <LegalOwnerIdentity locale="es" />,
    },
    {
      title: 'Almacenamiento necesario',
      body: (
        <>
          <code>heyde-cookie-consent</code> guarda en <code>localStorage</code> tu elección de
          analítica y su fecha. <code>heyde-language</code> puede recordar el idioma. No son cookies
          publicitarias y permanecen activos únicamente para recordar esas preferencias.
        </>
      ),
    },
    {
      title: 'Google Analytics 4',
      body: (
        <>
          Si aceptas, se carga la etiqueta de Google Analytics. Puede crear <code>_ga</code> para
          distinguir usuarios y <code>_ga_&lt;id&gt;</code> para mantener el estado de sesión. Google
          documenta una duración predeterminada de 2 años para ambas, aunque el navegador puede
          limitarla. La base jurídica es tu consentimiento.
        </>
      ),
    },
    {
      title: 'Proveedor y transferencias',
      body: (
        <>
          Google publica términos de tratamiento para Analytics y puede utilizar mecanismos de
          transferencia internacional como marcos de adecuación o cláusulas contractuales tipo
          cuando correspondan. La configuración efectiva de retención, compartición y publicidad de
          la propiedad HEYDE requiere revisión de cuenta. Consulta la{' '}
          <Link href="/privacy">política de privacidad</Link> para más información.
        </>
      ),
    },
    {
      title: 'Aceptar, rechazar y revocar',
      body: (
        <>
          La primera visita ofrece aceptar, rechazar o configurar con acciones equivalentes.
          Rechazar mantiene GA sin cargar. Puedes abrir «Configurar cookies» desde el pie en
          cualquier momento; al retirar el consentimiento, la web deshabilita la medición y elimina
          las cookies de GA que puede identificar.
        </>
      ),
    },
    {
      title: 'Datos medidos y terceros no cargados',
      body: (
        <>
          Los eventos propios contienen categoría, ruta e idioma, sin campos de formulario ni PII.
          Los funnels actuales no cargan embeds de terceros. WhatsApp solo se abre si eliges su
          enlace externo.
        </>
      ),
    },
  ],
};

const cookiesEn: LegalPage = {
  title: 'Cookie policy',
  updated: 'Last updated: 24 August 2026',
  intro:
    'The website uses necessary local storage to remember preferences and Google Analytics 4 only when you accept optional analytics.',
  alternate: { href: '/cookies', label: 'Versión original en español' },
  sections: [
    {
      title: 'Controller',
      body: <LegalOwnerIdentity locale="en" />,
    },
    {
      title: 'Necessary storage',
      body: (
        <>
          <code>heyde-cookie-consent</code> stores your analytics choice and its date in{' '}
          <code>localStorage</code>. <code>heyde-language</code> may remember language. These values
          are not advertising cookies and remain active only to remember those preferences.
        </>
      ),
    },
    {
      title: 'Google Analytics 4',
      body: (
        <>
          If you accept, the Google Analytics tag loads. It may create <code>_ga</code> to distinguish
          users and <code>_ga_&lt;id&gt;</code> to persist session state. Google documents a default
          lifetime of two years for both, although browsers may limit it. The legal basis is your
          consent.
        </>
      ),
    },
    {
      title: 'Provider and transfers',
      body: (
        <>
          Google publishes processing terms for Analytics and may use international-transfer
          mechanisms such as adequacy frameworks or Standard Contractual Clauses where applicable.
          The HEYDE property’s effective retention, data-sharing and advertising settings require an
          account review. See the <Link href="/en/privacy">privacy policy</Link> for details.
        </>
      ),
    },
    {
      title: 'Accept, reject and withdraw',
      body: (
        <>
          On the first visit, accept, reject and configure are offered as equivalent actions.
          Rejecting keeps GA unloaded. You can open “Cookie settings” from the footer at any time;
          withdrawing disables measurement and removes the GA cookies the site can identify.
        </>
      ),
    },
    {
      title: 'Measured data and third parties not loaded',
      body: (
        <>
          First-party events contain category, route and language, not form fields or PII. Current
          funnels do not load third-party embeds. WhatsApp opens only if you choose its external
          link.
        </>
      ),
    },
  ],
};

const legalPages: Record<LegalLocale, Record<LegalPageType, LegalPage>> = {
  es: { privacy: privacyEs, terms: termsEs, cookies: cookiesEs },
  en: { privacy: privacyEn, terms: termsEn, cookies: cookiesEn },
};

export function LegalPageContent({
  type,
  locale = 'es',
}: {
  type: LegalPageType;
  locale?: LegalLocale;
}) {
  const page = legalPages[locale][type];

  return (
    <main className="bg-white">
      <section className="bg-black px-6 py-20 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold uppercase tracking-wider text-white/50">
              {page.updated}
            </p>
            <Link
              href={page.alternate.href}
              className="text-xs font-bold uppercase tracking-wider text-white/70 underline underline-offset-4 transition hover:text-white"
            >
              {page.alternate.label}
            </Link>
          </div>
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
              <div className="leading-relaxed text-gray-700 [&_a]:font-bold [&_a]:text-magenta [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
