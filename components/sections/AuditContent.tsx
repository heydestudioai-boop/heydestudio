'use client';

import { motion } from 'framer-motion';

interface AuditContentProps {
  stepAnimationDelay?: number;
}

export function AuditContent({ stepAnimationDelay = 0.1 }: AuditContentProps) {
  const steps = [
    {
      number: 1,
      title: 'Schedule',
      description: 'Pick a time that works for you. 20-minute calendar slot.',
    },
    {
      number: 2,
      title: 'Pre-Audit Form',
      description: 'Tell us about your brand, current visuals, production challenges.',
    },
    {
      number: 3,
      title: 'Audit Call',
      description: 'Live conversation. We show you what a visual system could solve.',
    },
    {
      number: 4,
      title: 'Follow-Up Email',
      description: 'Custom recommendation + next steps (proposal, templates, resources).',
    },
    {
      number: 5,
      title: 'Your Decision',
      description: 'No pressure. You decide if building a system is right for your brand.',
    },
  ];

  const faqs = [
    {
      q: 'Is this really free?',
      a: 'Yes. No credit card, no follow-up sales call script. We show you what\'s possible, you decide.',
    },
    {
      q: 'What if I\'m not ready to commit?',
      a: 'Perfect. Audit is for exploration. Many discover they need a system after the call.',
    },
    {
      q: 'How long does it take?',
      a: '20 minutes scheduled time. We\'re surgical about agenda — you leave knowing exactly what you need.',
    },
    {
      q: 'What if I don\'t work with you?',
      a: 'No problem. Our recommendation is useful no matter who builds your system.',
    },
    {
      q: 'Do you work with small brands?',
      a: 'We focus on premium brands (50+ monthly assets, €5k+). If you\'re smaller, we\'ll recommend resources.',
    },
    {
      q: 'How far in advance should I schedule?',
      a: 'Next available slot is usually 1-2 weeks out. Schedule now, we\'ll lock it in.',
    },
  ];

  return (
    <>
      {/* The Process */}
      <section className="px-8 md:px-12 py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            The Process
          </motion.h2>

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * stepAnimationDelay }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-magenta text-white flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-8 md:px-12 py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Questions?
          </motion.h2>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <h3 className="font-bold text-lg mb-3 text-black">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
