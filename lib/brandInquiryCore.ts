import { createHmac } from 'node:crypto';
import { z } from 'zod';

export const BRAND_INQUIRY_LEAD_TYPE = 'brand_inquiry' as const;
export const BRAND_INQUIRY_SOURCE = 'website' as const;

export const BRAND_PROJECT_TYPES = [
  'campaign',
  'real_production',
  'social_content',
  'hybrid_production',
  'generative_production',
  'visual_development',
  'other',
] as const;

export type BrandProjectType = (typeof BRAND_PROJECT_TYPES)[number];
export type BrandInquiryConfirmationStatus = 'pending' | 'sent' | 'failed';

const requiredString = (max: number) =>
  z.string().trim().min(1, 'This field is required.').max(max);

function isValidOptionalPresence(value: string) {
  const normalized = value.trim();
  if (!normalized) return true;
  if (/^@[a-z0-9._]{1,30}$/i.test(normalized)) return true;

  const candidate = /^https?:\/\//i.test(normalized)
    ? normalized
    : `https://${normalized}`;

  try {
    const url = new URL(candidate);
    return (
      ['http:', 'https:'].includes(url.protocol) &&
      url.hostname.includes('.') &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export const brandInquirySchema = z
  .object({
    name: requiredString(120),
    company: requiredString(160),
    email: z.string().trim().email('Enter a valid email address.').max(254),
    presence: z
      .string()
      .trim()
      .max(500)
      .optional()
      .default('')
      .refine(isValidOptionalPresence, 'Enter a website, social URL or @handle.'),
    projectType: z.enum(BRAND_PROJECT_TYPES),
    brief: requiredString(2000),
    privacyConsent: z.literal(true, {
      error: 'Consent is required to handle your inquiry.',
    }),
    fax: z.string().trim().max(500).optional().default(''),
  })
  .strict();

export type BrandInquiryPayload = z.infer<typeof brandInquirySchema>;

export interface NormalizedBrandInquiry {
  name: string;
  company: string;
  email: string;
  presence: string;
  projectType: BrandProjectType;
  brief: string;
}

export interface BrandInquiryRecord extends NormalizedBrandInquiry {
  requestId: string;
  requestedAt: Date;
  privacyConsentAt: Date;
  isTest: boolean;
}

function collapseWhitespace(value: string) {
  return value.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

export function normalizeBrandInquiry(
  payload: BrandInquiryPayload
): NormalizedBrandInquiry {
  return {
    name: collapseWhitespace(payload.name),
    company: collapseWhitespace(payload.company),
    email: payload.email.trim().toLowerCase(),
    presence: collapseWhitespace(payload.presence || ''),
    projectType: payload.projectType,
    brief: collapseWhitespace(payload.brief),
  };
}

function utcDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

function digestAsUuid(digest: string) {
  const hex = digest.slice(0, 32);
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    `5${hex.slice(13, 16)}`,
    `8${hex.slice(17, 20)}`,
    hex.slice(20, 32),
  ].join('-');
}

export function createBrandInquiryRequestId({
  request,
  secret,
  now,
}: {
  request: NormalizedBrandInquiry;
  secret: string;
  now: Date;
}) {
  const identity = [
    request.email,
    request.company.toLocaleLowerCase('en'),
    request.presence.toLocaleLowerCase('en'),
    request.projectType,
    request.brief.toLocaleLowerCase('en'),
    utcDay(now),
  ].join('|');
  const digest = createHmac('sha256', secret).update(identity).digest('hex');
  return `brand_v1_${digestAsUuid(digest)}`;
}

export function getBrandInquiryBrevoIdempotencyKey(requestId: string) {
  return requestId.replace(/^brand_v1_/, '');
}

export function isBrandInquiryTestMode(env: NodeJS.ProcessEnv) {
  return env.VERCEL_ENV !== 'production';
}

export function isAllowedBrandInquiryTestRecipient(
  email: string,
  allowlistValue: string | undefined
) {
  const allowlist = (allowlistValue || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return allowlist.includes(email.trim().toLowerCase());
}

export function hubSpotProjectType(projectType: BrandProjectType) {
  if (projectType === 'campaign') return 'campaign';
  if (projectType === 'visual_development') return 'digital_identity';
  return undefined;
}

const BRAND_MARKER = /^\[HEYDE_BRAND_INQUIRY:v1;id=([^;\]]+);status=(pending|sent|failed);project=([^;\]]+);consent_at=([^\]]+)\]$/;

export function buildBrandInquiryMessage(
  record: BrandInquiryRecord,
  confirmationStatus: BrandInquiryConfirmationStatus
) {
  const marker = [
    '[HEYDE_BRAND_INQUIRY:v1',
    `id=${record.requestId}`,
    `status=${confirmationStatus}`,
    `project=${record.projectType}`,
    `consent_at=${record.privacyConsentAt.toISOString()}]`,
  ].join(';');
  return `${marker}\n${record.brief}`;
}

export function parseBrandInquiryMessage(message: string | undefined) {
  if (!message) return undefined;
  const [marker] = message.split(/\r?\n/, 1);
  const match = marker.match(BRAND_MARKER);
  if (!match) return undefined;
  const [, requestId, status, projectType, consentAt] = match;
  if (!BRAND_PROJECT_TYPES.includes(projectType as BrandProjectType)) return undefined;

  return {
    requestId,
    confirmationStatus: status as BrandInquiryConfirmationStatus,
    projectType: projectType as BrandProjectType,
    consentAt,
  };
}
