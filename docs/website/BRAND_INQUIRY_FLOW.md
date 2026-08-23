# Brand inquiry flow

Documento técnico del flujo de proyectos de marca de HEYDE Studio.

## Límite de dominio

- `/audit`: negocio local, `lead_type=local_audit`.
- `/contact`: marca/proyecto avanzado, `lead_type=brand_inquiry`.

No se comparten estados de auditoría, Deals, Calendly, questionnaires, follow-ups o emails entre ambos dominios.

## Request

`POST /api/contact/submit`

Body estricto:

```json
{
  "name": "string",
  "company": "string",
  "email": "email",
  "presence": "optional website, URL or @handle",
  "projectType": "campaign | real_production | social_content | hybrid_production | generative_production | visual_development | other",
  "brief": "string",
  "privacyConsent": true,
  "fax": ""
}
```

Protecciones:

- Zod strict y límites de longitud;
- normalización NFKC y de whitespace;
- honeypot `fax`;
- rate limit de 4 intentos por IP/10 minutos;
- fuera de Production, el email debe pertenecer a `AUDIT_TEST_EMAIL_ALLOWLIST`;
- request id HMAC derivado con `INTERNAL_API_TOKEN`, sin PII legible.

## HubSpot

Upsert por email. Propiedades:

| Campo | Valor |
| --- | --- |
| `lead_type` | `brand_inquiry` |
| `lead_source` | `website` |
| `project_type` | `campaign` o `digital_identity` solo cuando aplica |
| `is_test` | `true` fuera de Production, `false` en Production |
| `message` | marcador técnico + brief |
| `lifecyclestage` | `lead` solo al crear |

El marcador es:

```text
[HEYDE_BRAND_INQUIRY:v1;id=<opaque>;status=pending|sent|failed;project=<type>;consent_at=<ISO>]
<brief>
```

No crea Deal ni modifica pipelines.

## Brevo

Solo se envía `Project inquiry received` al email del Contact después de persistir HubSpot. El request a Brevo añade:

- idempotency key UUID derivada del request id;
- tag `brand-inquiry-confirmation`.

Si Brevo falla, el marcador queda `failed` y la respuesta es 202 con `emailStatus=delayed`. Un reintento puede enviar la confirmación pendiente sin crear otro Contact.

## Respuestas

- 200: Contact persistido y confirmación aceptada o submit duplicado ya confirmado;
- 202: Contact persistido, confirmación retrasada;
- 400: body inválido;
- 403: destinatario Preview fuera de allowlist;
- 429: rate limit;
- 503: configuración, schema o proveedor CRM no disponible.

Las respuestas no exponen IDs de Contact, request ids, secretos ni datos internos de proveedor.

## Analytics

Los cuatro eventos `brand_inquiry_*` contienen únicamente categoría, path e idioma. La analítica no recibe campos del formulario.

## Operación segura

- No ejecutar submits de Production como prueba.
- En Preview, usar únicamente una dirección allowlisted y datos ficticios si el owner autoriza un E2E externo.
- La revisión de un Contact no debe convertirlo automáticamente en Deal.
- La limpieza de endpoints legacy requiere autorización separada.
