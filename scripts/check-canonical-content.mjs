import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const scopedFiles = [
  'lib/canonical.ts',
  'lib/seo.ts',
  'components/pages/HomePageContent.tsx',
  'app/(es)/planes/page.tsx',
  'app/(es)/estudio/page.tsx',
  'app/(es)/faq/page.tsx',
  'components/pages/FAQPageContent.tsx',
  'components/pages/LocalVerticalPage.tsx',
  'components/pages/CaseStudyPageContent.tsx',
  'app/(es)/hosteleria/page.tsx',
  'app/(es)/inmobiliaria/page.tsx',
  'app/(en)/en/real-estate/page.tsx',
  'app/(es)/bodegas/page.tsx',
  'app/(es)/casos/page.tsx',
];

const forbidden = [
  { pattern: /650\s*€\s*\/mes/i, reason: 'precio legacy de Crecimiento' },
  { pattern: /990\s*€\s*\/mes/i, reason: 'precio legacy de Dominio' },
  { pattern: /390\s*€\s*descontables/i, reason: 'precio legacy de la Sesión' },
  { pattern: /https:\/\/heyde\.studio/i, reason: 'dominio legacy' },
  { pattern: /Visual System Audit/i, reason: 'embudo legacy' },
  { pattern: /siempre etiquetad|todo lo generado va etiquetado/i, reason: 'política universal de IA no canónica' },
  { pattern: /Tuyo\. Para siempre|te llevas todo/i, reason: 'cesión de derechos demasiado amplia' },
  { pattern: /Trabajo real/i, reason: 'etiqueta de portfolio sin evidencia' },
  { pattern: /mejores fotos que las del móvil/i, reason: 'planteamiento legacy que desacredita producción móvil' },
  { pattern: /se nota en las reservas|se nota en las visitas|se nota en las ventas/i, reason: 'promesa comercial legacy sin evidencia' },
];

const requiredCanonicalSnippets = [
  'Contenido que hace crecer negocios locales.',
  "priceLabel: '490 €'",
  "priceLabel: '390 €/mes'",
  "priceLabel: '890 €/mes'",
  "priceLabel: '1.450 €/mes'",
  "priceLabel: '690 €/mes'",
  'active: true',
  'Los brutos y proyectos editables no se entregan salvo pacto expreso.',
  "priceLabel: '220 €'",
  "priceLabel: 'Desde 590 €'",
  "priceLabel: 'Desde 1.900 €'",
  "type: 'self_initiated'",
];

const violations = [];
for (const file of scopedFiles) {
  const source = readFileSync(join(root, file), 'utf8');
  for (const rule of forbidden) {
    if (rule.pattern.test(source)) {
      violations.push(`${file}: ${rule.reason}`);
    }
  }
}

const canonicalSource = readFileSync(join(root, 'lib/canonical.ts'), 'utf8');
for (const snippet of requiredCanonicalSnippets) {
  if (!canonicalSource.includes(snippet)) {
    violations.push(`lib/canonical.ts: falta el canon requerido: ${snippet}`);
  }
}

if (violations.length > 0) {
  console.error('Canonical content check failed:');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`Canonical content check passed (${scopedFiles.length} scoped files).`);
