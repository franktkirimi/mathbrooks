export function getFormspreeId(): string {
  return import.meta.env.VITE_FORMSPREE_ID?.trim() ?? "";
}

export function hasFormspreeConfig(): boolean {
  return getFormspreeId().length > 0;
}

export interface AuditFormspreePayloadInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  efficiencyScore: number | null;
  frictionBand: string | null;
  leadScore: number;
  leadTier: string;
  topOpportunities: string[];
  recommendedProducts: string[];
  commercialPotential: string;
  complexityEstimate: string;
  nextAction: string;
}

/**
 * Builds the Formspree payload for a completed audit. Deliberately has no
 * numeric deal-value field — commercial potential is reported qualitatively
 * until MathBrooks has standardised packages/pricing (approved plan §12, §18).
 *
 * P2 calibration fix (FA-7): includes the raw internal lead_score alongside
 * the tier. V1 has no internal dashboard — this Formspree email *is* the lead
 * view — so a numeric score is the only way a salesperson can tell a strong
 * Warm lead from a weak one without a dashboard to sort by. The tier itself
 * and its thresholds are unchanged; this only makes the number already behind
 * the tier visible where the lead is actually read.
 */
export function buildAuditFormspreePayload(input: AuditFormspreePayloadInput) {
  return {
    _subject: `[${input.leadTier.toUpperCase()} ${input.leadScore} · eff ${input.efficiencyScore ?? "—"}] ${input.company} — AI Business Audit`,
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    efficiency_score: input.efficiencyScore,
    friction_band: input.frictionBand,
    lead_score: input.leadScore,
    lead_tier: input.leadTier,
    top_opportunities: input.topOpportunities,
    recommended_products: input.recommendedProducts,
    commercial_potential: input.commercialPotential,
    complexity_estimate: input.complexityEstimate,
    next_action: input.nextAction,
  };
}
