'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';

export function AboutPageContent() {
  const { content, language } = useLanguage();
  const page = content.aboutPage;

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
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.38fr_0.62fr]">
          <div>
            <EditorialKicker>{language === 'ES' ? 'Origen' : 'Origin'}</EditorialKicker>
            <h2 className="text-4xl font-bold md:text-5xl">
              <EditorialTitle text={page.storyTitle} />
            </h2>
          </div>
          <div className="space-y-7">
            {page.story.map((paragraph) => (
              <p key={paragraph} className="text-xl leading-[1.6] text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 max-w-3xl text-3xl font-bold md:text-5xl">
            <EditorialTitle text={page.originTitle} />
          </h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {page.origin.map((item) => (
              <div key={item.title} className="bg-white p-8">
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="leading-relaxed text-gray-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.38fr_0.62fr]">
          <h2 className="text-3xl font-bold md:text-5xl">
            <EditorialTitle text={page.beliefsTitle} />
          </h2>
          <div className="space-y-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
            {page.beliefs.map((belief) => (
              <div key={belief} className="bg-white p-6">
                <span className="mb-5 block h-1 w-8 bg-magenta" />
                <p className="text-xl leading-relaxed text-gray-900">{belief}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 max-w-4xl text-3xl font-bold md:text-5xl">
            <EditorialTitle text={page.chooseTitle} />
          </h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {page.choose.map((item) => (
              <div key={item.title} className="bg-white p-8">
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="leading-relaxed text-gray-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.46fr_0.54fr] md:items-start">
          <div>
            <EditorialKicker>{page.teamTitle}</EditorialKicker>
            <div className="relative h-[28rem] w-full overflow-hidden rounded-sm border border-gray-200 bg-gray-100">
              <Image
                src="/images/oliver-heyde.jpeg"
                alt={page.teamName}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 46vw, 100vw"
              />
            </div>
          </div>
          <div className="pt-1">
            <h2 className="mb-3 text-4xl font-bold leading-none md:text-5xl">{page.teamName}</h2>
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-magenta">
              {page.teamRole}
            </p>
            <p className="max-w-2xl text-lg leading-[1.65] text-gray-700 md:text-xl">{page.teamBio}</p>
            <Link
              href={page.teamLinkedIn}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex border border-gray-200 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-magenta transition hover:border-magenta hover:text-magenta-dark"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <EditorialKicker>{page.trustTitle}</EditorialKicker>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {page.trust.map((item) => (
              <div key={item.title} className="bg-white p-8">
                <span className="mb-6 block h-1 w-8 bg-magenta" />
                <h3 className="mb-4 text-xl font-bold">{item.title}</h3>
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
          <div className="md:text-right">
            <Button href="/contact" label={page.finalCta} />
          </div>
        </div>
      </section>
    </main>
  );
}
