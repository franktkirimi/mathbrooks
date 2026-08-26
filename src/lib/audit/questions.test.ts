import { describe, expect, it } from "vitest";
import {
  buildAnswersSummary,
  getNextQuestion,
  getVisibleQuestions,
  getVisibleSections,
  inventorySectionVisible,
  isAuditComplete,
  QUESTIONS,
  SECTIONS,
} from "./questions";
import type { Answers } from "./questions";

describe("question bank integrity", () => {
  it("has no duplicate question ids", () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every question belongs to a section that actually lists it", () => {
    for (const question of QUESTIONS) {
      const section = SECTIONS.find((s) => s.id === question.sectionId);
      expect(section, `section ${question.sectionId} for ${question.id}`).toBeDefined();
      expect(section!.questionIds).toContain(question.id);
    }
  });

  it("every option id within a question is unique", () => {
    for (const question of QUESTIONS) {
      const ids = question.options.map((o) => o.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe("inventorySectionVisible — conditional section skip (P1 fix: driven directly by holds_physical_stock)", () => {
  it("is visible whenever the business says it holds physical stock, regardless of industry or branch count", () => {
    expect(inventorySectionVisible({ holds_physical_stock: "yes", industry: "professional_services", branch_count: "1" })).toBe(true);
    expect(inventorySectionVisible({ holds_physical_stock: "yes", industry: "hospitality", branch_count: "1" })).toBe(true);
    expect(inventorySectionVisible({ holds_physical_stock: "yes", industry: "manufacturing", branch_count: "1" })).toBe(true);
  });

  it("is skipped whenever the business says it doesn't hold physical stock, even if multi-branch", () => {
    expect(inventorySectionVisible({ holds_physical_stock: "no", branch_count: "2-3", industry: "professional_services" })).toBe(false);
    // This is the FA-4(b) false-positive case: a multi-branch service business no
    // longer gets forced through stock questions purely because it has several offices.
  });

  it("stays visible until holds_physical_stock is answered, to avoid a premature false-negative skip", () => {
    expect(inventorySectionVisible({})).toBe(true);
    expect(inventorySectionVisible({ industry: "professional_services", branch_count: "1" })).toBe(true);
  });
});

describe("industry_other_detail — free-text follow-up for 'Something else' (product fix)", () => {
  it("only appears when industry is answered as 'other'", () => {
    expect(getVisibleQuestions({ industry: "hardware" }).some((q) => q.id === "industry_other_detail")).toBe(false);
    expect(getVisibleQuestions({ industry: "ngo_nonprofit" }).some((q) => q.id === "industry_other_detail")).toBe(false);
    expect(getVisibleQuestions({ industry: "other" }).some((q) => q.id === "industry_other_detail")).toBe(true);
  });

  it("is a required text-input question, not a scored one", () => {
    const question = getVisibleQuestions({ industry: "other" }).find((q) => q.id === "industry_other_detail");
    expect(question?.inputType).toBe("text");
    expect(question?.required).toBe(true);
    expect(question?.category).toBe("context");
  });

  it("must be answered before the audit is considered complete when industry is 'other'", () => {
    expect(isAuditComplete({ industry: "other" })).toBe(false);
    expect(getNextQuestion({ industry: "other" })?.id).toBe("industry_other_detail");
    expect(isAuditComplete({ industry: "other", industry_other_detail: "Funeral services" })).toBe(false); // other fields still missing
  });
});

describe("getVisibleQuestions — branching", () => {
  it("does not show lost_quotes until quote_method is answered as adhoc", () => {
    const withoutAnswer = getVisibleQuestions({});
    expect(withoutAnswer.some((q) => q.id === "lost_quotes")).toBe(false);

    const withCrm = getVisibleQuestions({ quote_method: "crm" });
    expect(withCrm.some((q) => q.id === "lost_quotes")).toBe(false);

    const withAdhoc = getVisibleQuestions({ quote_method: "adhoc" });
    expect(withAdhoc.some((q) => q.id === "lost_quotes")).toBe(true);
  });

  it("does not show report_time unless reporting_method is manual_excel", () => {
    expect(getVisibleQuestions({ reporting_method: "automated" }).some((q) => q.id === "report_time")).toBe(false);
    expect(getVisibleQuestions({ reporting_method: "manual_excel" }).some((q) => q.id === "report_time")).toBe(true);
  });

  it("does not show cross_branch_visibility for a single-branch business", () => {
    expect(getVisibleQuestions({ branch_count: "1" }).some((q) => q.id === "cross_branch_visibility")).toBe(false);
    expect(getVisibleQuestions({ branch_count: "2-3" }).some((q) => q.id === "cross_branch_visibility")).toBe(true);
  });

  it("omits the entire inventory section (both its questions) when the business says it holds no stock", () => {
    const visible = getVisibleQuestions({ holds_physical_stock: "no" });
    expect(visible.some((q) => q.id === "stock_tracking")).toBe(false);
    expect(visible.some((q) => q.id === "cross_branch_visibility")).toBe(false);
  });

  it("caps the maximum possible question count at 23 and the minimum realistic base at 18", () => {
    // 21/17 plus holds_physical_stock (context, P1 fix, always visible) and,
    // only in the max case, whatsapp_effectiveness (shown only for the WhatsApp channel).
    const maxAnswers: Answers = {
      branch_count: "2-3",
      industry: "hardware",
      quote_method: "adhoc",
      reporting_method: "manual_excel",
      holds_physical_stock: "yes",
      primary_customer_channel: "whatsapp_only",
    };
    expect(getVisibleQuestions(maxAnswers)).toHaveLength(23);

    const minAnswers: Answers = {
      branch_count: "1",
      industry: "professional_services",
      quote_method: "crm",
      reporting_method: "automated",
      holds_physical_stock: "no",
      primary_customer_channel: "structured",
    };
    expect(getVisibleQuestions(minAnswers)).toHaveLength(18);
  });

  it("skips the quotation sub-branch entirely when the business says it doesn't send quotes", () => {
    const noQuotes = getVisibleQuestions({ sends_quotes: "no" });
    expect(noQuotes.some((q) => q.id === "quote_method")).toBe(false);
    expect(noQuotes.some((q) => q.id === "followup_tracking")).toBe(false);
    expect(noQuotes.some((q) => q.id === "lost_quotes")).toBe(false);
    // message_volume feeds the communication category independently of quoting and stays visible.
    expect(noQuotes.some((q) => q.id === "message_volume")).toBe(true);

    const withQuotes = getVisibleQuestions({ sends_quotes: "yes" });
    expect(withQuotes.some((q) => q.id === "quote_method")).toBe(true);
  });

  it("only asks the WhatsApp-effectiveness follow-up when WhatsApp is the chosen channel", () => {
    expect(getVisibleQuestions({ primary_customer_channel: "structured" }).some((q) => q.id === "whatsapp_effectiveness")).toBe(false);
    expect(getVisibleQuestions({ primary_customer_channel: "whatsapp_only" }).some((q) => q.id === "whatsapp_effectiveness")).toBe(true);
  });
});

describe("getVisibleSections", () => {
  it("excludes the inventory section when the business holds no physical stock", () => {
    const sections = getVisibleSections({ holds_physical_stock: "no" });
    expect(sections.some((s) => s.id === "inventory")).toBe(false);
  });
});

describe("isAuditComplete / getNextQuestion", () => {
  it("is not complete until every required visible question is answered", () => {
    expect(isAuditComplete({})).toBe(false);
    expect(getNextQuestion({})?.id).toBe("industry");
  });

  it("does not require the optional budget_band question to be answered to be complete, even though it's still offered next", () => {
    const almostComplete: Answers = {
      industry: "professional_services",
      employee_band: "1-5",
      branch_count: "1",
      sends_quotes: "yes",
      holds_physical_stock: "no",
      quote_method: "crm",
      followup_tracking: "system",
      message_volume: "low",
      reporting_method: "automated",
      approval_process: "system_enforced",
      systems_integration: "automatic",
      people_operations: "solo_no_staff",
      delivery_visibility: "not_project_based",
      website_status: "modern",
      primary_customer_channel: "structured",
      urgency: "exploring",
      decision_role: "not_involved",
      // budget_band intentionally omitted
    };
    // Completion doesn't depend on the optional question being answered...
    expect(isAuditComplete(almostComplete)).toBe(true);
    // ...but the UI still offers it once, with a skip option, before moving on.
    expect(getNextQuestion(almostComplete)?.id).toBe("budget_band");

    // Once skipped (stored as a non-empty sentinel so it isn't re-prompted), nothing is left to ask.
    expect(getNextQuestion({ ...almostComplete, budget_band: "skipped" })).toBeNull();
  });

  it("does require a newly-revealed branch question before considering the audit complete", () => {
    const answers: Answers = {
      industry: "professional_services",
      employee_band: "1-5",
      branch_count: "1",
      sends_quotes: "yes",
      holds_physical_stock: "no",
      quote_method: "adhoc", // reveals lost_quotes
      followup_tracking: "system",
      message_volume: "low",
      reporting_method: "automated",
      approval_process: "system_enforced",
      systems_integration: "automatic",
      people_operations: "solo_no_staff",
      delivery_visibility: "not_project_based",
      website_status: "modern",
      primary_customer_channel: "structured",
      urgency: "exploring",
      decision_role: "not_involved",
    };
    expect(isAuditComplete(answers)).toBe(false);
    expect(getNextQuestion(answers)?.id).toBe("lost_quotes");
  });
});

describe("buildAnswersSummary — complete audit context for the proposal-request payload", () => {
  it("renders one 'prompt — answer' line per answered question, in resolved terminology", () => {
    const summary = buildAnswersSummary({
      industry: "hardware",
      employee_band: "21-50",
      urgency: "now",
    } as Answers);
    expect(summary).toContain("Roughly how many people work there? — 21–50");
    expect(summary).toContain("Needs this now");
  });

  it("skips unanswered questions rather than showing a blank value", () => {
    const summary = buildAnswersSummary({ industry: "hardware" } as Answers);
    expect(summary).not.toContain("undefined");
    expect(summary.split("\n")).toHaveLength(1);
  });

  it("resolves terminology per the organisation's industry (e.g. NGO wording), not hardcoded 'business'/'customers'", () => {
    const summary = buildAnswersSummary({
      industry: "ngo_nonprofit",
      primary_customer_channel: "structured",
    } as Answers);
    expect(summary).toContain("organisation");
    expect(summary).not.toContain("business");
  });

  it("returns an empty string for no answers at all, never throwing", () => {
    expect(buildAnswersSummary({} as Answers)).toBe("");
  });

  it("resolves {{org}} terminology tokens embedded in option labels, not just question prompts", () => {
    const summary = buildAnswersSummary({
      industry: "ngo_nonprofit",
      holds_physical_stock: "no",
    } as Answers);
    expect(summary).not.toContain("{{org}}");
    expect(summary).not.toContain("{{Org}}");
    expect(summary).not.toContain("{{audience}}");
    expect(summary).not.toContain("{{Audience}}");
    expect(summary).toContain("No — we're a service organisation, or stock isn't something we manage");
  });
});
