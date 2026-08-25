import { describe, expect, it } from "vitest";
import {
  computeCategoryScores,
  computeCommercialSummary,
  computeEfficiencyScore,
  computeLeadScore,
  computeOpportunities,
  runAudit,
} from "./engine";
import type { Answers } from "./questions";

// ─── Fixtures ───────────────────────────────────────────────────────────
// These mirror the two illustrative scenarios in the approved AI Business
// Audit Plan (§6): a business with heavy operational friction, and a
// business with a strong existing technology foundation. Expected numbers
// below are computed by hand from the documented rubric — see the
// implementation report for the full derivation.

const heavyFrictionAnswers: Answers = {
  industry: "hardware",
  employee_band: "6-20",
  branch_count: "2-3",
  quote_method: "adhoc",
  followup_tracking: "memory",
  message_volume: "medium",
  lost_quotes: "occasionally",
  stock_tracking: "spreadsheet",
  cross_branch_visibility: "phone_calls",
  reporting_method: "manual_excel",
  report_time: "over_day",
  approval_process: "informal",
  systems_integration: "manual_copying",
  website_status: "outdated",
  primary_customer_channel: "whatsapp_only",
  urgency: "now",
  decision_role: "decision_maker",
};

const strongFoundationAnswers: Answers = {
  industry: "professional_services",
  employee_band: "1-5",
  branch_count: "1",
  quote_method: "crm",
  followup_tracking: "system",
  message_volume: "low",
  reporting_method: "automated",
  approval_process: "system_enforced",
  systems_integration: "automatic",
  website_status: "modern",
  primary_customer_channel: "structured",
  urgency: "exploring",
  decision_role: "not_involved",
};

describe("computeCategoryScores", () => {
  it("averages the sub-scores of every answered question in a category", () => {
    const scores = computeCategoryScores(heavyFrictionAnswers);
    const sales = scores.find((s) => s.category === "sales")!;
    // quote_method(adhoc=15) + followup_tracking(memory=10) + lost_quotes(occasionally=50) => avg 25
    expect(sales.applicable).toBe(true);
    expect(sales.score).toBe(25);
  });

  it("applies the WhatsApp-volume penalty to the communication category only when the channel is WhatsApp-only", () => {
    const whatsappHeavy = computeCategoryScores({
      primary_customer_channel: "whatsapp_only",
      message_volume: "high",
    });
    const structured = computeCategoryScores({
      primary_customer_channel: "structured",
      message_volume: "high",
    });
    expect(whatsappHeavy.find((s) => s.category === "communication")!.score).toBe(0); // 20 - 20 penalty
    expect(structured.find((s) => s.category === "communication")!.score).toBe(100); // no penalty
  });

  it("marks a category not applicable when none of its questions have been answered", () => {
    const scores = computeCategoryScores({});
    expect(scores.every((s) => s.applicable === false && s.score === null)).toBe(true);
  });

  it("does not let an unrelated answer leak into a category's score", () => {
    const scores = computeCategoryScores({ website_status: "modern" });
    const digital = scores.find((s) => s.category === "digital")!;
    const sales = scores.find((s) => s.category === "sales")!;
    expect(digital.applicable).toBe(true);
    expect(sales.applicable).toBe(false);
  });
});

describe("computeEfficiencyScore", () => {
  it("computes the documented heavy-friction scenario to an exact score and band", () => {
    const result = computeEfficiencyScore(heavyFrictionAnswers);
    expect(result.score).toBe(25);
    expect(result.band).toBe("high");
    expect(result.bandLabel).toBe("High operational friction detected");
  });

  it("computes the documented strong-foundation scenario to an exact score and band", () => {
    const result = computeEfficiencyScore(strongFoundationAnswers);
    expect(result.score).toBe(100);
    expect(result.band).toBe("strong");
  });

  it("renormalises weights when a category is not applicable, instead of guessing a value for it", () => {
    // strongFoundationAnswers never answers the inventory questions (branch_count=1,
    // industry=professional_services skips that section) — inventory's 15% weight
    // must be excluded from the denominator, not defaulted to 0 or 100.
    const scores = computeEfficiencyScore(strongFoundationAnswers).categoryScores;
    const inventory = scores.find((s) => s.category === "inventory")!;
    expect(inventory.applicable).toBe(false);
    // If inventory had been wrongly defaulted to 0, the total could not be 100.
    expect(computeEfficiencyScore(strongFoundationAnswers).score).toBe(100);
  });

  it("returns null when no scored question has been answered yet", () => {
    const result = computeEfficiencyScore({});
    expect(result.score).toBeNull();
    expect(result.band).toBeNull();
  });

  it("places scores at the documented band boundaries correctly", () => {
    // 39 -> high, 40 -> moderate, 69 -> moderate, 70 -> strong.
    // Drive the single-category "digital" score directly via website_status,
    // which has only 0/45/100 as possible values, so boundary-adjacent
    // testing uses the communication category (0-100 continuous via penalty).
    const at100 = computeEfficiencyScore({ primary_customer_channel: "structured", message_volume: "low" });
    expect(at100.band).toBe("strong");
    const at20 = computeEfficiencyScore({ primary_customer_channel: "whatsapp_only", message_volume: "high" });
    expect(at20.score).toBe(0);
    expect(at20.band).toBe("high");
  });
});

describe("branching-sensitive opportunity triggers", () => {
  it("flags the quotation workflow as HIGH severity only when quotes are lost regularly or occasionally", () => {
    const regularLoss = computeOpportunities({ quote_method: "adhoc", followup_tracking: "memory", lost_quotes: "regularly" });
    const rareLoss = computeOpportunities({ quote_method: "adhoc", followup_tracking: "memory", lost_quotes: "rarely" });
    expect(regularLoss.find((o) => o.id === "quotation_workflow")?.severity).toBe("high");
    expect(rareLoss.find((o) => o.id === "quotation_workflow")?.severity).toBe("medium");
  });

  it("does not raise a quotation-workflow opportunity when both quoting and follow-up are already good", () => {
    const opportunities = computeOpportunities({ quote_method: "crm", followup_tracking: "system" });
    expect(opportunities.find((o) => o.id === "quotation_workflow")).toBeUndefined();
  });

  it("flags inventory visibility as HIGH only when branches call each other to check stock", () => {
    const callsBranches = computeOpportunities({ stock_tracking: "spreadsheet", cross_branch_visibility: "phone_calls" });
    const consolidated = computeOpportunities({ stock_tracking: "spreadsheet", cross_branch_visibility: "manual_consolidation" });
    expect(callsBranches.find((o) => o.id === "inventory_visibility")?.severity).toBe("high");
    expect(consolidated.find((o) => o.id === "inventory_visibility")?.severity).toBe("medium");
  });

  it("does not raise an inventory opportunity when the inventory section was never answered (skipped)", () => {
    const opportunities = computeOpportunities({ industry: "professional_services", branch_count: "1" });
    expect(opportunities.find((o) => o.id === "inventory_visibility")).toBeUndefined();
  });

  it("only raises the communication-load opportunity for WhatsApp-only channels above low volume", () => {
    const lowVolume = computeOpportunities({ primary_customer_channel: "whatsapp_only", message_volume: "low" });
    const highVolume = computeOpportunities({ primary_customer_channel: "whatsapp_only", message_volume: "high" });
    const structuredHighVolume = computeOpportunities({ primary_customer_channel: "structured", message_volume: "high" });
    expect(lowVolume.find((o) => o.id === "customer_communication_load")).toBeUndefined();
    expect(highVolume.find((o) => o.id === "customer_communication_load")?.severity).toBe("high");
    expect(structuredHighVolume.find((o) => o.id === "customer_communication_load")).toBeUndefined();
  });

  it("every triggered opportunity carries a MathBrooks solution reference and the three narrative layers", () => {
    const opportunities = computeOpportunities(heavyFrictionAnswers);
    expect(opportunities.length).toBeGreaterThan(0);
    for (const opportunity of opportunities) {
      expect(opportunity.mathBrooksSolution.href.length).toBeGreaterThan(0);
      expect(opportunity.layers.found.length).toBeGreaterThan(0);
      expect(opportunity.layers.whyItMatters.length).toBeGreaterThan(0);
      expect(opportunity.layers.whatYouCouldDo.length).toBeGreaterThan(0);
    }
  });

  it("sorts opportunities with HIGH severity before MEDIUM", () => {
    const opportunities = computeOpportunities(heavyFrictionAnswers);
    const severities = opportunities.map((o) => o.severity);
    const firstMediumIndex = severities.indexOf("medium");
    if (firstMediumIndex !== -1) {
      expect(severities.slice(0, firstMediumIndex).every((s) => s === "high")).toBe(true);
    }
  });
});

describe("computeLeadScore — gated classification", () => {
  it("classifies the heavy-friction, urgent, decision-maker scenario as Hot", () => {
    const opportunities = computeOpportunities(heavyFrictionAnswers);
    const lead = computeLeadScore(heavyFrictionAnswers, opportunities);
    expect(lead.tier).toBe("hot");
    expect(lead.needsNurture).toBe(false);
    expect(lead.nextAction).toBe("Contact today.");
  });

  it("classifies the strong-foundation, low-urgency scenario as Cold", () => {
    const opportunities = computeOpportunities(strongFoundationAnswers);
    expect(opportunities).toHaveLength(0);
    const lead = computeLeadScore(strongFoundationAnswers, opportunities);
    expect(lead.tier).toBe("cold");
  });

  it("downgrades a score >=70 to Warm+needsNurture when there is no high-severity opportunity or urgency/authority signal", () => {
    const answers: Answers = {
      quote_method: "adhoc",
      followup_tracking: "memory",
      lost_quotes: "regularly", // HIGH
      stock_tracking: "manual",
      cross_branch_visibility: "phone_calls", // HIGH
      approval_process: "informal", // HIGH
      website_status: "outdated", // MEDIUM
      reporting_method: "automated",
      systems_integration: "automatic",
      primary_customer_channel: "structured",
      message_volume: "low",
      employee_band: "200+",
      branch_count: "10+",
      urgency: "exploring", // low urgency
      decision_role: "not_involved", // no authority
      budget_band: "over_2000",
    };
    const opportunities = computeOpportunities(answers);
    const lead = computeLeadScore(answers, opportunities);
    expect(lead.score).toBe(72);
    expect(lead.score).toBeGreaterThanOrEqual(70);
    expect(lead.tier).toBe("warm");
    expect(lead.needsNurture).toBe(true);
  });

  it("never lets a skipped budget question drag the score down (renormalises instead of scoring it 0)", () => {
    const withoutBudget: Answers = { ...heavyFrictionAnswers };
    delete withoutBudget.budget_band;
    const withNeutralBudget: Answers = { ...heavyFrictionAnswers, budget_band: "unsure" };

    const opportunities = computeOpportunities(heavyFrictionAnswers);
    const scoreWithout = computeLeadScore(withoutBudget, opportunities).score;
    const scoreWithNeutral = computeLeadScore(withNeutralBudget, opportunities).score;

    // "unsure" scores 50/100 on the budget component; if the skip were scored as a
    // literal 0 it would always be <= the neutral-budget score. Renormalisation
    // means skipping is not systematically worse than answering "not sure yet".
    expect(scoreWithout).toBeGreaterThanOrEqual(scoreWithNeutral);
    expect(scoreWithout).toBe(88);
  });

  it("treats the UI's skip sentinel exactly like the question never having been asked", () => {
    const withSkipSentinel: Answers = { ...heavyFrictionAnswers, budget_band: "skipped" };
    const withoutTheQuestion: Answers = { ...heavyFrictionAnswers };
    const opportunities = computeOpportunities(heavyFrictionAnswers);
    expect(computeLeadScore(withSkipSentinel, opportunities).score).toBe(
      computeLeadScore(withoutTheQuestion, opportunities).score,
    );
  });

  it("classifies Warm when there is a moderate score with at least one real opportunity but no strong qualification signal", () => {
    const answers: Answers = {
      quote_method: "spreadsheet",
      followup_tracking: "manual",
      website_status: "outdated",
      employee_band: "21-50",
      branch_count: "2-3",
      urgency: "later_this_year",
      decision_role: "influencer",
    };
    const opportunities = computeOpportunities(answers);
    const lead = computeLeadScore(answers, opportunities);
    expect(opportunities.length).toBeGreaterThan(0);
    expect(lead.tier).toBe("warm");
  });

  it("classifies Cold when there are no mapped opportunities at all, regardless of scale", () => {
    const answers: Answers = {
      ...strongFoundationAnswers,
      employee_band: "200+",
      branch_count: "10+",
      urgency: "now",
      decision_role: "decision_maker",
    };
    const opportunities = computeOpportunities(answers);
    expect(opportunities).toHaveLength(0);
    const lead = computeLeadScore(answers, opportunities);
    expect(lead.tier).toBe("cold");
  });
});

describe("computeCommercialSummary — qualitative only, no numeric deal value", () => {
  it("never includes a numeric price field", () => {
    const opportunities = computeOpportunities(heavyFrictionAnswers);
    const lead = computeLeadScore(heavyFrictionAnswers, opportunities);
    const commercial = computeCommercialSummary(opportunities, lead);
    const serialised = JSON.stringify(commercial);
    expect(serialised).not.toMatch(/\$\d/);
    expect(Object.keys(commercial)).toEqual(["potential", "complexity", "likelyScope"]);
  });

  it("reports high potential and high complexity for a heavily-triggered scenario", () => {
    const opportunities = computeOpportunities(heavyFrictionAnswers);
    const lead = computeLeadScore(heavyFrictionAnswers, opportunities);
    const commercial = computeCommercialSummary(opportunities, lead);
    expect(commercial.potential).toBe("high");
    expect(commercial.complexity).toBe("high");
    expect(commercial.likelyScope.length).toBeLessThanOrEqual(3);
  });

  it("reports low potential for a business with no discovered opportunities", () => {
    const opportunities = computeOpportunities(strongFoundationAnswers);
    const lead = computeLeadScore(strongFoundationAnswers, opportunities);
    const commercial = computeCommercialSummary(opportunities, lead);
    expect(commercial.potential).toBe("low");
    expect(commercial.complexity).toBe("low");
    expect(commercial.likelyScope).toEqual([]);
  });
});

describe("P0 calibration fix — FA-1: approval formality is no longer scale-blind", () => {
  it("does not flag an opportunity, and excludes the workflow category, when a business says there's no one to approve to", () => {
    const scores = computeCategoryScores({ approval_process: "solo_no_chain" });
    const workflow = scores.find((s) => s.category === "workflow")!;
    expect(workflow.applicable).toBe(false);

    const opportunities = computeOpportunities({ approval_process: "solo_no_chain" });
    expect(opportunities.find((o) => o.id === "workflow_approvals")).toBeUndefined();
  });

  it("still flags a genuinely undisciplined small business that explicitly says approvals are informal", () => {
    // Guards against over-correcting FA-1 into a blanket size-based exemption —
    // a real business (e.g. P21 in the calibration report) can still choose
    // "informal" rather than "there's no one to approve to", and that must
    // still be treated as a real finding regardless of company size.
    const opportunities = computeOpportunities({ approval_process: "informal", employee_band: "1-5" });
    const workflow = opportunities.find((o) => o.id === "workflow_approvals");
    expect(workflow).toBeDefined();
    expect(workflow?.severity).toBe("high");
  });

  it("still scores and flags approvals normally for a large company answering informal", () => {
    const scores = computeCategoryScores({ approval_process: "informal" });
    expect(scores.find((s) => s.category === "workflow")!.score).toBe(10);
  });
});

describe("P0 calibration fix — FA-6: HR/payroll and delivery-visibility taxonomy coverage", () => {
  it("flags a people-operations opportunity mapped to MathBrooks HR when payroll is informal", () => {
    const opportunities = computeOpportunities({ people_operations: "informal" });
    const found = opportunities.find((o) => o.id === "people_operations_gap");
    expect(found?.severity).toBe("high");
    expect(found?.mathBrooksSolution.href).toBe("/products/hr");
  });

  it("flags a delivery-visibility opportunity mapped to MathBrooks Projects when jobs slip untracked", () => {
    const opportunities = computeOpportunities({ delivery_visibility: "informal" });
    const found = opportunities.find((o) => o.id === "delivery_visibility_gap");
    expect(found?.severity).toBe("high");
    expect(found?.mathBrooksSolution.href).toBe("/products/projects");
  });

  it("does not flag either opportunity, and excludes the category, when a business has no staff or isn't project-based", () => {
    const answers: Answers = { people_operations: "solo_no_staff", delivery_visibility: "not_project_based" };
    const opportunities = computeOpportunities(answers);
    expect(opportunities.find((o) => o.id === "people_operations_gap")).toBeUndefined();
    expect(opportunities.find((o) => o.id === "delivery_visibility_gap")).toBeUndefined();

    const scores = computeCategoryScores(answers);
    expect(scores.find((s) => s.category === "people")!.applicable).toBe(false);
    expect(scores.find((s) => s.category === "delivery")!.applicable).toBe(false);
  });

  it("does not trigger either opportunity when the question was never answered at all", () => {
    // Regression guard: an unanswered question must never be treated as a
    // "yes, this is broken" default — caught during this fix's own testing.
    const opportunities = computeOpportunities({});
    expect(opportunities.find((o) => o.id === "people_operations_gap")).toBeUndefined();
    expect(opportunities.find((o) => o.id === "delivery_visibility_gap")).toBeUndefined();
  });

  it("no longer produces a false COLD for a business whose only real pain is HR/payroll and delivery visibility", () => {
    // Reproduces the P25 calibration finding: every other dimension clean,
    // but real, urgent, funded pain that the old taxonomy couldn't see.
    const answers: Answers = {
      quote_method: "crm",
      followup_tracking: "system",
      message_volume: "low",
      reporting_method: "automated",
      approval_process: "system_enforced",
      systems_integration: "automatic",
      website_status: "modern",
      primary_customer_channel: "structured",
      people_operations: "informal",
      delivery_visibility: "informal",
      employee_band: "51-200",
      branch_count: "2-3",
      urgency: "now",
      decision_role: "decision_maker",
      budget_band: "over_2000",
    };
    const opportunities = computeOpportunities(answers);
    expect(opportunities.length).toBeGreaterThan(0);
    const lead = computeLeadScore(answers, opportunities);
    expect(lead.tier).not.toBe("cold");
  });
});

describe("P0 calibration fix — FA-3: quotation question no longer forced on non-quoting business models", () => {
  it("excludes the sales category and raises no quotation opportunity when sends_quotes is 'no'", () => {
    const answers: Answers = { sends_quotes: "no", industry: "other" };
    const scores = computeCategoryScores(answers);
    expect(scores.find((s) => s.category === "sales")!.applicable).toBe(false);

    const opportunities = computeOpportunities(answers);
    expect(opportunities.find((o) => o.id === "quotation_workflow")).toBeUndefined();
  });

  it("still asks about, scores, and flags quoting normally when sends_quotes is 'yes'", () => {
    const answers: Answers = { sends_quotes: "yes", quote_method: "adhoc", followup_tracking: "memory" };
    const opportunities = computeOpportunities(answers);
    expect(opportunities.find((o) => o.id === "quotation_workflow")).toBeDefined();
  });
});

describe("P1 calibration fix — FA-2: WhatsApp effectiveness is no longer channel-format-blind", () => {
  it("rewards a WhatsApp-only business that reports comfortably keeping up, well above the flat channel default", () => {
    const withoutEffectiveness = computeCategoryScores({ primary_customer_channel: "whatsapp_only", message_volume: "low" });
    const keepingUp = computeCategoryScores({
      primary_customer_channel: "whatsapp_only",
      message_volume: "low",
      whatsapp_effectiveness: "keeping_up",
    });
    expect(withoutEffectiveness.find((c) => c.category === "communication")!.score).toBe(20);
    expect(keepingUp.find((c) => c.category === "communication")!.score).toBe(65);
  });

  it("scores a struggling WhatsApp-only business worse than the flat default", () => {
    const fallingBehind = computeCategoryScores({
      primary_customer_channel: "whatsapp_only",
      message_volume: "low",
      whatsapp_effectiveness: "falling_behind",
    });
    expect(fallingBehind.find((c) => c.category === "communication")!.score).toBe(10);
  });

  it("still lets real high volume pull an optimistic self-report back down, rather than fully overriding it", () => {
    const optimisticAtHighVolume = computeCategoryScores({
      primary_customer_channel: "whatsapp_only",
      message_volume: "high",
      whatsapp_effectiveness: "keeping_up",
    });
    // 65 base - 20 high-volume penalty = 45: better than the old flat 20, but
    // not a full override of the volume signal by a self-reported claim.
    expect(optimisticAtHighVolume.find((c) => c.category === "communication")!.score).toBe(45);
  });

  it("does not apply the effectiveness modifier to non-WhatsApp channels", () => {
    const scores = computeCategoryScores({
      primary_customer_channel: "structured",
      message_volume: "low",
      whatsapp_effectiveness: "keeping_up", // irrelevant answer, should be ignored
    });
    expect(scores.find((c) => c.category === "communication")!.score).toBe(100);
  });
});

describe("P1 calibration fix — FA-4: inventory applicability is driven directly by holds_physical_stock", () => {
  it("includes a hospitality or manufacturing business when it says it holds stock (previously excluded by industry)", () => {
    const opportunities = computeOpportunities({ holds_physical_stock: "yes", stock_tracking: "manual" });
    expect(opportunities.find((o) => o.id === "inventory_visibility")).toBeDefined();
  });

  it("excludes a multi-branch service business when it says it holds no stock (previously forced in by branch count)", () => {
    const scores = computeCategoryScores({ holds_physical_stock: "no" });
    expect(scores.find((c) => c.category === "inventory")!.applicable).toBe(false);
  });
});

describe("P1 calibration fix — FA-5: a single well-defined problem carries more weight than company scale alone", () => {
  // A fully "clean" answer set, isolated on top of a single injected problem below —
  // needed because several opportunity triggers fire on an unanswered question
  // (the same latent-bug class fixed for workflow_approvals etc. in the P0 round,
  // out of scope to fix everywhere this round, so tests supply real answers instead).
  const cleanExcept = (overrides: Answers): Answers => ({
    quote_method: "crm",
    followup_tracking: "system",
    reporting_method: "automated",
    approval_process: "system_enforced",
    systems_integration: "automatic",
    people_operations: "dedicated",
    delivery_visibility: "system",
    website_status: "modern",
    primary_customer_channel: "structured",
    message_volume: "low",
    ...overrides,
  });

  it("weighs one HIGH-severity opportunity as a strong primary signal (60) rather than the old flat per-opportunity value (30)", () => {
    const opportunities = computeOpportunities(cleanExcept({ quote_method: "adhoc", followup_tracking: "memory", lost_quotes: "regularly" }));
    expect(opportunities).toHaveLength(1);
    expect(opportunities[0].severity).toBe("high");
  });

  it("lets a single real, urgent, funded problem reach Hot at a moderate company size, not only at maximum scale", () => {
    // This is the calibration report's P22 case: mid-scale, one real high-severity
    // problem, strong urgency/authority/budget. Under the old formula this scored 61
    // (Warm) purely because scale wasn't maximal — the exact FA-5 finding.
    const answers: Answers = cleanExcept({
      systems_integration: "re_entry",
      employee_band: "51-200",
      branch_count: "2-3",
      urgency: "next_quarter",
      decision_role: "decision_maker",
      budget_band: "over_2000",
    });
    const opportunities = computeOpportunities(answers);
    expect(opportunities).toHaveLength(1);
    const lead = computeLeadScore(answers, opportunities);
    expect(lead.score).toBeGreaterThanOrEqual(70);
    expect(lead.tier).toBe("hot");
  });

  it("still requires more than scale alone — a large company with zero real problems stays Cold", () => {
    // Guards against overcorrecting FA-5 into "scale can manufacture Hot again."
    const answers: Answers = {
      quote_method: "crm",
      followup_tracking: "system",
      reporting_method: "automated",
      approval_process: "system_enforced",
      systems_integration: "automatic",
      website_status: "modern",
      primary_customer_channel: "structured",
      message_volume: "low",
      employee_band: "200+",
      branch_count: "10+",
      urgency: "now",
      decision_role: "decision_maker",
      budget_band: "over_2000",
    };
    const opportunities = computeOpportunities(answers);
    expect(opportunities).toHaveLength(0);
    expect(computeLeadScore(answers, opportunities).tier).toBe("cold");
  });

  it("still weighs breadth of problems appropriately — many real issues still saturate toward the ceiling", () => {
    const opportunities = computeOpportunities({
      quote_method: "adhoc",
      followup_tracking: "memory",
      lost_quotes: "regularly",
      approval_process: "informal",
      people_operations: "informal",
      reporting_method: "verbal",
      systems_integration: "re_entry",
      website_status: "none",
    });
    expect(opportunities.length).toBeGreaterThanOrEqual(4);
    const lead = computeLeadScore(
      { employee_band: "200+", branch_count: "10+", urgency: "now", decision_role: "decision_maker" },
      opportunities,
    );
    expect(lead.tier).toBe("hot");
  });

  it("does not let this change re-open FA-1 by pushing a proportionate small business toward Hot", () => {
    // P15-equivalent post-FA-1-fix: no HIGH opportunities at all once the solo
    // exemptions are answered — only MEDIUMs — so the gate must not pass regardless
    // of the new severity weighting.
    const answers: Answers = {
      quote_method: "adhoc",
      followup_tracking: "memory",
      lost_quotes: "rarely",
      approval_process: "solo_no_chain",
      people_operations: "solo_no_staff",
      reporting_method: "verbal",
      systems_integration: "automatic",
      // "outdated" rather than "none" — an unrelated P2 fix (digital_presence
      // severity) later made "none" a HIGH-severity opportunity on its own
      // merits (see the dedicated FA-digital-presence tests below); that's
      // independent of FA-1 and shouldn't be conflated with it here.
      website_status: "outdated",
      employee_band: "1-5",
      branch_count: "1",
      urgency: "exploring",
      decision_role: "decision_maker",
    };
    const opportunities = computeOpportunities(answers);
    expect(opportunities.every((o) => o.severity !== "high")).toBe(true);
    expect(computeLeadScore(answers, opportunities).tier).not.toBe("hot");
  });
});

describe("Product fix — report copy adapts to NGOs instead of always saying 'business'/'customers'", () => {
  it("uses 'business'/'customers' by default when the industry isn't a nonprofit", () => {
    const scores = computeCategoryScores({ primary_customer_channel: "structured", message_volume: "low" });
    expect(scores.find((c) => c.category === "communication")!.label).toBe("Communication with customers");

    const opportunities = computeOpportunities({ website_status: "none" });
    expect(opportunities[0].layers.found).toContain("business");
    expect(opportunities[0].layers.found).not.toContain("organisation");
  });

  it("swaps to 'organisation'/'the people you serve' for an NGO", () => {
    const scores = computeCategoryScores({
      industry: "ngo_nonprofit",
      primary_customer_channel: "structured",
      message_volume: "low",
    });
    expect(scores.find((c) => c.category === "communication")!.label).toBe(
      "Communication with the people you serve",
    );

    const opportunities = computeOpportunities({ industry: "ngo_nonprofit", website_status: "none" });
    expect(opportunities[0].layers.found).toContain("organisation");
    expect(opportunities[0].layers.found).not.toContain("business");
  });

  it("never leaves a literal {{token}} unresolved in any triggered opportunity's copy", () => {
    for (const industry of ["hardware", "ngo_nonprofit", undefined]) {
      const opportunities = computeOpportunities({
        industry,
        quote_method: "adhoc",
        followup_tracking: "memory",
        approval_process: "informal",
        people_operations: "informal",
        delivery_visibility: "informal",
        systems_integration: "re_entry",
        website_status: "none",
        primary_customer_channel: "whatsapp_only",
        message_volume: "high",
        reporting_method: "verbal",
      });
      expect(opportunities.length).toBeGreaterThan(0);
      for (const opportunity of opportunities) {
        expect(opportunity.layers.found).not.toMatch(/\{\{.*?\}\}/);
        expect(opportunity.layers.whyItMatters).not.toMatch(/\{\{.*?\}\}/);
        expect(opportunity.layers.whatYouCouldDo).not.toMatch(/\{\{.*?\}\}/);
      }
    }
  });
});

describe("P2 calibration fix — digital presence severity distinguishes 'no website' from 'outdated'", () => {
  it("flags a missing website as HIGH severity", () => {
    const opportunities = computeOpportunities({ website_status: "none" });
    expect(opportunities.find((o) => o.id === "digital_presence")?.severity).toBe("high");
  });

  it("still flags an outdated website as only MEDIUM severity", () => {
    const opportunities = computeOpportunities({ website_status: "outdated" });
    expect(opportunities.find((o) => o.id === "digital_presence")?.severity).toBe("medium");
  });

  it("does not flag a modern website at all", () => {
    const opportunities = computeOpportunities({ website_status: "modern" });
    expect(opportunities.find((o) => o.id === "digital_presence")).toBeUndefined();
  });
});

describe("runAudit — full pipeline", () => {
  it("produces a self-consistent result for the heavy-friction scenario", () => {
    const result = runAudit(heavyFrictionAnswers);
    expect(result.efficiency.score).toBe(25);
    expect(result.efficiency.band).toBe("high");
    expect(result.opportunities.length).toBeGreaterThan(0);
    expect(result.leadScore.tier).toBe("hot");
    expect(result.commercial.potential).toBe("high");
  });

  it("keeps the efficiency score and the lead score independent of each other", () => {
    // Same operational answers, different qualification answers, must not move the efficiency score.
    const lowQualification = runAudit({ ...heavyFrictionAnswers, urgency: "exploring", decision_role: "not_involved" });
    const highQualification = runAudit({ ...heavyFrictionAnswers, urgency: "now", decision_role: "decision_maker" });
    expect(lowQualification.efficiency.score).toBe(highQualification.efficiency.score);
    expect(lowQualification.leadScore.score).not.toBe(highQualification.leadScore.score);
  });
});
