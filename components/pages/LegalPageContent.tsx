import type { ReactNode } from 'react';
import {
  aiPolicy,
  commercialConditions,
  launchOffer,
  rightsPolicy,
} from '@/lib/canonical';

type LegalPageType = 'privacy' | 'terms' | 'cookies';

interface LegalSection {
  title: string;
  body: ReactNode;
}

interface LegalPage {
  title: string;
  updated: string;
  intro: string;
  sections: readonly LegalSection[];
}

const privacyPage: LegalPage = {
  title: 'Política de privacidad',
  updated: 'Última actualización: 23 de agosto de 2026',
  intro:
    'Esta política describe los datos que tratan actualmente los formularios y servicios técnicos de HEYDE Studio. No atribuye finalidades ni condiciones que el sistema no utiliza.',
  sections: [
    {
      title: 'Contacto y estado de esta información',
      body: (
        <>
          Para consultas sobre privacidad o para ejercer los derechos que resulten aplicables, puedes
          escribir a <a href="mailto:contact@heydestudio.com">contact@heydestudio.com</a>. La
          identidad jurídica completa del responsable y otros datos obligatorios todavía requieren
          confirmación del titular antes de que esta política pueda considerarse definitiva.
        </>
      ),
    },
    {
      title: 'Solicitud de auditoría local',
      body: (
        <>
          En <code>/audit</code> se solicitan el nombre del negocio, ciudad o zona, web o Instagram,
          nombre y email de contacto y, de forma opcional, teléfono o WhatsApp. El sistema registra
          también un identificador de solicitud, fechas de solicitud y consentimiento, estado de la
          auditoría y estado de la confirmación. La finalidad técnica de este flujo es registrar,
          preparar y entregar la auditoría solicitada. HubSpot conserva el Contact y Brevo envía una
          única confirmación transaccional.
        </>
      ),
    },
    {
      title: 'Consulta de marca o proyecto',
      body: (
        <>
          En <code>/contact</code> se solicitan nombre, empresa, email, tipo de proyecto y brief; la
          web o perfil social es opcional. El sistema registra un identificador de solicitud, la fecha
          de consentimiento y el estado de la confirmación. Este flujo se usa exclusivamente para
          revisar y responder la consulta de proyecto. HubSpot conserva el Contact y Brevo envía una
          única confirmación transaccional. No se convierte automáticamente en una auditoría local ni
          crea un Deal.
        </>
      ),
    },
    {
      title: 'Analítica opcional',
      body: (
        <>
          Google Analytics solo se carga después de aceptar la analítica en el panel de cookies. Los
          eventos propios de <code>/audit</code> y <code>/contact</code> incluyen únicamente el nombre
          del evento, categoría, ruta e idioma. Los valores de formulario, nombres, emails,
          teléfonos, empresas, webs, perfiles sociales y briefs no se envían como parámetros de esos
          eventos.
        </>
      ),
    },
    {
      title: 'Infraestructura y enlaces externos',
      body: (
        <>
          Vercel aloja y ejecuta la web, por lo que recibe los datos técnicos de petición necesarios
          para servirla. La web también ofrece enlaces a WhatsApp; HEYDE Studio no envía datos del
          formulario a WhatsApp y cualquier interacción con ese servicio comienza cuando la persona
          decide abrir el enlace externo.
        </>
      ),
    },
    {
      title: 'Proveedores, conservación y base jurídica',
      body: (
        <>
          Los proveedores técnicamente confirmados son HubSpot, Brevo, Vercel y, tras consentimiento,
          Google Analytics. Las entidades contractuales concretas, ubicaciones de tratamiento,
          posibles transferencias y garantías aplicables no se publican aquí porque aún no han sido
          verificadas. Tampoco se fija una base jurídica o un plazo de conservación sin la decisión y
          revisión legal del titular.
        </>
      ),
    },
    {
      title: 'Seguridad y derechos',
      body: (
        <>
          Los formularios aplican validación, límites de frecuencia y controles anti-spam; los
          endpoints internos requieren autenticación y la web usa cabeceras de seguridad. Puedes
          solicitar información y ejercer los derechos de protección de datos que correspondan a
          través del email indicado. La autoridad de control, un posible delegado de protección de
          datos y el procedimiento legal completo quedan pendientes de confirmación y revisión.
        </>
      ),
    },
  ],
};

const termsPage: LegalPage = {
  title: 'Términos de uso',
  updated: 'Última actualización: 23 de agosto de 2026',
  intro:
    'Estos términos regulan el uso de la web y resumen condiciones públicas verificadas. No sustituyen un presupuesto ni el contrato de prestación de servicios.',
  sections: [
    {
      title: 'Web, solicitudes y contratación',
      body: (
        <>
          El contenido de la web es informativo. Enviar <code>/audit</code> o <code>/contact</code> no
          garantiza disponibilidad, aceptación, alcance, precio ni fecha de entrega, y no crea por sí
          solo una relación contractual. Cada proyecto se confirma por escrito y el contrato o
          presupuesto aceptado prevalece si existe alguna diferencia.
        </>
      ),
    },
    {
      title: 'Precios e IVA',
      body: (
        <>
          {commercialConditions[1]} Los servicios cuyo precio se indica como «desde» y los proyectos
          sin tarifa cerrada requieren presupuesto según alcance.
        </>
      ),
    },
    {
      title: 'Planes mensuales',
      body: commercialConditions[0],
    },
    {
      title: 'Entregables y archivos de trabajo',
      body: (
        <>
          {rightsPolicy} El alcance concreto, formatos, usos y cualquier excepción deben constar en
          el presupuesto o contrato aceptado.
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
          {aiPolicy.short} {aiPolicy.disclosure} El encargo escrito determina qué técnicas y
          entregables forman parte de cada proyecto.
        </>
      ),
    },
    {
      title: 'Oferta de lanzamiento',
      body: launchOffer.active ? (
        <>
          Mientras la web muestre la oferta como activa, se publican {launchOffer.slots} plazas del
          plan Crecimiento a {launchOffer.priceLabel} en lugar de {launchOffer.listPriceLabel},{' '}
          {launchOffer.duration}, {launchOffer.consideration}. Enviar un formulario no reserva una
          plaza: la disponibilidad y las condiciones se confirman por escrito.
        </>
      ) : (
        'No hay una oferta de lanzamiento activa.'
      ),
    },
    {
      title: 'Uso aceptable y revisión legal',
      body: (
        <>
          No se permite abusar de los formularios, intentar acceder a endpoints internos, interferir
          con la seguridad o enviar contenido ilícito o engañoso. La identificación jurídica del
          prestador, ley aplicable, jurisdicción y cláusulas contractuales completas requieren
          confirmación del titular y revisión legal; no se deducen de esta web.
        </>
      ),
    },
  ],
};

const cookiesPage: LegalPage = {
  title: 'Política de cookies',
  updated: 'Última actualización: 23 de agosto de 2026',
  intro:
    'La web usa almacenamiento local necesario para recordar preferencias y Google Analytics únicamente si aceptas la analítica opcional.',
  sections: [
    {
      title: 'Almacenamiento necesario',
      body: (
        <>
          La aplicación usa <code>localStorage</code>, no una cookie publicitaria, para guardar la
          elección de analítica en <code>heyde-cookie-consent</code>. El selector de idioma puede
          guardar la preferencia en <code>heyde-language</code>. Estos valores sirven exclusivamente
          para recordar esas elecciones en el navegador.
        </>
      ),
    },
    {
      title: 'Google Analytics',
      body: (
        <>
          Si aceptas la analítica, la web carga la etiqueta de Google Analytics. Esa etiqueta puede
          crear <code>_ga</code> para distinguir usuarios y <code>_ga_&lt;id&gt;</code> para conservar el
          estado de sesión. La configuración contractual, ubicación, conservación efectiva y
          posibles transferencias requieren confirmación del titular y no se infieren aquí.
        </>
      ),
    },
    {
      title: 'Aceptar, rechazar y configurar',
      body: (
        <>
          La primera visita ofrece aceptar, rechazar o configurar. Rechazar mantiene Google Analytics
          sin cargar. Puedes abrir «Configurar cookies» desde el pie de página en cualquier momento;
          al retirar el consentimiento, la web deshabilita la medición y elimina las cookies de
          Google Analytics que puede identificar.
        </>
      ),
    },
    {
      title: 'Datos enviados a analítica',
      body: (
        <>
          Los eventos propios contienen únicamente categoría, ruta e idioma. No incluyen valores de
          formularios ni identificadores de contacto. Consulta la política de privacidad para ver la
          separación entre auditorías locales y consultas de proyecto.
        </>
      ),
    },
  ],
};

const legalPages: Record<LegalPageType, LegalPage> = {
  privacy: privacyPage,
  terms: termsPage,
  cookies: cookiesPage,
};

export function LegalPageContent({ type }: { type: LegalPageType }) {
  const page = legalPages[type];

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
