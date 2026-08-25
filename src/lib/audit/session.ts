import type { Answers } from "./questions";

const STORAGE_KEY = "mb_audit_session";
const SESSION_VERSION = 1;

export type AuditPhase =
  | "intro"
  | "diagnostic"
  | "processing"
  | "preview_results"
  | "contact_capture"
  | "full_results";

export interface AuditSessionState {
  version: number;
  sessionId: string;
  startedAt: string;
  updatedAt: string;
  answers: Answers;
  phase: AuditPhase;
  contactCaptured: boolean;
  completed: boolean;
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
