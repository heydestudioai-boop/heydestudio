# Lote 7 — estado de inputs legales del owner

Fecha de actualización: 24 de agosto de 2026
Estado legal: **COMPLETE — OWNER INPUTS RESOLVED**
Ámbito: branch/Preview. Production y proveedores externos permanecen sin cambios.

## Clasificación actual

- `RESOLVED`: decisión expresa del owner incorporada a ES y EN.
- `LEGAL_REVIEW_RECOMMENDED`: la decisión operativa existe, pero conviene contrastar contrato, cuenta o redacción con asesoría jurídica.
- `UNRESOLVED`: falta un dato obligatorio o el valor recibido está redactado; bloquea el cierre legal.

## RESOLVED

| Elemento | Decisión incorporada |
|---|---|
| Naturaleza del prestador | Persona física autónoma establecida en España; HEYDE Studio es la marca y los servicios se contratan/prestan directamente por ella. |
| Identificación LSSI | Nombre legal, NIF y domicilio legal/fiscal exactos confirmados por el owner e incorporados únicamente a las páginas legales ES/EN. |
| Contacto legal/privacidad | `contact@heydestudio.com`. |
| `/audit` | `lead_type=local_audit`; finalidad de registrar, preparar y entregar la auditoría; medidas precontractuales solicitadas por la persona interesada cuando corresponda. |
| `/contact` | `lead_type=brand_inquiry`; finalidad separada de revisar/responder un proyecto; misma base precontractual cuando corresponda. |
| Casilla de privacidad | Acredita lectura de la información y solicitud de tramitación; no se presenta como base universal ni como consentimiento de marketing. |
| Clientes | Ejecución del contrato para la prestación del servicio. |
| Facturación/fiscalidad | Cumplimiento de obligaciones legales. |
| Seguridad | Interés legítimo estrecho y proporcionado para logs mínimos, rate limiting, prevención de abuso y seguridad. |
| GA4 | Se conserva bajo consentimiento previo; aceptar, rechazar y revocar siguen disponibles. |
| Marketing | Audit/contact no alimentan una lista automática. No se infiere newsletter ni consentimiento promocional. |
| Leads no convertidos | Máximo 12 meses desde la última interacción significativa; después, borrado o anonimización salvo base documentada. |
| Datos operativos de clientes | Durante la relación y solo mientras sea razonablemente necesario después. |
| Contratos/facturas/documentación contable | 6 años cuando resulte necesario o apropiado para obligaciones mercantiles, fiscales o reclamaciones en España; al terminar la finalidad activa se bloquean/restringen. |
| Ley/jurisdicción web | Ley española; tribunales competentes según la ley aplicable, sin imponer Toledo universalmente. |
| Proveedores activos | Vercel, HubSpot, Brevo y GA4; WhatsApp solo como canal externo iniciado por el usuario. Calendly no forma parte del funnel. |
| Idiomas | Privacy, Terms y Cookies equivalentes en `/privacy` ↔ `/en/privacy`, `/terms` ↔ `/en/terms` y `/cookies` ↔ `/en/cookies`; español como versión original de referencia sin reducir derechos EN. |
| LSSI negativa | No se inventan Registro Mercantil, colegio profesional o profesión regulada. |

## LEGAL_REVIEW_RECOMMENDED

Estos puntos no se presentan como hechos cerrados cuando dependen de contratos o settings que el repositorio no permite comprobar:

1. **Vercel**
   - DPA público: rol de encargado para Customer Data, instalaciones principales en Estados Unidos y SCC/otros mecanismos donde aplican.
   - Revisar plan/contrato real: el DPA público consultado declara cobertura para Pro y Enterprise.
   - Confirmar subencargados y condiciones vigentes antes de Production.
2. **HubSpot**
   - DPA incorporado a sus términos: encargado para Customer Personal Data y SCC para transferencias restringidas.
   - Puede alojar cuentas en EE. UU., Canadá, Australia o UE/Alemania; confirmar la región efectiva de la cuenta HEYDE.
   - Revisar features/data-sharing que pudieran añadir roles o subencargados.
3. **Brevo**
   - Publica DPA dentro de sus términos y se describe como encargado; documenta bases de datos en UE: Francia/Alemania (OVH) y Bélgica (Google Cloud).
   - Revisar DPA contractual y transferencias/accesos de subencargados; una página de ayuda aún menciona Privacy Shield y no basta para afirmar el mecanismo vigente.
4. **Google Analytics 4**
   - Google se describe como encargado para Analytics bajo los términos de tratamiento; settings de data sharing pueden introducir relación controller-controller.
   - Transferencias pueden apoyarse en marcos de adecuación o SCC según el caso.
   - Verificar propiedad, entidad contractual, retención efectiva, data sharing, Google Signals/Ads y funciones publicitarias.
5. **Gobernanza y contratación**
   - confirmar si procede nombrar DPO o basta el canal del responsable;
   - formalizar registro de derechos, incidentes y calendario de borrado/bloqueo;
   - revisar consumidores/B2B, pago, cancelación, impago, licencias y cláusulas de jurisdicción de contratos específicos;
   - revisar que los seis años se apliquen solo a documentación que realmente deba conservarse y no a toda comunicación o contenido creativo;
   - definir el plazo técnico concreto de logs de seguridad y vigencia/renovación del consentimiento.

## UNRESOLVED

Ninguno. No quedan inputs legales obligatorios pendientes del owner.

## Cambios implementados

- Privacy ES/EN: finalidades, bases, marketing, conservación, proveedores, transferencias, WhatsApp, derechos y AEPD.
- Terms ES/EN: identificación completa, condiciones canónicas, ley española y tribunales competentes conforme a ley.
- Cookies ES/EN: identificación del responsable, `localStorage`, GA4, dos años de duración predeterminada para `_ga`/`_ga_<id>`, consentimiento y revocación.
- Footer, formulario EN y consentimiento enlazan a la versión jurídica de su idioma.
- Canonical, hreflang `es-ES`/`en` y `x-default` español para cada par legal.

## Criterio de cierre

El estado es `COMPLETE`: la identidad se ha incorporado a las seis páginas legales y la QA confirma su ausencia en metadata, OpenGraph, JSON-LD, analytics, logs, formularios y páginas comerciales. La revisión contractual/profesional recomendada puede registrarse como riesgo aceptado o cerrarse con asesoría, pero no constituye un input técnico pendiente ni se sustituye con inferencias.

## Fuentes oficiales consultadas

- AEPD: [derecho de información](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion), [ejercicio de derechos](https://www.aepd.es/derechos-y-deberes/ejerce-tus-derechos) y [Guía de cookies](https://www.aepd.es/guias/guia-cookies.pdf).
- EUR-Lex: [Reglamento (UE) 2016/679, artículo 13](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32016R0679).
- Vercel: [Data Processing Addendum](https://vercel.com/legal/dpa).
- HubSpot: [Data Processing Agreement](https://legal.hubspot.com/dpa) y [data hosting](https://knowledge.hubspot.com/account-security/hubspot-cloud-infrastructure-and-data-hosting-frequently-asked-questions).
- Brevo: [DPA location](https://help.brevo.com/hc/en-us/articles/15403782599570-Where-can-I-find-the-Data-Processing-Agreement-DPA) y [data storage location](https://help.brevo.com/hc/en-us/articles/360001005510-Data-storage-location).
- Google: [Analytics Data Processing Terms](https://support.google.com/analytics/answer/3379636), [international transfers](https://business.safety.google/adsdatatransfers/) y [GA4 cookies](https://support.google.com/analytics/answer/11397207).

Estas fuentes permiten documentar el marco publicado por cada proveedor; no confirman por sí mismas el plan, entidad, región o settings contratados por HEYDE Studio y no sustituyen asesoramiento jurídico.
