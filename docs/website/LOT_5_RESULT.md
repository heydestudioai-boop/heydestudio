# Lote 5 — segunda puerta `/marcas`

Estado: **STOP — gate de arquitectura CRM/contacto activado antes de la implementación**  
Branch: `codex/lote-5-marcas`  
Base aprobada: `25c7d6e`  
Production: **sin cambios**  
Preview Lote 5: **no creado; se evita publicar un flujo incompleto**

## Alcance realizado

- Se creó una branch nueva desde el commit aprobado de Lote 4.
- Se releyeron el Maestro v1.3.4, el OnePager v2.1, `AGENTS.md`, la auditoría y el plan de migración, y `LOT_4_RESULT.md`.
- Se auditó el contenido renderizado por `/marcas`, sus CTA, assets, rutas de HEYDE Lab, metadatos y el flujo frontend/backend de `/contact`.
- No se modificaron `/marcas`, `/contact`, `/audit`, APIs, HubSpot, Brevo, variables, crons ni automatizaciones.
- No se ejecutó ningún submit y no se generó tráfico CRM o transaccional.

El OnePager se extrajo estructuralmente, incluidos sus textos en tablas. El render visual del DOCX no pudo ejecutarse porque LibreOffice no está disponible en el entorno; esta limitación no afecta al contraste textual de identidad, oferta o precios.

## Gate que obliga al STOP

El CTA de `/marcas` debe llegar a `/contact` como consulta de marca y conservar `lead_type=brand_inquiry`. El flujo actualmente desplegado no puede cumplirlo sin cambios backend:

1. `ContactPageContent` envía el formulario a `/api/lead-capture`.
2. Ese endpoint acepta `service`, pero llama a `upsertHubSpotContact` sin `lead_type`.
3. `upsertHubSpotContact` transforma ese valor en `project_type`; no escribe la propiedad CRM `lead_type`.
4. La única escritura de `lead_type` existente pertenece al funnel de auditoría y fija `local_audit`.
5. El endpoint de contacto también conserva copy transaccional y enlaces de Calendly legacy.

Por tanto, añadir `?inquiry=brand` o preseleccionar una opción solo en frontend no separaría durablemente el lead en HubSpot. Afirmar que el routing está resuelto sería incorrecto.

La instrucción del owner establece: si `/contact` requiere cambios backend para separar correctamente `brand_inquiry`, detenerse y documentar la necesidad para un lote posterior. Ese supuesto se ha confirmado. No se modifica el backend en Lote 5.

## Auditoría del contenido actual de `/marcas`

### KEEP

- URL pública `/marcas`.
- Root layout EN ya implementado: HTML inicial `lang=en`.
- Sistema visual editorial negro/blanco, tipografía, grid y componentes compartidos.
- Separación visible de HEYDE Lab.
- Etiqueta actual de cada proyecto: `HEYDE Lab · Self-initiated · Not a client`.
- Soleá, Eden y Motion Studies como prueba de dirección y capacidad creativa.
- Modelo canónico `labProjects` y sus rutas de detalle.
- Pricing avanzado expresado como alcance a medida, sin publicar importes legacy ni planes SME.

### ADAPT

- Metadata: sustituir `AI visual systems` y `Premium AI visual systems` por creative/hybrid production para marcas.
- Hero: sustituir “Visual identity. Campaign systems. Scalable production.” por una entrada centrada en creative production, campañas, dirección y adaptación.
- Descripción del hero: retirar `identity lock` como concepto maestro y presentar producción real, social, híbrida y generativa según objetivo.
- Enlace de retorno a negocios: mantener la relación entre las dos puertas, pero usar copy inglés coherente.
- Servicios: reorganizar en cuatro familias reales — Real Production, Social / Digital, Hybrid y Generative when appropriate.
- HEYDE Lab: mantener la jerarquía y ampliar el contexto de experimentación sin atribuir clientes, briefs ni resultados.
- Cierre: cambiar “production bottleneck” y “premium systems” por una invitación directa a discutir el proyecto.
- CTA principal: `Start a project` o `Tell me about your project`, con contexto de brand inquiry cuando exista el soporte backend aprobado.

### MOVE_TO_LAB

- Avatar systems, digital doubles, synthetic production, identity locks y escenarios generativos: solo como capacidades secundarias o lenguaje específico de una exploración Lab.
- Soleá, Eden y Motion Studies: permanecen visibles, pero exclusivamente dentro de HEYDE Lab.
- Los assets `/images/work-solea-cover.jpg`, `/images/work-eden-cover.jpg` y `/images/work-motion-cover.mp4`: solo bajo esta jerarquía Lab.

### REMOVE

- “AI visual systems” como categoría empresarial y keyword principal.
- “The premium lane keeps the current HEYDE logic”.
- Avatar System y Visual Infrastructure como pilares de primer nivel.
- “Five ways to build your visual system”.
- Enlace secundario a `/work`, ruta legacy prevista para retirada.
- “Schedule a call” como CTA final por defecto y cualquier dependencia nueva del Calendly legacy.
- Reducción implícita de la audiencia a moda, lujo, belleza o premium.

## Estructura actual frente a estructura propuesta

### Actual

1. Hero AI/system-first.
2. Cinco servicios centrados en avatar, imagen, reel, campaña e infraestructura visual.
3. Laboratorio.
4. CTA a `/contact` y `/work`, con lenguaje de premium systems y llamada.

### Propuesta canónica pendiente de implementación

1. Hero: advanced creative production for brands, agencies and creative teams.
2. Relación “one studio, two doors”: HEYDE sigue siendo un estudio híbrido de contenido y redes; `/marcas` es la capacidad avanzada.
3. Capabilities: Real Production, Social / Digital, Hybrid y Generative when appropriate.
4. Método: dirección coherente, producción seleccionada según objetivo y adaptación multiformato.
5. HEYDE Lab: Soleá, Eden y Motion Studies, siempre autoiniciados y no clientes.
6. Engagement: custom project / project-based pricing / quoted according to scope.
7. CTA de brand inquiry a `/contact`, cuando el backend pueda preservar `lead_type=brand_inquiry`.

## Copy, capabilities, SEO y assets

- No se publica copy final mientras el CTA no pueda cumplir la taxonomía de lead aprobada.
- Las capabilities propuestas no introducen servicios, precios, mínimos ni resultados no canónicos.
- No se incorpora Valenne: no hay documentación o assets publicables en el repositorio.
- Canonical de `/marcas`, metadata EN, OpenGraph y `lang=en` se conservarán en la implementación.
- El schema global debe seguir describiendo a HEYDE como estudio híbrido de creación y gestión de contenido, nunca como AI company.
- No se crean fotografías ni clientes ficticios.

## Rutas legacy todavía relacionadas

- `/work`: enlazada actualmente desde el hero de `/marcas`; debe sustituirse por un ancla interna a HEYDE Lab o `/casos#heyde-lab` cuando se implemente el lote.
- `/services` y `/pricing/*`: siguen existiendo por alcance de limpieza posterior; no deben recibir enlaces nuevos desde `/marcas`.
- `/contact`: conserva taxonomía, copy, confirmaciones y Calendly del funnel anterior. Su corrección backend queda fuera del alcance autorizado.

## QA y checks

- QA de implementación: **no ejecutada**, porque el gate se detectó antes de cambiar código.
- Checks de código: **no ejecutados**, porque no existe un diff funcional de Lote 5 que validar.
- Preview: **no creado**.
- Se verificó que la branch continúa en la base `25c7d6e` y que Production no ha sido modificada.

## Decisión owner requerida

Autorizar un lote posterior y aislado para el contacto de marcas que, como mínimo:

1. acepte un intent frontend controlado `brand_inquiry`;
2. lo valide server-side y escriba `lead_type=brand_inquiry` en HubSpot;
3. preserve el flujo local y no toque `/audit`;
4. sustituya las confirmaciones/contact copy legacy por mensajes compatibles con la consulta de proyecto;
5. defina si Calendly se retira del contacto de marcas o queda como paso opcional posterior;
6. incorpore idempotencia y QA read-only/específica antes de activar el CTA.

Hasta esa autorización, **STOP**. No Production, no Preview incompleto y no limpieza legacy.
