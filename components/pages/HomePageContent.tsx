import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import {
  aiPolicy,
  canonicalBrand,
  contentSession,
  labProjects,
  launchOffer,
  localFaqSections,
  monthlyPlans,
  rightsPolicy,
} from '@/lib/canonical';

const audiences = [
  ['Restaurantes y hoteles', '/hosteleria', 'Platos, espacios, equipo y momentos del servicio convertidos en contenido constante.'],
  ['Inmobiliarias', '/inmobiliaria', 'Viviendas explicadas con claridad en foto y vídeo para portales, redes y visitas.'],
  ['Bodegas', '/bodegas', 'Producto, territorio y elaboración traducidos en piezas de marca y contenido social.'],
  ['Clínicas', '/planes', 'Instalaciones, equipo y conocimiento explicados con una presencia visual coherente.'],
  ['Comercio local', '/planes', 'Producto, escaparate y personas con material listo para mantener una presencia activa.'],
  ['Alquiler vacacional', '/inmobiliaria', 'Foto y vídeo para mostrar espacios, experiencia y entorno en los canales adecuados.'],
] as const;

const audienceNotes = [
  ['Producción real', 'Cámara o móvil según el objetivo, con dirección, luz y criterio audiovisual.'],
  ['IA cuando aporta', 'Amplía formatos y variantes sin sustituir lo que debe mostrar el negocio real.'],
] as const;

const localProof = [
  ['Precio visible', 'Alcance y precio por escrito antes de empezar.'],
  ['Responsable único', 'La misma persona dirige la cuenta, coordina el trabajo y responde cada mes.'],
  ['Producción híbrida', 'Estrategia, rodaje, edición, publicación y aprendizaje con un solo criterio.'],
] as const;

const aiBenefits = [
  'Más formatos y variantes desde una misma sesión',
  'Adaptaciones para cada canal sin repetir todo el rodaje',
  'Transparencia cuando una pieza pueda confundirse con una representación real',
] as const;

const homeFaqs = localFaqSections.flatMap((section) => section.items).slice(0, 6);

export function HomePageContent() {
  return (
    <main className="bg-white">
      <section className="relative flex min-h-[calc(100vh-4rem)] items-end overflow-hidden bg-black px-6 py-14 text-white sm:px-8 md:px-12 md:py-24">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-fallback-cover.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" aria-hidden="true" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start">
          <div className="max-w-5xl [text-shadow:0_2px_24px_rgba(18,18,18,0.62)]">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/72 md:text-xs">
              {canonicalBrand.claim}
            </p>
            <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
              {canonicalBrand.launchProposition}
            </h1>
            <p className="mb-4 max-w-2xl text-base leading-relaxed text-white/82 md:text-xl">
              Fotografía, vídeo y gestión de redes para negocios locales. {canonicalBrand.operatingPromise}
            </p>
            <p className="mb-9 text-xs font-bold uppercase tracking-[0.16em] text-white/58">
              Toledo · Castilla-La Mancha · Madrid · Costa Blanca
            </p>
            <div className="flex flex-col gap-4 sm:flex-row [text-shadow:none]">
              <Button href="/audit" label="Pide tu auditoría gratuita" />
              <Button href="/planes" label="Ver planes y precios" variant="secondary" />
            </div>
            <p className="mt-7 text-xs text-white/55">Visual de HEYDE Lab · proyecto autoiniciado</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker>Para quién</EditorialKicker>
          <div className="mb-10 grid gap-8 md:grid-cols-[0.75fr_1fr] md:items-end">
            <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
              Tu negocio ya tiene historias. Falta convertirlas en un sistema constante.
            </h2>
            <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 sm:grid-cols-2">
              {audienceNotes.map(([title, body]) => (
                <div key={title} className="bg-white p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-magenta">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {audiences.map(([audience, href, body]) => (
              <Link key={audience} href={href} className="bg-white p-7 transition hover:bg-gray-50">
                <h3 className="text-xl font-bold">{audience}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{body}</p>
                <p className="mt-5 text-sm font-bold text-magenta">Ver opciones</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Cómo funciona</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Primero demuestro criterio. Después hablamos.</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
              {localProof.map(([title, body]) => (
                <div key={title} className="bg-white p-5">
                  <p className="mb-2 text-sm font-bold">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {[
              ['01', 'Auditoría gratuita', 'Pides una revisión de tu presencia digital sin reunión previa.'],
              ['02', 'Propuesta en 48 h', 'Después de entregar la auditoría, recibes un plan y un precio cerrado.'],
              ['03', 'Primera sesión en menos de 7 días', 'Si seguimos, ponemos fecha y empezamos a producir.'],
            ].map(([number, title, body]) => (
              <div key={number} className="bg-white p-8">
                <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-magenta">{number}</p>
                <h3 className="mb-4 text-2xl font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.7fr_1fr] md:items-center">
          <div>
            <EditorialKicker>Para empezar sin compromiso</EditorialKicker>
            <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
              {contentSession.name} · {contentSession.priceLabel}
            </h2>
          </div>
          <EditorialBody>
            {contentSession.shoot}. {contentSession.pieces}. {contentSession.delivery}. {contentSession.conversionCredit}
          </EditorialBody>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <EditorialKicker>Planes</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Precio visible. Alcance claro.</h2>
            </div>
            <Button href="/planes" label="Ver planes completos" variant="secondary" />
          </div>

          {launchOffer.active && (
            <div className="mb-8 border-l-4 border-magenta bg-white p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-magenta">Oferta de lanzamiento activa</p>
              <p className="text-xl font-bold">
                {launchOffer.slots} plazas de Crecimiento a {launchOffer.priceLabel} {launchOffer.duration}.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                Precio de lista: {launchOffer.listPriceLabel}; {launchOffer.consideration}.
              </p>
            </div>
          )}

          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {monthlyPlans.map((plan) => (
              <div key={plan.id} className={`bg-white p-8 ${plan.highlighted ? 'ring-2 ring-inset ring-magenta' : ''}`}>
                {plan.highlighted && <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-magenta">Plan central</p>}
                <h3 className="mb-3 text-2xl font-bold">{plan.name}</h3>
                <p className="mb-6 text-3xl font-bold text-magenta">{plan.priceLabel}</p>
                <p className="mb-7 text-sm leading-relaxed text-gray-700">{plan.bestFor}</p>
                <ul className="space-y-3 text-sm text-gray-700">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li key={feature}>+ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.8fr_1fr] md:items-end">
            <div>
              <EditorialKicker>HEYDE Lab</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Portfolio creativo, sin inventar clientes.</h2>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Soleá, Eden y otros conceptos son proyectos autoiniciados. Enseñan dirección, producción y capacidad visual; no representan encargos ni resultados comerciales.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {labProjects.map((project) => (
              <Link key={project.slug} href={project.href} className="group">
                <div className="overflow-hidden rounded-sm bg-[#212121]">
                  {project.media.type === 'video' ? (
                    <video
                      className="h-[25rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={project.media.alt}
                    >
                      <source src={project.media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={project.media.src}
                      alt={project.media.alt}
                      width={1000}
                      height={900}
                      className="h-[25rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="mt-5 border-t border-white/14 pt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-white/42">Self-initiated · no cliente</p>
                  <h3 className="mb-3 text-xl font-bold">{project.name}</h3>
                  <p className="text-sm leading-relaxed text-white/68">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/casos" label="Ver HEYDE Lab" variant="secondary" />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div className="overflow-hidden rounded-sm bg-gray-100">
            <Image
              src="/images/oliver-heyde.jpeg"
              alt="Oliver Heyde, fundador de HEYDE Studio"
              width={900}
              height={1100}
              className="h-[34rem] w-full object-cover"
            />
          </div>
          <div>
            <EditorialKicker>Responsable de tu cuenta</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold leading-[1.05] md:text-5xl">
              Soy Oliver Heyde. Siempre sabes quién dirige el trabajo.
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <p className="text-lg leading-[1.65] text-gray-700">
                Mi base es la producción audiovisual y la dirección de fotografía. Desde Toledo convierto el negocio real en fotografía, vídeo y contenido útil.
              </p>
              <p className="border-l-4 border-magenta pl-5 text-lg leading-[1.65] text-gray-700">
                Tienes una persona responsable que conoce la cuenta, coordina la producción y mantiene el criterio, incluso cuando una pieza requiere apoyo especializado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <EditorialKicker>Producción híbrida</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold leading-[1.05] md:text-5xl">El negocio es real. La IA amplía cuando aporta.</h2>
            <p className="mb-5 max-w-2xl text-lg leading-[1.65] text-gray-700">{aiPolicy.short}</p>
            <p className="mb-7 max-w-2xl text-sm leading-relaxed text-gray-700">{aiPolicy.disclosure}</p>
            <ul className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
              {aiBenefits.map((benefit) => (
                <li key={benefit} className="bg-white p-4 text-sm font-bold text-gray-800">{benefit}</li>
              ))}
            </ul>
          </div>
          <div>
            <EditorialKicker>Zona de servicio</EditorialKicker>
            <p className="mb-6 text-lg leading-[1.65] text-gray-700">
              Toledo es la base. Castilla-La Mancha y Madrid se atienden según proyecto; Costa Blanca combina inmobiliario, hostelería y campañas de temporada.
            </p>
            <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
              {canonicalBrand.serviceAreas.map((zone) => (
                <div key={zone} className="bg-white p-5 text-lg font-bold">{zone}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker>FAQ</EditorialKicker>
          <h2 className="mb-10 text-3xl font-bold leading-[1.05] md:text-5xl">Lo importante, antes de empezar.</h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {homeFaqs.map(({ question, answer }) => (
              <div key={question} className="bg-white p-7">
                <h3 className="mb-3 text-xl font-bold">{question}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-700">{rightsPolicy}</p>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text="Pide tu auditoría gratuita." />
            </h2>
            <EditorialBody dark>
              Analizo redes, web y Google Business sin exigir una reunión previa. En 72 horas tienes una lectura clara; en Toledo, puedo llevártela en persona.
            </EditorialBody>
          </div>
          <div className="md:text-right">
            <Button href="/audit" label="Solicitar auditoría" />
          </div>
        </div>
      </section>
    </main>
  );
}
