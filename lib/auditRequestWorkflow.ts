export type AuditConfirmationStatus =
  | 'pending'
  | 'sent'
  | 'failed';

export interface AuditWorkflowRecord {
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

export type AuditSaveResult =
  | {
      ok: true;
      created: true;
      contactId: string;
      confirmationStatus: AuditConfirmationStatus;
    }
  | {
      ok: true;
      created: false;
      contactId: string;
      confirmationStatus: AuditConfirmationStatus;
    }
  | {
      ok: false;
      reason: 'not_configured' | 'schema_invalid' | 'provider_unavailable';
    };

export interface AuditWorkflowDependencies {
  saveRecord: (
    record: AuditWorkflowRecord,
    initialConfirmationStatus: AuditConfirmationStatus
  ) => Promise<AuditSaveResult>;
  updateConfirmationStatus: (
    contactId: string,
    status: AuditConfirmationStatus,
    sentAt?: Date
  ) => Promise<boolean>;
  sendConfirmationEmail: (record: AuditWorkflowRecord) => Promise<boolean>;
}

export type AuditWorkflowResult =
  | {
      accepted: true;
      duplicate: boolean;
      emailStatus: AuditConfirmationStatus | 'delayed';
    }
  | {
      accepted: false;
      reason: 'not_configured' | 'schema_invalid' | 'provider_unavailable';
    };

export async function executeAuditRequest(
  record: AuditWorkflowRecord,
  dependencies: AuditWorkflowDependencies
): Promise<AuditWorkflowResult> {
  const initialStatus: AuditConfirmationStatus = 'pending';
  const saved = await dependencies.saveRecord(record, initialStatus);

  if (!saved.ok) {
    return { accepted: false, reason: saved.reason };
  }

  if (!saved.created) {
    return {
      accepted: true,
      duplicate: true,
      emailStatus: saved.confirmationStatus,
    };
  }

  const emailSent = await dependencies.sendConfirmationEmail(record);
  if (!emailSent) {
    await dependencies.updateConfirmationStatus(saved.contactId, 'failed');
    return { accepted: true, duplicate: false, emailStatus: 'delayed' };
  }

  await dependencies.updateConfirmationStatus(saved.contactId, 'sent', new Date());
  return { accepted: true, duplicate: false, emailStatus: 'sent' };
}
