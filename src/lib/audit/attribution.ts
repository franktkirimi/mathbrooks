/**
 * First-touch acquisition attribution for the audit funnel. Captured once per
 * browser (first-touch, not last-touch) so a paid click that lands on the
 * audit — or on any other page, if the visitor browses before starting the
 * audit — is preserved even if they navigate around the site before
 * completing it. Stored separately from the mutable answer session so
 * restarting the audit (clearSession) never discards how the visitor arrived.
 */

const STORAGE_KEY = "mb_audit_attribution";

export interface AttributionData {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  referrer: string | null;
  landingPage: string | null;
  capturedAt: string;
}

const canUseStorage = (): boolean => {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
};

const readParam = (params: URLSearchParams, key: string): string | null => {
  const value = params.get(key);
  return value && value.trim().length > 0 ? value.trim().slice(0, 200) : null;
};

const captureFromCurrentPage = (): AttributionData => {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  return {
    utmSource: readParam(params, "utm_source"),
    utmMedium: readParam(params, "utm_medium"),
    utmCampaign: readParam(params, "utm_campaign"),
    utmContent: readParam(params, "utm_content"),
    utmTerm: readParam(params, "utm_term"),
    referrer: typeof document !== "undefined" && document.referrer ? document.referrer.slice(0, 500) : null,
    landingPage:
      typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}`.slice(0, 500) : null,
    capturedAt: new Date().toISOString(),
  };
};

/**
 * Reads the stored first-touch attribution, or captures it from the current
 * page right now if none exists yet for this browser. Safe to call on every
 * audit page load — only ever writes once.
 */
export const getOrCaptureAttribution = (): AttributionData => {
  if (!canUseStorage()) return captureFromCurrentPage();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AttributionData;
      if (parsed && typeof parsed.capturedAt === "string") return parsed;
    }
  } catch {
    // Fall through to capture fresh below.
  }

  const fresh = captureFromCurrentPage();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  } catch {
    // Storage can fail (private browsing, quota) — attribution just won't persist past this page view.
  }
  return fresh;
};
