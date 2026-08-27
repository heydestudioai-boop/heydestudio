'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import {
  EditorialBody,
  EditorialKicker,
  EditorialTitle,
} from '@/components/EditorialText';
import { trackBrandInquiryEvent } from '@/lib/brandInquiryAnalytics';

const projectTypes = [
  ['campaign', 'Campaign or launch'],
  ['real_production', 'Photography / video production'],
  ['social_content', 'Social / digital content'],
  ['hybrid_production', 'Hybrid production'],
  ['generative_production', 'Generative production'],
  ['visual_development', 'Visual development'],
  ['other', 'Other / not sure yet'],
] as const;

const emptyForm = {
  name: '',
  company: '',
  email: '',
  presence: '',
  projectType: '',
  brief: '',
  privacyConsent: false,
  fax: '',
};

export function BrandInquiryPageContent() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailDelayed, setEmailDelayed] = useState(false);
  const [error, setError] = useState('');
  const started = useRef(false);

  useEffect(() => {
    trackBrandInquiryEvent('brand_inquiry_view');
  }, []);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackBrandInquiryEvent('brand_inquiry_started');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        error?: string;
        emailStatus?: string;
      };
      if (!response.ok) {
        setError(
          result.error ||
            'We could not register your inquiry. Please try again later.'
        );
        return;
      }

      setEmailDelayed(result.emailStatus === 'delayed');
      setSubmitted(true);
      trackBrandInquiryEvent('brand_inquiry_submitted');
      trackBrandInquiryEvent('brand_inquiry_confirmation_view');
    } catch {
      setError('We could not register your inquiry. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSubmitted(false);
    setEmailDelayed(false);
    setError('');
    started.current = false;
  };

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-black">
      <section className="bg-black px-6 pb-14 pt-16 text-white sm:px-8 md:px-12 md:pb-20 md:pt-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <EditorialKicker>Brand inquiry</EditorialKicker>
            <h1 className="mb-7 max-w-5xl text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
              <EditorialTitle text="Tell us what you need to make." />
            </h1>
            <EditorialBody dark className="max-w-2xl text-base md:text-lg">
              Share the project, the context and the production challenge. HEYDE
              will review the brief and respond with a considered next step.
            </EditorialBody>
            <div className="mt-9">
              <Button href="#project-inquiry" label="Start the project brief" />
            </div>
          </div>
          <div className="border-t border-white/18 pt-6 text-sm leading-relaxed text-white/64">
            <p className="mb-3 font-bold text-white">Looking for local business support?</p>
            <p className="mb-5">
              The local path starts with a free audit in Spanish.
            </p>
            <Link href="/audit" className="font-bold text-magenta transition hover:text-white">
              Go to the local business audit →
            </Link>
          </div>
        </div>
      </section>

      <section id="project-inquiry" className="scroll-mt-24 px-6 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.36fr_0.64fr]">
          <aside>
            <EditorialKicker>Project context</EditorialKicker>
            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
              A short brief is enough to start.
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-gray-700">
              Photography, video, campaigns, social content, hybrid production
              and generative work are selected according to the objective — not
              treated as a fixed package.
            </p>
            <div className="border-l-2 border-magenta pl-5 text-sm leading-relaxed text-gray-600">
              Project pricing is quoted according to scope. No meeting is required
              to submit this inquiry.
            </div>
          </aside>

          <div>
            {submitted ? (
              <div
                className="border border-gray-200 bg-gray-50 p-8 md:p-12"
                role="status"
                aria-live="polite"
              >
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                  Inquiry received
                </p>
                <h2 className="mb-5 text-3xl font-bold md:text-4xl">
                  Thank you. Your project is safely recorded.
                </h2>
                <p className="mb-8 max-w-xl leading-relaxed text-gray-700">
                  {emailDelayed
                    ? 'We could not send the confirmation email right now, but the inquiry is recorded and will not be duplicated.'
                    : 'A short confirmation has been sent. HEYDE will review the context before suggesting a next step.'}
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-sm border border-black px-5 py-3 text-sm font-bold transition hover:bg-black hover:text-white"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                onFocusCapture={markStarted}
                className="space-y-6 border border-gray-200 bg-white p-6 sm:p-8 md:p-10"
              >
                <input
                  type="text"
                  name="fax"
                  value={form.fax}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, fax: event.target.value }))
                  }
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {error ? (
                  <div
                    className="border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                    role="alert"
                  >
                    {error}
                  </div>
                ) : null}

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={(value) =>
                      setForm((current) => ({ ...current, name: value }))
                    }
                    autoComplete="name"
                    required
                  />
                  <Field
                    label="Brand / company"
                    name="company"
                    value={form.company}
                    onChange={(value) =>
                      setForm((current) => ({ ...current, company: value }))
                    }
                    autoComplete="organization"
                    required
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(value) =>
                      setForm((current) => ({ ...current, email: value }))
                    }
                    autoComplete="email"
                    required
                  />
                  <Field
                    label="Website / social (optional)"
                    name="presence"
                    value={form.presence}
                    onChange={(value) =>
                      setForm((current) => ({ ...current, presence: value }))
                    }
                    placeholder="brand.com or @brand"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="mb-2 block text-sm font-bold">
                    Project type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        projectType: event.target.value,
                      }))
                    }
                    required
                    className="w-full rounded-sm border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none"
                  >
                    <option value="">Select the closest fit</option>
                    {projectTypes.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="brief" className="mb-2 block text-sm font-bold">
                    Brief / what do you need?
                  </label>
                  <textarea
                    id="brief"
                    name="brief"
                    value={form.brief}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, brief: event.target.value }))
                    }
                    rows={6}
                    required
                    className="w-full rounded-sm border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none"
                    placeholder="What is the project, what needs to be produced, and where will it be used?"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={form.privacyConsent}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        privacyConsent: event.target.checked,
                      }))
                    }
                    required
                    className="mt-1 h-4 w-4 accent-[#D946A6]"
                  />
                  <span>
                    I request that HEYDE Studio use these details to review and
                    respond to this inquiry. I have read the{' '}
                    <Link href="/en/privacy" className="font-bold underline">
                      privacy policy
                    </Link>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-sm bg-magenta px-6 py-3.5 font-bold text-white transition hover:bg-magenta-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Sending…' : 'Tell us about your project'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-bold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-sm border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none"
      />
    </div>
  );
}
