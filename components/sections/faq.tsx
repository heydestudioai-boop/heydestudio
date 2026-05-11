'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqs = [
    {
      question: 'Do the images look like AI?',
      answer: `No. Our images look like professional photography. The difference: we train the eye, not generate randomly.

Every output:
• Maintains realistic proportions and anatomy
• Respects physics (shadows, light, occlusion)
• Avoids AI tells (too-perfect skin, weird hands, uncanny valley)
• Passes the 'could this be real photography?' test

How? Art direction. System constraints. Quality control. Not AI magic—human craft applied to AI tools.`,
    },
    {
      question: 'What if I want changes?',
      answer: `Included in every project:

Line 01 (Identity): 1 round of revisions
Line 02 (Campaign): 1 round of revisions
Line 03 (Infrastructure): 2 rounds during build phase

What counts as revision:
✓ Adjust lighting direction
✓ Change vestuario
✓ Modify background
✓ Shift color palette

What requires new project:
✗ Different identity (avatar change)
✗ New system (different rules)
✗ Major scope expansion (double the assets)

After revisions: documented system stays yours. Unlimited future use.`,
    },
    {
      question: 'What makes HEYDE different from other AI generators?',
      answer: `Three core differences:

1. SYSTEM, NOT IMAGES
Most agencies: 'We'll make 50 beautiful images for you.'
Us: 'We'll build a system that generates 50 consistent images forever.'
Your investment: locked identity + documented rules.
Your outcome: reusable infrastructure.

2. CRAFT GOVERNS
We're not 'faster Midjourney.' We're audiovisual professionals who use AI as tool.
15 years in creative direction, photography, color grading.
Not just prompt engineering.
Every output: art-directed, not algorithm-lucky.

3. INFRASTRUCTURE FOR SCALE
Other agencies: deliver and disappear.
Us: transfer system so you can scale forever.
You get: playbook, documentation, team training.
You own: the system, not dependent on us.`,
    },
    {
      question: 'Can I use the images in paid ads?',
      answer: `Yes. Full commercial rights included.

You can use for:
✓ Paid ads (Facebook, Instagram, Google, TikTok, etc.)
✓ E-commerce (product pages, category, checkout)
✓ Email marketing
✓ Social media (organic + paid)
✓ Website content
✓ Print (if output quality allows)
✓ Merchandise
✓ Any commercial purpose

Restrictions:
✗ Can't resell the images as standalone products
✗ Can't claim you created the photography
✗ Can't use for competing service (you can't become 'an AI studio')

Rights transfer: All deliverables are yours. Fully licensed, fully yours.`,
    },
    {
      question: "What's your timeline?",
      answer: `Depends on the line:

Line 01 (Digital Identity System):
• 5 business days from final brief
• Includes: avatar + 40 documented variants + training

Line 02 (AI Campaign System):
• 5 business days from concepto signed
• Includes: 50-80 assets + documentation + 1 revision round

Line 03 (Branded Infrastructure):
• 3-4 weeks from audit completion
• Includes: custom workflow build + team training + optimization

What affects timeline:
✓ Faster: Clear brief, quick feedback, minimal revisions
✓ Slower: Vague brief, slow approval cycles, many revision rounds

Standard: 5-10 days end-to-end for campaigns.
Luxury/complex: 2-3 weeks for full brand systems.`,
    },
    {
      question: 'How do you work with my team?',
      answer: `Process is consultivo and collaborative:

Phase 1: DISCOVERY (1-2 days)
• Understanding your brand, visual goals, constraints
• Audit of your current assets and aesthetics
• Define success metrics

Phase 2: CONCEPT (2-3 days)
• Propose system architecture
• Show 2-3 direction options
• Get alignment before production

Phase 3: PRODUCTION (3-5 days)
• Build system and lock identity
• Generate assets batch by batch
• Quality control iterations

Phase 4: DELIVERY & TRAINING (1-2 days)
• Deliver all assets + documentation
• Walkthrough session (how to use, evolve, iterate)
• Handoff complete

Communication: Slack or email, daily updates. We're accessible.`,
    },
    {
      question: "What's your process for keeping consistency?",
      answer: `Identity lock + documentation + quality control.

Step 1: IDENTITY LOCK
Before generating anything, we define immutable traits:
• Avatar face (if human)
• Brand colors
• Light direction
• Material textures
• Scale relationships

These never change. Everything traces back.

Step 2: RULES DOCUMENTATION
• 3-5 core variables (lighting, scale, material)
• Permutations allowed (e.g., 3 lighting profiles)
• Constraints (what's off-limits)
• Quality thresholds

Every asset generated respects these rules.

Step 3: QUALITY CONTROL
Every output validated against:
• Does identity remain consistent?
• Anatomically correct?
• Light coherent?
• Zero AI artifacts?

If fails: rejected, regenerated.

Result: 120 assets, all from same system, all consistent.`,
    },
    {
      question: 'Can I scale this myself after you deliver?',
      answer: `Yes. That's the whole point.

We deliver:
✓ Complete system documentation
✓ Locked prompts (copy-paste ready)
✓ Rules + constraints (clear decision tree)
✓ Video training (how to use)
✓ Templates (for future projects)

You can:
✓ Regenerate same identity with new contexts
✓ Evolve color palette (season 2, new collection)
✓ Scale to new products while keeping brand consistent
✓ Train your team to iterate independently

What you can't do (without us):
✗ Completely redesign the system
✗ Shift to different identity
✗ Break system constraints (that defeats the purpose)

Ideal: You run the system 90%. We support + optimize monthly.`,
    },
    {
      question: "What if the images don't match my vision?",
      answer: `We have 1 round of revisions (Line 01/02) to get it right.

Common adjustments (fast):
• Shift lighting direction
• Change clothing/styling
• Modify background
• Adjust color

If after 1 round it's still not aligned:
Two options:

Option A: ITERATE
We revise the system architecture. Maybe identity isn't locked right.
This might require a second project (paid).

Option B: ESCALATE
Jump on a call. We listen. Maybe your vision needs different approach.
We reposition and restart.

Guarantee: If we deliver, you'll have a usable system.
Not 'perfect,' but functional and scalable.`,
    },
    {
      question: 'What about privacy with your process?',
      answer: `Your brand data is confidential.

What we keep:
• System documentation (so we can support evolving it)
• Process notes (for future projects)

What we don't share:
✓ Your brand guidelines remain yours
✓ Your assets are never shared with other clients
✓ Your prompts/rules aren't public
✓ No NDA required (standard terms apply)
✓ Data stored securely (encrypted, backed up)

Case studies:
If we want to feature your case, we ask permission first.
Most clients agree (good for both sides).
But: always optional.`,
    },
  ];

  return (
    <div className="w-full bg-black text-white">
      <section className="py-20 md:py-32 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 text-lg">
              Everything you need to know about working with HEYDE
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-colors"
              >
                {/* Question Header */}
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <h3 className="text-lg md:text-xl font-bold text-white pr-4 flex-1">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={24} className="text-magenta" />
                  </motion.div>
                </button>

                {/* Answer Body */}
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-6 md:px-8 md:py-8 bg-white/[0.02] border-t border-white/5">
                        <p className="text-white/80 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <p className="text-white/60 mb-6">Still have questions?</p>
            <a
              href="https://calendly.com/heyde-studio/20min?utm_source=heyde_faq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-magenta text-white font-bold rounded hover:bg-magenta-dark transition-colors"
            >
              Schedule a Call
            </a>
          </motion.div>
        </div>
      </section>

      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
