'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { articles, getLocalizedArticle, getLocalizedArticles } from '@/lib/articles';
import { useLanguage } from '@/lib/language';
import { CommentSection } from '@/components/sections/CommentSection';
import { NewsletterSignup } from '@/components/sections/NewsletterSignup';

function normalizeHeading(text: string) {
  if (text !== text.toUpperCase()) {
    return text;
  }

  const keepUppercase = new Set(['AI', 'ROI', 'QC', 'UGC']);
  return text
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      const cleaned = word.replace(/[^a-z0-9]/gi, '').toUpperCase();
      if (keepUppercase.has(cleaned)) {
        return word.toUpperCase();
      }

      return index === 0 ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : word;
    })
    .join(' ');
}

function renderArticleContent(content: string) {
  const blocks = content.trim().split(/\n{2,}/);

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    const key = `${index}-${trimmed.slice(0, 24)}`;

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={key} className="mt-16 border-t border-gray-200 pt-12 text-3xl font-bold leading-tight text-black md:text-4xl">
          {normalizeHeading(trimmed.replace(/^##\s+/, ''))}
        </h2>
      );
    }

    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={key} className="mt-10 text-2xl font-bold leading-tight text-black">
          {normalizeHeading(trimmed.replace(/^###\s+/, ''))}
        </h3>
      );
    }

    const lines = trimmed.split('\n').map((line) => line.trim()).filter(Boolean);
    const isList = lines.length > 1 && lines.every((line) => /^[-•]\s+/.test(line) || /^\d+\.\s+/.test(line));

    if (isList) {
      return (
        <ul key={key} className="my-7 space-y-3 border-l-2 border-magenta/35 pl-6 text-lg leading-relaxed text-gray-700">
          {lines.map((line) => (
            <li key={line}>{line.replace(/^[-•]\s+/, '').replace(/^\d+\.\s+/, '')}</li>
          ))}
        </ul>
      );
    }

    if (lines.length > 1) {
      return (
        <div key={key} className="my-7 space-y-3 text-lg leading-[1.8] text-gray-700">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      );
    }

    return (
      <p key={key} className="my-7 text-lg leading-[1.8] text-gray-700">
        {trimmed}
      </p>
    );
  });
}

export function ArticlePageContent({ slug }: { slug: string }) {
  const { content, language } = useLanguage();
  const copy = content.blogPage;
  const baseArticle = articles.find((a) => a.slug === slug);
  const article = baseArticle ? getLocalizedArticle(baseArticle, language) : undefined;

  if (!article) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{copy.articleNotFound}</h1>
          <p className="text-gray-600 mb-8">{copy.articleNotFoundBody}</p>
          <Link href="/blog" className="text-magenta font-bold hover:text-magenta-dark">
            {copy.backToBlog}
          </Link>
        </div>
      </main>
    );
  }

  const relatedArticles = getLocalizedArticles(language).filter(
    (a) =>
      a.slug !== slug &&
      a.category.some((cat) => article.category.includes(cat))
  ).slice(0, 2);
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(language === 'ES' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <main className="bg-white">
      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {article.category.map((cat) => (
                <span
                  key={cat}
                  className="text-xs font-bold uppercase tracking-[0.16em] text-magenta"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-none md:text-6xl">
              {article.title}
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl">{article.subtitle}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.14em] text-white/48">
              <span>{article.author}</span>
              <span>{formatDate(article.date)}</span>
              <span>{article.readTime} {copy.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-8 md:px-12">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex h-80 flex-col justify-between bg-black p-8 text-white md:h-96"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-magenta">
              {language === 'ES' ? 'Nota editorial' : 'Editorial note'}
            </p>
            <p className="max-w-lg text-3xl font-bold leading-tight text-white/84 md:text-5xl">
              {article.title}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <article className="text-black">
              {renderArticleContent(article.content)}
            </article>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-20 border-t border-gray-200 pt-12"
            >
              <div className="flex gap-6">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold uppercase tracking-[0.12em] text-white">
                  OH
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">{article.author}</h3>
                  <p className="text-gray-600">{copy.authorBio}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-20 border-t border-gray-200 pt-12"
            >
              <h2 className="mb-8 text-3xl font-bold">{copy.commentsTitle}</h2>
              <CommentSection />
            </motion.div>
          </motion.div>

          <aside>
            <NewsletterSignup />

            {relatedArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-8 border border-gray-200 bg-gray-50 p-8"
              >
                <h3 className="mb-6 text-lg font-bold">{copy.relatedTitle}</h3>
                <div className="space-y-6">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="block group"
                    >
                      <p className="text-sm text-magenta font-bold group-hover:text-magenta-dark transition-colors">
                        {rel.category[0]}
                      </p>
                      <h4 className="font-bold text-black group-hover:text-magenta transition-colors mt-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-2">{formatDate(rel.date)}</p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </aside>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-8 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">{copy.finalTitle}</h2>
            <p className="mb-8 text-white/60">{copy.finalBody}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/heyde-studio/20min?utm_source=heyde_article"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-sm bg-magenta px-8 py-3 font-bold text-white transition-colors hover:bg-magenta-dark"
              >
                {copy.finalCta}
              </a>
              <Link
                href="/services#process"
                className="inline-block rounded-sm border border-magenta px-8 py-3 font-bold text-white transition-colors hover:bg-magenta/10"
              >
                {copy.learnHow}
              </Link>
              <Link
                href="/blog"
                className="inline-block rounded-sm border border-white/30 px-8 py-3 font-bold text-white transition-colors hover:border-white/60"
              >
                {copy.backToBlog}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.subtitle,
            image: article.featured_image,
            datePublished: article.date,
            author: {
              '@type': 'Person',
              name: article.author,
            },
          }),
        }}
      />
    </main>
  );
}
