'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { EditorialBody, EditorialTitle } from '@/components/EditorialText';
import { getLocalizedArticles } from '@/lib/articles';
import { useLanguage } from '@/lib/language';

export function BlogPageContent() {
  const { content, language } = useLanguage();
  const copy = content.blogPage;
  const sortedArticles = getLocalizedArticles(language).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = sortedArticles[0];
  const rest = sortedArticles.slice(1);

  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-10 pt-16 text-white sm:px-8 md:px-12 md:pb-12 md:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
              <EditorialTitle text={copy.heroTitle} />
            </h1>
          </motion.div>
          <EditorialBody dark className="max-w-2xl text-sm md:text-base">
            {copy.heroBody}
          </EditorialBody>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group mb-16 block border-b border-gray-200 pb-16">
              <article className="grid gap-10 md:grid-cols-[0.44fr_0.56fr] md:items-end">
                <div className="flex aspect-[4/3] flex-col justify-between bg-black p-8 text-white">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                    {copy.featuredImage}
                  </span>
                  <span className="max-w-xs text-3xl font-bold leading-tight text-white/84">
                    {language === 'ES' ? 'Sistema antes que output.' : 'Systems before output.'}
                  </span>
                </div>
                <div>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {featured.category.map((cat) => (
                      <span key={cat} className="text-xs font-bold uppercase tracking-[0.16em] text-magenta">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h2 className="mb-5 text-4xl font-bold transition-colors group-hover:text-magenta md:text-5xl">
                    <EditorialTitle text={featured.title} />
                  </h2>
                  <p className="mb-8 text-lg leading-relaxed text-gray-700">{featured.excerpt}</p>
                  <MetaLine article={featured} language={language} readTimeLabel={copy.readTime} />
                </div>
              </article>
            </Link>
          )}

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {rest.map((article, idx) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white"
              >
                <Link href={`/blog/${article.slug}`}>
                  <article className="group flex h-full cursor-pointer flex-col p-8">
                    <div className="mb-8 flex flex-wrap gap-2">
                      {article.category.map((cat) => (
                        <span key={cat} className="text-xs font-bold uppercase tracking-[0.16em] text-magenta">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h2 className="mb-4 text-2xl font-bold transition-colors group-hover:text-magenta">
                      {article.title}
                    </h2>
                    <p className="mb-8 flex-1 leading-relaxed text-gray-700">{article.excerpt}</p>
                    <MetaLine article={article} language={language} readTimeLabel={copy.readTime} />
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-12 text-white sm:px-8 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-12 md:grid-cols-[1fr_0.55fr] md:items-end">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text={copy.finalTitle} />
            </h2>
            <EditorialBody dark>{copy.finalBody}</EditorialBody>
          </motion.div>
          <div className="md:text-right">
            <a
              href="https://calendly.com/heyde-studio/20min?utm_source=heyde_blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-sm bg-magenta px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-magenta-dark sm:w-auto"
            >
              {copy.finalCta}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetaLine({
  article,
  language,
  readTimeLabel,
}: {
  article: ReturnType<typeof getLocalizedArticles>[number];
  language: 'EN' | 'ES';
  readTimeLabel: string;
}) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.14em] text-gray-500">
      <span>{article.author}</span>
      <span>
        {new Date(article.date).toLocaleDateString(language === 'ES' ? 'es-ES' : 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </span>
      <span>
        {article.readTime} {readTimeLabel}
      </span>
    </div>
  );
}
