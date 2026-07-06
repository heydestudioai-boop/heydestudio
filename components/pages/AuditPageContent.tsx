'use client';

import { motion } from 'framer-motion';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';

export function AuditPageContent() {
  const { content, language } = useLanguage();
  const page =
    language === 'ES'
      ? {
          ...content.auditPage,
          heroTitle: 'Auditoría gratuita para negocios locales.',
          heroBody:
            'Reviso tu foto, vídeo, redes, ficha de Google y primera impresión móvil. En 72 horas tienes tu auditoría en el correo. Si estás en Toledo, te la llevo en persona.',
          scheduleCta: 'Pedir auditoría',
          workCta: 'Ver trabajo',
          introTitle: 'La versión digital de una visita comercial bien hecha.',
          introBody:
            'No necesitas rellenar veinte campos ni entender tecnología. Me pasas tu negocio, ciudad, Instagram o web y teléfono. Yo miro lo que ve un cliente antes de elegirte y te digo dónde estás perdiendo confianza.',
          summaryCards: [
            ['Tiempo', '20 minutos de llamada o una revisión por correo si prefieres empezar sin agenda.'],
            ['Coste', 'Gratis. Sin tarjeta, sin compromiso y sin pitch automático.'],
            ['Resultado', 'Una lista clara de mejoras en imagen, redes, Google Business y web móvil.'],
            ['Foco', 'Reservas, llamadas, visitas, confianza y primera impresión local.'],
          ],
          questionsTitle: 'Las seis comprobaciones que hacemos.',
          questions: [
            ['Foto y vídeo actual', 'Si tu contenido muestra bien producto, espacio, personas y confianza.'],
            ['Frecuencia de publicación', 'Si el negocio parece vivo o abandonado antes de que alguien te escriba.'],
            ['Ficha de Google', 'Fotos, reseñas, horarios, servicios y señales que ayudan a elegirte.'],
            ['Reseñas', 'Cómo se percibe tu prueba social y qué pedir al entregar cada trabajo.'],
            ['Web móvil', 'Qué ocurre cuando alguien entra desde el teléfono.'],
            ['Primera impresión', 'Qué entiende un cliente en los primeros cinco segundos.'],
          ],
          discoverTitle: 'Con qué te vas.',
          discoveries: [
            ['1. Diagnóstico claro', 'Qué está funcionando y qué está frenando llamadas, reservas o visitas.'],
            ['2. Prioridad principal', 'El cambio visual o comercial que haría primero.'],
            ['3. Ideas de contenido', 'Piezas concretas que tu negocio podría publicar este mes.'],
            ['4. Recomendación de plan', 'Si encaja Base, Crecimiento, Dominio, un pack puntual o nada todavía.'],
            ['5. Siguiente paso', 'Una acción sencilla para probar mejora sin liarte.'],
            ['6. Presupuesto orientativo', 'Precio cerrado si tiene sentido avanzar.'],
          ],
          fitTitle: 'Cuando tiene sentido.',
          perfectTitle: 'Buen encaje:',
          perfect: [
            'Tienes restaurante, hotel, inmobiliaria, bodega, clínica o comercio',
            'Tu negocio vende por confianza y primera impresión',
            'Publicas poco o con material irregular',
            'Tu ficha de Google podría trabajar más por ti',
            'Quieres precio claro antes de contratar',
          ],
          notYetTitle: 'Probablemente todavía no:',
          notYet: [
            'Solo buscas una foto suelta barata',
            'No puedes dedicar nada de tiempo a preparar una sesión',
            'No quieres que el contenido se use de forma constante',
            'Buscas una agencia grande con muchos departamentos',
            'No tienes claro qué producto o servicio quieres vender mejor',
          ],
          unsureLabel: '¿No estás seguro?',
          unsureText:
            'Pide la auditoría igualmente. Si no tiene sentido contratar, te lo diré directamente.',
          processTitle: 'Cómo funciona.',
          process: [
            ['Me cuentas tu negocio en 2 minutos', 'Sector, zona y tu Instagram o web. Nada más.'],
            ['Reviso los seis puntos', 'Fotos y vídeos actuales, frecuencia de publicación, ficha de Google, reseñas, web móvil y primera impresión.'],
            ['Te preparo un PDF claro', 'Sin jerga: qué está bien, qué está frenando y qué haría yo primero.'],
            ['Lo recibes en 72 horas', 'Te lo envío por correo o te lo llevo en persona si estás en Toledo.'],
            ['Lo repasamos si quieres', 'Si puedo ayudarte, te digo cómo y cuánto cuesta. Si no lo necesitas, también te lo digo.'],
          ],
          faqTitle: 'Preguntas frecuentes.',
          faqs: [
            ['¿De verdad es gratis?', 'Sí. Es mi manera de presentarme: prefiero demostrarte criterio a venderte humo.'],
            ['¿Qué necesito enviarte?', 'Nombre del negocio, sector y tu Instagram o web. Dos minutos.'],
            ['¿Me vas a perseguir para venderme algo?', 'No. Te entrego la auditoría y decides tú. Si no quieres nada más, aquí paz y después gloria.'],
            ['¿Sirve si casi no tengo redes?', 'Especialmente si casi no tienes: te digo por dónde empezar sin gastar de más.'],
            ['¿Y si estoy fuera de Toledo?', 'Trabajo en Castilla-La Mancha, Madrid y la Costa Blanca. ¿Otra zona? Escríbeme y lo vemos.'],
          ],
          calendlyTitle: 'Pide tu auditoría gratuita.',
          calendarFallback: '¿Prefieres escribir directamente?',
          emailInstead: 'Enviar email',
          finalTitle: 'Empieza por ver lo que ve tu cliente.',
          finalBody:
            'La auditoría te dice si necesitas mejores fotos, más vídeo, una ficha de Google mejor cuidada o simplemente una dirección más clara.',
          finalCta: 'Pedir auditoría',
        }
      : content.auditPage;

  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-10 pt-16 text-white sm:px-8 md:px-12 md:pb-12 md:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text={page.heroTitle} />
          </h1>
          <EditorialBody dark className="max-w-2xl text-sm md:text-base">
            {page.heroBody}
          </EditorialBody>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#calendly"
              className="inline-flex w-full items-center justify-center rounded-sm bg-magenta px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-magenta-dark sm:w-auto"
            >
              {page.scheduleCta}
            </a>
            <a
              href="/casos"
              className="inline-flex w-full items-center justify-center rounded-sm border border-white/35 px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:border-white/70 sm:w-auto"
            >
              {page.workCta}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.42fr_0.58fr]">
          <div>
            <EditorialKicker>{language === 'ES' ? 'Diagnóstico' : 'Diagnosis'}</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              <EditorialTitle text={page.introTitle} />
            </h2>
            <EditorialBody>{page.introBody}</EditorialBody>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 sm:grid-cols-2">
            {page.summaryCards.map(([title, body]) => (
              <div key={title} className="bg-white p-6">
                <h3 className="mb-3 text-lg font-bold">{title}</h3>
                <p className="leading-relaxed text-gray-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 max-w-3xl text-3xl font-bold md:text-5xl">
            <EditorialTitle text={page.questionsTitle} />
          </h2>
          <div className="space-y-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
            {page.questions.map(([title, body], index) => (
              <div key={title} className="grid gap-4 bg-white p-6 md:grid-cols-[0.18fr_0.3fr_0.52fr] md:p-8">
                <span className="text-3xl font-bold text-magenta">0{index + 1}</span>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="leading-relaxed text-gray-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 max-w-3xl text-3xl font-bold md:text-5xl">
            <EditorialTitle text={page.discoverTitle} />
          </h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {page.discoveries.map(([title, body]) => (
              <div key={title} className="bg-white p-8">
                <h3 className="mb-3 text-lg font-bold">{title}</h3>
                <p className="leading-relaxed text-gray-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 max-w-3xl text-3xl font-bold md:text-5xl">
            <EditorialTitle text={page.fitTitle} />
          </h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            <FitList title={page.perfectTitle} items={page.perfect} positive />
            <FitList title={page.notYetTitle} items={page.notYet} />
          </div>
          <div className="mt-10 border-l-4 border-magenta bg-white p-8">
            <p className="text-gray-800">
              <span className="font-bold">{page.unsureLabel}</span> {page.unsureText}
            </p>
          </div>
        </div>
      </section>

      <AuditProcess page={page} />

      <section id="calendly" className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold md:text-5xl">{page.calendlyTitle}</h2>
          <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
            <iframe
              src="https://calendly.com/heyde-studio/20min?primary_color=880808&text_color=000000&background_color=ffffff"
              width="100%"
              height={700}
              frameBorder={0}
              title="Schedule a free visual system audit"
            />
          </div>
          <div className="mt-8">
            <p className="mb-4 text-gray-600">{page.calendarFallback}</p>
            <a
              href="mailto:contact@heydestudio.com?subject=Auditoria gratuita HEYDE Studio"
              className="inline-flex rounded-sm border border-magenta px-8 py-3 text-sm font-bold uppercase tracking-[0.08em] text-magenta transition-colors hover:bg-magenta/10"
            >
              {page.emailInstead}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-12 text-white sm:px-8 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-12 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text={page.finalTitle} />
            </h2>
            <EditorialBody dark>{page.finalBody}</EditorialBody>
          </div>
          <div className="md:text-right">
            <a
              href="#calendly"
              className="inline-flex w-full items-center justify-center rounded-sm bg-magenta px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-magenta-dark sm:w-auto"
            >
              {page.finalCta}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function FitList({
  title,
  items,
  positive = false,
}: {
  title: string;
  items: readonly string[];
  positive?: boolean;
}) {
  return (
    <div className="bg-white p-8">
      <h3 className={`mb-6 text-2xl font-bold ${positive ? 'text-magenta' : 'text-gray-900'}`}>
        {title}
      </h3>
      <ul className="space-y-px bg-gray-200">
        {items.map((item) => (
          <li key={item} className="bg-white py-3 text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AuditProcess({
  page,
}: {
  page: {
    processTitle: string;
    process: readonly (readonly string[])[];
    faqTitle: string;
    faqs: readonly (readonly string[])[];
  };
}) {
  return (
    <>
      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-3xl font-bold md:text-5xl"
          >
            {page.processTitle}
          </motion.h2>
          <div className="space-y-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
            {page.process.map(([title, description], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="grid gap-4 bg-white p-6 md:grid-cols-[0.16fr_0.3fr_0.54fr] md:p-8"
              >
                <div className="text-3xl font-bold text-magenta">0{index + 1}</div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="leading-relaxed text-gray-700">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-3xl font-bold md:text-5xl"
          >
            {page.faqTitle}
          </motion.h2>
          <div className="space-y-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
            {page.faqs.map(([q, a]) => (
              <div key={q} className="bg-white p-6 md:p-8">
                <h3 className="mb-3 text-lg font-bold text-black">{q}</h3>
                <p className="leading-relaxed text-gray-700">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
