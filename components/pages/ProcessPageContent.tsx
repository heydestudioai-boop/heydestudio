'use client';

import { Button } from '@/components/Button';
import { EditorialBody, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';

export function ProcessPageContent() {
  const { content } = useLanguage();
  const page = content.processPage;

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
          <div className="space-y-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
            {page.steps.map((phase) => (
              <div
                key={phase.step}
                className="grid gap-8 bg-white p-6 md:grid-cols-[0.3fr_0.7fr_1fr] md:p-10"
              >
                <div className="text-5xl font-bold leading-none text-magenta">{phase.step}</div>
                <div>
                  <h2 className="mb-4 text-3xl font-bold">{phase.title}</h2>
                  <p className="text-lg leading-relaxed text-gray-700">{phase.body}</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {phase.details.map((detail) => (
                    <li
                      key={detail}
                      className="border-t border-gray-200 pt-3 text-sm text-gray-700"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 max-w-3xl text-3xl font-bold md:text-5xl">
            <EditorialTitle text={page.whyTitle} />
          </h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {page.principles.map((item) => (
              <div key={item.title} className="bg-white p-8">
                <span className="mb-8 block h-1 w-8 bg-magenta" />
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="leading-relaxed text-gray-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-3xl font-bold md:text-5xl">{page.timelineTitle}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {page.timelines.map((item) => (
              <div key={item.service} className="border border-gray-200 bg-white p-8">
                <h3 className="mb-3 text-2xl font-bold">{item.service}</h3>
                <p className="mb-8 text-lg font-bold text-magenta">{item.timeline}</p>
                <div className="space-y-px bg-gray-200">
                  {item.breakdown.map(([phase, weeks]) => (
                    <div
                      key={phase}
                      className="flex items-center justify-between bg-white py-3 text-gray-700"
                    >
                      <span>{phase}</span>
                      <span className="font-bold text-gray-900">
                        {page.weeksLabel} {weeks}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-bold">{page.faqTitle}</h2>
          <div className="space-y-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
            {page.faqs.map((item) => (
              <div key={item.question} className="bg-white p-6 md:p-8">
                <h3 className="mb-3 text-xl font-bold text-gray-900">{item.question}</h3>
                <p className="leading-relaxed text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text={page.finalTitle} />
            </h2>
            <EditorialBody dark>{page.finalBody}</EditorialBody>
          </div>
          <div className="md:text-right">
            <Button href="/contact" label={page.finalCta} />
          </div>
        </div>
      </section>
    </main>
  );
}
