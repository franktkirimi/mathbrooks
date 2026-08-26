import type { Answers } from "./questions";
import type { AIReport } from "./aiReport";
import { trackAuditEvent } from "./analytics";

// gpt-5.6-luna runs at reasoning effort "max" — measured at ~97s for a
// 6-finding audit during live testing (§12/§14 of the deliverable report).
// This must stay above the server-side timeout (AI_TIMEOUT_MS in
// api/audit-analysis.ts) so the client never aborts a request the server
// would have still completed.
const REQUEST_TIMEOUT_MS = 160000;

export type AiAnalysisOutcome = { ok: true; report: AIReport } | { ok: false };

/**
 * Requests the Phase 1.5 AI-enhanced narrative for a completed audit. Sends
 * only the raw answers — the server recomputes scores/findings itself (see
 * api/audit-analysis.ts) rather than trusting anything the client claims
 * about them, so nothing beyond the answers the visitor already gave in the
 * diagnostic needs to leave the browser. Never throws: any network error,
 * timeout, or non-success response resolves to { ok: false } so the caller
 * can fall back to the deterministic report without any special-case
 * handling (§12).
 */
export const requestAiAnalysis = async (
  answers: Answers,
  properties: { sessionReference: string; frictionBand: string | null },
): Promise<AiAnalysisOutcome> => {
  trackAuditEvent("ai_analysis_requested", {
    session_reference: properties.sessionReference,
    friction_band: properties.frictionBand,
  });

  try {
    const response = await fetch("/api/audit-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      trackAuditEvent("ai_analysis_failed", { session_reference: properties.sessionReference, status: response.status });
      return { ok: false };
    }

    const data = (await response.json()) as { ok: boolean; report?: AIReport; reason?: string };
    if (!data.ok || !data.report) {
      trackAuditEvent("ai_analysis_failed", { session_reference: properties.sessionReference, status: null });
      return { ok: false };
    }

    trackAuditEvent("ai_analysis_succeeded", {
      session_reference: properties.sessionReference,
      finding_count: data.report.findings.length,
    });
    return { ok: true, report: data.report };
  } catch {
    trackAuditEvent("ai_analysis_failed", { session_reference: properties.sessionReference, status: null });
    return { ok: false };
  }
};
