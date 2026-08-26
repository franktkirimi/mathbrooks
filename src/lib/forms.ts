import type { AttributionData } from "@/lib/audit/attribution";

export function getFormspreeId(): string {
  return import.meta.env.VITE_FORMSPREE_ID?.trim() ?? "";
}

export function hasFormspreeConfig(): boolean {
  return getFormspreeId().length > 0;
}

export interface AuditFormspreeOpportunity {
  title: string;
  severity: string;
  product: string;
}

const FRICTION_BAND_LABEL: Record<string, string> = {
  high: "High Friction",
  moderate: "Moderate Friction",
  strong: "Strong Foundation",
};

const AUTHORITY_LABEL: Record<string, string> = {
  decision_maker: "Decision maker",
  influencer: "Influencer (not sole decider)",
  not_involved: "Not involved in the decision",
};

export interface AuditFormspreePayloadInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string | null;
  employeeBand: string | null;
  branchCount: string | null;
  efficiencyScore: number | null;
  frictionBand: string | null;
  leadScore: number;
  leadTier: string;
  needsNurture: boolean;
  opportunities: AuditFormspreeOpportunity[];
  recommendedProducts: string[];
  urgency: string | null;
  authority: string | null;
  budgetBand: string | null;
  nextAction: string;
  attribution: AttributionData;
  sessionId: string;
  auditReference: string;
}

/**
 * Builds a compact, immediately-scannable text block for the top of the lead
 * email — V1 has no CRM/dashboard, so this email *is* the sales interface
 * (approved production-readiness plan §2). Deliberately plain text, not HTML:
 * Formspree renders every submitted field as a row in its own notification
 * email, so this single multi-line field is the one place we control layout.
 */
function buildLeadSummary(input: AuditFormspreePayloadInput): string {
  const lines: string[] = [];
  lines.push(`[${input.leadTier.toUpperCase()} · ${input.leadScore}] ${input.company}`);
  lines.push("");
  lines.push(
    `Digital Efficiency: ${input.efficiencyScore ?? "—"}/100 — ${
      input.frictionBand ? (FRICTION_BAND_LABEL[input.frictionBand] ?? input.frictionBand) : "—"
    }`,
  );
  if (input.employeeBand) lines.push(`${input.employeeBand} employees${input.branchCount ? ` · ${input.branchCount} branches` : ""}`);
  if (input.industry) lines.push(input.industry);

  if (input.opportunities.length > 0) {
    lines.push("");
    lines.push("Top opportunities:");
    input.opportunities.forEach((o, i) => {
      lines.push(`${i + 1}. ${o.title} — ${o.severity.toUpperCase()}`);
    });
  }

  if (input.recommendedProducts.length > 0) {
    lines.push("");
    lines.push("Likely scope:");
    lines.push(input.recommendedProducts.join(" · "));
  }

  lines.push("");
  lines.push("Urgency:");
  lines.push(input.urgency ?? "Not answered");

  lines.push("");
  lines.push("Authority:");
  lines.push(input.authority ? (AUTHORITY_LABEL[input.authority] ?? input.authority) : "Not answered");

  if (input.budgetBand) {
    lines.push("");
    lines.push("Budget signal:");
    lines.push(input.budgetBand);
  }

  if (input.needsNurture) {
    lines.push("");
    lines.push("⚠ Score qualifies as Hot, but urgency/authority signals are weak — verify fit before prioritising outreach.");
  }

  lines.push("");
  lines.push("Recommended action:");
  lines.push(input.nextAction);

  return lines.join("\n");
}

/**
 * Builds the Formspree payload for a completed audit. Deliberately has no
 * numeric deal-value field — commercial potential is reported qualitatively
 * until MathBrooks has standardised packages/pricing (approved plan §12, §18).
 *
 * This is an internal sales payload only — none of these fields (lead_score,
 * lead_tier, needs_nurture, severities) are ever rendered to the visitor; see
 * ResultsPanel.tsx, which shows only the customer-facing efficiency score and
 * opportunity descriptions.
 */
export function buildAuditFormspreePayload(input: AuditFormspreePayloadInput) {
  return {
    _subject: `[${input.leadTier.toUpperCase()} · ${input.leadScore}] ${input.company} — AI Business Audit`,
    summary: buildLeadSummary(input),
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    industry: input.industry,
    employee_band: input.employeeBand,
    branch_count: input.branchCount,
    efficiency_score: input.efficiencyScore,
    friction_band: input.frictionBand,
    lead_score: input.leadScore,
    lead_tier: input.leadTier,
    needs_nurture: input.needsNurture,
    top_opportunities: input.opportunities.map((o) => `${o.title} (${o.severity})`),
    recommended_products: input.recommendedProducts,
    urgency: input.urgency,
    authority: input.authority,
    budget_band: input.budgetBand,
    next_action: input.nextAction,
    session_id: input.sessionId,
    utm_source: input.attribution.utmSource,
    utm_medium: input.attribution.utmMedium,
    utm_campaign: input.attribution.utmCampaign,
    utm_content: input.attribution.utmContent,
    utm_term: input.attribution.utmTerm,
    referrer: input.attribution.referrer,
    landing_page: input.attribution.landingPage,
    audit_reference: input.auditReference,
    // Distinguishes this from a later proposal request submitted against the
    // same audit — conceptually AuditSession -> Lead -> ProposalRequest,
    // even without a database (production handoff milestone §8).
    submission_type: "audit_lead",
    // Honeypot — real visitors never see or fill this field (see ContactCaptureForm).
    // Formspree recognises `_gotcha` as its own spam-trap field name.
    _gotcha: "",
  };
}

// ─── Implementation proposal request (audit -> proposal handoff) ─────────

export interface ProposalCategoryScore {
  label: string;
  score: number;
}

export interface ProposalFormspreePayloadInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string | null;
  employeeBand: string | null;
  branchCount: string | null;
  efficiencyScore: number | null;
  frictionBand: string | null;
  categoryScores: ProposalCategoryScore[];
  leadScore: number;
  leadTier: string;
  needsNurture: boolean;
  /** Every opportunity the audit identified — not just the ones the customer selected. */
  allOpportunities: AuditFormspreeOpportunity[];
  /** Titles of just the opportunities the customer chose to request a proposal for. */
  selectedOpportunityTitles: string[];
  selectedProducts: string[];
  urgency: string | null;
  authority: string | null;
  budgetBand: string | null;
  customerNote: string | null;
  answersSummary: string;
  attribution: AttributionData;
  sessionId: string;
  auditReference: string;
  /**
   * Phase 1.5 — optional, validated AI-generated narrative, included purely
   * as reference context for whoever prepares the proposal. Deterministic
   * fields above (efficiency score, opportunities, severity, lead data)
   * remain the authoritative source of truth regardless of whether this is
   * present; the summary section below labels this clearly as AI-generated
   * so it's never mistaken for an audit finding.
   */
  aiExecutiveSummary?: string | null;
  aiRecommendations?: string[];
}

/**
 * Scannable summary for the proposal-request email, matching the format
 * agreed for this milestone: identity + score up top, what the customer
 * actually asked for front and center (distinct from everything the audit
 * merely *found*), then the same qualification context already in the
 * original lead email so a salesperson never has to cross-reference two
 * emails to have the full picture.
 */
function buildProposalSummary(input: ProposalFormspreePayloadInput): string {
  const lines: string[] = [];
  lines.push(`${input.company} — Implementation Proposal Request`);
  lines.push("");
  lines.push("Digital Efficiency");
  lines.push(
    `${input.efficiencyScore ?? "—"}/100 — ${
      input.frictionBand ? (FRICTION_BAND_LABEL[input.frictionBand] ?? input.frictionBand) : "—"
    }`,
  );

  lines.push("");
  lines.push("Organization");
  if (input.industry) lines.push(input.industry);
  if (input.employeeBand) lines.push(`${input.employeeBand} employees`);
  if (input.branchCount) lines.push(`${input.branchCount} branches`);

  if (input.selectedOpportunityTitles.length > 0) {
    lines.push("");
    lines.push("Customer selected");
    input.selectedOpportunityTitles.forEach((title, i) => lines.push(`${i + 1}. ${title}`));
  }

  if (input.allOpportunities.length > 0) {
    lines.push("");
    lines.push("Audit findings");
    input.allOpportunities.forEach((o) => lines.push(`- ${o.title} (${o.severity})`));
  }

  if (input.selectedProducts.length > 0) {
    lines.push("");
    lines.push("Likely MathBrooks scope");
    input.selectedProducts.forEach((p) => lines.push(`- ${p}`));
  }

  lines.push("");
  lines.push("Urgency");
  lines.push(input.urgency ?? "Not answered");

  lines.push("");
  lines.push("Authority");
  lines.push(input.authority ? (AUTHORITY_LABEL[input.authority] ?? input.authority) : "Not answered");

  if (input.budgetBand) {
    lines.push("");
    lines.push("Budget signal");
    lines.push(input.budgetBand);
  }

  lines.push("");
  lines.push("Lead");
  lines.push(`${input.leadTier.toUpperCase()} · ${input.leadScore}`);
  if (input.needsNurture) {
    lines.push("⚠ Qualifies as Hot, but urgency/authority signals are weak — verify fit before prioritising outreach.");
  }

  if (input.customerNote) {
    lines.push("");
    lines.push("Customer note");
    lines.push(`"${input.customerNote}"`);
  }

  if (input.aiExecutiveSummary) {
    lines.push("");
    lines.push("AI-generated analysis (reference only, not an audit finding)");
    lines.push(input.aiExecutiveSummary);
  }

  if (input.aiRecommendations && input.aiRecommendations.length > 0) {
    lines.push("");
    lines.push("AI-generated recommendations for the selected items (reference only)");
    input.aiRecommendations.forEach((r) => lines.push(`- ${r}`));
  }

  lines.push("");
  lines.push("Audit reference");
  lines.push(`${input.auditReference} / ${input.sessionId}`);

  lines.push("");
  lines.push("Recommended sales action");
  lines.push("Prepare/discuss implementation proposal.");

  return lines.join("\n");
}

/**
 * Builds the Formspree payload for a proposal request — a distinct
 * conversion event from the original audit lead (§8), always carrying the
 * complete accumulated audit context (§6) so nothing the visitor already
 * told MathBrooks has to be asked again. Internal-only fields here
 * (lead_score, lead_tier, needs_nurture) are never rendered anywhere in the
 * visitor-facing UI — see ResultsPanel.tsx / ProposalRequestPanel.tsx.
 */
export function buildProposalFormspreePayload(input: ProposalFormspreePayloadInput) {
  return {
    _subject: `[PROPOSAL REQUEST · ${input.leadTier.toUpperCase()} · ${input.leadScore}] ${input.company} — Implementation Proposal Request`,
    summary: buildProposalSummary(input),
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    industry: input.industry,
    employee_band: input.employeeBand,
    branch_count: input.branchCount,
    efficiency_score: input.efficiencyScore,
    friction_band: input.frictionBand,
    category_scores: input.categoryScores.map((c) => `${c.label}: ${c.score}`).join(", "),
    lead_score: input.leadScore,
    lead_tier: input.leadTier,
    needs_nurture: input.needsNurture,
    opportunities_identified: input.allOpportunities.map((o) => `${o.title} (${o.severity})`),
    opportunities_selected: input.selectedOpportunityTitles,
    likely_scope_selected: input.selectedProducts,
    urgency: input.urgency,
    authority: input.authority,
    budget_band: input.budgetBand,
    customer_note: input.customerNote,
    full_audit_answers: input.answersSummary,
    session_id: input.sessionId,
    audit_reference: input.auditReference,
    ai_executive_summary: input.aiExecutiveSummary ?? null,
    ai_recommendations: input.aiRecommendations ?? [],
    submission_type: "proposal_request",
    utm_source: input.attribution.utmSource,
    utm_medium: input.attribution.utmMedium,
    utm_campaign: input.attribution.utmCampaign,
    utm_content: input.attribution.utmContent,
    utm_term: input.attribution.utmTerm,
    referrer: input.attribution.referrer,
    landing_page: input.attribution.landingPage,
    _gotcha: "",
  };
}

// ─── Contextual WhatsApp handoff (audit results, not the site-wide generic CTA) ──

export interface AuditWhatsAppMessageInput {
  company: string | null;
  efficiencyScore: number | null;
  frictionBand: string | null;
  opportunityTitles: string[];
  auditReference: string;
}

/**
 * A concise, customer-safe prefilled WhatsApp message carrying just enough
 * audit context to skip re-explaining the business — never the internal
 * lead score/tier, budget, or authority signal (§9). Capped to the
 * organization's top few opportunities so the message stays short.
 */
export function buildAuditWhatsAppMessage(input: AuditWhatsAppMessageInput): string {
  const lines: string[] = [];
  const who = input.company ? ` for ${input.company}` : "";
  lines.push(`Hi MathBrooks. I just completed the Business Efficiency Audit${who}.`);
  if (input.efficiencyScore !== null) {
    lines.push(
      `Score: ${input.efficiencyScore}/100${
        input.frictionBand ? ` — ${FRICTION_BAND_LABEL[input.frictionBand] ?? input.frictionBand}` : ""
      }.`,
    );
  }
  if (input.opportunityTitles.length > 0) {
    lines.push("I'd like help with:");
    input.opportunityTitles.slice(0, 3).forEach((title) => lines.push(`• ${title}`));
  }
  lines.push(`Audit reference: ${input.auditReference}`);
  return lines.join("\n");
}
