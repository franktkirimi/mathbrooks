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

describe("AuditFlow — end-to-end deterministic walkthrough", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(forms.hasFormspreeConfig).mockReturnValue(false);
    vi.mocked(forms.getFormspreeId).mockReturnValue("");
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
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
    expect(screen.getByText(/request a proposal/i)).toBeInTheDocument();
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
