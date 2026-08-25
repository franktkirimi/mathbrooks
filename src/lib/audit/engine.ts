import type { Answers, ScoredCategory } from "./questions";

/**
 * Deterministic scoring, branching, and opportunity-mapping engine for the
 * Free AI Business Audit. Nothing in this file calls a model — every score
 * and mapping here is a fixed formula or lookup table over structured
 * answers, by design (see the approved AI Business Audit Plan, §6–§8).
 *
 * Two independent scores come out of this module:
 *  - The Digital Efficiency Score (customer-facing) measures the business's
 *    own operations. Its category weights are set purely by operational
 *    impact/frequency/criticality — never by which MathBrooks product a
 *    category happens to map to.
 *  - The Lead Qualification Score (internal only, never shown to the
 *    visitor) measures commercial fit with MathBrooks separately.
 */

// ─── Digital Efficiency Score ────────────────────────────────────────────

export const CATEGORY_WEIGHTS: Record<ScoredCategory, number> = {
  sales: 18,
  inventory: 12,
  reporting: 13,
  communication: 13,
  workflow: 13,
  integration: 8,
  digital: 8,
  people: 8,
  delivery: 7,
};

export const CATEGORY_LABELS: Record<ScoredCategory, string> = {
  sales: "Sales & customer follow-up",
  inventory: "Inventory & stock visibility",
  reporting: "Reporting & approvals",
  communication: "Communication & customer service",
  workflow: "Workflow & approvals discipline",
  integration: "Systems integration",
  digital: "Digital presence",
  people: "People & payroll operations",
  delivery: "Project & delivery visibility",
};

/**
 * Per-answer sub-score rubric (0-100), by question id then option id.
 * Options that mean "this doesn't apply to a business our size/shape"
 * (e.g. approval_process:"solo_no_chain") are deliberately left out of this
 * table — the missing lookup makes that answer excluded from its category's
 * average rather than scored as a problem, via the same filter that already
 * excludes genuinely-skipped categories like inventory (see
 * computeCategoryScores below).
 */
const OPTION_SCORES: Record<string, Record<string, number>> = {
  quote_method: { crm: 100, spreadsheet: 55, adhoc: 15 },
  followup_tracking: { system: 100, manual: 50, memory: 10 },
  lost_quotes: { rarely: 100, occasionally: 50, regularly: 10 },
  stock_tracking: { central: 100, spreadsheet: 45, manual: 10 },
  cross_branch_visibility: { realtime: 100, manual_consolidation: 45, phone_calls: 10 },
  reporting_method: { automated: 100, manual_excel: 40, verbal: 10 },
  report_time: { under_2h: 70, "2_8h": 40, over_day: 15 },
  approval_process: { system_enforced: 100, email_paper: 45, informal: 10 },
  systems_integration: { automatic: 100, manual_copying: 45, re_entry: 10 },
  website_status: { modern: 100, outdated: 45, none: 0 },
  primary_customer_channel: { structured: 100, phone_email: 55, whatsapp_only: 20 },
  people_operations: { dedicated: 100, spreadsheet: 45, informal: 10 },
  delivery_visibility: { system: 100, manual: 45, informal: 10 },
};

/** Which answered questions feed each category's base sub-score. */
const CATEGORY_QUESTIONS: Record<ScoredCategory, string[]> = {
  sales: ["quote_method", "followup_tracking", "lost_quotes"],
  inventory: ["stock_tracking", "cross_branch_visibility"],
  reporting: ["reporting_method", "report_time"],
  communication: ["primary_customer_channel"],
  workflow: ["approval_process"],
  integration: ["systems_integration"],
  digital: ["website_status"],
  people: ["people_operations"],
  delivery: ["delivery_visibility"],
};

export interface CategoryScore {
  category: ScoredCategory;
  label: string;
  applicable: boolean;
  score: number | null;
}

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

const round = (value: number) => Math.round(value);

/**
 * P1 calibration fix (FA-2): a WhatsApp-only business that says it's
 * genuinely keeping up gets a better starting point than the flat 20 the
 * channel alone implies — WhatsApp can be the right tool at the right
 * scale, and the taxonomy should be able to say so. This is a soft
 * modifier, not a full override: self-reported effectiveness shifts the
 * baseline, but real message volume still pulls it back down afterward, so
 * an optimistic self-report at genuinely high volume can't fully erase the
 * volume signal.
 */
const WHATSAPP_EFFECTIVENESS_BASE: Record<string, number> = {
  keeping_up: 65,
  stretched: 35,
  falling_behind: 10,
};

/**
 * The communication category applies a frequency modifier on top of the
 * channel sub-score: high message volume through a WhatsApp-only channel is
 * worse than the same volume through a structured channel.
 */
const communicationSubscore = (answers: Answers): number | null => {
  const isWhatsappOnly = answers.primary_customer_channel === "whatsapp_only";
  const whatsappEffectiveness = isWhatsappOnly
    ? WHATSAPP_EFFECTIVENESS_BASE[answers.whatsapp_effectiveness ?? ""]
    : undefined;
  const channelScore =
    whatsappEffectiveness ?? OPTION_SCORES.primary_customer_channel?.[answers.primary_customer_channel ?? ""];
  if (channelScore === undefined) return null;

  const volume = answers.message_volume;
  let penalty = 0;
  if (isWhatsappOnly && volume === "medium") penalty = 10;
  if (isWhatsappOnly && volume === "high") penalty = 20;
  return clamp(channelScore - penalty);
};

export const computeCategoryScores = (answers: Answers): CategoryScore[] =>
  (Object.keys(CATEGORY_WEIGHTS) as ScoredCategory[]).map((category) => {
    if (category === "communication") {
      const score = communicationSubscore(answers);
      return { category, label: CATEGORY_LABELS[category], applicable: score !== null, score };
    }

    const relevantScores = CATEGORY_QUESTIONS[category]
      .map((questionId) => OPTION_SCORES[questionId]?.[answers[questionId] ?? ""])
      .filter((value): value is number => value !== undefined);

    if (relevantScores.length === 0) {
      return { category, label: CATEGORY_LABELS[category], applicable: false, score: null };
    }

    const average = relevantScores.reduce((sum, value) => sum + value, 0) / relevantScores.length;
    return { category, label: CATEGORY_LABELS[category], applicable: true, score: round(average) };
  });

export type FrictionBand = "high" | "moderate" | "strong";

export interface EfficiencyScoreResult {
  score: number | null;
  band: FrictionBand | null;
  bandLabel: string;
  categoryScores: CategoryScore[];
}

const bandFor = (score: number): FrictionBand => {
  if (score < 40) return "high";
  if (score < 70) return "moderate";
  return "strong";
};

const BAND_LABELS: Record<FrictionBand, string> = {
  high: "High operational friction detected",
  moderate: "Moderate operational friction detected",
  strong: "Strong operational foundation",
};

/**
 * Weighted sum of applicable category scores, renormalised over only the
 * categories that currently have an answer — a category with no data yet
 * (e.g. inventory, before that section is reached or when it's skipped)
 * is excluded from both the numerator and denominator rather than being
 * defaulted to a guessed value.
 */
export const computeEfficiencyScore = (answers: Answers): EfficiencyScoreResult => {
  const categoryScores = computeCategoryScores(answers);
  const applicable = categoryScores.filter((entry) => entry.applicable && entry.score !== null);

  if (applicable.length === 0) {
    return { score: null, band: null, bandLabel: "", categoryScores };
  }

  const totalWeight = applicable.reduce((sum, entry) => sum + CATEGORY_WEIGHTS[entry.category], 0);
  const weightedSum = applicable.reduce(
    (sum, entry) => sum + (entry.score as number) * CATEGORY_WEIGHTS[entry.category],
    0,
  );
  const score = round(weightedSum / totalWeight);
  const band = bandFor(score);

  return { score, band, bandLabel: BAND_LABELS[band], categoryScores };
};

// ─── Opportunity taxonomy ────────────────────────────────────────────────

export type OpportunitySeverity = "high" | "medium";

export interface OpportunityLayers {
  found: string;
  whyItMatters: string;
  whatYouCouldDo: string;
}

export interface MappedProduct {
  label: string;
  href: string;
}

export interface Opportunity {
  id: string;
  category: ScoredCategory;
  severity: OpportunitySeverity;
  title: string;
  layers: OpportunityLayers;
  mathBrooksSolution: MappedProduct;
}

interface OpportunityRule {
  id: string;
  category: ScoredCategory;
  title: string;
  trigger: (answers: Answers) => boolean;
  severity: (answers: Answers) => OpportunitySeverity;
  layers: OpportunityLayers;
  mathBrooksSolution: MappedProduct;
}

const OPPORTUNITY_RULES: OpportunityRule[] = [
  {
    id: "quotation_workflow",
    category: "sales",
    title: "Quotation & follow-up workflow",
    // Guarded on quote_method being answered at all — a business that said it
    // doesn't send quotes (sends_quotes: "no") never reaches this question,
    // and must not be treated as having a quoting problem it doesn't have.
    trigger: (a) => Boolean(a.quote_method) && a.quote_method !== "crm" && a.followup_tracking !== "system",
    severity: (a) =>
      a.quote_method === "adhoc" && (a.lost_quotes === "regularly" || a.lost_quotes === "occasionally")
        ? "high"
        : "medium",
    layers: {
      found: "Quotes go out ad hoc and follow-up depends on individual staff remembering to chase them.",
      whyItMatters:
        "This increases the chance of missed quotations, inconsistent follow-up, and poor visibility into the sales pipeline as a whole.",
      whatYouCouldDo: "Centralise quotation creation and follow-up in a single structured workflow.",
    },
    mathBrooksSolution: { label: "MathBrooks CRM", href: "/products/crm" },
  },
  {
    id: "inventory_visibility",
    category: "inventory",
    title: "Inventory & stock visibility",
    trigger: (a) =>
      Boolean(a.stock_tracking) && (a.stock_tracking !== "central" || a.cross_branch_visibility === "phone_calls"),
    severity: (a) => (a.cross_branch_visibility === "phone_calls" ? "high" : "medium"),
    layers: {
      found: "Stock isn't visible in one place, and checking another branch's inventory means a phone call or a manual count.",
      whyItMatters:
        "This causes stockouts that could have been avoided, wasted staff time chasing information by phone, and decisions made on guesswork rather than current numbers.",
      whatYouCouldDo: "Give every branch real-time visibility into stock levels across the whole business.",
    },
    mathBrooksSolution: { label: "MathBrooks Inventory", href: "/products/inventory" },
  },
  {
    id: "reporting_automation",
    category: "reporting",
    title: "Management reporting",
    trigger: (a) => a.reporting_method !== "automated",
    severity: (a) => (a.report_time === "over_day" ? "high" : "medium"),
    layers: {
      found: "Management reports are put together manually rather than generated automatically.",
      whyItMatters:
        "Manual reporting takes staff time away from other work, delays decisions until the report is ready, and is more prone to error than a system pulling live numbers.",
      whatYouCouldDo: "Move recurring reports onto a live dashboard that updates as the business operates.",
    },
    mathBrooksSolution: { label: "MathBrooks Analytics", href: "/products/analytics" },
  },
  {
    id: "workflow_approvals",
    category: "workflow",
    title: "Approvals & sign-off",
    // "solo_no_chain" means the business is too small to have anyone to hand
    // an approval to — that's not a governance gap, so it must not trigger
    // this opportunity (its OPTION_SCORES entry is also omitted above, which
    // separately excludes it from the workflow category's score itself).
    trigger: (a) =>
      Boolean(a.approval_process) && a.approval_process !== "system_enforced" && a.approval_process !== "solo_no_chain",
    severity: (a) => (a.approval_process === "informal" ? "high" : "medium"),
    layers: {
      found: "Approvals — spending, discounts, orders, leave — happen by email, paper, or informally, without a consistent record.",
      whyItMatters:
        "Ungoverned approvals make it hard to enforce limits, create audit gaps, and slow decisions down when the right person isn't immediately reachable.",
      whatYouCouldDo: "Put a lightweight, system-enforced approval step in front of the decisions that matter most.",
    },
    mathBrooksSolution: { label: "MathBrooks Automation", href: "/products/automation" },
  },
  {
    id: "systems_integration_gap",
    category: "integration",
    title: "Disconnected systems",
    trigger: (a) => a.systems_integration !== "automatic",
    severity: (a) => (a.systems_integration === "re_entry" ? "high" : "medium"),
    layers: {
      found: "The same information gets typed into more than one system rather than flowing between them automatically.",
      whyItMatters:
        "Re-entering data costs staff time on every occurrence and is a routine source of mismatched records between systems.",
      whatYouCouldDo: "Connect the systems that currently require the same data twice.",
    },
    mathBrooksSolution: { label: "Automation & integration (Custom Systems)", href: "/services" },
  },
  {
    id: "customer_communication_load",
    category: "communication",
    title: "Customer communication load",
    trigger: (a) => a.primary_customer_channel === "whatsapp_only" && a.message_volume !== "low",
    severity: (a) => (a.message_volume === "high" ? "high" : "medium"),
    layers: {
      found: "Customer messages come through WhatsApp almost exclusively, at a volume that's hard to keep up with using an ad hoc process.",
      whyItMatters:
        "High message volume through an unstructured channel tends to mean slower replies, dropped conversations, and no shared record of what customers were told.",
      whatYouCouldDo: "Bring structure to the highest-volume channel without asking customers to change how they reach you.",
    },
    mathBrooksSolution: { label: "MathBrooks AI Assistant", href: "/products/ai-assistant" },
  },
  {
    id: "digital_presence",
    category: "digital",
    title: "Digital presence",
    trigger: (a) => a.website_status !== "modern",
    // P2 calibration refinement: having no web presence at all is a materially
    // worse gap than having one that's simply due for a refresh — not a threshold
    // tuned on traffic data, just a direct reading of the two states themselves.
    severity: (a) => (a.website_status === "none" ? "high" : "medium"),
    layers: {
      found: "The business either doesn't have a website or its current one is out of date.",
      whyItMatters:
        "A weak digital presence is often the first thing a prospective customer sees, and an outdated or missing site can undercut trust before any conversation starts.",
      whatYouCouldDo: "Bring the public-facing presence up to the standard of the business behind it.",
    },
    mathBrooksSolution: { label: "Custom Software (Digital Presence)", href: "/services" },
  },
  {
    id: "people_operations_gap",
    category: "people",
    title: "People & payroll operations",
    // "solo_no_staff" means there's no one to run payroll or leave for — not a gap.
    trigger: (a) =>
      Boolean(a.people_operations) && a.people_operations !== "dedicated" && a.people_operations !== "solo_no_staff",
    severity: (a) => (a.people_operations === "informal" ? "high" : "medium"),
    layers: {
      found: "Payroll and staff leave are handled without a dedicated system.",
      whyItMatters:
        "Manual or inconsistent payroll handling is a routine source of pay errors, missed leave accruals, and compliance gaps that are hard to catch until someone is already affected by them.",
      whatYouCouldDo: "Bring payroll, leave, and staff records into one governed system.",
    },
    mathBrooksSolution: { label: "MathBrooks HR", href: "/products/hr" },
  },
  {
    id: "delivery_visibility_gap",
    category: "delivery",
    title: "Project & delivery visibility",
    // "not_project_based" means the business doesn't run distinct projects/jobs — not a gap.
    trigger: (a) =>
      Boolean(a.delivery_visibility) && a.delivery_visibility !== "system" && a.delivery_visibility !== "not_project_based",
    severity: (a) => (a.delivery_visibility === "informal" ? "high" : "medium"),
    layers: {
      found: "There's no shared way to see whether projects or jobs are on schedule.",
      whyItMatters:
        "Without shared visibility, delays are usually discovered after they've already affected a customer or deadline, rather than while there's still time to act.",
      whatYouCouldDo: "Give the team one place to see project status and deadlines as they happen.",
    },
    mathBrooksSolution: { label: "MathBrooks Projects", href: "/products/projects" },
  },
];

const SEVERITY_ORDER: Record<OpportunitySeverity, number> = { high: 0, medium: 1 };

export const computeOpportunities = (answers: Answers): Opportunity[] =>
  OPPORTUNITY_RULES.filter((rule) => rule.trigger(answers))
    .map((rule) => ({
      id: rule.id,
      category: rule.category,
      severity: rule.severity(answers),
      title: rule.title,
      layers: rule.layers,
      mathBrooksSolution: rule.mathBrooksSolution,
    }))
    .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);

// ─── Lead Qualification Score (internal only) ────────────────────────────

export type LeadTier = "hot" | "warm" | "cold";

export interface LeadScoreResult {
  score: number;
  tier: LeadTier;
  needsNurture: boolean;
  nextAction: string;
}

const EMPLOYEE_SCALE_SCORES: Record<string, number> = {
  "1-5": 20,
  "6-20": 45,
  "21-50": 65,
  "51-200": 85,
  "200+": 100,
};

const BRANCH_SCALE_SCORES: Record<string, number> = {
  "1": 20,
  "2-3": 50,
  "4-10": 75,
  "10+": 100,
};

const URGENCY_SCORES: Record<string, number> = {
  exploring: 10,
  later_this_year: 40,
  next_quarter: 70,
  now: 100,
};

const AUTHORITY_SCORES: Record<string, number> = {
  decision_maker: 100,
  influencer: 55,
  not_involved: 15,
};

const BUDGET_SCORES: Record<string, number> = {
  unsure: 50,
  under_500: 30,
  "500_2000": 65,
  over_2000: 100,
};

const NEXT_ACTION: Record<LeadTier, string> = {
  hot: "Contact today.",
  warm: "Follow up within 2–3 business days.",
  cold: "Add to the nurture sequence — no immediate outreach required.",
};

const NEXT_ACTION_NEEDS_NURTURE =
  "Score qualifies as Hot, but urgency and authority signals are weak — verify fit before prioritising outreach.";

/**
 * P1 calibration fix (FA-5): a single real, well-defined, high-severity
 * problem is weighted as a strong primary signal on its own, rather than
 * being diluted to the same flat per-opportunity value regardless of how
 * many other opportunities exist. Company scale should not be the deciding
 * factor in whether one genuine urgent problem can qualify as Hot — see the
 * calibration report's P22/P24 comparison. Only the single most severe
 * opportunity counts as "primary"; every other opportunity (high or medium)
 * contributes a smaller secondary amount, so breadth of problems still adds
 * up, just with diminishing weight per additional item.
 */
const SEVERITY_PRIMARY = { high: 60, medium: 35 } as const;
const SEVERITY_SECONDARY = { high: 15, medium: 6 } as const;

const computeSeverityScore = (highCount: number, mediumCount: number): number => {
  if (highCount === 0 && mediumCount === 0) return 0;
  const primary = highCount > 0 ? SEVERITY_PRIMARY.high : SEVERITY_PRIMARY.medium;
  const remainingHigh = highCount > 0 ? highCount - 1 : 0;
  const remainingMedium = highCount > 0 ? mediumCount : mediumCount - 1;
  const secondary = remainingHigh * SEVERITY_SECONDARY.high + remainingMedium * SEVERITY_SECONDARY.medium;
  return clamp(primary + secondary);
};

export const computeLeadScore = (answers: Answers, opportunities: Opportunity[]): LeadScoreResult => {
  const highCount = opportunities.filter((o) => o.severity === "high").length;
  const mediumCount = opportunities.filter((o) => o.severity === "medium").length;
  const severityScore = computeSeverityScore(highCount, mediumCount);

  const employeeScore = EMPLOYEE_SCALE_SCORES[answers.employee_band ?? ""] ?? 50;
  const branchScore = BRANCH_SCALE_SCORES[answers.branch_count ?? ""] ?? 50;
  const scaleScore = (employeeScore + branchScore) / 2;

  const urgencyScore = URGENCY_SCORES[answers.urgency ?? ""] ?? 10;
  const authorityScore = AUTHORITY_SCORES[answers.decision_role ?? ""] ?? 15;

  const components: { value: number; weight: number }[] = [
    { value: severityScore, weight: 40 },
    { value: scaleScore, weight: 20 },
    { value: urgencyScore, weight: 15 },
    { value: authorityScore, weight: 15 },
  ];

  const budgetScore = answers.budget_band ? BUDGET_SCORES[answers.budget_band] : undefined;
  if (budgetScore !== undefined) {
    components.push({ value: budgetScore, weight: 10 });
  }
  // When budget is skipped, its 10% weight is removed from the denominator
  // entirely (renormalised), so skipping it is never a penalty.

  const totalWeight = components.reduce((sum, c) => sum + c.weight, 0);
  const weightedSum = components.reduce((sum, c) => sum + c.value * c.weight, 0);
  const score = round(weightedSum / totalWeight);

  const hasHighSeverity = highCount > 0;
  const hasAnyOpportunity = opportunities.length > 0;
  const urgencyHighEnough = answers.urgency === "next_quarter" || answers.urgency === "now";
  const isDecisionMaker = answers.decision_role === "decision_maker";
  const gatePasses = hasHighSeverity && (urgencyHighEnough || isDecisionMaker);

  if (score >= 70 && gatePasses) {
    return { score, tier: "hot", needsNurture: false, nextAction: NEXT_ACTION.hot };
  }
  if (score >= 70 && !gatePasses) {
    return { score, tier: "warm", needsNurture: true, nextAction: NEXT_ACTION_NEEDS_NURTURE };
  }
  if (score >= 40 && hasAnyOpportunity) {
    return { score, tier: "warm", needsNurture: false, nextAction: NEXT_ACTION.warm };
  }
  return { score, tier: "cold", needsNurture: false, nextAction: NEXT_ACTION.cold };
};

// ─── Commercial potential (qualitative only — no numeric estimate, §17) ───

export type CommercialPotential = "low" | "medium" | "high";
export type ComplexityEstimate = "low" | "medium" | "high";

export interface CommercialSummary {
  potential: CommercialPotential;
  complexity: ComplexityEstimate;
  likelyScope: string[];
}

export const computeCommercialSummary = (opportunities: Opportunity[], leadScore: LeadScoreResult): CommercialSummary => {
  const highCount = opportunities.filter((o) => o.severity === "high").length;

  let potential: CommercialPotential = "low";
  if (leadScore.tier === "hot" || highCount >= 2) potential = "high";
  else if (leadScore.tier === "warm" || opportunities.length >= 2) potential = "medium";

  let complexity: ComplexityEstimate = "low";
  if (opportunities.length >= 4) complexity = "high";
  else if (opportunities.length >= 2) complexity = "medium";

  const likelyScope = opportunities.slice(0, 3).map((o) => o.mathBrooksSolution.label);

  return { potential, complexity, likelyScope };
};

// ─── Full run ─────────────────────────────────────────────────────────────

export interface AuditResult {
  efficiency: EfficiencyScoreResult;
  opportunities: Opportunity[];
  leadScore: LeadScoreResult;
  commercial: CommercialSummary;
}

export const runAudit = (answers: Answers): AuditResult => {
  const efficiency = computeEfficiencyScore(answers);
  const opportunities = computeOpportunities(answers);
  const leadScore = computeLeadScore(answers, opportunities);
  const commercial = computeCommercialSummary(opportunities, leadScore);
  return { efficiency, opportunities, leadScore, commercial };
};
