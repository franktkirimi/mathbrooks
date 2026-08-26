// GENERATED FILE — do not edit directly.
// Source of truth: src/lib/audit/engine.ts
// Regenerate with: npm run sync:api-lib

import { applyTerminology } from "./terminology.js";
const CATEGORY_WEIGHTS = {
  sales: 18,
  inventory: 12,
  reporting: 13,
  communication: 13,
  workflow: 13,
  integration: 8,
  digital: 8,
  people: 8,
  delivery: 7
};
const CATEGORY_LABELS = {
  sales: "Sales & follow-up with {{audience}}",
  inventory: "Inventory & stock visibility",
  reporting: "Reporting & approvals",
  communication: "Communication with {{audience}}",
  workflow: "Workflow & approvals discipline",
  integration: "Systems integration",
  digital: "Digital presence",
  people: "People & payroll operations",
  delivery: "Project & delivery visibility"
};
const OPTION_SCORES = {
  quote_method: { crm: 100, spreadsheet: 55, adhoc: 15 },
  followup_tracking: { system: 100, manual: 50, memory: 10 },
  lost_quotes: { rarely: 100, occasionally: 50, regularly: 10 },
  stock_tracking: { central: 100, spreadsheet: 45, manual: 10 },
  cross_branch_visibility: { realtime: 100, manual_consolidation: 45, phone_calls: 10 },
  reporting_method: { automated: 100, manual_excel: 40, verbal: 10 },
  report_time: { under_2h: 70, "2_8h": 40, over_day: 15 },
  approval_process: { system_enforced: 100, email_paper: 45, informal: 10 },
  systems_integration: { automatic: 100, manual_copying: 45, re_entry: 10 },
  website_status: { modern: 100, outdated: 45, none: 15 },
  primary_customer_channel: { structured: 100, phone_email: 55, whatsapp_only: 20 },
  people_operations: { dedicated: 100, spreadsheet: 45, informal: 10 },
  delivery_visibility: { system: 100, manual: 45, informal: 10 }
};
const CATEGORY_QUESTIONS = {
  sales: ["quote_method", "followup_tracking", "lost_quotes"],
  inventory: ["stock_tracking", "cross_branch_visibility"],
  reporting: ["reporting_method", "report_time"],
  communication: ["primary_customer_channel"],
  workflow: ["approval_process"],
  integration: ["systems_integration"],
  digital: ["website_status"],
  people: ["people_operations"],
  delivery: ["delivery_visibility"]
};
const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));
const round = (value) => Math.round(value);
const WHATSAPP_EFFECTIVENESS_BASE = {
  keeping_up: 65,
  stretched: 35,
  falling_behind: 10
};
const communicationSubscore = (answers) => {
  const isWhatsappOnly = answers.primary_customer_channel === "whatsapp_only";
  const whatsappEffectiveness = isWhatsappOnly ? WHATSAPP_EFFECTIVENESS_BASE[answers.whatsapp_effectiveness ?? ""] : void 0;
  const channelScore = whatsappEffectiveness ?? OPTION_SCORES.primary_customer_channel?.[answers.primary_customer_channel ?? ""];
  if (channelScore === void 0) return null;
  const volume = answers.message_volume;
  let penalty = 0;
  if (isWhatsappOnly && volume === "medium") penalty = 10;
  if (isWhatsappOnly && volume === "high") penalty = 20;
  return clamp(channelScore - penalty);
};
const computeCategoryScores = (answers) => Object.keys(CATEGORY_WEIGHTS).map((category) => {
  const label = applyTerminology(CATEGORY_LABELS[category], answers);
  if (category === "communication") {
    const score = communicationSubscore(answers);
    return { category, label, applicable: score !== null, score };
  }
  const relevantScores = CATEGORY_QUESTIONS[category].map((questionId) => OPTION_SCORES[questionId]?.[answers[questionId] ?? ""]).filter((value) => value !== void 0);
  if (relevantScores.length === 0) {
    return { category, label, applicable: false, score: null };
  }
  const average = relevantScores.reduce((sum, value) => sum + value, 0) / relevantScores.length;
  return { category, label, applicable: true, score: round(average) };
});
const bandFor = (score) => {
  if (score < 40) return "high";
  if (score < 70) return "moderate";
  return "strong";
};
const BAND_LABELS = {
  high: "High operational friction detected",
  moderate: "Moderate operational friction detected",
  strong: "Strong operational foundation"
};
const computeEfficiencyScore = (answers) => {
  const categoryScores = computeCategoryScores(answers);
  const applicable = categoryScores.filter((entry) => entry.applicable && entry.score !== null);
  if (applicable.length === 0) {
    return { score: null, band: null, bandLabel: "", categoryScores };
  }
  const totalWeight = applicable.reduce((sum, entry) => sum + CATEGORY_WEIGHTS[entry.category], 0);
  const weightedSum = applicable.reduce(
    (sum, entry) => sum + entry.score * CATEGORY_WEIGHTS[entry.category],
    0
  );
  const score = round(weightedSum / totalWeight);
  const band = bandFor(score);
  return { score, band, bandLabel: BAND_LABELS[band], categoryScores };
};
const OPPORTUNITY_RULES = [
  {
    id: "quotation_workflow",
    category: "sales",
    title: "Quotation & follow-up workflow",
    // Guarded on quote_method being answered at all — a business that said it
    // doesn't send quotes (sends_quotes: "no") never reaches this question,
    // and must not be treated as having a quoting problem it doesn't have.
    trigger: (a) => Boolean(a.quote_method) && a.quote_method !== "crm" && a.followup_tracking !== "system",
    severity: (a) => a.quote_method === "adhoc" && (a.lost_quotes === "regularly" || a.lost_quotes === "occasionally") ? "high" : "medium",
    layers: {
      found: "Quotes go out ad hoc and follow-up depends on individual staff remembering to chase them.",
      whyItMatters: "This increases the chance of missed quotations, inconsistent follow-up, and poor visibility into the sales pipeline as a whole.",
      whatYouCouldDo: "Centralise quotation creation and follow-up in a single structured workflow."
    },
    mathBrooksSolution: { label: "MathBrooks CRM", href: "/products/crm" }
  },
  {
    id: "inventory_visibility",
    category: "inventory",
    title: "Inventory & stock visibility",
    trigger: (a) => Boolean(a.stock_tracking) && (a.stock_tracking !== "central" || a.cross_branch_visibility === "phone_calls"),
    severity: (a) => a.cross_branch_visibility === "phone_calls" ? "high" : "medium",
    layers: {
      found: "Stock isn't visible in one place, and checking another branch's inventory means a phone call or a manual count.",
      whyItMatters: "This causes stockouts that could have been avoided, wasted staff time chasing information by phone, and decisions made on guesswork rather than current numbers.",
      whatYouCouldDo: "Give every branch real-time visibility into stock levels across the whole {{org}}."
    },
    mathBrooksSolution: { label: "MathBrooks Inventory", href: "/products/inventory" }
  },
  {
    id: "reporting_automation",
    category: "reporting",
    title: "Management reporting",
    // Guarded on reporting_method being answered at all, matching the pattern
    // used elsewhere — an unanswered question must not be read as a problem.
    // "solo_full_visibility" means there's no one to report to and no gap.
    trigger: (a) => Boolean(a.reporting_method) && a.reporting_method !== "automated" && a.reporting_method !== "solo_full_visibility",
    severity: (a) => a.report_time === "over_day" ? "high" : "medium",
    layers: {
      found: "Management reports are put together manually rather than generated automatically.",
      whyItMatters: "Manual reporting takes staff time away from other work, delays decisions until the report is ready, and is more prone to error than a system pulling live numbers.",
      whatYouCouldDo: "Move recurring reports onto a live dashboard that updates as the {{org}} operates."
    },
    mathBrooksSolution: { label: "MathBrooks Analytics", href: "/products/analytics" }
  },
  {
    id: "workflow_approvals",
    category: "workflow",
    title: "Approvals & sign-off",
    // "solo_no_chain" means the business is too small to have anyone to hand
    // an approval to — that's not a governance gap, so it must not trigger
    // this opportunity (its OPTION_SCORES entry is also omitted above, which
    // separately excludes it from the workflow category's score itself).
    trigger: (a) => Boolean(a.approval_process) && a.approval_process !== "system_enforced" && a.approval_process !== "solo_no_chain",
    severity: (a) => a.approval_process === "informal" ? "high" : "medium",
    layers: {
      found: "Approvals \u2014 spending, discounts, orders, leave \u2014 happen by email, paper, or informally, without a consistent record.",
      whyItMatters: "Ungoverned approvals make it hard to enforce limits, create audit gaps, and slow decisions down when the right person isn't immediately reachable.",
      whatYouCouldDo: "Put a lightweight, system-enforced approval step in front of the decisions that matter most."
    },
    mathBrooksSolution: { label: "MathBrooks Automation", href: "/products/automation" }
  },
  {
    id: "systems_integration_gap",
    category: "integration",
    title: "Disconnected systems",
    // Guarded on systems_integration being answered at all — matches the
    // pattern used elsewhere (inventory_visibility, quotation_workflow, etc.).
    trigger: (a) => Boolean(a.systems_integration) && a.systems_integration !== "automatic",
    severity: (a) => a.systems_integration === "re_entry" ? "high" : "medium",
    layers: {
      found: "The same information gets typed into more than one system rather than flowing between them automatically.",
      whyItMatters: "Re-entering data costs staff time on every occurrence and is a routine source of mismatched records between systems.",
      whatYouCouldDo: "Connect the systems that currently require the same data twice."
    },
    mathBrooksSolution: { label: "Automation & integration (Custom Systems)", href: "/services" }
  },
  {
    id: "customer_communication_load",
    category: "communication",
    title: "Communication load",
    trigger: (a) => a.primary_customer_channel === "whatsapp_only" && a.message_volume !== "low",
    severity: (a) => a.message_volume === "high" ? "high" : "medium",
    layers: {
      found: "Messages from {{audience}} come through WhatsApp almost exclusively, at a volume that's hard to keep up with using an ad hoc process.",
      whyItMatters: "High message volume through an unstructured channel tends to mean slower replies, dropped conversations, and no shared record of what {{audience}} were told.",
      whatYouCouldDo: "Bring structure to the highest-volume channel without asking {{audience}} to change how they reach you."
    },
    mathBrooksSolution: { label: "MathBrooks AI Assistant", href: "/products/ai-assistant" }
  },
  {
    id: "digital_presence",
    category: "digital",
    title: "Digital presence",
    // Guarded on website_status being answered at all — matches the pattern
    // used elsewhere (inventory_visibility, quotation_workflow, etc.).
    trigger: (a) => Boolean(a.website_status) && a.website_status !== "modern",
    // P2 calibration refinement: having no web presence at all is a materially
    // worse gap than having one that's simply due for a refresh — not a threshold
    // tuned on traffic data, just a direct reading of the two states themselves.
    severity: (a) => a.website_status === "none" ? "high" : "medium",
    layers: {
      found: "The {{org}} either doesn't have a website or its current one is out of date.",
      whyItMatters: "A weak digital presence is often the first thing someone sees before they ever get in touch, and an outdated or missing site can undercut trust before any conversation starts.",
      whatYouCouldDo: "Bring the public-facing presence up to the standard of the {{org}} behind it."
    },
    mathBrooksSolution: { label: "Custom Software (Digital Presence)", href: "/services" }
  },
  {
    id: "people_operations_gap",
    category: "people",
    title: "People & payroll operations",
    // "solo_no_staff" means there's no one to run payroll or leave for — not a gap.
    trigger: (a) => Boolean(a.people_operations) && a.people_operations !== "dedicated" && a.people_operations !== "solo_no_staff",
    severity: (a) => a.people_operations === "informal" ? "high" : "medium",
    layers: {
      found: "Payroll and staff leave are handled without a dedicated system.",
      whyItMatters: "Manual or inconsistent payroll handling is a routine source of pay errors, missed leave accruals, and compliance gaps that are hard to catch until someone is already affected by them.",
      whatYouCouldDo: "Bring payroll, leave, and staff records into one governed system."
    },
    mathBrooksSolution: { label: "MathBrooks HR", href: "/products/hr" }
  },
  {
    id: "delivery_visibility_gap",
    category: "delivery",
    title: "Project & delivery visibility",
    // "not_project_based" means the business doesn't run distinct projects/jobs — not a gap.
    trigger: (a) => Boolean(a.delivery_visibility) && a.delivery_visibility !== "system" && a.delivery_visibility !== "not_project_based",
    severity: (a) => a.delivery_visibility === "informal" ? "high" : "medium",
    layers: {
      found: "There's no shared way to see whether projects or jobs are on schedule.",
      whyItMatters: "Without shared visibility, delays are usually discovered after they've already affected {{audience}} or missed a deadline, rather than while there's still time to act.",
      whatYouCouldDo: "Give the team one place to see project status and deadlines as they happen."
    },
    mathBrooksSolution: { label: "MathBrooks Projects", href: "/products/projects" }
  }
];
const SEVERITY_ORDER = { high: 0, medium: 1 };
const computeOpportunities = (answers) => OPPORTUNITY_RULES.filter((rule) => rule.trigger(answers)).map((rule) => ({
  id: rule.id,
  category: rule.category,
  severity: rule.severity(answers),
  title: rule.title,
  layers: {
    found: applyTerminology(rule.layers.found, answers),
    whyItMatters: applyTerminology(rule.layers.whyItMatters, answers),
    whatYouCouldDo: applyTerminology(rule.layers.whatYouCouldDo, answers)
  },
  mathBrooksSolution: rule.mathBrooksSolution
})).sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
const EMPLOYEE_SCALE_SCORES = {
  "1-5": 20,
  "6-20": 45,
  "21-50": 65,
  "51-200": 85,
  "200+": 100
};
const BRANCH_SCALE_SCORES = {
  "1": 20,
  "2-3": 50,
  "4-10": 75,
  "10+": 100
};
const URGENCY_SCORES = {
  exploring: 10,
  later_this_year: 40,
  next_quarter: 70,
  now: 100
};
const AUTHORITY_SCORES = {
  decision_maker: 100,
  influencer: 55,
  not_involved: 15
};
const BUDGET_SCORES = {
  unsure: 50,
  under_500: 30,
  "500_2000": 65,
  over_2000: 100
};
const NEXT_ACTION = {
  hot: "Contact today.",
  warm: "Follow up within 2\u20133 business days.",
  cold: "Add to the nurture sequence \u2014 no immediate outreach required."
};
const NEXT_ACTION_NEEDS_NURTURE = "Score qualifies as Hot, but urgency and authority signals are weak \u2014 verify fit before prioritising outreach.";
const SEVERITY_PRIMARY = { high: 60, medium: 35 };
const SEVERITY_SECONDARY = { high: 15, medium: 6 };
const computeSeverityScore = (highCount, mediumCount) => {
  if (highCount === 0 && mediumCount === 0) return 0;
  const primary = highCount > 0 ? SEVERITY_PRIMARY.high : SEVERITY_PRIMARY.medium;
  const remainingHigh = highCount > 0 ? highCount - 1 : 0;
  const remainingMedium = highCount > 0 ? mediumCount : mediumCount - 1;
  const secondary = remainingHigh * SEVERITY_SECONDARY.high + remainingMedium * SEVERITY_SECONDARY.medium;
  return clamp(primary + secondary);
};
const computeLeadScore = (answers, opportunities) => {
  const highCount = opportunities.filter((o) => o.severity === "high").length;
  const mediumCount = opportunities.filter((o) => o.severity === "medium").length;
  const severityScore = computeSeverityScore(highCount, mediumCount);
  const employeeScore = EMPLOYEE_SCALE_SCORES[answers.employee_band ?? ""] ?? 50;
  const branchScore = BRANCH_SCALE_SCORES[answers.branch_count ?? ""] ?? 50;
  const scaleScore = (employeeScore + branchScore) / 2;
  const urgencyScore = URGENCY_SCORES[answers.urgency ?? ""] ?? 10;
  const authorityScore = AUTHORITY_SCORES[answers.decision_role ?? ""] ?? 15;
  const components = [
    { value: severityScore, weight: 40 },
    { value: scaleScore, weight: 20 },
    { value: urgencyScore, weight: 15 },
    { value: authorityScore, weight: 15 }
  ];
  const budgetScore = answers.budget_band ? BUDGET_SCORES[answers.budget_band] : void 0;
  if (budgetScore !== void 0) {
    components.push({ value: budgetScore, weight: 10 });
  }
  const totalWeight = components.reduce((sum, c) => sum + c.weight, 0);
  const weightedSum = components.reduce((sum, c) => sum + c.value * c.weight, 0);
  const score = round(weightedSum / totalWeight);
  const hasHighSeverity = highCount > 0;
  const hasAnyOpportunity = opportunities.length > 0;
  const urgencyHighEnough = answers.urgency === "next_quarter" || answers.urgency === "now";
  const isDecisionMaker = answers.decision_role === "decision_maker";
  const gatePasses = hasHighSeverity && urgencyHighEnough && isDecisionMaker;
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
const computeCommercialSummary = (opportunities, leadScore) => {
  const highCount = opportunities.filter((o) => o.severity === "high").length;
  let potential = "low";
  if (leadScore.tier === "hot" || highCount >= 2) potential = "high";
  else if (leadScore.tier === "warm" || opportunities.length >= 2) potential = "medium";
  let complexity = "low";
  if (highCount >= 2) complexity = "high";
  else if (highCount >= 1 || opportunities.length >= 4) complexity = "medium";
  const likelyScope = opportunities.slice(0, 3).map((o) => o.mathBrooksSolution.label);
  return { potential, complexity, likelyScope };
};
const applyBreadthOfMediocrityAdjustment = (efficiency, opportunities) => {
  if (efficiency.score === null || efficiency.band !== "strong") return efficiency;
  const highCount = opportunities.filter((o) => o.severity === "high").length;
  const mediumCount = opportunities.filter((o) => o.severity === "medium").length;
  if (highCount > 0 || mediumCount < 2) return efficiency;
  const score = clamp(efficiency.score - 18);
  const band = bandFor(score);
  return { ...efficiency, score, band, bandLabel: BAND_LABELS[band] };
};
const runAudit = (answers) => {
  const opportunities = computeOpportunities(answers);
  const efficiency = applyBreadthOfMediocrityAdjustment(computeEfficiencyScore(answers), opportunities);
  const leadScore = computeLeadScore(answers, opportunities);
  const commercial = computeCommercialSummary(opportunities, leadScore);
  return { efficiency, opportunities, leadScore, commercial };
};
export {
  CATEGORY_LABELS,
  CATEGORY_QUESTIONS,
  CATEGORY_WEIGHTS,
  computeCategoryScores,
  computeCommercialSummary,
  computeEfficiencyScore,
  computeLeadScore,
  computeOpportunities,
  runAudit
};
