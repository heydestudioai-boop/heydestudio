import type {
  BrandInquiryConfirmationStatus,
  BrandInquiryRecord,
} from './brandInquiryCore.ts';

export type BrandInquirySaveResult =
  | {
      ok: true;
      created: boolean;
      contactId: string;
      confirmationStatus: BrandInquiryConfirmationStatus;
    }
  | {
      ok: false;
      reason: 'not_configured' | 'schema_invalid' | 'provider_unavailable';
    };

export interface BrandInquiryWorkflowDependencies {
  saveRecord: (
    record: BrandInquiryRecord,
    initialConfirmationStatus: BrandInquiryConfirmationStatus
  ) => Promise<BrandInquirySaveResult>;
  updateConfirmationStatus: (
    contactId: string,
    record: BrandInquiryRecord,
    status: BrandInquiryConfirmationStatus
  ) => Promise<boolean>;
  sendConfirmationEmail: (record: BrandInquiryRecord) => Promise<boolean>;
}

export type BrandInquiryWorkflowResult =
  | {
      accepted: true;
      duplicate: boolean;
      emailStatus: BrandInquiryConfirmationStatus | 'delayed';
    }
  | {
      accepted: false;
      reason: 'not_configured' | 'schema_invalid' | 'provider_unavailable';
    };

export async function executeBrandInquiry(
  record: BrandInquiryRecord,
  dependencies: BrandInquiryWorkflowDependencies
): Promise<BrandInquiryWorkflowResult> {
  const saved = await dependencies.saveRecord(record, 'pending');
  if (!saved.ok) return { accepted: false, reason: saved.reason };

  const duplicate = !saved.created;
  if (duplicate && saved.confirmationStatus === 'sent') {
    return { accepted: true, duplicate: true, emailStatus: 'sent' };
  }

  const emailSent = await dependencies.sendConfirmationEmail(record);
  if (!emailSent) {
    await dependencies.updateConfirmationStatus(
      saved.contactId,
      record,
      'failed'
    );
    return { accepted: true, duplicate, emailStatus: 'delayed' };
  }

  await dependencies.updateConfirmationStatus(saved.contactId, record, 'sent');
  return { accepted: true, duplicate, emailStatus: 'sent' };
}
