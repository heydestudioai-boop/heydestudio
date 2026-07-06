import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'HEYDE Studio for Brands | AI visual systems',
  description:
    'Premium AI visual systems, campaign imagery, avatars and production infrastructure for brands.',
  path: '/marcas',
  locale: 'en_US',
  alternateLocale: ['es_ES'],
});

const services = [
  ['Avatar System', 'Reusable digital assets with identity logic, expressions, angles and usage rules.'],
  ['Image', 'Campaign-quality static imagery, from single assets to editorial image packs.'],
  ['Video / Reel', 'Motion pieces for social, teasers and campaign moments.'],
  ['Campaign', 'A complete visual narrative with image world, formats and derivation rules.'],
  ['Visual Infrastructure', 'Documentation, workflows, training and support for repeatable production.'],
];

const projects = [
  ['Solea', '/images/work-solea-cover.jpg', '/case-studies/solea'],
  ['Eden', '/images/work-eden-cover.jpg', '/case-studies/eden'],
  ['Motion Studies', '/images/HEYDE_Story_Portfolio.jpg', '/work'],
];

export default function MarcasPage() {
  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-12 pt-16 text-white sm:px-8 md:px-12 md:pb-16 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <EditorialKicker>HEYDE for brands</EditorialKicker>
            <Link href="/" className="text-sm font-bold text-white/58 transition hover:text-white">
              ¿Negocio local en España? → Para negocios
            </Link>
          </div>
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text="Visual identity. Campaign systems. Scalable production." />
          </h1>
          <EditorialBody dark className="max-w-2xl">
            We turn AI production into a controlled brand asset: direction, identity lock, campaign derivation and documentation your team can reuse.
          </EditorialBody>
          <p className="mt-6 max-w-2xl text-sm font-bold uppercase tracking-[0.14em] text-white/48">
            Remote-first. Proyectos para marcas de España y Europa.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" label="Start a project" />
            <Button href="/work" label="See work" variant="secondary" />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Services</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Five ways to build your visual system.</h2>
            </div>
            <EditorialBody>
              The premium lane keeps the current HEYDE logic: systems, avatars, campaigns and controlled production for brands.
            </EditorialBody>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-5">
            {services.map(([name, body], index) => (
              <div key={name} className="bg-white p-7">
                <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-magenta">0{index + 1}</p>
                <h3 className="mb-4 text-xl font-bold">{name}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Laboratory</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Concept work and selected systems.</h2>
            </div>
            <EditorialBody dark>
              Self-initiated projects where we explore the limits of AI-assisted production. Honest labelling, high ambition.
            </EditorialBody>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map(([title, image, href]) => (
              <Link key={title} href={href} className="group">
                <div className="overflow-hidden rounded-sm bg-[#212121]">
                  <Image
                    src={image}
                    alt={title}
                    width={1000}
                    height={900}
                    className="h-[25rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-5 border-t border-white/14 pt-4 text-xl font-bold">{title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text="Bring us the production bottleneck." />
            </h2>
            <EditorialBody>
              Pricing for premium systems is scoped in proposal after context, not listed in the local business plan catalogue.
            </EditorialBody>
          </div>
          <div className="md:text-right">
            <Button href="/contact" label="Schedule a call" />
          </div>
        </div>
      </section>
    </main>
  );
}
