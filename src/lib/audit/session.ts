import type { Answers } from "./questions";
import type { AIReport } from "./aiReport";

const STORAGE_KEY = "mb_audit_session";
const SESSION_VERSION = 1;

export type AuditPhase =
  | "intro"
  | "diagnostic"
  | "processing"
  | "preview_results"
  | "contact_capture"
  | "full_results";

export interface SessionContact {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface AuditSessionState {
  version: number;
  sessionId: string;
  startedAt: string;
  updatedAt: string;
  answers: Answers;
  phase: AuditPhase;
  contactCaptured: boolean;
  completed: boolean;
  /**
   * Persisted once captured so a refresh — or opening the proposal
   * interaction later in the same session — never has to ask again for
   * information MathBrooks already has (production handoff milestone §5,
   * §13). Absent on sessions created before this field existed; every
   * reader treats that the same as "not yet captured."
   */
  contact?: SessionContact | null;
  /**
   * True once a proposal request has actually been submitted — distinct
   * from the audit lead itself (§8: AuditSession -> Lead -> ProposalRequest
   * is a separate conversion event). Survives a refresh so the confirmation
   * state doesn't reset.
   */
  proposalRequested?: boolean;
  /**
   * Phase 1.5 AI Intelligence Layer cache: `undefined` = never requested yet,
   * `null` = requested but unavailable/failed (deterministic report stands
   * as-is), an object = the validated AI-enhanced report. Persisting the
   * outcome — success or failure — means a refresh or later return visit
   * never triggers a repeat AI call for the same completed audit (§19).
   */
  aiReport?: AIReport | null;
}

const canUseStorage = (): boolean => {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
};

const generateSessionId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `audit-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const createSession = (): AuditSessionState => {
  const now = new Date().toISOString();
  return {
    version: SESSION_VERSION,
    sessionId: generateSessionId(),
    startedAt: now,
    updatedAt: now,
    answers: {},
    phase: "intro",
    contactCaptured: false,
    completed: false,
    contact: null,
    proposalRequested: false,
  };
};

export const loadSession = (): AuditSessionState | null => {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuditSessionState;
    if (parsed.version !== SESSION_VERSION || !parsed.sessionId || typeof parsed.answers !== "object") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const saveSession = (session: AuditSessionState): void => {
  if (!canUseStorage()) return;
  try {
    const updated: AuditSessionState = { ...session, updatedAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Storage can fail (private browsing, quota). The audit still works in-memory for this visit.
  }
};

export const clearSession = (): void => {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // No-op — nothing to recover from a failed removal.
  }
};
