'use client';

interface FinalCTAProps {
  heading: string;
  subheading: string;
  copy: string;
  ctaSchedule: string;
  ctaDemo: string;
}

export function FinalCTA({ heading, subheading, copy, ctaSchedule, ctaDemo }: FinalCTAProps) {
  return (
    <section className="min-h-screen bg-black text-white px-8 py-16 md:px-12 md:py-24 flex items-center">
      <div className="max-w-2xl mx-auto w-full text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
        <p className="text-lg text-white/80 mb-6">{subheading}</p>
        <p className="text-white/70 mb-12 whitespace-pre-wrap">{copy}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-3 bg-magenta text-white font-bold rounded hover:bg-magenta-dark transition-colors"
          >
            {ctaSchedule}
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-white text-white font-bold rounded hover:bg-white/10 transition"
          >
            {ctaDemo}
          </a>
        </div>
      </div>
    </section>
  );
}
