import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNextQuestion, getVisibleQuestions, type Answers } from "@/lib/audit/questions";
import { runAudit } from "@/lib/audit/engine";
import { previewOpportunityCount } from "@/lib/audit/config";
import { trackAuditEvent } from "@/lib/audit/analytics";
import { clearSession, createSession, loadSession, saveSession, type AuditPhase, type AuditSessionState } from "@/lib/audit/session";
import { useAuditActive } from "./AuditActiveContext";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import ResultsPanel from "./ResultsPanel";
import ContactCaptureForm, { type CapturedContact } from "./ContactCaptureForm";

const SUPPRESS_WIDGET_PHASES: AuditPhase[] = ["intro", "diagnostic", "processing"];

const PROCESSING_DELAY_MS = 1400;

/**
 * Any saved, not-yet-completed session is resumed by landing back on the
 * intro screen with a "Continue my audit" option — never dropped straight
 * back into a mid-question state, so there's always a clear orientation
 * point. The answers themselves are preserved, so continuing picks up at
 * the exact next unanswered question.
 */
const readResumableSession = (): AuditSessionState | null => {
  const existing = loadSession();
  if (!existing || existing.completed) return null;
  if (Object.keys(existing.answers).length === 0) return null;
  return { ...existing, phase: "intro" };
};

const AuditFlow = () => {
  const { setActive } = useAuditActive();
  const [session, setSession] = useState<AuditSessionState>(() => readResumableSession() ?? createSession());
  const [resumedNotice, setResumedNotice] = useState(() => Object.keys(session.answers).length > 0);
  const [company, setCompany] = useState<string | undefined>(undefined);
  const firedMilestones = useRef<Set<25 | 50 | 75>>(new Set());

  // Fire the resume event exactly once, for whatever session we hydrated with above.
  useEffect(() => {
    if (resumedNotice) trackAuditEvent("audit_resumed", { phase: session.phase });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveSession(session);
  }, [session]);

  useEffect(() => {
    setActive(SUPPRESS_WIDGET_PHASES.includes(session.phase));
    return () => setActive(false);
  }, [session.phase, setActive]);

  const answers = session.answers;
  const visibleQuestions = useMemo(() => getVisibleQuestions(answers), [answers]);
  const answeredCount = useMemo(
    () => visibleQuestions.filter((q) => Boolean(answers[q.id])).length,
    [visibleQuestions, answers],
  );
  const currentQuestion = useMemo(() => getNextQuestion(answers), [answers]);
  const auditResult = useMemo(() => runAudit(answers), [answers]);

  const goToPhase = (phase: AuditPhase) => setSession((prev) => ({ ...prev, phase }));

  const maybeFireProgressMilestones = (nextAnswers: Answers) => {
    const total = getVisibleQuestions(nextAnswers).length;
    const answered = getVisibleQuestions(nextAnswers).filter((q) => Boolean(nextAnswers[q.id])).length;
    const percent = total > 0 ? (answered / total) * 100 : 0;
    for (const milestone of [25, 50, 75] as const) {
      if (percent >= milestone && !firedMilestones.current.has(milestone)) {
        firedMilestones.current.add(milestone);
        trackAuditEvent(`audit_${milestone}_percent`);
      }
    }
  };

  const handleStart = () => {
    trackAuditEvent("audit_started");
    goToPhase("diagnostic");
  };

  const applyAnswer = (questionId: string, sectionId: string, optionId: string) => {
    const nextAnswers: Answers = { ...answers, [questionId]: optionId };
    trackAuditEvent("audit_question_answered", { question: questionId, section: sectionId });

    const stillInSameSection = getNextQuestion(nextAnswers)?.sectionId === sectionId;
    if (!stillInSameSection) {
      trackAuditEvent("audit_section_completed", { section: sectionId });
    }

    maybeFireProgressMilestones(nextAnswers);

    // Every visible question — including the optional budget question — must have
    // been shown and either answered or explicitly skipped before the diagnostic
    // ends. isAuditComplete() alone would end the flow the moment the last
    // *required* question is answered, silently skipping the optional one.
    if (getNextQuestion(nextAnswers) === null) {
      trackAuditEvent("audit_completed");
      setSession((prev) => ({ ...prev, answers: nextAnswers, phase: "processing", completed: true }));
      window.setTimeout(() => {
        goToPhase("preview_results");
        trackAuditEvent("results_viewed", { mode: "preview" });
      }, PROCESSING_DELAY_MS);
      return;
    }

    setSession((prev) => ({ ...prev, answers: nextAnswers }));
  };

  const handleUnlock = () => {
    goToPhase("contact_capture");
    trackAuditEvent("contact_capture_viewed");
  };

  const handleContactSuccess = (contact: CapturedContact) => {
    setCompany(contact.company);
    trackAuditEvent("contact_captured");
    setSession((prev) => ({ ...prev, phase: "full_results", contactCaptured: true }));
    trackAuditEvent("results_viewed", { mode: "full" });
  };

  const handleContactDecline = () => {
    trackAuditEvent("contact_declined");
    goToPhase("preview_results");
  };

  const handleRestart = () => {
    clearSession();
    firedMilestones.current = new Set();
    setSession(createSession());
    setResumedNotice(false);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40">
      {session.phase === "intro" && (
        <div className="text-center">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">Free AI Business Audit</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] text-black sm:text-5xl">
            Find out what technology could simplify your business.
          </h1>
          <p className="mt-5 text-lg leading-8 text-black/70">
            A short, structured diagnostic — about 6 minutes, no signup required — that scores how your operations
            run today and points at the specific things worth fixing first.
          </p>
          {resumedNotice ? (
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-primary">
              Welcome back — you can pick up where you left off, or start over below.
            </p>
          ) : null}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" onClick={handleStart}>
              {resumedNotice ? "Continue my audit" : "Start the audit"} <ArrowRight className="h-4 w-4" />
            </Button>
            {resumedNotice ? (
              <button
                type="button"
                onClick={handleRestart}
                className="font-mono text-xs uppercase tracking-[0.1em] text-black/50 hover:text-black/80"
              >
                Start over instead
              </button>
            ) : null}
          </div>
        </div>
      )}

      {session.phase === "diagnostic" && currentQuestion && (
        <div>
          <ProgressBar answeredCount={answeredCount} totalCount={visibleQuestions.length} />
          <div className="mt-10">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              onAnswer={(optionId) => applyAnswer(currentQuestion.id, currentQuestion.sectionId, optionId)}
              onSkip={
                currentQuestion.required
                  ? undefined
                  : () => applyAnswer(currentQuestion.id, currentQuestion.sectionId, "skipped")
              }
            />
          </div>
        </div>
      )}

      {session.phase === "processing" && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-black/60">Scoring your operations…</p>
        </div>
      )}

      {session.phase === "preview_results" && (
        <ResultsPanel mode="preview" result={auditResult} previewCount={previewOpportunityCount} onUnlock={handleUnlock} />
      )}

      {session.phase === "contact_capture" && (
        <ContactCaptureForm
          auditSummary={{
            efficiencyScore: auditResult.efficiency.score,
            frictionBand: auditResult.efficiency.band,
            leadScore: auditResult.leadScore.score,
            leadTier: auditResult.leadScore.tier,
            topOpportunities: auditResult.opportunities.map((o) => o.title),
            recommendedProducts: auditResult.opportunities.map((o) => o.mathBrooksSolution.label),
            commercialPotential: auditResult.commercial.potential,
            complexityEstimate: auditResult.commercial.complexity,
            nextAction: auditResult.leadScore.nextAction,
          }}
          onSuccess={handleContactSuccess}
          onDecline={handleContactDecline}
        />
      )}

      {session.phase === "full_results" && (
        <ResultsPanel mode="full" result={auditResult} previewCount={previewOpportunityCount} companyName={company} />
      )}
    </div>
  );
};

export default AuditFlow;
