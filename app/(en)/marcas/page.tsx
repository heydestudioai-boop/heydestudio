import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import {
  EditorialBody,
  EditorialKicker,
  EditorialTitle,
} from '@/components/EditorialText';
import { labProjects } from '@/lib/canonical';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Creative production for brands and teams | HEYDE Studio',
  description:
    'Advanced creative production for campaigns, launches and content: real, social-native, hybrid and generative work selected according to the objective.',
  path: '/marcas',
  locale: 'en_US',
  alternateLocale: ['es_ES'],
  keywords: [
    'creative production',
    'campaign production',
    'hybrid production',
    'content production for brands',
  ],
});

const capabilities = [
  {
    name: 'Real production',
    body: 'Photography, video and direction with real locations, products and people. Camera or mobile is chosen according to the use, pace and visual objective.',
  },
  {
    name: 'Social / digital',
    body: 'Vertical content, campaign adaptation and platform-native assets designed to move across formats without losing a consistent direction.',
  },
  {
    name: 'Hybrid',
    body: 'Real photography or video combined with AI-assisted extension, product visualisation or controlled transformation when it adds useful range.',
  },
  {
    name: 'Generative',
    body: 'Concept development, scenarios, avatars or synthetic production when the brief genuinely benefits from them — always selected as tools, never as the identity of the studio.',
  },
] as const;

const audiences = [
  'Brands preparing a campaign or product launch',
  'Agencies that need a reliable production partner',
  'Creative teams extending a concept across formats',
  'Hospitality, real estate, lifestyle and personal brands with advanced production needs',
] as const;

export default function MarcasPage() {
  return (
    <main className="bg-white text-black">
      <section className="bg-black px-6 pb-14 pt-16 text-white sm:px-8 md:px-12 md:pb-20 md:pt-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <div className="mb-7 flex flex-wrap items-center gap-4">
              <EditorialKicker>HEYDE for brands</EditorialKicker>
              <Link href="/" className="text-sm font-bold text-white/52 transition hover:text-white">
                Local business in Spain? → Main studio
              </Link>
            </div>
            <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
              <EditorialTitle text="Creative production built around the project." />
            </h1>
            <EditorialBody dark className="max-w-2xl text-base md:text-lg">
              Campaigns, launches and content produced with one creative
              direction. Real, social-native, hybrid or generative methods are
              combined according to what the work needs.
            </EditorialBody>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" label="Start a project" />
              <Button href="#heyde-lab" label="Explore HEYDE Lab" variant="secondary" />
            </div>
          </div>

          <div className="border-t border-white/18 pt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
              One studio, two doors
            </p>
            <p className="text-sm leading-relaxed text-white/68">
              HEYDE Studio is a hybrid content creation and social media
              management studio. This page is its advanced production path for
              brands, agencies and creative teams.
            </p>
          </div>
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-24 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.72fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Capabilities</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
                The production method follows the objective.
              </h2>
            </div>
            <EditorialBody>
              The value is not a preferred tool. It is the ability to choose,
              direct and connect the right production layers into one coherent
              body of work.
            </EditorialBody>
          </div>

          <div className="grid overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((capability, index) => (
              <article key={capability.name} className="bg-white p-7 md:p-8">
                <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                  0{index + 1}
                </p>
                <h3 className="mb-4 text-2xl font-bold">{capability.name}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{capability.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <div>
            <EditorialKicker>Production support</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
              For teams that need range without losing direction.
            </h2>
            <EditorialBody>
              HEYDE can lead the production or work alongside an agency or
              in-house team. The role is defined by the project, not by a fixed
              service catalogue.
            </EditorialBody>
          </div>

          <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2">
            {audiences.map((audience) => (
              <div key={audience} className="min-h-36 bg-white p-7">
                <p className="text-lg font-bold leading-snug">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="heyde-lab" className="scroll-mt-24 bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.72fr_1fr] md:items-end">
            <div>
              <EditorialKicker>HEYDE Lab</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
                Self-initiated work as creative evidence.
              </h2>
            </div>
            <EditorialBody dark>
              HEYDE Lab is where direction, experimentation and production
              capability are tested. These projects are not client commissions
              and make no claim about sales, ROI, metrics or testimonials.
            </EditorialBody>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {labProjects.map((project) => (
              <Link key={project.slug} href={project.href} className="group">
                <div className="overflow-hidden bg-[#202020]">
                  {project.media.type === 'video' ? (
                    <video
                      className="h-[25rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={project.media.altEn}
                    >
                      <source src={project.media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={project.media.src}
                      alt={project.media.altEn}
                      width={1000}
                      height={900}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-[25rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="mt-5 border-t border-white/14 pt-4">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/44">
                    HEYDE Lab · Self-initiated project · Not a client
                  </p>
                  <h3 className="mb-3 text-2xl font-bold">{project.name}</h3>
                  <p className="text-sm leading-relaxed text-white/64">{project.summaryEn}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-gray-200 pt-12 md:grid-cols-[1fr_0.52fr] md:items-end">
          <div>
            <EditorialKicker>Engagement</EditorialKicker>
            <h2 className="mb-6 text-4xl font-bold leading-none md:text-6xl">
              <EditorialTitle text="Bring the brief. We will define the production." />
            </h2>
            <EditorialBody>
              Advanced work is project-based and quoted according to scope. No
              local SME plan, legacy price or invented minimum is applied here.
            </EditorialBody>
          </div>
          <div className="md:text-right">
            <Button href="/contact" label="Tell us about your project" />
          </div>
        </div>
      </section>
    </main>
  );
}
