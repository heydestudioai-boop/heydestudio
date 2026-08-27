# HEYDE Studio — estado vigente de Production

Actualizado: 2026-08-27 11:57 Europe/Madrid

Post-migration housekeeping: **POST-MIGRATION CLEANUP COMPLETE**. Acciones del owner necesarias para el funcionamiento de la web: **0**.

Ámbito: operaciones activas. La auditoría y el historial de migración permanecen en los documentos de cutover y release candidate.

## Plataforma y despliegue

- Aplicación Next.js 16.3.1 con App Router, alojada en Vercel.
- Dominio canónico: `https://www.heydestudio.com`.
- Deployment Production observado: `dpl_H8N8CRSpSvthwiZmiZkuNNgYua3L`, commit `bd63977b13b4dbc9180669c90c524e9678e39b21`, estado `READY`.
- Los deployments históricos se conservan como audit trail y posibles referencias de rollback.
- `vercel.json` no declara crons; el count de Production es `0`.

## Rutas públicas

Experiencia local ES:

- `/`, `/planes`, `/audit`, `/casos`, `/estudio`, `/hosteleria`, `/inmobiliaria`, `/bodegas`, `/faq`.
- Legales: `/privacy`, `/terms`, `/cookies`.

Experiencia EN:

- `/marcas`, `/contact`, `/en/real-estate`.
- Legales: `/en/privacy`, `/en/terms`, `/en/cookies`.

El sitemap se genera desde `lib/routePolicy.ts` y los proyectos HEYDE Lab canónicos. Los redirects legacy también están centralizados en `lib/routePolicy.ts`; la antigua entrada fabricada del blog responde `410`.

## Funnels activos

### Auditoría local

- UI: `/audit`; submit: `POST /api/audit/requests`.
- Persiste una solicitud durable en un Contact de HubSpot con `lead_type=local_audit`.
- Envía una confirmación transaccional mediante Brevo después de persistir CRM.
- La idempotencia evita duplicar Contact y email.
- No crea Deals automáticamente y no depende de Calendly, questionnaire o follow-ups.
- La creación de una propuesta es una acción interna explícita y separada en `/api/internal/audit/create-proposal-deal`.

### Proyecto de marca

- UI: `/contact`; submit: `POST /api/contact/submit`.
- Persiste/upsertea un Contact de HubSpot con `lead_type=brand_inquiry`.
- Envía una confirmación transaccional mediante Brevo después de persistir CRM.
- No crea Deals, no comparte el estado de auditoría y no depende de Calendly.

No usar formularios de Production como prueba. Cualquier futuro E2E externo en Preview requiere autorización, una dirección expresamente allowlisted y credenciales aisladas provisionadas para esa prueba. Preview no conserva una key Brevo tras el housekeeping.

## Integraciones activas

- **HubSpot:** system of record durable para solicitudes; Contacts para ambos funnels y Deal solo mediante acción comercial explícita.
- **Brevo:** confirmaciones transaccionales de auditoría y contacto.
- **Google Analytics:** carga condicionada por consentimiento; eventos first-party allowlisted sin datos del formulario.
- **Vercel:** hosting, Functions, variables y observabilidad. No hay Cron Jobs activos.

Calendly no forma parte del runtime vigente. El owner confirmó el 2026-08-27 la desactivación de `/20min` y la revocación de los cuatro PAT legacy. Se retiraron todas las variables `CALENDLY_*` de Vercel Production/Preview; los endpoints legacy siguen respondiendo 404 y no hay consumidores en `/audit` o `/contact`.

## Variables operativas por nombre

Requeridas o activas según el scope correspondiente:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_GA_ID`
- `INTERNAL_API_TOKEN`
- `AUDIT_FORM_ENABLED`
- `AUDIT_DARK_MODE`
- `AUDIT_TEST_EMAIL_ALLOWLIST` — Preview/QA únicamente
- `BREVO_API_KEY` — únicamente Production
- `BREVO_SENDER_EMAIL`
- `HUBSPOT_API_KEY` o `HUBSPOT_ACCESS_TOKEN`
- `HUBSPOT_DEAL_PIPELINE`

Opcionales con fallback controlado:

- `AUDIT_IDEMPOTENCY_SECRET`
- `HUBSPOT_PROPOSAL_SENT_STAGE`
- `BREVO_NOTIFICATION_EMAIL`

Configuración legacy/QA retirada:

- `CALENDLY_ACCESS_TOKEN`
- `CALENDLY_WEBHOOK_TOKEN`
- `CRON_SECRET`
- `AUDIT_TEST_EMAIL_ALLOWLIST` de Production
- override `BREVO_API_KEY` de Preview en `codex/preview-cutover-qa`

La allowlist Preview se conserva porque ambos submits la consumen como protección; no es una credencial ni habilita envíos por sí sola. El owner confirmó la eliminación de la antigua key Brevo en el proveedor. La key activa de Production y las variables necesarias de HubSpot, GA4, internal API y los funnels no se modificaron.

No registrar valores, fingerprints reversibles ni tokens en documentación o logs. Los cambios de variables requieren inventario por scope, redeploy controlado cuando corresponda y health checks sin enviar formularios o emails.

No se hizo redeploy durante la limpieza. La configuración retirada ya no estará disponible para deployments futuros; los artefactos existentes son inmutables. Los PAT Calendly y la key Brevo antigua, además, están revocados/eliminados por el proveedor según confirmación del owner.

## Última comprobación read-only

El 2026-08-27: Production `READY`; `/`, `/audit` y `/contact` HTTP 200; cron count `0`; cero errores runtime en la ventana consultada de 24 h. Las lecturas directas con la credencial activa dieron Brevo account/sender HTTP 200 y HubSpot Contacts/Deals HTTP 200, sin escrituras ni emails.

`INTERNAL_API_TOKEN` se conserva intacto como secreto Production, con su scope existente sin cambios. Los health endpoints protegidos no fueron invocados autenticadamente durante el cierre por principio de minimización de acceso a secretos. No se recuperó, copió, rotó ni expuso el token para certificarlos. Un HTTP 401 ante una petición sin token es el comportamiento esperado de la protección, no un fallo operativo.

La salud de HubSpot y Brevo se validó directamente contra los proveedores con HTTP 200. El owner acepta esa evidencia junto con Production `READY`, las tres rutas HTTP 200, cero errores runtime, cron count `0`, 54/54 tests PASS y 0 vulnerabilidades. La ausencia de una nueva invocación autenticada desde el runtime no constituye un blocker operativo y no deja ninguna acción pendiente sobre el secreto.

La reconfirmación read-only final mantiene los 8 Deals TEST y 2 Contacts TEST archivados (`archived=true`), Calendly desacoplado de runtime y variables, y la key Brevo antigua eliminada según confirmación del owner. La key activa de Production, HubSpot, GA4, flags y la allowlist Preview se conservan.

## Mantenimiento posterior no bloqueante

Las comprobaciones DPA/revisión legal y cualquier futura retirada de `AUDIT_TEST_EMAIL_ALLOWLIST` de Preview se tratarán como mantenimiento posterior. La allowlist se mantiene mientras proteja QA. Ninguna de estas tareas bloquea el funcionamiento de la web ni el cierre de la migración.

## Oferta de lanzamiento

El único interruptor público está en `lib/canonical.ts`, objeto `launchOffer`, propiedad `active`. Cualquier cambio debe respetar el canon y pasar los checks antes de desplegar.

## Checks operativos

```text
npm run check:canon
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
npm run test:audit
npm run test:brand
npm run test:legacy
npm run test:legal
npm run test:commercial
```

Antes y después de un deployment Production: comprobar estado `READY`, `/audit`, `/contact`, health de HubSpot/Brevo, redirects, sitemap, errores runtime y cron count `0`. No reactivar endpoints, crons o automatizaciones legacy como rollback.

## Historial de migración

El historial permanece separado y sin duplicarse en:

- `FINAL_PRODUCTION_MIGRATION_RESULT.md`
- `FINAL_MIGRATION_RELEASE_CANDIDATE.md`
- `PRODUCTION_CUTOVER_RESULT.md`
- `POST_CUTOVER_MONITORING.md`
- `CUTOVER_RUNBOOK.md`
