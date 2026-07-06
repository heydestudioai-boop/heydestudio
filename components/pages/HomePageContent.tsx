'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';

const audiences = [
  ['Restaurantes y hoteles', '/hosteleria'],
  ['Inmobiliarias', '/inmobiliaria'],
  ['Bodegas', '/bodegas'],
  ['Clinicas', '/planes'],
  ['Comercio local', '/planes'],
  ['Alquiler vacacional', '/inmobiliaria'],
];

const plans = [
  {
    name: 'Base',
    price: '390 €/mes',
    description: 'Para negocios que necesitan publicar mejor sin montar un departamento.',
    features: ['1 sesion mensual', 'Foto y video corto', 'Piezas listas para redes', 'Calendario basico'],
  },
  {
    name: 'Crecimiento',
    price: '650 €/mes',
    description: 'Para negocios que quieren presencia constante y material comercial reutilizable.',
    features: ['2 sesiones mensuales', 'Reels y fotografia', 'Copys para publicaciones', 'Google Business y redes'],
    highlighted: true,
  },
  {
    name: 'Dominio',
    price: '990 €/mes',
    description: 'Para negocios que quieren verse como referencia en su categoria.',
    features: ['Produccion recurrente', 'Campanas por temporada', 'Piezas con IA etiquetada', 'Direccion mensual'],
  },
];

const work = [
  {
    title: 'Solea',
    label: 'Laboratorio',
    description: 'Concept work de produccion visual con IA para explorar identidad, luz y campana.',
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
    description: 'Fotografia, video y direccion de contenido para negocios que necesitan vender mejor.',
    image: '/images/HEYDE_Story_Portfolio.jpg',
    href: '/work',
  },
];

const faqs = [
  ['Que incluye exactamente cada plan?', 'Produccion de foto y video, piezas listas para publicar y una direccion clara para que el contenido no salga improvisado.'],
  ['De quien es el contenido?', 'Del cliente, para siempre. Puedes usarlo en web, redes, Google Business, anuncios y materiales comerciales.'],
  ['Hay permanencia?', 'Los planes funcionan con un compromiso inicial de 3 meses. Despues, 30 dias de aviso.'],
  ['Que es eso de la IA y como la usais?', 'El rodaje es real. La IA ayuda a multiplicar piezas, escenarios y variaciones. Todo contenido generado con IA se etiqueta como tal.'],
  ['Trabajais fuera de Toledo?', 'Si. Toledo y provincia, Castilla-La Mancha, Madrid y Costa Blanca, con packs concretos para inmobiliaria y turismo.'],
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
              Fotografia, video y redes para negocios de Toledo
            </p>
            <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
              Todo el contenido de tu negocio. Una sola persona. Un precio fijo al mes.
            </h1>
            <p className="mb-9 max-w-2xl text-base leading-relaxed text-white/82 md:text-xl">
              Fotografia y video profesional potenciados con IA. Sin agencias, sin tres proveedores, sin sorpresas en la factura.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row [text-shadow:none]">
              <Button href="/audit" label="Pide tu auditoria gratuita" />
              <Button href="/planes" label="Ver planes y precios" variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker>Para quien</EditorialKicker>
          <div className="mb-10 grid gap-8 md:grid-cols-[0.75fr_1fr] md:items-end">
            <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
              Contenido comercial para negocios que viven de que les elijan.
            </h2>
            <EditorialBody>
              Hosteleria, inmobiliaria, bodegas, clinicas, comercio y alquiler vacacional. Cada sector necesita verse bien, publicar con ritmo y convertir primeras impresiones en visitas, reservas o llamadas.
            </EditorialBody>
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
              <EditorialKicker>Como funciona</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Tres pasos y precio cerrado.</h2>
            </div>
            <EditorialBody>
              El mismo mensaje en papel, en llamada y en pantalla: primero vemos que falla, despues te doy una propuesta clara y luego producimos contenido sin complicarte la semana.
            </EditorialBody>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {[
              ['01', 'Auditoria gratuita', 'Reviso tu presencia visual, redes, ficha de Google y primera impresion movil.'],
              ['02', 'Propuesta en 48 h', 'Recibes un plan con alcance, precio cerrado y siguiente movimiento recomendado.'],
              ['03', 'Primera sesion en 7 dias', 'Fotografia, video y piezas listas para publicar con una direccion comun.'],
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
            <EditorialBody dark>
              Mientras llegan los primeros casos locales, el portfolio muestra piezas reales y conceptos IA etiquetados como laboratorio. Ambicion, si. Fingir clientes, no.
            </EditorialBody>
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
            <EditorialKicker>Sobre mi</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold leading-[1.05] md:text-5xl">
              Soy Oliver Heyde. La cara tambien es parte del servicio.
            </h2>
            <EditorialBody>
              Formado en produccion audiovisual y direccion de fotografia, trabajo como fotografo, videografo y creador de contenido desde Toledo. En negocio local no compras una agencia abstracta: llamas a una persona que entiende tu negocio, aparece, produce y responde.
            </EditorialBody>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <EditorialKicker>El toque IA</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold leading-[1.05] md:text-5xl">El rodaje es real. La IA lo multiplica.</h2>
            <EditorialBody>
              De cada sesion pueden salir mas piezas, variaciones y escenarios de los que permite una produccion tradicional pequeña. Si una pieza usa IA generativa, se etiqueta como tal: claridad para ti, honestidad para tus clientes.
            </EditorialBody>
          </div>
          <div>
            <EditorialKicker>Zona de servicio</EditorialKicker>
            <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
              {['Toledo y provincia', 'Castilla-La Mancha', 'Madrid', 'Costa Blanca: Javea y alrededores'].map((zone) => (
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
              <EditorialTitle text="Pide tu auditoria gratuita." />
            </h2>
            <EditorialBody dark>
              En 72 horas tienes una lectura clara de tu presencia visual. Si estas en Toledo, te la llevo en persona.
            </EditorialBody>
          </div>
          <div className="md:text-right">
            <Button href="/audit" label="Solicitar auditoria" />
          </div>
        </div>
      </section>
    </main>
  );
}
