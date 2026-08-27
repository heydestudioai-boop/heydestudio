// Pure arithmetic only. Neither an ROI estimate nor a forecast of new customers.
export function calculateCustomerEquivalent(planPrice: number, customerValue: string): number | null {
  const value = customerValue.trim();
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(value)) return null;
  const amount = Number(value.replace(',', '.'));
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(planPrice) || planPrice <= 0) return null;
  return Math.ceil(planPrice / amount);
}
