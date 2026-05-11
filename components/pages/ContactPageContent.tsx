'use client';

import { useState } from 'react';
import { EditorialBody, EditorialKicker, EditorialTitle } from '@/components/EditorialText';
import { useLanguage } from '@/lib/language';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ContactPageContent() {
  const { content, language } = useLanguage();
  const page = content.contactPage;
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', company: '', service: '', message: '', website: '' });
        window.gtag?.('event', 'lead_contact_form_submitted', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: 1,
        });
      } else {
        setError(data.error || page.fallbackError);
      }
    } catch (err) {
      setError(page.fallbackError);
      console.error('Contact form error:', err);
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
          <div className="mb-14 grid gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 md:grid-cols-2 lg:grid-cols-4">
            {page.options.map((item) => (
              <a
                key={item.title}
                href={item.link}
                className="bg-white p-8 transition-colors hover:bg-gray-50"
              >
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </a>
            ))}
          </div>

          <div className="border-l-4 border-magenta bg-gray-50 p-8">
            <p className="text-lg text-gray-900">
              <span className="font-bold">{page.guaranteeLabel}</span> {page.guaranteeText}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.45fr_0.55fr]">
          <div>
            <EditorialKicker>{language === 'ES' ? 'Intake' : 'Intake'}</EditorialKicker>
            <h2 className="text-3xl font-bold md:text-5xl">{page.formTitle}</h2>
          </div>

          <div>
            {submitted ? (
              <div className="border-2 border-green-500 bg-green-50 p-8 text-center">
                <p className="mb-2 text-lg font-bold text-green-900">{page.successTitle}</p>
                <p className="mb-4 text-green-700">{page.successText}</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="rounded-sm border-2 border-green-500 px-6 py-2 font-bold text-green-700 hover:bg-green-50"
                >
                  {page.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 border border-gray-200 bg-white p-8">
                <input
                  type="text"
                  name="website"
                  value={formState.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {error && (
                  <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                  </div>
                )}

                <Field
                  label={page.labels.name}
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder={page.placeholders.name}
                  required
                />
                <Field
                  label={page.labels.email}
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder={page.placeholders.email}
                  required
                />
                <Field
                  label={page.labels.company}
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  placeholder={page.placeholders.company}
                />

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">
                    {page.labels.service}
                  </label>
                  <select
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none"
                  >
                    <option value="">{page.placeholders.service}</option>
                    {page.serviceOptions.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-900">
                    {page.labels.message}
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-sm border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none"
                    placeholder={page.placeholders.message}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-sm bg-magenta px-6 py-3 font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-magenta-dark disabled:opacity-50"
                >
                  {loading ? page.sending : page.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold md:text-5xl">{page.calendlyTitle}</h2>
          <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
            <iframe
              src="https://calendly.com/heyde-studio/20min?primary_color=d946a6&text_color=000000&background_color=ffffff"
              width="100%"
              height={700}
              frameBorder={0}
              title="Schedule a call with HEYDE Studio"
            />
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-12 text-white sm:px-8 md:px-12 md:py-16">
        <div className="mx-auto max-w-7xl border-b border-white/10 pb-12">
          <h2 className="mb-6 max-w-4xl text-4xl font-bold md:text-6xl">
            <EditorialTitle text={page.finalTitle} />
          </h2>
          <EditorialBody dark>{page.finalBody}</EditorialBody>
        </div>
      </section>
    </main>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-900">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-sm border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
