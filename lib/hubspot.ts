import {
  AUDIT_STATUSES,
  assessProposalDealEligibility,
  proposalDealAuditMarker,
  type AuditStatus,
} from '@/lib/auditFunnelCore';
import {
  BRAND_INQUIRY_LEAD_TYPE,
  BRAND_INQUIRY_SOURCE,
  buildBrandInquiryMessage,
  hubSpotProjectType,
  parseBrandInquiryMessage,
  type BrandInquiryConfirmationStatus,
  type BrandInquiryRecord,
} from '@/lib/brandInquiryCore';
import type { BrandInquirySaveResult } from '@/lib/brandInquiryWorkflow';

type HubSpotProperties = Record<string, string | number | undefined>;

interface HubSpotContactInput {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message?: string;
  industry?: string;
  source: string;
  lifecycleStage?: string;
}

interface HubSpotDealInput {
  contactId: string;
  dealName: string;
  dealStage: string;
  closeDate?: Date;
  amount?: number;
  description?: string;
}

interface HubSpotResult {
  ok: boolean;
  skipped?: boolean;
  id?: string;
  error?: string;
}

export interface HubSpotDealRecord {
  id: string;
  properties: {
    dealname?: string;
    dealstage?: string;
    closedate?: string;
    description?: string;
  };
  contactIds: string[];
}

export interface HubSpotContactRecord {
  id: string;
  properties: {
    email?: string;
    firstname?: string;
    lastname?: string;
    company?: string;
  };
}

const HUBSPOT_API_BASE = 'https://api.hubapi.com';

function getHubSpotToken() {
  return process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_API_KEY || '';
}

export function isHubSpotConfigured() {
  return Boolean(getHubSpotToken());
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() || name.trim();
  const lastName = parts.join(' ');

  return { firstName, lastName };
}

function cleanProperties(properties: HubSpotProperties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined && value !== '')
  );
}

function extractMissingProperties(errorBody: string) {
  return Array.from(
    new Set(
      [
        ...errorBody.matchAll(/Property "([^"]+)" does not exist/g),
        ...errorBody.matchAll(/property named '([^']+)'/gi),
      ].map((match) => match[1]).filter(Boolean)
    )
  );
}

async function hubSpotFetch(
  path: string,
  init: RequestInit,
  retryWithoutProperties = true
) {
  const token = getHubSpotToken();
  const response = await fetch(`${HUBSPOT_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  if (response.ok || !retryWithoutProperties || !init.body || response.status !== 400) {
    return response;
  }

  const errorBody = await response.text();
  const missingProperties = extractMissingProperties(errorBody);
  if (missingProperties.length === 0) {
    return new Response(errorBody, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  const payload = JSON.parse(String(init.body)) as {
    properties?: HubSpotProperties;
  };

  if (!payload.properties) {
    return new Response(errorBody, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  for (const property of missingProperties) {
    delete payload.properties[property];
  }

  return hubSpotFetch(
    path,
    {
      ...init,
      body: JSON.stringify(payload),
    },
    false
  );
}

function contactProperties(input: HubSpotContactInput, includeLifecycleStage: boolean) {
  const { firstName, lastName } = splitName(input.name);

  return cleanProperties({
    email: input.email,
    firstname: firstName,
    lastname: lastName,
    company: input.company,
    industry: input.industry,
    lead_source: input.source,
    project_type: input.service,
    message: input.message,
    lifecyclestage: includeLifecycleStage ? input.lifecycleStage : undefined,
  });
}

async function createHubSpotContact(input: HubSpotContactInput): Promise<HubSpotResult> {
  const response = await hubSpotFetch('/crm/v3/objects/contacts', {
    method: 'POST',
    body: JSON.stringify({
      properties: contactProperties(input, true),
    }),
  });

  if (response.status === 409) {
    return updateHubSpotContact(input);
  }

  if (!response.ok) {
    return { ok: false, error: await response.text() };
  }

  const data = await response.json();
  return { ok: true, id: data.id };
}

async function updateHubSpotContact(input: HubSpotContactInput): Promise<HubSpotResult> {
  const response = await hubSpotFetch(
    `/crm/v3/objects/contacts/${encodeURIComponent(input.email)}?idProperty=email`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        properties: contactProperties(input, false),
      }),
    }
  );

  if (response.status === 404) {
    return createHubSpotContact(input);
  }

  if (!response.ok) {
    return { ok: false, error: await response.text() };
  }

  const data = await response.json();
  return { ok: true, id: data.id };
}

export async function upsertHubSpotContact(
  input: HubSpotContactInput
): Promise<HubSpotResult> {
  if (!isHubSpotConfigured()) {
    return { ok: true, skipped: true };
  }

  return updateHubSpotContact(input);
}

export async function createHubSpotDeal(input: HubSpotDealInput): Promise<HubSpotResult> {
  if (!isHubSpotConfigured()) {
    return { ok: true, skipped: true };
  }

  const response = await hubSpotFetch('/crm/v3/objects/deals', {
    method: 'POST',
    body: JSON.stringify({
      properties: cleanProperties({
        dealname: input.dealName,
        pipeline: process.env.HUBSPOT_DEAL_PIPELINE || 'default',
        dealstage: input.dealStage,
        closedate: input.closeDate?.getTime(),
        amount: input.amount,
        description: input.description,
      }),
      associations: [
        {
          to: { id: input.contactId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 3,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    return { ok: false, error: await response.text() };
  }

  const data = await response.json();
  return { ok: true, id: data.id };
}

export async function findHubSpotDealByCalendlyEvent(
  calendlyEventUri: string
): Promise<HubSpotResult> {
  if (!isHubSpotConfigured()) {
    return { ok: true, skipped: true };
  }

  const response = await hubSpotFetch('/crm/v3/objects/deals/search', {
    method: 'POST',
    body: JSON.stringify({
      query: calendlyEventUri.split('/').pop() || calendlyEventUri,
      limit: 1,
      properties: ['dealname', 'description'],
    }),
  }, false);

  if (!response.ok) {
    return { ok: false, error: await response.text() };
  }

  const data = await response.json();
  const match = data.results?.find((deal: { properties?: { description?: string } }) =>
    deal.properties?.description?.includes(calendlyEventUri)
  );

  return match ? { ok: true, id: match.id } : { ok: true };
}

export async function updateHubSpotDealStage(
  dealId: string,
  stage: string
): Promise<HubSpotResult & { stage?: string }> {
  if (!isHubSpotConfigured()) {
    return { ok: true, skipped: true };
  }

  const response = await hubSpotFetch(`/crm/v3/objects/deals/${dealId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      properties: {
        dealstage: stage,
      },
    }),
  });

  if (!response.ok) {
    return { ok: false, error: await response.text() };
  }

  const data = await response.json();
  return {
    ok: true,
    id: data.id,
    stage: data.properties.dealstage,
  };
}

export async function listHubSpotDealsForFollowups(): Promise<
  | { ok: true; deals: HubSpotDealRecord[] }
  | { ok: false; error: string }
> {
  if (!isHubSpotConfigured()) {
    return { ok: true, deals: [] };
  }

  const response = await hubSpotFetch(
    '/crm/v3/objects/deals?limit=100&properties=dealname,dealstage,closedate,description&associations=contacts',
    { method: 'GET' },
    false
  );

  if (!response.ok) {
    return { ok: false, error: await response.text() };
  }

  const data = await response.json();
  const deals: HubSpotDealRecord[] = (data.results || []).map(
    (deal: {
      id: string;
      properties?: HubSpotDealRecord['properties'];
      associations?: {
        contacts?: {
          results?: Array<{ id: string }>;
        };
      };
    }) => ({
      id: deal.id,
      properties: deal.properties || {},
      contactIds:
        deal.associations?.contacts?.results?.map((contact) => contact.id).filter(Boolean) || [],
    })
  );

  return { ok: true, deals };
}

export async function getHubSpotContactById(
  contactId: string
): Promise<
  | { ok: true; contact: HubSpotContactRecord }
  | { ok: false; error: string }
> {
  if (!isHubSpotConfigured()) {
    return { ok: false, error: 'HubSpot not configured' };
  }

  const response = await hubSpotFetch(
    `/crm/v3/objects/contacts/${encodeURIComponent(contactId)}?properties=email,firstname,lastname,company`,
    { method: 'GET' },
    false
  );

  if (!response.ok) {
    return { ok: false, error: await response.text() };
  }

  const data = await response.json();
  return {
    ok: true,
    contact: {
      id: data.id,
      properties: data.properties || {},
    },
  };
}

export async function updateHubSpotDealDescription(
  dealId: string,
  description: string
): Promise<HubSpotResult> {
  if (!isHubSpotConfigured()) {
    return { ok: true, skipped: true };
  }

  const response = await hubSpotFetch(`/crm/v3/objects/deals/${dealId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      properties: {
        description,
      },
    }),
  });

  if (!response.ok) {
    return { ok: false, error: await response.text() };
  }

  const data = await response.json();
  return { ok: true, id: data.id };
}

export async function checkHubSpotConnection() {
  if (!isHubSpotConfigured()) {
    return {
      configured: false,
      contactsRead: false,
      dealsRead: false,
    };
  }

  const [contactsResponse, dealsResponse] = await Promise.all([
    hubSpotFetch('/crm/v3/objects/contacts?limit=1', { method: 'GET' }, false),
    hubSpotFetch('/crm/v3/objects/deals?limit=1', { method: 'GET' }, false),
  ]);

  return {
    configured: true,
    contactsRead: contactsResponse.ok,
    dealsRead: dealsResponse.ok,
    contactsStatus: contactsResponse.status,
    dealsStatus: dealsResponse.status,
  };
}

export type HubSpotAuditConfirmationStatus =
  | 'pending'
  | 'sent'
  | 'failed';

export interface HubSpotAuditRequestInput {
  requestId: string;
  businessName: string;
  cityArea: string;
  businessPresence: string;
  contactName: string;
  email: string;
  phone: string;
  locale: 'es' | 'en';
  requestedAt: Date;
  privacyConsentAt: Date;
  isTest: boolean;
}

export type HubSpotAuditSaveResult =
  | {
      ok: true;
      created: boolean;
      contactId: string;
      confirmationStatus: HubSpotAuditConfirmationStatus;
    }
  | {
      ok: false;
      reason: 'not_configured' | 'schema_invalid' | 'provider_unavailable';
    };

interface HubSpotPropertyDefinition {
  name?: string;
  type?: string;
  fieldType?: string;
  hasUniqueValue?: boolean;
  options?: Array<{ value?: string }>;
}

interface HubSpotPropertyRead {
  property?: HubSpotPropertyDefinition;
  providerUnavailable: boolean;
}

interface HubSpotAuditContactSnapshot {
  id: string;
  auditRequestId?: string;
  auditStatus?: AuditStatus;
  confirmationStatus: HubSpotAuditConfirmationStatus;
  isTest: boolean;
}

const AUDIT_CONTACT_PROPERTIES = [
  'lead_type',
  'lead_source',
  'audit_request_id',
  'audit_status',
  'audit_requested_at',
  'audit_delivered_at',
  'audit_locale',
  'audit_source',
  'is_test',
  'audit_privacy_consent_at',
  'audit_confirmation_status',
  'audit_confirmation_sent_at',
] as const;

let auditContactSchemaValidated = false;

function hasOption(definition: HubSpotPropertyDefinition | undefined, option: string) {
  return Boolean(definition?.options?.some((item) => item.value === option));
}

function isAuditConfirmationStatus(
  value: string | undefined
): value is HubSpotAuditConfirmationStatus {
  return (
    value === 'pending' ||
    value === 'sent' ||
    value === 'failed'
  );
}

function parseAuditStatus(value: string | undefined): AuditStatus | undefined {
  return AUDIT_STATUSES.includes(value as AuditStatus)
    ? (value as AuditStatus)
    : undefined;
}

async function readHubSpotProperty(
  objectType: 'contacts' | 'deals',
  propertyName: string
): Promise<HubSpotPropertyRead> {
  const response = await hubSpotFetch(
    '/crm/v3/properties/' +
      objectType +
      '/' +
      encodeURIComponent(propertyName),
    { method: 'GET' },
    false
  );

  if (response.ok) {
    return {
      property: (await response.json()) as HubSpotPropertyDefinition,
      providerUnavailable: false,
    };
  }

  return {
    providerUnavailable: response.status === 429 || response.status >= 500,
  };
}

async function ensureHubSpotAuditContactSchema(): Promise<
  | { ok: true }
  | {
      ok: false;
      reason: 'not_configured' | 'schema_invalid' | 'provider_unavailable';
    }
> {
  if (!isHubSpotConfigured()) {
    return { ok: false, reason: 'not_configured' };
  }
  if (auditContactSchemaValidated) return { ok: true };

  const reads = await Promise.all(
    AUDIT_CONTACT_PROPERTIES.map((propertyName) =>
      readHubSpotProperty('contacts', propertyName)
    )
  );

  if (reads.some((readResult) => readResult.providerUnavailable)) {
    return { ok: false, reason: 'provider_unavailable' };
  }

  const definitions = new Map(
    reads
      .map((readResult) => readResult.property)
      .filter(
        (property): property is HubSpotPropertyDefinition =>
          Boolean(property?.name)
      )
      .map((property) => [property.name as string, property])
  );
  const property = (name: (typeof AUDIT_CONTACT_PROPERTIES)[number]) =>
    definitions.get(name);

  const schemaValid = Boolean(
    property('lead_type')?.type === 'enumeration' &&
      hasOption(property('lead_type'), 'local_audit') &&
      hasOption(property('lead_type'), 'brand_inquiry') &&
      property('lead_source')?.type === 'enumeration' &&
      hasOption(property('lead_source'), 'audit') &&
      property('audit_request_id')?.type === 'string' &&
      property('audit_request_id')?.hasUniqueValue === true &&
      property('audit_status')?.type === 'enumeration' &&
      AUDIT_STATUSES.every((status) =>
        hasOption(property('audit_status'), status)
      ) &&
      property('audit_requested_at')?.type === 'datetime' &&
      property('audit_delivered_at')?.type === 'datetime' &&
      property('audit_locale')?.type === 'enumeration' &&
      hasOption(property('audit_locale'), 'es') &&
      hasOption(property('audit_locale'), 'en') &&
      property('audit_source')?.type === 'string' &&
      property('is_test')?.type === 'enumeration' &&
      hasOption(property('is_test'), 'true') &&
      hasOption(property('is_test'), 'false') &&
      property('audit_privacy_consent_at')?.type === 'datetime' &&
      property('audit_confirmation_status')?.type === 'enumeration' &&
      ['pending', 'sent', 'failed'].every((status) =>
        hasOption(property('audit_confirmation_status'), status)
      ) &&
      property('audit_confirmation_sent_at')?.type === 'datetime'
  );

  if (!schemaValid) {
    return { ok: false, reason: 'schema_invalid' };
  }

  auditContactSchemaValidated = true;
  return { ok: true };
}

async function findHubSpotAuditContact(
  propertyName: 'audit_request_id' | 'email',
  value: string
): Promise<
  | { ok: true; contact?: HubSpotAuditContactSnapshot }
  | { ok: false }
> {
  const response = await hubSpotFetch(
    '/crm/v3/objects/contacts/search',
    {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName,
                operator: 'EQ',
                value,
              },
            ],
          },
        ],
        properties: [
          'audit_request_id',
          'audit_status',
          'audit_confirmation_status',
          'is_test',
        ],
        limit: 1,
      }),
    },
    false
  );

  if (!response.ok) return { ok: false };

  const data = (await response.json()) as {
    results?: Array<{
      id: string;
      properties?: {
        audit_request_id?: string;
        audit_status?: string;
        audit_confirmation_status?: string;
        is_test?: string;
      };
    }>;
  };
  const match = data.results?.[0];

  if (!match) return { ok: true };

  return {
    ok: true,
    contact: {
      id: match.id,
      auditRequestId: match.properties?.audit_request_id,
      auditStatus: parseAuditStatus(match.properties?.audit_status),
      confirmationStatus: isAuditConfirmationStatus(
        match.properties?.audit_confirmation_status
      )
        ? match.properties.audit_confirmation_status
        : 'pending',
      isTest: match.properties?.is_test === 'true',
    },
  };
}

function duplicateAuditContact(
  contact: HubSpotAuditContactSnapshot
): HubSpotAuditSaveResult {
  return {
    ok: true,
    created: false,
    contactId: contact.id,
    confirmationStatus: contact.confirmationStatus,
  };
}

function auditContactProperties(
  input: HubSpotAuditRequestInput,
  initialConfirmationStatus: HubSpotAuditConfirmationStatus
) {
  const { firstName, lastName } = splitName(input.contactName);

  return cleanProperties({
    email: input.email,
    firstname: firstName,
    lastname: lastName,
    company: input.businessName,
    city: input.cityArea,
    website: input.businessPresence,
    phone: input.phone,
    lead_type: 'local_audit',
    lead_source: 'audit',
    audit_request_id: input.requestId,
    audit_status: 'audit_requested',
    audit_requested_at: String(input.requestedAt.getTime()),
    audit_locale: input.locale,
    audit_source: 'website',
    is_test: String(input.isTest),
    audit_privacy_consent_at: String(input.privacyConsentAt.getTime()),
    audit_confirmation_status: initialConfirmationStatus,
  });
}

export async function saveHubSpotAuditContactRequest(
  input: HubSpotAuditRequestInput,
  initialConfirmationStatus: HubSpotAuditConfirmationStatus
): Promise<HubSpotAuditSaveResult> {
  const schema = await ensureHubSpotAuditContactSchema();
  if (!schema.ok) return schema;

  const existingByRequest = await findHubSpotAuditContact(
    'audit_request_id',
    input.requestId
  );
  if (!existingByRequest.ok) {
    return { ok: false, reason: 'provider_unavailable' };
  }
  if (existingByRequest.contact) {
    return duplicateAuditContact(existingByRequest.contact);
  }

  const existingByEmail = await findHubSpotAuditContact('email', input.email);
  if (!existingByEmail.ok) {
    return { ok: false, reason: 'provider_unavailable' };
  }

  const currentContact = existingByEmail.contact;
  if (
    currentContact?.auditRequestId &&
    currentContact.auditStatus !== 'audit_delivered'
  ) {
    return duplicateAuditContact(currentContact);
  }

  const properties = auditContactProperties(input, initialConfirmationStatus);
  if (currentContact) {
    properties.audit_delivered_at = '';
    properties.audit_confirmation_sent_at = '';

    const response = await hubSpotFetch(
      '/crm/v3/objects/contacts/' + encodeURIComponent(currentContact.id),
      {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      },
      false
    );

    if (!response.ok) {
      return {
        ok: false,
        reason: response.status === 400 ? 'schema_invalid' : 'provider_unavailable',
      };
    }

    return {
      ok: true,
      created: true,
      contactId: currentContact.id,
      confirmationStatus: initialConfirmationStatus,
    };
  }

  const response = await hubSpotFetch(
    '/crm/v3/objects/contacts',
    {
      method: 'POST',
      body: JSON.stringify({ properties }),
    },
    false
  );

  if (response.status === 409) {
    const duplicateByRequest = await findHubSpotAuditContact(
      'audit_request_id',
      input.requestId
    );
    if (duplicateByRequest.ok && duplicateByRequest.contact) {
      return duplicateAuditContact(duplicateByRequest.contact);
    }

    const duplicateByEmail = await findHubSpotAuditContact('email', input.email);
    if (
      duplicateByEmail.ok &&
      duplicateByEmail.contact?.auditRequestId &&
      duplicateByEmail.contact.auditStatus !== 'audit_delivered'
    ) {
      return duplicateAuditContact(duplicateByEmail.contact);
    }
  }

  if (!response.ok) {
    return {
      ok: false,
      reason: response.status === 400 ? 'schema_invalid' : 'provider_unavailable',
    };
  }

  const data = (await response.json()) as { id: string };
  return {
    ok: true,
    created: true,
    contactId: data.id,
    confirmationStatus: initialConfirmationStatus,
  };
}

export async function updateHubSpotAuditContactConfirmationStatus(
  contactId: string,
  status: HubSpotAuditConfirmationStatus,
  sentAt?: Date
) {
  if (!isHubSpotConfigured()) return false;

  const response = await hubSpotFetch(
    '/crm/v3/objects/contacts/' + encodeURIComponent(contactId),
    {
      method: 'PATCH',
      body: JSON.stringify({
        properties: cleanProperties({
          audit_confirmation_status: status,
          audit_confirmation_sent_at: sentAt
            ? String(sentAt.getTime())
            : undefined,
        }),
      }),
    },
    false
  );

  return response.ok;
}

const BRAND_INQUIRY_CONTACT_PROPERTIES = [
  'lead_type',
  'lead_source',
  'project_type',
  'message',
  'is_test',
] as const;

let brandInquiryContactSchemaValidated = false;

async function ensureHubSpotBrandInquiryContactSchema(): Promise<
  | { ok: true }
  | {
      ok: false;
      reason: 'not_configured' | 'schema_invalid' | 'provider_unavailable';
    }
> {
  if (!isHubSpotConfigured()) return { ok: false, reason: 'not_configured' };
  if (brandInquiryContactSchemaValidated) return { ok: true };

  const reads = await Promise.all(
    BRAND_INQUIRY_CONTACT_PROPERTIES.map((propertyName) =>
      readHubSpotProperty('contacts', propertyName)
    )
  );
  if (reads.some((readResult) => readResult.providerUnavailable)) {
    return { ok: false, reason: 'provider_unavailable' };
  }

  const definitions = new Map(
    reads
      .map((readResult) => readResult.property)
      .filter(
        (property): property is HubSpotPropertyDefinition =>
          Boolean(property?.name)
      )
      .map((property) => [property.name as string, property])
  );
  const property = (name: (typeof BRAND_INQUIRY_CONTACT_PROPERTIES)[number]) =>
    definitions.get(name);
  const valid = Boolean(
    property('lead_type')?.type === 'enumeration' &&
      hasOption(property('lead_type'), BRAND_INQUIRY_LEAD_TYPE) &&
      property('lead_source')?.type === 'enumeration' &&
      hasOption(property('lead_source'), BRAND_INQUIRY_SOURCE) &&
      property('project_type')?.type === 'enumeration' &&
      hasOption(property('project_type'), 'campaign') &&
      hasOption(property('project_type'), 'digital_identity') &&
      property('message')?.type === 'string' &&
      property('is_test')?.type === 'enumeration' &&
      hasOption(property('is_test'), 'true') &&
      hasOption(property('is_test'), 'false')
  );
  if (!valid) return { ok: false, reason: 'schema_invalid' };

  brandInquiryContactSchemaValidated = true;
  return { ok: true };
}

interface HubSpotBrandInquirySnapshot {
  id: string;
  message?: string;
}

async function findHubSpotBrandInquiryContactByEmail(email: string): Promise<
  | { ok: true; contact?: HubSpotBrandInquirySnapshot }
  | { ok: false }
> {
  const response = await hubSpotFetch(
    '/crm/v3/objects/contacts/search',
    {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email,
              },
            ],
          },
        ],
        properties: ['message'],
        limit: 1,
      }),
    },
    false
  );
  if (!response.ok) return { ok: false };

  const data = (await response.json()) as {
    results?: Array<{ id: string; properties?: { message?: string } }>;
  };
  const contact = data.results?.[0];
  if (!contact) return { ok: true };
  return {
    ok: true,
    contact: { id: contact.id, message: contact.properties?.message },
  };
}

function brandInquiryContactProperties(
  record: BrandInquiryRecord,
  confirmationStatus: BrandInquiryConfirmationStatus,
  includeLifecycleStage: boolean
) {
  const { firstName, lastName } = splitName(record.name);
  return cleanProperties({
    email: record.email,
    firstname: firstName,
    lastname: lastName,
    company: record.company,
    website: record.presence,
    lead_type: BRAND_INQUIRY_LEAD_TYPE,
    lead_source: BRAND_INQUIRY_SOURCE,
    project_type: hubSpotProjectType(record.projectType),
    message: buildBrandInquiryMessage(record, confirmationStatus),
    is_test: String(record.isTest),
    lifecyclestage: includeLifecycleStage ? 'lead' : undefined,
  });
}

function duplicateBrandInquiry(
  contact: HubSpotBrandInquirySnapshot
): BrandInquirySaveResult | undefined {
  const marker = parseBrandInquiryMessage(contact.message);
  if (!marker) return undefined;
  return {
    ok: true,
    created: false,
    contactId: contact.id,
    confirmationStatus: marker.confirmationStatus,
  };
}

export async function saveHubSpotBrandInquiry(
  record: BrandInquiryRecord,
  initialConfirmationStatus: BrandInquiryConfirmationStatus
): Promise<BrandInquirySaveResult> {
  const schema = await ensureHubSpotBrandInquiryContactSchema();
  if (!schema.ok) return schema;

  const existing = await findHubSpotBrandInquiryContactByEmail(record.email);
  if (!existing.ok) return { ok: false, reason: 'provider_unavailable' };

  if (existing.contact) {
    const marker = parseBrandInquiryMessage(existing.contact.message);
    if (marker?.requestId === record.requestId) {
      return duplicateBrandInquiry(existing.contact)!;
    }

    const response = await hubSpotFetch(
      '/crm/v3/objects/contacts/' + encodeURIComponent(existing.contact.id),
      {
        method: 'PATCH',
        body: JSON.stringify({
          properties: brandInquiryContactProperties(
            record,
            initialConfirmationStatus,
            false
          ),
        }),
      },
      false
    );
    if (!response.ok) {
      return {
        ok: false,
        reason:
          response.status === 400 ? 'schema_invalid' : 'provider_unavailable',
      };
    }
    return {
      ok: true,
      created: true,
      contactId: existing.contact.id,
      confirmationStatus: initialConfirmationStatus,
    };
  }

  const response = await hubSpotFetch(
    '/crm/v3/objects/contacts',
    {
      method: 'POST',
      body: JSON.stringify({
        properties: brandInquiryContactProperties(
          record,
          initialConfirmationStatus,
          true
        ),
      }),
    },
    false
  );

  if (response.status === 409) {
    const raced = await findHubSpotBrandInquiryContactByEmail(record.email);
    if (!raced.ok || !raced.contact) {
      return { ok: false, reason: 'provider_unavailable' };
    }
    const marker = parseBrandInquiryMessage(raced.contact.message);
    if (marker?.requestId === record.requestId) {
      return duplicateBrandInquiry(raced.contact)!;
    }

    const update = await hubSpotFetch(
      '/crm/v3/objects/contacts/' + encodeURIComponent(raced.contact.id),
      {
        method: 'PATCH',
        body: JSON.stringify({
          properties: brandInquiryContactProperties(
            record,
            initialConfirmationStatus,
            false
          ),
        }),
      },
      false
    );
    if (!update.ok) return { ok: false, reason: 'provider_unavailable' };
    return {
      ok: true,
      created: true,
      contactId: raced.contact.id,
      confirmationStatus: initialConfirmationStatus,
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      reason:
        response.status === 400 ? 'schema_invalid' : 'provider_unavailable',
    };
  }
  const data = (await response.json()) as { id: string };
  return {
    ok: true,
    created: true,
    contactId: data.id,
    confirmationStatus: initialConfirmationStatus,
  };
}

export async function updateHubSpotBrandInquiryConfirmationStatus(
  contactId: string,
  record: BrandInquiryRecord,
  status: BrandInquiryConfirmationStatus
) {
  if (!isHubSpotConfigured()) return false;
  const current = await hubSpotFetch(
    '/crm/v3/objects/contacts/' +
      encodeURIComponent(contactId) +
      '?properties=message',
    { method: 'GET' },
    false
  );
  if (!current.ok) return false;
  const snapshot = (await current.json()) as {
    properties?: { message?: string };
  };
  if (
    parseBrandInquiryMessage(snapshot.properties?.message)?.requestId !==
    record.requestId
  ) {
    return false;
  }

  const response = await hubSpotFetch(
    '/crm/v3/objects/contacts/' + encodeURIComponent(contactId),
    {
      method: 'PATCH',
      body: JSON.stringify({
        properties: {
          message: buildBrandInquiryMessage(record, status),
        },
      }),
    },
    false
  );
  return response.ok;
}

export async function updateHubSpotAuditContactStatus(
  contactId: string,
  status: AuditStatus,
  changedAt = new Date()
) {
  if (!isHubSpotConfigured()) return false;

  const response = await hubSpotFetch(
    '/crm/v3/objects/contacts/' + encodeURIComponent(contactId),
    {
      method: 'PATCH',
      body: JSON.stringify({
        properties: cleanProperties({
          audit_status: status,
          audit_delivered_at:
            status === 'audit_delivered'
              ? String(changedAt.getTime())
              : undefined,
        }),
      }),
    },
    false
  );

  return response.ok;
}

export interface CreateProposalDealInput {
  contactId: string;
  auditRequestId: string;
  dealName: string;
  amount?: number;
  closeDate?: Date;
  description?: string;
}

export type CreateProposalDealResult =
  | { ok: true; created: boolean; dealId: string }
  | {
      ok: false;
      reason:
        | 'not_configured'
        | 'schema_invalid'
        | 'provider_unavailable'
        | 'contact_not_found'
        | 'test_contact'
        | 'request_mismatch'
        | 'audit_not_delivered';
    };

async function validateProposalDealStage(): Promise<
  | { ok: true; pipelineId: string; stageId: string }
  | {
      ok: false;
      reason: 'schema_invalid' | 'provider_unavailable';
    }
> {
  const pipelineId = process.env.HUBSPOT_DEAL_PIPELINE?.trim() || 'default';
  const stageId =
    process.env.HUBSPOT_PROPOSAL_SENT_STAGE?.trim() || 'contractsent';

  const response = await hubSpotFetch(
    '/crm/v3/pipelines/deals/' + encodeURIComponent(pipelineId),
    { method: 'GET' },
    false
  );

  if (!response.ok) {
    return {
      ok: false,
      reason:
        response.status === 404 || response.status === 400
          ? 'schema_invalid'
          : 'provider_unavailable',
    };
  }

  const pipeline = (await response.json()) as {
    stages?: Array<{ id?: string }>;
  };
  if (!pipeline.stages?.some((stage) => stage.id === stageId)) {
    return { ok: false, reason: 'schema_invalid' };
  }

  return { ok: true, pipelineId, stageId };
}

export async function createProposalDeal(
  input: CreateProposalDealInput
): Promise<CreateProposalDealResult> {
  if (!isHubSpotConfigured()) {
    return { ok: false, reason: 'not_configured' };
  }

  const contactSchema = await ensureHubSpotAuditContactSchema();
  if (!contactSchema.ok) return contactSchema;

  const proposalStage = await validateProposalDealStage();
  if (!proposalStage.ok) return proposalStage;

  const contactResponse = await hubSpotFetch(
    '/crm/v3/objects/contacts/' +
      encodeURIComponent(input.contactId) +
      '?properties=audit_request_id,audit_status,is_test',
    { method: 'GET' },
    false
  );

  if (contactResponse.status === 404) {
    return { ok: false, reason: 'contact_not_found' };
  }
  if (!contactResponse.ok) {
    return { ok: false, reason: 'provider_unavailable' };
  }

  const contact = (await contactResponse.json()) as {
    properties?: {
      audit_request_id?: string;
      audit_status?: string;
      is_test?: string;
    };
  };
  const eligibility = assessProposalDealEligibility(
    {
      auditRequestId: contact.properties?.audit_request_id,
      auditStatus: parseAuditStatus(contact.properties?.audit_status),
      isTest: contact.properties?.is_test === 'true',
    },
    input.auditRequestId
  );
  if (!eligibility.allowed) {
    return { ok: false, reason: eligibility.reason };
  }

  const marker = proposalDealAuditMarker(input.auditRequestId);
  const searchResponse = await hubSpotFetch(
    '/crm/v3/objects/deals/search',
    {
      method: 'POST',
      body: JSON.stringify({
        query: input.auditRequestId,
        properties: ['description'],
        limit: 10,
      }),
    },
    false
  );

  if (!searchResponse.ok) {
    return { ok: false, reason: 'provider_unavailable' };
  }

  const searchData = (await searchResponse.json()) as {
    results?: Array<{
      id: string;
      properties?: { description?: string };
    }>;
  };
  const duplicate = searchData.results?.find((deal) =>
    deal.properties?.description?.includes(marker)
  );
  if (duplicate) {
    return { ok: true, created: false, dealId: duplicate.id };
  }

  const description = input.description
    ? marker + '\n' + input.description
    : marker;
  const createResponse = await hubSpotFetch(
    '/crm/v3/objects/deals',
    {
      method: 'POST',
      body: JSON.stringify({
        properties: cleanProperties({
          dealname: input.dealName,
          pipeline: proposalStage.pipelineId,
          dealstage: proposalStage.stageId,
          closedate: input.closeDate?.getTime(),
          amount: input.amount,
          description,
        }),
        associations: [
          {
            to: { id: input.contactId },
            types: [
              {
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: 3,
              },
            ],
          },
        ],
      }),
    },
    false
  );

  if (!createResponse.ok) {
    return { ok: false, reason: 'provider_unavailable' };
  }

  const deal = (await createResponse.json()) as { id: string };
  return { ok: true, created: true, dealId: deal.id };
}
