export type CaseStudyLanguage = 'EN' | 'ES';

export type CaseStudyMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
};

export type CaseStudyContent = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  heroMedia: CaseStudyMedia;
  meta: Array<{ label: string; value: string }>;
  sections: Array<{ kicker: string; title: string; body: string }>;
  systemTitle: string;
  systemBody: string;
  systemPoints: Array<{ title: string; body: string }>;
  breakdownTitle: string;
  breakdownBody: string;
  breakdown: Array<{ label: string; title: string; body: string }>;
  metricsTitle: string;
  metrics: Array<{ value: string; label: string }>;
  galleryTitle: string;
  galleryBody: string;
  gallery: CaseStudyMedia[];
  deliverablesTitle: string;
  deliverables: string[];
  finalTitle: string;
  finalBody: string;
  finalCta: string;
};

const sharedFinal = {
  EN: {
    finalTitle: 'Ready to build the system?',
    finalBody:
      'Send the context.\nWe will help you identify the right starting point and the level of system your brand actually needs.',
    finalCta: 'Start a Project',
  },
  ES: {
    finalTitle: '¿Listos para construir el sistema?',
    finalBody:
      'Envíanos el contexto.\nTe ayudaremos a identificar el punto de partida y el nivel de sistema que tu marca necesita.',
    finalCta: 'Empezar un Proyecto',
  },
} satisfies Record<CaseStudyLanguage, Pick<CaseStudyContent, 'finalTitle' | 'finalBody' | 'finalCta'>>;

export const caseStudyContent: Record<CaseStudyLanguage, Record<string, CaseStudyContent>> = {
  EN: {
    solea: {
      slug: 'solea',
      name: 'Soleá',
      eyebrow: 'AI Campaign System',
      title: 'A fragrance campaign about what remains after the sun.',
      description:
        'A conceptual fragrance built from Mediterranean light, skin memory and natural materials: glass, ceramic, wood and a golden liquid that holds the warmth of the day.',
      heroMedia: {
        type: 'image',
        src: '/images/work-solea-cover.jpg',
        alt: 'Soleá fragrance campaign visual',
      },
      meta: [
        { label: 'Project', value: 'Concept system developed by HEYDE Studio' },
        { label: 'Scope', value: 'Creative direction, visual system and motion' },
        { label: 'System', value: 'Fragrance identity, editorial shooting and brand application' },
        { label: 'Year', value: '2026' },
      ],
      sections: [
        {
          kicker: 'Context',
          title: 'Soleá does not represent summer. It represents what stays.',
          body:
            'Soleá is a visual exploration of Mediterranean light and its permanence on the skin.\nThe fragrance is constructed through glass, ceramic and wood, where the golden liquid becomes a metaphor for solar memory.',
        },
        {
          kicker: 'Challenge',
          title: 'Translate Mediterranean light into a tactile perfume object.',
          body:
            'The creative challenge was to build a fragrance identity rooted in material permanence without relying on seasonal cliches or beach-perfume aesthetics.\nThe work positions fragrance as a material object, not a cosmetic accessory.',
        },
        {
          kicker: 'Direction',
          title: 'Materiality becomes the narrative.',
          body:
            'The ceramic base represents earth and origin. Transparent glass allows light to pass through it. The golden liquid captures the sun. Wood introduces warmth and tactility.\nEach material is symbolic, not decorative.',
        },
        {
          kicker: 'Editorial Direction',
          title: 'European editorial minimalism, without artificial gloss.',
          body:
            'The art direction is built around clean typography, controlled negative space, product as the absolute protagonist and no visual noise.\nThe perfume is integrated into skin, landscape and gesture while the product remains the visual anchor.',
        },
      ],
      systemTitle: 'The campaign system behind the product.',
      systemBody:
        'The campaign is structured so the same fragrance identity can scale across still imagery, motion, print, outdoor formats, digital campaigns and social storytelling.',
      systemPoints: [
        {
          title: 'Light as memory',
          body: 'Mediterranean light is treated as something that remains on skin, material and atmosphere.',
        },
        {
          title: 'Material logic',
          body: 'Glass, ceramic, wood and golden liquid define the symbolic grammar of the fragrance.',
        },
        {
          title: 'Visual system',
          body: 'Warm directional natural light, golden tone, negative space and texture-driven close-ups create coherence.',
        },
        {
          title: 'Contemplative motion',
          body: 'The 9:16 sequence uses slow rhythm, natural Mediterranean light, close textures and atmospheric pacing.',
        },
      ],
      breakdownTitle: 'How the system is structured.',
      breakdownBody:
        'The campaign is documented as reusable logic: what must stay consistent, what can change and how each format should derive from the same identity.',
      breakdown: [
        {
          label: 'Identity lock',
          title: 'Material permanence over seasonal imagery.',
          body:
            'Soleá is locked around Mediterranean light, tactile materiality, solar memory and a premium fragrance identity that avoids summer cliches.',
        },
        {
          label: 'Visual rules',
          title: 'Warm light, golden palette and controlled negative space.',
          body:
            'The reusable image grammar combines warm directional natural light, golden tonality, close-up texture and the product as central sculptural object.',
        },
        {
          label: 'Production logic',
          title: 'Skin, landscape, gesture and product.',
          body:
            'The editorial shooting integrates perfume into body and landscape while keeping human presence subtle and the product as visual anchor.',
        },
        {
          label: 'Format map',
          title: 'Print, outdoor, digital and social storytelling.',
          body:
            'The system is designed to adapt across luxury brand applications, from editorial print to outdoor formats, digital campaigns and social narratives.',
        },
        {
          label: 'Motion',
          title: 'The material narrative extended into time.',
          body:
            'The motion piece translates the same tactile language into a contemplative vertical sequence with slow pacing and Mediterranean light.',
        },
      ],
      metricsTitle: 'System snapshot.',
      metrics: [
        { value: '4', label: 'core materials' },
        { value: '5', label: 'visual system rules' },
        { value: '4', label: 'brand application channels' },
        { value: '9:16', label: 'motion sequence' },
      ],
      galleryTitle: 'Campaign range.',
      galleryBody:
        'Product presence, Mediterranean atmosphere and editorial still life work as one campaign language.',
      gallery: [
        { type: 'image', src: '/images/work-solea-cover.jpg', alt: 'Soleá hero campaign frame' },
        { type: 'image', src: '/images/work-solea-01.jpg', alt: 'Soleá campaign detail' },
        { type: 'image', src: '/images/work-solea-02.jpg', alt: 'Soleá campaign atmosphere' },
        { type: 'image', src: '/images/work-solea-03.jpg', alt: 'Soleá campaign extension' },
        { type: 'video', src: '/videos/solea-video-case.mp4', alt: 'Soleá contemplative campaign reel' },
      ],
      deliverablesTitle: 'What the system can deliver.',
      deliverables: [
        'Conceptual fragrance campaign',
        'Creative direction and visual system',
        'Material language: glass, ceramic, wood and golden liquid',
        'Editorial product shooting with skin, landscape and gesture',
        'Contemplative 9:16 motion piece',
        'Luxury brand applications for print, outdoor, digital and social',
      ],
      ...sharedFinal.EN,
    },
    eden: {
      slug: 'eden',
      name: 'eden',
      eyebrow: 'AI Editorial Campaign',
      title: 'A structured editorial campaign world.',
      description:
        'A fashion image system built through brutalist architecture, sculptural silhouette, cold light and controlled tension.',
      heroMedia: {
        type: 'image',
        src: '/images/work-eden-cover.jpg',
        alt: 'eden editorial campaign visual',
      },
      meta: [
        { label: 'Project', value: 'Concept system developed by HEYDE Studio' },
        { label: 'Scope', value: 'Creative direction and visual system' },
        { label: 'Language', value: 'Figure, space, styling and atmosphere' },
        { label: 'Year', value: '2026' },
      ],
      sections: [
        {
          kicker: 'Context',
          title: 'A campaign world, not an isolated image.',
          body:
            'eden was developed to feel coherent, editorial and publicly credible beyond the level of a single strong image.\nThe project treats figure, space, styling and atmosphere as one continuous campaign language.',
        },
        {
          kicker: 'Concept',
          title: 'The body and the environment operate as one system.',
          body:
            'eden develops fashion image through brutalist architecture, sculptural silhouette, cold light and controlled tension.\nThe body is not placed into space as decoration, but absorbed into a coherent visual world with photographic credibility and campaign potential.',
        },
        {
          kicker: 'Material Language',
          title: 'Concrete, steel, vegetation and black styling shape the image.',
          body:
            'The material vocabulary is formed by concrete, dark steel, dense vegetation and sculptural black styling.\nThese elements are structural components of the image, shaping atmosphere, spatial tension and editorial credibility.',
        },
      ],
      systemTitle: 'A controlled editorial system.',
      systemBody:
        'The campaign was built for continuity between figure, space, styling and atmosphere, so each image contributes to a larger visual language rather than functioning as an isolated result.',
      systemPoints: [
        {
          title: 'Brutalist framing',
          body: 'Architecture gives the campaign structure, spatial rhythm and controlled tension.',
        },
        {
          title: 'Editorial body logic',
          body: 'The figure is directed through body logic and silhouette, not static posing.',
        },
        {
          title: 'Material language',
          body: 'Concrete, steel, vegetation and black styling create a restrained editorial vocabulary.',
        },
        {
          title: 'Campaign scalability',
          body: 'The visual logic can extend into stills, motion, material studies and platform-specific formats.',
        },
      ],
      breakdownTitle: 'How the system is structured.',
      breakdownBody:
        'The editorial world is designed as a repeatable system: character logic, spatial rules, material cues and format behavior are defined before production scales.',
      breakdown: [
        {
          label: 'Identity lock',
          title: 'One controlled editorial world.',
          body:
            'eden is locked around figure, space, styling and atmosphere operating with continuity across the wider campaign language.',
        },
        {
          label: 'Visual rules',
          title: 'Cold tone, brutalist structure, sculptural styling.',
          body:
            'Concrete, black garments, dense vegetation and controlled light define the mood without relying on decorative excess.',
        },
        {
          label: 'Production logic',
          title: 'Figure and environment operate together.',
          body:
            'The execution prioritizes campaign credibility, editorial body logic and spatial coherence across each image.',
        },
        {
          label: 'Format map',
          title: 'Editorial stills, campaign details and motion-ready frames.',
          body:
            'The world can extend into portraits, full-body frames, location studies, social crops and future motion pieces.',
        },
        {
          label: 'Handoff',
          title: 'A reusable editorial vocabulary.',
          body:
            'The handoff can document character rules, styling boundaries, tonal criteria, location logic and approved format behavior.',
        },
      ],
      metricsTitle: 'System snapshot.',
      metrics: [
        { value: '6', label: 'system pillars' },
        { value: '4', label: 'material cues' },
        { value: '4', label: 'continuity layers' },
        { value: '4', label: 'scalable output families' },
      ],
      galleryTitle: 'Editorial continuity.',
      galleryBody:
        'The campaign keeps the same visual pressure across framing, body logic and atmosphere.',
      gallery: [
        { type: 'image', src: '/images/work-eden-cover.jpg', alt: 'eden hero editorial frame' },
        { type: 'image', src: '/images/work-eden-01.png', alt: 'eden editorial character study' },
        { type: 'image', src: '/images/work-eden-02.jpg', alt: 'eden material and architecture study' },
        { type: 'image', src: '/images/work-eden-03.jpg', alt: 'eden campaign extension' },
        { type: 'video', src: '/videos/eden-video-case.mp4', alt: 'eden editorial campaign reel' },
      ],
      deliverablesTitle: 'What the system can deliver.',
      deliverables: [
        'Structured editorial campaign world',
        'Creative direction and visual system',
        'Brutalist spatial framing',
        'Sculptural fashion silhouette and editorial body logic',
        'Material language: concrete, dark steel, vegetation and black styling',
        'Scalable system for stills, material studies, motion and platform-specific publications',
      ],
      ...sharedFinal.EN,
    },
    motion: {
      slug: 'motion',
      name: 'Motion Studies',
      eyebrow: 'AI Motion Showcase',
      title: 'A living showcase of campaign motion systems.',
      description:
        'A motion-only archive for campaign reels, teasers and moving image experiments across different visual worlds.',
      heroMedia: {
        type: 'video',
        src: '/videos/eden-video-case.mp4',
        alt: 'Motion studies editorial campaign reel',
      },
      meta: [
        { label: 'Project', value: 'Ongoing motion showcase by HEYDE Studio' },
        { label: 'Scope', value: 'AI video, motion direction and campaign adaptation' },
        { label: 'System', value: 'Motion logic across multiple campaign worlds' },
        { label: 'Format', value: 'Vertical reels, teasers and motion studies' },
      ],
      sections: [
        {
          kicker: 'Context',
          title: 'Motion is where campaign worlds prove they can move.',
          body:
            'This case study is not tied to one brand world. It exists as a growing motion dump: a place to collect reels, tests and campaign fragments from different territories.\nThe goal is to show how a campaign identity can move without becoming generic video output.',
        },
        {
          kicker: 'Direction',
          title: 'Different campaigns, one standard of control.',
          body:
            'Each piece starts from a visual system: rhythm, atmosphere, camera behavior, texture and format are defined before motion is generated.\nOver time, this page becomes a showcase of how different campaigns can produce different motion languages while keeping production discipline.',
        },
      ],
      systemTitle: 'Motion as campaign capability.',
      systemBody:
        'The value is not a single reel. The value is the ability to create motion repeatedly across campaigns while preserving identity, pacing and visual intent.',
      systemPoints: [
        {
          title: 'Campaign rhythm',
          body: 'Movement is directed around the pacing of each campaign, not around generic animation defaults.',
        },
        {
          title: 'Motion range',
          body: 'The showcase can hold reels, teasers, product moments, editorial sequences and atmospheric tests.',
        },
        {
          title: 'Identity continuity',
          body: 'Every clip should carry the atmosphere, material cues and visual rules of the world it comes from.',
        },
        {
          title: 'Expandable archive',
          body: 'The page is built to grow as new motion studies and campaign fragments are produced.',
        },
      ],
      breakdownTitle: 'How the motion showcase is structured.',
      breakdownBody:
        'Motion is treated as campaign behavior: each clip needs a clear origin world, a format role and a repeatable set of motion rules.',
      breakdown: [
        {
          label: 'Origin world',
          title: 'Every motion piece belongs to a campaign territory.',
          body:
            'A clip can come from fragrance, fashion, product, editorial or another campaign system, but it should keep a recognizable visual origin.',
        },
        {
          label: 'Motion rules',
          title: 'Rhythm, atmosphere and camera behavior.',
          body:
            'Movement speed, transitions, light, texture, framing and camera intention are controlled so the result feels directed.',
        },
        {
          label: 'Format role',
          title: 'Each piece has a job inside the campaign.',
          body:
            'Some clips work as reels, others as teasers, launch fragments, product moments, editorial inserts or atmosphere studies.',
        },
        {
          label: 'Showcase logic',
          title: 'The archive grows without changing its structure.',
          body:
            'New videos can be added as the studio produces more campaign motion, turning the page into an evolving motion library.',
        },
        {
          label: 'Production memory',
          title: 'Useful lessons stay attached to the motion.',
          body:
            'The same logic can document pacing, constraints, camera behavior, format notes and what should be repeated in future clips.',
        },
      ],
      metricsTitle: 'System snapshot.',
      metrics: [
        { value: '100%', label: 'motion-only showcase' },
        { value: '5', label: 'format roles' },
        { value: '4+', label: 'campaign territories over time' },
        { value: '∞', label: 'archive growth potential' },
      ],
      galleryTitle: 'Motion showcase.',
      galleryBody:
        'A growing dump of campaign motion: reels, tests, teasers and moving image fragments from different visual systems.',
      gallery: [
        { type: 'video', src: '/videos/eden-video-case.mp4', alt: 'eden motion campaign study' },
        { type: 'video', src: '/videos/solea-video-case.mp4', alt: 'Soleá motion campaign study' },
        { type: 'video', src: '/videos/DG-video-case.mp4', alt: 'DG motion campaign study' },
      ],
      deliverablesTitle: 'What this motion archive can show.',
      deliverables: [
        'Motion-only campaign showcase',
        'Vertical reels and teaser studies',
        'Campaign rhythm and pacing tests',
        'Product, editorial and atmosphere motion fragments',
        'Reusable motion direction rules',
        'Expandable archive for future campaign motion',
      ],
      ...sharedFinal.EN,
    },
  },
  ES: {
    solea: {
      slug: 'solea',
      name: 'Soleá',
      eyebrow: 'AI Campaign System',
      title: 'Una campaña de fragancia sobre lo que permanece después del sol.',
      description:
        'Una fragancia conceptual construida desde la luz mediterránea, el recuerdo en la piel y materiales naturales: vidrio, cerámica, madera y un líquido dorado que retiene el calor del día.',
      heroMedia: {
        type: 'image',
        src: '/images/work-solea-cover.jpg',
        alt: 'Visual de campaña de fragancia Soleá',
      },
      meta: [
        { label: 'Proyecto', value: 'Concept system developed by HEYDE Studio' },
        { label: 'Alcance', value: 'Dirección creativa, sistema visual y motion' },
        { label: 'Sistema', value: 'Identidad de fragancia, shooting editorial y aplicación de marca' },
        { label: 'Año', value: '2026' },
      ],
      sections: [
        {
          kicker: 'Contexto',
          title: 'Soleá no representa el verano. Representa lo que permanece.',
          body:
            'Soleá es una exploración visual de la luz mediterránea y su permanencia sobre la piel.\nLa fragancia se construye a través de vidrio, cerámica y madera, donde el líquido dorado funciona como metáfora de memoria solar.',
        },
        {
          kicker: 'Reto creativo',
          title: 'Traducir la luz mediterránea en un objeto de perfume táctil.',
          body:
            'El reto creativo era construir una identidad de fragancia basada en permanencia material sin apoyarse en clichés estacionales ni en estética típica de perfume de playa.\nEl trabajo posiciona la fragancia como objeto material, no como accesorio cosmético.',
        },
        {
          kicker: 'Dirección',
          title: 'La materialidad se convierte en narrativa.',
          body:
            'La base cerámica representa tierra y origen. El vidrio transparente permite que la luz lo atraviese. El líquido dorado captura el sol. La madera introduce calidez y tactilidad.\nCada material es simbólico, no decorativo.',
        },
        {
          kicker: 'Dirección editorial',
          title: 'Minimalismo editorial europeo, sin brillo artificial.',
          body:
            'La dirección de arte se construye con tipografía limpia, espacio negativo controlado, producto como protagonista absoluto y ausencia de ruido visual.\nEl perfume se integra en piel, paisaje y gesto mientras el producto permanece como ancla visual.',
        },
      ],
      systemTitle: 'El sistema de campaña detrás del producto.',
      systemBody:
        'La campaña se estructura para que la misma identidad de fragancia pueda escalar a imagen fija, motion, print editorial, exterior, campañas digitales y social storytelling.',
      systemPoints: [
        {
          title: 'Luz como memoria',
          body: 'La luz mediterránea se trata como algo que permanece sobre piel, material y atmósfera.',
        },
        {
          title: 'Lógica material',
          body: 'Vidrio, cerámica, madera y líquido dorado definen la gramática simbólica de la fragancia.',
        },
        {
          title: 'Sistema visual',
          body: 'Luz natural cálida y direccional, paleta dorada, espacio negativo y close-ups de textura crean coherencia.',
        },
        {
          title: 'Motion contemplativo',
          body: 'La secuencia 9:16 usa ritmo lento, luz mediterránea natural, texturas cercanas y pacing atmosférico.',
        },
      ],
      breakdownTitle: 'Cómo se estructura el sistema.',
      breakdownBody:
        'La campaña se documenta como lógica reutilizable: qué debe mantenerse, qué puede cambiar y cómo cada formato deriva de la misma identidad.',
      breakdown: [
        {
          label: 'Identity lock',
          title: 'Permanencia material frente a imaginario estacional.',
          body:
            'Soleá se bloquea alrededor de luz mediterránea, materialidad táctil, memoria solar y una identidad premium de fragancia que evita clichés de verano.',
        },
        {
          label: 'Reglas visuales',
          title: 'Luz cálida, paleta dorada y espacio negativo controlado.',
          body:
            'La gramática reutilizable combina luz natural cálida y direccional, tonalidad dorada, textura cercana y el producto como objeto escultórico central.',
        },
        {
          label: 'Lógica de producción',
          title: 'Piel, paisaje, gesto y producto.',
          body:
            'El shooting editorial integra el perfume en cuerpo y paisaje con presencia humana sutil, manteniendo el producto como ancla visual.',
        },
        {
          label: 'Mapa de formatos',
          title: 'Print, exterior, digital y social storytelling.',
          body:
            'El sistema está diseñado para adaptarse a aplicaciones de marca de lujo: print editorial, formatos exteriores, campañas digitales y narrativas sociales.',
        },
        {
          label: 'Motion',
          title: 'La narrativa material extendida en el tiempo.',
          body:
            'La pieza motion traduce el mismo lenguaje táctil en una secuencia vertical contemplativa con ritmo lento y luz mediterránea.',
        },
      ],
      metricsTitle: 'Snapshot del sistema.',
      metrics: [
        { value: '4', label: 'materiales base' },
        { value: '5', label: 'reglas de sistema visual' },
        { value: '4', label: 'canales de aplicación' },
        { value: '9:16', label: 'secuencia motion' },
      ],
      galleryTitle: 'Rango de campaña.',
      galleryBody:
        'Presencia de producto, atmósfera mediterránea y still life editorial funcionan como un mismo lenguaje de campaña.',
      gallery: [
        { type: 'image', src: '/images/work-solea-cover.jpg', alt: 'Hero frame de campaña Soleá' },
        { type: 'image', src: '/images/work-solea-01.jpg', alt: 'Detalle de campaña Soleá' },
        { type: 'image', src: '/images/work-solea-02.jpg', alt: 'Atmósfera de campaña Soleá' },
        { type: 'image', src: '/images/work-solea-03.jpg', alt: 'Extensión de campaña Soleá' },
        { type: 'video', src: '/videos/solea-video-case.mp4', alt: 'Reel contemplativo de campaña Soleá' },
      ],
      deliverablesTitle: 'Qué puede entregar el sistema.',
      deliverables: [
        'Campaña conceptual de fragancia',
        'Dirección creativa y sistema visual',
        'Lenguaje material: vidrio, cerámica, madera y líquido dorado',
        'Shooting editorial de producto con piel, paisaje y gesto',
        'Pieza motion contemplativa 9:16',
        'Aplicaciones de marca de lujo para print, exterior, digital y social',
      ],
      ...sharedFinal.ES,
    },
    eden: {
      slug: 'eden',
      name: 'eden',
      eyebrow: 'AI Editorial Campaign',
      title: 'Un mundo editorial de campaña estructurado.',
      description:
        'Un sistema de imagen de moda construido desde arquitectura brutalista, silueta escultórica, luz fría y tensión controlada.',
      heroMedia: {
        type: 'image',
        src: '/images/work-eden-cover.jpg',
        alt: 'Visual de campaña editorial eden',
      },
      meta: [
        { label: 'Proyecto', value: 'Concept system developed by HEYDE Studio' },
        { label: 'Alcance', value: 'Dirección creativa y sistema visual' },
        { label: 'Lenguaje', value: 'Figura, espacio, styling y atmósfera' },
        { label: 'Año', value: '2026' },
      ],
      sections: [
        {
          kicker: 'Contexto',
          title: 'Un mundo de campaña, no una imagen aislada.',
          body:
            'eden se desarrolló para sentirse coherente, editorial y públicamente creíble más allá de una sola imagen fuerte.\nEl proyecto trata figura, espacio, styling y atmósfera como un lenguaje continuo de campaña.',
        },
        {
          kicker: 'Concepto',
          title: 'El cuerpo y el entorno funcionan como un único sistema.',
          body:
            'eden desarrolla imagen de moda a través de arquitectura brutalista, silueta escultórica, luz fría y tensión controlada.\nEl cuerpo no se coloca en el espacio como decoración, sino que queda absorbido en un mundo visual coherente con credibilidad fotográfica y potencial de campaña.',
        },
        {
          kicker: 'Lenguaje material',
          title: 'Hormigón, acero, vegetación y styling negro construyen la imagen.',
          body:
            'El vocabulario material se forma con hormigón, acero oscuro, vegetación densa y styling negro escultórico.\nEstos elementos son componentes estructurales de la imagen: construyen atmósfera, tensión espacial y credibilidad editorial.',
        },
      ],
      systemTitle: 'Un sistema editorial controlado.',
      systemBody:
        'La campaña se construyó para mantener continuidad entre figura, espacio, styling y atmósfera, de modo que cada imagen contribuya a un lenguaje visual mayor en lugar de funcionar como resultado aislado.',
      systemPoints: [
        {
          title: 'Encuadre brutalista',
          body: 'La arquitectura aporta estructura, ritmo espacial y tensión controlada a la campaña.',
        },
        {
          title: 'Lógica editorial del cuerpo',
          body: 'La figura se dirige desde lógica corporal y silueta, no desde pose estática.',
        },
        {
          title: 'Lenguaje material',
          body: 'Hormigón, acero, vegetación y styling negro crean un vocabulario editorial contenido.',
        },
        {
          title: 'Escalabilidad de campaña',
          body: 'La lógica visual puede extenderse a stills, motion, estudios de material y formatos específicos.',
        },
      ],
      breakdownTitle: 'Cómo se estructura el sistema.',
      breakdownBody:
        'El mundo editorial se diseña como sistema repetible: lógica de personaje, reglas espaciales, materiales y comportamiento por formato se definen antes de escalar producción.',
      breakdown: [
        {
          label: 'Identity lock',
          title: 'Un mundo editorial controlado.',
          body:
            'eden se bloquea alrededor de figura, espacio, styling y atmósfera operando con continuidad dentro del lenguaje de campaña.',
        },
        {
          label: 'Reglas visuales',
          title: 'Tono frío, estructura brutalista y styling escultórico.',
          body:
            'Hormigón, prendas negras, vegetación densa y luz controlada definen el mood sin depender de exceso decorativo.',
        },
        {
          label: 'Lógica de producción',
          title: 'Figura y entorno funcionan juntos.',
          body:
            'La ejecución prioriza credibilidad de campaña, lógica editorial del cuerpo y coherencia espacial en cada imagen.',
        },
        {
          label: 'Mapa de formatos',
          title: 'Stills editoriales, detalles y frames preparados para motion.',
          body:
            'El mundo puede extenderse a retratos, planos cuerpo entero, estudios de localización, crops sociales y futuras piezas motion.',
        },
        {
          label: 'Handoff',
          title: 'Un vocabulario editorial reutilizable.',
          body:
            'El handoff puede documentar reglas de personaje, límites de styling, criterios tonales, lógica de localización y comportamiento de formato.',
        },
      ],
      metricsTitle: 'Snapshot del sistema.',
      metrics: [
        { value: '6', label: 'pilares de sistema' },
        { value: '4', label: 'claves materiales' },
        { value: '4', label: 'capas de continuidad' },
        { value: '4', label: 'familias escalables' },
      ],
      galleryTitle: 'Continuidad editorial.',
      galleryBody:
        'La campaña mantiene la misma presión visual en encuadre, lógica corporal y atmósfera.',
      gallery: [
        { type: 'image', src: '/images/work-eden-cover.jpg', alt: 'Hero frame editorial eden' },
        { type: 'image', src: '/images/work-eden-01.png', alt: 'Estudio de personaje eden' },
        { type: 'image', src: '/images/work-eden-02.jpg', alt: 'Estudio de arquitectura y material eden' },
        { type: 'image', src: '/images/work-eden-03.jpg', alt: 'Extensión de campaña eden' },
        { type: 'video', src: '/videos/eden-video-case.mp4', alt: 'Reel de campaña editorial eden' },
      ],
      deliverablesTitle: 'Qué puede entregar el sistema.',
      deliverables: [
        'Mundo editorial de campaña estructurado',
        'Dirección creativa y sistema visual',
        'Encuadre espacial brutalista',
        'Silueta de moda escultórica y lógica editorial del cuerpo',
        'Lenguaje material: hormigón, acero oscuro, vegetación y styling negro',
        'Sistema escalable para stills, estudios materiales, motion y publicaciones por plataforma',
      ],
      ...sharedFinal.ES,
    },
    motion: {
      slug: 'motion',
      name: 'Motion Studies',
      eyebrow: 'AI Motion Showcase',
      title: 'Un showcase vivo de sistemas motion de campaña.',
      description:
        'Un archivo solo motion para reels de campaña, teasers y experimentos de imagen en movimiento entre distintos mundos visuales.',
      heroMedia: {
        type: 'video',
        src: '/videos/eden-video-case.mp4',
        alt: 'Reel editorial de Motion Studies',
      },
      meta: [
        { label: 'Proyecto', value: 'Showcase motion continuo de HEYDE Studio' },
        { label: 'Alcance', value: 'Video IA, dirección motion y adaptación de campaña' },
        { label: 'Sistema', value: 'Lógica motion entre múltiples mundos de campaña' },
        { label: 'Formato', value: 'Reels verticales, teasers y estudios motion' },
      ],
      sections: [
        {
          kicker: 'Contexto',
          title: 'El motion demuestra si un mundo de campaña puede moverse.',
          body:
            'Este case study no está ligado a un único mundo de marca. Existe como un dump motion en crecimiento: un lugar para reunir reels, pruebas y fragmentos de campaña de distintos territorios.\nEl objetivo es mostrar cómo una identidad de campaña puede moverse sin convertirse en video genérico.',
        },
        {
          kicker: 'Dirección',
          title: 'Campañas distintas, un mismo estándar de control.',
          body:
            'Cada pieza parte de un sistema visual: ritmo, atmósfera, comportamiento de cámara, textura y formato se definen antes de generar motion.\nCon el tiempo, esta página se convierte en un showcase de cómo distintas campañas pueden producir lenguajes motion diferentes manteniendo disciplina de producción.',
        },
      ],
      systemTitle: 'Motion como capacidad de campaña.',
      systemBody:
        'El valor no es un único reel. El valor es poder crear motion repetidamente entre campañas preservando identidad, pacing e intención visual.',
      systemPoints: [
        {
          title: 'Ritmo de campaña',
          body: 'El movimiento se dirige alrededor del pacing de cada campaña, no desde defaults genéricos de animación.',
        },
        {
          title: 'Rango motion',
          body: 'El showcase puede contener reels, teasers, momentos de producto, secuencias editoriales y tests atmosféricos.',
        },
        {
          title: 'Continuidad de identidad',
          body: 'Cada clip debe conservar la atmósfera, materiales y reglas visuales del mundo del que viene.',
        },
        {
          title: 'Archivo expandible',
          body: 'La página está preparada para crecer a medida que se producen nuevos estudios motion y fragmentos de campaña.',
        },
      ],
      breakdownTitle: 'Cómo se estructura el showcase motion.',
      breakdownBody:
        'El motion se trata como comportamiento de campaña: cada clip necesita un mundo de origen claro, un rol de formato y un conjunto repetible de reglas motion.',
      breakdown: [
        {
          label: 'Mundo de origen',
          title: 'Cada pieza motion pertenece a un territorio de campaña.',
          body:
            'Un clip puede venir de fragancia, moda, producto, editorial u otro sistema de campaña, pero debe conservar un origen visual reconocible.',
        },
        {
          label: 'Reglas motion',
          title: 'Ritmo, atmósfera y comportamiento de cámara.',
          body:
            'Velocidad, transiciones, luz, textura, encuadre e intención de cámara se controlan para que el resultado se sienta dirigido.',
        },
        {
          label: 'Rol de formato',
          title: 'Cada pieza tiene una función dentro de la campaña.',
          body:
            'Algunos clips funcionan como reels, otros como teasers, fragmentos launch, momentos de producto, inserts editoriales o estudios de atmósfera.',
        },
        {
          label: 'Lógica de showcase',
          title: 'El archivo crece sin cambiar su estructura.',
          body:
            'Se pueden añadir nuevos vídeos a medida que el estudio produce más motion de campaña, convirtiendo la página en una biblioteca motion evolutiva.',
        },
        {
          label: 'Memoria de producción',
          title: 'Los aprendizajes útiles quedan unidos al motion.',
          body:
            'La misma lógica puede documentar pacing, restricciones, comportamiento de cámara, notas de formato y qué debería repetirse en futuros clips.',
        },
      ],
      metricsTitle: 'Snapshot del sistema.',
      metrics: [
        { value: '100%', label: 'showcase solo motion' },
        { value: '5', label: 'roles de formato' },
        { value: '4+', label: 'territorios de campaña con el tiempo' },
        { value: '∞', label: 'potencial de crecimiento' },
      ],
      galleryTitle: 'Showcase motion.',
      galleryBody:
        'Un dump en crecimiento de motion de campaña: reels, tests, teasers y fragmentos de imagen en movimiento desde distintos sistemas visuales.',
      gallery: [
        { type: 'video', src: '/videos/eden-video-case.mp4', alt: 'Estudio motion de campaña eden' },
        { type: 'video', src: '/videos/solea-video-case.mp4', alt: 'Estudio motion de campaña Soleá' },
        { type: 'video', src: '/videos/DG-video-case.mp4', alt: 'Estudio motion de campaña DG' },
      ],
      deliverablesTitle: 'Qué puede mostrar este archivo motion.',
      deliverables: [
        'Showcase de campaña solo motion',
        'Reels verticales y estudios teaser',
        'Tests de ritmo y pacing de campaña',
        'Fragmentos motion de producto, editorial y atmósfera',
        'Reglas reutilizables de dirección motion',
        'Archivo expandible para futuro motion de campaña',
      ],
      ...sharedFinal.ES,
    },
  },
};

export function getCaseStudyContent(language: string, slug: string) {
  const lang = language === 'ES' ? 'ES' : 'EN';
  return caseStudyContent[lang][slug];
}
