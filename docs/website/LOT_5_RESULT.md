# Lote 5 + 5A — `/marcas` y brand inquiry

Estado: **IMPLEMENTADO Y VALIDADO EN BRANCH/PREVIEW — STOP antes de Production**

Branch: `codex/lote-5-marcas`

Base aprobada: `25c7d6e`

Production: **sin cambios**

## 1. Auditoría previa y reutilización controlada

El gate documentado en `eb8bc14` confirmó que el `/contact` legacy no podía preservar `lead_type=brand_inquiry`. La extensión 5A autorizada separa el flujo de marca sin modificar `/audit`.

Se reutilizan:

- `parseJson` y `rateLimit` como primitivas de entrada segura;
- el cliente privado de HubSpot, su normalización de nombres y la lectura defensiva de propiedades;
- el transporte Brevo validado, ampliado solo con idempotency key y tags;
- la shell global de layouts, consent, analytics y navegación;
- el modelo canónico `labProjects` y sus assets existentes.

No se reutilizan las semánticas de auditoría, Deals, questionnaire, follow-ups, Calendly, `/api/lead-capture` ni emails legacy.

## 2. Arquitectura final

```text
Negocio local → /audit    → lead_type=local_audit
Marca/proyecto → /contact → lead_type=brand_inquiry
```

`/contact` está en el root layout EN y sirve HTML inicial con `lang="en"`. La URL pública no cambia. El endpoint activo es `POST /api/contact/submit`; `GET` responde 405.

El orden del workflow es:

1. validar, normalizar, honeypot y rate limit;
2. aplicar gate QA allowlisted fuera de Production;
3. calcular un request id HMAC determinista por contenido y día, sin exponer PII;
4. validar read-only el schema CRM;
5. localizar/upsert del Contact y guardar estado `pending`;
6. enviar una única confirmación Brevo con idempotency key;
7. marcar `sent` o `failed` en el mismo Contact.

Si HubSpot falla, no se envía email ni se presenta éxito. Si Brevo falla después de persistir el Contact, la UI devuelve estado aceptado con confirmación retrasada; el reintento reutiliza el Contact.

## 3. HubSpot

La inspección read-only confirmó que el schema existente ya admite:

- `lead_type=brand_inquiry`;
- `lead_source=website`;
- `project_type=campaign|digital_identity` para los únicos casos donde la taxonomía aporta información útil;
- `is_test=true|false`;
- `message` como campo string.

No se modificó el schema, no se creó pipeline y no se creó ningún estado comercial.

El Contact persiste nombre, empresa, email, web/social, brief, consentimiento, `lead_type`, `lead_source`, `project_type` cuando existe una equivalencia honesta, `is_test` y un marcador técnico versionado. `project_type` nunca sustituye a `lead_type`.

No existe ninguna llamada a Deals en el flujo activo.

## 4. Formulario y experiencia `/contact`

Campos:

- Name;
- Brand / company;
- Email;
- Website / social (optional);
- Project type;
- Brief / what do you need?;
- consentimiento explícito.

Se retiraron de la ruta activa el visual bottleneck, avatares, identity lock, diagnóstico de visual systems, reunión obligatoria y Calendly. La UI diferencia éxito completo, confirmación de email retrasada y fallo de persistencia.

El CTA local conduce a `/audit`; los CTA de `/marcas` conducen a `/contact`.

## 5. Email

Nuevo template aislado: `Project inquiry received`.

- confirma recepción;
- indica que HEYDE revisará el contexto;
- no promete plazo, precio o presupuesto;
- no incluye Calendly, questionnaire, templates, auditoría ni terminología AI-first;
- se envía como máximo una vez por request id;
- no existe email interno, sequence o follow-up adicional.

No se envió ningún email durante esta implementación o QA.

## 6. Idempotencia y errores

La deduplicación usa dos capas:

- marcador durable del request y estado de confirmación en el Contact;
- idempotency key UUID en Brevo para proteger carreras concurrentes.

Un doble submit con el mismo request:

- reutiliza el Contact;
- no crea Deal;
- si el estado es `sent`, no llama de nuevo a Brevo;
- si el estado es `failed`, puede reintentar la única confirmación pendiente;
- no dispara Calendly ni legacy.

## 7. Analytics y privacidad

Eventos nuevos:

- `brand_inquiry_view`;
- `brand_inquiry_started`;
- `brand_inquiry_submitted`;
- `brand_inquiry_confirmation_view`.

Payload allowlisted: `event_category`, `page_path=/contact`, `locale=en`. No contiene email, nombre, empresa, web/social ni brief. No se registran payloads ni secretos en logs de la ruta.

## 8. Resultado de `/marcas`

La página queda reorientada a creative production para marcas, agencias y equipos:

- hero project-first, no AI-company;
- una sola HEYDE con dos puertas;
- capabilities: Real production, Social / digital, Hybrid y Generative cuando aporta;
- modelo project-based y quoted according to scope, sin precios SME ni mínimos inventados;
- CTA único y coherente hacia `/contact`;
- metadata EN y canonical `https://www.heydestudio.com/marcas`;
- navegación y footer específicos de la puerta de marcas.

Se retiraron del contenido activo `AI Visual Systems`, `Identity Lock`, `Visual Infrastructure`, avatar systems como pilar, luxury/premium positioning y el CTA `/work`.

## 9. HEYDE Lab y assets

Soleá, Eden y Motion Studies permanecen exclusivamente como HEYDE Lab, con las etiquetas `Self-initiated project` y `Not a client`. No se atribuyen briefs, resultados, ROI, métricas o testimonios.

Clasificación:

- **KEEP + MOVE_TO_LAB:** `work-solea-cover.jpg`, `work-eden-cover.jpg`, `work-motion-cover.mp4`;
- **REPLACE en `/marcas`:** la jerarquía y framing AI/fashion legacy, sustituidos por capabilities y Lab;
- **REMOVE del flujo activo:** links `/work`, Calendly y recursos/confirmaciones legacy;
- **NO CREADO:** ningún asset de cliente, Valenne o caso comercial sin evidencia publicable.

Los detalles existentes `/case-studies/solea`, `/case-studies/eden` y `/case-studies/motion` continúan bajo la experiencia ES aprobada en Lote 4. La tarjeta EN de `/marcas` ya deja inequívoca su condición antes de navegar.

## 10. Validación

Checks finales:

- `npm run check:canon`: PASS;
- `npm run typecheck`: PASS;
- `npm run lint`: PASS;
- `npm run build`: PASS — 59 páginas estáticas; `/marcas` y `/contact` static; `/api/contact/submit` dynamic;
- `npm audit --omit=dev`: PASS — 0 vulnerabilidades;
- `npm run test:audit`: PASS — 16/16;
- `npm run test:brand`: PASS — 12/12.

QA Playwright local, sin submit:

- `/marcas`, `/contact`, `/` y `/casos` en 1440×1000 y 390×844;
- navegación `/marcas → /contact` correcta;
- formulario rellenado localmente sin envío;
- HTML inicial: `/marcas` y `/contact` EN; `/` y `/casos` ES;
- metadata y canonical correctos;
- sin overflow horizontal, assets rotos ni errores/warnings de consola;
- `/case-studies/solea|eden|motion`: HTTP 200 y contenido HEYDE Lab;
- confirmación y fallos cubiertos por tests, sin crear Contact o email externo.

La automatización integrada del navegador no pudo inicializar sus assets en Windows (`os error 3`); se usó Playwright CLI como fallback y la QA quedó completada.

## 11. Preview

URL: `https://heydestudio-jbj9qo57r-heydestudioai-8944s-projects.vercel.app`

Deployment `dpl_Ck8rVFihfphTZ8S6ynxe6vtX8Z5z`: target `preview`, estado `READY`. `/`, `/marcas`, `/contact` y `/casos` responden 200 mediante el acceso autenticado de Vercel. El HTML remoto confirma `lang="en"`, canonical propio y ausencia de claims legacy en `/marcas` y `/contact`.

El deployment mantiene Vercel Authentication; la revisión visual requiere una sesión autorizada. La QA visual completa se ejecutó contra el mismo build local antes del deployment y la verificación remota read-only se hizo con el bypass autenticado del CLI.

No se ha enviado el formulario en Preview, no se ha creado Contact TEST y no se ha enviado email. El gate allowlisted de Preview permanece activo.

## 12. Legacy pendiente fuera de alcance

- `/api/lead-capture` y `ContactPageContent` legacy permanecen sin consumidores desde `/contact`;
- endpoints de Calendly, questionnaire, follow-ups y handlers legacy continúan para una limpieza posterior autorizada;
- `/services`, `/work`, `/pricing/*` y componentes AI-first no enlazados siguen fuera del alcance;
- no se tocaron crons, variables ni `/audit`.

## 13. Decisiones de owner pendientes

- autorización separada para Production;
- decidir en una futura limpieza si se crean propiedades dedicadas para histórico de múltiples brand inquiries en vez de conservar el último brief en `message`;
- decidir si los detalles HEYDE Lab requieren rutas EN propias;
- decidir el destino de Valenne cuando existan asset y canon publicables;
- autorizar, en otro lote, la retirada de endpoints y componentes legacy no consumidos.

**STOP. No Production y no limpieza legacy final.**
