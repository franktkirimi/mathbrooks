import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AuditFlow from "./AuditFlow";
import { AuditActiveProvider, useAuditActive } from "./AuditActiveContext";
import * as forms from "@/lib/forms";
import { track } from "@vercel/analytics/react";

vi.mock("@vercel/analytics/react", () => ({ track: vi.fn() }));
vi.mock("@/lib/forms", async () => {
  const actual = await vi.importActual<typeof import("@/lib/forms")>("@/lib/forms");
  return { ...actual, getFormspreeId: vi.fn(), hasFormspreeConfig: vi.fn() };
});

const ActiveFlag = () => {
  const { active } = useAuditActive();
  return <div data-testid="audit-active-flag">{String(active)}</div>;
};

const renderFlow = () =>
  render(
    <MemoryRouter>
      <AuditActiveProvider>
        <ActiveFlag />
        <AuditFlow />
      </AuditActiveProvider>
    </MemoryRouter>,
  );

const click = (name: RegExp) => fireEvent.click(screen.getByRole("button", { name }));

/**
 * Phase 1.5: entering full_results now always fires a fetch to
 * /api/audit-analysis (independent of Formspree config), so every test that
 * reaches full_results needs a fetch mock covering that call, on top of
 * whatever Formspree-specific behavior it's testing. This router keeps the
 * two concerns separate: `formspreeHandler` only ever sees non-AI requests.
 */
const AI_UNAVAILABLE_RESPONSE = () =>
  new Response(JSON.stringify({ ok: false, reason: "missing_api_key" }), { status: 200 });

const routedFetch = (
  formspreeHandler?: (url: string, opts?: RequestInit) => Promise<Response> | Response,
  aiHandler?: (url: string, opts?: RequestInit) => Promise<Response> | Response,
) =>
  vi.fn(async (url: string, opts?: RequestInit) => {
    if (String(url).includes("audit-analysis")) return aiHandler ? aiHandler(url, opts) : AI_UNAVAILABLE_RESPONSE();
    if (formspreeHandler) return formspreeHandler(url, opts);
    throw new Error(`Unhandled fetch in test: ${url}`);
  });

describe("AuditFlow — end-to-end deterministic walkthrough", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(false);
    vi.mocked(forms.getFormspreeId).mockReturnValue("");
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.stubGlobal("fetch", routedFetch());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("suppresses the WhatsApp widget for the entire /audit page — including the intro screen before Start is pressed", () => {
    renderFlow();
    // The widget is hidden the moment /audit is on screen, not only once the
    // diagnostic itself begins — a visitor should never see a competing
    // conversion path anywhere on this page until they reach their results.
    expect(screen.getByTestId("audit-active-flag").textContent).toBe("true");
    click(/start the audit/i);
    expect(screen.getByTestId("audit-active-flag").textContent).toBe("true");
  });

  it("walks the minimal deterministic path from intro to the full four-layer results, unsuppressing WhatsApp at results", async () => {
    renderFlow();

    click(/start the audit/i);

    // Business context
    click(/professional services/i);
    click(/^1–5$/i);
    click(/just one/i);
    click(/yes, regularly/i); // sends_quotes
    click(/no — we.re a service business/i); // holds_physical_stock

    // Sales & follow-up (best-case answers — no lost_quotes branch question)
    click(/a dedicated crm or quoting system/i);
    click(/tracked in a system, with reminders/i);
    click(/under 20/i);

    // Inventory section is skipped entirely for a single-branch professional-services business.

    // Reporting, approvals & systems
    click(/an automated dashboard/i);
    click(/a system enforces who signs off/i);
    click(/systems already talk to each other/i);

    // People & delivery (best-case — solo business, not project-based)
    click(/just the owner — no other staff to manage/i);
    click(/doesn.t really run distinct projects or jobs/i);

    // Digital presence & communication
    click(/yes, and it's up to date/i);
    click(/a structured channel/i);

    // Qualification
    click(/just exploring for now/i);
    click(/someone else decides/i);
    click(/skip this question/i); // optional budget_band

    // Processing screen, then auto-advance to preview results.
    expect(screen.getByText(/scoring your operations/i)).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(await screen.findByText(/digital efficiency score/i)).toBeInTheDocument();
    // This is the documented strong-foundation scenario: no opportunities, score 100.
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText(/strong operational foundation/i)).toBeInTheDocument();
    expect(screen.getByText(/your full audit is ready/i)).toBeInTheDocument();

    // Unlock -> contact capture gate.
    click(/unlock my full audit/i);
    expect(screen.getByText(/where should we send your full audit/i)).toBeInTheDocument();
    expect(screen.getByTestId("audit-active-flag").textContent).toBe("false");

    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: "Jane Founder" } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/whatsapp or phone/i), { target: { value: "+263771234567" } });
    fireEvent.change(screen.getByLabelText(/^company$/i), { target: { value: "Example Co" } });
    click(/show my full audit/i);

    expect(await screen.findByText(/talk this through with mathbrooks/i)).toBeInTheDocument();
    expect(screen.getByText(/continue on whatsapp/i)).toBeInTheDocument();
    // This persona has zero opportunities (perfect score) — there's nothing to
    // request a proposal for, so the CTA correctly doesn't appear at all.
    expect(screen.queryByText(/get an implementation proposal/i)).not.toBeInTheDocument();
  });

  it("supports declining the contact gate and returning to the preview results", async () => {
    renderFlow();
    click(/start the audit/i);
    click(/professional services/i);
    click(/^1–5$/i);
    click(/just one/i);
    click(/yes, regularly/i); // sends_quotes
    click(/no — we.re a service business/i); // holds_physical_stock
    click(/whatsapp or phone, worked out case by case/i); // reveals lost_quotes
    click(/tracked in a system, with reminders/i);
    click(/under 20/i);
    click(/rarely or never/i); // lost_quotes
    click(/an automated dashboard/i);
    click(/a system enforces who signs off/i);
    click(/systems already talk to each other/i);
    click(/just the owner — no other staff to manage/i);
    click(/doesn.t really run distinct projects or jobs/i);
    click(/yes, and it's up to date/i);
    click(/a structured channel/i);
    click(/just exploring for now/i);
    click(/someone else decides/i);
    click(/skip this question/i);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    click(/unlock my full audit/i);
    expect(await screen.findByText(/where should we send/i)).toBeInTheDocument();

    click(/not right now/i);
    expect(await screen.findByText(/digital efficiency score/i)).toBeInTheDocument();
    expect(screen.queryByText(/where should we send/i)).not.toBeInTheDocument();
  });

  it("offers to resume an in-progress session on the next mount, and preserves the answers", async () => {
    const { unmount } = renderFlow();
    click(/start the audit/i);
    click(/professional services/i);
    click(/^1–5$/i);
    unmount();

    renderFlow();
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    click(/continue my audit/i);
    // Should resume at branch_count — the next unanswered question — not restart from industry.
    expect(await screen.findByText(/how many branches or locations/i)).toBeInTheDocument();
  });

  it("fires audit_started exactly once across a resume, not once per 'Continue my audit' click (production analytics fix)", async () => {
    const { unmount } = renderFlow();
    click(/start the audit/i);
    click(/professional services/i);
    unmount();

    vi.mocked(track).mockClear();
    renderFlow();
    click(/continue my audit/i);

    const startedCalls = vi.mocked(track).mock.calls.filter(([name]) => name === "audit_started");
    expect(startedCalls).toHaveLength(0);
    const resumedCalls = vi.mocked(track).mock.calls.filter(([name]) => name === "audit_resumed");
    expect(resumedCalls).toHaveLength(1);
  });

  it("does not resume a session that already completed the diagnostic", async () => {
    const { unmount } = renderFlow();
    click(/start the audit/i);
    click(/professional services/i);
    click(/^1–5$/i);
    click(/just one/i);
    click(/yes, regularly/i); // sends_quotes
    click(/no — we.re a service business/i); // holds_physical_stock
    click(/a dedicated crm or quoting system/i);
    click(/tracked in a system, with reminders/i);
    click(/under 20/i);
    click(/an automated dashboard/i);
    click(/a system enforces who signs off/i);
    click(/systems already talk to each other/i);
    click(/just the owner — no other staff to manage/i);
    click(/doesn.t really run distinct projects or jobs/i);
    click(/yes, and it's up to date/i);
    click(/a structured channel/i);
    click(/just exploring for now/i);
    click(/someone else decides/i);
    click(/skip this question/i);
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    await screen.findByText(/digital efficiency score/i);
    unmount();

    renderFlow();
    expect(screen.getByText(/find out what technology could simplify your business/i)).toBeInTheDocument();
    expect(screen.queryByText(/welcome back/i)).not.toBeInTheDocument();
  });
});

describe("AuditFlow — audit-to-proposal handoff (production milestone)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(false);
    vi.mocked(forms.getFormspreeId).mockReturnValue("");
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.stubGlobal("fetch", routedFetch());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  /** Walks a persona guaranteed to produce 3 opportunities (2 HIGH, 1 MEDIUM) through to captured full results. */
  const completeAuditWithOpportunitiesAndContact = async () => {
    click(/start the audit/i);
    click(/professional services/i);
    click(/^1–5$/i);
    click(/just one/i);
    click(/yes, regularly/i); // sends_quotes
    click(/no — we.re a service business/i); // holds_physical_stock
    click(/whatsapp or phone, worked out case by case/i); // quote_method: adhoc, reveals lost_quotes
    click(/not really tracked — relies on memory/i); // followup_tracking: memory (keeps quotation_workflow triggering)
    click(/under 20/i); // message_volume
    click(/yes, regularly/i); // lost_quotes: regularly -> HIGH quotation_workflow
    click(/an automated dashboard/i); // reporting_method
    click(/informal — verbal, or whoever's around/i); // approval_process -> HIGH workflow_approvals
    click(/systems already talk to each other/i);
    click(/just the owner — no other staff to manage/i);
    click(/doesn.t really run distinct projects or jobs/i);
    click(/yes, but it's outdated/i); // website_status -> MEDIUM digital_presence
    click(/a structured channel/i);
    click(/needs this now/i); // urgency
    click(/yes, i make this decision/i); // decision_role
    click(/skip this question/i); // budget_band

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    await screen.findByText(/digital efficiency score/i);
    click(/unlock my full audit/i);
    await screen.findByText(/where should we send/i);

    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: "Jane Founder" } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/whatsapp or phone/i), { target: { value: "+263771234567" } });
    fireEvent.change(screen.getByLabelText(/^company$/i), { target: { value: "ABC Hardware" } });
    click(/show my full audit/i);
    await screen.findByText(/talk this through with mathbrooks/i);
  };

  it("does not send the visitor to a generic quote page — opens the proposal panel in place, results stay visible", async () => {
    renderFlow();
    await completeAuditWithOpportunitiesAndContact();

    click(/get an implementation proposal/i);

    // Still on the audit page — results remain mounted above the form.
    expect(screen.getByText(/digital efficiency score/i)).toBeInTheDocument();
    expect(await screen.findByText(/what would you like mathbrooks to help with/i)).toBeInTheDocument();
  });

  it("does not re-ask for contact details already captured (§5) — no additional name/email/phone/company inputs appear", async () => {
    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);

    expect(screen.queryByLabelText(/^name$/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/^email$/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/^company$/i)).not.toBeInTheDocument();
  });

  it("preselects the highest-priority (high-severity) opportunities without exposing severity/internal terminology", async () => {
    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);

    const quotationOption = screen.getByRole("button", { name: /quotation & follow-up workflow/i });
    const approvalsOption = screen.getByRole("button", { name: /approvals & sign-off/i });
    const digitalOption = screen.getByRole("button", { name: /digital presence/i });
    expect(quotationOption).toHaveAttribute("aria-pressed", "true");
    expect(approvalsOption).toHaveAttribute("aria-pressed", "true");
    expect(digitalOption).toHaveAttribute("aria-pressed", "false");

    // No internal lead-scoring terminology anywhere in the panel.
    expect(screen.queryByText(/lead score/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\bhot\b/i)).not.toBeInTheDocument();
  });

  it("submits only the customer-selected opportunities, carries the complete audit context, and shows the confirmation state without losing the audit", async () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(true);
    vi.mocked(forms.getFormspreeId).mockReturnValue("test-form-id");
    let capturedBody: Record<string, unknown> | null = null;
    vi.stubGlobal(
      "fetch",
      routedFetch((_url, opts) => {
        capturedBody = JSON.parse((opts?.body as string) ?? "{}");
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }),
    );

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);

    // Deselect one of the preselected findings — only the remaining selection should be submitted.
    click(/approvals & sign-off/i);
    fireEvent.change(screen.getByLabelText(/anything else/i), { target: { value: "We'd like to start with quotes." } });
    click(/request implementation proposal/i);

    await waitFor(() => expect(screen.getByText(/proposal requested/i)).toBeInTheDocument());
    // The audit results are still on screen — not redirected away.
    expect(screen.getByText(/digital efficiency score/i)).toBeInTheDocument();
    expect(screen.getByText(/mathbrooks already has your audit findings/i)).toBeInTheDocument();

    expect(capturedBody).not.toBeNull();
    const body = capturedBody as unknown as Record<string, unknown>;
    expect(body.submission_type).toBe("proposal_request");
    expect(body.opportunities_selected).toEqual(["Quotation & follow-up workflow"]);
    expect(Array.isArray(body.opportunities_identified)).toBe(true);
    expect((body.opportunities_identified as string[]).length).toBe(3);
    expect(body.customer_note).toBe("We'd like to start with quotes.");
    expect(body.name).toBe("Jane Founder");
    expect(body.company).toBe("ABC Hardware");
    expect(body.industry).toBeTruthy();
    expect(body.employee_band).toBeTruthy();
    expect(body.full_audit_answers).toContain("Professional services");
    expect(typeof body.audit_reference).toBe("string");
    expect((body.audit_reference as string).startsWith("MB-")).toBe(true);
  });

  it("blocks submission with a clear message when no opportunity is selected, without losing the audit or the note already typed", async () => {
    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);

    // Deselect both preselected options.
    click(/quotation & follow-up workflow/i);
    click(/approvals & sign-off/i);
    fireEvent.change(screen.getByLabelText(/anything else/i), { target: { value: "keep me" } });
    click(/request implementation proposal/i);

    expect(await screen.findByText(/select at least one opportunity/i)).toBeInTheDocument();
    // Nothing was lost — still on the same panel, note still there, results still visible.
    expect(screen.getByLabelText(/anything else/i)).toHaveValue("keep me");
    expect(screen.getByText(/digital efficiency score/i)).toBeInTheDocument();
  });

  it("shows a generic error and keeps the selection intact when the Formspree submission fails, without losing the audit", async () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(true);
    vi.mocked(forms.getFormspreeId).mockReturnValue("test-form-id");
    // The initial audit-lead submission (inside the helper below) must still
    // succeed — only the later proposal-request submission fails, so the
    // failure being tested is isolated to the proposal step itself.
    vi.stubGlobal(
      "fetch",
      routedFetch((_url, opts) => {
        const body = JSON.parse((opts?.body as string) ?? "{}");
        if (body.submission_type === "proposal_request") return new Response("error", { status: 500 });
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }),
    );

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);
    click(/request implementation proposal/i);

    expect(await screen.findByText(/we couldn.t send that/i)).toBeInTheDocument();
    // No internal error/status code exposed, and the audit is still right there.
    expect(screen.queryByText(/500/)).not.toBeInTheDocument();
    expect(screen.getByText(/digital efficiency score/i)).toBeInTheDocument();
    expect(screen.queryByText(/proposal requested/i)).not.toBeInTheDocument();
  });

  it("persists the 'proposal requested' confirmation across a refresh — resuming shows it immediately, not the form again", async () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(true);
    vi.mocked(forms.getFormspreeId).mockReturnValue("test-form-id");
    vi.stubGlobal("fetch", routedFetch(() => new Response(JSON.stringify({ ok: true }), { status: 200 })));

    const { unmount } = renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);
    click(/request implementation proposal/i);
    await waitFor(() => expect(screen.getByText(/proposal requested/i)).toBeInTheDocument());
    unmount();

    // A brand-new mount reading the same persisted session (not a "resume to intro"
    // flow — full_results/contactCaptured sessions render results directly).
    renderFlow();
    expect(await screen.findByText(/proposal requested/i)).toBeInTheDocument();
    expect(screen.getByText(/digital efficiency score/i)).toBeInTheDocument();
  });

  it("uses a contextual WhatsApp message with score, opportunities, and reference — never internal lead data", async () => {
    renderFlow();
    await completeAuditWithOpportunitiesAndContact();

    const whatsappLink = screen.getByRole("link", { name: /continue on whatsapp/i });
    const href = decodeURIComponent(whatsappLink.getAttribute("href") ?? "");
    expect(href).toContain("ABC Hardware");
    expect(href).toContain("Quotation & follow-up workflow");
    expect(href).toMatch(/MB-[A-Z0-9]+/);
    expect(href).not.toMatch(/\bhot\b/i);
    expect(href).not.toContain("decision_maker");
  });

  it("fires the proposal funnel events (cta clicked -> form viewed -> requested) with non-PII properties only", async () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(true);
    vi.mocked(forms.getFormspreeId).mockReturnValue("test-form-id");
    vi.stubGlobal("fetch", routedFetch(() => new Response(JSON.stringify({ ok: true }), { status: 200 })));
    vi.mocked(track).mockClear();

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);
    click(/request implementation proposal/i);
    await waitFor(() => expect(screen.getByText(/proposal requested/i)).toBeInTheDocument());

    const eventNames = vi.mocked(track).mock.calls.map(([name]) => name);
    expect(eventNames).toContain("proposal_cta_clicked");
    expect(eventNames).toContain("proposal_form_viewed");
    expect(eventNames).toContain("proposal_requested");

    const serialisedCalls = JSON.stringify(vi.mocked(track).mock.calls);
    expect(serialisedCalls).not.toContain("jane@example.com");
    expect(serialisedCalls).not.toContain("+263771234567");
    expect(serialisedCalls).not.toContain("ABC Hardware");
  });
});

describe("AuditFlow — AI Intelligence Layer (Phase 1.5)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(false);
    vi.mocked(forms.getFormspreeId).mockReturnValue("");
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.mocked(track).mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  /** Same guaranteed-3-opportunity persona used by the proposal-handoff suite above. */
  const completeAuditWithOpportunitiesAndContact = async () => {
    click(/start the audit/i);
    click(/professional services/i);
    click(/^1–5$/i);
    click(/just one/i);
    click(/yes, regularly/i);
    click(/no — we.re a service business/i);
    click(/whatsapp or phone, worked out case by case/i);
    click(/not really tracked — relies on memory/i);
    click(/under 20/i);
    click(/yes, regularly/i);
    click(/an automated dashboard/i);
    click(/informal — verbal, or whoever's around/i);
    click(/systems already talk to each other/i);
    click(/just the owner — no other staff to manage/i);
    click(/doesn.t really run distinct projects or jobs/i);
    click(/yes, but it's outdated/i);
    click(/a structured channel/i);
    click(/needs this now/i);
    click(/yes, i make this decision/i);
    click(/skip this question/i);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    await screen.findByText(/digital efficiency score/i);
    click(/unlock my full audit/i);
    await screen.findByText(/where should we send/i);

    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: "Jane Founder" } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/whatsapp or phone/i), { target: { value: "+263771234567" } });
    fireEvent.change(screen.getByLabelText(/^company$/i), { target: { value: "ABC Hardware" } });
    click(/show my full audit/i);
    await screen.findByText(/talk this through with mathbrooks/i);
  };

  const AI_REPORT_BODY = {
    ok: true,
    report: {
      executiveSummary: "Your quotation workflow is the highest-value place to start.",
      findings: [
        {
          opportunityId: "quotation_workflow",
          whatWeFound: "AI-contextual found text for ABC Hardware's quoting process.",
          whyItMatters: "AI-contextual why-it-matters text.",
          recommendation: "AI-contextual recommendation text.",
          mathbrooksHelp: "MathBrooks can help implement a lightweight tracking workflow.",
        },
      ],
      priorities: [{ opportunityId: "quotation_workflow", rationale: "It is the highest-severity, highest-impact gap found." }],
      closingSummary: "Start with quotation follow-up before anything else.",
    },
  };

  it("renders the AI-enhanced narrative once the request succeeds, replacing the generic finding text", async () => {
    vi.stubGlobal("fetch", routedFetch(undefined, () => new Response(JSON.stringify(AI_REPORT_BODY), { status: 200 })));

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();

    expect(await screen.findByText(/highest-value place to start/i)).toBeInTheDocument();
    expect(await screen.findByText(/ai-contextual found text for abc hardware/i)).toBeInTheDocument();
    expect(screen.getByText(/mathbrooks can help implement a lightweight tracking workflow/i)).toBeInTheDocument();
    expect(screen.getByText(/start here/i)).toBeInTheDocument();
  });

  it("shows the deterministic report unchanged when the AI request fails — nothing breaks", async () => {
    vi.stubGlobal(
      "fetch",
      routedFetch(undefined, () => new Response(JSON.stringify({ ok: false, reason: "provider_error_500" }), { status: 200 })),
    );

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();

    // The original, deterministic finding text is still shown.
    expect(
      await screen.findByText(/quotes go out ad hoc and follow-up depends on individual staff remembering to chase them/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/highest-value place to start/i)).not.toBeInTheDocument();
    // Proposal CTA and WhatsApp handoff are both still present and functional.
    expect(screen.getByText(/get an implementation proposal/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue on whatsapp/i })).toBeInTheDocument();
  });

  it("requests the AI analysis exactly once per completed audit — not again on unrelated re-renders", async () => {
    const aiHandler = vi.fn(() => new Response(JSON.stringify(AI_REPORT_BODY), { status: 200 }));
    vi.stubGlobal("fetch", routedFetch(undefined, aiHandler));

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    await screen.findByText(/highest-value place to start/i);

    // Trigger further re-renders (toggling a proposal opportunity causes state updates).
    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);

    expect(aiHandler).toHaveBeenCalledTimes(1);
  });

  it("caches the AI report across an unmount/remount of the same persisted session — no repeat call", async () => {
    const aiHandler = vi.fn(() => new Response(JSON.stringify(AI_REPORT_BODY), { status: 200 }));
    vi.stubGlobal("fetch", routedFetch(undefined, aiHandler));

    const { unmount } = renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    await screen.findByText(/highest-value place to start/i);
    unmount();

    renderFlow();
    expect(await screen.findByText(/highest-value place to start/i)).toBeInTheDocument();
    expect(aiHandler).toHaveBeenCalledTimes(1);
  });

  it("does not send any answer content, PII, or internal lead data in the AI request body", async () => {
    let capturedBody: Record<string, unknown> | null = null;
    vi.stubGlobal(
      "fetch",
      routedFetch(undefined, (_url, opts) => {
        capturedBody = JSON.parse((opts?.body as string) ?? "{}");
        return new Response(JSON.stringify(AI_REPORT_BODY), { status: 200 });
      }),
    );

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    await screen.findByText(/highest-value place to start/i);

    expect(capturedBody).not.toBeNull();
    const serialized = JSON.stringify(capturedBody);
    expect(serialized).not.toContain("jane@example.com");
    expect(serialized).not.toContain("+263771234567");
    expect(serialized).not.toContain("ABC Hardware");
    expect(capturedBody).toHaveProperty("answers");
    expect(capturedBody).not.toHaveProperty("leadScore");
  });

  it("does not break the proposal submission or WhatsApp handoff when the AI request fails", async () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(true);
    vi.mocked(forms.getFormspreeId).mockReturnValue("test-form-id");
    vi.stubGlobal(
      "fetch",
      routedFetch(
        () => new Response(JSON.stringify({ ok: true }), { status: 200 }),
        () => {
          throw new Error("simulated AI network failure");
        },
      ),
    );

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();

    const whatsappLink = screen.getByRole("link", { name: /continue on whatsapp/i });
    expect(decodeURIComponent(whatsappLink.getAttribute("href") ?? "")).toContain("ABC Hardware");

    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);
    click(/request implementation proposal/i);
    await waitFor(() => expect(screen.getByText(/proposal requested/i)).toBeInTheDocument());
  });

  it("fires ai_analysis_requested/succeeded analytics with no PII on success, and ai_analysis_fallback_used on failure", async () => {
    vi.stubGlobal("fetch", routedFetch(undefined, () => new Response(JSON.stringify(AI_REPORT_BODY), { status: 200 })));
    const { unmount } = renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    await screen.findByText(/highest-value place to start/i);

    let eventNames = vi.mocked(track).mock.calls.map(([name]) => name);
    expect(eventNames).toContain("ai_analysis_requested");
    expect(eventNames).toContain("ai_analysis_succeeded");
    const serialisedSuccess = JSON.stringify(vi.mocked(track).mock.calls);
    expect(serialisedSuccess).not.toContain("jane@example.com");
    expect(serialisedSuccess).not.toContain("ABC Hardware");

    unmount();
    window.localStorage.clear();
    vi.mocked(track).mockClear();
    vi.stubGlobal(
      "fetch",
      routedFetch(undefined, () => new Response(JSON.stringify({ ok: false, reason: "timeout" }), { status: 200 })),
    );

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    await waitFor(() => {
      eventNames = vi.mocked(track).mock.calls.map(([name]) => name);
      expect(eventNames).toContain("ai_analysis_failed");
    });
    expect(eventNames).toContain("ai_analysis_fallback_used");
  });
});

describe("AuditFlow — non-blocking AI results UX", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(false);
    vi.mocked(forms.getFormspreeId).mockReturnValue("");
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.mocked(track).mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  const completeAuditWithOpportunitiesAndContact = async () => {
    click(/start the audit/i);
    click(/professional services/i);
    click(/^1–5$/i);
    click(/just one/i);
    click(/yes, regularly/i);
    click(/no — we.re a service business/i);
    click(/whatsapp or phone, worked out case by case/i);
    click(/not really tracked — relies on memory/i);
    click(/under 20/i);
    click(/yes, regularly/i);
    click(/an automated dashboard/i);
    click(/informal — verbal, or whoever's around/i);
    click(/systems already talk to each other/i);
    click(/just the owner — no other staff to manage/i);
    click(/doesn.t really run distinct projects or jobs/i);
    click(/yes, but it's outdated/i);
    click(/a structured channel/i);
    click(/needs this now/i);
    click(/yes, i make this decision/i);
    click(/skip this question/i);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    await screen.findByText(/digital efficiency score/i);
    click(/unlock my full audit/i);
    await screen.findByText(/where should we send/i);

    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: "Jane Founder" } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/whatsapp or phone/i), { target: { value: "+263771234567" } });
    fireEvent.change(screen.getByLabelText(/^company$/i), { target: { value: "ABC Hardware" } });
    click(/show my full audit/i);
    await screen.findByText(/talk this through with mathbrooks/i);
  };

  const AI_REPORT_BODY = {
    ok: true,
    report: {
      executiveSummary: "Your quotation workflow is the highest-value place to start.",
      findings: [
        {
          opportunityId: "quotation_workflow",
          whatWeFound: "AI-contextual found text for ABC Hardware's quoting process.",
          whyItMatters: "AI-contextual why-it-matters text.",
          recommendation: "AI-contextual recommendation text.",
          mathbrooksHelp: "MathBrooks can help implement a lightweight tracking workflow.",
        },
      ],
      priorities: [{ opportunityId: "quotation_workflow", rationale: "It is the highest-severity, highest-impact gap found." }],
      closingSummary: "Start with quotation follow-up before anything else.",
    },
  };

  /** Builds a fetch mock whose AI branch never resolves until `resolveAi` is called. */
  const deferredAiFetch = (formspreeHandler?: (url: string, opts?: RequestInit) => Promise<Response> | Response) => {
    let resolveAi!: (value: Response) => void;
    const aiPromise = new Promise<Response>((resolve) => {
      resolveAi = resolve;
    });
    const fetchMock = routedFetch(formspreeHandler, () => aiPromise);
    return { fetchMock, resolveAi };
  };

  it("renders the full deterministic report (score, findings, proposal CTA, WhatsApp) immediately — never waiting on the AI request", async () => {
    const { fetchMock } = deferredAiFetch();
    vi.stubGlobal("fetch", fetchMock);

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();

    // All of this is present the instant full_results renders, with the AI
    // request still unresolved (deferredAiFetch never settles it).
    expect(screen.getByText(/digital efficiency score/i)).toBeInTheDocument();
    expect(screen.getByText(/moderate operational friction detected/i)).toBeInTheDocument();
    expect(screen.getByText(/quotation & follow-up workflow/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue on whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get an implementation proposal/i })).not.toBeDisabled();
    // The AI section itself has not appeared yet — only the restrained, inline loading note.
    expect(screen.queryByText(/ai business analysis/i)).not.toBeInTheDocument();
    expect(screen.getByText(/reviewing your operational findings/i)).toBeInTheDocument();
  });

  it("keeps the report fully interactive while AI is pending — proposal CTA opens the panel and WhatsApp href is correct", async () => {
    const { fetchMock } = deferredAiFetch();
    vi.stubGlobal("fetch", fetchMock);

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();

    const whatsappLink = screen.getByRole("link", { name: /continue on whatsapp/i });
    expect(decodeURIComponent(whatsappLink.getAttribute("href") ?? "")).toContain("ABC Hardware");

    click(/get an implementation proposal/i);
    expect(await screen.findByText(/what would you like mathbrooks to help with/i)).toBeInTheDocument();
  });

  it("lets the visitor submit a proposal before AI finishes, then does not disturb the confirmation once AI arrives", async () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(true);
    vi.mocked(forms.getFormspreeId).mockReturnValue("test-form-id");
    const { fetchMock, resolveAi } = deferredAiFetch(() => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();

    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);
    click(/request implementation proposal/i);
    await waitFor(() => expect(screen.getByText(/proposal requested/i)).toBeInTheDocument());

    // AI arrives afterward — the confirmation must survive, and the enhanced
    // content is free to appear elsewhere in the report without resetting it.
    await act(async () => {
      resolveAi(new Response(JSON.stringify(AI_REPORT_BODY), { status: 200 }));
    });
    await screen.findByText(/highest-value place to start/i);
    expect(screen.getByText(/proposal requested/i)).toBeInTheDocument();
    expect(screen.getByText(/digital efficiency score/i)).toBeInTheDocument();
  });

  it("keeps the deterministic finding text intact even after the AI enhancement arrives — additive, not a replacement", async () => {
    vi.stubGlobal("fetch", routedFetch(undefined, () => new Response(JSON.stringify(AI_REPORT_BODY), { status: 200 })));

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();

    await screen.findByText(/highest-value place to start/i);
    // The original deterministic sentence for this finding is still on screen,
    // alongside (not replaced by) the "Deeper analysis" addition.
    expect(
      screen.getByText(/quotes go out ad hoc and follow-up depends on individual staff remembering to chase them/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/deeper analysis for your organization/i)).toBeInTheDocument();
    expect(screen.getByText(/ai-contextual found text for abc hardware/i)).toBeInTheDocument();
  });

  it("records ai_status: pending on proposal_requested when the visitor converts before AI completes", async () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(true);
    vi.mocked(forms.getFormspreeId).mockReturnValue("test-form-id");
    const { fetchMock } = deferredAiFetch(() => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);
    click(/request implementation proposal/i);
    await waitFor(() => expect(screen.getByText(/proposal requested/i)).toBeInTheDocument());

    const requestedCall = vi.mocked(track).mock.calls.find(([name]) => name === "proposal_requested");
    expect(requestedCall?.[1]).toMatchObject({ ai_status: "pending" });
  });

  it("records ai_status: ready on proposal_requested when the visitor converts after AI completes", async () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(true);
    vi.mocked(forms.getFormspreeId).mockReturnValue("test-form-id");
    vi.stubGlobal(
      "fetch",
      routedFetch(
        () => new Response(JSON.stringify({ ok: true }), { status: 200 }),
        () => new Response(JSON.stringify(AI_REPORT_BODY), { status: 200 }),
      ),
    );

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    await screen.findByText(/highest-value place to start/i);

    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);
    click(/request implementation proposal/i);
    await waitFor(() => expect(screen.getByText(/proposal requested/i)).toBeInTheDocument());

    const requestedCall = vi.mocked(track).mock.calls.find(([name]) => name === "proposal_requested");
    expect(requestedCall?.[1]).toMatchObject({ ai_status: "ready" });
  });

  it("records ai_status: unavailable on proposal_requested when AI has already failed", async () => {
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(true);
    vi.mocked(forms.getFormspreeId).mockReturnValue("test-form-id");
    vi.stubGlobal(
      "fetch",
      routedFetch(
        () => new Response(JSON.stringify({ ok: true }), { status: 200 }),
        () => new Response(JSON.stringify({ ok: false, reason: "timeout" }), { status: 200 }),
      ),
    );

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    await waitFor(() => {
      const eventNames = vi.mocked(track).mock.calls.map(([name]) => name);
      expect(eventNames).toContain("ai_analysis_failed");
    });

    click(/get an implementation proposal/i);
    await screen.findByText(/what would you like mathbrooks to help with/i);
    click(/request implementation proposal/i);
    await waitFor(() => expect(screen.getByText(/proposal requested/i)).toBeInTheDocument());

    const requestedCall = vi.mocked(track).mock.calls.find(([name]) => name === "proposal_requested");
    expect(requestedCall?.[1]).toMatchObject({ ai_status: "unavailable" });
  });

  it("fires audit_results_displayed the moment deterministic results render, independent of AI", async () => {
    const { fetchMock } = deferredAiFetch();
    vi.stubGlobal("fetch", fetchMock);

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();

    const eventNames = vi.mocked(track).mock.calls.map(([name]) => name);
    expect(eventNames).toContain("audit_results_displayed");
    // No PII in any recorded call.
    const serialized = JSON.stringify(vi.mocked(track).mock.calls);
    expect(serialized).not.toContain("jane@example.com");
    expect(serialized).not.toContain("ABC Hardware");
  });

  it("does not break WhatsApp or the audit when AI fails after the visitor has already been reading the report", async () => {
    vi.stubGlobal(
      "fetch",
      routedFetch(undefined, () => new Response(JSON.stringify({ ok: false, reason: "provider_error_500" }), { status: 200 })),
    );

    renderFlow();
    await completeAuditWithOpportunitiesAndContact();
    await waitFor(() => {
      const eventNames = vi.mocked(track).mock.calls.map(([name]) => name);
      expect(eventNames).toContain("ai_analysis_failed");
    });

    // The report must feel complete, not broken: no error banner, no "AI unavailable" scare text required —
    // silently removing the loading state is sufficient, per the UX brief.
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/reviewing your operational findings/i)).not.toBeInTheDocument();
    expect(screen.getByText(/digital efficiency score/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue on whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get an implementation proposal/i })).toBeInTheDocument();
  });
});
