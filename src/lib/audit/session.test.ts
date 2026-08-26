import { beforeEach, describe, expect, it } from "vitest";
import { clearSession, createSession, loadSession, saveSession } from "./session";

describe("audit session persistence", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns null when nothing has been saved yet", () => {
    expect(loadSession()).toBeNull();
  });

  it("round-trips a saved session through localStorage", () => {
    const session = createSession();
    session.answers.industry = "hardware";
    session.phase = "diagnostic";
    saveSession(session);

    const loaded = loadSession();
    expect(loaded?.sessionId).toBe(session.sessionId);
    expect(loaded?.answers.industry).toBe("hardware");
    expect(loaded?.phase).toBe("diagnostic");
  });

  it("clears a saved session", () => {
    saveSession(createSession());
    clearSession();
    expect(loadSession()).toBeNull();
  });

  it("ignores corrupt JSON instead of throwing", () => {
    window.localStorage.setItem("mb_audit_session", "{not valid json");
    expect(() => loadSession()).not.toThrow();
    expect(loadSession()).toBeNull();
  });

  it("ignores a session saved under a different schema version", () => {
    window.localStorage.setItem(
      "mb_audit_session",
      JSON.stringify({ version: 999, sessionId: "x", answers: {} }),
    );
    expect(loadSession()).toBeNull();
  });

  it("generates a distinct session id per session", () => {
    const a = createSession();
    const b = createSession();
    expect(a.sessionId).not.toBe(b.sessionId);
  });

  it("persists captured contact details so a refresh never has to ask again (production handoff §5, §13)", () => {
    const session = createSession();
    session.contact = { name: "Jane Founder", email: "jane@example.com", phone: "+263771234567", company: "Example Co" };
    saveSession(session);

    const loaded = loadSession();
    expect(loaded?.contact?.name).toBe("Jane Founder");
    expect(loaded?.contact?.company).toBe("Example Co");
  });

  it("persists proposalRequested so the confirmation state survives a refresh", () => {
    const session = createSession();
    session.proposalRequested = true;
    saveSession(session);

    expect(loadSession()?.proposalRequested).toBe(true);
  });

  it("treats a session saved before these fields existed as 'no contact yet, no proposal yet' rather than crashing", () => {
    window.localStorage.setItem(
      "mb_audit_session",
      JSON.stringify({ version: 1, sessionId: "legacy-session", answers: {}, phase: "full_results" }),
    );
    const loaded = loadSession();
    expect(loaded).not.toBeNull();
    expect(loaded?.contact).toBeUndefined();
    expect(loaded?.proposalRequested).toBeUndefined();
  });
});
