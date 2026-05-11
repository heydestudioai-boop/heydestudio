'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';

type ProjectMedia = {
  type: 'image' | 'video';
  src: string;
  hoverSrc?: string;
};

const projectMedia: Record<string, ProjectMedia> = {
  '/case-studies/solea': {
    type: 'image',
    src: '/images/work-solea-cover.jpg',
    hoverSrc: '/images/work-solea-01.jpg',
  },
  '/case-studies/eden': {
    type: 'image',
    src: '/images/work-eden-cover.jpg',
    hoverSrc: '/images/work-eden-01.png',
  },
  '/case-studies/motion': { type: 'video', src: '/images/work-motion-cover.mp4' },
};

export function WorkPageContent() {
  const { content, language } = useLanguage();
  const page = content.workPage;
  const trustLine =
    language === 'ES'
      ? 'Concept systems y estudios propios creados para probar lógica de campaña, consistencia de identidad y producción IA escalable.'
      : 'Concept systems and self-initiated studies built to test campaign logic, identity consistency and scalable AI production.';

  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-10 pt-16 text-white sm:px-8 md:px-12 md:pb-12 md:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text={page.heroTitle} />
          </h1>
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-white/54 md:text-base">
            {trustLine}
          </p>
          <EditorialBody dark className="max-w-2xl text-sm md:text-base">
            {page.heroBody}
          </EditorialBody>
        </div>
      </section>

      <section className="bg-black px-6 pb-16 text-white sm:px-8 md:px-12 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {page.projects.map((project) => {
              const media = projectMedia[project.href];

              return (
                <Link
                  key={project.name}
                  href={project.href}
                  className="group flex flex-col border-t border-white/14 pt-5"
                >
                <p className="mb-5 text-[11px] font-bold uppercase leading-relaxed tracking-[0.12em] text-white/42">
                  {project.type}
                </p>
                <div className="relative mb-5 overflow-hidden rounded-sm bg-[#212121]">
                  {media?.type === 'video' ? (
                    <video
                      className="h-[30rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={project.imageLabel}
                    >
                      <source src={media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={media?.src || '/images/hero-fallback-cover.jpg'}
                      alt={project.imageLabel}
                      width={900}
                      height={1200}
                      className="h-[30rem] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  )}
                  {media?.hoverSrc && (
                    <Image
                      src={media.hoverSrc}
                      alt=""
                      width={900}
                      height={1200}
                      aria-hidden="true"
                      className="absolute inset-0 h-[30rem] w-full object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <div>
                    <h2 className="mb-4 text-2xl font-bold leading-[1.05]">{project.name}</h2>
                    <p className="w-full whitespace-pre-line text-sm leading-relaxed text-white/70">
                      {project.body}
                    </p>
                  </div>
                  <span className="mt-8 w-full border border-white/16 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-white/60 transition group-hover:border-white/42 group-hover:text-white">
                    {page.readCaseStudy}
                  </span>
                </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-12 sm:px-8 md:px-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 max-w-4xl text-3xl font-bold leading-[1.05] md:text-5xl">
            {page.testimonialsTitle}
          </h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {page.workProof.map((item) => (
              <div key={item.title} className="bg-white p-8">
                <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                  {item.label}
                </p>
                <p className="mb-4 text-xl font-bold leading-tight text-gray-900">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed text-gray-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-16 pt-8 sm:px-8 md:px-12 md:pb-20 md:pt-10">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-gray-200 pt-10 md:grid-cols-[1fr_0.55fr] md:items-center">
          <div>
            <h2 className="mb-6 max-w-3xl text-3xl font-bold leading-[1.05] md:text-5xl">
              <EditorialTitle text={page.finalTitle} />
            </h2>
            <EditorialBody className="text-sm md:text-base">{page.finalBody}</EditorialBody>
          </div>
          <div className="mx-auto w-full max-w-[16rem] md:justify-self-center">
            <Button href="/contact" label={page.finalCta} />
          </div>
        </div>
      </section>
    </main>
  );
}
