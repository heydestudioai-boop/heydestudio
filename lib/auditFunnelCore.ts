import { createHmac } from 'node:crypto';
import { z } from 'zod';

export const AUDIT_LEAD_TYPE = 'local_audit' as const;
export const AUDIT_SOURCE = 'website' as const;

export const AUDIT_STATUSES = [
  'audit_requested',
  'audit_in_preparation',
  'audit_ready',
  'audit_delivered',
] as const;

export type AuditStatus = (typeof AUDIT_STATUSES)[number];
export type AuditLocale = 'es' | 'en';

export interface ProposalDealContactState {
  auditRequestId?: string;
  auditStatus?: AuditStatus;
  isTest?: boolean;
}

export type ProposalDealEligibility =
  | { allowed: true }
  | {
      allowed: false;
      reason: 'test_contact' | 'request_mismatch' | 'audit_not_delivered';
    };

const normalizedString = (max: number) =>
  z.string().trim().min(1, 'Este campo es obligatorio.').max(max);

export function isValidBusinessPresence(value: string) {
  const normalized = value.trim();
  if (/^@[a-z0-9._]{1,30}$/i.test(normalized)) return true;

  const candidate = /^https?:\/\//i.test(normalized)
    ? normalized
    : `https://${normalized}`;

  try {
    const url = new URL(candidate);
    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      url.hostname.includes('.') &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export const auditRequestSchema = z
  .object({
    businessName: normalizedString(160),
    cityArea: normalizedString(160),
    businessPresence: normalizedString(500).refine(
      isValidBusinessPresence,
      'Introduce una web, un perfil de Instagram o un usuario como @negocio.'
    ),
    contactName: normalizedString(120),
    email: z.string().trim().email('Introduce un email válido.').max(254),
    phone: z.string().trim().max(40).optional().default(''),
    privacyConsent: z.literal(true, {
      error: 'Necesitamos tu consentimiento para gestionar la solicitud.',
    }),
    locale: z.enum(['es', 'en']).default('es'),
    fax: z.string().trim().max(500).optional().default(''),
  })
  .strict();

export type AuditRequestPayload = z.infer<typeof auditRequestSchema>;

export interface NormalizedAuditRequest {
  businessName: string;
  cityArea: string;
  businessPresence: string;
  contactName: string;
  email: string;
  phone: string;
  locale: AuditLocale;
}

function collapseWhitespace(value: string) {
  return value.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

export function normalizeAuditRequest(
  payload: AuditRequestPayload
): NormalizedAuditRequest {
  return {
    businessName: collapseWhitespace(payload.businessName),
    cityArea: collapseWhitespace(payload.cityArea),
    businessPresence: collapseWhitespace(payload.businessPresence),
    contactName: collapseWhitespace(payload.contactName),
    email: payload.email.trim().toLowerCase(),
    phone: collapseWhitespace(payload.phone || ''),
    locale: payload.locale,
  };
}

function utcDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function createAuditRequestId({
  request,
  secret,
  now,
}: {
  request: NormalizedAuditRequest;
  secret: string;
  now: Date;
}) {
  const identity = [
    request.email,
    request.businessName.toLocaleLowerCase('es'),
    request.businessPresence.toLocaleLowerCase('es'),
    utcDay(now),
  ].join('|');

  const digest = createHmac('sha256', secret).update(identity).digest('hex');
  return `audit_v1_${digest.slice(0, 48)}`;
}

export function isAuditTestMode(env: NodeJS.ProcessEnv) {
  if (env.AUDIT_DARK_MODE === 'true') return true;
  if (env.VERCEL_ENV === 'production') return false;
  return true;
}

export function isAuditFormEnabled(env: NodeJS.ProcessEnv) {
  return env.AUDIT_FORM_ENABLED === 'true';
}

export function isAllowedAuditTestRecipient(
  email: string,
  allowlistValue: string | undefined
) {
  const allowlist = (allowlistValue || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return allowlist.includes(email.trim().toLowerCase());
}

export function assessProposalDealEligibility(
  contact: ProposalDealContactState,
  auditRequestId: string
): ProposalDealEligibility {
  if (contact.isTest) return { allowed: false, reason: 'test_contact' };
  if (contact.auditRequestId !== auditRequestId) {
    return { allowed: false, reason: 'request_mismatch' };
  }
  if (contact.auditStatus !== 'audit_delivered') {
    return { allowed: false, reason: 'audit_not_delivered' };
  }

  return { allowed: true };
}

export function proposalDealAuditMarker(auditRequestId: string) {
  return `[HEYDE_AUDIT_REQUEST:${auditRequestId}]`;
}
