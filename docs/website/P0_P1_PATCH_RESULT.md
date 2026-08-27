# P0/P1 — resultado del parche

Fecha: 2026-08-27. Branch: `codex/p0-p1-patch`.

Código validado: `da963ce02b76af3505249ef1e0d42c295d6f6ae3`.

Preview: [abrir deployment](https://heydestudio-c1to853xw-heydestudioai-8944s-projects.vercel.app).

Deployment: `dpl_5FTt1AAVukrbEUhvzGuqwodaFQzD`, target **preview**, estado **READY**. Revisión remota completada el 2026-08-27 a las 13:15 Europe/Madrid. Framework: Next.js 16.3.1; build sin caché. La protección Vercel permanece activa; se utilizó acceso temporal de revisión sin cambiar variables ni políticas de acceso. El enlace temporal de acceso no se guarda en este informe.

Recomendación: **READY FOR OWNER REVIEW IN PREVIEW**. No autorizado para Production en esta tarea.

## Alcance y autoridad

Se aplican únicamente A1–A6 y las precisiones expresas del owner. El adjunto se incorporó corregido a `HEYDE_Parche_Web_P0_P1.md` antes de modificar runtime. Las referencias a redirects son **HTTP 308 Permanent Redirect**; el mapa no cambia.

Maestro v1.3.4 y OnePager v2.1 ya no estaban en sus antiguas rutas de Descargas. Se localizaron y consultaron las versiones de igual nombre en `HEYDE_Studio/Documentos`. Se contrastaron AGENTS.md, CURRENT_PRODUCTION_STATE.md y las decisiones de migración aprobadas.

No se modificaron oferta, precios, launchOffer, copy comercial existente, arquitectura, campos, contratos de backend, HubSpot, Brevo, variables, crons, automatizaciones, labels HEYDE Lab ni el contenido de las seis páginas legales. En los componentes legales solo se añadió el destino accesible del skip link.

## A1 — idioma: PASS

- Selector con enlaces reales, no cambio de idioma mediante estado cliente.
- Solo cuatro pares: inmobiliaria, privacy, terms y cookies, con sus equivalentes EN.
- Sin selector en las rutas que no tienen traducción, incluidas `/marcas` y `/contact`. El enlace contextual existente a la experiencia local permanece; no se presenta como traducción.
- Canonical propio; `es-ES`, `en`, `x-default` a ES en los pares. El helper solo genera OG alternate cuando existen alternates lingüísticos.
- No se crearon rutas ni slugs. Los root layouts y su comportamiento de navegación permanecen intactos: cruzar ES/EN sigue siendo navegación completa entre raíces, como en la arquitectura ya aprobada.

## A2 — consentimiento: PASS

Barra inferior a ancho completo, región accesible con nombre, sin overlay modal. Rechazar / Configurar / Aceptar mantienen la misma apariencia, facilidad de acceso y altura mínima de 44 px. El panel de configuración enfoca su checkbox y permite guardar con teclado; al reabrir desde footer se devuelve el foco al control de origen.

Altura inicial medida: aproximadamente **116 px desktop** y **190 px mobile**, frente al bloque mobile anterior de aproximadamente 393 px. La propuesta y CTA principal del hero quedan visibles. La home desplaza visualmente su contenido sin cambiar la altura del documento; una primera implementación que añadía CLS fue descartada antes del commit.

WhatsApp flotante queda oculto mientras está abierto el consentimiento, para no tapar sus controles ni los CTA. Vuelve al cerrar el banner. Sus enlaces normales siguen disponibles.

Sin cambios en almacenamiento, categorías, decisión, revocación o carga de GA4. No se carga GA antes de consentimiento válido. No se ha sustituido la infraestructura de analytics por otra librería.

## A3 — targets: PASS

Header desktop/mobile, logo, toggle real y CTA de auditoría alcanzan al menos 44 px de alto en los viewports comprobados. Los botones de cookies miden al menos 44×44. Las tarjetas sectoriales ya tenían áreas grandes y se conservaron. WhatsApp mantiene 56×56 al estar disponible.

No se agrandó la tipografía de navegación ni se cambió todo el conjunto de enlaces. 44×44 es el objetivo UX adoptado, no una atribución incorrecta a WCAG 2.2 AA.

## A4 — medición: PASS en código y ensayo aislado

| Evento | Semántica y payload |
| --- | --- |
| `cta_auditoria_click` | Enlace hacia `/audit`, incluido CTA dentro de esa ruta. Solo `source_path` de una lista cerrada y `cta_location` (`header`, `hero`, `content`, `footer`). Sin query string ni texto del enlace. |
| `form_auditoria_start` | Primer foco real en un input del formulario, excluido honeypot; ref de una sola emisión por instancia del formulario. No se emite al cargar ni al enfocar un enlace. |
| `form_auditoria_submit` | Solo después de respuesta backend correcta. No se emite al pulsar, ante validación fallida ni HTTP de error. |
| `whatsapp_click` | Enlaces `wa.me` / `api.whatsapp.com`, incluido flotante y footer; payload vacío. |
| `telefono_click` | Enlaces explícitos `tel:`; payload vacío. |
| `planes_view` | Al menos 25 % del bloque principal de planes visible; una emisión por visita montada, desconectando observer al registrarse. |

Un único listener delegado evita convertir páginas server en client. Se reutiliza `gtag`. Los eventos nuevos comprueban la decisión de consentimiento existente y se descartan si no hay consentimiento, si se revoca o si no está disponible GA; no hay cola retroactiva.

Se conservan los eventos históricos `audit_*` y `brand_inquiry_*`. No sumar `audit_submitted` y `form_auditoria_submit` como si fueran dos leads: son nombres de medición distintos para el mismo hito. El evento clave solicitado es `form_auditoria_submit`.

Sin nombres, email, teléfono, negocio, Instagram, URL de usuario, request ID, HubSpot ID ni importe de calculadora en los payloads nuevos.

### GA4 eventos clave — OWNER ACTION

No se encontró un conector administrativo GA4 autorizado en el entorno. No se modificó la propiedad ni se enviaron eventos QA al proveedor.

En la propiedad HEYDE correcta, ir a **Administrar → Visualización de datos → Eventos**. En eventos recientes, localizar `form_auditoria_submit`, `whatsapp_click` y `telefono_click` y activar la estrella de evento clave. Si aún no existen, **Crear evento**, introducir el nombre exacto y activar **Marcar como evento clave**, sin reglas que dupliquen los eventos emitidos por código ni valores monetarios inventados. Requiere permisos suficientes. La marca no es retroactiva y los informes estándar pueden tardar hasta 24 h. [Guía oficial GA4](https://support.google.com/analytics/answer/13128484?hl=en-GB).

## A5 — limpieza segura: PASS

- Eliminadas todas las entradas `keywords` de metadata runtime; 0 tags en las páginas comprobadas.
- `formatDetection.telephone = false` se conserva. El número público del footer ya usa `tel:+34671141135`; se comprobó su enlace, sin realizar llamada.
- Skip link ES/EN con focus visible y destino `main#main-content` enfocable. Un único main por página; sin nuevo wrapper main.
- Póster de home: decorativo, `alt=""`; ahora `loading="eager"` cuando `posterPriority`, manteniendo fetch priority alta. El resto del diferimiento de vídeo, selección desktop-only y assets se conserva.
- Organization enlaza su `founder` al Person ya existente; no se duplicó el nodo ni se expusieron datos fiscales en schema.
- `geo` y horarios: **DEFERRED**, sin datos expresamente confirmados como publicables. No bloquean el parche.

## A6 — equivalencia: PASS

Componente pequeño bajo las tarjetas mensuales de `/planes`, después de la oferta. Consume `monthlyPlans` → `growth.price` y `growth.priceLabel` en servidor; solo pasa el precio canónico al componente interactivo.

Pregunta aprobada y cálculo precio / importe. Ejemplo: 100 EUR → 9 clientes para cubrir 890 €/mes, redondeando al entero superior; 120,50 EUR → 8. Acepta punto/coma decimal, rechaza cero, negativos y valores inválidos. Explica precio de lista sin IVA y redondeo. No usa la oferta de lanzamiento para sustituir el precio de lista solicitado.

“Es solo una equivalencia de coste, no una estimación de resultados.” Sin almacenamiento, requests, eventos con el importe, submit ni nuevo funnel. El valor desaparece al recargar.

## Rendimiento antes / después

Ensayo de laboratorio local sobre `next build` + `next start`, Chrome instalado, 1440×1000 y 390×844, DPR 1, sin throttling ni consentimiento GA, contexto nuevo/cache de navegador desactivada, ventana de 5 s tras load, mediana de 3 ejecuciones por ruta/tamaño. No es field data ni se compara directamente con la muestra externa ~576 ms / ~68 KB / 51 requests, cuyas condiciones de caché no son conocidas.

| Ruta / viewport | LCP antes → después | CLS antes → después | Requests | Bytes transferidos |
| --- | --- | --- | --- | --- |
| Home desktop | 248 → 280 ms | 0,00679 → 0,00688 | 37 → 40 | 8.553.564 → 8.192.837 |
| Planes desktop | 168 → 188 ms | 0,03613 → 0,03627 | 33 → 36 | 503.942 → 504.190 |
| Home mobile | 216 → 204 ms | 0,06773 → 0,06773 | 27 → 29 | 455.986 → 457.051 |
| Planes mobile | 164 → 160 ms | 0,15231 → 0,15231 | 26 → 29 | 443.139 → 482.327 |

LCP: +32/+20/−12/−4 ms en esa muestra; no degradación perceptible. CLS mobile de planes ya existía y no empeora; no se abre una optimización de fuentes fuera de alcance. El vídeo desktop produce gran variabilidad por rangos/bytes completados en la ventana (aproximadamente 0,57–8,58 MB): no atribuir su menor mediana a una optimización del parche. El asset de vídeo no cambia. Planes mobile añade aproximadamente 39 KB y 3 requests; sin nuevas dependencias.

Una compilación incremental local conservó CSS antiguo. Se aisló el artefacto generado en Temp y se repitió build limpio. La Preview se desplegó con `--force`, sin reutilizar caché de build. Las mediciones de iteraciones rechazadas no se usan como resultado final.

Build antes/después: **33/33 tareas de generación**, mismas rutas estáticas y dinámicas. Páginas públicas estáticas; API y ruta legacy 410 dinámicas; tres proyectos Lab SSG. Sin warnings de aplicación.

## QA y checks

**Local: 28/28 combinaciones PASS**: las 14 rutas pedidas en 1440×1000 y 390×844. Identidad de página, HTML inicial/lang, canonical, hreflang, OG, 0 keywords, main, skip por teclado, botones, overflow, hero/media, consentimiento, consola y red.

**Preview: 36/36 comprobaciones funcionales y de layout PASS**, incluyendo además `/terms`, `/en/terms`, `/cookies` y `/en/cookies` en ambos tamaños. Todas las páginas devuelven 200. Se comprobaron los destinos exactos de los cuatro pares, no solo el número de etiquetas. No se observó overflow ni solapamiento del CTA principal. No hubo carga GA previa al consentimiento ni peticiones a proveedores de funnel. No se enviaron formularios.

| Comprobación remota | Resultado |
| --- | --- |
| Identidad, contenido y HTML inicial | PASS, 36 respuestas 200, sin páginas vacías |
| Overlay de framework | Ninguno observado |
| Consola de la aplicación | 0 errores de HEYDE |
| Consola externa del Preview | CSP bloquea la barra de comentarios de Vercel; detalle a continuación |
| Selector/idioma/SEO | PASS, pares reales y sin traducciones falsas |
| Capturas desktop/mobile | PASS, CTA libre y controles sin solapamientos |
| Interacción real en navegador integrado | Configurar cookies → checkbox enfocado → guardar sin analítica; inmobiliaria ES→EN→ES; `/planes` + 100 → 9 clientes |

**Incidencia de herramienta Preview, no corregida fuera de alcance:** `https://vercel.live/_next-live/feedback/feedback.js` es bloqueado por la CSP existente (`script-src`). La automatización marcó inicialmente `layout/runtime` por este mensaje de consola en las 36 vistas; al reconciliar los resultados, era el único error en todas ellas. No hay fallo de render o interacción del sitio. La barra externa de comentarios Vercel no está disponible en ese contexto; no se relajó CSP ni se ocultó el mensaje. En el navegador integrado también quedaron mensajes FedCM de la pantalla de login Vercel visitada antes del acceso temporal; no proceden de HEYDE. Los resultados brutos se conservan fuera del repo.

Navegador integrado utilizado para revisión visual y controles reales: selector móvil inmobiliaria ES→EN, consentimiento/configuración y calculadora. Su evaluación read-only no expone Performance API; las métricas y simulaciones se complementaron con un Chrome aislado de laboratorio. No se cambiaron las sesiones del usuario para QA.

Interacciones aisladas PASS:

- CTA audit: descartado antes de consentimiento, payload exacto tras aceptar.
- Planes: una emisión al entrar significativamente, sin repetir al volver a hacer scroll.
- WhatsApp y teléfono: un evento cada uno, navegación externa interceptada (sin llamadas ni mensajes).
- Revocación: no hay nuevos eventos comerciales.
- Calculadora: entero, coma decimal, cero, negativo y vacío; ningún importe en analytics; reinicio tras reload.
- Formulario audit original montado **solo en harness local sin backend**, con prop habilitada: no start por load, un start por campos, HTTP 400 simulado sin submit, HTTP 200 simulado con un submit. Datos ficticios `example.invalid`, sin proveedores.
- Loader GA ausente antes de consentimiento y presente después; requests de terceros interceptadas, sin enviar datos a GA.

Los flags Preview se conservan; no se habilita el formulario público para probarlo. No se enviaron formularios reales, emails ni escrituras CRM. Ninguna prueba llamó los endpoints internos de Production.

Limitaciones: medición en laboratorio, no field data; sin Safari/Firefox ni dispositivos físicos. El submit con éxito/error se probó exclusivamente con respuestas simuladas locales, no contra el backend Preview/Production. La aceptación y revocación de GA se ensayaron con transporte interceptado para no contaminar la propiedad real.

| Check | Resultado |
| --- | --- |
| `npm run check:canon` | PASS, 19 archivos scoped |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS, build limpio, 33/33 |
| `npm audit --omit=dev` | 0 vulnerabilities |
| `npm run test:audit` | 16/16 PASS |
| `npm run test:brand` | 12/12 PASS |
| `npm run test:legacy` | 8/8 PASS |
| `npm run test:legal` | 12/12 PASS |
| `npm run test:commercial` | 6/6 PASS |
| `npm run test:patch` | 10/10 PASS |
| Total tests | **64/64 PASS** |

Sin cambios de dependencias ni lockfile. Los scripts y screenshots temporales están fuera del repo, en `Temp/heyde-p0-p1-qa`; no se incluyeron en commit ni deployment.

## B — tareas owner, sin ejecución de cuentas externas

### B1 — Search Console

Verificar propiedad de HEYDE; enviar `https://www.heydestudio.com/sitemap.xml`; revisar URLs antiguas y su destino HTTP 308 mediante inspección de URL/indexación; revisar schema con Rich Results Test y avisos aplicables (no todo schema genera rich results). Aproximadamente a los 30 días, revisar consultas, impresiones, clicks y páginas, sin lanzar ahora otra ronda SEO. [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [redirects permanentes](https://developers.google.com/search/docs/crawling-indexing/301-redirects).

### B2 — Google Business Profile

Crear/verificar ficha si falta, elegir la categoría más específica realmente disponible, configurar área de servicio Toledo sin publicar domicilio particular, subir fotos de trabajo real y enlazar la web con `?utm_source=gbp`. Si la cuenta es elegible: Editar perfil → Contacto → Chat → WhatsApp o SMS. No usar instrucciones del antiguo Google Business Messages. No se accedió ni modificó GBP. [Dirección/área de servicio](https://support.google.com/business/answer/2853879?hl=en), [WhatsApp/SMS y elegibilidad](https://support.google.com/business/answer/15013580?hl=en).

### B3 — email routing: OWNER ACTION

La inspección read-only de runtime muestra confirmaciones al solicitante y un fallback de configuración de notificación; no prueba el reenvío del buzón ni que Oliver reciba avisos operativos. No hay acceso administrativo confirmado al proveedor de correo para certificar alias, forwarding o send-as.

El owner debe comprobar en su proveedor que `contact@heydestudio.com` llega al buzón operativo de Oliver y que replies/send-as salen desde la cuenta operativa acordada. No se modificó Brevo, no se añadió notificación al funnel ni se envió email de prueba.

### B4 — muestra de mercado: DEFERRED

Crear aparte una hoja trazable con negocio, sector, fecha, seguidores, frecuencia, visualizaciones aproximadas y observaciones. Sin cifras públicas de mercado ni bloque numérico “Por qué ahora” mientras no exista esa evidencia. No se creó una hoja ni una nueva tarea/automatización.

## Archivos modificados

- Idioma/SEO: `lib/languageRoutes.ts`, `components/layout/LanguageToggle.tsx`, `lib/seo.ts`, metadata de `/marcas` y `[slug]` Lab.
- Shell/UX: `components/layout/Header.tsx`, `components/layout/SiteRoot.tsx`, `components/CookieConsentManager.tsx`, `components/FloatingWhatsApp.tsx`, `components/DeferredAutoplayVideo.tsx`, `app/globals.css`.
- Medición/cálculo: `lib/commercialAnalytics.ts`, `components/CommercialTracking.tsx`, `lib/planEquivalence.ts`, `components/PlanEquivalence.tsx`, `app/(es)/planes/page.tsx`, `components/pages/AuditPageContent.tsx`.
- Solo destino de skip link en los demás main: páginas blog/casos/estudio/marcas; `HomePageContent`, `BrandInquiryPageContent`, `CaseStudyPageContent`, `FAQPageContent`, `LocalVerticalPage`, `LegalPageContent`. Home añade también una clase para el ajuste de cookies.
- Tests/config local: `package.json`, `tests/commercial-cro.test.mjs`, `tests/p0-p1-patch.test.mjs`.
- Documentación: `HEYDE_Parche_Web_P0_P1.md`, este informe.

Los documentos históricos preexistentes sin versionar se preservan sin añadirlos al commit del parche.

## Production y STOP

Lecturas antes y después del Preview: Production sigue `READY` en el **mismo** `dpl_H8N8CRSpSvthwiZmiZkuNNgYua3L`, alias `www.heydestudio.com`. No deploy/promote Production ni cambios de variables, crons o integraciones. No se accedió a `INTERNAL_API_TOKEN`.

**READY FOR OWNER REVIEW IN PREVIEW.** Código exacto desplegado: `da963ce02b76af3505249ef1e0d42c295d6f6ae3`. Este informe se incorpora en un commit documental posterior, sin otro deployment. No existen blockers de código detectados para la revisión del owner; las acciones externas GA4/GSC/GBP/correo siguen pendientes y no se afirman ejecutadas.

**STOP antes de Production y de nuevos lotes.** Tras un futuro despliegue autorizado, respetar la pausa de 4–6 semanas sin otra ronda SEO/CRO/copy salvo bug real o incidente; decisiones posteriores basadas en datos reales. Esta tarea no crea recordatorios, automatizaciones ni nuevas fases.
