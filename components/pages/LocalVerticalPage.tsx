import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import {
  getSectorPack,
  monthlyPlans,
  type SectorPack,
  type VerticalPageModel,
} from '@/lib/canonical';

type VerticalPageProps = {
  model: VerticalPageModel;
};

const copy = {
  es: {
    production: 'Producción',
    productionValue: 'Móvil o cámara según objetivo',
    formats: 'Formatos',
    formatsValue: 'Foto, vídeo y piezas sociales',
    terms: 'Alcance',
    termsValue: 'Definido antes de producir',
    audit: 'Pedir auditoría',
    plans: 'Ver planes',
    packs: 'Packs por sector',
    packsTitle: 'Alcance y precio visibles.',
    includes: 'Incluye',
    direction: 'Dirección visual antes de producir',
    edition: 'Selección y edición de las piezas finales',
    channels: 'Formatos preparados para los canales acordados',
    monthly: 'Planes mensuales',
    monthlyTitle: 'Frecuencia con precios claros.',
    monthlyBody:
      'Los planes mantienen precios y alcance centralizados. Base prepara el contenido; Crecimiento y Dominio añaden publicación, comunidad y mayor volumen según su alcance.',
    area: 'Zona de trabajo',
    areaBody:
      'El desplazamiento está incluido en Toledo capital y alrededores. Fuera de esa zona se presupuesta según el proyecto.',
    whatsapp: 'Hablamos por WhatsApp',
  },
  en: {
    production: 'Production',
    productionValue: 'Mobile or camera by objective',
    formats: 'Formats',
    formatsValue: 'Photography, video and social assets',
    terms: 'Scope',
    termsValue: 'Defined before production',
    audit: 'Request an audit',
    plans: 'View plans',
    packs: 'Real estate packages',
    packsTitle: 'Visible scope and pricing.',
    includes: 'Included',
    direction: 'Visual direction before production',
    edition: 'Selection and editing of final assets',
    channels: 'Formats prepared for the agreed channels',
    monthly: 'Monthly plans',
    monthlyTitle: 'Consistent production with clear pricing.',
    monthlyBody:
      'Plan prices and scope are kept in the central offer model. The right plan depends on production volume and publishing needs.',
    area: 'Service area',
    areaBody:
      'Travel is included in Toledo city and nearby areas. Work outside that area is quoted according to the project.',
    whatsapp: 'Talk on WhatsApp',
  },
} as const;

function localizePack(pack: SectorPack, locale: VerticalPageModel['locale']) {
  if (locale === 'en') {
    return {
      name: pack.nameEn ?? pack.name,
      price: pack.priceLabelEn ?? pack.priceLabel,
      description: pack.descriptionEn ?? pack.description,
    };
  }

  return {
    name: pack.name,
    price: pack.priceLabel,
    description: pack.description,
  };
}

export function LocalVerticalPage({ model }: VerticalPageProps) {
  const labels = copy[model.locale];
  const packs = model.packIds.map(getSectorPack);
  const quickFacts = [
    [labels.production, labels.productionValue],
    [labels.formats, labels.formatsValue],
    [labels.terms, labels.termsValue],
  ];
  const primaryCta = model.primaryCta ?? { href: '/audit', label: labels.audit };

  return (
    <main className="bg-white">
      <section className="grid min-h-[calc(100vh-4rem)] bg-black text-white lg:grid-cols-[0.58fr_0.42fr]">
        <div className="flex items-end px-6 py-14 sm:px-8 md:px-12 md:py-24">
          <div className="w-full max-w-4xl">
            <EditorialKicker>{model.sector}</EditorialKicker>
            <h1 className="mb-7 text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
              <EditorialTitle text={model.title} />
            </h1>
            <p className="max-w-2xl text-lg leading-[1.65] text-white/74">{model.intro}</p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-white/14 bg-white/14 sm:grid-cols-3">
              {quickFacts.map(([label, value]) => (
                <div key={label} className="bg-black/70 p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-white/42">{label}</p>
                  <p className="text-sm font-bold leading-relaxed text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                href={primaryCta.href}
                label={primaryCta.label}
                target={primaryCta.external ? '_blank' : undefined}
                rel={primaryCta.external ? 'noreferrer' : undefined}
              />
              {model.alternate ? (
                <Button href={model.alternate.href} label={model.alternate.label} variant="secondary" />
              ) : (
                <Button href="/planes" label={labels.plans} variant="secondary" />
              )}
            </div>
          </div>
        </div>

        <div className="relative isolate flex min-h-[30rem] items-end overflow-hidden border-t border-white/14 px-6 py-12 sm:px-8 lg:min-h-full lg:border-l lg:border-t-0 lg:px-10 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(136,8,8,0.46),transparent_35%),linear-gradient(145deg,#212121_0%,#121212_48%,#060606_100%)]"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:3.5rem_3.5rem]" />
          <ol className="w-full border-t border-white/24">
            {model.focus.map((item, index) => (
              <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/14 py-6">
                <span className="text-xs font-bold tracking-[0.18em] text-magenta">0{index + 1}</span>
                <div>
                  <h2 className="mb-2 text-xl font-bold">{item.title}</h2>
                  <p className="max-w-md text-sm leading-relaxed text-white/64">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
            <div>
              <EditorialKicker>{labels.packs}</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">{labels.packsTitle}</h2>
            </div>
            <EditorialBody>{model.productionNote}</EditorialBody>
          </div>

          <div className={`grid gap-6 ${packs.length > 1 ? 'md:grid-cols-2' : ''}`}>
            {packs.map((pack) => {
              const localized = localizePack(pack, model.locale);

              return (
                <article key={pack.id} className="border-t border-gray-200 pt-6">
                  <div className="grid gap-6 sm:grid-cols-[0.62fr_1fr] sm:items-start">
                    <div>
                      <h3 className="mb-4 text-3xl font-bold leading-tight">{localized.name}</h3>
                      <p className="text-3xl font-bold text-magenta">{localized.price}</p>
                    </div>
                    <div>
                      <p className="mb-6 text-lg leading-[1.65] text-gray-700">{localized.description}</p>
                      <div className="rounded-sm border border-gray-200 bg-gray-50 p-6">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-magenta">{labels.includes}</p>
                        <ul className="space-y-3 text-sm leading-relaxed text-gray-700">
                          <li>+ {labels.direction}</li>
                          <li>+ {labels.edition}</li>
                          <li>+ {labels.channels}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {model.monthlyPlans ? (
        <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
              <div>
                <EditorialKicker>{labels.monthly}</EditorialKicker>
                <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">{labels.monthlyTitle}</h2>
              </div>
              <EditorialBody>{labels.monthlyBody}</EditorialBody>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
              {monthlyPlans.map((plan) => (
                <article key={plan.id} className="bg-white p-7">
                  <h3 className="mb-3 text-2xl font-bold">{plan.name}</h3>
                  <p className="mb-6 text-2xl font-bold text-magenta">{plan.priceLabel}</p>
                  <p className="text-sm leading-relaxed text-gray-700">{plan.bestFor}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={`${model.monthlyPlans ? 'bg-white' : 'bg-gray-50'} px-6 py-16 sm:px-8 md:px-12 md:py-24`}>
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <EditorialKicker>{labels.area}</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold leading-[1.05] md:text-5xl">{model.area}</h2>
            <EditorialBody>{labels.areaBody}</EditorialBody>
          </div>
          <div className="md:text-right">
            <Button
              href={primaryCta.external ? primaryCta.href : 'https://wa.me/34671141135'}
              label={primaryCta.external ? primaryCta.label : labels.whatsapp}
              target="_blank"
              rel="noreferrer"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
