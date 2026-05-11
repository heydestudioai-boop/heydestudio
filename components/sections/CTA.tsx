'use client';

import { motion } from 'framer-motion';

export function CTA() {
  const language: string = 'en'; // Hardcoded for now

  return (
    <section className="py-20 md:py-32 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            {language === 'es'
              ? '¿Listo para transformar tu visión?'
              : 'Ready to transform your vision?'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 mb-8 leading-relaxed"
          >
            {language === 'es'
              ? 'Trabajemos juntos para crear algo extraordinario. Tenemos expertise en diseño estratégico, animación de clase mundial, y soluciones impulsadas por IA.'
              : "Let's work together to create something extraordinary. We have expertise in strategic design, world-class animation, and AI-powered solutions."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-magenta text-white rounded-full font-semibold hover:bg-magenta-dark transition-colors">
              {language === 'es' ? 'Iniciar Proyecto' : 'Start a Project'}
            </button>
            <button className="px-8 py-4 border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-colors">
              {language === 'es' ? 'Descargar Propuesta' : 'Download Proposal'}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}