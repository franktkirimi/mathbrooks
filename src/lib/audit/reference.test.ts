import { describe, expect, it } from "vitest";
import { getAuditReference } from "./reference";

describe("getAuditReference", () => {
  it("derives a short, readable, prefixed code from a session id", () => {
    const ref = getAuditReference("5049e96b-a003-4595-ba86-91d80a7572b8");
    expect(ref).toBe("MB-5049E9");
  });

  it("is deterministic for the same session id", () => {
    const id = "audit-1234567890-abcdefgh";
    expect(getAuditReference(id)).toBe(getAuditReference(id));
  });

  it("produces different references for different session ids", () => {
    expect(getAuditReference("aaaaaaaa-0000-0000-0000-000000000000")).not.toBe(
      getAuditReference("bbbbbbbb-0000-0000-0000-000000000000"),
    );
  });

  it("never crashes on a short or unusual id", () => {
    expect(getAuditReference("")).toBe("MB-000000");
    expect(getAuditReference("ab")).toBe("MB-AB");
  });
});
