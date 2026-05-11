'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';

const homeFlow = {
  EN: {
    thinkingEyebrow: 'The commercial problem',
    thinkingTitle: 'Your brand does not need more isolated assets. It needs a production system.',
    thinkingBody:
      'Every campaign should make the next one easier.\nHEYDE Studio turns scattered AI output into a visual system your team can reuse:\nrules, workflow, documentation and production control.',
    productEyebrow: 'Services',
    productBody:
      'Choose the product and control level your team needs now:\navatar, image, reel, campaign or infrastructure.',
    proofEyebrow: 'Work',
    proofTitle: 'Selected systems.',
    proofBody:
      'Different worlds, same control.\nBuilt around whatever the campaign needs.',
    processEyebrow: 'Workflow',
    processTitle: 'A simple path from brief to reusable system.',
    processBody:
      'We keep the process legible: define the rules, build the assets, document the logic and hand it over so your team can keep moving.',
    ctaTitle: 'Ready to build the system?',
    ctaBody:
      'Send the context.\nWe will help you identify the right starting point and the level of system your brand actually needs.',
    ctaPrimary: 'Start a Project',
    ctaSecondary: 'View Pricing',
  },
  ES: {
    thinkingEyebrow: 'El problema comercial',
    thinkingTitle: 'Tu marca no necesita más assets aislados. Necesita un sistema de producción.',
    thinkingBody:
      'Cada campaña debería hacer más fácil la siguiente.\nHEYDE Studio convierte outputs dispersos de IA en un sistema visual que tu equipo puede reutilizar:\nreglas, workflow, documentación y control de producción.',
    productEyebrow: 'Servicios',
    productBody:
      'Elige el producto y nivel de control que tu equipo necesita ahora:\navatar, imagen, reel, campaña o infraestructura.',
    proofEyebrow: 'Work',
    proofTitle: 'Sistemas seleccionados.',
    proofBody:
      'Mundos distintos, el mismo control.\nConstruidos alrededor de lo que necesita cada campaña.',
    processEyebrow: 'Workflow',
    processTitle: 'Un camino simple del brief al sistema reutilizable.',
    processBody:
      'Mantenemos el proceso claro: definimos reglas, construimos assets, documentamos la lógica y hacemos handoff para que tu equipo siga avanzando.',
    ctaTitle: '¿Construimos el sistema?',
    ctaBody:
      'Envíanos el contexto.\nTe ayudamos a identificar el mejor punto de partida y el nivel de sistema que tu marca necesita.',
    ctaPrimary: 'Empezar Proyecto',
    ctaSecondary: 'Ver Precios',
  },
} as const;

const projectImages = [
  {
    title: 'Soleá',
    image: '/images/work-solea-cover.jpg',
    href: '/case-studies/solea',
  },
  {
    title: 'eden',
    image: '/images/work-eden-cover.jpg',
    href: '/case-studies/eden',
  },
  {
    title: 'Motion Studies',
    video: '/images/work-motion-cover.mp4',
    href: '/case-studies/motion',
  },
];

export function HomePageContent() {
  const { content, language } = useLanguage();
  const home = content.home;
  const copy = homeFlow[language];
  const heroTitleLines = home.heroTitle.split(/(?<=\.)\s+/).filter(Boolean);
  const processDetails =
    language === 'ES'
      ? [
          'Auditoría, referencias y objetivo comercial.',
          'Dirección visual, reglas y sistema base.',
          'Producción de assets, formatos y variaciones.',
          'SOP, criterios de calidad y lógica reutilizable.',
          'Handoff, formación y siguientes movimientos.',
        ]
      : [
          'Audit, references and commercial objective.',
          'Visual direction, rules and base system.',
          'Asset production, formats and variations.',
          'SOP, quality criteria and reusable logic.',
          'Handoff, training and next moves.',
        ];
  const serviceCtas =
    language === 'ES'
      ? ['Construir Avatar', 'Crear Imagen', 'Crear Reel', 'Construir Campaña', 'Instalar Infraestructura']
      : ['Build an Avatar', 'Create Image', 'Create Reel', 'Build a Campaign', 'Install Infrastructure'];

  return (
    <main className="bg-white">
      <section className="relative flex min-h-[calc(100vh-4rem)] items-end overflow-hidden bg-black px-6 py-14 text-white sm:px-8 md:px-12 md:py-24">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-fallback-cover.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start">
          <div className="max-w-6xl [text-shadow:0_2px_24px_rgba(18,18,18,0.62)]">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/56 md:text-xs">
              AI Visual Systems for Modern Brands
            </p>
            <h1 className="mb-9 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
              {heroTitleLines.map((line) => (
                <span key={line} className="block md:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h1>
            <div className="flex flex-col gap-4 sm:flex-row [text-shadow:none]">
              <Button href="/contact" label={copy.ctaPrimary} />
              <Button href="/work" label={home.heroSecondary} variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div>
            <EditorialKicker>{copy.thinkingEyebrow}</EditorialKicker>
            <h2 className="max-w-5xl text-3xl font-bold leading-[1.05] md:text-5xl">
              <EditorialTitle text={copy.thinkingTitle} />
            </h2>
          </div>
          <EditorialBody className="mt-7 max-w-3xl text-sm md:text-base">
            {copy.thinkingBody}
          </EditorialBody>

          <div className="mt-8 md:mt-10">
            <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-5">
              {home.problems.map((item) => (
                <div key={item.title} className="bg-white p-6">
                  <h4 className="mb-3 text-lg font-bold">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <EditorialKicker>{copy.productEyebrow}</EditorialKicker>
              <h2 className="whitespace-pre-line text-3xl font-bold leading-[1.05] md:text-5xl">
                {home.servicesTitle}
              </h2>
            </div>
            <EditorialBody className="text-sm md:text-base">{copy.productBody}</EditorialBody>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2 lg:grid-cols-5">
            {home.services.map((service, index) => (
              <Link
                key={service.title}
                href="/services"
                className="group bg-white p-8 transition-colors hover:bg-gray-50"
              >
                <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                  0{index + 1}
                </p>
                <h3 className="mb-4 text-2xl font-bold">{service.title}</h3>
                <p className="mb-8 text-sm leading-relaxed text-gray-700">{service.description}</p>
                <span className="text-sm font-bold text-magenta group-hover:text-magenta-dark">
                  {serviceCtas[index]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-3 md:items-end">
            <div className="md:col-span-2">
              <EditorialKicker>{copy.proofEyebrow}</EditorialKicker>
              <h2 className="max-w-4xl text-3xl font-bold leading-[1.05] md:text-5xl">
                <EditorialTitle text={copy.proofTitle} />
              </h2>
              <EditorialBody dark className="mt-6 max-w-2xl text-sm md:text-base">
                {copy.proofBody}
              </EditorialBody>
            </div>
            <div className="flex flex-col md:items-end md:self-end md:text-right">
              <Link href="/work" className="text-sm font-bold text-white/70 transition hover:text-white">
                {home.workCta}
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {projectImages.map((project, index) => (
              <Link key={project.title} href={project.href} className="group">
                <div className="overflow-hidden rounded-sm bg-[#212121]">
                  {'video' in project ? (
                    <video
                      className="h-[28rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={project.title}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1000}
                      height={900}
                      className="h-[28rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/14 pt-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">
                    0{index + 1}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <div>
              <EditorialKicker>{copy.processEyebrow}</EditorialKicker>
              <h2 className="max-w-4xl text-3xl font-bold leading-[1.05] md:text-5xl">
                <EditorialTitle text={copy.processTitle} />
              </h2>
            </div>
            <EditorialBody className="mt-8 max-w-3xl text-sm md:text-base">
              {copy.processBody}
            </EditorialBody>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-5">
            {home.processSteps.map((step, idx) => (
              <div key={step} className="bg-white p-6">
                <div className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                  0{idx + 1}
                </div>
                <p className="mb-4 text-lg font-bold text-gray-900">{step}</p>
                <p className="text-sm leading-relaxed text-gray-700">{processDetails[idx]}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button href="/services#process" label={home.processCta} variant="secondary" />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-center">
          <div>
            <h2 className="mb-6 max-w-3xl text-3xl font-bold leading-[1.05] md:text-5xl">
              <EditorialTitle text={copy.ctaTitle} />
            </h2>
            <EditorialBody className="text-sm md:text-base">{copy.ctaBody}</EditorialBody>
          </div>
          <div className="mx-auto flex w-full max-w-[16rem] flex-col gap-4 md:justify-self-center">
            <Button href="/contact" label={copy.ctaPrimary} />
            <Button href="/services#offers" label={copy.ctaSecondary} variant="secondary" />
          </div>
        </div>
      </section>
    </main>
  );
}
