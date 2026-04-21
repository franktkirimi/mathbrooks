import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type OutputStep = {
  label: string;
  value: string;
  color: string;
};

const MOCK_OUTPUTS: Record<string, OutputStep[]> = {
  default: [
    { label: "Process", value: "Automated intake pipeline", color: "text-primary" },
    { label: "Trigger", value: "On form submission", color: "text-green-400" },
    { label: "Action", value: "Sync to CRM → notify team", color: "text-primary" },
    { label: "Output", value: "Structured record + task created", color: "text-green-400" },
    { label: "Time saved", value: "~3 hrs/week per team member", color: "text-yellow-400" },
  ],
  invoice: [
    { label: "Process", value: "Invoice generation flow", color: "text-primary" },
    { label: "Trigger", value: "Deal marked as won", color: "text-green-400" },
    { label: "Action", value: "Auto-generate PDF → email client", color: "text-primary" },
    { label: "Output", value: "Invoice sent, payment tracked", color: "text-green-400" },
    { label: "Time saved", value: "~45 min per transaction", color: "text-yellow-400" },
  ],
  hr: [
    { label: "Process", value: "Employee onboarding system", color: "text-primary" },
    { label: "Trigger", value: "Offer letter signed", color: "text-green-400" },
    { label: "Action", value: "Create accounts + assign tasks", color: "text-primary" },
    { label: "Output", value: "Onboarding checklist auto-assigned", color: "text-green-400" },
    { label: "Time saved", value: "~6 hrs per new hire", color: "text-yellow-400" },
  ],
  report: [
    { label: "Process", value: "Automated reporting pipeline", color: "text-primary" },
    { label: "Trigger", value: "End of month / week", color: "text-green-400" },
    { label: "Action", value: "Aggregate data → build report", color: "text-primary" },
    { label: "Output", value: "PDF report delivered to inbox", color: "text-green-400" },
    { label: "Time saved", value: "~4 hrs per reporting cycle", color: "text-yellow-400" },
  ],
};

const SUGGESTIONS = [
  "Send invoices automatically when a deal closes",
  "Onboard new employees without manual steps",
  "Generate weekly reports without touching a spreadsheet",
  "Sync customer data across all our tools",
];

const getOutputKey = (input: string): keyof typeof MOCK_OUTPUTS => {
  const lower = input.toLowerCase();
  if (lower.includes("invoice") || lower.includes("deal") || lower.includes("payment")) return "invoice";
  if (lower.includes("onboard") || lower.includes("employ") || lower.includes("hire") || lower.includes("hr")) return "hr";
  if (lower.includes("report") || lower.includes("weekly") || lower.includes("monthly")) return "report";
  return "default";
};

const DemoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<OutputStep[] | null>(null);
  const [activeSuggestion, setActiveSuggestion] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const runDemo = (text: string) => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setOutput(null);

    setTimeout(() => {
      const key = getOutputKey(text);
      const steps = MOCK_OUTPUTS[key];
      setLoading(false);
      setOutput(steps);

      // Animate output rows in
      requestAnimationFrame(() => {
        if (!outputRef.current) return;
        const rows = outputRef.current.querySelectorAll(".output-row");
        gsap.from(rows, {
          x: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.09,
          ease: "power3.out",
        });
      });
    }, 1400);
  };

  const handleSuggestion = (s: string, idx: number) => {
    setActiveSuggestion(idx);
    setInput(s);
    runDemo(s);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="mb-4 font-display text-[0.68rem] tracking-[0.28em] uppercase text-primary/70">
            See It In Action
          </p>
          <h2 className="font-display text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground mb-4">
            Describe your process.{" "}
            <span className="text-gradient-accent">We'll show you the system.</span>
          </h2>
          <p className="text-muted-foreground font-light text-sm max-w-md mx-auto">
            Type any manual workflow you deal with — see how it gets turned into a structured automation.
          </p>
        </div>

        <div ref={wrapRef} className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6 md:p-8">
          {/* Input area */}
          <div className="relative mb-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  runDemo(input);
                }
              }}
              placeholder="Describe your process… e.g. 'We manually send invoices every time a deal closes'"
              className="w-full min-h-[100px] rounded-xl border border-border/60 bg-background/60 px-4 py-3.5 font-light text-sm text-foreground placeholder:text-muted-foreground/50 resize-none outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              rows={3}
            />
          </div>

          {/* Quick suggestions */}
          <div className="mb-5 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSuggestion(s, idx)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-display tracking-[0.08em] transition-all duration-200 ${
                  activeSuggestion === idx
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border/50 bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => runDemo(input)}
            disabled={!input.trim() || loading}
            className="w-full rounded-xl bg-primary py-3.5 font-display text-sm tracking-[0.1em] uppercase text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(202_89%_69%/0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing process…" : "Build the System"}
          </button>

          {/* Loading bar */}
          {loading && (
            <div className="mt-4 h-px w-full bg-border/40 overflow-hidden rounded-full">
              <div
                className="h-full bg-primary/60 rounded-full"
                style={{ animation: "loadingBar 1.4s ease-in-out forwards" }}
              />
            </div>
          )}

          {/* Output */}
          {output && (
            <div
              ref={outputRef}
              className="mt-6 rounded-xl border border-border/40 bg-background/60 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-background/40">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-display text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground">
                  System Architecture
                </span>
              </div>
              <div className="divide-y divide-border/20">
                {output.map((step) => (
                  <div
                    key={step.label}
                    className="output-row flex items-center justify-between px-4 py-3"
                  >
                    <span className="font-display text-[0.7rem] tracking-[0.15em] uppercase text-muted-foreground/70">
                      {step.label}
                    </span>
                    <span className={`text-sm font-light ${step.color}`}>
                      {step.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-border/30 bg-primary/5">
                <p className="text-xs text-muted-foreground font-light">
                  Ready to implement?{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Let's talk about your project →
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
