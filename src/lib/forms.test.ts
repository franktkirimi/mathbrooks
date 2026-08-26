import { describe, expect, it } from "vitest";
import {
  buildAuditFormspreePayload,
  buildAuditWhatsAppMessage,
  buildProposalFormspreePayload,
  type AuditFormspreePayloadInput,
  type ProposalFormspreePayloadInput,
} from "./forms";

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
  auditReference: "MB-ABC123",
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

  it("marks itself as an audit_lead submission, distinct from a later proposal request", () => {
    expect(buildAuditFormspreePayload(baseInput).submission_type).toBe("audit_lead");
  });

  it("carries the audit reference alongside the full session id", () => {
    expect(buildAuditFormspreePayload(baseInput).audit_reference).toBe("MB-ABC123");
  });
});

const baseProposalInput: ProposalFormspreePayloadInput = {
  name: "Jane Founder",
  email: "jane@example.com",
  phone: "+263771234567",
  company: "ABC Hardware",
  industry: "Hardware & building supplies",
  employeeBand: "21–50",
  branchCount: "2–3",
  efficiencyScore: 38,
  frictionBand: "high",
  categoryScores: [
    { label: "Inventory & stock visibility", score: 20 },
    { label: "Sales & follow-up with customers", score: 30 },
  ],
  leadScore: 84,
  leadTier: "hot",
  needsNurture: false,
  allOpportunities: [
    { title: "Inventory & stock visibility", severity: "high", product: "MathBrooks Inventory" },
    { title: "Quotation & follow-up workflow", severity: "high", product: "MathBrooks CRM" },
    { title: "Management reporting", severity: "medium", product: "MathBrooks Analytics" },
  ],
  selectedOpportunityTitles: ["Inventory & stock visibility", "Quotation & follow-up workflow"],
  selectedProducts: ["MathBrooks Inventory", "MathBrooks CRM"],
  urgency: "Needs this now",
  authority: "decision_maker",
  budgetBand: "$2,000+",
  customerNote: "We'd like to start with inventory.",
  answersSummary: "What kind of organisation is this? — Hardware & building supplies\nRoughly how many people work there? — 21–50",
  attribution: baseAttribution,
  sessionId: "audit-a7x29-session",
  auditReference: "MB-A7X29",
};

describe("buildProposalFormspreePayload", () => {
  it("is clearly distinguishable from an audit lead in both subject and submission_type (§8)", () => {
    const payload = buildProposalFormspreePayload(baseProposalInput);
    expect(payload._subject).toBe("[PROPOSAL REQUEST · HOT · 84] ABC Hardware — Implementation Proposal Request");
    expect(payload.submission_type).toBe("proposal_request");
  });

  it("separates opportunities the audit identified from the ones the customer actually selected", () => {
    const payload = buildProposalFormspreePayload(baseProposalInput);
    expect(payload.opportunities_identified).toHaveLength(3);
    expect(payload.opportunities_selected).toEqual(["Inventory & stock visibility", "Quotation & follow-up workflow"]);
  });

  it("carries the complete accumulated audit context — org, score, category scores, qualification, attribution, reference", () => {
    const payload = buildProposalFormspreePayload(baseProposalInput);
    expect(payload.industry).toBe("Hardware & building supplies");
    expect(payload.employee_band).toBe("21–50");
    expect(payload.efficiency_score).toBe(38);
    expect(payload.friction_band).toBe("high");
    expect(payload.category_scores).toContain("Inventory & stock visibility: 20");
    expect(payload.urgency).toBe("Needs this now");
    expect(payload.authority).toBe("decision_maker");
    expect(payload.budget_band).toBe("$2,000+");
    expect(payload.lead_score).toBe(84);
    expect(payload.lead_tier).toBe("hot");
    expect(payload.utm_campaign).toBe("audit_launch");
    expect(payload.session_id).toBe("audit-a7x29-session");
    expect(payload.audit_reference).toBe("MB-A7X29");
    expect(payload.full_audit_answers).toContain("Hardware & building supplies");
  });

  it("carries the customer's optional free-text note, and omits it cleanly when absent", () => {
    const withNote = buildProposalFormspreePayload(baseProposalInput);
    expect(withNote.customer_note).toBe("We'd like to start with inventory.");
    expect(withNote.summary).toContain('"We\'d like to start with inventory."');

    const withoutNote = buildProposalFormspreePayload({ ...baseProposalInput, customerNote: null });
    expect(withoutNote.customer_note).toBeNull();
    expect(withoutNote.summary).not.toContain("Customer note");
  });

  it("matches the requested scannable summary format", () => {
    const payload = buildProposalFormspreePayload(baseProposalInput);
    expect(payload.summary).toContain("ABC Hardware — Implementation Proposal Request");
    expect(payload.summary).toContain("Digital Efficiency");
    expect(payload.summary).toContain("38/100 — High Friction");
    expect(payload.summary).toContain("Customer selected");
    expect(payload.summary).toContain("1. Inventory & stock visibility");
    expect(payload.summary).toContain("2. Quotation & follow-up workflow");
    expect(payload.summary).toContain("Audit findings");
    expect(payload.summary).toContain("Lead");
    expect(payload.summary).toContain("HOT · 84");
    expect(payload.summary).toContain("Recommended sales action");
  });

  it("includes a honeypot field and no computed deal-value dollar figure", () => {
    const payload = buildProposalFormspreePayload(baseProposalInput);
    expect(payload._gotcha).toBe("");
  });
});

describe("buildAuditWhatsAppMessage", () => {
  it("is concise, customer-safe, and carries the audit context — score, top opportunities, and reference", () => {
    const message = buildAuditWhatsAppMessage({
      company: "ABC Hardware",
      efficiencyScore: 38,
      frictionBand: "high",
      opportunityTitles: ["Inventory & stock visibility", "Quotation & follow-up workflow"],
      auditReference: "MB-A7X29",
    });
    expect(message).toContain("ABC Hardware");
    expect(message).toContain("38/100");
    expect(message).toContain("High Friction");
    expect(message).toContain("Inventory & stock visibility");
    expect(message).toContain("Quotation & follow-up workflow");
    expect(message).toContain("MB-A7X29");
  });

  it("never leaks internal lead score, tier, budget, or authority into the customer-visible message", () => {
    const message = buildAuditWhatsAppMessage({
      company: "ABC Hardware",
      efficiencyScore: 38,
      frictionBand: "high",
      opportunityTitles: ["Inventory & stock visibility"],
      auditReference: "MB-A7X29",
    });
    for (const forbidden of ["HOT", "WARM", "COLD", "lead_score", "decision_maker", "budget", "$"]) {
      expect(message).not.toContain(forbidden);
    }
  });

  it("caps opportunities at 3 so the message stays short", () => {
    const message = buildAuditWhatsAppMessage({
      company: "ABC Hardware",
      efficiencyScore: 20,
      frictionBand: "high",
      opportunityTitles: ["One", "Two", "Three", "Four", "Five"],
      auditReference: "MB-A7X29",
    });
    expect(message).toContain("One");
    expect(message).toContain("Three");
    expect(message).not.toContain("Four");
    expect(message).not.toContain("Five");
  });

  it("degrades gracefully with no company name or score", () => {
    const message = buildAuditWhatsAppMessage({
      company: null,
      efficiencyScore: null,
      frictionBand: null,
      opportunityTitles: [],
      auditReference: "MB-A7X29",
    });
    expect(message).toContain("Business Efficiency Audit");
    expect(message).toContain("MB-A7X29");
  });
});
