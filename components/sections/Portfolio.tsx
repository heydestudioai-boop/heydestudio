'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { content } from '@/lib/i18n';

interface CaseStudyPreview {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
}

export function Portfolio() {
  const lang = 'EN';
  const c = content[lang as keyof typeof content];
  const cases = c.caseStudies.cases;

  return (
    <section id="portfolio" className="py-20 md:py-32 px-8 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Featured Case Studies
          </h2>
          <p className="text-xl text-black/60 max-w-2xl">
            How we have helped premium brands build visual systems that scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((caseStudy: CaseStudyPreview, index: number) => (
            <Link
              key={caseStudy.slug}
              href={`/case-studies/${caseStudy.slug}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer h-full"
              >
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-6 h-64 flex items-center justify-center border-2 border-gray-300 group-hover:border-magenta transition-all">
                  <p className="text-gray-500 text-center px-4 text-sm">
                    [Case Study Image: {caseStudy.name}]
                  </p>
                </div>
                
                <div>
                  <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
                    {caseStudy.subtitle}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-magenta transition-colors">
                    {caseStudy.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {caseStudy.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-magenta font-bold group-hover:gap-3 transition-all">
                    <span>View Case Study</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <a
            href="https://calendly.com/heyde-studio/20min?utm_source=heyde_portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-magenta text-white font-bold rounded hover:bg-magenta-dark transition-colors"
          >
            Ready to build your system?
          </a>
        </motion.div>
      </div>
    </section>
  );
}
