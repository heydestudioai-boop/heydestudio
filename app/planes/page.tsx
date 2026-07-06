import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.planes;

const plans = [
  {
    name: 'Base',
    price: '390 €/mes',
    bestFor: 'Para empezar a publicar con calidad y constancia.',
    features: [
      '1 sesión de foto/vídeo al mes',
      '10-15 piezas listas para publicar',
      'Selección, edición y entrega optimizada',
      'Calendario simple de contenidos',
      'Uso en redes, web y Google Business',
    ],
  },
  {
    name: 'Crecimiento',
    price: '650 €/mes',
    bestFor: 'Para el negocio que quiere olvidarse de las redes.',
    features: [
      '2 visitas de rodaje al mes',
      '25-35 piezas mensuales',
      'Gestión completa de hasta 2 redes',
      'Programo, publico y respondo yo',
      'Textos de las publicaciones incluidos',
      'Revisión mensual de tu ficha de Google',
      'Informe sencillo: qué ha funcionado y qué no',
    ],
    highlighted: true,
  },
  {
    name: 'Dominio',
    price: '990 €/mes',
    bestFor: 'Para negocios que quieren liderar su categoría visualmente.',
    features: [
      'Producción recurrente y dirección mensual',
      '45-60 piezas mensuales',
      'Campañas de temporada o lanzamiento',
      'Variaciones potenciadas con IA etiquetada',
      'Plan editorial y seguimiento mensual',
    ],
  },
];

const sectorPacks = [
  ['Pack Carta', '490 €', 'Fotos de platos, ambiente y piezas para relanzar carta o temporada.'],
  ['Pack Vivienda', '220 €', 'Fotografía y vídeo corto para pisos. Villas desde 590 €.'],
  ['Campaña Bodega', 'Desde 1.900 €', 'Producto, territorio, storytelling visual y piezas para venta o visita.'],
  ['Bodas', 'Bajo petición', 'Plazas limitadas por temporada. Solo proyectos con encaje claro.'],
];

const comparison = [
  ['Base', 'Necesitas publicar mejor, pero aún no quieres delegar las redes.'],
  ['Crecimiento', 'Quieres que produzca, organice y publique por ti cada semana.'],
  ['Dominio', 'Tu negocio depende mucho de imagen, temporada, reservas o ticket medio.'],
];

export default function PlanesPage() {
  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-12 pt-16 text-white sm:px-8 md:px-12 md:pb-16 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker>Planes y precios</EditorialKicker>
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text="Contenido mensual con precio cerrado." />
          </h1>
          <EditorialBody dark className="max-w-2xl">
            Fotografía, vídeo y redes para negocios locales. Sabes qué entra, cuánto cuesta y cuál es el siguiente paso antes de contratar.
          </EditorialBody>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.7fr_1fr] md:items-center">
          <div>
            <EditorialKicker>Sesión de entrada</EditorialKicker>
            <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">390 € descontables si pasas a plan.</h2>
          </div>
          <EditorialBody>
            Una primera sesión para crear material real y comprobar si el ritmo encaja. Si después activas un plan mensual, ese importe se descuenta del primer mes.
          </EditorialBody>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={`bg-white p-8 ${plan.highlighted ? 'ring-2 ring-inset ring-magenta' : ''}`}>
                {plan.highlighted && <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-magenta">Recomendado</p>}
                <h2 className="mb-3 text-3xl font-bold">{plan.name}</h2>
                <p className="mb-5 text-4xl font-bold text-magenta">{plan.price}</p>
                <p className="mb-8 text-sm leading-relaxed text-gray-700">{plan.bestFor}</p>
                <ul className="space-y-3 text-sm leading-relaxed text-gray-700">
                  {plan.features.map((feature) => (
                    <li key={feature}>+ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Packs por sector</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Cuando necesitas algo concreto.</h2>
            </div>
            <EditorialBody>
              Packs cerrados para hostelería, inmobiliaria, bodegas y trabajos de temporada. Menos reunión, más claridad.
            </EditorialBody>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {sectorPacks.map(([name, price, body]) => (
              <div key={name} className="bg-white p-7">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-2xl font-bold">{name}</h3>
                  <p className="text-xl font-bold text-magenta">{price}</p>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker>Qué plan es para mí</EditorialKicker>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
            {comparison.map(([plan, fit]) => (
              <div key={plan} className="grid gap-4 bg-white p-6 md:grid-cols-[0.25fr_1fr] md:items-center">
                <h3 className="text-xl font-bold">{plan}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{fit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text="Empieza por una auditoría gratuita." />
            </h2>
            <EditorialBody dark>
              En 72 horas tienes un diagnóstico claro. Si estás en Toledo, te lo llevo en persona.
            </EditorialBody>
          </div>
          <div className="md:text-right">
            <Button href="/audit" label="Pedir auditoría" />
          </div>
        </div>
      </section>
    </main>
  );
}
