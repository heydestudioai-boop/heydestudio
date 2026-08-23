import type { Metadata } from 'next';
import Link from 'next/link';
import { EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.blog;

export default function BlogPage() {
  return (
    <main className="bg-white">
      <section className="bg-black px-6 py-20 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <EditorialKicker muted>Archivo editorial</EditorialKicker>
          <h1 className="mb-7 text-4xl font-bold leading-none md:text-6xl">
            <EditorialTitle text="El archivo anterior ya no representa el HEYDE actual." />
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/70">
            No publicamos artículos legacy como si fueran contenido vigente. La
            oferta actual y los proyectos autoiniciados están en sus páginas
            canónicas.
          </p>
        </div>
      </section>
      <section className="px-6 py-16 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          <Link
            href="/marcas"
            className="border border-gray-200 p-7 font-bold transition hover:border-magenta hover:text-magenta"
          >
            Producción creativa para marcas →
          </Link>
          <Link
            href="/casos#heyde-lab"
            className="border border-gray-200 p-7 font-bold transition hover:border-magenta hover:text-magenta"
          >
            Ver HEYDE Lab →
          </Link>
        </div>
      </section>
    </main>
  );
}
