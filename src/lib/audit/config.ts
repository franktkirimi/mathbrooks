/**
 * Experiment configuration for the audit's contact-capture gate (approved
 * plan §17). Changing `previewOpportunityCount` is the entire mechanism for
 * switching between Variant A and Variant B — no other file needs to change.
 *
 *  - Variant A (default): show the score + 1 finding before the gate.
 *  - Variant B: show the score + the top 3 findings before the gate.
 */
export type ContactGateVariant = "A" | "B";

export const CONTACT_GATE_VARIANT: ContactGateVariant = "A";

export const PREVIEW_OPPORTUNITY_COUNT: Record<ContactGateVariant, number> = {
  A: 1,
  B: 3,
};

export const previewOpportunityCount = PREVIEW_OPPORTUNITY_COUNT[CONTACT_GATE_VARIANT];

/** Inactivity timeout before a started-but-unfinished session is treated as abandoned for analytics. */
export const ABANDON_TIMEOUT_MS = 15 * 60 * 1000;

export const WHATSAPP_NUMBER = "263719592326";
