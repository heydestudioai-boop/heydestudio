# Limpieza externa posterior a la migración

Fecha de inventario: 23 de agosto de 2026  
Estado: **PLANIFICADA, NO EJECUTADA**  
Gate: checkpoint post-cutover de 48 h `GREEN`, deploy Production de Lotes 4–7 expresamente autorizado y estabilización posterior del release.

Este documento no autoriza escrituras. Durante Lote 7 no se modificaron Vercel, HubSpot, Brevo, Calendly, variables, crons ni registros.

## Clasificación

- `SAFE_AFTER_48H`: operación técnicamente segura únicamente después del gate y una autorización concreta.
- `KEEP`: componente activo o evidencia que debe conservarse.
- `ROTATE`: credencial legacy que debe confirmarse revocada y retirarse de todos los scopes donde ya no se use.
- `ARCHIVE`: dato de prueba/histórico que no debe borrarse sin conservar trazabilidad.
- `OWNER_ACTION`: operación de panel, contrato o política que requiere al owner.

## Inventario y secuencia

| Elemento | Clasificación | Momento mínimo | Acción futura y evidencia |
|---|---|---|---|
| Evento Calendly legacy `/20min` | `OWNER_ACTION` | Después de 48 h GREEN y del deploy final estable | Confirmar que no tiene reservas, webhooks ni consumidores vigentes; desactivar o archivar desde Calendly. Conservar historial requerido. No crear evento sustituto como parte de esta limpieza. |
| 8 Deals TEST históricos | `ARCHIVE` | Después de 48 h GREEN y autorización CRM | Verificar IDs contra el snapshot, marcar/cerrar como TEST sin contactar a nadie y conservar trazabilidad. No borrar en masa. |
| Contact TEST Preview `850164683001` | `ARCHIVE` | Después del release final estable | Confirmar `is_test=true`, snapshot e inexistencia de asociaciones reales; archivar según la política de conservación aprobada. |
| Contact TEST Production `850627080421` | `ARCHIVE` | Después del release final estable | Mismo control; mantener separado del Contact Preview y de Contacts reales. |
| Emails TEST transaccionales de cutover | `KEEP` | Hasta política de conservación aprobada | Conservar como evidencia de QA dentro de la retención del proveedor; no reenviar ni convertir en campaña. |
| `AUDIT_TEST_EMAIL_ALLOWLIST` Preview | `KEEP` | Mientras Preview/QA exista | Mantener el gate allowlisted para impedir envíos de prueba a destinatarios no aprobados. Revisar direcciones al cerrar cada ciclo de QA. |
| `AUDIT_TEST_EMAIL_ALLOWLIST` Production | `OWNER_ACTION` | Después del release final estable | Decidir si se conserva para futuros tests oscuros controlados o se retira en una operación de variables separada. No afecta al funnel público normal. |
| `AUDIT_FORM_ENABLED` / `AUDIT_DARK_MODE` | `KEEP` | Permanente mientras sean los flags operativos | Son controles activos de apertura/rollback, no variables legacy. No retirarlos durante cleanup. |
| `BREVO_API_KEY` activa | `KEEP` | Permanente mientras Brevo sea proveedor | Mantener por scope, sin exponer valor; seguir health y rotación normal de credenciales. |
| API key Brevo legacy deshabilitada | `ROTATE` | Después de verificar que ningún scope la consume | Confirmar en Brevo que está revocada/deshabilitada, retirar cualquier copia residual y registrar fecha/fingerprint irreversible, nunca el secreto. |
| Overrides/keys QA antiguas de Brevo | `ROTATE` | Después de inventario por scope | Conservar solo la credencial activa necesaria. Retirar revisiones/copias obsoletas de Preview/Development mediante cambio aislado y verificable. |
| Variables Calendly legacy | `OWNER_ACTION` | Después del deploy final y confirmación 404/no consumidores | Inventariar por nombre y scope; retirar tokens/webhook secrets solo cuando el evento/webhook esté cerrado y no exista rollback aprobado. |
| Variables de endpoints legacy retirados | `SAFE_AFTER_48H` | Después del deploy final estable | Inventariar `CRON_SECRET` y variables exclusivas de handlers retirados; no retirar `INTERNAL_API_TOKEN`, que sigue siendo dependencia de los funnels actuales. |
| Crons Calendly sync y follow-up | `KEEP` (deshabilitados) | Hasta confirmar el release final | Mantener cron count `0`; no reactivar. Tras el deploy, verificar que la configuración versionada no puede recrearlos antes de limpiar secretos. |
| Datos históricos HubSpot no TEST | `KEEP` | Según política legal | No modificar ni mezclar con el cleanup TEST. Aplicar solo la futura política de conservación. |
| Logs Vercel, Brevo, HubSpot y analytics | `KEEP` | Hasta decisión legal de retención | Conservar acceso y evidencia necesaria; no exportar PII a documentación. Definir borrado/anonimización tras revisión legal. |
| Documentos de auditoría, cutover y reconciliación | `KEEP` | Permanente según política documental | Fuente operacional de decisiones, IDs técnicos y gates; contienen solo la PII mínima/redactada. |

## Gate operativo obligatorio

1. Checkpoint 48 h `GREEN` documentado.
2. Inputs legales y política de conservación aprobados.
3. Deploy final Lotes 4–7 autorizado y validado en Production.
4. Snapshot read-only de cada elemento externo.
5. Una operación por proveedor, con lista exacta de targets y rollback.
6. Verificación posterior: cron count `0`, endpoints legacy `404/410` según mapa, funnels activos, cero Deals automáticos y cero mensajes inesperados.

## Riesgo de configuración versionada resuelto

Una autorización específica posterior a Lote 7 permitió eliminar del `vercel.json` versionado los schedules de `/api/calendly/sync` y `/api/followups/run`. El manifiesto conserva únicamente su `$schema`; ningún deployment futuro desde este árbol debe volver a registrar esos jobs. Production no se modificó y conserva el estado aprobado `cron count = 0`. Tras cualquier deploy Production futuro seguirá siendo obligatorio verificar ese count como gate read-only.

## No ejecutar como parte del release

- no borrar Contacts o Deals;
- no contactar TEST ni leads reales;
- no reactivar follow-up o Calendly sync;
- no reutilizar el evento `/20min` como nuevo funnel;
- no eliminar `INTERNAL_API_TOKEN`;
- no rotar la key Brevo activa sin una ventana específica;
- no convertir logs o datos históricos en documentación con PII.
