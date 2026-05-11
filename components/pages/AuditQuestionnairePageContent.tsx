'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/language';

export function AuditQuestionnairePageContent() {
  const { content } = useLanguage();
  const page = content.questionnairePage;
  const [formData, setFormData] = useState({
    brandName: '',
    monthlyAssets: '',
    currentSystem: '',
    biggestPain: '',
    productionTimeline: '',
    email: '',
    website: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/audit/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || page.fallbackError);
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : page.fallbackError);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-8 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-magenta" />
          <h1 className="mb-4 text-4xl font-bold">{page.successTitle}</h1>
          <p className="mb-8 text-xl text-gray-700">{page.successBody}</p>
          <div className="mb-8 rounded-lg bg-gray-50 p-6 text-left">
            <h3 className="mb-4 text-lg font-bold">{page.nextTitle}</h3>
            <ol className="space-y-3 text-gray-700">
              {page.next.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex-shrink-0 font-bold text-magenta">{index + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <Link href="/" className="inline-block rounded bg-magenta px-8 py-3 font-bold text-white transition-colors hover:bg-magenta-dark">
            {page.backHome}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="bg-black px-8 py-16 text-white md:px-12 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">{page.heroTitle}</h1>
          <p className="text-xl text-white/80">{page.heroBody}</p>
        </div>
      </section>

      <section className="px-8 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <TextField
              id="brandName"
              label={`${page.labels.brandName} *`}
              value={formData.brandName}
              onChange={handleInputChange}
              placeholder={page.placeholders.brandName}
              required
            />
            <SelectField
              id="monthlyAssets"
              label={`${page.labels.monthlyAssets} *`}
              value={formData.monthlyAssets}
              onChange={handleInputChange}
              placeholder={page.select}
              options={page.monthlyOptions}
            />
            <SelectField
              id="currentSystem"
              label={`${page.labels.currentSystem} *`}
              value={formData.currentSystem}
              onChange={handleInputChange}
              placeholder={page.select}
              options={page.systemOptions}
            />
            <div>
              <label htmlFor="biggestPain" className="mb-2 block font-bold">
                {page.labels.biggestPain} *
              </label>
              <textarea
                id="biggestPain"
                name="biggestPain"
                value={formData.biggestPain}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder={page.placeholders.biggestPain}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none"
              />
            </div>
            <SelectField
              id="productionTimeline"
              label={`${page.labels.productionTimeline} *`}
              value={formData.productionTimeline}
              onChange={handleInputChange}
              placeholder={page.select}
              options={page.timelineOptions}
            />
            <TextField
              id="email"
              type="email"
              label={`${page.labels.email} *`}
              value={formData.email}
              onChange={handleInputChange}
              placeholder={page.placeholders.email}
              required
            />

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded bg-magenta px-8 py-3 font-bold text-white transition-colors hover:bg-magenta-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? page.submitting : page.submit}
            </button>
            <p className="text-center text-sm text-gray-600">{page.helpText}</p>
          </form>
        </div>
      </section>
    </main>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-bold">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none"
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-bold">{label}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-magenta focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map(([optionValue, labelText]) => (
          <option key={optionValue} value={optionValue}>
            {labelText}
          </option>
        ))}
      </select>
    </div>
  );
}
