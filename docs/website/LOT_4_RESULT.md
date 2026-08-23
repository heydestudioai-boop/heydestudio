# Lote 4 — verticales, casos y HEYDE Lab

Estado: implementación en `codex/lote-4-canonical-sectors`, Preview READY y pendiente de revisión del owner. Production no se modifica.

Preview: `https://heydestudio-gob73m2il-heydestudioai-8944s-projects.vercel.app`

## Alcance implementado

- `/hosteleria`: reposicionamiento alrededor de apetito visual, producto, local, equipo y frecuencia. La producción móvil y la cámara se eligen según objetivo y canal. Consume Pack Carta y planes mensuales desde `lib/canonical.ts`.
- `/inmobiliaria`: Pack Vivienda y Villa Premium desde el modelo canónico; producción foto, vídeo y social según inmueble.
- `/en/real-estate`: ruta inglesa renderizada por servidor, metadata inglesa, canonical propio, HTML `lang="en"` y alternates recíprocos con `/inmobiliaria`.
- `/bodegas`: finca, elaboración, personas, producto, visitas y experiencia. La Campaña Bodega se consume desde el modelo canónico.
- `/casos`: separación entre «Trabajo con negocios» y «HEYDE Lab». No se publica una cuadrícula de clientes sin evidencia.
- HEYDE Lab: Soleá, Eden y Motion Studies se identifican como proyectos autoiniciados, no clientes y no prueba comercial, tanto en las tarjetas como en el detalle.

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
- El `lang="en"` de servidor se resuelve con un header de request limitado a `/en/*` y lectura en el root layout. Next.js 16 marca por ello todas las páginas como dinámicas en el build. Antes de Production, el owner debe decidir entre aceptar ese coste de renderizado o autorizar una migración más amplia a root layouts por route groups. Production no recibe este cambio durante la revisión de Preview.

## Límites preservados

- Sin cambios en `/audit`, HubSpot, Brevo, variables, crons o automatizaciones.
- Sin deploy a Production.
- Sin clientes, resultados, ROI, métricas o testimonios inventados.

## QA y checks

- QA local en 1440×1000 y 390×844 sobre `/hosteleria`, `/inmobiliaria`, `/bodegas`, `/casos`, `/en/real-estate` y los detalles Soleá, Eden y Motion Studies.
- Todas las rutas devolvieron 200, sin errores de consola, 4xx/5xx, overflow horizontal, imágenes rotas ni errores de vídeo.
- Selector recíproco verificado: `/inmobiliaria` → `/en/real-estate` (`lang="en"`) → `/inmobiliaria` (`lang="es"`).
- Canonical y hreflang verificados en el HTML de Preview con host `https://www.heydestudio.com`, `es-ES`, `en` y `x-default` español.
- QA remota read-only: las ocho rutas del lote devolvieron HTTP 200 en el deployment READY.
- `npm run check:canon`: PASS.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run build`: PASS.
- `npm audit --omit=dev`: 0 vulnerabilidades.
- `npm run test:audit`: 16/16 PASS, sin modificar el funnel.
