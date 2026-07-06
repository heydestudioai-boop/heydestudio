import Image from 'next/image';
import { Button } from '@/components/Button';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';

type VerticalPageProps = {
  sector: string;
  title: string;
  pain: string;
  packName: string;
  price: string;
  description: string;
  image: string;
  area: string;
};

export function LocalVerticalPage({
  sector,
  title,
  pain,
  packName,
  price,
  description,
  image,
  area,
}: VerticalPageProps) {
  const quickFacts = [
    ['Entrega', 'Foto, vídeo y piezas listas'],
    ['Precio', 'Cerrado antes de empezar'],
    ['Uso', 'Redes, web y Google Business'],
  ];

  return (
    <main className="bg-white">
      <section className="grid min-h-[calc(100vh-4rem)] bg-black text-white md:grid-cols-[0.52fr_0.48fr]">
        <div className="flex items-end px-6 py-14 sm:px-8 md:px-12 md:py-24">
          <div>
            <EditorialKicker>{sector}</EditorialKicker>
            <h1 className="mb-7 max-w-4xl text-4xl font-bold leading-none md:text-6xl">
              <EditorialTitle text={title} />
            </h1>
            <p className="max-w-2xl text-lg leading-[1.65] text-white/74">{pain}</p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-white/14 bg-white/14 sm:grid-cols-3">
              {quickFacts.map(([label, value]) => (
                <div key={label} className="bg-black/70 p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-white/42">{label}</p>
                  <p className="text-sm font-bold leading-relaxed text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href="/audit" label="Pedir auditoría" />
              <Button href="/planes" label="Ver planes" variant="secondary" />
            </div>
          </div>
        </div>
        <div className="relative min-h-[22rem] md:min-h-full">
          <Image
            src={image}
            alt={sector}
            fill
            priority
            sizes="(min-width: 768px) 48vw, 100vw"
            className="object-cover opacity-86"
          />
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.7fr_1fr] md:items-start">
          <div>
            <EditorialKicker>Pack cerrado</EditorialKicker>
            <h2 className="mb-5 text-3xl font-bold leading-[1.05] md:text-5xl">{packName}</h2>
            <p className="text-4xl font-bold text-magenta">{price}</p>
          </div>
          <div>
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-start">
              <p className="text-lg leading-[1.65] text-gray-700">{description}</p>
              <div className="rounded-sm border border-gray-200 bg-gray-50 p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-magenta">Incluye</p>
                <ul className="space-y-3 text-sm leading-relaxed text-gray-700">
                  <li>+ Dirección visual antes de producir</li>
                  <li>+ Selección y edición de piezas finales</li>
                  <li>+ Formatos pensados para publicar y vender</li>
                </ul>
              </div>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-3">
              {[
                ['01', 'Auditoría gratuita', 'Revisamos tu presencia actual y la oportunidad visual.'],
                ['02', 'Propuesta en 48 h', 'Precio, alcance y formato de entrega claros desde el inicio.'],
                ['03', 'Primera sesión', 'Producción real y piezas listas para publicar.'],
              ].map(([number, step, body]) => (
                <div key={number} className="bg-white p-6">
                  <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-magenta">{number}</p>
                  <h3 className="mb-3 text-lg font-bold">{step}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <EditorialKicker>Zona</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold leading-[1.05] md:text-5xl">{area}</h2>
            <EditorialBody>
              Si no tienes claro qué necesitas, empezamos por la auditoría gratuita y decidimos si conviene un pack, una sesión de entrada o un plan mensual.
            </EditorialBody>
          </div>
          <div className="md:text-right">
            <Button href="https://wa.me/34671141135" label="Escribir por WhatsApp" target="_blank" rel="noreferrer" />
          </div>
        </div>
      </section>
    </main>
  );
}
