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
  | "recommendation_clicked"
  | "proposal_requested"
  | "whatsapp_clicked"
  | "consultation_requested";

type AuditEventProperties = Record<string, string | number | boolean | null>;

export const trackAuditEvent = (name: AuditEventName, properties?: AuditEventProperties): void => {
  try {
    track(name, properties);
  } catch {
    // Analytics must never break the audit flow.
  }
};
