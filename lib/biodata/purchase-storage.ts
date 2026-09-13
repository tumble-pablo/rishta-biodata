// Persists whether the current visitor has "paid" to remove the watermark.
// Stored client-side only, separate from the biodata draft since it isn't
// biodata content. See `payment.ts` for the (placeholder) payment flow this
// backs, and its "Future Razorpay swap-in" note for the real-world caveat:
// without a backend, this is a trusted client flag, not a verified purchase.

const STORAGE_KEY = "rishta-biodata:purchase:v1";
const STORAGE_VERSION = 1;

export interface PurchaseStatus {
  hasPaid: boolean;
  token: string | null;
  paidAt: string | null;
}

interface StoredPurchase extends PurchaseStatus {
  version: number;
}

const UNPAID_STATUS: PurchaseStatus = { hasPaid: false, token: null, paidAt: null };

export function loadPurchase(): PurchaseStatus {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return UNPAID_STATUS;

    const parsed = JSON.parse(raw) as Partial<StoredPurchase>;
    if (parsed.version !== STORAGE_VERSION || typeof parsed.hasPaid !== "boolean") {
      return UNPAID_STATUS;
    }

    return {
      hasPaid: parsed.hasPaid,
      token: parsed.token ?? null,
      paidAt: parsed.paidAt ?? null,
    };
  } catch {
    return UNPAID_STATUS;
  }
}

export function savePurchase(status: PurchaseStatus): void {
  try {
    const stored: StoredPurchase = { version: STORAGE_VERSION, ...status };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Ignore write failures — the purchase still applies for this session,
    // it just won't survive a reload.
  }
}
