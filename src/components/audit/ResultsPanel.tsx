import { MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { AuditResult, Opportunity } from "@/lib/audit/engine";
import { WHATSAPP_NUMBER } from "@/lib/audit/config";
import { trackAuditEvent } from "@/lib/audit/analytics";
import { cn } from "@/lib/utils";

const SEVERITY_LABEL: Record<Opportunity["severity"], string> = { high: "High impact", medium: "Medium impact" };
const SEVERITY_CLASS: Record<Opportunity["severity"], string> = {
  high: "border-[#f3c9c7] text-[#b3261e]",
  medium: "border-[#f0dcae] text-[#8a5a00]",
};

const OpportunityCard = ({ opportunity, companyName }: { opportunity: Opportunity; companyName?: string }) => (
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

    <Link
      to={opportunity.mathBrooksSolution.href}
      onClick={() => trackAuditEvent("recommendation_clicked", { opportunity: opportunity.id, product: opportunity.mathBrooksSolution.label })}
      className="mt-5 flex items-center justify-center gap-2 border-t border-black/10 pt-4 text-center font-display text-sm font-semibold text-primary hover:text-primary/80"
    >
      MathBrooks can build this — {opportunity.mathBrooksSolution.label} <span aria-hidden="true">→</span>
    </Link>
  </div>
);

const whatsAppHref = (score: number | null) => {
  const text = encodeURIComponent(
    `Hi MathBrooks, I just ran the free AI Business Audit${score !== null ? ` (score: ${score}/100)` : ""}. I'd like to talk through the results.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

interface ResultsPanelProps {
  mode: "preview" | "full";
  result: AuditResult;
  previewCount: number;
  companyName?: string;
  onUnlock?: () => void;
  onProposalClick?: () => void;
}

const ResultsPanel = ({ mode, result, previewCount, companyName, onUnlock, onProposalClick }: ResultsPanelProps) => {
  const { efficiency, opportunities } = result;
  const visibleOpportunities = mode === "preview" ? opportunities.slice(0, previewCount) : opportunities;
  const hiddenCount = mode === "preview" ? Math.max(0, opportunities.length - previewCount) : 0;

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
      </div>

      <div className="mt-8 space-y-5">
        {visibleOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} companyName={companyName} />
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
      ) : (
        <div className="mt-10 rounded-2xl border border-black/12 bg-black p-7 text-white sm:p-9">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[#71d7d5]">Next step</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em]">
            Talk this through with MathBrooks.
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
            {result.commercial.likelyScope.length > 0
              ? `Likely scope: ${result.commercial.likelyScope.join(", ")}`
              : "We'll help you prioritise where to start."}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsAppHref(efficiency.score)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackAuditEvent("whatsapp_clicked", {
                  source: "audit_results",
                  friction_band: efficiency.band,
                  lead_tier: result.leadScore.tier,
                })
              }
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-400"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Continue on WhatsApp
            </a>
            <Link
              to="/contact"
              onClick={() => {
                trackAuditEvent("proposal_requested", {
                  source: "audit_results",
                  friction_band: efficiency.band,
                  lead_tier: result.leadScore.tier,
                });
                onProposalClick?.();
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Send className="h-4 w-4" aria-hidden="true" /> Request a proposal
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
