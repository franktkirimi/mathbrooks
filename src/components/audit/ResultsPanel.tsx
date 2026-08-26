import { useEffect, useRef, useState } from "react";
import { CheckCircle2, MessageCircle, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { AuditResult, Opportunity } from "@/lib/audit/engine";
import { WHATSAPP_NUMBER } from "@/lib/audit/config";
import { trackAuditEvent } from "@/lib/audit/analytics";
import { buildAuditWhatsAppMessage } from "@/lib/forms";
import type { SessionContact } from "@/lib/audit/session";
import { aiStatusOf, type AIFinding, type AiReportStatus } from "@/lib/audit/aiReport";
import { cn } from "@/lib/utils";
import ProposalRequestPanel, { type ProposalContext } from "./ProposalRequestPanel";

const SEVERITY_LABEL: Record<Opportunity["severity"], string> = { high: "High impact", medium: "Medium impact" };
const SEVERITY_CLASS: Record<Opportunity["severity"], string> = {
  high: "border-[#f3c9c7] text-[#b3261e]",
  medium: "border-[#f0dcae] text-[#8a5a00]",
};

const LOADING_STAGES = ["Reviewing your operational findings…", "Preparing contextual recommendations…"];
const LOADING_STAGE_2_DELAY_MS = 6000;

/**
 * Non-blocking AI UX milestone: a single, one-way progression through two
 * restrained messages — never a repeating carousel, which would imply steps
 * that aren't actually occurring. This sits inline alongside the (already
 * fully rendered and usable) deterministic report; it never covers content,
 * disables scrolling, or blocks any CTA.
 */
const AiLoadingIndicator = () => {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const id = window.setTimeout(() => setStage(1), LOADING_STAGE_2_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="mt-8 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-black/60">
      <Sparkles className="h-4 w-4 shrink-0 animate-pulse text-primary" aria-hidden="true" />
      {LOADING_STAGES[stage]}
    </div>
  );
};

const OpportunityCard = ({
  opportunity,
  companyName,
  aiFinding,
}: {
  opportunity: Opportunity;
  companyName?: string;
  aiFinding?: AIFinding;
}) => (
  <div className="rounded-2xl border border-black/12 bg-white p-6">
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em]",
          SEVERITY_CLASS[opportunity.severity],
        )}
      >
        {SEVERITY_LABEL[opportunity.severity]}
      </span>
      <h3 className="font-display text-lg font-semibold text-black">{opportunity.title}</h3>
    </div>

    {/* Deterministic layers — always the same regardless of AI state; never
        replaced by AI content, only ever supplemented below (§6). */}
    <dl className="mt-5 space-y-5 text-sm leading-6 text-black/80">
      <div>
        <dt className="font-display text-base font-semibold text-black">What we found</dt>
        <dd className="mt-1.5">{opportunity.layers.found}</dd>
      </div>
      <div>
        <dt className="font-display text-base font-semibold text-black">Why it matters</dt>
        <dd className="mt-1.5">{opportunity.layers.whyItMatters}</dd>
      </div>
      <div>
        <dt className="font-display text-base font-semibold text-primary">What {companyName ?? "you"} could do</dt>
        <dd className="mt-1.5">{opportunity.layers.whatYouCouldDo}</dd>
      </div>
    </dl>

    {aiFinding ? (
      <div className="mt-5 animate-in fade-in-0 duration-500 rounded-xl border border-primary/20 bg-primary/5 p-5">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-primary">Deeper analysis for your organization</p>
        <p className="mt-2 text-sm leading-6 text-black/80">
          {aiFinding.whatWeFound} {aiFinding.whyItMatters}
        </p>
        <p className="mt-3 text-sm font-medium leading-6 text-black">{aiFinding.recommendation}</p>
        {aiFinding.mathbrooksHelp ? <p className="mt-3 text-sm leading-6 text-primary">{aiFinding.mathbrooksHelp}</p> : null}
      </div>
    ) : null}

    <Link
      to={opportunity.mathBrooksSolution.href}
      onClick={() => trackAuditEvent("recommendation_clicked", { opportunity: opportunity.id, product: opportunity.mathBrooksSolution.label })}
      className="mt-5 flex items-center justify-center gap-2 border-t border-black/10 pt-4 text-center font-display text-sm font-semibold text-primary hover:text-primary/80"
    >
      MathBrooks can build this — {opportunity.mathBrooksSolution.label} <span aria-hidden="true">→</span>
    </Link>
  </div>
);

interface ResultsPanelProps {
  mode: "preview" | "full";
  result: AuditResult;
  previewCount: number;
  companyName?: string;
  onUnlock?: () => void;
  /** Full-results proposal handoff — all optional so `mode="preview"` callers don't need them. */
  contact?: SessionContact | null;
  proposalContext?: ProposalContext;
  proposalRequested?: boolean;
  auditReference?: string;
  onProposalSubmitted?: () => void;
  /**
   * Non-blocking AI UX: `undefined` while the AI narrative is still loading
   * (or was never requested, e.g. `mode="preview"`), `null` once requested
   * and failed/unavailable (deterministic content is already the complete,
   * final report — this is never a loading state), an object once ready.
   * The deterministic report above never waits on any of these states.
   */
  aiReport?: AiReportStatus;
}

const ResultsPanel = ({
  mode,
  result,
  previewCount,
  companyName,
  onUnlock,
  contact,
  proposalContext,
  proposalRequested,
  auditReference,
  onProposalSubmitted,
  aiReport,
}: ResultsPanelProps) => {
  const { efficiency, opportunities } = result;
  const visibleOpportunities = mode === "preview" ? opportunities.slice(0, previewCount) : opportunities;
  const hiddenCount = mode === "preview" ? Math.max(0, opportunities.length - previewCount) : 0;
  const [showProposalForm, setShowProposalForm] = useState(false);
  const isAiLoading = mode === "full" && aiReport === undefined && opportunities.length > 0;
  const firedFallbackNotice = useRef(false);

  useEffect(() => {
    if (mode === "full" && aiReport === null && !firedFallbackNotice.current) {
      firedFallbackNotice.current = true;
      trackAuditEvent("ai_analysis_fallback_used", { session_reference: auditReference ?? null, friction_band: efficiency.band });
    }
  }, [mode, aiReport, auditReference, efficiency.band]);

  const findingById = (id: string): AIFinding | undefined => aiReport?.findings.find((f) => f.opportunityId === id);

  const whatsAppHref = () => {
    const text = buildAuditWhatsAppMessage({
      company: companyName ?? null,
      efficiencyScore: efficiency.score,
      frictionBand: efficiency.band,
      opportunityTitles: opportunities.map((o) => o.title),
      auditReference: auditReference ?? "",
    });
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div>
      <div className="rounded-3xl border border-black/12 bg-white p-8 sm:p-10">
        <p className="font-display text-xl font-semibold text-primary">Digital Efficiency Score</p>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-display text-6xl font-semibold tracking-[-0.03em] text-black">{efficiency.score ?? "—"}</span>
          <span className="font-display text-2xl text-black/40">/100</span>
        </div>
        <p className="mt-2 text-lg font-medium text-black">{efficiency.bandLabel}</p>

        {mode === "full" ? (
          <div className="mt-8 border-t border-black/10 pt-6">
            <p className="font-display text-base font-semibold text-black">Score by category</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {efficiency.categoryScores
                .filter((c) => c.applicable)
                .map((c) => (
                  <div key={c.category} className="flex items-center justify-between gap-3 border-b border-black/8 pb-2">
                    <span className="text-sm text-black/70">{c.label}</span>
                    <span className="font-mono text-sm font-semibold text-black">{c.score}</span>
                  </div>
                ))}
            </div>
          </div>
        ) : null}

        {mode === "full" && aiReport?.executiveSummary ? (
          <div className="mt-8 animate-in fade-in-0 duration-500 border-t border-black/10 pt-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-primary">AI Business Analysis</p>
            <p className="mt-1 text-xs text-black/50">Prepared for your organization</p>
            <p className="mt-3 text-sm leading-6 text-black/75">{aiReport.executiveSummary}</p>
          </div>
        ) : null}

        {isAiLoading ? <AiLoadingIndicator /> : null}
      </div>

      {mode === "full" && aiReport && aiReport.priorities.length > 0 ? (
        <div className="mt-8 animate-in fade-in-0 duration-500 rounded-2xl border border-black/12 bg-white p-6">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-primary">From the deeper analysis</p>
          <p className="mt-2 font-display text-base font-semibold text-black">Where to start</p>
          <ol className="mt-4 space-y-4">
            {aiReport.priorities.map((priority, index) => {
              const opportunity = opportunities.find((o) => o.id === priority.opportunityId);
              if (!opportunity) return null;
              return (
                <li key={priority.opportunityId} className="flex gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                    {index === 0 ? "Start here" : "Next"}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-black">{opportunity.title}</p>
                    <p className="mt-1 text-sm leading-6 text-black/70">{priority.rationale}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}

      <div className="mt-8 space-y-5">
        {visibleOpportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            companyName={companyName}
            aiFinding={findingById(opportunity.id)}
          />
        ))}
      </div>

      {mode === "preview" ? (
        <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/5 p-7 text-center">
          <p className="font-display text-lg font-semibold text-black">
            {hiddenCount > 0
              ? `${hiddenCount} more ${hiddenCount === 1 ? "opportunity" : "opportunities"} in your full audit`
              : "Your full audit is ready"}
          </p>
          <p className="mt-2 text-sm text-black/70">Unlock the complete breakdown and MathBrooks' recommendations.</p>
          <Button size="lg" className="mt-5" onClick={onUnlock}>
            Unlock my full audit
          </Button>
        </div>
      ) : proposalRequested ? (
        <div className="mt-10 rounded-2xl border border-black/12 bg-black p-7 text-center text-white sm:p-9">
          <CheckCircle2 className="mx-auto h-8 w-8 text-[#71d7d5]" aria-hidden="true" />
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em]">Proposal requested</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/70">
            MathBrooks already has your audit findings. We'll use them as the starting point for the conversation.
          </p>
        </div>
      ) : showProposalForm && proposalContext ? (
        <div className="mt-10 rounded-2xl border border-black/12 bg-black p-7 text-white sm:p-9">
          <ProposalRequestPanel
            opportunities={opportunities}
            contact={contact ?? null}
            context={proposalContext}
            onSubmitted={() => onProposalSubmitted?.()}
          />
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-black/12 bg-black p-7 text-white sm:p-9">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[#71d7d5]">Next step</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em]">
            Talk this through with MathBrooks.
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
            {aiReport?.closingSummary ??
              (result.commercial.likelyScope.length > 0
                ? `Likely scope: ${result.commercial.likelyScope.join(", ")}`
                : "We'll help you prioritise where to start.")}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackAuditEvent("audit_whatsapp_clicked", {
                  source: "audit_results",
                  friction_band: efficiency.band,
                  session_reference: auditReference ?? null,
                })
              }
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-400"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Continue on WhatsApp
            </a>
            {opportunities.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  trackAuditEvent("proposal_cta_clicked", {
                    friction_band: efficiency.band,
                    lead_tier: result.leadScore.tier,
                    session_reference: auditReference ?? null,
                    ai_status: aiStatusOf(aiReport),
                  });
                  setShowProposalForm(true);
                }}
                disabled={!proposalContext}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden="true" /> Get an Implementation Proposal
              </button>
            ) : null}
          </div>
          {opportunities.length > 0 ? (
            <p className="mt-4 text-xs leading-5 text-white/50">
              We'll use your audit findings to prepare the right next step. You won't need to explain everything again.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
