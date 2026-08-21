import { Accordion } from '@/components/Accordion';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialTitle } from '@/components/EditorialText';
import { localFaqSections } from '@/lib/canonical';

export function FAQPageContent() {
  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-10 pt-16 text-white sm:px-8 md:px-12 md:pb-12 md:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text="Preguntas claras antes de empezar." />
          </h1>
          <EditorialBody dark className="max-w-2xl text-sm md:text-base">
            Planes, publicación, permanencia, derechos, archivos, IA y zona de servicio, explicados sin letra pequeña.
          </EditorialBody>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-16">
          {localFaqSections.map((section, index) => (
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
              <EditorialTitle text="Empieza por una auditoría gratuita." />
            </h2>
            <EditorialBody>Puedes pedirla sin reservar una reunión. Primero reviso tu negocio y después decidimos si tiene sentido trabajar juntos.</EditorialBody>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
            <Button href="/audit" label="Pedir auditoría" />
            <Button href="/planes" label="Ver planes" variant="secondary" />
          </div>
        </div>
      </section>
    </main>
  );
}
