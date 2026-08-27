# HEYDE Studio — resultado de limpieza post-migración

Fecha inicial: 2026-08-26. Actualización de cierre: 2026-08-27.

Ventana ejecutada: tarde del 2026-08-26, Europe/Madrid

Clasificación final: **OWNER ACTION REQUIRED**

La limpieza de datos y configuración TEST/legacy está completada. El owner cerró las acciones manuales de Calendly y Brevo y se retiraron sus entradas Vercel obsoletas. Solo queda pendiente certificar los health endpoints autenticados desde el runtime Production por falta de acceso al `INTERNAL_API_TOKEN` vigente; las páginas y la conectividad directa de proveedores pasan. No hubo deploy, submit, email ni modificación de código funcional.

Las secciones 1–10 conservan el snapshot histórico del 2026-08-26. La sección 11 describe el estado vigente del cierre.

## 1. Inventario y clasificación previa

| Elemento | Estado observado antes | Clasificación | Decisión |
| --- | --- | --- | --- |
| 8 Deals documentados como TEST | Activos; pipeline/stage legacy; sin actividad; siete sin asociaciones y uno asociado solo al Contact interno `778629969120` | `TEST_SAFE_TO_DELETE` | Archivar de forma recuperable; conservar el Contact asociado |
| Contact TEST Preview `850164683001` | `is_test=true`, propiedades de auditoría esperadas, sin Deal ni actividad; Company interna conocida | `TEST_SAFE_TO_DELETE` | Archivar de forma recuperable |
| Contact TEST Production `850627080421` | Mismas precondiciones TEST y sin actividad real | `TEST_SAFE_TO_DELETE` | Archivar de forma recuperable |
| Company interna `430014475509` y Contact `778629969120` | No forman parte de los dos Contacts TEST autorizados | `KEEP` | No modificar |
| Evento Calendly `/20min` | Público y activo; HTTP 200 | `OWNER_ACTION_REQUIRED` | No desactivar sin sesión/API autenticada y sin inventario de reservas |
| Suscripciones/webhooks Calendly | No inventariables con la sesión/API disponible | `UNKNOWN` | No actuar |
| Cron Jobs Vercel | Count `0` | `KEEP` | Mantener en cero |
| `CRON_SECRET` Production/Preview | Presente, sin consumidores y sin endpoints | `LEGACY_SAFE_TO_REMOVE` | Retirar de la configuración Vercel |
| `AUDIT_TEST_EMAIL_ALLOWLIST` Production | Presente; sin necesidad operativa tras QA/cutover | `TEST_SAFE_TO_DELETE` | Retirar solo de Production |
| `AUDIT_TEST_EMAIL_ALLOWLIST` Preview | Barrera para evitar destinatarios no aprobados | `KEEP` | Conservar |
| `AUDIT_FORM_ENABLED` / `AUDIT_DARK_MODE` | Estado Production aprobado y formulario público operativo | `KEEP` | No modificar |
| Variables activas de HubSpot, Brevo, analytics, internal API y site URL | Con consumidores runtime | `KEEP` | No modificar |
| `CALENDLY_ACCESS_TOKEN` / `CALENDLY_WEBHOOK_TOKEN` | Presentes en Production/Preview, sin consumidores runtime | `OWNER_ACTION_REQUIRED` | Conservar hasta cerrar evento/webhooks y después retirar |
| `BREVO_API_KEY` Production | Credencial activa aprobada | `KEEP` | No modificar |
| Override `BREVO_API_KEY` Preview de `codex/preview-cutover-qa` | Única entrada Brevo observada para Preview | `OWNER_ACTION_REQUIRED` | No retirar sin decidir la política de credenciales Preview |
| API key Brevo antigua | Previamente declarada deshabilitada; panel no accesible para revalidar/eliminar | `OWNER_ACTION_REQUIRED` | Confirmar y eliminar manualmente si aún existe |
| Deployments Production/Preview | Production `READY`; históricos y previews disponibles | `KEEP` | Conservar como audit trail/rollback; no desplegar |
| Endpoints Calendly, follow-up y questionnaire | Retirados; HTTP 404 | `KEEP` | Mantener retirados |

## 2. HubSpot TEST cleanup

Precondiciones verificadas inmediatamente antes de escribir:

- los 8 IDs coinciden con `PRODUCTION_AUTOMATIONS_PREFLIGHT.md`;
- los dos Contacts coinciden con los IDs y `audit_request_id` documentados en Preview y cutover;
- ambos Contacts tienen `is_test=true`, `lead_type=local_audit`, `audit_status=audit_requested` y confirmación enviada;
- no existen Deals, calls, emails, meetings, notes o tasks asociados a esos Contacts;
- no existe actividad real asociada a los Deals TEST;
- el único vínculo externo de los Deals es el Contact interno `778629969120`, que se conservó;
- la Company interna `430014475509` se conservó.

Acción ejecutada mediante batch archive oficial de HubSpot:

- Deals archivados: `502664790208`, `502667150579`, `502665366731`, `502665902314`, `502665225450`, `502665225451`, `502667091172`, `502712354004`.
- Contacts archivados: `850164683001`, `850627080421`.
- Respuesta de ambos batches: HTTP 204.
- Verificación por cada ID: lectura activa HTTP 404; lectura con `archived=true` HTTP 200 y `archived=true`.
- Verificación de preservación: Contact `778629969120` HTTP 200; Company `430014475509` HTTP 200.

La operación es recuperable desde la papelera de HubSpot dentro de su ventana de retención. No se modificó ningún registro real.

## 3. Calendly cleanup

- `/audit` y `/contact` no contienen dependencia de Calendly.
- No quedan consumidores runtime ni scheduling versionado.
- `/api/calendly/sync`, `/api/audit/webhooks/calendly`, `/api/followups/run` y `/api/audit/questionnaire` responden HTTP 404.
- El evento público `20 Minute Strategy Meeting` en `/20min` sigue respondiendo HTTP 200.
- No fue posible inventariar reservas o webhooks en una sesión Calendly autenticada. Por la regla de no actuar sobre `UNKNOWN`, no se desactivó el evento ni se eliminó ninguna suscripción.

Acción manual exacta del owner:

1. En Calendly, abrir Event Types y localizar `20 Minute Strategy Meeting` (`/20min`).
2. Confirmar que no existen reservas futuras o compromisos reales que requieran conservarlo.
3. Desactivar/archivar exclusivamente ese event type.
4. En Integrations/API & Webhooks, inventariar las suscripciones y eliminar únicamente las que apunten a `/api/audit/webhooks/calendly` o a otro endpoint legacy documentado de HEYDE.
5. Confirmar que el URL público `/20min` ya no permite reservar.
6. Solo entonces retirar `CALENDLY_ACCESS_TOKEN` y `CALENDLY_WEBHOOK_TOKEN` de Production y Preview y revocar el PAT si no tiene otro consumidor.

## 4. Vercel variable cleanup

Eliminado:

- `CRON_SECRET`: retirada la entrada compartida Production/Preview. La segunda eliminación por scope devolvió `env_not_found` porque la primera operación eliminó la entrada común completa. La verificación final confirma ausencia en ambos entornos.
- `AUDIT_TEST_EMAIL_ALLOWLIST`: retirada solo de Production; permanece en Preview.

Conservado:

- flags del formulario sin modificación;
- HubSpot, Brevo, analytics, internal API y site configuration;
- allowlist QA de Preview;
- variables Calendly hasta el cierre manual del proveedor;
- override Brevo de la antigua branch QA hasta resolver la política Preview.

No hubo redeploy. La configuración de proyecto ya no entregará las variables retiradas a futuros deployments. El deployment Production inmutable no fue sustituido.

## 5. Brevo cleanup

- Credencial activa: longitud `89`, fingerprint irreversible `42a5913ff21c2524`.
- `GET /v3/account`: HTTP 200.
- Inventario de sender: HTTP 200; sender configurado activo/autorizado.
- Production conserva su `BREVO_API_KEY`; no fue modificada.
- No se envió ningún email.
- La key antigua declarada deshabilitada no aparece como una entrada separada en Vercel. Su existencia/eliminación en el panel de Brevo queda como acción manual.

## 6. Legacy config removed

- `.env.example`: eliminados `CRON_SECRET`, `CALENDLY_ACCESS_TOKEN`, `CALENDLY_WEBHOOK_TOKEN` y `BREVO_NEWSLETTER_LIST_ID` porque no existen consumidores runtime vigentes.
- `BREVO_NOTIFICATION_EMAIL` se conserva como opcional porque `lib/brevo.ts` aún lo consulta con fallback al sender.
- `vercel.json` continúa únicamente con `$schema`; no puede recrear crons.
- La búsqueda global no encontró mecanismos alternativos de scheduling para Calendly sync o follow-ups fuera de documentación histórica/tests de regresión.

No se borró documentación histórica. Las operaciones vigentes quedan resumidas en `CURRENT_PRODUCTION_STATE.md`; los documentos de migración se conservan como `ARCHIVE / MIGRATION HISTORY` lógico.

## 7. Elementos intencionalmente conservados

- todos los Contacts, Deals y Companies que no eran los diez IDs TEST autorizados;
- email events TEST en Brevo como evidencia dentro de la retención del proveedor;
- deployments históricos;
- variables activas del sitio y de los funnels;
- allowlist QA de Preview;
- variables Calendly y override Brevo Preview pendientes de decisión autenticada;
- documentación de auditoría, cutover, checkpoints y release candidate.

## 8. Verificación final de Production

- Deployment `dpl_H8N8CRSpSvthwiZmiZkuNNgYua3L`: `READY`, aliases de Production intactos.
- `https://www.heydestudio.com/`: HTTP 200.
- `/audit`: HTTP 200; sin submit.
- `/contact`: HTTP 200; sin submit.
- `/sitemap.xml`: HTTP 200.
- `/pricing` → `/planes`: HTTP 308.
- `/audit-questionnaire` → `/audit`: HTTP 308.
- ruta retirada de blog: HTTP 410.
- endpoints legacy indicados: HTTP 404.
- runtime errors Vercel últimas 24 h: ninguno; desglose observado: seis respuestas HTTP 200 y ningún 4xx/5xx agrupado.
- Brevo y HubSpot: conectividad directa HTTP 200; credenciales activas sin cambios.
- cron count: `0`.

Limitación observacional: los health endpoints internos de Production no se invocaron porque `INTERNAL_API_TOKEN` no está disponible localmente y no se modificó ni extrajo. El deployment inmutable aprobado, la ausencia de errores runtime y las lecturas directas 200 de ambos proveedores son evidencia complementaria, no una comprobación equivalente del runtime autenticado.

## 9. Checks locales

| Check | Resultado |
| --- | --- |
| `npm run check:canon` | PASS · 19 archivos |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS · 33 páginas generadas · sin warnings |
| `npm audit --omit=dev` | PASS · 0 vulnerabilidades |
| `npm run test:audit` | PASS · 16/16 |
| `npm run test:brand` | PASS · 12/12 |
| `npm run test:legacy` | PASS · 8/8 |
| `npm run test:legal` | PASS · 12/12 |
| `npm run test:commercial` | PASS · 6/6 |

## 10. Recomendaciones operativas pendientes

1. Completar el cierre manual de Calendly con la secuencia descrita y retirar después sus dos variables Vercel.
2. Confirmar en Brevo que la key antigua deshabilitada está eliminada/revocada; mantener la activa.
3. Decidir si la branch `codex/preview-cutover-qa` seguirá existiendo. Si se retira, eliminar su override Brevo; si Preview debe seguir validando emails, provisionar primero una política segura equivalente.
4. Tras esas acciones, repetir únicamente: inventario de variables, cron count, health read-only y 404 de endpoints legacy. No enviar formularios ni emails.

## 11. Cierre de housekeeping — 2026-08-27

### Acciones manuales confirmadas por el owner

- Evento `20 Minute Strategy Meeting` (`/20min`) desactivado.
- PAT Calendly revocados: `HEYDE Studio`, `HEYDE Studio Webhook`, `Codex Temporary Setup` y `HEYDE Studio Sync`.
- API key antigua de Brevo eliminada; conservada únicamente la nueva credencial activa de Production.

Estas acciones se registran como confirmación explícita del owner. No se volvieron a crear tokens ni eventos. Las suscripciones webhook no se re-inventariaron ni se modificaron en este cierre; sus antiguos receptores están retirados y no existe consumidor en los funnels.

### Verificación de consumidores y limpieza Vercel

- Búsqueda read-only en `app`, `components`, `lib`, `next.config.ts`, `vercel.json` y `.env.example`: cero referencias Calendly/`CALENDLY_*` en runtime o configuración vigente.
- `/audit` y `/contact` continúan usando exclusivamente sus workflows actuales de HubSpot y Brevo.
- Eliminada la entrada compartida `CALENDLY_ACCESS_TOKEN` de Production/Preview.
- Eliminada la entrada compartida `CALENDLY_WEBHOOK_TOKEN` de Production/Preview.
- Eliminada únicamente la override `BREVO_API_KEY` de Preview para `codex/preview-cutover-qa`; la entrada Production no se modificó.
- `.env.example` ya estaba libre de Calendly desde la limpieza anterior; no necesitó otro cambio.
- Inventario final: cero variables `CALENDLY_*`, cero `CRON_SECRET`, cero overrides de branch QA y una única entrada `BREVO_API_KEY`, en Production.
- `AUDIT_TEST_EMAIL_ALLOWLIST` permanece únicamente en Preview porque `/api/audit/requests` y `/api/contact/submit` la consumen como barrera de seguridad. No se muestra su valor.
- `AUDIT_FORM_ENABLED` y `AUDIT_DARK_MODE` permanecen sin cambios en ambos scopes.
- HubSpot, Brevo sender, GA4, site URLs e Internal API permanecen intactos.

La retirada de la override Brevo cierra la capacidad de envío de futuros deployments de la antigua branch QA. Cualquier nuevo E2E externo Preview requerirá credenciales aisladas y autorización; no se copiará automáticamente la key Production. Los deployments existentes conservan su snapshot inmutable: no se hizo redeploy ni se alteró el sitio publicado.

### Verificación final read-only

Lectura realizada el 2026-08-27 a las 09:30 UTC / 11:30 Europe/Madrid:

| Comprobación | Resultado |
| --- | --- |
| Production deployment y aliases | Mismo `dpl_H8N8CRSpSvthwiZmiZkuNNgYua3L`, `READY`, commit `bd63977b13b4dbc9180669c90c524e9678e39b21` |
| `/` | HTTP 200; sin referencias Calendly |
| `/audit` | HTTP 200; formulario presente; sin referencias Calendly; no enviado |
| `/contact` | HTTP 200; formulario presente; sin referencias Calendly; no enviado |
| `/api/calendly/sync` | HTTP 404 |
| `/api/audit/webhooks/calendly` | HTTP 404 |
| `/api/followups/run` | HTTP 404 |
| Brevo `GET /v3/account` con la key activa conocida | HTTP 200; fingerprint esperada `42a5913ff21c2524` |
| Brevo sender | HTTP 200; sender configurado activo |
| HubSpot lectura Contacts y Deals | HTTP 200 / 200; ninguna escritura |
| Runtime errors Vercel, últimas 24 h | 0 clusters; 0 logs error/fatal |
| Cron Jobs | `0` |
| Health autenticado desde el runtime Production | `NOT_VERIFIED`: token interno no disponible de forma legible |

Se intentó la inyección oficial `vercel env run -e production` sin persistir valores. Vercel indicó que las variables Secret no pueden recuperarse; las credenciales Brevo/HubSpot disponibles se obtuvieron del entorno local existente. No se envió un token incorrecto al runtime ni se deshabilitó protección. La lectura directa de Brevo/HubSpot no se presenta como lectura del runtime.

### Checks de cierre

La batería completa se reejecutó tras el cierre de variables: canon PASS (19 archivos), typecheck PASS, lint PASS, build PASS (33 páginas; sin warnings), `npm audit --omit=dev` con 0 vulnerabilidades y 54/54 tests PASS (audit 16, brand 12, legacy 8, legal 12, commercial 6). No hay cambios en código funcional, dependencias, copy, SEO, diseño, funnels o arquitectura.

### Única acción pendiente para certificar el cierre

Hacer disponible localmente, mediante un canal seguro y sin rotarlo, el valor vigente de `INTERNAL_API_TOKEN`, o aportar una lectura autenticada sanitizada de:

- `GET https://www.heydestudio.com/api/brevo/health`: HTTP 200 y `accountStatus=200`;
- `GET https://www.heydestudio.com/api/hubspot/health`: HTTP 200, `contactsRead=true` y `dealsRead=true`.

Ambos usan el header `x-internal-token`. No pegar el secreto en el chat. No se requiere ningún submit, email, deploy, cambio de variable Production o nueva limpieza de CRM.

## Resultado vigente

**OWNER ACTION REQUIRED**

La limpieza TEST/legacy está completa y no queda acción de borrado en Calendly/Brevo/Vercel pendiente en este alcance. La clasificación permanece abierta únicamente por la comprobación autenticada del runtime solicitada; no se ha observado un fallo de Production.
