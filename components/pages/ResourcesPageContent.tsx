'use client';

import Link from 'next/link';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm';
import { useLanguage } from '@/lib/language';

export function ResourcesPageContent() {
  const { content, language } = useLanguage();
  const page = content.resourcesPage;

  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-10 pt-16 text-white sm:px-8 md:px-12 md:pb-12 md:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text={page.heroTitle} />
          </h1>
          <EditorialBody dark className="max-w-2xl text-sm md:text-base">
            {page.heroBody}
          </EditorialBody>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 max-w-3xl text-3xl font-bold md:text-5xl">
            <EditorialTitle text={page.insideTitle} />
          </h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {page.resources.map((resource) => (
              <div key={resource.title} className="bg-white p-8">
                <h3 className="mb-4 text-2xl font-bold">{resource.title}</h3>
                <p className="mb-8 leading-relaxed text-gray-700">{resource.body}</p>
                <ul className="space-y-px bg-gray-200">
                  {resource.bullets.map((bullet) => (
                    <li key={bullet} className="bg-white py-3 text-sm text-gray-700">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.45fr_0.55fr]">
          <div>
            <EditorialKicker>{language === 'ES' ? 'Descarga' : 'Download'}</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              <EditorialTitle text={page.captureTitle} />
            </h2>
            <EditorialBody>{page.captureBody}</EditorialBody>
            <div className="mt-10 space-y-3 border-t border-gray-200 pt-8 text-sm text-gray-600">
              {page.trustLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <LeadCaptureForm />
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.38fr_0.62fr]">
          <h2 className="text-3xl font-bold md:text-5xl">
            <EditorialTitle text={page.whyTitle} />
          </h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {page.why.map((item) => (
              <div key={item.title} className="bg-white p-8">
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="leading-relaxed text-gray-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-12 text-white sm:px-8 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-12 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text={page.finalTitle} />
            </h2>
            <EditorialBody dark>{page.finalBody}</EditorialBody>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-sm bg-magenta px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-magenta-dark sm:w-auto"
            >
              {page.callCta}
            </Link>
            <Link
              href="/services#process"
              className="inline-flex w-full items-center justify-center rounded-sm border border-white/35 px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:border-white/70 sm:w-auto"
            >
              {page.processCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
