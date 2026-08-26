import { track } from "@vercel/analytics/react";

/**
 * Typed funnel events for the audit (approved plan §16). Every event goes
 * through the site's existing @vercel/analytics `track()` call — no new
 * analytics dependency or script tag.
 */
export type AuditEventName =
  | "audit_started"
  | "audit_question_answered"
  | "audit_section_completed"
  | "audit_25_percent"
  | "audit_50_percent"
  | "audit_75_percent"
  | "audit_completed"
  | "audit_abandoned"
  | "audit_resumed"
  | "contact_capture_viewed"
  | "contact_captured"
  | "contact_declined"
  | "results_viewed"
  | "audit_results_displayed"
  | "recommendation_clicked"
  | "proposal_cta_clicked"
  | "proposal_form_viewed"
  | "proposal_opportunity_selected"
  | "proposal_requested"
  | "proposal_submission_failed"
  | "audit_whatsapp_clicked"
  | "consultation_requested"
  | "ai_analysis_requested"
  | "ai_analysis_succeeded"
  | "ai_analysis_failed"
  | "ai_analysis_fallback_used";

type AuditEventProperties = Record<string, string | number | boolean | null>;

export const trackAuditEvent = (name: AuditEventName, properties?: AuditEventProperties): void => {
  try {
    track(name, properties);
  } catch {
    // Analytics must never break the audit flow.
  }
};
