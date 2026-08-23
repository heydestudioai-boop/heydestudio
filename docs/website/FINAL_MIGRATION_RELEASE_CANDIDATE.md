# HEYDE Studio — final migration release candidate

Fecha: 23 de agosto de 2026  
Branch: `codex/lote-7-release-candidate`  
Baseline: `219d6cc1ba412263995b20d673ced508995d742d`  
Estado: **PREVIEW RELEASE CANDIDATE — BLOCKED FOR PRODUCTION**

Este documento cierra técnicamente los Lotes 4, 5/5A, 6 y 7 en una única branch. No autoriza Production ni ninguna escritura en Vercel Production, HubSpot, Brevo, Calendly, variables, crons o registros.

## 1. Arquitectura pública final

- Next.js 16 App Router con root layouts estáticos separados mediante route groups `(es)` y `(en)`; los grupos no cambian las URLs públicas.
- Shell compartida para fuentes, CSS global, providers, consentimiento, analytics, Header/Footer y JSON-LD.
- `<html lang="es">` para la experiencia española y `<html lang="en">` para `/marcas`, `/contact` y `/en/real-estate`.
- Modelo empresarial único en `lib/canonical.ts`; rutas sectoriales, precios, packs, condiciones, IA, derechos, oferta y HEYDE Lab consumen ese canon.
- Cinco endpoints activos: los dos submits, dos health checks y la creación interna y explícita de propuesta. Los endpoints legacy están retirados.

## 2. Rutas finales

Indexables:

- ES: `/`, `/planes`, `/audit`, `/casos`, `/estudio`, `/hosteleria`, `/inmobiliaria`, `/bodegas`, `/faq`, `/privacy`, `/terms`, `/cookies`.
- EN: `/marcas`, `/contact`, `/en/real-estate`.
- HEYDE Lab: `/case-studies/solea`, `/case-studies/eden`, `/case-studies/motion`.

`/blog` se mantiene como página informativa `noindex`; no entra en sitemap. Cada ruta pública final se comprobó en 1440×1000 y 390×844.

## 3. Redirects y 410

Los 16 redirects legacy son permanentes, directos y terminan en una URL indexable, sin cadenas:

- `/pricing` → `/planes`; `/about` → `/estudio`; `/work` → `/casos`; `/services` → `/marcas`.
- `/pricing/avatar-system`, `/pricing/image`, `/pricing/video-reel`, `/pricing/campaign` y `/pricing/system-infrastructure` → `/marcas`.
- `/how-we-work` y `/process` → `/estudio#como-trabajo`.
- `/audit-questionnaire`, `/resources` y `/system-documentation-template` → `/audit`.
- Los dos artículos legacy recuperables → `/marcas`.

`/blog/luxury-brands-scale-production` devuelve `410 Gone` y `X-Robots-Tag: noindex, nofollow`. Los 13 endpoints legacy retirados devuelven `404`.

## 4. Funnels

- `/audit` → `lead_type=local_audit`; persiste un Contact durable en HubSpot y envía una confirmación Brevo idempotente cuando corresponde. Nunca crea Deal de forma automática.
- `/contact` → `lead_type=brand_inquiry`; persiste un Contact separado y usa su propia confirmación Brevo idempotente. Nunca crea Deal automáticamente.
- `audit_request_id`/`brand_inquiry_id` y sus guards impiden duplicar Contact, email y efectos externos al repetir el mismo request.
- Solo una llamada interna, autenticada y explícita puede crear una propuesta posterior; no forma parte del submit público.
- No se ejecutó ningún submit real o sintético durante Lote 7.

## 5. Integraciones activas

- HubSpot: system of record de solicitudes.
- Brevo: email transaccional de confirmación.
- Vercel: hosting/runtime.
- Google Analytics: solo después de consentimiento de analítica y sin campos de formulario/PII en los eventos auditados.
- WhatsApp: enlaces externos iniciados por el usuario; no recibe automáticamente los formularios.

## 6. Integraciones legacy retiradas

El runtime ya no contiene questionnaire/Visual System Audit, Calendly obligatorio, sync de Calendly, follow-up cron, newsletter, lead magnets, templates/resources, email test, update-stage ni los antiguos handlers de captura. El evento Calendly `/20min`, datos TEST y credenciales antiguas no se han borrado externamente: quedan inventariados para una operación posterior autorizada.

## 7. SEO final

- Host canónico único: `https://www.heydestudio.com`.
- Canonical y `og:url` propios en cada ruta final; ninguna URL canónica apunta a redirects o retiradas.
- Sitemap solo contiene rutas finales indexables y proyectos Lab; `robots.txt` permite páginas públicas y bloquea `/api/`.
- Metadata, título, description, OpenGraph, un único `h1`, un único landmark `main` y alt de imágenes comprobados.
- JSON-LD del estudio no inventa rating, review, premio ni domicilio legal; se retiró `PostalAddress` no verificado.
- `/inmobiliaria` y `/en/real-estate` conservan `es-ES`, `en` y `x-default → /inmobiliaria` recíprocos.

## 8. Idiomas

ES se renderiza server-side con `lang=es`; EN con `lang=en`. `/marcas` y `/contact` siguen en inglés aunque no estén bajo `/en`. La navegación ES ↔ EN de inmobiliaria y la navegación hacia/desde `/marcas` se validaron sin regresión visible.

Las páginas legales son ES porque no existe todavía una traducción jurídica EN aprobada. Decidir y revisar esas versiones es input del owner.

## 9. HEYDE Lab

Soleá, Eden y Motion Studies se presentan inequívocamente como proyectos autoiniciados de HEYDE Lab, no clientes. Sirven como prueba de capacidad creativa, sin ROI, ventas, testimonios, métricas o permisos inventados.

## 10. Oferta y precios

El runtime consume el canon: Sesión de Contenido 490 €, Base 390 €/mes, Crecimiento 890 €/mes, Dominio 1.450 €/mes, oferta activa de Crecimiento 690 €/mes durante seis meses con su contraprestación declarada, y packs sectoriales canónicos. Los precios públicos excluyen IVA (21 %). La permanencia, preaviso, derechos, brutos/editables, desplazamientos e IA proceden de `lib/canonical.ts`.

Los dos archivos maestros externos indicados por `AGENTS.md` no estaban disponibles en `D:\Descargas` durante Lote 7. No se reabrió ni modificó el canon: se usaron el modelo ya aprobado en `lib/canonical.ts` y la documentación de migración incorporada al repositorio. La ausencia se documenta como limitación de trazabilidad, no se suplió con contenido inventado.

## 11. Estado legal

**OWNER INPUT REQUIRED.** Privacy, Terms y Cookies ya describen solo el sistema técnico real y separan `/audit` de `/contact`, pero un release legal completo necesita información que no puede inferirse. No se inventaron identidad, NIF, domicilio, base jurídica, retención, DPO, transferencias, jurisdicción ni contrato.

## 12. Inputs del owner pendientes

El inventario completo está en `LEGAL_OWNER_INPUTS_REQUIRED.md`. Bloquean Production:

- identidad y datos legales exactos del responsable/prestador;
- bases de licitud y conservación por finalidad;
- entidades contractuales, DPA, ubicaciones, subencargados y transferencias de HubSpot, Brevo, Vercel y Google;
- proceso de derechos, autoridad, DPO si aplica y gobernanza;
- configuración/retención/publicidad real de GA4 y vigencia del consentimiento;
- ley, jurisdicción, contratación, pago, cancelación, impago, licencias y revisión de condiciones/oferta;
- decisión y revisión jurídica de páginas legales EN.

## 13. External cleanup pendiente

`POST_MIGRATION_EXTERNAL_CLEANUP.md` clasifica cada acción como `SAFE_AFTER_48H`, `KEEP`, `ROTATE`, `ARCHIVE` u `OWNER_ACTION`. No se ejecutó limpieza. Permanecen, entre otros, el evento `/20min`, 8 Deals TEST, 2 Contacts TEST, emails de QA, allowlists y credenciales legacy deshabilitadas.

Bloqueo operativo adicional: el `vercel.json` de `HEAD` todavía declara los dos crons legacy, aunque el estado externo aprobado tiene cron count `0` y el working tree previo los elimina. Lote 7 no toca crons. Un deploy Production desde el commit sin una resolución autorizada podría recrearlos.

## 14. QA

- Pre-check `.playwright-cli`: cero archivos trackeados; el directorio está excluido por `.gitignore`; todos los artefactos de esta QA se guardaron fuera del repositorio.
- 38 renderizados: 19 rutas × desktop 1440×1000 y mobile 390×844.
- Todos: HTTP 200, idioma/canonical/OG esperados, 1 `h1`, 1 `main`, sin overflow, imágenes rotas, alt ausente, consola o responses 4xx/5xx.
- Navegación completa, Header/Footer, CTA, formularios rellenables sin submit, assets y cinco vídeos `200 video/mp4`.
- Teclado/focus visible de 3 px; mobile menu abre/cierra; `prefers-reduced-motion` reduce animación y usa scroll no animado.
- Consentimiento: cero GA antes de decidir; rechazar persiste `false`; configuración reabre; revocar elimina `_ga`, `_gid` y `_gat`. El build local no posee GA ID, por lo que la request real de GA se verifica en Preview sin enviar formularios.
- Redirects, 410, 404, sitemap, robots, security headers y hreflang comprobados por HTTP.
- `/audit` permaneció cerrado localmente por el flag seguro de Preview; no se generó tráfico artificial.

## 15. Checks

| Check | Resultado |
|---|---|
| `npm ci` | PASS — 382 paquetes instalados; lockfile sin cambios intencionales |
| `npm run check:canon` | PASS — 19 comprobaciones |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS — Next 16.3.1, 30 páginas, sin warnings |
| `npm audit --omit=dev` | PASS — 0 vulnerabilidades de producción |
| `npm run test:audit` | PASS — 16/16 |
| `npm run test:brand` | PASS — 12/12 |
| `npm run test:legacy` | PASS — 7/7 |
| `npm run test:legal` | PASS — 8/8 |

`npm audit` sin omitir dev reporta 3 transitivas de tooling (1 low en `@babel/core`; 2 high en `brace-expansion` y `js-yaml`), todas con fix disponible. No afectan al árbol de producción y no se aplicó `npm audit fix`.

## 16. Commit y branch exactos

- Branch: `codex/lote-7-release-candidate`.
- Ancestry verificada: Lote 4 `25c7d6e`, Lote 5/5A `94847ea`, Lote 6 `244b95e` y cierre Preview Lote 6 `219d6cc` son ancestros.
- Commit funcional de este release candidate: `PENDING_FINAL_COMMIT`.
- Commit documental de cierre y URL Preview: `PENDING_AFTER_PREVIEW`.

## 17. Plan de deployment Production

1. Mantener STOP hasta checkpoint 48 h `GREEN`.
2. Recibir/incorporar inputs legales y revisión jurídica; cambiar estado a `COMPLETE`.
3. Resolver de forma explícita y autorizada el manifiesto de crons para garantizar cron count `0`.
4. Cerrar cualquier advisory o decisión técnica adicional aceptada por el owner.
5. Actualizar branch desde su artefacto aprobado, ejecutar nuevamente el set completo de checks y verificar Preview exacta.
6. Tomar snapshot read-only de Production y confirmar variables/flags sin mostrar secretos.
7. Desplegar el commit exacto a Production solo con autorización expresa.
8. Verificar rutas, `/audit`, `/contact`, Brevo health, HubSpot health, canonical/robots/sitemap, logs, cron count `0` y ausencia de side effects legacy, sin crear tráfico salvo un test oscuro expresamente autorizado.
9. Ejecutar observación post-deploy y solo después la limpieza externa como una operación separada.

Recomendación actual: **BLOCKED**. Production permanece intacta.
