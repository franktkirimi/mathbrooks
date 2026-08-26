import { afterEach, describe, expect, it, vi } from "vitest";
import { track } from "@vercel/analytics/react";
import { requestAiAnalysis } from "./aiClient";

vi.mock("@vercel/analytics/react", () => ({ track: vi.fn() }));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

const props = { sessionReference: "MB-ABC123", frictionBand: "moderate" };

describe("requestAiAnalysis", () => {
  it("returns the validated report on success and fires request/success analytics with no PII", async () => {
    const report = { executiveSummary: "Summary.", findings: [], priorities: [] };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true, report }) }),
    );

    const outcome = await requestAiAnalysis({ industry: "hardware" }, props);

    expect(outcome).toEqual({ ok: true, report });
    expect(track).toHaveBeenCalledWith("ai_analysis_requested", expect.objectContaining({ session_reference: "MB-ABC123" }));
    expect(track).toHaveBeenCalledWith("ai_analysis_succeeded", expect.any(Object));

    const serializedCalls = JSON.stringify((track as unknown as { mock: { calls: unknown[] } }).mock.calls);
    expect(serializedCalls).not.toMatch(/@|\+263/);
  });

  it("returns { ok: false } and fires failure analytics on a non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }));

    const outcome = await requestAiAnalysis({ industry: "hardware" }, props);

    expect(outcome).toEqual({ ok: false });
    expect(track).toHaveBeenCalledWith("ai_analysis_failed", expect.any(Object));
  });

  it("returns { ok: false } when the server reports ok:false", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: false, reason: "timeout" }) }));
    const outcome = await requestAiAnalysis({ industry: "hardware" }, props);
    expect(outcome).toEqual({ ok: false });
  });

  it("never throws — a network error resolves to { ok: false }", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    const outcome = await requestAiAnalysis({ industry: "hardware" }, props);
    expect(outcome).toEqual({ ok: false });
  });
});
