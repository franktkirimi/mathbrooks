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
});
