import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.casos;

const realWork = [
  {
    title: 'Foto, vídeo y contenido real',
    sector: 'Portfolio local',
    body: 'Trabajo de fotografía, vídeo y dirección de contenido para negocios que necesitan verse mejor en web, redes, Google Business y WhatsApp.',
    image: '/images/HEYDE_Story_Portfolio.jpg',
  },
  {
    title: 'Producto, espacio y persona',
    sector: 'Negocio local',
    body: 'La prioridad no es parecer una campaña de lujo: es que el cliente entienda qué vendes, cómo se vive y por qué puede confiar.',
    image: '/images/work-solea-03.jpg',
  },
];

const labWork = [
  {
    title: 'Soleá',
    body: 'Laboratorio de campaña con IA para probar luz, identidad, dirección visual y lenguaje editorial.',
    image: '/images/work-solea-cover.jpg',
    href: '/case-studies/solea',
  },
  {
    title: 'Eden',
    body: 'Proyecto autoiniciado sobre mundos visuales escalables, producto y narrativa de marca.',
    image: '/images/work-eden-cover.jpg',
    href: '/case-studies/eden',
  },
];

export default function CasosPage() {
  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-12 pt-16 text-white sm:px-8 md:px-12 md:pb-16 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker muted>Casos y portfolio</EditorialKicker>
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text="Trabajo real primero. Laboratorio IA bien separado." />
          </h1>
          <EditorialBody dark className="max-w-2xl">
            Aquí no mezclo un restaurante de Toledo con una campaña inventada. Primero ves el tipo de trabajo real que sirve a un negocio local; debajo, los experimentos IA marcados como laboratorio.
          </EditorialBody>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Portfolio local</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
                Foto y vídeo para que el negocio se entienda antes.
              </h2>
            </div>
            <EditorialBody>
              La web irá incorporando casos reales con nombre, métricas y contexto cuando estén autorizados. Mientras tanto, esta sección prioriza el trabajo de oficio: producto, espacio, luz, persona y piezas listas para publicar.
            </EditorialBody>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {realWork.map((item) => (
              <article key={item.title} className="border-t border-gray-200 pt-5">
                <div className="mb-5 overflow-hidden rounded-sm bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1100}
                    height={850}
                    className="h-[26rem] w-full object-cover"
                  />
                </div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-magenta">{item.sector}</p>
                <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Laboratorio</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
                Exploraciones IA, sin fingir que son clientes.
              </h2>
            </div>
            <EditorialBody>
              Estos proyectos sirven para enseñar criterio visual, dirección de campaña y posibilidades de IA. Son útiles para entender hasta dónde puede crecer una producción real, pero no sustituyen al portfolio local.
            </EditorialBody>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {labWork.map((item) => (
              <Link key={item.title} href={item.href} className="group border-t border-gray-200 pt-5">
                <div className="mb-5 overflow-hidden rounded-sm bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1100}
                    height={850}
                    className="h-[26rem] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-magenta">Laboratorio IA</p>
                <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text="¿Quieres saber qué cambiaría en tu caso?" />
            </h2>
            <EditorialBody dark>
              Pide la auditoría gratuita y te digo qué ve un cliente cuando encuentra tu negocio.
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
