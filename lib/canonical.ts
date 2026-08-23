export const CANON_VERSION = 'HEYDE 00 v1.3.4' as const;

export const canonicalBrand = {
  name: 'HEYDE Studio',
  siteUrl: 'https://www.heydestudio.com',
  definition: 'Estudio híbrido de creación de contenido y gestión de redes para negocios locales.',
  claim: 'Contenido que hace crecer negocios locales.',
  launchProposition: 'Todo el contenido de tu negocio. Una sola persona. Un precio fijo al mes.',
  operatingPromise: 'Que te vea cada semana la gente que está a punto de comprar o reservar.',
  primaryMarket: 'Toledo',
  serviceAreas: ['Toledo y provincia', 'Castilla-La Mancha', 'Madrid', 'Costa Blanca'] as const,
} as const;

export const contentSession = {
  name: 'Sesión de Contenido',
  price: 490,
  priceLabel: '490 €',
  billing: 'pago único',
  shoot: 'Media jornada de rodaje',
  pieces: '10–15 piezas editadas y listas',
  delivery: 'Entrega en 5 días',
  conversionCredit: 'Se descuenta íntegra de la primera cuota si pasas a un plan ese mismo mes.',
} as const;

export type MonthlyPlanId = 'base' | 'growth' | 'dominance';

export interface MonthlyPlan {
  id: MonthlyPlanId;
  name: string;
  price: number;
  priceLabel: string;
  promise: string;
  bestFor: string;
  features: readonly string[];
  highlighted?: boolean;
}

export const monthlyPlans: readonly MonthlyPlan[] = [
  {
    id: 'base',
    name: 'Base',
    price: 390,
    priceLabel: '390 €/mes',
    promise: 'Tú publicas: yo te lo dejo todo hecho y planificado.',
    bestFor: 'Para negocios que necesitan material constante y prefieren publicar por su cuenta.',
    features: [
      '1 rodaje corto al mes',
      '10–15 piezas editadas',
      'Guiones y calendario mensual',
      'Variantes con IA cuando aportan valor',
      'El cliente publica',
    ],
  },
  {
    id: 'growth',
    name: 'Crecimiento',
    price: 890,
    priceLabel: '890 €/mes',
    promise: 'Te olvidas de las redes: las llevo yo de principio a fin.',
    bestFor: 'Para el negocio que quiere delegar contenido, publicación y comunidad.',
    features: [
      '1 día de rodaje intensivo + 1 visita corta de refresco',
      '15–20 piezas editadas',
      'Publicación en Instagram, Facebook y TikTok',
      'Gestión de comunidad en 2 redes',
      'Revisión mensual de la ficha de Google',
      'Informe mensual',
    ],
    highlighted: true,
  },
  {
    id: 'dominance',
    name: 'Dominio',
    price: 1450,
    priceLabel: '1.450 €/mes',
    promise: 'Para negocios que quieren mandar en su sector.',
    bestFor: 'Para negocios que necesitan más volumen, campañas y prioridad de producción.',
    features: [
      'Todo lo incluido en Crecimiento',
      '25–35 piezas editadas',
      'Gestión de comunidad en 3 redes',
      'Campañas de temporada con concepto creativo',
      'Producción avanzada con IA cuando aporta valor',
      'Prioridad de agenda y línea directa',
    ],
  },
] as const;

// Único interruptor público de la oferta. No representa plazas restantes ni simula disponibilidad.
export const launchOffer = {
  active: true,
  slots: 2,
  planId: 'growth' as const,
  price: 690,
  priceLabel: '690 €/mes',
  listPriceLabel: '890 €/mes',
  duration: 'durante 6 meses',
  consideration: 'a cambio de una reseña en Google y un caso publicable',
} as const;

export const monthlyModules = [
  {
    name: 'Blog + Newsletter',
    priceLabel: '+300 €/mes',
    description: '2 artículos de blog + 1 newsletter al mes.',
  },
  {
    name: 'Tercera red gestionada',
    priceLabel: '+150 €/mes',
    description: 'Gestión de comunidad también en la tercera plataforma.',
  },
] as const;

export type SectorPackId = 'menu' | 'property' | 'villa' | 'winery' | 'weddings';

export interface SectorPack {
  id: SectorPackId;
  name: string;
  nameEn?: string;
  sector: string;
  sectorEn?: string;
  priceLabel: string;
  priceLabelEn?: string;
  description: string;
  descriptionEn?: string;
}

export const sectorPacks: readonly SectorPack[] = [
  {
    id: 'menu',
    name: 'Pack Carta',
    nameEn: 'Menu Pack',
    sector: 'Hostelería',
    sectorEn: 'Hospitality',
    priceLabel: '490 €',
    priceLabelEn: '€490',
    description: '30–40 fotos de plato, 2 reels y fotos del local y el equipo.',
    descriptionEn: '30–40 food photographs, 2 reels, plus images of the venue and team.',
  },
  {
    id: 'property',
    name: 'Pack Vivienda',
    nameEn: 'Property Pack',
    sector: 'Inmobiliario',
    sectorEn: 'Real estate',
    priceLabel: '220 €',
    priceLabelEn: '€220',
    description: '25–35 fotos HDR y 1 vídeo vertical. Entrega en 48 h.',
    descriptionEn: '25–35 HDR photographs and 1 vertical video. Delivery within 48 hours.',
  },
  {
    id: 'villa',
    name: 'Villa Premium',
    nameEn: 'Premium Villa',
    sector: 'Inmobiliario',
    sectorEn: 'Real estate',
    priceLabel: 'Desde 590 €',
    priceLabelEn: 'From €590',
    description: 'Vídeo cinematográfico, fotografía al atardecer y piezas lifestyle.',
    descriptionEn: 'Cinematic video, sunset photography and lifestyle assets.',
  },
  {
    id: 'winery',
    name: 'Campaña Bodega',
    nameEn: 'Winery Campaign',
    sector: 'Bodegas',
    sectorEn: 'Wineries',
    priceLabel: 'Desde 1.900 €',
    priceLabelEn: 'From €1,900',
    description: 'Concepto, jornada de rodaje, 25–30 piezas y 3 reels.',
    descriptionEn: 'From €1,900. Concept, one production day, 25–30 assets and 3 reels.',
  },
  {
    id: 'weddings',
    name: 'Bodas',
    nameEn: 'Weddings',
    sector: 'Temporada',
    sectorEn: 'Seasonal',
    priceLabel: 'Desde 1.800 €',
    priceLabelEn: 'From €1,800',
    description: 'Foto y vídeo bajo petición, con plazas limitadas por temporada.',
    descriptionEn: 'Photo and video on request, with limited seasonal availability.',
  },
] as const;

export function getSectorPack(id: SectorPackId) {
  const pack = sectorPacks.find((item) => item.id === id);

  if (!pack) {
    throw new Error(`Unknown canonical sector pack: ${id}`);
  }

  return pack;
}

export type CanonicalLocale = 'es' | 'en';

export interface VerticalFocusItem {
  title: string;
  body: string;
}

export interface VerticalPageModel {
  locale: CanonicalLocale;
  sector: string;
  title: string;
  intro: string;
  productionNote: string;
  focus: readonly VerticalFocusItem[];
  packIds: readonly SectorPackId[];
  area: string;
  monthlyPlans?: boolean;
  alternate?: { href: string; label: string };
  primaryCta?: { href: string; label: string; external?: boolean };
}

export const sectorVerticals: Record<'hospitality' | 'realEstateEs' | 'realEstateEn' | 'wineries', VerticalPageModel> = {
  hospitality: {
    locale: 'es',
    sector: 'Hostelería y turismo',
    title: 'Contenido que abre el apetito y mantiene vivo el negocio.',
    intro:
      'Platos, producto, local y equipo contados con la frecuencia que exige el día a día. Creamos material para trabajar la visibilidad y apoyar la comunicación de reservas sin prometer un resultado que depende de más factores.',
    productionNote:
      'Móvil para piezas sociales ágiles; cámara cuando el producto, la luz o la campaña requieren más control. El formato se decide por objetivo y canal.',
    focus: [
      { title: 'Apetito visual', body: 'Textura, detalle, servicio y contexto para que el producto se entienda de un vistazo.' },
      { title: 'Local y equipo', body: 'El espacio y las personas forman parte de la experiencia real del negocio.' },
      { title: 'Frecuencia', body: 'Piezas preparadas para carta, redes, web y ficha de Google sin depender de una única campaña.' },
    ],
    packIds: ['menu'],
    area: 'Toledo, provincia y proyectos de temporada.',
    monthlyPlans: true,
  },
  realEstateEs: {
    locale: 'es',
    sector: 'Inmobiliaria',
    title: 'Espacio, luz y recorrido antes de la visita.',
    intro:
      'Cada inmueble pide una lectura distinta. Producimos fotografía, vídeo y piezas sociales para explicar distribución, atmósfera y entorno sin añadir promesas comerciales.',
    productionNote:
      'Fotografía, vídeo y contenido social se combinan según el inmueble, el canal y el nivel de producción que necesita la propiedad.',
    focus: [
      { title: 'Vivienda', body: 'Imágenes claras para mostrar estancias, proporciones, luz y relación entre espacios.' },
      { title: 'Recorrido', body: 'Vídeo vertical o cinematográfico cuando ayuda a entender la experiencia de la propiedad.' },
      { title: 'Publicación', body: 'Piezas preparadas para portales, web y canales sociales según el encargo.' },
    ],
    packIds: ['property', 'villa'],
    area: 'Toledo, Madrid y Costa Blanca.',
    alternate: { href: '/en/real-estate', label: 'English version' },
  },
  realEstateEn: {
    locale: 'en',
    sector: 'Real estate',
    title: 'Space, light and flow before the viewing.',
    intro:
      'Every property needs a different visual approach. We produce photography, video and social assets that explain layout, atmosphere and surroundings without making commercial promises.',
    productionNote:
      'Photography, video and social-first content are combined according to the property, the channel and the required production level.',
    focus: [
      { title: 'Property', body: 'Clear images that show rooms, proportions, natural light and the relationship between spaces.' },
      { title: 'Flow', body: 'Vertical or cinematic video when movement helps communicate the experience of the property.' },
      { title: 'Publishing', body: 'Assets prepared for listings, websites and social channels according to the brief.' },
    ],
    packIds: ['property', 'villa'],
    area: 'Toledo, Madrid and Costa Blanca.',
    alternate: { href: '/inmobiliaria', label: 'Versión en español' },
    primaryCta: {
      href: 'https://wa.me/34671141135?text=Hello%20HEYDE%20Studio%2C%20I%20would%20like%20to%20discuss%20real%20estate%20content',
      label: 'Discuss a property',
      external: true,
    },
  },
  wineries: {
    locale: 'es',
    sector: 'Bodegas',
    title: 'La bodega completa: finca, elaboración, personas y producto.',
    intro:
      'Una campaña puede unir origen, proceso, botella, equipo, visitas y experiencia en un mismo relato visual, con piezas preparadas para distintos canales.',
    productionNote:
      'La dirección y el formato se plantean alrededor de la finca, la elaboración y la experiencia real de la bodega, no desde imágenes genéricas de moda o producto.',
    focus: [
      { title: 'Origen y elaboración', body: 'Finca, viñedo, bodega y proceso como partes conectadas de la historia.' },
      { title: 'Personas y producto', body: 'Equipo, oficio, botella, detalle y servicio con una dirección visual coherente.' },
      { title: 'Visitas y experiencia', body: 'Contenido para presentar el lugar y su experiencia en web, redes y comunicación comercial.' },
    ],
    packIds: ['winery'],
    area: 'Castilla-La Mancha y proyectos seleccionados.',
  },
};

export const commercialConditions = [
  'Permanencia inicial de 3 meses; después, 30 días de aviso.',
  'Precios sin IVA (21 %).',
  'Desplazamiento incluido en Toledo capital y alrededores.',
  'Los finales entregados son del cliente según las condiciones del contrato.',
  'Los brutos y proyectos editables no se entregan salvo pacto expreso.',
] as const;

export const aiPolicy = {
  short: 'El rodaje es real, con cámara o móvil y oficio. La IA amplía formatos y variantes cuando aporta valor.',
  disclosure:
    'El contenido materialmente generado o manipulado se identifica cuando lo exige la normativa y cuando omitirlo podría inducir a error sobre el negocio, sus productos, personas o experiencias.',
} as const;

export const rightsPolicy =
  'Los finales entregados son tuyos en los términos del contrato. Los brutos y proyectos editables no están incluidos salvo acuerdo expreso.';

export interface CanonicalFaqItem {
  question: string;
  answer: string;
}

export interface CanonicalFaqSection {
  title: string;
  items: readonly CanonicalFaqItem[];
}

export const localFaqSections: readonly CanonicalFaqSection[] = [
  {
    title: 'Oferta y contratación',
    items: [
      {
        question: '¿Por dónde empiezo?',
        answer:
          'Puedes pedir una auditoría gratuita sin reservar una reunión. Si necesitas material puntual, la Sesión de Contenido cuesta 490 € y se descuenta íntegra si pasas a plan ese mismo mes.',
      },
      {
        question: '¿Qué diferencia hay entre Base, Crecimiento y Dominio?',
        answer:
          'Base te deja el contenido preparado para que publiques. Crecimiento añade publicación, comunidad en dos redes, revisión de Google e informe. Dominio aumenta el volumen, gestiona tres redes y añade campañas, producción avanzada y prioridad.',
      },
      {
        question: '¿Hay permanencia?',
        answer: 'Sí. La permanencia inicial es de 3 meses. Después puedes cancelar con 30 días de aviso.',
      },
      {
        question: '¿Los precios incluyen IVA?',
        answer: 'No. Los precios publicados no incluyen el IVA del 21 %.',
      },
    ],
  },
  {
    title: 'Producción y publicación',
    items: [
      {
        question: '¿Quién publica el contenido?',
        answer:
          'En Base publicas tú con todo preparado y planificado. En Crecimiento y Dominio, HEYDE publica en Instagram, Facebook y TikTok y gestiona la comunidad incluida en cada plan.',
      },
      {
        question: '¿Trabajáis con cámara, móvil o IA?',
        answer:
          'Con los tres cuando tiene sentido. El formato se decide por objetivo y canal: cámara o móvil para mostrar el negocio real, e IA para ampliar formatos, variantes o campañas cuando aporta valor.',
      },
      {
        question: '¿Cómo se identifica el uso de IA?',
        answer: aiPolicy.disclosure,
      },
      {
        question: '¿Cuánto tarda la entrega de una sesión puntual?',
        answer: 'La Sesión de Contenido incluye 10–15 piezas editadas y se entrega en 5 días.',
      },
    ],
  },
  {
    title: 'Derechos, archivos y zona',
    items: [
      {
        question: '¿De quién son las piezas?',
        answer: rightsPolicy,
      },
      {
        question: '¿Entregáis brutos o editables?',
        answer: 'No están incluidos. Solo se entregan si se acuerda expresamente y queda reflejado en el presupuesto o contrato.',
      },
      {
        question: '¿Está incluido el desplazamiento?',
        answer:
          'Está incluido en Toledo capital y alrededores. Los desplazamientos fuera de esa zona se presupuestan según el proyecto.',
      },
      {
        question: '¿Trabajáis fuera de Toledo?',
        answer: 'Sí. HEYDE trabaja en Toledo, Castilla-La Mancha, Madrid y Costa Blanca según el servicio y el proyecto.',
      },
    ],
  },
] as const;

export type LeadIntent = 'local_audit' | 'brand_inquiry';
export type ProjectType = 'client' | 'self_initiated' | 'internal';

export interface PublicProjectEvidence {
  publishingPermission: boolean;
  resultsSource?: string;
}

export interface PublicProjectGuardInput {
  type: ProjectType;
  clientName?: string;
  results?: readonly string[];
  evidence?: PublicProjectEvidence;
}

export function assertProjectCanBePublished(project: PublicProjectGuardInput) {
  if (project.type === 'client' && !project.evidence?.publishingPermission) {
    throw new Error('A client project requires explicit publishing permission.');
  }

  if (project.type !== 'client' && project.clientName) {
    throw new Error('Self-initiated and internal projects cannot be attributed to a client.');
  }

  if (project.results?.length && !project.evidence?.resultsSource) {
    throw new Error('Commercial results require a traceable evidence source.');
  }

  return project;
}

export interface LabProject extends PublicProjectGuardInput {
  type: 'self_initiated';
  slug: 'solea' | 'eden' | 'motion';
  name: string;
  summary: string;
  summaryEn: string;
  href: string;
  media: {
    type: 'image' | 'video';
    src: string;
    alt: string;
    altEn: string;
  };
}

function defineLabProject(project: LabProject) {
  assertProjectCanBePublished(project);
  return project;
}

export const labProjects: readonly LabProject[] = [
  defineLabProject({
    type: 'self_initiated',
    slug: 'solea',
    name: 'Soleá',
    summary:
      'Exploración autoiniciada de producto, luz mediterránea e identidad visual. Demuestra dirección y consistencia; no resultados comerciales.',
    summaryEn:
      'A self-initiated exploration of product, Mediterranean light and visual identity. It demonstrates direction and consistency, not commercial results.',
    href: '/case-studies/solea',
    media: {
      type: 'image',
      src: '/images/work-solea-cover.jpg',
      alt: 'Soleá, proyecto autoiniciado de HEYDE Lab',
      altEn: 'Soleá, a self-initiated HEYDE Lab project',
    },
  }),
  defineLabProject({
    type: 'self_initiated',
    slug: 'eden',
    name: 'Eden',
    summary:
      'Proyecto autoiniciado de lenguaje editorial, espacio y dirección de imagen. Prueba capacidad creativa; no es un encargo de cliente.',
    summaryEn:
      'A self-initiated study of editorial language, space and image direction. It demonstrates creative capability and is not a client commission.',
    href: '/case-studies/eden',
    media: {
      type: 'image',
      src: '/images/work-eden-cover.jpg',
      alt: 'Eden, proyecto autoiniciado de HEYDE Lab',
      altEn: 'Eden, a self-initiated HEYDE Lab project',
    },
  }),
  defineLabProject({
    type: 'self_initiated',
    slug: 'motion',
    name: 'Motion Studies',
    summary:
      'Archivo autoiniciado de pruebas de movimiento, ritmo y adaptación de campaña. No representa trabajo ni resultados de un cliente.',
    summaryEn:
      'A self-initiated archive of motion, pacing and campaign adaptation studies. It does not represent client work or results.',
    href: '/case-studies/motion',
    media: {
      type: 'video',
      src: '/images/work-motion-cover.mp4',
      alt: 'Motion Studies, proyecto autoiniciado de HEYDE Lab',
      altEn: 'Motion Studies, a self-initiated HEYDE Lab project',
    },
  }),
] as const;

export function getLabProject(slug: string) {
  return labProjects.find((project) => project.slug === slug);
}
