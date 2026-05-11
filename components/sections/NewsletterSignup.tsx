'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return;
    }

    // Simulate subscription
    setSubmitted(true);
    setEmail('');

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-lg p-8 sticky top-20"
    >
      <div className="flex items-center gap-3 mb-4">
        <Mail size={24} className="text-magenta" />
        <h3 className="text-xl font-bold">Subscribe</h3>
      </div>

      <p className="text-white/60 mb-6 text-sm">
        Get insights on visual systems, AI strategy, and brand infrastructure delivered to your inbox.
      </p>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-500/10 border border-green-500/30 rounded px-4 py-3"
        >
          <p className="text-green-400 text-sm font-medium">
            ✓ Check your email for confirmation
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded text-white placeholder-white/40 focus:outline-none focus:border-magenta focus:bg-white/10 transition-all"
            required
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-magenta text-white font-bold rounded hover:bg-magenta-dark transition-colors"
          >
            Subscribe
          </button>
        </form>
      )}

      <p className="text-white/30 text-xs mt-4">
        No spam. Unsubscribe anytime.
      </p>
    </motion.aside>
  );
}
