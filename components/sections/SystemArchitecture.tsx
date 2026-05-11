'use client';

import { motion } from 'framer-motion';
import { Lock, Grid3x3, Zap, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';

export function SystemArchitecture() {
  const steps = [
    {
      number: 1,
      title: 'Identity Lock',
      definition: 'Define immutable structural traits',
      icon: Lock,
      details: [
        'Facial features (if avatar)',
        'Brand colors & palette',
        'Light direction & intensity',
        'Material textures',
        'Scale relationships',
      ],
      deliverable: 'Reference image + specification',
    },
    {
      number: 2,
      title: 'System Construction',
      definition: 'Establish rules, variables, and constraints',
      icon: Grid3x3,
      details: [
        '3-5 core variables (lighting, scale, material)',
        'Permutations allowed (lighting profiles: 3)',
        'Constraints (what\'s off-limits)',
        'Quality thresholds',
      ],
      deliverable: 'Rule documentation + decision tree',
    },
    {
      number: 3,
      title: 'Generation at Scale',
      definition: 'Produce unlimited assets from locked system',
      icon: Zap,
      details: [
        '120+ assets generated from same identity',
        '48-72 hour turnaround',
        'Every variation respects system rules',
        'Zero manual retouching',
      ],
      deliverable: 'Complete asset library',
    },
    {
      number: 4,
      title: 'Quality Control',
      definition: 'Validate against system rules + quality standards',
      icon: CheckCircle,
      details: [
        'Identity consistency (still recognizable?)',
        'Anatomical correctness (if avatar)',
        'Light coherence',
        'Integration with environment',
        'Zero AI artifacts',
      ],
      deliverable: 'QC checklist + validated assets',
    },
    {
      number: 5,
      title: 'Documentation Handoff',
      definition: 'Transfer system for infinite future reuse',
      icon: BookOpen,
      details: [
        'Complete system playbook',
        'Locked prompts & seeds',
        'Rules & constraints documented',
        'Variation guide (how to evolve safely)',
        'Video training for your team',
      ],
      deliverable: 'Full system documentation',
    },
  ];

  return (
    <div className="w-full bg-black text-white">
      <section className="py-20 md:py-32 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              How We Build Systems
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              5 steps from identity to infinite scale
            </p>
          </motion.div>

          {/* Steps Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Step Card */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 h-full hover:border-white/30 hover:bg-white/10 transition-all">
                    {/* Number Badge */}
                    <div className="text-5xl font-bold text-magenta/30 mb-4">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-4">
                      <Icon size={32} className="text-magenta" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {step.title}
                    </h3>

                    {/* Definition */}
                    <p className="text-sm italic text-white/60 mb-4 leading-relaxed">
                      {step.definition}
                    </p>

                    {/* Details */}
                    <div className="mb-6 pb-6 border-b border-white/10">
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li
                            key={i}
                            className="text-xs text-white/50 flex gap-2 items-start"
                          >
                            <span className="text-magenta mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverable */}
                    <p className="text-xs font-semibold text-magenta/80">
                      {step.deliverable}
                    </p>
                  </div>

                  {/* Arrow (desktop only, between cards) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="text-magenta/40">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  )}

                  {/* Arrow (mobile/tablet) */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-4 mb-2">
                      <div className="text-magenta/40 rotate-90">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <p className="text-white/60 mb-6">
              Ready to lock your identity and scale?
            </p>
            <a
              href="https://calendly.com/heyde-studio/20min?utm_source=heyde_system_architecture"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-magenta text-white font-bold rounded hover:bg-magenta-dark transition-colors"
            >
              Schedule a Call
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
