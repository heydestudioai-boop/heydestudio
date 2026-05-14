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
