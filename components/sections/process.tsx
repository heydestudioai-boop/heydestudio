'use client';

interface ProcessProps {
  heading: string;
  steps: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export function Process({ heading, steps }: ProcessProps) {
  return (
    <section className="min-h-screen bg-black text-white px-8 py-16 md:px-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{heading}</h2>

        <div className="space-y-8 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="border-l-4 border-yellow-400 pl-6 pb-8">
              <div className="text-sm font-bold text-yellow-400 mb-2">{step.number}</div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/70 whitespace-pre-wrap">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
