import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, CalendarClock, CreditCard, Sparkles, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

type RevealStepKey = "crm" | "hr" | "finance" | "automation";

type RevealStep = {
  key: RevealStepKey;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  accent: string;
  icon: typeof Sparkles;
  metrics: { label: string; value: string }[];
  cards: { title: string; detail: string }[];
  rows: { label: string; value: string; tone?: "default" | "positive" | "warning" }[];
};

const revealSteps: RevealStep[] = [
  {
    key: "crm",
    eyebrow: "Step 01",
    title: "Customer Management",
    description:
      "A single view of leads, accounts, follow-ups, and deal progress so relationships stop living in chat threads and memory.",
    summary: "CRM dashboard",
    accent: "255 108 43",
    icon: Bot,
    metrics: [
      { label: "Open pipeline", value: "$124k" },
      { label: "Follow-ups", value: "18 due" },
      { label: "Conversion", value: "31%" },
    ],
    cards: [
      { title: "Lead stages", detail: "New, qualified, proposal sent, and awaiting decision." },
      { title: "Activity log", detail: "Calls, WhatsApp notes, quotes, and next actions in one timeline." },
    ],
    rows: [
      { label: "Hot accounts", value: "Harare Distributors", tone: "positive" },
      { label: "At risk", value: "BlueStone Services", tone: "warning" },
      { label: "Next action", value: "Follow up quote sent yesterday" },
    ],
  },
  {
    key: "hr",
    eyebrow: "Step 02",
    title: "Employee & Payroll",
    description:
      "A clean operating view for staff records, leave, approvals, and payroll runs without depending on spreadsheets.",
    summary: "HR dashboard",
    accent: "96 165 250",
    icon: CalendarClock,
    metrics: [
      { label: "Employees", value: "312" },
      { label: "Pending leave", value: "09" },
      { label: "Payroll status", value: "Ready" },
    ],
    cards: [
      { title: "Approvals queue", detail: "Leave, salary updates, and role changes waiting on sign-off." },
      { title: "Compliance rhythm", detail: "ZIMRA and NSSA workflows tracked before the payroll cut-off." },
    ],
    rows: [
      { label: "Payroll window", value: "3 days left" },
      { label: "Exceptions", value: "2 flagged", tone: "warning" },
      { label: "Bank export", value: "Prepared", tone: "positive" },
    ],
  },
  {
    key: "finance",
    eyebrow: "Step 03",
    title: "Finance & Invoices",
    description:
      "Real-time revenue, collections, and invoice visibility so leaders can see what is owed, what is late, and what is trending.",
    summary: "Financial dashboard",
    accent: "34 197 94",
    icon: CreditCard,
    metrics: [
      { label: "Revenue", value: "$48.2k" },
      { label: "Overdue", value: "$6.4k" },
      { label: "Margin", value: "29%" },
    ],
    cards: [
      { title: "Invoice table", detail: "Current, overdue, and disputed invoices separated at a glance." },
      { title: "Collections view", detail: "Aging buckets and payment trends without spreadsheet consolidation." },
    ],
    rows: [
      { label: "Top payer", value: "Northgate Trading", tone: "positive" },
      { label: "Overdue", value: "7 invoices", tone: "warning" },
      { label: "Cash position", value: "Improving" },
    ],
  },
  {
    key: "automation",
    eyebrow: "Step 04",
    title: "Workflow Automation",
    description:
      "Approvals, reminders, and handoffs move automatically so the team spends less time chasing status and more time executing work.",
    summary: "Automation layer",
    accent: "168 85 247",
    icon: Workflow,
    metrics: [
      { label: "Automations", value: "12" },
      { label: "Time saved", value: "14h/wk" },
      { label: "Success rate", value: "99.2%" },
    ],
    cards: [
      { title: "Approval routes", detail: "Requests move between the right people with clear fallback paths." },
      { title: "Event triggers", detail: "Status changes, reminders, and reporting updates happen in the background." },
    ],
    rows: [
      { label: "Pending approvals", value: "4", tone: "warning" },
      { label: "Completed today", value: "26", tone: "positive" },
      { label: "Next trigger", value: "Monthly summary at 5pm" },
    ],
  },
];

const useStepObserver = (steps: RevealStepKey[]) => {
  const [activeStep, setActiveStep] = useState<RevealStepKey>(steps[0]);
  const stepRefs = useRef<Record<RevealStepKey, HTMLElement | null>>({
    crm: null,
    hr: null,
    finance: null,
    automation: null,
  });

  useEffect(() => {
    const observers = steps
      .map((key) => {
        const el = stepRefs.current[key];
        if (!el) return null;

        const observer = new IntersectionObserver(
          (entries) => {
            const visibleEntry = entries.find((entry) => entry.isIntersecting);
            if (visibleEntry) {
              setActiveStep(key);
            }
          },
          {
            threshold: [0.4, 0.55, 0.7],
            root: null,
            rootMargin: "-18% 0px -36% 0px",
          }
        );

        observer.observe(el);
        return observer;
      })
      .filter(Boolean) as IntersectionObserver[];

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [steps]);

  const setRef = (key: RevealStepKey) => (node: HTMLElement | null) => {
    stepRefs.current[key] = node;
  };

  return { activeStep, setRef };
};

const ScrollProductReveal = () => {
  const stepKeys = useMemo(() => revealSteps.map((step) => step.key), []);
  const { activeStep, setRef } = useStepObserver(stepKeys);
  const activeData = revealSteps.find((step) => step.key === activeStep) ?? revealSteps[0];

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 45%), hsl(var(--background))",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">
            Platform Storytelling
          </p>
          <h2 className="font-display text-[2.1rem] md:text-[3.1rem] lg:text-[3.6rem] uppercase tracking-wide leading-[1.04]">
            Software that reveals itself as the business grows
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-[1.04rem] font-light text-muted-foreground leading-8">
            Scroll through the core modules and the product surface updates with the workflow. The aim is simple: show the platform as business infrastructure, not a static feature list.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div className="lg:sticky lg:top-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-gradient-to-b from-background/65 to-card/80"
                style={{
                  boxShadow: `0 0 0 1px hsl(${activeData.accent} / 0.12), 0 32px 100px rgba(15,23,42,0.22)`,
                }}
              >
                  <div className="border-b border-border/60 px-4 py-3">
                    <div>
                      <p className="font-display text-[0.74rem] tracking-[0.22em] uppercase text-primary/70">
                        {activeData.summary}
                      </p>
                      <h3 className="mt-1 font-display text-base tracking-[0.18em] uppercase text-foreground">
                        MathBrooks Platform
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 md:p-5">
                    <motion.div
                      layout
                      className="rounded-2xl border border-border/60 p-4 md:p-5"
                      style={{
                        background: `linear-gradient(180deg, hsl(${activeData.accent} / 0.16), hsl(var(--background) / 0.7))`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[0.78rem] font-display tracking-[0.2em] uppercase text-muted-foreground/70">
                            Active module
                          </p>
                          <h4 className="mt-2 font-display text-xl uppercase tracking-wide text-foreground">
                            {activeData.title}
                          </h4>
                          <p className="mt-3 max-w-md text-base font-light leading-8 text-muted-foreground">
                            {activeData.description}
                          </p>
                        </div>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background/70">
                          <activeData.icon className="h-5 w-5 text-foreground/80" />
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {activeData.metrics.map((metric, index) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="rounded-xl border border-border/60 bg-background/65 px-3 py-3"
                          >
                            <p className="text-[0.74rem] font-display tracking-[0.18em] uppercase text-muted-foreground/70">
                              {metric.label}
                            </p>
                            <p className="mt-2 text-[1.45rem] font-display text-foreground">
                              {metric.value}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {activeData.cards.map((card, index) => (
                          <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: index * 0.05 }}
                            className="rounded-xl border border-border/60 bg-background/65 p-4"
                          >
                            <p className="text-[0.78rem] font-display tracking-[0.18em] uppercase text-muted-foreground/70">
                              {card.title}
                            </p>
                            <p className="mt-3 text-base font-light leading-7 text-muted-foreground">
                              {card.detail}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                      <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-[0.74rem] font-display tracking-[0.2em] uppercase text-muted-foreground/70">
                            Activity
                          </p>
                          <ArrowRight className="h-3 w-3 text-muted-foreground/60" />
                        </div>
                        <div className="mt-4 space-y-3">
                          {activeData.rows.map((row, index) => (
                            <motion.div
                              key={row.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="flex items-center justify-between gap-3"
                          >
                              <span className="text-sm font-light text-muted-foreground">
                                {row.label}
                              </span>
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  row.tone === "positive"
                                    ? "text-emerald-600"
                                    : row.tone === "warning"
                                      ? "text-amber-600"
                                      : "text-foreground"
                                )}
                              >
                                {row.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                        <p className="text-[0.74rem] font-display tracking-[0.2em] uppercase text-muted-foreground/70">
                          Weekly trend
                        </p>
                        <div className="mt-4 flex h-24 items-end gap-2">
                          {[42, 54, 38, 68, 56, 78, 64].map((height, index) => (
                            <div key={index} className="flex-1 rounded-t-lg bg-border/35">
                              <motion.div
                                initial={{ height: 0, opacity: 0.5 }}
                                animate={{ height: `${height}%`, opacity: 1 }}
                                transition={{ duration: 0.32, delay: index * 0.04 }}
                                className="rounded-t-lg"
                                style={{
                                  background: `linear-gradient(180deg, hsl(${activeData.accent} / 0.95), hsl(${activeData.accent} / 0.35))`,
                                  boxShadow: `0 0 24px hsl(${activeData.accent} / 0.18)`,
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-sm font-light text-muted-foreground/70">
                          Calm, high-visibility signals without noise.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
          </div>

          <div className="space-y-5 md:space-y-6">
            {revealSteps.map((step) => {
              const isActive = activeStep === step.key;

              return (
                <motion.article
                  key={step.key}
                  ref={setRef(step.key)}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0.72, y: isActive ? 0 : 8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "group rounded-[1.5rem] border px-5 py-6 md:px-6 md:py-7 transition-all duration-500",
                    isActive
                      ? "border-border/60 bg-background/45 shadow-[0_0_0_1px_hsl(var(--primary)/0.06)]"
                      : "border-border/30 bg-transparent"
                  )}
                  style={{
                    boxShadow: isActive
                      ? `0 0 0 1px hsl(${step.accent} / 0.12), 0 20px 45px rgba(0,0,0,0.25)`
                      : undefined,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-500"
                      style={{
                        borderColor: isActive ? `hsl(${step.accent} / 0.35)` : "hsl(var(--border) / 0.5)",
                        backgroundColor: isActive ? `hsl(${step.accent} / 0.08)` : "hsl(var(--background) / 0.7)",
                      }}
                    >
                      <step.icon
                        className="h-4 w-4 transition-colors duration-500"
                        style={{ color: isActive ? `hsl(${step.accent})` : "hsl(var(--muted-foreground))" }}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-display text-[0.74rem] tracking-[0.22em] uppercase text-muted-foreground/70">
                        {step.eyebrow}
                      </p>
                      <h3 className="mt-1 font-display text-lg md:text-xl uppercase tracking-wide text-foreground">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 16 : 8,
                    }}
                    transition={{ duration: 0.24 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl text-sm md:text-base font-light leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollProductReveal;
