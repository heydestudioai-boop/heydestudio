import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.casos;

const realWork = [
  {
    title: 'Trabajo reciente',
    sector: 'Portfolio local',
    body: 'Fotografía, vídeo y contenido que se nota en las reservas, en las visitas y en las ventas.',
    image: '/images/HEYDE_Story_Portfolio.jpg',
  },
  {
    title: 'Producto, espacio y persona',
    sector: 'Negocio local',
    body: 'Selección de material real y cercano: producto, espacio, luz, persona y piezas listas para publicar.',
    image: '/images/work-solea-03.jpg',
  },
];

const labWork = [
  {
    title: 'Soleá',
    body: 'Proyecto autoiniciado donde llevamos al límite la producción con IA: campañas conceptuales, escenarios y dirección visual.',
    image: '/images/work-solea-cover.jpg',
    href: '/case-studies/solea',
  },
  {
    title: 'Eden',
    body: 'Campo de pruebas para explorar mundos visuales, producto y narrativa de marca. Todo lo aprendido acaba trabajando para el cliente real.',
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
            <EditorialTitle text="Trabajo real para negocios reales." />
          </h1>
          <EditorialBody dark className="max-w-2xl">
            Esto es lo que hago: fotografía, vídeo y contenido que se nota en las reservas, en las visitas y en las ventas. Selección de trabajo reciente y, debajo, nuestro laboratorio.
          </EditorialBody>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Portfolio local</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
                Fotografía, vídeo y contenido para vender mejor.
              </h2>
            </div>
            <EditorialBody>
              Mientras llegan casos de cliente con nombre, esta sección prioriza trabajo real: material producido con oficio, útil para web, redes, Google Business y WhatsApp.
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
              <EditorialKicker>HEYDE Lab</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
                Proyectos de exploración.
              </h2>
            </div>
            <EditorialBody>
              Proyectos autoiniciados donde llevamos al límite la producción con IA: campañas conceptuales, avatares y escenarios imposibles. No son encargos de cliente y lo decimos con orgullo: es nuestro campo de pruebas, y todo lo que aprendemos aquí acaba trabajando para ti.
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
