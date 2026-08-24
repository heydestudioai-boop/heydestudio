export const FINAL_INDEXABLE_ROUTES = [
  '',
  '/planes',
  '/audit',
  '/casos',
  '/estudio',
  '/hosteleria',
  '/inmobiliaria',
  '/bodegas',
  '/en/real-estate',
  '/marcas',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
  '/cookies',
  '/en/privacy',
  '/en/terms',
  '/en/cookies',
] as const;

export const LEGACY_REDIRECTS = [
  { source: '/pricing', destination: '/planes', permanent: true },
  { source: '/about', destination: '/estudio', permanent: true },
  { source: '/work', destination: '/casos', permanent: true },
  { source: '/services', destination: '/marcas', permanent: true },
  { source: '/pricing/avatar-system', destination: '/marcas', permanent: true },
  { source: '/pricing/image', destination: '/marcas', permanent: true },
  { source: '/pricing/video-reel', destination: '/marcas', permanent: true },
  { source: '/pricing/campaign', destination: '/marcas', permanent: true },
  {
    source: '/pricing/system-infrastructure',
    destination: '/marcas',
    permanent: true,
  },
  {
    source: '/how-we-work',
    destination: '/estudio#como-trabajo',
    permanent: true,
  },
  {
    source: '/process',
    destination: '/estudio#como-trabajo',
    permanent: true,
  },
  { source: '/audit-questionnaire', destination: '/audit', permanent: true },
  { source: '/resources', destination: '/audit', permanent: true },
  {
    source: '/system-documentation-template',
    destination: '/audit',
    permanent: true,
  },
  {
    source: '/blog/building-visual-systems-fashion-playbook',
    destination: '/marcas',
    permanent: true,
  },
  {
    source: '/blog/why-ai-fashion-images-fail',
    destination: '/marcas',
    permanent: true,
  },
] as const;

export const GONE_ROUTES = [
  '/blog/luxury-brands-scale-production',
] as const;
