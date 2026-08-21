// Legacy alias kept until cutover cleanup. It uses the same authenticated,
// allowlisted audit-confirmation test as the canonical internal endpoint.
export const runtime = 'nodejs';

export { POST } from '@/app/api/internal/audit/brevo-test/route';
