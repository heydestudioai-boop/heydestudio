import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import {
  commercialConditions,
  contentSession,
  launchOffer,
  monthlyModules,
  monthlyPlans,
  sectorPacks,
} from '@/lib/canonical';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.planes;

export default function PlanesPage() {
  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-12 pt-16 text-white sm:px-8 md:px-12 md:pb-16 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker>Planes y precios</EditorialKicker>
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text="Contenido mensual con precio cerrado." />
          </h1>
          <EditorialBody dark className="max-w-2xl">
            Fotografía, vídeo y redes para negocios locales. Sabes qué entra, cuánto cuesta y cuál es el siguiente paso antes de contratar.
          </EditorialBody>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.7fr_1fr] md:items-center">
          <div>
            <EditorialKicker>Sesión de entrada</EditorialKicker>
            <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">
              {contentSession.name} · {contentSession.priceLabel}
            </h2>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-magenta">{contentSession.billing}</p>
          </div>
          <EditorialBody>
            {contentSession.shoot}. {contentSession.pieces}. {contentSession.delivery}. {contentSession.conversionCredit}
          </EditorialBody>
        </div>
      </section>

      {launchOffer.active && (
        <section className="bg-magenta px-6 py-10 text-white sm:px-8 md:px-12">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[0.7fr_1fr] md:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/75">Oferta de lanzamiento activa</p>
              <h2 className="text-3xl font-bold leading-tight">
                {launchOffer.slots} plazas · Crecimiento a {launchOffer.priceLabel}
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed">
                {launchOffer.duration}, frente a {launchOffer.listPriceLabel} de lista, {launchOffer.consideration}.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
            {monthlyPlans.map((plan) => (
              <div key={plan.id} className={`flex flex-col bg-white p-8 ${plan.highlighted ? 'ring-2 ring-inset ring-magenta' : ''}`}>
                {plan.highlighted && <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-magenta">Plan central</p>}
                <h2 className="mb-3 text-3xl font-bold">{plan.name}</h2>
                <p className="mb-5 text-4xl font-bold text-magenta">{plan.priceLabel}</p>
                <p className="mb-7 text-sm leading-relaxed text-gray-700">{plan.bestFor}</p>
                <ul className="mb-8 space-y-3 text-sm leading-relaxed text-gray-700">
                  {plan.features.map((feature) => (
                    <li key={feature}>+ {feature}</li>
                  ))}
                </ul>
                <p className="mb-7 mt-auto border-l-2 border-magenta pl-4 text-sm font-bold leading-relaxed">{plan.promise}</p>
                <Button href="/audit" label={`Pedir auditoría para ${plan.name}`} variant={plan.highlighted ? 'primary' : 'secondary'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Módulos mensuales</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Añade solo lo que necesita tu operación.</h2>
            </div>
            <EditorialBody>Los módulos se suman al plan mensual y mantienen su alcance por escrito.</EditorialBody>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {monthlyModules.map((module) => (
              <div key={module.name} className="bg-white p-7">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-2xl font-bold">{module.name}</h3>
                  <p className="text-xl font-bold text-magenta">{module.priceLabel}</p>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end">
            <div>
              <EditorialKicker>Packs por sector</EditorialKicker>
              <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Cuando necesitas algo concreto.</h2>
            </div>
            <EditorialBody>Packs definidos para una necesidad puntual, sin convertirlos en mensualidades distintas.</EditorialBody>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {sectorPacks.map((pack) => (
              <div key={pack.name} className="bg-white p-7">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-magenta">{pack.sector}</p>
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-2xl font-bold">{pack.name}</h3>
                  <p className="text-xl font-bold text-magenta">{pack.priceLabel}</p>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">{pack.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <EditorialKicker>Qué plan encaja</EditorialKicker>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
            {monthlyPlans.map((plan) => (
              <div key={plan.id} className="grid gap-4 bg-white p-6 md:grid-cols-[0.25fr_1fr] md:items-center">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{plan.promise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.55fr_1fr]">
          <div>
            <EditorialKicker>Condiciones claras</EditorialKicker>
            <h2 className="text-3xl font-bold leading-[1.05] md:text-5xl">Sin ampliar lo que no está incluido.</h2>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
            {commercialConditions.map((condition) => (
              <li key={condition} className="bg-white p-5 text-sm leading-relaxed text-gray-700">{condition}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text="Empieza por una auditoría gratuita." />
            </h2>
            <EditorialBody dark>
              Pídela sin reservar una reunión. En 72 horas tienes una lectura clara; si estás en Toledo, puedo llevártela en persona.
            </EditorialBody>
          </div>
          <div className="md:text-right">
            <Button href="/audit" label="Pedir auditoría" />
          </div>
        </div>
      </section>
    </main>
  );
}
