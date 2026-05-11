'use client';

import { motion } from 'framer-motion';

const serviceData = [
  {
    iconEn: '🎨',
    titleEn: 'Digital Design',
    titleEs: 'Diseño Digital',
    descEn: 'User interfaces and experiences that are beautiful, intuitive, and results-driven. From concept to implementation.',
    descEs: 'Interfaces y experiencias de usuario hermosas, intuitivas y orientadas a resultados. De concepto a implementación.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    iconEn: '🎬',
    titleEn: 'Motion & Animation',
    titleEs: 'Animación Cinemática',
    descEn: 'Cinematic animations and motion design that bring your stories to life. We create moments that resonate.',
    descEs: 'Animaciones cinematográficas que dan vida a tus historias. Creamos momentos que resuenan.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    iconEn: '🤖',
    titleEn: 'AI Integration',
    titleEs: 'Integración IA',
    descEn: 'Leverage cutting-edge AI technology to enhance creativity, efficiency, and deliver intelligent solutions.',
    descEs: 'Aprovecha tecnología IA avanzada para mejorar creatividad, eficiencia y soluciones inteligentes.',
    color: 'from-orange-500 to-red-500',
  },
  {
    iconEn: '✨',
    titleEn: 'Brand Strategy',
    titleEs: 'Estrategia de Marca',
    descEn: 'Comprehensive branding solutions that define your identity and create lasting impressions in the market.',
    descEs: 'Soluciones integrales que definen tu identidad y crean impresiones duraderas en el mercado.',
    color: 'from-yellow-500 to-orange-500',
  },
];

export function Services() {
  const language: string = 'en'; // Hardcoded for now

  return (
    <section id="services" className="py-20 md:py-32 bg-white/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
          </h2>
          <p className="text-xl text-black/60 max-w-2xl">
            {language === 'es'
              ? 'Una gama completa de servicios creativos para impulsar tu marca'
              : 'A complete range of creative services to drive your brand forward'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-xl bg-gradient-to-br ${service.color} group cursor-pointer transition-all`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.iconEn}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {language === 'es' ? service.titleEs : service.titleEn}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {language === 'es' ? service.descEs : service.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}