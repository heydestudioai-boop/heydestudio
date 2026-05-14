'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { NewsletterSubscribeForm } from '@/components/forms/NewsletterSubscribeForm';

export function NewsletterSignup() {
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

      <NewsletterSubscribeForm
        placeholder="your@email.com"
        submitLabel="Subscribe"
        successMessage="Subscribed. Welcome in."
        source="article_newsletter"
        tone="panel"
      />

      <p className="text-white/30 text-xs mt-4">
        No spam. Unsubscribe anytime.
      </p>
    </motion.aside>
  );
}
