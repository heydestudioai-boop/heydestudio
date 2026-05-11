'use client';

import Link from 'next/link';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';
import { getPricingIndex, type PricingProductSlug } from '@/lib/pricingProducts';

const deliveryModelIndexesByProduct = [
  [0, 2, 3],
  [0, 1],
  [0, 1],
  [0, 1, 3],
  [1, 3],
];

function ProductTitle({ title, className = '', showNumber = true }: { title: string; className?: string; showNumber?: boolean }) {
  const match = title.match(/^(\d+\.)\s*(.*)$/);

  if (!match) {
    return <span className={className}>{title}</span>;
  }

  if (!showNumber) {
    return <span className={className}>{match[2]}</span>;
  }

  return (
    <span className={className}>
      <span className="text-magenta">{match[1]}</span> {match[2]}
    </span>
  );
}

export function ProductPricingPageContent({ slug }: { slug: PricingProductSlug }) {
  const { content, language } = useLanguage();
  const productIndex = getPricingIndex(slug);
  const pricingPage = content.pricingPage;
  const servicesPage = content.servicesPage;
  const product = pricingPage.products[productIndex];
  const service = servicesPage.services[productIndex];

  if (!product || !service) {
    return null;
  }

  const backLabel = language === 'ES' ? 'Volver a Services' : 'Back to Services';
  const detailsLabel = language === 'ES' ? 'Qué incluye' : 'What it includes';
  const nextLabel = language === 'ES' ? 'Siguiente paso' : 'Next step';
  const nextBody =
    language === 'ES'
      ? 'Si este nivel encaja con lo que necesitas, cuéntanos el contexto y te ayudamos a definir el punto de entrada correcto.'
      : 'If this level matches what you need, send the context and we will help define the right starting point.';
  const ctaLabel = language === 'ES' ? 'Start a Project' : 'Start a Project';
  const deliveryLabel = language === 'ES' ? 'Modelo de entrega' : 'Delivery model';
  const deliveryTitle =
    language === 'ES' ? 'Cómo se puede trabajar.' : 'How this can be delivered.';
  const deliveryBody =
    language === 'ES'
      ? 'Cada producto puede cerrarse como proyecto puntual o conectarse a continuidad según el nivel de sistema que necesites.'
      : 'Each product can close as a one-time project or connect to ongoing production depending on the system depth you need.';
  const deliveryModels = (deliveryModelIndexesByProduct[productIndex] ?? [0])
    .map((modelIndex) => pricingPage.models[modelIndex])
    .filter(Boolean);

  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-10 pt-16 text-white sm:px-8 md:px-12 md:pb-12 md:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            href="/services"
            className="mb-9 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-white/52 transition hover:text-magenta"
          >
            {backLabel}
          </Link>
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <ProductTitle title={service.title} className="block" showNumber={false} />
          </h1>
          <EditorialBody dark className="max-w-2xl text-sm md:text-base">
            {product.description} {service.priceNote}
          </EditorialBody>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <div>
              <h2 className="text-4xl font-bold leading-none md:text-6xl">
                <EditorialTitle text={product.name} />
              </h2>
            </div>
            <EditorialBody>{service.body}</EditorialBody>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {product.tiers.map((tier) => (
              <article
                key={`${product.name}-${tier.name}`}
                className={`bg-white p-6 md:p-8 ${
                  'recommended' in tier && tier.recommended ? 'ring-2 ring-inset ring-magenta' : ''
                }`}
              >
                {'recommended' in tier && tier.recommended && (
                  <div className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                    {pricingPage.recommended}
                  </div>
                )}
                <h3 className="mb-3 text-2xl font-bold">{tier.name}</h3>
                <div className="mb-8 text-3xl font-bold text-magenta">{tier.price}</div>
                <ul className="space-y-px bg-gray-200">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="bg-white py-3 text-sm leading-relaxed text-gray-700"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.48fr_1fr]">
          <div>
            <EditorialKicker>{detailsLabel}</EditorialKicker>
            <h2 className="text-4xl font-bold leading-none md:text-5xl">
              {language === 'ES' ? 'Del asset al sistema.' : 'From asset to system.'}
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {service.features.map((feature) => (
              <div key={feature} className="bg-white p-6">
                <span className="mb-5 block h-1 w-8 bg-magenta" />
                <p className="leading-relaxed text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 md:grid-cols-[0.48fr_1fr] md:items-end">
            <div>
              <EditorialKicker>{deliveryLabel}</EditorialKicker>
              <h2 className="text-4xl font-bold leading-none md:text-5xl">
                {deliveryTitle}
              </h2>
            </div>
            <EditorialBody>{deliveryBody}</EditorialBody>
          </div>

          <div
            className={`grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 ${
              deliveryModels.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
            }`}
          >
            {deliveryModels.map((model) => (
              <article key={model.name} className="bg-white p-6 md:p-8">
                <h3 className="mb-4 text-2xl font-bold">{model.name}</h3>
                <p className="mb-8 text-sm leading-relaxed text-gray-700">{model.description}</p>
                <div className="space-y-px bg-gray-200">
                  <div className="bg-white py-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                      {model.paymentLabel}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-700">{model.payment}</p>
                  </div>
                  <div className="bg-white py-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                      {model.timelineLabel}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-700">{model.timeline}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-12 text-white sm:px-8 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-12 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <EditorialKicker>{nextLabel}</EditorialKicker>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              {language === 'ES' ? 'Define el punto de entrada.' : 'Define the entry point.'}
            </h2>
            <EditorialBody dark>{nextBody}</EditorialBody>
          </div>
          <div className="md:text-right">
            <Button href="/contact" label={ctaLabel} />
          </div>
        </div>
      </section>
    </main>
  );
}
