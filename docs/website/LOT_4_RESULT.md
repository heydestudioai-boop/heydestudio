# Lote 4 — verticales, casos y HEYDE Lab

Estado: Lote 4 aprobado funcional y visualmente; refactorización técnica de internacionalización completada en `codex/lote-4-canonical-sectors`. Preview READY. Production no se modifica.

Preview con refactorización i18n: `https://heydestudio-iph6egt0q-heydestudioai-8944s-projects.vercel.app`

Preview anterior del Lote 4: `https://heydestudio-gob73m2il-heydestudioai-8944s-projects.vercel.app`

## Alcance implementado

- `/hosteleria`: reposicionamiento alrededor de apetito visual, producto, local, equipo y frecuencia. La producción móvil y la cámara se eligen según objetivo y canal. Consume Pack Carta y planes mensuales desde `lib/canonical.ts`.
- `/inmobiliaria`: Pack Vivienda y Villa Premium desde el modelo canónico; producción foto, vídeo y social según inmueble.
- `/en/real-estate`: ruta inglesa renderizada por servidor, metadata inglesa, canonical propio, HTML `lang="en"` y alternates recíprocos con `/inmobiliaria`.
- `/bodegas`: finca, elaboración, personas, producto, visitas y experiencia. La Campaña Bodega se consume desde el modelo canónico.
- `/casos`: separación entre «Trabajo con negocios» y «HEYDE Lab». No se publica una cuadrícula de clientes sin evidencia.
- HEYDE Lab: Soleá, Eden y Motion Studies se identifican como proyectos autoiniciados, no clientes y no prueba comercial, tanto en las tarjetas como en el detalle.

## Refactorización técnica de internacionalización

### Arquitectura elegida

- Dos route groups internos sin impacto en la URL: `app/(es)` y `app/(en)`.
- Dos root layouts estáticos: `app/(es)/layout.tsx` fija `lang="es"` y `app/(en)/layout.tsx` fija `lang="en"`.
- `components/layout/SiteRoot.tsx` conserva una sola implementación de metadata raíz, CSS global, schema, `LanguageProvider`, Header, Footer, analytics/consent, scroll y WhatsApp.
- Se elimina la lectura de `headers()` del root y se retira `proxy.ts`; el idioma ya no depende de request-time.
- Las APIs permanecen fuera de los route groups y no se ha modificado ningún endpoint ni lógica del funnel `/audit`.

Las URLs públicas se mantienen idénticas. Todas las rutas locales y españolas viven bajo `(es)`; `/marcas` y `/en/real-estate` viven bajo `(en)`.

### Archivos movidos y modificados

- Movidos sin cambiar contenido: `app/page.tsx` y 23 directorios de páginas españolas a `app/(es)`; `app/marcas` y `app/en` a `app/(en)`.
- Nuevos: `app/(es)/layout.tsx`, `app/(en)/layout.tsx` y `components/layout/SiteRoot.tsx`.
- Retirados: `app/layout.tsx` y `proxy.ts`.
- Ajustados por la nueva ubicación física: `scripts/check-canonical-content.mjs` y una referencia de archivo en `tests/audit-funnel.test.mjs`.
- Actualizado: `docs/website/LOT_4_RESULT.md`.

### Build antes/después

| Medida | Antes | Después |
| --- | --- | --- |
| Páginas generadas | 59 | 59 |
| Rutas visibles | Todas `ƒ` dinámicas | Todas `○` estáticas o `●` SSG |
| APIs | `ƒ` dinámicas | `ƒ` dinámicas, sin cambio |
| Proxy | Presente para `/en/*` | Ausente |
| Warnings de build | 0 | 0 |

El build final compila en 2,5 s, valida TypeScript en 3,6 s y genera 59/59 páginas en 961 ms en ejecución incremental local. Los tiempos no se usan como comparación causal porque el estado de caché no es idéntico; el impacto determinante es el cambio verificable de todas las páginas públicas de dinámicas a estáticas sin alterar el recuento.

### Idioma server-side

- `lang="es"`: `/`, `/planes`, `/audit`, `/casos`, `/estudio`, `/hosteleria`, `/inmobiliaria`, `/bodegas`, `/faq` y el resto de la experiencia local.
- `lang="en"`: `/marcas` y `/en/real-estate`.
- El HTML crudo anterior a hidratación se verificó en las ocho rutas de QA, localmente y en Preview.

### Navegación entre root layouts

- La navegación dentro del mismo root mantiene navegación cliente y estado en memoria; se verificó `/` → `/hosteleria` con un marcador de sesión conservado.
- Next.js realiza una carga documental completa al cruzar roots. Se verificó `/` → `/marcas` y `/inmobiliaria` ↔ `/en/real-estate`: el marcador en memoria se reinicia, como prevé App Router.
- El consentimiento persiste en `localStorage`, Header/Footer se renderizan de nuevo con el idioma correcto y no se observó flash, overlay, error de consola ni regresión visible.
- Este coste queda limitado a transiciones explícitas ES ↔ EN; no afecta la navegación ordinaria dentro de la experiencia española.

### SEO preservado

- `/inmobiliaria`: canonical propio y alternates `es-ES`, `en` y `x-default` español.
- `/en/real-estate`: canonical propio y el mismo conjunto recíproco de alternates.
- `/marcas`: HTML inicial inglés, metadata inglesa y canonical `https://www.heydestudio.com/marcas`.
- No cambia ningún slug ni URL pública.

## Auditoría de assets

La clasificación describe el uso en las rutas de este lote. No se han borrado archivos físicos compartidos con otras páginas.

### KEEP

- `/images/work-solea-cover.jpg`, `/images/work-solea-01.jpg`, `/images/work-solea-02.jpg`, `/images/work-solea-03.jpg`
- `/videos/solea-video-case.mp4`
- `/images/work-eden-cover.jpg`, `/images/work-eden-01.png`, `/images/work-eden-02.jpg`, `/images/work-eden-03.jpg`
- `/videos/eden-video-case.mp4`
- `/images/work-motion-cover.mp4`, `/videos/DG-video-case.mp4`

Uso permitido: HEYDE Lab, siempre con etiqueta de proyecto autoiniciado y no cliente.

### MOVE_TO_LAB

- Las familias visuales Soleá y Eden dejan de representar inmobiliaria o bodegas y quedan jerárquicamente confinadas a HEYDE Lab.
- Motion Studies deja de apoyarse en un poster genérico de portfolio y usa su media motion bajo HEYDE Lab.

### REPLACE

- Hero de `/hosteleria`: el uso de `/images/s2-problema.jpg` se sustituye por una composición tipográfica y de proceso sin cliente ficticio.
- Hero de `/inmobiliaria`: el uso de `/images/s3-solea.jpg` se sustituye por una composición tipográfica y de proceso sin falsa representación inmobiliaria.
- Hero de `/bodegas`: el uso de `/images/s5-eden.jpg` se sustituye por una composición tipográfica y de proceso sin falsa representación de bodega.

La estructura queda preparada para incorporar fotografía sectorial real cuando exista material autorizado.

### REMOVE

- `/images/s2-problema.jpg` de `/hosteleria`: copy legacy incrustado sobre sistemas AI.
- `/images/s3-solea.jpg` de `/inmobiliaria`: concepto de fragancia y copy AI ajenos al sector.
- `/images/s5-eden.jpg` de `/bodegas`: moda/avatares y copy incrustado ajenos al sector.
- `/images/HEYDE_Story_Portfolio.jpg` de `/casos` y de la tarjeta Motion en `/marcas`: poster legacy que no prueba trabajo de negocio.

## Decisiones del owner pendientes

- Aportar y autorizar fotografía real o material neutro de proceso para los tres heroes sectoriales si se desea sustituir la composición tipográfica actual.
- No se encontró contenido ni asset de Valenne en el repositorio. Para publicarlo en HEYDE Lab hacen falta asset, copy y confirmación de que debe quedar visible; no bloquea este lote.
- No queda ninguna decisión de owner pendiente para la arquitectura de internacionalización.

## Límites preservados

- Sin cambios en `/audit`, HubSpot, Brevo, variables, crons o automatizaciones.
- Sin deploy a Production.
- Sin clientes, resultados, ROI, métricas o testimonios inventados.

## QA y checks

- QA local en 1440×1000 y 390×844 sobre `/`, `/audit`, `/hosteleria`, `/inmobiliaria`, `/en/real-estate`, `/bodegas`, `/casos` y `/marcas`.
- Todas las rutas devolvieron 200, con Header/Footer, CTA, assets y responsive correctos; sin errores de consola, framework overlay, 4xx/5xx, overflow horizontal, imágenes rotas ni errores de vídeo.
- Selector recíproco verificado: `/inmobiliaria` → `/en/real-estate` (`lang="en"`) → `/inmobiliaria` (`lang="es"`). Navegación hacia y desde `/marcas` verificada también en móvil.
- Consent/analytics conservado: la decisión de consentimiento persiste al cruzar root layouts y Google Analytics no se carga tras rechazo.
- Canonical y hreflang verificados en el HTML crudo de Preview con host `https://www.heydestudio.com`, `es-ES`, `en` y `x-default` español.
- QA remota read-only mediante `vercel curl`: las ocho rutas devolvieron contenido correcto en el deployment Preview READY y `lang` inicial esperado.
- El navegador integrado no pudo inicializarse por una limitación del runtime local (`failed to write kernel assets: path not found`); se usó Playwright 1.62.1 como fallback, sin añadir dependencias al proyecto.
- `npm run check:canon`: PASS.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run build`: PASS.
- `npm audit --omit=dev`: 0 vulnerabilidades.
- `npm run test:audit`: 16/16 PASS, sin modificar el funnel.

## Recomendación

`READY FOR PRODUCTION`, manteniendo el STOP explícito: esta rama y Preview no se han promovido ni desplegado a Production y no se inicia Lote 5.
