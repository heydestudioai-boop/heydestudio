'use client';

import { Accordion } from '@/components/Accordion';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';
import { getPricingSlug } from '@/lib/pricingProducts';

function ProductTitle({ title, className = '' }: { title: string; className?: string }) {
  const match = title.match(/^(\d+\.)\s*(.*)$/);

  if (!match) {
    return <span className={className}>{title}</span>;
  }

  return (
    <span className={className}>
      <span className="text-magenta">{match[1]}</span> {match[2]}
    </span>
  );
}

export function ServicesPageContent() {
  const { content, language } = useLanguage();
  const page = content.servicesPage;
  const processPage = content.processPage;
  const comparisonBody =
    language === 'ES'
      ? 'Un workflow construido como sistema cambia lo que se reutiliza, lo que se mantiene coherente y lo que tu equipo puede operar después de la entrega.'
      : 'A system-first workflow changes what gets reused, what stays consistent, and what your team owns after delivery.';
  const pageLinks =
    language === 'ES'
        ? [
          ['#offers', 'Ofertas'],
          ['#method', 'Método'],
          ['#limits', 'Límites'],
          ['#process', 'Proceso'],
          ['#faq', 'FAQ'],
        ]
      : [
          ['#offers', 'Offers'],
          ['#method', 'Method'],
          ['#limits', 'Limits'],
          ['#process', 'Process'],
          ['#faq', 'FAQ'],
        ];
  const processKicker = language === 'ES' ? 'Proceso' : 'Process';

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

      <section className="sticky top-16 z-20 border-y border-gray-200 bg-[#FAFAFA]/92 px-6 py-4 backdrop-blur-md sm:px-8 md:px-12">
        <nav className="mx-auto flex max-w-7xl flex-wrap gap-5">
          {pageLinks.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-bold text-[#121212]/62 transition hover:text-magenta"
            >
              {label}
            </a>
          ))}
        </nav>
      </section>

      <section id="offers" className="scroll-mt-28 bg-white px-6 py-14 sm:px-8 md:px-12">
        <div className="mx-auto max-w-7xl border-b border-gray-200 pb-14">
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3 lg:grid-cols-5">
            {page.services.map((service, index) => (
              <a
                key={service.title}
                href={`#service-${index + 1}`}
                className="bg-white p-6 transition-colors hover:bg-gray-50"
              >
                <h2 className="mb-3 text-2xl font-bold">
                  <ProductTitle title={service.title} />
                </h2>
                <p className="text-sm leading-relaxed text-gray-700">{service.priceNote}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {page.services.map((service, index) => (
        <section
          id={`service-${index + 1}`}
          key={service.title}
          className={`px-6 py-16 sm:px-8 md:px-12 md:py-24 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.72fr_1fr]">
            <div>
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                <ProductTitle title={service.title} className="block" />
              </h2>
              <EditorialBody>{service.body}</EditorialBody>
              <div className="mt-10 border-t border-gray-200 pt-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-600">
                  {page.investment}
                </p>
                <div className="text-4xl font-bold text-magenta">{service.price}</div>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{service.priceNote}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-2xl font-bold">{page.whatYouGet}</h3>
              <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
                {service.features.map((item) => (
                  <div key={item} className="bg-white p-6">
                    <span className="mb-5 block h-1 w-8 bg-magenta" />
                    <p className="leading-relaxed text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button href={`/pricing/${getPricingSlug(index)}`} label={service.cta} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <h2 className="text-3xl font-bold md:text-5xl">
              <EditorialTitle text={page.comparisonTitle} />
            </h2>
            <EditorialBody>{comparisonBody}</EditorialBody>
          </div>

          <div className="overflow-x-auto border border-gray-200 bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  {page.comparisonHeaders.map((header) => (
                    <th key={header} className="px-6 py-4 text-left font-bold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.comparisonRows.map((row, idx) => (
                  <tr key={row[0]} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cell}
                        className={`border-t border-gray-200 px-6 py-5 ${
                          cellIdx === 0 ? 'font-bold text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="method" className="scroll-mt-28 bg-black px-6 py-14 text-white sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <div>
              <EditorialKicker>{language === 'ES' ? 'Método' : 'Method'}</EditorialKicker>
              <h2 className="text-4xl font-bold leading-none md:text-6xl">
                <EditorialTitle text={page.methodTitle} />
              </h2>
            </div>
            <EditorialBody dark>{page.methodBody}</EditorialBody>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-white/14 bg-white/14 md:grid-cols-5">
            {page.methodSteps.map((step) => (
              <article
                key={step.title}
                className="bg-[#121212] p-6 transition-colors hover:bg-[#1C1C1C]"
              >
                <h3 className="mb-4 text-xl font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/68">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="limits" className="scroll-mt-28 bg-white px-6 py-12 sm:px-8 md:px-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <div>
              <EditorialKicker>{language === 'ES' ? 'Límites' : 'Boundaries'}</EditorialKicker>
              <h2 className="text-4xl font-bold leading-none md:text-6xl">
                <EditorialTitle text={page.limitsTitle} />
              </h2>
            </div>
            <EditorialBody>{page.limitsBody}</EditorialBody>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2 lg:grid-cols-4">
            {page.limits.map((item) => (
              <article key={item.title} className="bg-[#FAFAFA] p-7">
                <h3 className="mb-4 text-2xl font-bold leading-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-28 bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <div>
              <EditorialKicker>{processKicker}</EditorialKicker>
              <h2 className="text-3xl font-bold md:text-5xl">
                <EditorialTitle text={processPage.heroTitle} />
              </h2>
            </div>
            <EditorialBody>{processPage.heroBody}</EditorialBody>
          </div>

          <div className="space-y-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
            {processPage.steps.map((phase) => (
              <div
                key={phase.step}
                className="grid gap-8 bg-white p-6 md:grid-cols-[0.22fr_0.58fr_1fr] md:p-8"
              >
                <div className="text-4xl font-bold leading-none text-magenta">{phase.step}</div>
                <div>
                  <h3 className="mb-3 text-2xl font-bold">{phase.title}</h3>
                  <p className="leading-relaxed text-gray-700">{phase.body}</p>
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

            <div className="mt-12 grid gap-6 md:grid-cols-3">
            {processPage.timelines.map((item) => (
              <div key={item.service} className="border border-gray-200 bg-[#FAFAFA] p-8">
                <h3 className="mb-3 text-2xl font-bold">{item.service}</h3>
                <p className="mb-8 text-lg font-bold text-magenta">{item.timeline}</p>
                <div className="space-y-px bg-gray-200">
                  {item.breakdown.map(([phase, weeks]) => (
                    <div
                      key={phase}
                      className="flex items-center justify-between bg-[#FAFAFA] py-3 text-gray-700"
                    >
                      <span>{phase}</span>
                      <span className="font-bold text-gray-900">
                        {processPage.weeksLabel} {weeks}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">{page.faqTitle}</h2>
          <Accordion items={page.faqs} />
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
