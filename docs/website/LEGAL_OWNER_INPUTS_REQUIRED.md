# Lote 7 — datos legales requeridos del owner

Fecha de auditoría: 23 de agosto de 2026  
Estado legal: **OWNER INPUT REQUIRED**  
Ámbito: branch/Preview. No se ha modificado Production ni ningún proveedor externo.

## Criterio de clasificación

- `VERIFIED`: confirmado por el canon aprobado, el runtime actual o documentación operacional cerrada.
- `TECHNICALLY_DERIVED`: consecuencia comprobable del código o de la configuración, pero no sustituye una decisión jurídica.
- `OBSOLETE`: pertenecía al funnel anterior y no debe describirse como tratamiento vigente.
- `NEEDS_OWNER`: requiere información del titular, evidencia contractual o revisión jurídica; no se deduce ni se publica como cerrada.

## Inventario legal y técnico

| Elemento | Estado | Evidencia o límite |
|---|---|---|
| Marca pública | `VERIFIED` | `HEYDE Studio`, conforme a `lib/canonical.ts`. No confirma la identidad jurídica del responsable. |
| Email de contacto | `VERIFIED` | `contact@heydestudio.com` se publica en la web y los formularios. |
| Funnel `/audit` | `VERIFIED` | Solicita negocio, zona, web/Instagram, contacto, email, teléfono opcional y consentimiento; registra request, timestamps y estados. |
| Funnel `/contact` | `VERIFIED` | Solicita nombre, empresa, email, presencia opcional, tipo de proyecto, brief y consentimiento; permanece separado de `/audit`. |
| HubSpot | `VERIFIED` | System of record durable aprobado para los Contacts de ambos funnels. |
| Brevo | `VERIFIED` | Infraestructura transaccional activa para una confirmación idempotente por solicitud. |
| Vercel | `VERIFIED` | Hosting y runtime del sitio. |
| Google Analytics | `VERIFIED` | Configurado en Production; el tag solo se renderiza tras consentimiento de analítica. |
| WhatsApp | `VERIFIED` | Existen enlaces externos; la web no envía payloads de formulario a WhatsApp. |
| Eventos de analítica | `TECHNICALLY_DERIVED` | Solo incluyen nombre, categoría, ruta e idioma; no incluyen campos de formulario ni PII. |
| Almacenamiento de consentimiento | `TECHNICALLY_DERIVED` | `localStorage`: `heyde-cookie-consent`; el selector de idioma puede usar `heyde-language`. |
| Cookies GA | `TECHNICALLY_DERIVED` | Tras consentimiento, GA4 puede crear `_ga` y `_ga_<id>`; el código las elimina al revocar. |
| Validación y seguridad de formularios | `TECHNICALLY_DERIVED` | Schema, honeypot, rate limit, tokens internos y cabeceras de seguridad. No constituye garantía absoluta. |
| Condiciones comerciales públicas | `VERIFIED` | IVA 21 % no incluido, permanencia inicial 3 meses, preaviso posterior de 30 días, derechos de finales según contrato, exclusión de brutos/editables, desplazamiento y política contextual de IA proceden de `lib/canonical.ts`. |
| Calendly obligatorio | `OBSOLETE` | No forma parte de `/audit` ni `/contact`; sus endpoints y CTA fueron retirados en Lote 6. |
| Questionnaire / Visual System Audit | `OBSOLETE` | Endpoint, copy y email retirados. |
| Recursos, templates y newsletter legacy | `OBSOLETE` | Endpoints y formularios retirados. |
| Follow-ups legacy | `OBSOLETE` | Cron deshabilitado, endpoint retirado y decisión aprobada de no reactivación. |

## Inputs concretos pendientes

Estos datos son necesarios para cerrar Privacy/Terms/Cookies. Deben llegar como información del owner y, donde corresponda, quedar revisados por asesoría jurídica:

1. **Identidad del responsable y prestador** (`NEEDS_OWNER`)
   - nombre completo o razón social exacta;
   - nombre comercial si difiere;
   - NIF/DNI/CIF o identificador aplicable;
   - domicilio o dirección legal que deba publicarse;
   - email/datos de contacto jurídicos definitivos.
2. **Rol y bases de licitud por finalidad** (`NEEDS_OWNER` + `LEGAL_REVIEW`)
   - base para registrar y responder `/audit`;
   - base para registrar y responder `/contact`;
   - base para los emails transaccionales;
   - base para analítica opcional;
   - tratamiento de leads que después se conviertan en relación contractual.
3. **Conservación** (`NEEDS_OWNER` + `LEGAL_REVIEW`)
   - plazo o criterio para solicitudes no contratadas;
   - plazo o criterio para clientes y documentación contractual/fiscal;
   - tratamiento de Contacts/Deals TEST;
   - conservación de emails transaccionales, logs y analítica;
   - procedimiento de borrado, bloqueo o anonimización.
4. **Encargados, ubicaciones y transferencias** (`NEEDS_OWNER` + `LEGAL_REVIEW`)
   - entidad contractual y DPA vigente de HubSpot, Brevo, Vercel y Google;
   - regiones/ubicaciones contratadas;
   - transferencias internacionales y garantías aplicables;
   - subencargados que deban identificarse;
   - alcance real de WhatsApp cuando el usuario inicia una conversación.
5. **Derechos y gobernanza** (`NEEDS_OWNER` + `LEGAL_REVIEW`)
   - responsable interno que atiende derechos y plazo operativo;
   - derechos aplicables y mecanismo de verificación de identidad;
   - autoridad de control y redacción de reclamación;
   - existencia o no de DPO y, solo si aplica, sus datos;
   - registro interno de solicitudes y brechas.
6. **Cookies y Analytics** (`NEEDS_OWNER`)
   - propiedad/cuenta GA4 y configuración efectiva de retención;
   - si existe vínculo con Google Ads u otras funciones publicitarias;
   - revisión del inventario de cookies en Production tras el deploy final;
   - periodo de vigencia/renovación de la elección de consentimiento;
   - texto definitivo sobre proveedor, ubicación y transferencias.
7. **Términos y contratación** (`NEEDS_OWNER` + `LEGAL_REVIEW`)
   - ley aplicable y jurisdicción, sin asumirlas por ubicación;
   - condiciones contractuales completas que prevalecen sobre la web;
   - proceso de aceptación, pago, facturación, cancelación e impago;
   - alcance de licencias/derechos por tipo de encargo;
   - aplicación de normativa de consumidores si pudiera existir contratación fuera de B2B;
   - revisión de exigibilidad de permanencia, preaviso y contraprestación de la oferta de lanzamiento.
8. **Idiomas legales** (`NEEDS_OWNER`)
   - confirmar si se publicarán versiones jurídicas EN para `/marcas` y `/contact`;
   - si se publican, traducción jurídica revisada y arquitectura de URLs/canonicals aprobada.

## Cambios seguros ya realizados

- Privacy separa `local_audit` y `brand_inquiry`, enumera solo campos/proveedores reales y elimina cualquier semántica legacy.
- Terms consume las condiciones desde `lib/canonical.ts`, deja claro que la web no sustituye el contrato y no inventa ley, jurisdicción ni cláusulas.
- Cookies describe `localStorage`, el gate real de GA, `_ga`/`_ga_<id>` y el mecanismo de revocación.
- Metadata legal queda en español y con canonical propio.
- La copia legal pasa a renderizado server-side estático bajo el root ES; se elimina la variante EN inalcanzable del bundle cliente.
- El JSON-LD deja de publicar `PostalAddress`/`addressLocality: Toledo`: Toledo está verificado como mercado y área de servicio, no como domicilio legal del responsable.

## Criterio de cierre

El estado solo puede cambiar a `COMPLETE` cuando se reciban los inputs anteriores, se incorporen sin contradicciones y se complete la revisión jurídica de bases, conservación, transferencias, derechos y términos. Hasta entonces, **no desplegar este release candidate a Production**.

Referencias normativas/técnicas consultadas:

- AEPD, [Guía sobre el uso de las cookies](https://www.aepd.es/guias/guia-cookies.pdf): consentimiento previo para cookies no exceptuadas, aceptar/rechazar al mismo nivel y revocación accesible.
- EUR-Lex, [Reglamento (UE) 2016/679, artículo 13](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679): identidad del responsable, finalidades, base jurídica, destinatarios, transferencias, conservación y derechos.
- Google, [GA4 cookie usage on websites](https://support.google.com/analytics/answer/11397207): funciones técnicas de `_ga` y `_ga_<container-id>`.

Estas fuentes sirven para identificar campos de información y validar el comportamiento de consentimiento; no sustituyen asesoramiento jurídico ni confirman datos propios de HEYDE Studio.
