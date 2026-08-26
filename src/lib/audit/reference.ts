/**
 * A short, human-readable code derived from the audit session id — lets the
 * customer, a WhatsApp conversation, the original audit lead email, and a
 * later proposal request all refer to the same audit without exposing the
 * full session UUID. Not a security boundary (approved plan, production
 * handoff milestone §10) — just a shared, easy-to-say label.
 */
export const getAuditReference = (sessionId: string): string => {
  const clean = sessionId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  const code = clean.slice(0, 6) || "000000";
  return `MB-${code}`;
};
