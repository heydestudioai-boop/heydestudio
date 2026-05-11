'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';

interface LeadFormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  website: string;
}

export function LeadCaptureForm() {
  const { content } = useLanguage();
  const copy = content.leadForm;
  const [formData, setFormData] = useState<LeadFormState>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    website: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
        website: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : copy.fallbackError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
          {copy.labels.name} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta"
          placeholder={copy.placeholders.name}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
          {copy.labels.email} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta"
          placeholder={copy.placeholders.email}
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-bold text-gray-900 mb-2">
          {copy.labels.company}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta"
          placeholder={copy.placeholders.company}
        />
      </div>

      {/* Service Interest */}
      <div>
        <label htmlFor="service" className="block text-sm font-bold text-gray-900 mb-2">
          {copy.labels.service}
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta"
        >
          <option value="">{copy.placeholders.service}</option>
          {copy.services.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
          {copy.labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta resize-none"
          placeholder={copy.placeholders.message}
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-bold">✓ {copy.successTitle}</p>
          <p className="text-green-700 text-sm">{copy.successText}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-bold">✗ {copy.errorTitle}</p>
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-magenta text-white font-bold py-3 rounded-lg hover:bg-magenta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? copy.sending : copy.submit}
      </button>

      <p className="text-xs text-gray-500 text-center">
        {copy.privacy}
      </p>
    </form>
  );
}
