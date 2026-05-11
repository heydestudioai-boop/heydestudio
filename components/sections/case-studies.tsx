'use client';

interface CaseStudy {
  name: string;
  description: string;
  context: string;
  solution: string;
  deliverables: string[];
  metrics: Array<{
    label: string;
    value: string;
  }>;
}

interface CaseStudiesProps {
  heading: string;
  cases: CaseStudy[];
  cta: string;
}

export function CaseStudies({ heading, cases, cta }: CaseStudiesProps) {
  return (
    <section className="min-h-screen bg-white px-8 py-16 md:px-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{heading}</h2>

        <div className="space-y-24">
          {cases.map((caseStudy, idx) => (
            <div key={idx} className="border-t border-gray-200 pt-16 first:border-t-0 first:pt-0">
              <h3 className="text-3xl font-bold mb-4">{caseStudy.name}</h3>
              <p className="text-lg text-gray-700 mb-12">{caseStudy.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">Context</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{caseStudy.context}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">Solution</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{caseStudy.solution}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded mb-8">
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Deliverables</h4>
                <ul className="space-y-2">
                  {caseStudy.deliverables.map((item, j) => (
                    <li key={j} className="text-sm text-gray-700">✓ {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Results</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {caseStudy.metrics.map((metric, j) => (
                    <div key={j}>
                      <div className="text-2xl font-bold text-black mb-1">{metric.value}</div>
                      <p className="text-xs text-gray-600">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="#contact" className="text-sm font-medium underline hover:opacity-70">
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}
