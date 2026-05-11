'use client';

import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';

export function PricingPageContent() {
  const { content } = useLanguage();
  const page = content.pricingPage;

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

      {page.products.map((product, productIndex) => (
        <section
          key={product.name}
          className={`px-6 py-16 sm:px-8 md:px-12 md:py-24 ${
            productIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-8 md:grid-cols-[0.5fr_1fr] md:items-end">
              <div>
                <EditorialKicker>0{productIndex + 1} / Product</EditorialKicker>
                <h2 className="text-4xl font-bold md:text-5xl">{product.name}</h2>
              </div>
              <EditorialBody>{product.description}</EditorialBody>
            </div>

            <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
              {product.tiers.map((tier) => (
                <div
                  key={`${product.name}-${tier.name}`}
                  className={`bg-white p-6 md:p-8 ${
                    'recommended' in tier && tier.recommended ? 'ring-2 ring-inset ring-magenta' : ''
                  }`}
                >
                  {'recommended' in tier && tier.recommended && (
                    <div className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                      {page.recommended}
                    </div>
                  )}
                  <h3 className="mb-3 text-2xl font-bold">{tier.name}</h3>
                  <div className="mb-8 text-3xl font-bold text-magenta">{tier.price}</div>

                  <ul className="space-y-px bg-gray-200">
                    {tier.features.map((feature) => (
                      <li key={feature} className="bg-white py-3 text-sm leading-relaxed text-gray-700">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-bold md:text-5xl">{page.deliveryTitle}</h2>

          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {page.models.map((model) => (
              <div key={model.name} className="bg-white p-8">
                <h3 className="mb-4 text-2xl font-bold">{model.name}</h3>
                <p className="mb-8 leading-relaxed text-gray-700">{model.description}</p>

                <div className="grid gap-px bg-gray-200">
                  <div className="bg-white py-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-gray-600">
                      {model.paymentLabel}
                    </p>
                    <p className="text-gray-900">{model.payment}</p>
                  </div>
                  <div className="bg-white py-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-gray-600">
                      {model.timelineLabel}
                    </p>
                    <p className="text-gray-900">{model.timeline}</p>
                  </div>
                </div>
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
