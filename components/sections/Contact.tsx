'use client';

import { motion } from 'framer-motion';

export function Contact() {
  const language: string = 'en'; // Hardcoded for now

  const contactMethods = [
    {
      labelEn: 'Email',
      labelEs: 'Email',
      value: 'contact@heydestudio.com',
      href: 'mailto:contact@heydestudio.com',
      descEn: 'Send us a message and we\'ll respond within 24 hours',
      descEs: 'Envíanos un mensaje y responderemos en 24 horas',
    },
    {
      labelEn: 'WhatsApp',
      labelEs: 'WhatsApp',
      value: '+34 671 141 135',
      href: 'https://wa.me/34671141135',
      descEn: 'Quick chat for immediate inquiries and questions',
      descEs: 'Chat rápido para consultas e inquietudes inmediatas',
    },
    {
      labelEn: 'Instagram',
      labelEs: 'Instagram',
      value: '@heyde.studio',
      href: 'https://instagram.com/heyde.studio',
      descEn: 'Follow our latest projects and creative work',
      descEs: 'Sigue nuestros últimos proyectos y trabajos creativos',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {language === 'es' ? 'Empecemos Juntos' : "Let's Connect"}
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Estamos listos para colaborar en tu próximo proyecto. Elige el método que más te convenga.'
              : 'We\'re ready to collaborate on your next project. Choose your preferred way to reach us.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-xl bg-black/5 border border-black/10 hover:border-black/30 hover:bg-black/10 transition-all"
            >
              <h3 className="font-semibold text-lg mb-2">
                {language === 'es' ? method.labelEs : method.labelEn}
              </h3>
              <p className="text-black/80 font-medium break-all mb-3">{method.value}</p>
              <p className="text-black/60 text-sm">
                {language === 'es' ? method.descEs : method.descEn}
              </p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-8 rounded-xl bg-gradient-to-r from-black/5 to-black/10 border border-black/10"
        >
          <p className="text-black/60 mb-4">
            {language === 'es'
              ? '¿Interesado en conocer más sobre nuestros servicios y propuestas personalizadas?'
              : 'Interested in learning more about our services and custom proposals?'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors"
          >
            {language === 'es' ? 'Descargar Propuesta' : 'Download Proposal'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}