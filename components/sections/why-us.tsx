'use client';

interface Pillar {
  number: string;
  title: string;
  description: string;
}

interface WhyUsProps {
  heading: string;
  subheading: string;
  pillars: Pillar[];
}

export function WhyUs({ heading, subheading, pillars }: WhyUsProps) {
  return (
    <section className="min-h-screen bg-white px-8 py-16 md:px-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">{heading}</h2>
        <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">{subheading}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {pillars.map((pillar, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="text-5xl font-bold text-gray-200">{pillar.number}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
