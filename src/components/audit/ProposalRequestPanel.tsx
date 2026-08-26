import { useEffect, useState, type FormEvent } from "react";
import { AlertCircle, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Opportunity } from "@/lib/audit/engine";
import type { SessionContact } from "@/lib/audit/session";
import type { AttributionData } from "@/lib/audit/attribution";
import type { AIReport } from "@/lib/audit/aiReport";
import {
  buildProposalFormspreePayload,
  getFormspreeId,
  hasFormspreeConfig,
  type ProposalCategoryScore,
} from "@/lib/forms";
import { contactCaptureSchema, proposalRequestSchema } from "@/lib/audit/schema";
import { trackAuditEvent } from "@/lib/audit/analytics";
import { aiStatusOf } from "@/lib/audit/aiReport";
import { cn } from "@/lib/utils";

/** Everything the payload needs beyond the opportunity checklist and contact — precomputed by the caller. */
export interface ProposalContext {
  industry: string | null;
  employeeBand: string | null;
  branchCount: string | null;
  efficiencyScore: number | null;
  frictionBand: string | null;
  categoryScores: ProposalCategoryScore[];
  leadScore: number;
  leadTier: string;
  needsNurture: boolean;
  urgency: string | null;
  authority: string | null;
  budgetBand: string | null;
  answersSummary: string;
  attribution: AttributionData;
  sessionId: string;
  auditReference: string;
  /** Phase 1.5 — present only when the AI narrative was successfully generated for this audit. */
  aiReport?: AIReport | null;
}

interface ProposalRequestPanelProps {
  opportunities: Opportunity[];
  contact: SessionContact | null;
  context: ProposalContext;
  onSubmitted: () => void;
}

type FormStatus = "idle" | "submitting" | "error";

const ProposalRequestPanel = ({ opportunities, contact, context, onSubmitted }: ProposalRequestPanelProps) => {
  // Preselect the highest-priority findings — the ones already flagged
  // high-severity — so the visitor usually just has to confirm, not build
  // the list from scratch (production handoff milestone §4).
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(opportunities.filter((o) => o.severity === "high").map((o) => o.id)),
  );
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);

  // Only asked when contact details are genuinely unavailable (§5 edge case) —
  // by construction this panel only ever renders after contact capture, so in
  // the normal path these stay unused and nothing is re-asked.
  const [fallbackName, setFallbackName] = useState("");
  const [fallbackEmail, setFallbackEmail] = useState("");
  const [fallbackPhone, setFallbackPhone] = useState("");
  const [fallbackCompany, setFallbackCompany] = useState("");

  useEffect(() => {
    trackAuditEvent("proposal_form_viewed", {
      session_reference: context.auditReference,
      friction_band: context.frictionBand,
      opportunity_count: opportunities.length,
      ai_status: aiStatusOf(context.aiReport),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOpportunity = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      const willSelect = !next.has(id);
      if (willSelect) next.add(id);
      else next.delete(id);
      trackAuditEvent("proposal_opportunity_selected", {
        opportunity: id,
        selected: willSelect,
        session_reference: context.auditReference,
      });
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;
    setFieldError(null);

    if (honeypot.trim().length > 0) {
      onSubmitted();
      return;
    }

    const selectedOpportunities = opportunities.filter((o) => selected.has(o.id));
    const parsedSelection = proposalRequestSchema.safeParse({
      selectedOpportunityIds: Array.from(selected),
      note: note.trim() || undefined,
    });
    if (!parsedSelection.success) {
      setFieldError(parsedSelection.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    let resolvedContact = contact;
    if (!resolvedContact) {
      const parsedContact = contactCaptureSchema.safeParse({
        name: fallbackName,
        email: fallbackEmail,
        phone: fallbackPhone,
        company: fallbackCompany,
      });
      if (!parsedContact.success) {
        setFieldError(parsedContact.error.issues[0]?.message ?? "Please check your contact details and try again.");
        return;
      }
      resolvedContact = parsedContact.data as SessionContact;
    }

    if (!hasFormspreeConfig()) {
      onSubmitted();
      return;
    }

    setStatus("submitting");
    try {
      const aiRecommendations = selectedOpportunities
        .map((o) => context.aiReport?.findings.find((f) => f.opportunityId === o.id)?.recommendation)
        .filter((value): value is string => Boolean(value));

      const payload = buildProposalFormspreePayload({
        ...resolvedContact,
        ...context,
        allOpportunities: opportunities.map((o) => ({ title: o.title, severity: o.severity, product: o.mathBrooksSolution.label })),
        selectedOpportunityTitles: selectedOpportunities.map((o) => o.title),
        selectedProducts: Array.from(new Set(selectedOpportunities.map((o) => o.mathBrooksSolution.label))),
        customerNote: note.trim() || null,
        aiExecutiveSummary: context.aiReport?.executiveSummary ?? null,
        aiRecommendations,
      });

      const response = await fetch(`https://formspree.io/f/${getFormspreeId()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        trackAuditEvent("proposal_requested", {
          session_reference: context.auditReference,
          industry: context.industry,
          employee_band: context.employeeBand,
          friction_band: context.frictionBand,
          opportunity_count: opportunities.length,
          selected_count: selectedOpportunities.length,
          utm_campaign: context.attribution.utmCampaign,
          utm_source: context.attribution.utmSource,
          // Non-blocking AI UX milestone §13: lets us tell whether visitors
          // actually wait for the AI enhancement before converting, or
          // convert on the deterministic report alone.
          ai_status: aiStatusOf(context.aiReport),
        });
        onSubmitted();
      } else {
        setStatus("error");
        trackAuditEvent("proposal_submission_failed", { session_reference: context.auditReference, status: response.status });
      }
    } catch {
      setStatus("error");
      trackAuditEvent("proposal_submission_failed", { session_reference: context.auditReference, status: null });
    }
  };

  return (
    <div>
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[#71d7d5]">Implementation proposal</p>
      <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-white">
        What would you like MathBrooks to help with?
      </h3>
      <p className="mt-2 text-sm leading-6 text-white/70">
        We'll use your audit findings to prepare the right next step. You won't need to explain everything again.
      </p>

      {status === "error" ? (
        <div className="mt-5 flex items-start gap-3 rounded-md border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm leading-6 text-red-200" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          We couldn't send that — please try again, or use WhatsApp instead.
        </div>
      ) : null}
      {fieldError ? (
        <div className="mt-5 flex items-start gap-3 rounded-md border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm leading-6 text-red-200" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {fieldError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <input
          type="text"
          name="_gotcha"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <div className="grid gap-3">
          {opportunities.map((opportunity) => {
            const isSelected = selected.has(opportunity.id);
            return (
              <button
                key={opportunity.id}
                type="button"
                onClick={() => toggleOpportunity(opportunity.id)}
                aria-pressed={isSelected}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors duration-200",
                  isSelected
                    ? "border-white bg-white/10 text-white"
                    : "border-white/25 bg-transparent text-white/80 hover:border-white/50",
                )}
              >
                <span>{opportunity.title}</span>
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                    isSelected ? "border-white bg-white text-black" : "border-white/40",
                  )}
                  aria-hidden="true"
                >
                  {isSelected ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
              </button>
            );
          })}
        </div>

        {!contact ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="proposal-name" className="text-white/80">
                Name
              </Label>
              <Input id="proposal-name" value={fallbackName} onChange={(e) => setFallbackName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposal-email" className="text-white/80">
                Email
              </Label>
              <Input id="proposal-email" type="email" value={fallbackEmail} onChange={(e) => setFallbackEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposal-phone" className="text-white/80">
                WhatsApp or phone
              </Label>
              <Input id="proposal-phone" value={fallbackPhone} onChange={(e) => setFallbackPhone(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposal-company" className="text-white/80">
                Company
              </Label>
              <Input id="proposal-company" value={fallbackCompany} onChange={(e) => setFallbackCompany(e.target.value)} required />
            </div>
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="proposal-note" className="text-white/80">
            Anything else you'd like us to know? <span className="text-white/50">(optional)</span>
          </Label>
          <Textarea
            id="proposal-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={1000}
            placeholder="e.g. timeline, specific priorities…"
            className="border-white/25 bg-white/5 text-white placeholder:text-white/40"
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
          <Send className="h-4 w-4" />
          {status === "submitting" ? "Sending…" : "Request Implementation Proposal"}
        </Button>
      </form>
    </div>
  );
};

export default ProposalRequestPanel;
