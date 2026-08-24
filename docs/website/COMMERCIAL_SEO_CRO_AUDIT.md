# HEYDE Studio — Commercial UX / CRO + On-page SEO audit

Fecha: 24 de agosto de 2026

Baseline: `ca7daf5` (`codex/lote-7-release-candidate`)

Ámbito: branch y Preview. Production, oferta, precios, funnels, CRM, Brevo, variables, crons y automatizaciones permanecen sin cambios.

## 1. Método y baseline

- Auditoría de `/`, `/planes`, `/audit`, `/estudio`, `/hosteleria`, `/inmobiliaria`, `/bodegas`, `/casos`, `/marcas` y `/contact`.
- 20 renderizados reales: desktop `1440×1000` y mobile `390×844`.
- Todas las rutas: HTTP `200`, un único `h1`, canonical e idioma correctos, cero overflow horizontal, cero imágenes sin `alt` y cero errores de consola observados.
- Se revisaron first screen, densidad, secuencia comercial, CTA, formularios sin submit, enlazado interno, metadata, headings, media, fuentes y JSON-LD.
- El Browser integrado no pudo inicializar sus assets (`failed to write kernel assets: path not found`); se utilizó Playwright CLI como fallback real sobre el build local.
- Criterio SEO contrastado con la guía vigente de [Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), sus [directrices de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) y la guía de [rendimiento de vídeo de web.dev](https://web.dev/learn/performance/video-performance).

## 2. Resumen ejecutivo

No se detecta ningún hallazgo `CRITICAL`. La propuesta comercial, precios, condiciones y separación HEYDE Lab/cliente están correctamente preservados.

Los riesgos `HIGH` son de implementación, no de modelo:

1. `/planes`, `/estudio`, `/casos` y `/contact` no ofrecen una acción comercial inequívoca dentro del first screen móvil.
2. Las verticales locales colocan tres facts apilados antes de la CTA y cierran con WhatsApp como única acción, aunque el funnel local aprobado debe priorizar `/audit`.
3. El vídeo HEYDE Lab de `10,91 MiB` se solicita antes de llegar a la sección y llegó a transferir aproximadamente `8,29 MiB` durante el baseline de `/`, `/casos` y `/marcas`.
4. El hero de Home usa un vídeo de `7,71 MiB` también en móvil, aunque existe un poster coherente de `0,66 MiB` que puede servirse optimizado sin perder la identidad visual.

La web ya tiene una jerarquía visual consistente, precios visibles, buen contraste y formularios legibles. La intervención recomendada es puntual: añadir o recolocar CTA, hacer más directa la apertura de `/casos`, ajustar dos superficies SEO y diferir media pesada.

## 3. Hallazgos priorizados

| ID | Prioridad | Ruta/s | Hallazgo | Acción | Decisión |
|---|---|---|---|---|---|
| H-01 | HIGH | `/planes` | Explica oferta y precio en 5 segundos, pero el hero no contiene CTA; en mobile el CTA global está dentro del menú. | `ADD CTA` | Añadir `/audit` como primary y un ancla a los planes como secondary. |
| H-02 | HIGH | `/estudio` | First section móvil de `1.065 px`; comunica quién dirige el trabajo, pero no ofrece siguiente paso antes de la imagen. | `ADD CTA` | Añadir CTA a `/audit` tras la introducción. |
| H-03 | HIGH | verticales ES | First sections móviles de `1.352–1.420 px`; los tres facts empujan la CTA. El cierre usa WhatsApp como única acción. | `RESTRUCTURE` + `ADD CTA` | Colocar CTA antes de facts y cerrar con `/audit` primary + WhatsApp secondary. No alterar el flujo EN aprobado. |
| H-04 | HIGH | `/casos` | El H1 “Método comercial y exploración creativa” es abstracto y no hay CTA en first screen. | `TIGHTEN` + `ADD CTA` | Nombrar explícitamente trabajo con negocios y HEYDE Lab; añadir `/audit` y ancla a Lab. |
| H-05 | HIGH | `/contact` | El propósito está claro, pero el único enlace visible lleva al funnel local; el formulario de marcas no tiene acceso directo desde el hero. | `ADD CTA` | Añadir “Start the project brief” hacia el formulario. |
| H-06 | HIGH | `/`, `/casos`, `/marcas` | Motion Studies se descarga anticipadamente pese a estar below the fold. | `RESTRUCTURE` | Adjuntar el source solo al aproximarse al viewport; mantener autoplay y visual cuando sea visible. |
| H-07 | HIGH | `/` | El hero de `7,71 MiB` compite por ancho de banda en móvil. | `RESTRUCTURE` | Poster optimizado en todos los dispositivos; vídeo diferido solo en desktop y respetando reduced motion. |
| M-01 | MEDIUM | `/` | `877` palabras, `9` H2 y `72` párrafos. La secuencia es correcta, pero el FAQ completo alarga una landing ya autosuficiente. | `TIGHTEN` | Mostrar cuatro objeciones comerciales y enlazar `/faq`; no eliminar información, solo moverla a su página canónica. |
| M-02 | MEDIUM | `/` | El title actual prioriza una promesa genérica y no la intención local principal. | `SEO ADAPT` | Usar servicio + Toledo en title, conservando el H1 comercial. |
| M-03 | MEDIUM | `/casos` | Keywords actuales solapan Home/Estudio aunque la página no publica casos de cliente. | `SEO ADAPT` | Orientar title/description/keywords a proceso audiovisual + HEYDE Lab. |
| M-04 | MEDIUM | `/`, `/estudio`, `/casos`, `/marcas` | Varias imágenes responsive no declaran `sizes`, lo que puede provocar candidatos sobredimensionados. | `RESTRUCTURE` | Añadir `sizes` fieles al layout sin sustituir assets. |
| O-01 | OPTIONAL | global | Organization, LocalBusiness, Person, WebSite e ItemList se emiten en todos los roots, incluso rutas EN avanzadas. Google recomienda que Organization viva en Home o About y que el schema represente el foco de la página. | `KEEP` | No tocar arquitectura/schema en esta fase. Revisar por separado si se desea reducir el grafo por layout. |
| O-02 | OPTIONAL | mobile | WhatsApp flotante no solapa controles en los 20 renderizados, aunque ocupa espacio visual en páginas con CTA fuerte. | `KEEP` | Mantener; ya está retirado de verticales con contacto inline. |

## 4. Auditoría por página

| Ruta | First-screen clarity | Densidad y secuencia | CTA | Decisión |
|---|---|---|---|---|
| `/` | Qué, para quién, precio mensual y zonas se entienden en 5 segundos. | Completa y bien ordenada; es la página más larga (`877` palabras). | `/audit` primary y `/planes` secondary visibles en ambos viewports. | `KEEP` hero/copy; `TIGHTEN` FAQ; `SEO ADAPT`; optimizar media. |
| `/planes` | Qué recibe y que existe precio cerrado quedan claros. | Cards y bullets escaneables; `461` palabras sin párrafos excesivos. | Ningún CTA de main visible en first screen. | `ADD CTA`; resto `KEEP`. |
| `/audit` | Beneficio, plazo, fricción y gratuidad claros. | `175` palabras; promesas, revisión y formulario bien secuenciados. | CTA visible hacia el formulario. | `KEEP`. No tocar funnel ni submit. |
| `/estudio` | Se entiende quién responde; el descriptor aclara qué hace HEYDE. | `290` palabras y bloques razonables, pero hero alto en móvil. | Sin CTA visible. | `ADD CTA`; copy `KEEP`. |
| `/hosteleria` | Sector, apetito visual, frecuencia y producción quedan claros. | `249` palabras; intro más larga del grupo (`221` caracteres), aún legible. | CTA aparece al límite inferior; cierre se desvía a WhatsApp. | `RESTRUCTURE` CTA; copy/pack `KEEP`. |
| `/inmobiliaria` | Servicio, inmueble y formatos claros; EN visible. | `182` palabras, alta escaneabilidad. | CTA visible, pero cierre se desvía a WhatsApp. | `RESTRUCTURE` CTA; copy/packs `KEEP`. |
| `/bodegas` | Finca, elaboración, personas y producto se entienden de inmediato. | `167` palabras; estructura compacta. | CTA en el límite inferior; cierre se desvía a WhatsApp. | `RESTRUCTURE` CTA; copy/pack `KEEP`. |
| `/casos` | La separación es ética, pero el H1 requiere interpretación y no indica el siguiente paso. | `253` palabras; el párrafo de explicación llega a `241` caracteres. | Sin CTA visible. | `TIGHTEN`, `ADD CTA`, `SEO ADAPT`, lazy video. |
| `/marcas` | Producción avanzada, audiencia y método quedan claros en inglés. | `381` palabras; capabilities → audience → Lab → engagement funciona. | `/contact` primary y Lab secondary visibles. | `KEEP` copy/CTA; lazy video y `sizes`. |
| `/contact` | Se entiende que se pide un brief, pero la acción de marcas queda fuera del hero. | Formulario corto, campos bien agrupados y pricing por alcance aclarado. | El único enlace visible conduce a `/audit`. | `ADD CTA` al formulario; no tocar submit. |

## 5. Intención SEO por landing

| Ruta | Intención principal | Intenciones secundarias | Title recomendado |
|---|---|---|---|
| `/` | estudio de contenido y redes sociales para negocios en Toledo | fotografía comercial Toledo; vídeo para negocios; contenido local Castilla-La Mancha | `Fotografía, vídeo y redes sociales en Toledo | HEYDE Studio` |
| `/planes` | planes y precios de contenido para negocios en Toledo | precios fotografía/vídeo; gestión mensual de redes; sesión de contenido | Mantener actual. |
| `/audit` | auditoría gratuita de presencia digital para negocios en Toledo | auditoría redes sociales; Google Business; web móvil | Mantener actual. |
| `/estudio` | estudio audiovisual y de contenido en Toledo | Oliver Heyde; fotógrafo/vídeo para negocios; producción híbrida | Mantener actual. |
| `/hosteleria` | fotografía y vídeo para hostelería en Toledo | contenido para restaurantes; reels de gastronomía; hoteles y turismo | Mantener actual. |
| `/inmobiliaria` | fotografía inmobiliaria en Toledo | vídeo inmobiliario; contenido para villas; Costa Blanca; Madrid | Mantener actual. |
| `/bodegas` | fotografía y vídeo para bodegas en Castilla-La Mancha | campaña para bodegas; contenido enoturismo; producto y finca | Mantener actual. |
| `/casos` | proceso de producción audiovisual para negocios | portfolio creativo Toledo; HEYDE Lab; dirección visual | `Proceso de producción audiovisual y HEYDE Lab | HEYDE Studio` |
| `/marcas` | creative production for brands and agencies | campaign production; social-native content; hybrid/generative production | Mantener actual. |
| `/contact` | start a creative production project | campaign brief; production inquiry; HEYDE Studio contact | Mantener actual. |

### Cannibalización

- Home debe concentrar la búsqueda local general: fotografía + vídeo + redes + Toledo.
- `/estudio` conserva intención de marca/persona/método.
- `/casos` deja de competir por “fotografía para negocios Toledo” y se centra en proceso + HEYDE Lab.
- Las tres verticales conservan intención sectorial inequívoca.
- `/planes` mantiene intención transaccional; `/audit`, intención de entrada al funnel.
- `/marcas` y `/contact` permanecen en inglés y no compiten con el funnel local.

## 6. Local SEO y datos estructurados

Estado actual: JSON-LD válido con `Organization`, `LocalBusiness`, `Person`, `WebSite` e `ItemList`; teléfono, email, URLs, `sameAs` y áreas coinciden con el contenido visible. No hay ratings, reviews, horarios ni resultados inventados. No se añade domicilio al schema, respetando la decisión de limitar la identidad legal a páginas legales.

Decisión de esta fase: `KEEP`. Toledo aparece primero en Home, Estudio, footer y oferta general; Castilla-La Mancha, Madrid y Costa Blanca se usan solo donde corresponde. La posible reducción del grafo global se documenta como `OPTIONAL`, no como cambio CRO.

## 7. Rendimiento y media

| Recurso | Tamaño fuente | Observación baseline | Acción |
|---|---:|---|---|
| `/videos/hero.mp4` | `7,71 MiB` | Autoplay en Home desktop y móvil; poster disponible. | Poster optimizado + vídeo diferido solo desktop. |
| `/images/hero-fallback-cover.jpg` | `0,66 MiB` | Visual coherente y ya declarado como poster. | Servir con `next/image`, `priority` y `sizes=100vw`. |
| `/images/work-motion-cover.mp4` | `10,91 MiB` | Aproximadamente `8,29 MiB` descargados antes de llegar a Lab. | Source lazy mediante IntersectionObserver. |
| `/images/oliver-heyde.jpeg` | `2,53 MiB` | Next Image optimiza, pero falta `sizes` en dos usos. | Añadir `sizes`. |
| Neue Haas Roman/Medium/Bold | ~`100 KiB` cada una | Tres pesos usados; `font-display: swap`. | `KEEP`; no sacrificar identidad tipográfica. |

## 8. Alcance de implementación aprobado por esta auditoría

Se implementarán únicamente:

1. `H-01` a `H-07`.
2. `M-01` a `M-04`, por ser cambios pequeños, verificables y sin alterar el modelo comercial.

No se implementarán `O-01` ni `O-02`. No se modificarán oferta, precios, entregables, formularios, endpoints, analytics, CRM, Brevo, variables, crons, automatizaciones ni Production.

## 9. Resultado de implementación

Estado: **IMPLEMENTED AND VALIDATED IN BRANCH**.

| Hallazgo | Resultado |
|---|---|
| H-01 | `/planes` muestra `/audit` primary y `#planes-mensuales` secondary en first screen desktop/mobile. |
| H-02 | `/estudio` muestra `/audit` antes de la imagen en mobile y dentro del hero en desktop. |
| H-03 | Las verticales muestran CTA antes de quick facts y cierran con `/audit` primary + WhatsApp secondary. La ruta EN conserva su CTA externa aprobada. |
| H-04 | `/casos` nombra explícitamente trabajo con negocios y HEYDE Lab, reduce el párrafo de cautela y muestra `/audit` + Lab en first screen. |
| H-05 | `/contact` incorpora `#project-inquiry`; el ancla termina a `96 px` del viewport y el primer campo recibe foco. |
| H-06 | Motion Studies no aparece en las solicitudes iniciales de `/`, `/casos` o `/marcas`; el vídeo y su request nacen al acercarse al bloque. |
| H-07 | Home mobile usa poster responsive `640w` y no solicita `/videos/hero.mp4`; desktop conserva el vídeo después de idle. |
| M-01 | Home muestra cuatro objeciones clave y enlaza la FAQ completa. |
| M-02/M-03 | Home y Casos usan metadata diferenciada por intención; el resto conserva títulos ya alineados. |
| M-04 | Imágenes editoriales declaran `sizes` según sus columnas reales. |

### Evidencia QA final

- 20/20 renderizados: `200`, CTA esperado visible, `h1=1`, canonical/idioma correctos, cero overflow y cero errores o warnings de aplicación.
- Desktop `1440×1000` y mobile `390×844`.
- LCP local de Home: poster optimizado (`IMG`), `116 ms` desktop y `100 ms` mobile en servidor local; estos tiempos no sustituyen una medición RUM de Production.
- CLS observado: `0` en desktop y mobile.
- Home mobile fresco: poster `640w`, vídeo hero `NOT REQUESTED`, Motion Studies `NOT REQUESTED`.
- Home desktop: poster inmediato y vídeo hero solicitado después de idle; Motion Studies `NOT REQUESTED`.
- Motion Studies: `REQUESTED` únicamente tras scroll hasta HEYDE Lab.
- Anclas `/planes` y `/contact`, focus de formulario, jerarquía vertical y menú mobile probados mediante interacción real.
- El poster decorativo de Home usa `alt=""` dentro de `aria-hidden`; todas las imágenes informativas mantienen `alt` descriptivo.
- No se enviaron formularios ni se generó tráfico de CRM/email.

### Checks

- `npm run prelaunch`: PASS — canon, typecheck, lint y build.
- `npm run build`: PASS — Next.js `16.3.1`, `33` páginas, sin warnings.
- `npm audit --omit=dev`: PASS — `0` vulnerabilidades.
- Tests audit `16/16`, brand inquiry `12/12`, legacy `8/8`, legal/final `12/12` y commercial CRO `6/6`: **54/54 PASS**.

## 10. Preview de revisión

- Commit funcional: `1814506`.
- Deployment: `dpl_48PKr1ZoQNUJqxSv9egvXCRyadYD`.
- Target: `preview`.
- Estado: `READY`.
- URL: `https://heydestudio-9a1drgx7s-heydestudioai-8944s-projects.vercel.app`.
- Build remoto: Next.js `16.3.1`, `33` páginas; las diez landings auditadas siguen prerenderizadas como contenido estático.
- Reconciliación remota: `10/10` rutas accesibles mediante Vercel Deployment Protection, un H1 por ruta, `lang` y canonical correctos, y CTA/hallazgo implementado presente.
- `/audit`: el formulario permanece cerrado en este entorno por la configuración Preview preexistente (`AUDIT_FORM_ENABLED=false`). No se modificaron variables; su UI abierta y responsive se validó localmente sin efectuar ningún envío.
- Production: sin cambios.
