# Lote 6 — Legacy cleanup, routes y SEO

Fecha de validación: 23 de agosto de 2026

Branch: `codex/lote-6-legacy-cleanup`

Base aprobada: `94847ea`

Ámbito: branch y Preview exclusivamente. Production, `/audit`, `/contact`, HubSpot, Brevo, variables, crons y automatizaciones no se han modificado.

## Resultado

El runtime público deja de servir las rutas, contenidos, formularios, endpoints, emails y componentes desconectados del HEYDE anterior. Las URLs antiguas terminan directamente en su equivalente canónico mediante 308, salvo el artículo que atribuía historia y ROI fabricados a Soleá, que responde 410 Gone.

## Pre-cleanup de Playwright

`.playwright-cli` contenía únicamente un log temporal generado durante QA y no contenía configuración de test. El artefacto se retiró y se añadió `/.playwright-cli/` a `.gitignore`. La QA de este lote guardó sus artefactos fuera del repositorio.

## 1. Rutas retiradas

Se retiraron las implementaciones App Router de:

- `/about`
- `/audit-questionnaire`
- `/blog/[slug]`
- `/how-we-work`
- `/pricing` y `/pricing/[slug]`
- `/process`
- `/resources`
- `/services`
- `/system-documentation-template`
- `/work`

También se eliminó `app/page.tsx.backup`. `/blog` permanece como archivo técnico sobrio y no indexable.

## 2. Mapa final 308/410

Los 308 se definen una sola vez en `lib/routePolicy.ts` y se consumen desde `next.config.ts`. Ningún destino es a su vez un origen legacy.

| Origen | Respuesta | Destino final |
|---|---:|---|
| `/pricing` | 308 | `/planes` |
| `/about` | 308 | `/estudio` |
| `/work` | 308 | `/casos` |
| `/services` | 308 | `/marcas` |
| `/pricing/avatar-system` | 308 | `/marcas` |
| `/pricing/image` | 308 | `/marcas` |
| `/pricing/video-reel` | 308 | `/marcas` |
| `/pricing/campaign` | 308 | `/marcas` |
| `/pricing/system-infrastructure` | 308 | `/marcas` |
| `/how-we-work` | 308 | `/estudio#como-trabajo` |
| `/process` | 308 | `/estudio#como-trabajo` |
| `/audit-questionnaire` | 308 | `/audit` |
| `/resources` | 308 | `/audit` |
| `/system-documentation-template` | 308 | `/audit` |
| `/blog/building-visual-systems-fashion-playbook` | 308 | `/marcas` |
| `/blog/why-ai-fashion-images-fail` | 308 | `/marcas` |
| `/blog/luxury-brands-scale-production` | 410 | Gone + `X-Robots-Tag: noindex, nofollow` |

El fragmento `#como-trabajo` se conserva porque `/estudio` publica un `id="como-trabajo"` estable y semánticamente equivalente.

## 3. Blog legacy

- El artículo que fabricaba empresa, historia, ingresos y ROI de Soleá devuelve 410 y no redirige a un caso comercial.
- Los otros dos artículos AI/fashion se retiran de navegación, sitemap e indexación y redirigen directamente a `/marcas`, donde sí existe una equivalencia legítima de capacidad creativa y HEYDE Lab.
- `/blog` no contiene artículos, comentarios ni métricas. Explica que el archivo está en revisión, enlaza a `/marcas` y `/casos#heyde-lab`, y publica `noindex, nofollow`.

## 4. Fake social proof eliminado

Se retiraron del runtime:

- el comentario precargado de “Sarah Johnson” y la simulación de publicación;
- testimonios y logos ficticios;
- métricas, ahorros, ocupación, ventas y ROI inventados;
- copy que trataba Soleá, Eden o Motion como prueba comercial;
- categorías legacy como “AI Visual Systems”, “Visual System Audit”, “Identity Lock”, “Avatar System” y “Visual Infrastructure”.

Soleá, Eden y Motion Studies permanecen como HEYDE Lab, proyectos autoiniciados y no clientes. Sus páginas mantienen avisos explícitos de que no atribuyen cliente, ventas, ROI, métricas ni testimonio.

## 5. Endpoints y backend

La clasificación se realizó contra imports, rutas, tests, configuración de crons y documentación de cutover. El rollback legacy ya no es requerido y el cron count aprobado es cero.

### SAFE_TO_DELETE — retirados

| Endpoint o módulo | Motivo |
|---|---|
| `/api/lead-capture` | Sin consumidores; reemplazado por los funnels actuales. |
| `/api/audit/questionnaire` | Questionnaire legacy sin consumidor. |
| `/api/audit/webhooks/calendly` | Webhook legacy sin cron ni consumidor. |
| `/api/calendly/sync` | Sync legacy con cron deshabilitado y sin rollback requerido. |
| `/api/followups/run` | Follow-up legacy cerrado y sin reactivación prevista. |
| `/api/hubspot/deals/update-stage` | Stage mutation legacy sin consumidor actual. |
| `/api/emails/send` | Envío genérico legacy sin consumidor. |
| `/api/internal/audit/brevo-test` | Gate temporal de QA ya retirado. |
| `/api/test/email` | Endpoint de test sin uso. |
| `/api/lead-magnet` | Recurso legacy sin consumidor. |
| `/api/newsletter/subscribe` | Newsletter legacy desconectada. |
| `/api/template-download/submit` | Entrega de template retirada. |
| `/api/download/template` | Descarga legacy retirada. |

Todos responden 404 en el build local final.

También se retiraron las funciones HubSpot/Brevo que solo daban soporte a esos endpoints: Deal automático legacy, Calendly lookup, actualización genérica de etapa, follow-ups, newsletter y contactos genéricos legacy.

### STILL_REFERENCED — conservados

| Endpoint | Motivo |
|---|---|
| `/api/audit/requests` | Funnel de auditoría v1 actual. |
| `/api/contact/submit` | Brand inquiry actual. |
| `/api/hubspot/health` | Health check actual. |
| `/api/brevo/health` | Health check actual. |
| `/api/internal/audit/create-proposal-deal` | Acción manual/protegida actual posterior a auditoría entregada; no forma parte del auto-Deal legacy. |

`KEEP_FOR_ROLLBACK`: ninguno.

`UNKNOWN`: ninguno tras reconciliar imports y rutas.

No se llamó a ningún endpoint funcional durante esta limpieza y no se modificó ningún servicio externo.

## 6. Emails legacy

Se retiraron del runtime:

- el índice de plantillas legacy;
- welcome/Visual System Audit;
- reminder;
- post-audit follow-up;
- no-response follow-up;
- proposal-sent legacy;
- emails de questionnaire, recursos y templates asociados a endpoints retirados.

Se conservan exclusivamente:

- `auditRequestConfirmation.ts`, usado por `/api/audit/requests`;
- `brandInquiryConfirmation.ts`, usado por `/api/contact/submit`.

No se modificaron templates externos de Brevo ni se envió email.

## 7. Sitemap y robots

El sitemap se construye desde una allowlist de rutas finales indexables más los tres proyectos canónicos de HEYDE Lab. Incluye:

- rutas ES actuales;
- `/marcas` y `/contact`;
- `/en/real-estate`;
- legales finales;
- Soleá, Eden y Motion Studies.

No incluye `/blog`, redirects, 410, rutas retiradas ni artículos legacy. `/inmobiliaria` y `/en/real-estate` conservan `es-ES`, `en` y `x-default` recíprocos. Robots permite rastrear las rutas públicas y bloquea `/api/`; así los buscadores pueden observar los 308 y el 410.

## 8. SEO y structured data

- Host canónico único: `https://www.heydestudio.com`.
- Todas las rutas QA publican canonical propio al host aprobado.
- `<html lang="es">` en la experiencia local y `<html lang="en">` en `/marcas`, `/contact` y `/en/real-estate`.
- OpenGraph y metadata proceden de helpers actuales; se eliminaron entradas SEO de páginas legacy.
- Person apunta a `/estudio`, nunca a `/about`.
- Organization y LocalBusiness describen el estudio actual y no contienen reviews, `aggregateRating`, awards, clientes ni resultados.
- Service se publica como lista de servicios actuales con destino `/planes`.
- FAQPage consume las preguntas canónicas de `lib/canonical.ts`.
- No se publica OfferCatalog separado: duplicaría precios dentro de schema y volvería a introducir un segundo origen de verdad frente a `lib/canonical.ts`.
- No se publica BreadcrumbList porque la interfaz no presenta breadcrumbs; no se inventó una jerarquía visual inexistente.

## 9. Búsqueda global legacy

La búsqueda runtime/public final no encuentra:

- AI Visual Systems;
- Visual System Audit;
- visual bottleneck;
- Identity Lock;
- Avatar System;
- Visual Infrastructure;
- maison;
- Sarah Johnson;
- precios legacy 650/990;
- cifras fabricadas 716 % / 321k;
- savings/occupancy;
- Calendly o `/20min`.

Coincidencias justificadas:

- `390 €/mes`: precio canónico actual del plan Base en `lib/canonical.ts`, no la sesión legacy.
- `ROI` y `sales/ventas`: aparecen únicamente en avisos explícitos de “no claim” para HEYDE Lab.
- `Sales`: valor de `contactType` de Schema.org para el punto de contacto; no es una afirmación de resultados.
- `heyde.studio`: únicamente el handle válido de Instagram/Threads; el host canónico continúa siendo `www.heydestudio.com`.
- Tests y scripts contienen términos legacy solo como patrones negativos que impiden su reintroducción; la documentación histórica queda fuera del runtime.

`npm run test:legacy` hace fallar CI si reaparecen destinos internos legacy, fake proof conocido, Calendly o precios legacy en el runtime.

## 10. Archivos y assets

Se retiraron más de 14.000 líneas de código desconectado: páginas, componentes duplicados, secciones antiguas, `siteContent`, i18n legacy, artículos, pricing legacy, formatters, testimonials, follow-ups y plantillas sin consumidor.

Assets retirados:

- SVGs starter no usados: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`;
- `HEYDE_Story_Portfolio.jpg`;
- monograma blanco no usado (se conserva el favicon activo);
- secuencia legacy `s1-gancho.jpg` a `s6-cta.jpg`.

Assets conservados:

- logos actuales y favicon;
- hero local y fallback;
- retrato de Oliver;
- todos los covers, imágenes y vídeos de Soleá, Eden y Motion Studies usados por HEYDE Lab.

Las eliminaciones quedan recuperables mediante Git. No se generaron fotografías ni supuestos assets de cliente.

## 11. QA

Entorno local sobre build de producción (`next start`):

- desktop: 1440 × 1000;
- mobile: 390 × 844;
- rutas: `/`, `/planes`, `/audit`, `/casos`, `/estudio`, `/hosteleria`, `/inmobiliaria`, `/en/real-estate`, `/bodegas`, `/marcas`, `/contact`, `/faq`;
- extra: `/blog`, todos los redirects legacy, 410 y endpoints retirados.

Resultado:

- 200 en las 12 rutas públicas objetivo;
- header, footer y navegación móvil operativos;
- canonicals y lang correctos;
- hreflang correcto en inmobiliaria ES/EN;
- sin imágenes rotas;
- sin overflow horizontal;
- sin errores de consola ni page errors;
- formularios inspeccionados sin envío;
- `/blog` en 200 + `noindex, nofollow`, sin fake proof;
- 16 respuestas 308 con `Location` directo;
- 410 con `X-Robots-Tag` correcto;
- 13 endpoints retirados en 404.

El navegador integrado no pudo inicializarse por `failed to write kernel assets: ... (os error 3)`. La QA se completó con el fallback Playwright CLI y artefactos fuera del repositorio.

## 12. Checks

| Check | Resultado |
|---|---|
| `npm run check:canon` | PASS — 19 archivos scoped |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS — 30 páginas generadas, 5 API handlers actuales, sin warnings |
| `npm audit --omit=dev` | PASS — 0 vulnerabilidades |
| `npm run test:audit` | PASS — 16/16 |
| `npm run test:brand` | PASS — 12/12 |
| `npm run test:legacy` | PASS — 7/7 |

## 13. Elementos legacy que permanecen intencionadamente

- El evento externo de Calendly `/20min`, sin consumidores en la web, porque su borrado no está autorizado en este lote.
- Datos históricos de HubSpot y TEST data, sin modificación.
- Variables legacy que puedan seguir existiendo en Vercel, porque no se autorizó modificar variables.
- Documentación histórica/migración, necesaria como registro de decisiones.
- Términos legacy dentro de tests/scripts solo como aserciones negativas.
- HEYDE Lab y sus buenos assets, correctamente etiquetados como autoiniciados y no clientes.

## 14. Decisiones pendientes del owner

- Aprobar el despliegue de este lote a Production después de revisar Preview.
- Decidir en un lote futuro si `/blog` se retira por completo o vuelve a publicarse con contenido canónico verificable.
- Autorizar por separado cualquier limpieza futura del evento Calendly `/20min`, datos históricos de CRM o variables legacy.
- Completar los datos jurídicos del owner en el lote legal/final; esta limpieza no inventa ni cierra información jurídica.

## Preview

URL: `https://heydestudio-o9z0rky0s-heydestudioai-8944s-projects.vercel.app`

Deployment: `dpl_FiMMgmoKvryVeubnVEN3VH8afZ7f` — target `preview`, estado `READY`.

Verificación remota con Deployment Protection bypass autenticado:

- 200 en las 12 rutas QA, `/blog`, `/sitemap.xml` y `/robots.txt`;
- 16 redirects 308 con el `Location` directo aprobado;
- 410 + `noindex, nofollow` en el artículo fabricado de Soleá;
- 404 en los 13 endpoints retirados;
- `lang`, canonical y robots correctos;
- hreflang `es-ES`, `en` y `x-default` presente en ambas versiones inmobiliarias;
- sitemap en `www.heydestudio.com`, con `/marcas` y sin URLs legacy.

STOP antes de Production.
