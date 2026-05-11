'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { getCaseStudyContent, type CaseStudyMedia } from '@/lib/caseStudyContent';
import { useLanguage } from '@/lib/language';

function MediaFrame({
  media,
  priority = false,
  className = '',
}: {
  media: CaseStudyMedia;
  priority?: boolean;
  className?: string;
}) {
  if (media.type === 'video') {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        autoPlay
        muted
        loop
        playsInline
        aria-label={media.alt}
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      priority={priority}
      className={`object-cover ${className}`}
      sizes="(min-width: 1024px) 50vw, 100vw"
    />
  );
}

export function CaseStudyPageContent({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const caseStudy = getCaseStudyContent(language, slug);

  const labels = {
    notFound: language === 'ES' ? 'Caso no encontrado' : 'Case study not found',
    notFoundBody:
      language === 'ES'
        ? 'El caso que buscas no existe.'
        : "The case study you're looking for doesn't exist.",
    backPortfolio: language === 'ES' ? 'Volver a Work' : 'Back to Work',
    overview: language === 'ES' ? 'Visión general' : 'Overview',
    system: language === 'ES' ? 'Sistema' : 'System',
    breakdown: language === 'ES' ? 'Desglose del sistema' : 'System breakdown',
    gallery: language === 'ES' ? 'Visuales' : 'Visuals',
    deliverables: language === 'ES' ? 'Entrega' : 'Delivery',
    campaignFrames: language === 'ES' ? 'Imágenes de campaña' : 'Campaign frames',
    campaignReel: language === 'ES' ? 'Reel de campaña' : 'Campaign reel',
    motionShowcase: language === 'ES' ? 'Showcase de motion' : 'Motion showcase',
    reelPending:
      language === 'ES'
        ? 'Espacio preparado para conectar el reel 9:16 de la campaña.'
        : 'Prepared space for the campaign 9:16 reel.',
  };
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!caseStudy) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
        <div>
          <h1 className="mb-4 text-4xl font-bold">{labels.notFound}</h1>
          <p className="mb-8 text-gray-700">{labels.notFoundBody}</p>
          <Link href="/work" className="font-bold text-magenta transition hover:text-magenta-dark">
            {labels.backPortfolio}
          </Link>
        </div>
      </main>
    );
  }

  const imageGallery = caseStudy.gallery.filter((media) => media.type === 'image');
  const videoGallery = caseStudy.gallery.filter((media) => media.type === 'video');
  const reelMedia = caseStudy.gallery.find((media) => media.type === 'video');
  const hasImageGallery = imageGallery.length > 0;

  return (
    <main className="bg-white text-black">
      <section className="bg-black px-6 pb-16 pt-10 text-white sm:px-8 md:px-12 md:pb-20 md:pt-14">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <Link
              href="/work"
              className="mb-10 inline-flex text-xs font-bold uppercase tracking-[0.16em] text-white/48 transition hover:text-white"
            >
              {labels.backPortfolio}
            </Link>
            <EditorialKicker>{caseStudy.eyebrow}</EditorialKicker>
            <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
              <EditorialTitle text={caseStudy.title} />
            </h1>
            <EditorialBody dark className="text-base md:text-lg">
              {caseStudy.description}
            </EditorialBody>
          </div>

          <div className="grid border-t border-white/18 text-sm text-white/72 sm:grid-cols-2 lg:grid-cols-1">
            {caseStudy.meta.map((item) => (
              <div key={`${item.label}-${item.value}`} className="border-b border-white/12 py-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-white/38">
                  {item.label}
                </p>
                <p className="leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2">
            {caseStudy.sections.map((section) => (
              <article key={section.kicker} className="max-w-xl">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                  {section.kicker}
                </p>
                <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl">
                  <EditorialTitle text={section.title} />
                </h2>
                <EditorialBody className="text-base md:text-lg">{section.body}</EditorialBody>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <EditorialKicker>{labels.system}</EditorialKicker>
              <h2 className="text-4xl font-bold leading-none md:text-6xl">
                <EditorialTitle text={caseStudy.systemTitle} />
              </h2>
            </div>
            <EditorialBody dark className="text-base md:text-lg">
              {caseStudy.systemBody}
            </EditorialBody>
          </div>

          <div className="grid border border-white/14 md:grid-cols-4">
            {caseStudy.systemPoints.map((point) => (
              <article
                key={point.title}
                className="min-h-72 border-b border-white/14 p-8 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <h3 className="mb-5 text-2xl font-bold leading-tight">{point.title}</h3>
                <p className="text-base leading-relaxed text-white/68">{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
            <div>
              <EditorialKicker>{labels.breakdown}</EditorialKicker>
              <h2 className="mb-7 text-4xl font-bold leading-none md:text-6xl">
                <EditorialTitle text={caseStudy.breakdownTitle} />
              </h2>
            </div>
            <EditorialBody className="text-base md:text-lg">
              {caseStudy.breakdownBody}
            </EditorialBody>
          </div>

          <div className="grid overflow-hidden rounded-sm border border-gray-200 bg-gray-200 lg:grid-cols-[0.36fr_0.64fr]">
            <aside className="bg-black p-8 text-white md:p-10">
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                {caseStudy.metricsTitle}
              </p>
              <p className="mb-10 max-w-sm text-2xl font-bold leading-tight">
                {language === 'ES'
                  ? 'La pieza visible es solo la superficie. Lo importante es la lógica que permite repetirla.'
                  : 'The visible piece is only the surface. The value is the logic that makes it repeatable.'}
              </p>
              <div className="grid gap-px overflow-hidden rounded-sm bg-white/14">
                {caseStudy.metrics.map((metric) => (
                  <div key={metric.label} className="bg-[#121212] p-5">
                    <p className="mb-2 text-4xl font-bold leading-none text-white">{metric.value}</p>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/48">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="grid gap-px bg-gray-200 md:grid-cols-2">
              {caseStudy.breakdown.map((item) => (
                <article key={item.label} className="bg-white p-8">
                  <p className="mb-4 text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-magenta">
                    {item.label}
                  </p>
                  <h3 className="mb-5 text-2xl font-bold leading-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <EditorialKicker>{labels.gallery}</EditorialKicker>
              <h2 className="text-4xl font-bold leading-none md:text-6xl">
                <EditorialTitle text={caseStudy.galleryTitle} />
              </h2>
            </div>
            <EditorialBody className="text-base md:text-lg">{caseStudy.galleryBody}</EditorialBody>
          </div>

          {hasImageGallery ? (
            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
              <article className="mx-auto w-full max-w-[34rem] border border-gray-200 bg-white p-4 md:p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-magenta">
                    {labels.campaignFrames}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {String(activeImageIndex + 1).padStart(2, '0')} / {String(imageGallery.length).padStart(2, '0')}
                  </p>
                </div>

                <div className="group/slider relative h-[30rem] overflow-hidden bg-gray-100 sm:h-[34rem]">
                  <div
                    className="flex h-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                  >
                    {imageGallery.map((media, index) => (
                      <div key={media.src} className="relative h-full w-full shrink-0">
                        <MediaFrame media={media} priority={index === 0} />
                      </div>
                    ))}
                  </div>

                  {imageGallery.length > 1 && (
                    <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between opacity-0 transition-opacity duration-300 group-hover/slider:opacity-100">
                      <button
                        type="button"
                        aria-label="Previous image"
                        onClick={() =>
                          setActiveImageIndex((index) =>
                            index === 0 ? imageGallery.length - 1 : index - 1
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/28 text-lg font-bold text-white backdrop-blur-md transition hover:bg-black/48"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={() =>
                          setActiveImageIndex((index) =>
                            index === imageGallery.length - 1 ? 0 : index + 1
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/28 text-lg font-bold text-white backdrop-blur-md transition hover:bg-black/48"
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>

                {imageGallery.length > 1 && (
                  <div className="mt-4 flex justify-center gap-2">
                    {imageGallery.map((media, index) => (
                      <button
                        key={media.src}
                        type="button"
                        aria-label={`${labels.campaignFrames} ${index + 1}`}
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-2.5 rounded-full transition ${
                          activeImageIndex === index ? 'w-8 bg-magenta' : 'w-2.5 bg-gray-300 hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </article>

              <article className="mx-auto w-full max-w-[34rem] border border-gray-200 bg-[#F5F5F5] p-4 md:p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-magenta">
                    {labels.campaignReel}
                  </h3>
                  <p className="text-sm text-gray-500">9:16</p>
                </div>
                <div className="relative mx-auto h-[30rem] max-w-[19.25rem] overflow-hidden bg-black sm:h-[34rem] sm:max-w-[21.75rem]">
                  {reelMedia ? (
                    <MediaFrame media={reelMedia} />
                  ) : (
                    <div className="flex h-full flex-col justify-between p-6 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">
                        Motion Piece
                      </p>
                      <p className="max-w-56 text-2xl font-bold leading-tight text-white/82">
                        {labels.reelPending}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {videoGallery.map((media, index) => (
                <article key={media.src} className="mx-auto w-full max-w-[24rem] border border-gray-200 bg-[#F5F5F5] p-4 md:p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-magenta">
                      {labels.motionShowcase}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {String(index + 1).padStart(2, '0')} / {String(videoGallery.length).padStart(2, '0')}
                    </p>
                  </div>
                  <div className="relative mx-auto h-[30rem] max-w-[19.25rem] overflow-hidden bg-black sm:h-[34rem] sm:max-w-[21.75rem]">
                    <MediaFrame media={media} priority={index === 0} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <EditorialKicker>{labels.deliverables}</EditorialKicker>
            <h2 className="text-4xl font-bold leading-none md:text-5xl">
              <EditorialTitle text={caseStudy.deliverablesTitle} />
            </h2>
          </div>

          <div className="grid border border-gray-200 md:grid-cols-3">
            {caseStudy.deliverables.map((deliverable) => (
              <div key={deliverable} className="border-b border-gray-200 p-6 md:border-r md:last:border-r-0">
                <p className="text-lg font-bold leading-snug">{deliverable}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-gray-200 pt-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <h2 className="mb-7 max-w-4xl text-4xl font-bold leading-none md:text-6xl">
              <EditorialTitle text={caseStudy.finalTitle} />
            </h2>
            <EditorialBody>{caseStudy.finalBody}</EditorialBody>
          </div>
          <div className="flex flex-col items-stretch gap-4 justify-self-start md:justify-self-end">
            <Button href="/contact" label={caseStudy.finalCta} />
            <Button href="/work" label={labels.backPortfolio} variant="secondary" />
          </div>
        </div>
      </section>
    </main>
  );
}
