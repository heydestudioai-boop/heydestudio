import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.estudio;

const facts = [
  ['Base', 'Toledo'],
  ['Base también', 'Costa Blanca'],
  ['Zona', 'Castilla-La Mancha y Madrid'],
];

const principles = [
  ['Claro antes de contratar', 'Planes, packs y precios visibles para que no tengas que pedir una reunión solo para entender el alcance.'],
  ['Una persona responsable', 'Hablas conmigo: preparo, produzco, edito, publico cuando toca y respondo.'],
  ['Contenido que se usa', 'El objetivo no es entregar archivos bonitos, sino piezas útiles para redes, web, Google Business, WhatsApp y ventas.'],
  ['IA con etiqueta', 'Cuando uso IA para multiplicar formatos o escenarios, lo digo. El rodaje real sigue siendo la base.'],
];

export default function EstudioPage() {
  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-12 pt-16 text-white sm:px-8 md:px-12 md:pb-16 md:pt-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.95fr_0.65fr] md:items-end">
          <div>
            <EditorialKicker muted>Estudio</EditorialKicker>
            <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
              <EditorialTitle text="Detrás de HEYDE hay una persona, no una agencia." />
            </h1>
            <EditorialBody dark className="max-w-2xl">
              Soy fotógrafo y videógrafo, formado en producción audiovisual y dirección de fotografía, y llevo años creando contenido y gestionando redes y comunidades para marcas y negocios.
            </EditorialBody>
          </div>
          <div className="overflow-hidden rounded-sm bg-white/10">
            <Image
              src="/images/oliver-heyde.jpeg"
              alt="Oliver Heyde, fundador de HEYDE Studio"
              width={900}
              height={1100}
              className="h-[32rem] w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.45fr_0.55fr]">
          <div>
            <EditorialKicker>Quién soy</EditorialKicker>
            <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
              Oficio de toda la vida. IA bien usada.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-[1.65] text-gray-700">
            <p>
              Monté HEYDE para unir dos mundos: el oficio de toda la vida, luz, encuadre y criterio, con la potencia de la IA bien usada y siempre etiquetada.
            </p>
            <p>
              El resultado: tu negocio publica como los grandes, con una sola persona al otro lado, sin sustos en la factura.
            </p>
            <p>
              Trabajo desde Toledo, con base también en la Costa Blanca, y me muevo por Castilla-La Mancha y Madrid.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {facts.map(([title, body]) => (
              <div key={title} className="bg-white p-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-magenta">{title}</p>
                <p className="text-xl font-bold leading-tight">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Cómo trabajo</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
                Menos discurso de agencia. Más claridad de servicio.
              </h2>
            </div>
            <EditorialBody>
              La idea es sencilla: que sepas qué necesitas, cuánto cuesta y qué vas a recibir antes de meterte en llamadas largas.
            </EditorialBody>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {principles.map(([title, body]) => (
              <div key={title} className="bg-white p-8">
                <h3 className="mb-4 text-2xl font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text="Primero miro tu negocio. Luego hablamos de contratar." />
            </h2>
            <EditorialBody dark>
              La auditoría gratuita te da una lectura honesta de tu imagen, redes, Google Business y web móvil.
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
