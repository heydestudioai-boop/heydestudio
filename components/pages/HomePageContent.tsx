'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';

const audiences = [
  ['Restaurantes y hoteles', '/hosteleria'],
  ['Inmobiliarias', '/inmobiliaria'],
  ['Bodegas', '/bodegas'],
  ['Clínicas', '/planes'],
  ['Comercio local', '/planes'],
  ['Alquiler vacacional', '/inmobiliaria'],
];

const audienceNotes = [
  ['Sectores', 'Hostelería, inmobiliaria, bodegas, clínicas, comercio y alquiler vacacional.'],
  ['Objetivo', 'Que la primera impresión en Google, Instagram, web o WhatsApp trabaje a tu favor.'],
];

const plans = [
  {
    name: 'Base',
    price: '390 €/mes',
    description: 'Para negocios que necesitan publicar mejor sin montar un departamento.',
    features: ['1 sesión mensual', 'Foto y vídeo corto', 'Piezas listas para redes', 'Calendario básico'],
  },
  {
    name: 'Crecimiento',
    price: '650 €/mes',
    description: 'Para negocios que quieren que produzca, organice y publique por ellos.',
    features: ['2 sesiones mensuales', 'Reels y fotografía', 'Publico yo por ti', 'Google Business y redes'],
    highlighted: true,
  },
  {
    name: 'Dominio',
    price: '990 €/mes',
    description: 'Para negocios que quieren verse como referencia en su categoría.',
    features: ['Producción recurrente', 'Campañas por temporada', 'Piezas con IA etiquetada', 'Dirección mensual'],
  },
];

const work = [
  {
    title: 'Solea',
    label: 'Laboratorio',
    description: 'Concept work de producción visual con IA para explorar identidad, luz y campaña.',
    image: '/images/work-solea-cover.jpg',
    href: '/case-studies/solea',
  },
  {
    title: 'Eden',
    label: 'Laboratorio',
    description: 'Proyecto autoiniciado sobre lenguaje editorial, producto y mundos visuales escalables.',
    image: '/images/work-eden-cover.jpg',
    href: '/case-studies/eden',
  },
  {
    title: 'Trabajo real',
    label: 'Portfolio',
    description: 'Fotografía, vídeo y dirección de contenido para negocios que necesitan vender mejor.',
    image: '/images/HEYDE_Story_Portfolio.jpg',
    href: '/work',
  },
];

const faqs = [
  ['¿Qué incluye exactamente cada plan?', 'Producción de foto y vídeo, piezas listas para publicar y una dirección clara para que el contenido no salga improvisado.'],
  ['¿De quién es el contenido?', 'Del cliente, para siempre. Puedes usarlo en web, redes, Google Business, anuncios y materiales comerciales.'],
  ['¿Hay permanencia?', 'Los planes funcionan con un compromiso inicial de 3 meses. Después, 30 días de aviso.'],
  ['¿Qué es eso de la IA y cómo la usáis?', 'El rodaje es real. La IA ayuda a multiplicar piezas, escenarios y variaciones. Todo contenido generado con IA se etiqueta como tal.'],
  ['¿Trabajáis fuera de Toledo?', 'Sí. Toledo y provincia, Castilla-La Mancha, Madrid y Costa Blanca, con packs concretos para inmobiliaria y turismo.'],
];

const localProof = [
  ['Una persona', 'Dirección, producción y entrega sin pasar por tres proveedores.'],
  ['Precio cerrado', 'Planes y packs visibles antes de pedirte una llamada.'],
  ['Material usable', 'Foto, vídeo y piezas listas para publicar, no solo archivos bonitos.'],
];

const aiBenefits = [
  'Más variaciones desde una misma sesión',
  'Escenarios y formatos sin alquilar cada localización',
  'Contenido generado con IA etiquetado con claridad',
];

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
          poster="/images/HEYDE_Story_Portfolio.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" aria-hidden="true" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start">
          <div className="max-w-5xl [text-shadow:0_2px_24px_rgba(18,18,18,0.62)]">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/62 md:text-xs">
              Fotografía, vídeo y redes para negocios de Toledo
            </p>
            <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
              Todo el contenido de tu negocio. Una sola persona. Un precio fijo al mes.
            </h1>
            <p className="mb-9 max-w-2xl text-base leading-relaxed text-white/82 md:text-xl">
              Fotografía y vídeo profesional potenciados con IA. Sin agencias, sin tres proveedores, sin sorpresas en la factura.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row [text-shadow:none]">
              <Button href="/audit" label="Pide tu auditoría gratuita" />
              <Button href="/planes" label="Ver planes y precios" variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker>Para quién</EditorialKicker>
          <div className="mb-10 grid gap-8 md:grid-cols-[0.75fr_1fr] md:items-end">
            <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
              Contenido comercial para negocios que viven de que les elijan.
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
            {audiences.map(([audience, href]) => (
              <Link key={audience} href={href} className="bg-white p-7 transition hover:bg-gray-50">
                <h3 className="text-xl font-bold">{audience}</h3>
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
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Tres pasos y precio cerrado.</h2>
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
              ['01', 'Auditoría gratuita', 'Reviso tu presencia visual, redes, ficha de Google y primera impresión móvil.'],
              ['02', 'Propuesta en 48 h', 'Recibes un plan con alcance, precio cerrado y siguiente movimiento recomendado.'],
              ['03', 'Primera sesión en 7 días', 'Fotografía, vídeo y piezas listas para publicar con una dirección común.'],
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

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <EditorialKicker>Planes</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Precio visible. Alcance claro.</h2>
            </div>
            <Button href="/planes" label="Ver planes completos" variant="secondary" />
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={`bg-white p-8 ${plan.highlighted ? 'ring-2 ring-inset ring-magenta' : ''}`}>
                {plan.highlighted && <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-magenta">Recomendado</p>}
                <h3 className="mb-3 text-2xl font-bold">{plan.name}</h3>
                <p className="mb-6 text-3xl font-bold text-magenta">{plan.price}</p>
                <p className="mb-7 text-sm leading-relaxed text-gray-700">{plan.description}</p>
                <ul className="space-y-3 text-sm text-gray-700">
                  {plan.features.map((feature) => (
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
              <EditorialKicker>Trabajo reciente</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Trabajo real y laboratorio, bien separados.</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-white/12 bg-white/12 sm:grid-cols-2">
              <div className="bg-black p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/42">Portfolio</p>
                <p className="text-sm leading-relaxed text-white/70">Piezas reales de fotografía, vídeo y dirección de contenido.</p>
              </div>
              <div className="bg-black p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/42">Laboratorio</p>
                <p className="text-sm leading-relaxed text-white/70">Conceptos IA etiquetados como exploración, sin fingir clientes.</p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {work.map((item) => (
              <Link key={item.title} href={item.href} className="group">
                <div className="overflow-hidden rounded-sm bg-[#212121]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1000}
                    height={900}
                    className="h-[25rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="mt-5 border-t border-white/14 pt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-white/42">{item.label}</p>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/68">{item.description}</p>
                </div>
              </Link>
            ))}
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
            <EditorialKicker>Sobre mí</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold leading-[1.05] md:text-5xl">
              Soy Oliver Heyde. La cara también es parte del servicio.
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <p className="text-lg leading-[1.65] text-gray-700">
                Formado en producción audiovisual y dirección de fotografía, trabajo como fotógrafo, videógrafo y creador de contenido desde Toledo.
              </p>
              <p className="border-l-4 border-magenta pl-5 text-lg leading-[1.65] text-gray-700">
                En negocio local no compras una agencia abstracta: llamas a una persona que entiende tu negocio, aparece, produce y responde.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <EditorialKicker>El toque IA</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold leading-[1.05] md:text-5xl">El rodaje es real. La IA lo multiplica.</h2>
            <p className="mb-7 max-w-2xl text-lg leading-[1.65] text-gray-700">
              De cada sesión salen más piezas y formatos que en una producción pequeña tradicional, manteniendo el rodaje real como base.
            </p>
            <ul className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
              {aiBenefits.map((benefit) => (
                <li key={benefit} className="bg-white p-4 text-sm font-bold text-gray-800">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <EditorialKicker>Zona de servicio</EditorialKicker>
            <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
              {['Toledo y provincia', 'Castilla-La Mancha', 'Madrid', 'Costa Blanca: Jávea y alrededores'].map((zone) => (
                <div key={zone} className="bg-white p-5 text-lg font-bold">{zone}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker>FAQ</EditorialKicker>
          <h2 className="mb-10 text-3xl font-bold leading-[1.05] md:text-5xl">Preguntas normales antes de empezar.</h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <div key={question} className="bg-white p-7">
                <h3 className="mb-3 text-xl font-bold">{question}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text="Pide tu auditoría gratuita." />
            </h2>
            <EditorialBody dark>
              En 72 horas tienes una lectura clara de tu presencia visual. Si estás en Toledo, te la llevo en persona.
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
