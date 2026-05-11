'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';

export function SystemDocumentationTemplatePageContent() {
  const { content, language } = useLanguage();
  const page = content.templatePage;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company: 'Template Requested',
          service: 'System Documentation',
          website,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setWebsite('');
        window.gtag?.('event', 'lead_system_audit_requested', {
          event_category: 'engagement',
          event_label: 'system_template_download',
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error || page.fallbackError);
      }
    } catch (err) {
      setError(page.networkError);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      <section className="bg-black px-6 pb-10 pt-16 text-white sm:px-8 md:px-12 md:pb-12 md:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            <EditorialTitle text={page.heroTitle} />
          </h1>
          <EditorialBody dark className="max-w-2xl text-sm md:text-base">
            {page.heroBody}
          </EditorialBody>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 max-w-3xl text-3xl font-bold md:text-5xl">
            <EditorialTitle text={page.insideTitle} />
          </h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
            {page.inside.map((item) => (
              <div key={item.title} className="bg-white p-8">
                <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                <p className="text-lg leading-relaxed text-gray-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2">
          <ListBlock title={page.whyTitle} items={page.why} />
          <ListBlock title={page.fitTitle} items={page.fit} />
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.45fr_0.55fr]">
          <div>
            <EditorialKicker>{language === 'ES' ? 'Descarga' : 'Download'}</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">{page.formTitle}</h2>
            <EditorialBody>{page.formBody}</EditorialBody>
          </div>

          {success ? (
            <div className="border-2 border-green-500 bg-green-50 p-8 text-center">
              <p className="mb-2 text-lg font-bold text-green-900">{page.successTitle}</p>
              <p className="text-green-700">{page.successBody}</p>
              <p className="mt-4 text-sm text-green-600">{page.successHint}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 border border-gray-200 bg-white p-8">
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {error && (
                <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-900">
                  {page.nameLabel} *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none focus:ring-1 focus:ring-magenta"
                  placeholder={page.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-900">
                  {page.emailLabel} *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none focus:ring-1 focus:ring-magenta"
                  placeholder={page.emailPlaceholder}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-sm bg-magenta px-6 py-3 font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-magenta-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? page.sending : page.submit}
              </button>
              <p className="text-center text-xs text-gray-500">{page.privacy}</p>
            </form>
          )}
        </div>
      </section>

      <section className="bg-black px-6 py-12 text-white sm:px-8 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-12 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              <EditorialTitle text={page.finalTitle} />
            </h2>
            <EditorialBody dark>{page.finalBody}</EditorialBody>
          </div>
          <div className="md:text-right">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-sm bg-magenta px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-magenta-dark sm:w-auto"
            >
              {page.finalCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ListBlock({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="bg-white p-8">
      <h3 className="mb-8 text-2xl font-bold">{title}</h3>
      <ul className="space-y-px bg-gray-200">
        {items.map((item) => (
          <li key={item} className="bg-white py-3 text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
