'use client';

import { Accordion } from '@/components/Accordion';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';

export function FAQPageContent() {
  const { content } = useLanguage();
  const page = content.faqPage;

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
        <div className="mx-auto grid max-w-7xl gap-16">
          {page.sections.map((section, index) => (
            <div key={section.title} className="grid gap-8 md:grid-cols-[0.34fr_0.66fr]">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                  0{index + 1}
                </p>
                <h2 className="text-3xl font-bold">{section.title}</h2>
              </div>
              <Accordion items={section.items} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text={page.finalTitle} />
            </h2>
            <EditorialBody>{page.finalBody}</EditorialBody>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
            <Button href="/contact" label={page.contactCta} />
            <Button
              href="https://calendly.com/heyde-studio"
              label={page.callCta}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
