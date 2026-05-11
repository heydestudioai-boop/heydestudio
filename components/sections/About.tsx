'use client';

import { motion } from 'framer-motion';

export function About() {
  const language: string = 'en'; // Hardcoded for now

  // PART 1: Origin Story
  const originStory = {
    headingEn: 'Why HEYDE Studio Exists',
    headingEs: 'Por Qué Existe HEYDE Studio',
    paragraphsEn: [
      'For years in creative direction, we saw the same pattern: Beautiful visuals. Zero consistency. Expensive production. Unmaintainable scale.',
      'Then AI arrived. It solved one problem (speed) and created another (chaos). Generic tools, no direction. Fast output, no soul.',
      'We built HEYDE to solve both: the speed of AI + the intelligence of craft. Systems, not images. Infrastructure, not improvisation.',
    ],
    paragraphsEs: [
      'Durante años en dirección creativa, vimos el mismo patrón: Visuales hermosos. Cero consistencia. Producción cara. Escala inmantenible.',
      'Luego llegó la IA. Resolvió un problema (velocidad) y creó otro (caos). Herramientas genéricas, sin dirección. Output rápido, sin alma.',
      'Construimos HEYDE para resolver ambos: la velocidad de la IA + la inteligencia del oficio. Sistemas, no imágenes. Infraestructura, no improvisación.',
    ],
  };

  // PART 2: Expertise
  const expertise = {
    headingEn: 'Where We Come From',
    headingEs: 'De Dónde Venimos',
    pillarsEn: [
      {
        title: 'Creative Direction',
        desc: 'Visual strategy from the ground up. Art direction that sells. 15+ years building identities that stick.',
      },
      {
        title: 'Audiovisual Design',
        desc: 'Cinema, photography, color grading, cinematography. AI alone is incomplete. We bridge visual craft with technology.',
      },
      {
        title: 'System Architecture',
        desc: 'Not one-off outputs. Locked identities, documented rules, scalable infrastructure. Design that works at any scale.',
      },
    ],
    pillarsEs: [
      {
        title: 'Dirección Creativa',
        desc: 'Estrategia visual desde cero. Dirección de arte que vende. 15+ años construyendo identidades que perduran.',
      },
      {
        title: 'Diseño Audiovisual',
        desc: 'Cine, fotografía, color grading, cinematografía. La IA sola es incompleta. Combinamos oficio visual con tecnología.',
      },
      {
        title: 'Arquitectura de Sistemas',
        desc: 'No outputs aislados. Identidades bloqueadas, reglas documentadas, infraestructura escalable. Diseño que funciona a cualquier escala.',
      },
    ],
  };

  // PART 3: Philosophy
  const philosophy = {
    headingEn: 'What We Believe',
    headingEs: 'Lo Que Creemos',
    beliefsEn: [
      'System before image — We build infrastructure, not isolated assets',
      'Craft governs — AI is a tool. Direction is human.',
      'Consistency at scale — Your brand should feel like itself at 1 asset or 1,000',
      'Documentation matters — If you can\'t replicate it, it\'s not a system',
      'Premium positioning — Not for everyone. Built for brands that invest in identity.',
    ],
    beliefsEs: [
      'Sistema antes que imagen — Construimos infraestructura, no assets aislados',
      'El oficio gobierna — La IA es una herramienta. La dirección es humana.',
      'Consistencia a escala — Tu marca debe sentirse como sí misma en 1 asset o 1.000',
      'La documentación importa — Si no puedes replicarlo, no es un sistema',
      'Posicionamiento premium — No es para todos. Construido para marcas que invierten en identidad.',
    ],
  };

  // PART 4: Stats
  const stats = [
    { number: '50+', labelEn: 'Projects Completed', labelEs: 'Proyectos Completados' },
    { number: '30+', labelEn: 'Happy Clients', labelEs: 'Clientes Satisfechos' },
    { number: '12+', labelEn: 'Years Experience', labelEs: 'Años de Experiencia' },
  ];

  const beliefs =
    language === 'es' ? philosophy.beliefsEs : philosophy.beliefsEn;
  const pillars =
    language === 'es' ? expertise.pillarsEs : expertise.pillarsEn;
  const paragraphs =
    language === 'es' ? originStory.paragraphsEs : originStory.paragraphsEn;

  return (
    <div className="w-full bg-black text-white">
      {/* PART 1: ORIGIN STORY */}
      <section id="about-origin" className="py-20 md:py-32 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              {language === 'es'
                ? originStory.headingEs
                : originStory.headingEn}
            </h2>
            <div className="space-y-6">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-lg leading-relaxed text-white/80"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PART 2: EXPERTISE */}
      <section id="about-expertise" className="py-20 md:py-32 px-8 md:px-12 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-16 tracking-tight"
          >
            {language === 'es' ? expertise.headingEs : expertise.headingEn}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-lg bg-white/10 border border-white/20 hover:border-white/40 transition-all"
              >
                <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-white/70 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PART 3: PHILOSOPHY */}
      <section id="about-philosophy" className="py-20 md:py-32 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-12 tracking-tight"
          >
            {language === 'es' ? philosophy.headingEs : philosophy.headingEn}
          </motion.h2>

          <div className="space-y-4">
            {beliefs.map((belief, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 items-start p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-xl font-bold text-white/60 mt-1">•</div>
                <p className="text-lg leading-relaxed text-white/80">{belief}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PART 4: STATS */}
      <section id="about-stats" className="py-20 md:py-32 px-8 md:px-12 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {stat.number}
                </div>
                <p className="text-white/60">
                  {language === 'es' ? stat.labelEs : stat.labelEn}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work CTA */}
      <section id="about-process" className="py-20 md:py-32 px-8 md:px-12 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              See Our Process in Action
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Understand exactly how we transform your brand into a scalable, documented system.
            </p>
            <a
              href="/services#process"
              className="inline-block px-8 py-3 bg-magenta text-white font-bold rounded hover:bg-magenta-dark transition-colors"
            >
              Learn How We Work
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
