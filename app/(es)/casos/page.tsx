import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { labProjects } from '@/lib/canonical';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.casos;

const businessMethod = [
  {
    number: '01',
    title: 'Lectura del negocio',
    body: 'Revisamos producto, espacio, personas, canales y frecuencia para decidir qué material necesita de verdad.',
  },
  {
    number: '02',
    title: 'Dirección y producción',
    body: 'Cámara, móvil o apoyo de IA según el objetivo, manteniendo real todo lo que debe representar al negocio.',
  },
  {
    number: '03',
    title: 'Piezas preparadas',
    body: 'Seleccionamos, editamos y adaptamos los finales a los canales acordados y al ritmo de publicación previsto.',
  },
] as const;

export default function CasosPage() {
  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-14 pt-16 text-white sm:px-8 md:px-12 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker muted>Trabajo con negocios + HEYDE Lab</EditorialKicker>
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text="Método comercial y exploración creativa, sin mezclarlos." />
          </h1>
          <EditorialBody dark className="max-w-2xl">
            El trabajo con negocios se presenta desde el proceso y la capacidad verificable. HEYDE Lab reúne proyectos autoiniciados: demuestran dirección creativa, pero no son clientes ni prueban resultados comerciales.
          </EditorialBody>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Trabajo con negocios</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Proceso visible. Casos solo con permiso.</h2>
            </div>
            <EditorialBody>
              Hasta disponer de material real autorizado y evidencia publicable, no mostramos nombres, resultados ni una cuadrícula que pueda parecer trabajo de cliente. Esta es la forma de trabajar con fotografía, vídeo y contenido para negocios locales.
            </EditorialBody>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {businessMethod.map((item) => (
              <article key={item.number} className="bg-white p-7 md:p-8">
                <p className="mb-10 text-xs font-bold uppercase tracking-[0.18em] text-magenta">{item.number}</p>
                <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/audit" label="Pedir auditoría" />
          </div>
        </div>
      </section>

      <section id="heyde-lab" className="scroll-mt-24 bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
            <div>
              <EditorialKicker>HEYDE Lab</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Proyectos autoiniciados. No clientes.</h2>
            </div>
            <EditorialBody>
              Estudios propios para probar dirección, consistencia visual, producción asistida por IA y adaptación de formatos. Funcionan como prueba de capacidad creativa, nunca como prueba comercial.
            </EditorialBody>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {labProjects.map((project) => (
              <Link key={project.slug} href={project.href} className="group border-t border-gray-200 pt-5">
                <div className="relative mb-5 overflow-hidden rounded-sm bg-[#212121]">
                  {project.media.type === 'video' ? (
                    <video
                      className="h-[28rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
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
                      width={1100}
                      height={1200}
                      className="h-[28rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  )}
                </div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-magenta">
                  HEYDE Lab · Proyecto autoiniciado · No cliente
                </p>
                <h3 className="mb-3 text-2xl font-bold">{project.name}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{project.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text="¿Qué necesita mostrar tu negocio ahora?" />
            </h2>
            <EditorialBody dark>
              La auditoría gratuita sirve para priorizar producto, espacio, personas y canales antes de producir.
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
