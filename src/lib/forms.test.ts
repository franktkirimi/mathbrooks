import { describe, expect, it } from "vitest";
import { buildAuditFormspreePayload, type AuditFormspreePayloadInput } from "./forms";

const baseAttribution = {
  utmSource: "google",
  utmMedium: "cpc",
  utmCampaign: "audit_launch",
  utmContent: null,
  utmTerm: null,
  referrer: "https://www.google.com/",
  landingPage: "/audit?utm_source=google",
  capturedAt: "2026-08-27T00:00:00.000Z",
};

const baseInput: AuditFormspreePayloadInput = {
  name: "Jane Founder",
  email: "jane@example.com",
  phone: "+263771234567",
  company: "Example Co",
  industry: "Hardware & building supplies",
  employeeBand: "21–50",
  branchCount: "2–3",
  efficiencyScore: 39,
  frictionBand: "high",
  leadScore: 77,
  leadTier: "hot",
  needsNurture: false,
  opportunities: [
    { title: "Quotation & follow-up workflow", severity: "high", product: "MathBrooks CRM" },
    { title: "Inventory visibility", severity: "medium", product: "MathBrooks Inventory" },
  ],
  recommendedProducts: ["MathBrooks CRM", "MathBrooks Inventory"],
  urgency: "Needs this now",
  authority: "decision_maker",
  budgetBand: null,
  nextAction: "Contact today.",
  attribution: baseAttribution,
  sessionId: "audit-123",
};

describe("buildAuditFormspreePayload", () => {
  it("includes the raw internal lead score, not just the tier (P2 fix — FA-7)", () => {
    // V1 has no internal dashboard — this email is the only place a salesperson
    // can tell a strong Warm lead from a weak one, so the number behind the
    // tier has to be visible here, not only used internally to compute it.
    const payload = buildAuditFormspreePayload(baseInput);
    expect(payload.lead_score).toBe(77);
    expect(payload.lead_tier).toBe("hot");
  });

  it("surfaces both the lead score and the tier in the subject line for at-a-glance triage", () => {
    const payload = buildAuditFormspreePayload(baseInput);
    expect(payload._subject).toContain("HOT");
    expect(payload._subject).toContain("77");
  });

  it("still carries no computed/estimated deal-value field (budget is only ever the visitor's own stated signal)", () => {
    const payload = buildAuditFormspreePayload(baseInput);
    const serialised = JSON.stringify(payload);
    expect(serialised).not.toMatch(/\$\d/);
  });

  it("carries organisation type/size, needs_nurture, and per-opportunity severity for immediate action", () => {
    const payload = buildAuditFormspreePayload(baseInput);
    expect(payload.industry).toBe("Hardware & building supplies");
    expect(payload.employee_band).toBe("21–50");
    expect(payload.branch_count).toBe("2–3");
    expect(payload.needs_nurture).toBe(false);
    expect(payload.top_opportunities).toEqual(["Quotation & follow-up workflow (high)", "Inventory visibility (medium)"]);
  });

  it("carries qualification signals (urgency, authority, budget) without exposing them to the visitor", () => {
    const payload = buildAuditFormspreePayload(baseInput);
    expect(payload.urgency).toBe("Needs this now");
    expect(payload.authority).toBe("decision_maker");
    expect(payload.budget_band).toBeNull();
  });

  it("carries full attribution and the audit session id", () => {
    const payload = buildAuditFormspreePayload(baseInput);
    expect(payload.utm_source).toBe("google");
    expect(payload.utm_medium).toBe("cpc");
    expect(payload.utm_campaign).toBe("audit_launch");
    expect(payload.referrer).toBe("https://www.google.com/");
    expect(payload.landing_page).toBe("/audit?utm_source=google");
    expect(payload.session_id).toBe("audit-123");
  });

  it("includes a honeypot field that is always empty for real submissions", () => {
    const payload = buildAuditFormspreePayload(baseInput);
    expect(payload._gotcha).toBe("");
  });

  it("builds a single scannable summary block with score, band, top opportunities, and recommended action", () => {
    const payload = buildAuditFormspreePayload(baseInput);
    expect(payload.summary).toContain("[HOT · 77] Example Co");
    expect(payload.summary).toContain("Digital Efficiency: 39/100 — High Friction");
    expect(payload.summary).toContain("1. Quotation & follow-up workflow — HIGH");
    expect(payload.summary).toContain("2. Inventory visibility — MEDIUM");
    expect(payload.summary).toContain("Likely scope:");
    expect(payload.summary).toContain("MathBrooks CRM · MathBrooks Inventory");
    expect(payload.summary).toContain("Recommended action:");
    expect(payload.summary).toContain("Contact today.");
  });

  it("flags needs_nurture explicitly in the summary when the gate qualifies but signals are weak", () => {
    const payload = buildAuditFormspreePayload({ ...baseInput, needsNurture: true });
    expect(payload.summary).toContain("verify fit before prioritising outreach");
  });
});
