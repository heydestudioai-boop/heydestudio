# PARCHE WEB P0/P1 · heydestudio.com

Fecha: 27 de agosto de 2026. Origen: auditoría en navegador y autorización del owner. Copia operativa del adjunto `HEYDE_Parche_Web_P0_P1.md`, corregida por las precisiones expresas de la solicitud. Estas precisiones prevalecen sobre el adjunto original.

## Alcance y regla de parada

Parche corto A1–A6, no migración ni nueva fase estratégica. Implementar en una nueva branch, validar y desplegar **exclusivamente Preview**. STOP antes de Production. No iniciar nuevos lotes.

Tras el eventual deployment final autorizado, no abrir optimizaciones durante 4–6 semanas salvo bug real o incidencia de Production. La siguiente decisión SEO/CRO debe basarse en datos reales de Search Console y GA4 (impresiones, consultas, clicks, auditorías y leads).

Autoridad: HEYDE 00 v1.3.4, OnePager Toledo v2.1, AGENTS.md y CURRENT_PRODUCTION_STATE.md. No reabrir oferta, precios, arquitectura ni funnels.

## BLOQUE A · CÓDIGO

### A1 · Selector de idioma

- Mostrar selector únicamente para pares reales: `/inmobiliaria` ↔ `/en/real-estate`, `/privacy` ↔ `/en/privacy`, `/terms` ↔ `/en/terms`, `/cookies` ↔ `/en/cookies`.
- Ocultarlo en páginas sin traducción: `/`, `/planes`, `/audit`, `/casos`, `/estudio`, `/faq`, `/hosteleria`, `/bodegas` y cualquier otra sin par.
- `/marcas` es EN-only: no falso selector ES/EN. Puede mantener un enlace contextual discreto a la experiencia local ES, nunca presentado como traducción.
- No crear nuevas rutas EN ni enlaces a traducciones inexistentes.
- Canonical propio. Hreflang recíproco `es-ES`, `en` y `x-default` a la ruta ES solo en pares reales. Eliminar `og:locale:alternate` donde no hay alternativa real.

### A2 · Banner de cookies

Convertir el modal que interfiere con el hero en barra inferior fija o bottom sheet desktop/mobile. La propuesta y CTA principal deben quedar visibles.

Preservar Rechazar / Configurar / Aceptar con igual facilidad y jerarquía. No cambiar lógica de consentimiento, bloqueo de GA4, revocación, categorías ni tratamiento legal. QA a 390×844: teclado, focus visible, sin solapamiento ni overflow.

### A3 · Zonas táctiles

Priorizar exclusivamente navegación desktop/mobile, botones de cookies, CTA hacia `/audit`, tarjetas sectoriales clicables y WhatsApp flotante. Aproximarse a 44×44 CSS px mediante padding/área pulsable cuando sea razonable, sin agrandar tipografía ni rediseñar.

44×44 es un objetivo UX/AAA/plataforma, no un requisito WCAG 2.2 AA; AA contempla 24×24 o sus excepciones de separación.

### A4 · Eventos GA4

Reutilizar infraestructura existente. GA4 sigue bloqueado hasta consentimiento válido.

| Evento | Disparador |
| --- | --- |
| `cta_auditoria_click` | Click en CTA hacia `/audit`; solo parámetros no personales `source_path` y `cta_location`. |
| `form_auditoria_start` | Primera interacción real con un campo; una vez por interacción/sesión del formulario, nunca por cargar la página. |
| `form_auditoria_submit` | Únicamente submit confirmado con éxito por backend; nunca botón, intento o error. |
| `whatsapp_click` | CTA flotante y enlaces WhatsApp relevantes. |
| `telefono_click` | Cualquier enlace explícito `tel:`. |
| `planes_view` | Visibilidad significativa del bloque principal de planes en `/planes`, sin repeticiones innecesarias. |

No enviar PII: nombre, email, teléfono, negocio, Instagram, URL introducida, request ID ni HubSpot ID. Tampoco enviar el valor de la calculadora.

Configurar/documentar como **KEY EVENTS / EVENTOS CLAVE**: `form_auditoria_submit`, `whatsapp_click`, `telefono_click`. Si no hay acceso administrativo seguro a GA4, documentar instrucciones exactas para el owner; no improvisar. No usar terminología antigua salvo integración publicitaria.

### A5 · Limpieza técnica segura

1. Eliminar meta keywords de metadata/runtime público.
2. **Conservar `format-detection: telephone=no`** salvo razón funcional concreta. Un `href="tel:..."` explícito sí es accionable: verificar/corregir teléfonos que deban serlo.
3. Skip link localizado, visible al focus, hacia el `<main>` real.
4. Hero decorativo: `alt=""` explícito. Hero informativo: descripción real. Sin keywords añadidas por SEO.
5. El recurso principal del hero no debe usar lazy loading si perjudica LCP. Mantener rendimiento.
6. Enlazar `founder` desde Organization al nodo Person existente si es correcto, sin duplicarlo.
7. `geo` y `openingHoursSpecification`: solo datos reales expresamente confirmados como publicables. En su ausencia **DEFERRED**, no blocker.

### A6 · Equivalencia económica en `/planes`

Bloque pequeño y opcional bajo comparación/oferta. Pregunta: **“¿Cuánto te deja de media un cliente nuevo?”**. Importe EUR efímero.

Resultado: **“Para cubrir 890 €/mes, necesitarías X clientes de ese valor.”** Precio obtenido del plan Crecimiento canónico, sin hardcodear. Cuenta: precio del plan / valor introducido. Redondeo comprensible y explicado (o decimal honesto).

Microcopy: **“Es solo una equivalencia de coste, no una estimación de resultados.”**

No ROI, forecast, garantía ni previsión de resultados. Nunca “HEYDE te consigue”, “Conseguirás”, “Se paga con” o una atribución similar. Client-side, sin almacenamiento, analytics de valor ni backend. No es un nuevo funnel.

## BLOQUE B · OWNER / FUERA DE CÓDIGO

### B1 · Search Console

Verificar propiedad, enviar sitemap.xml, comprobar procesamiento de **HTTP 308 Permanent Redirect** legacy, revisar schema/resultados enriquecidos y consultas/impresiones aproximadamente a los 30 días. No cambiar el mapa aprobado. No automatizar Google sin acceso autorizado.

### B2 · Google Business Profile

Crear/verificar ficha si falta; elegir la categoría más específica disponible realmente; área de servicio Toledo sin domicilio particular visible; subir trabajo real; web con `?utm_source=gbp`; comprobar WhatsApp/SMS si elegible. No documentar Google Business Messages como función actual. No ejecutar sin acceso explícito.

### B3 · Circuito de correo

Verificar read-only, si es posible, `contact@heydestudio.com` y sus notificaciones operativas a Oliver, con respuestas desde la cuenta operativa correspondiente. Si depende de configuración del proveedor no accesible, **OWNER ACTION**. No cambiar Brevo ni el funnel para resolverlo dentro del parche.

### B4 · Muestra de mercado

Tarea separada: hoja trazable de negocio, sector, fecha, seguidores, frecuencia, visualizaciones aproximadas y observaciones. Hasta disponer de evidencia, no publicar cifras de mercado Toledo ni bloque numérico “Por qué ahora”.

## NO SE HACE TODAVÍA

- `/comercio-local`, `/alquiler-vacacional` y `/clinicas` (esta última solo candidata futura).
- Bloque “Por qué ahora” con cifras.
- Blog posts o reactivación de estrategia editorial.
- Schema Service + Offer solo esperando rich results.
- BreadcrumbList u otra ampliación de arquitectura.
- Revisión masiva de alt con keywords.
- Cambios de precios, planes, launch offer, campos de `/audit` o `/contact`, HubSpot schema, Brevo, funnels, labels HEYDE Lab o contenido legal fuera de UX/enlaces afectados.

## LO QUE NO SE TOCA

- Formularios, honeypot y consentimiento existentes.
- Promesa “sin reunión previa”.
- Bloqueo de GA4 hasta consentimiento y revocación.
- Mapa de redirects legacy **HTTP 308 Permanent Redirect**.
- Etiquetado HEYDE Lab: autoiniciado / no cliente.
- Precios visibles, sin formulario intermedio.
- Estructura de dos puertas, diseño general y arquitectura.
- Production, variables, integraciones, crons y automatizaciones.

## Rendimiento, checks y QA

Referencia puntual de auditoría (no field data): LCP ~576 ms, TTFB ~36 ms, ~68 KB transferidos y 51 requests. Medir antes/después comparable: LCP, CLS, requests y bytes en desktop 1440×1000 y mobile 390×844. No añadir librerías pesadas ni degradación perceptible.

Checks: canon, typecheck, lint, build, npm audit --omit=dev, audit tests, brand inquiry tests, legacy tests, legal/final tests y commercial CRO tests. Añadir tests de valor para selector, locales, payloads, calculadora, cookies y skip link.

QA en ambos tamaños: `/`, `/planes`, `/audit`, `/estudio`, `/hosteleria`, `/inmobiliaria`, `/en/real-estate`, `/bodegas`, `/casos`, `/marcas`, `/contact`, `/faq`, `/privacy`, `/en/privacy`. Comprobar idioma, consentimiento, CTA, targets, tel, skip, calculadora, analytics, SEO, responsive, consola, red y media/LCP. **No enviar formularios reales.**

Entregar `P0_P1_PATCH_RESULT.md`: cambios A1–A6, eventos/key events, performance, owner tasks B1–B4, tests/QA, URL Preview y commit exacto. Recomendación `READY FOR OWNER REVIEW IN PREVIEW` o `ACTION REQUIRED`. **STOP. NO Production. NO nuevos lotes.**
