export type ScoredCategory =
  | "sales"
  | "inventory"
  | "reporting"
  | "communication"
  | "workflow"
  | "integration"
  | "digital"
  | "people"
  | "delivery";

export type QuestionCategory = ScoredCategory | "context" | "qualification";

export type Answers = Record<string, string>;

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  sectionId: string;
  category: QuestionCategory;
  prompt: string;
  helpText?: string;
  options: QuestionOption[];
  required: boolean;
  /** Defaults to "select" (option buttons). "text" renders a free-text input instead — used
   *  for the rare question where the option list can't cover every real answer (e.g. "please
   *  specify" after choosing "Something else"), not as a general substitute for branching. */
  inputType?: "select" | "text";
  /** Placeholder shown for a "text" question. Ignored for "select". */
  inputPlaceholder?: string;
  /** When present, the question is only shown if this returns true for the answers given so far. */
  visibleWhen?: (answers: Answers) => boolean;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questionIds: string[];
  /** When present, the whole section (and every question in it) is skipped if this returns false. */
  visibleWhen?: (answers: Answers) => boolean;
}

/**
 * P1 calibration fix (FA-4): section visibility is driven directly by the
 * holds_physical_stock answer rather than inferred from industry/branch
 * count. The old inference had gaps in both directions — hospitality and
 * manufacturing businesses were wrongly excluded, while any multi-branch
 * service business (real estate, multi-branch professional services) was
 * wrongly forced through stock-tracking questions regardless of industry.
 * A direct question is more accurate than either proxy.
 */
export const inventorySectionVisible = (answers: Answers): boolean => {
  // Stay visible until answered, so it isn't skipped prematurely on a false negative.
  if (!answers.holds_physical_stock) return true;
  return answers.holds_physical_stock === "yes";
};

export const QUESTIONS: Question[] = [
  // ── Section 0 — Business context ──────────────────────────────────────
  {
    id: "industry",
    sectionId: "context",
    category: "context",
    prompt: "What kind of business is this?",
    options: [
      { id: "hardware", label: "Hardware & building supplies" },
      { id: "retail", label: "Retail" },
      { id: "distribution", label: "Distribution & wholesale" },
      { id: "professional_services", label: "Professional services" },
      { id: "manufacturing", label: "Manufacturing" },
      { id: "hospitality", label: "Hospitality" },
      { id: "agriculture", label: "Agriculture" },
      { id: "healthcare", label: "Healthcare" },
      { id: "education", label: "Education" },
      { id: "ngo_nonprofit", label: "NGO / nonprofit" },
      { id: "construction", label: "Construction" },
      { id: "real_estate", label: "Real estate" },
      { id: "technology", label: "Technology" },
      { id: "logistics_transport", label: "Logistics & transport" },
      { id: "other", label: "Something else" },
    ],
    required: true,
  },
  {
    id: "industry_other_detail",
    sectionId: "context",
    category: "context",
    prompt: "What kind of business is it?",
    helpText: "This is just for context — it doesn't affect your score.",
    inputType: "text",
    inputPlaceholder: "e.g. film production, funeral services, courier",
    options: [],
    required: true,
    visibleWhen: (answers) => answers.industry === "other",
  },
  {
    id: "employee_band",
    sectionId: "context",
    category: "context",
    prompt: "Roughly how many people work there?",
    options: [
      { id: "1-5", label: "1–5" },
      { id: "6-20", label: "6–20" },
      { id: "21-50", label: "21–50" },
      { id: "51-200", label: "51–200" },
      { id: "200+", label: "200+" },
    ],
    required: true,
  },
  {
    id: "branch_count",
    sectionId: "context",
    category: "context",
    prompt: "How many branches or locations does it operate from?",
    options: [
      { id: "1", label: "Just one" },
      { id: "2-3", label: "2–3" },
      { id: "4-10", label: "4–10" },
      { id: "10+", label: "More than 10" },
    ],
    required: true,
  },
  {
    id: "sends_quotes",
    sectionId: "context",
    category: "context",
    prompt: "Does this business typically send quotes or estimates before a sale?",
    helpText: "Some businesses — walk-in shops, clinics, schools — don't really quote. That's fine, we'll skip ahead.",
    options: [
      { id: "yes", label: "Yes, regularly" },
      { id: "no", label: "Not really — customers buy directly, or we don't quote formally" },
    ],
    required: true,
  },
  {
    id: "holds_physical_stock",
    sectionId: "context",
    category: "context",
    prompt: "Does this business hold physical stock or inventory?",
    helpText: "This decides whether we ask about stock tracking below.",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No — a service business, or stock isn't something we manage" },
    ],
    required: true,
  },

  // ── Section 1 — Sales & customer follow-up ────────────────────────────
  {
    id: "quote_method",
    sectionId: "sales",
    category: "sales",
    prompt: "How do quotes usually go out to customers?",
    options: [
      { id: "crm", label: "A dedicated CRM or quoting system" },
      { id: "spreadsheet", label: "Spreadsheet or email templates" },
      { id: "adhoc", label: "WhatsApp or phone, worked out case by case" },
    ],
    required: true,
    visibleWhen: (answers) => answers.sends_quotes !== "no",
  },
  {
    id: "followup_tracking",
    sectionId: "sales",
    category: "sales",
    prompt: "How is follow-up on an open quote tracked?",
    options: [
      { id: "system", label: "Tracked in a system, with reminders" },
      { id: "manual", label: "Tracked manually — notebook or spreadsheet" },
      { id: "memory", label: "Not really tracked — relies on memory" },
    ],
    required: true,
    visibleWhen: (answers) => answers.sends_quotes !== "no",
  },
  {
    id: "message_volume",
    sectionId: "sales",
    category: "communication",
    prompt: "About how many customer messages does the business handle a week?",
    options: [
      { id: "low", label: "Under 20" },
      { id: "medium", label: "20–100" },
      { id: "high", label: "More than 100" },
    ],
    required: true,
  },
  {
    id: "lost_quotes",
    sectionId: "sales",
    category: "sales",
    prompt: "Do quotes ever get lost or forgotten before they're followed up?",
    options: [
      { id: "rarely", label: "Rarely or never" },
      { id: "occasionally", label: "Occasionally" },
      { id: "regularly", label: "Yes, regularly" },
    ],
    required: true,
    visibleWhen: (answers) => answers.quote_method === "adhoc",
  },

  // ── Section 2 — Inventory & stock visibility (conditionally skipped) ──
  {
    id: "stock_tracking",
    sectionId: "inventory",
    category: "inventory",
    prompt: "How is stock tracked?",
    options: [
      { id: "central", label: "A central system everyone can see" },
      { id: "spreadsheet", label: "Spreadsheet" },
      { id: "manual", label: "Manually, per branch — memory or paper" },
    ],
    required: true,
  },
  {
    id: "cross_branch_visibility",
    sectionId: "inventory",
    category: "inventory",
    prompt: "If someone needs to check stock at another branch, how do they do it?",
    options: [
      { id: "realtime", label: "Real-time shared system" },
      { id: "manual_consolidation", label: "Someone consolidates it manually" },
      { id: "phone_calls", label: "Branches call each other to check" },
    ],
    required: true,
    visibleWhen: (answers) => answers.branch_count !== "1",
  },

  // ── Section 3 — Reporting, approvals & systems ────────────────────────
  {
    id: "reporting_method",
    sectionId: "reporting",
    category: "reporting",
    prompt: "How do management reports get produced?",
    options: [
      { id: "automated", label: "An automated dashboard" },
      { id: "manual_excel", label: "Manually, in Excel or similar" },
      { id: "verbal", label: "Verbally, or not on a regular basis" },
    ],
    required: true,
  },
  {
    id: "report_time",
    sectionId: "reporting",
    category: "reporting",
    prompt: "About how long does producing one of those reports take?",
    options: [
      { id: "under_2h", label: "Under 2 hours" },
      { id: "2_8h", label: "2–8 hours" },
      { id: "over_day", label: "More than a day" },
    ],
    required: true,
    visibleWhen: (answers) => answers.reporting_method === "manual_excel",
  },
  {
    id: "approval_process",
    sectionId: "reporting",
    category: "workflow",
    prompt: "How do approvals happen — spending, discounts, orders, leave?",
    options: [
      { id: "system_enforced", label: "A system enforces who signs off" },
      { id: "email_paper", label: "Email or paper trail" },
      { id: "informal", label: "Informal — verbal, or whoever's around" },
      { id: "solo_no_chain", label: "Just the owner or a couple of us — there's no one to hand approvals to" },
    ],
    required: true,
  },
  {
    id: "systems_integration",
    sectionId: "reporting",
    category: "integration",
    prompt: "When the same piece of information is needed in two places, what happens?",
    options: [
      { id: "automatic", label: "Systems already talk to each other" },
      { id: "manual_copying", label: "Someone copies it across sometimes" },
      { id: "re_entry", label: "It gets typed in again, more than once, often" },
    ],
    required: true,
  },

  // ── Section 3b — People operations & delivery visibility ───────────────
  {
    id: "people_operations",
    sectionId: "people_delivery",
    category: "people",
    prompt: "How is payroll and staff leave handled?",
    options: [
      { id: "dedicated", label: "A dedicated HR/payroll system" },
      { id: "spreadsheet", label: "Tracked manually in spreadsheets" },
      { id: "informal", label: "No consistent process — handled case by case" },
      { id: "solo_no_staff", label: "Just the owner — no other staff to manage" },
    ],
    required: true,
  },
  {
    id: "delivery_visibility",
    sectionId: "people_delivery",
    category: "delivery",
    prompt: "How does the business track whether projects or jobs are on schedule?",
    options: [
      { id: "system", label: "A shared system tracks status and deadlines" },
      { id: "manual", label: "Tracked manually — spreadsheets or check-ins" },
      { id: "informal", label: "Informally — deadlines slip without much visibility" },
      { id: "not_project_based", label: "This business doesn't really run distinct projects or jobs" },
    ],
    required: true,
  },

  // ── Section 4 — Digital presence & communication ──────────────────────
  {
    id: "website_status",
    sectionId: "digital",
    category: "digital",
    prompt: "Does the business have a website?",
    options: [
      { id: "modern", label: "Yes, and it's up to date" },
      { id: "outdated", label: "Yes, but it's outdated" },
      { id: "none", label: "No" },
    ],
    required: true,
  },
  {
    id: "primary_customer_channel",
    sectionId: "digital",
    category: "communication",
    prompt: "What's the main way customers reach the business?",
    options: [
      { id: "structured", label: "A structured channel — ticketing or CRM" },
      { id: "phone_email", label: "Phone or email" },
      { id: "whatsapp_only", label: "WhatsApp, almost exclusively" },
    ],
    required: true,
  },
  {
    id: "whatsapp_effectiveness",
    sectionId: "digital",
    category: "communication",
    prompt: "Are you generally able to keep up with messages on WhatsApp?",
    helpText: "WhatsApp can work well at the right scale — this just tells us whether it currently does for you.",
    options: [
      { id: "keeping_up", label: "Yes, comfortably" },
      { id: "stretched", label: "Mostly, but it's a stretch" },
      { id: "falling_behind", label: "No, we regularly fall behind" },
    ],
    required: true,
    visibleWhen: (answers) => answers.primary_customer_channel === "whatsapp_only",
  },

  // ── Section 5 — Qualification signals (internal use only) ─────────────
  {
    id: "urgency",
    sectionId: "qualification",
    category: "qualification",
    prompt: "How soon would this business realistically act on fixing something like this?",
    options: [
      { id: "exploring", label: "Just exploring for now" },
      { id: "later_this_year", label: "Planning for later this year" },
      { id: "next_quarter", label: "Looking to act next quarter" },
      { id: "now", label: "Needs this now" },
    ],
    required: true,
  },
  {
    id: "decision_role",
    sectionId: "qualification",
    category: "qualification",
    prompt: "Is the person taking this audit the one who'd decide on new software or tools?",
    options: [
      { id: "decision_maker", label: "Yes, I make this decision" },
      { id: "influencer", label: "I influence it, but don't decide alone" },
      { id: "not_involved", label: "Someone else decides" },
    ],
    required: true,
  },
  {
    id: "budget_band",
    sectionId: "qualification",
    category: "qualification",
    prompt: "Do you have a rough budget in mind? (optional)",
    helpText: "This is optional — skip it if you'd rather not say.",
    options: [
      { id: "unsure", label: "Not sure yet" },
      { id: "under_500", label: "Under $500" },
      { id: "500_2000", label: "$500–$2,000" },
      { id: "over_2000", label: "$2,000+" },
    ],
    required: false,
  },
];

export const SECTIONS: Section[] = [
  {
    id: "context",
    title: "About the business",
    description: "A quick picture of what we're auditing.",
    questionIds: ["industry", "industry_other_detail", "employee_band", "branch_count", "sends_quotes", "holds_physical_stock"],
  },
  {
    id: "sales",
    title: "Sales & customer follow-up",
    description: "How quotes, leads, and follow-up actually happen.",
    questionIds: ["quote_method", "followup_tracking", "message_volume", "lost_quotes"],
  },
  {
    id: "inventory",
    title: "Inventory & stock visibility",
    description: "How stock is tracked across the business.",
    questionIds: ["stock_tracking", "cross_branch_visibility"],
    visibleWhen: inventorySectionVisible,
  },
  {
    id: "reporting",
    title: "Reporting, approvals & systems",
    description: "How information moves between people and systems.",
    questionIds: ["reporting_method", "report_time", "approval_process", "systems_integration"],
  },
  {
    id: "people_delivery",
    title: "People & delivery",
    description: "How staff operations and project delivery are tracked.",
    questionIds: ["people_operations", "delivery_visibility"],
  },
  {
    id: "digital",
    title: "Digital presence & communication",
    description: "How the business shows up, and how customers reach it.",
    questionIds: ["website_status", "primary_customer_channel", "whatsapp_effectiveness"],
  },
  {
    id: "qualification",
    title: "A few final questions",
    description: "Helps us prioritise a useful reply — not part of the score.",
    questionIds: ["urgency", "decision_role", "budget_band"],
  },
];

const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((question) => [question.id, question]),
);

export const getQuestion = (id: string): Question | undefined => QUESTION_BY_ID[id];

/** Every question currently visible given the answers so far, in a fixed, stable order. */
export const getVisibleQuestions = (answers: Answers): Question[] => {
  const visible: Question[] = [];
  for (const section of SECTIONS) {
    if (section.visibleWhen && !section.visibleWhen(answers)) continue;
    for (const questionId of section.questionIds) {
      const question = QUESTION_BY_ID[questionId];
      if (!question) continue;
      if (question.visibleWhen && !question.visibleWhen(answers)) continue;
      visible.push(question);
    }
  }
  return visible;
};

export const getVisibleSections = (answers: Answers): Section[] =>
  SECTIONS.filter((section) => !section.visibleWhen || section.visibleWhen(answers));

/** All required, currently-visible questions have an answer. */
export const isAuditComplete = (answers: Answers): boolean =>
  getVisibleQuestions(answers).every((question) => !question.required || Boolean(answers[question.id]));

/** The next unanswered, currently-visible, required-or-optional question — or null when done. */
export const getNextQuestion = (answers: Answers): Question | null => {
  const visible = getVisibleQuestions(answers);
  return visible.find((question) => !answers[question.id]) ?? null;
};
