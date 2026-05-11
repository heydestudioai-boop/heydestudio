'use client';

import { motion } from 'framer-motion';

export function Hero() {
  const language: string = 'en'; // Hardcoded for now

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl opacity-30" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block text-sm font-medium text-black/60 px-4 py-2 rounded-full bg-black/5 border border-black/10">
            {language === 'es' 
              ? 'Estudio Creativo Potenciado por IA' 
              : 'AI-Powered Creative Studio'}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight"
        >
          HEYDE<br />Studio
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-black/60 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          {language === 'es'
            ? 'Transformamos ideas en experiencias digitales extraordinarias. Combinamos diseño estratégico, animación cinematográfica e inteligencia artificial para crear soluciones que inspiran, cautivan y generan impacto.'
            : 'We transform ideas into extraordinary digital experiences. We blend strategic design, cinematic animation, and artificial intelligence to create solutions that inspire, captivate, and drive impact.'}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors">
            {language === 'es' ? 'Ver Nuestro Trabajo' : 'See Our Work'}
          </button>
          <button className="px-8 py-4 bg-white text-black border-2 border-black rounded-full font-medium hover:bg-black/5 transition-colors">
            {language === 'es' ? 'Empecemos' : 'Get Started'}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}