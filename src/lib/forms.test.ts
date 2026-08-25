import { describe, expect, it } from "vitest";
import { buildAuditFormspreePayload } from "./forms";

const baseInput = {
  name: "Jane Founder",
  email: "jane@example.com",
  phone: "+263771234567",
  company: "Example Co",
  efficiencyScore: 39,
  frictionBand: "high",
  leadScore: 77,
  leadTier: "hot",
  topOpportunities: ["Quotation & follow-up workflow"],
  recommendedProducts: ["MathBrooks CRM"],
  commercialPotential: "high",
  complexityEstimate: "high",
  nextAction: "Contact today.",
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

  it("still carries no numeric deal-value field", () => {
    const payload = buildAuditFormspreePayload(baseInput);
    const serialised = JSON.stringify(payload);
    expect(serialised).not.toMatch(/\$\d/);
  });
});
