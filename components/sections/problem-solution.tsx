'use client';

import { getLineBreaksHTML } from '@/lib/formatters';

interface ProblemSolutionProps {
  heading: string;
  painPoints: Array<{
    title: string;
    description: string;
  }>;
  solution: string;
}

export function ProblemSolution({ heading, painPoints, solution }: ProblemSolutionProps) {
  return (
    <section className="min-h-screen bg-white px-8 py-16 md:px-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{heading}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {painPoints.map((point, i) => (
            <div key={i} className="border-l-4 border-red-500 pl-6">
              <h3 className="text-xl font-bold mb-3">❌ {point.title}</h3>
              <p
                className="text-gray-700 whitespace-pre-line"
                dangerouslySetInnerHTML={getLineBreaksHTML(point.description)}
              />
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded border border-gray-200">
          <p
            className="text-lg text-gray-900 whitespace-pre-line"
            dangerouslySetInnerHTML={getLineBreaksHTML(solution)}
          />
        </div>
      </div>
    </section>
  );
}
