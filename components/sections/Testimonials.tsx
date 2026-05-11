'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '@/lib/testimonials';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 px-8 md:px-12 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            What Clients Say
          </h2>
          <p className="text-xl text-white/60">
            Real results from brands that transformed their visual systems with HEYDE
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="fill-magenta text-magenta" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg leading-relaxed text-white/90 italic mb-8 flex-1">
                {testimonial.quote}
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4">
                {testimonial.logo && (
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-xl">
                    {testimonial.logo}
                  </div>
                )}
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-white/60">{testimonial.title}</p>
                  <p className="text-xs text-white/50">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6">Ready to build your system?</p>
          <a
            href="https://calendly.com/heyde-studio/20min?utm_source=heyde_testimonials"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-magenta text-white font-bold rounded hover:bg-magenta-dark transition-colors"
          >
            Schedule a Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
