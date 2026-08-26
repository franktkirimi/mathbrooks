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
    // Honeypot — real visitors never see or fill this field (see ContactCaptureForm).
    // Formspree recognises `_gotcha` as its own spam-trap field name.
    _gotcha: "",
  };
}
