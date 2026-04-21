import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Brain, Cpu, PhoneCall, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import SiteLayout from "@/components/site/SiteLayout";
import { operatingModel, proofHighlights } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

type ServiceItem = {
  icon: typeof Cpu;
  title: string;
  buyer: string;
  description: string;
  outcomes: string[];
};

type ServiceGroup = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceItem[];
};

const serviceGroups: ServiceGroup[] = [
  {
    number: "01",
    eyebrow: "Build Systems",
    title: "Custom Software",
    description:
      "Use this when the business process is specific enough that a standard product module will not carry the load.",
    items: [
      {
        icon: Cpu,
        title: "Custom Software",
        buyer: "For teams replacing spreadsheets, disconnected tools, or manual approvals",
        description:
          "We design and build internal platforms, operational dashboards, and client-facing products around the way the business actually works.",
        outcomes: [
          "Clear scope tied to business outcomes",
          "Production-ready architecture",
          "Deployment and handoff planning",
        ],
      },
    ],
  },
  {
    number: "02",
    eyebrow: "Automate Workflows",
    title: "Automation",
    description:
      "Use this when teams are repeating the same handoffs, approvals, reminders, or admin steps every week.",
    items: [
      {
        icon: Workflow,
        title: "Automation",
        buyer: "For operations with repetitive steps, slow handovers, or avoidable human error",
        description:
          "We map the workflow, identify the failure points, and build automation that saves time without creating fragile process debt.",
        outcomes: [
          "Workflow review before implementation",
          "Automation around real constraints",
          "Reporting on efficiency gains",
        ],
      },
    ],
  },
  {
    number: "03",
    eyebrow: "Applied Intelligence",
    title: "AI & Agentic Systems",
    description:
      "Use this when faster answers, tool-connected AI, or bounded task execution can improve a live business process.",
    items: [
      {
        icon: Brain,
        title: "Applied AI",
        buyer: "For teams that can turn better predictions, faster decisions, or copilots into measurable value",
        description:
          "We use AI where it earns its place in the workflow — from analytics and classification to natural-language interfaces and internal copilots.",
        outcomes: [
          "Use-case selection grounded in ROI",
          "AI integrated into delivery, not bolted on later",
          "Clear path from pilot to production",
        ],
      },
      {
        icon: Bot,
        title: "Agentic Systems",
        buyer: "For teams that need AI to act across tools, approvals, and operating procedures",
        description:
          "We build agent workflows that connect to your systems, complete bounded tasks, and stay inside human approval paths where risk matters.",
        outcomes: [
          "Tool-connected agents instead of standalone demos",
          "Approval gates and task boundaries defined up front",
          "Operational fit reviewed before rollout",
        ],
      },
    ],
  },
  {
    number: "04",
    eyebrow: "Operational Interaction",
    title: "Voice Automation",
    description:
      "Use this when intake, routing, and response handling need to move faster than manual call handling allows.",
    items: [
      {
        icon: PhoneCall,
        title: "Voice & Phone Automation",
        buyer: "For teams where faster intake, routing, and response handling creates immediate operational value",
        description:
          "We design real-time voice and phone flows for support, intake, scheduling, routing, and other time-sensitive interactions.",
        outcomes: [
          "Voice flows mapped to real process handoffs",
          "Fast escalation paths to humans when needed",
          "Built for measurable time savings and response quality",
        ],
      },
    ],
  },
];

const useServicesVsProducts = [
  {
    number: "01",
    title: "Use products when the need is repeatable",
    detail:
      "If the business needs CRM, payroll, accounting, inventory, projects, automation, analytics, or AI assistant workflows, start with the product modules first.",
  },
  {
    number: "02",
    title: "Use services when the workflow is specific",
    detail:
      "If the process crosses systems, needs bespoke rules, or carries higher operational risk, services are the better route.",
  },
  {
    number: "03",
    title: "Use both when a standard module needs extension",
    detail:
      "A product can be the base layer, then services can extend it into custom logic, integration, or automation.",
  },
];

const engagementPath = [
  {
    step: "01",
    title: "Discovery",
    detail:
      "We review the workflow, current tools, constraints, and the business outcome that matters most.",
  },
  {
    step: "02",
    title: "Scope",
    detail:
      "We identify what should be productized, what should be custom, and where the rollout risk sits.",
  },
  {
    step: "03",
    title: "Build",
    detail:
      "We ship the minimum useful system, test it with the team, and tighten the workflow before wider rollout.",
  },
  {
    step: "04",
    title: "Stabilize",
    detail:
      "We leave the team with a clear handoff, audit trail, and a practical path for future extension.",
  },
];

// ─── Hero ──────────────────────────────────────────────────────────────────────

const Hero = () => {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const eyeRef    = useRef<HTMLParagraphElement>(null);
  const h1Ref     = useRef<HTMLHeadingElement>(null);
  const subRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    let particles: P[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      const count = Math.floor((W * H) / 9000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.35 + 0.08,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(202, 89%, 69%, ${p.alpha})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(eyeRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(h1Ref.current,   { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
        .fromTo(subRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .fromTo(ctaRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, hsl(202 89% 69% / 0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p ref={eyeRef} className="font-display text-[0.68rem] tracking-[0.32em] uppercase text-primary/70 mb-6" style={{ opacity: 0 }}>
          Services
        </p>

        <h1
          ref={h1Ref}
          className="font-display font-semibold leading-[1.06] tracking-[-0.03em] text-foreground mb-6"
          style={{ fontSize: "clamp(2.4rem, 7vw, 5rem)", opacity: 0 }}
        >
          We build the systems{" "}
          <span style={{
            background: "linear-gradient(135deg, hsl(202 89% 69%) 0%, hsl(191 74% 78%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            behind your operations.
          </span>
        </h1>

        <p ref={subRef} className="text-base sm:text-lg font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10" style={{ opacity: 0 }}>
          Custom software, workflow automation, and applied AI for processes too specific for a standard product — and too important to leave in spreadsheets.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4" style={{ opacity: 0 }}>
          <Link to="/book-demo">
            <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
              Discuss a Project
            </Button>
          </Link>
          <Link to="/products">
            <Button
              variant="outline"
              size="lg"
              className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
            >
              See Product Modules
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
        <p className="font-display text-[0.58rem] tracking-[0.26em] uppercase text-foreground">Scroll</p>
        <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
    </section>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────

const Services = () => {
  usePageMeta({
    title: "Services | MathBrooks",
    description:
      "MathBrooks provides custom software, workflow automation, applied AI, agentic systems, and voice automation for operations-heavy businesses.",
    canonicalPath: "/services",
    keywords: [
      "custom software Zimbabwe",
      "workflow automation Africa",
      "applied AI services",
      "voice automation business",
    ],
  });

  return (
    <SiteLayout>
      <Hero />

      {/* ── Service Lanes ─────────────────────────────────────────────────── */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="mb-16 max-w-2xl">
              <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-4">
                Service Lanes
              </p>
              <h2 className="font-display text-2xl md:text-[2.4rem] font-semibold tracking-[-0.025em] leading-tight">
                Pick the lane that matches the change you need.
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-0 divide-y divide-border/15">
            {serviceGroups.map((group, gi) => (
              <AnimatedSection key={group.number} delay={gi * 60}>
                <div className="py-14 grid gap-8 lg:grid-cols-[120px_1fr_1fr] lg:gap-12">
                  {/* Number + eyebrow */}
                  <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2 pt-1">
                    <span className="font-display text-4xl font-semibold text-primary/20 leading-none">
                      {group.number}
                    </span>
                    <p className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-primary/50">
                      {group.eyebrow}
                    </p>
                  </div>

                  {/* Title + description */}
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] mb-4">
                      {group.title}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6">
                      {group.description}
                    </p>
                    {group.items.map((item) => (
                      <p key={item.title} className="text-sm font-light text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    ))}
                  </div>

                  {/* Outcomes */}
                  <div className="space-y-6">
                    {group.items.map((item) => (
                      <div key={item.title}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg border border-border/30 bg-background/40 flex items-center justify-center text-primary/70">
                            <item.icon className="w-4 h-4" />
                          </div>
                          {group.items.length > 1 && (
                            <p className="font-display text-sm font-semibold tracking-[-0.01em]">{item.title}</p>
                          )}
                        </div>
                        <p className="text-xs font-light text-primary/60 mb-3 leading-relaxed">{item.buyer}</p>
                        <ul className="space-y-2">
                          {item.outcomes.map((o) => (
                            <li key={o} className="flex items-start gap-2 text-sm font-light text-muted-foreground">
                              <span className="text-primary/40 mt-0.5 shrink-0">—</span>
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Choose ─────────────────────────────────────────────────── */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-4">
                  How to Choose
                </p>
                <h2 className="font-display text-2xl md:text-[2.4rem] font-semibold tracking-[-0.025em] leading-tight">
                  Start with repeatability, then choose your path.
                </h2>
              </div>
              <p className="text-sm font-light text-muted-foreground leading-relaxed lg:max-w-md">
                The first question is not whether you need software or AI. It is whether the workflow is repeatable enough for a product module, specific enough for a custom build, or best handled as a mix of both.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-px bg-border/15 rounded-2xl overflow-hidden lg:grid-cols-3">
            {useServicesVsProducts.map((item, i) => (
              <AnimatedSection key={item.number} delay={i * 80}>
                <div className="bg-background px-7 py-8 h-full">
                  <p className="font-display text-3xl font-semibold text-primary/15 leading-none mb-4">
                    {item.number}
                  </p>
                  <h3 className="font-display text-sm font-semibold tracking-[-0.01em] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement Path ───────────────────────────────────────────────── */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="mb-16 max-w-2xl">
              <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-4">
                Engagement Model
              </p>
              <h2 className="font-display text-2xl md:text-[2.4rem] font-semibold tracking-[-0.025em] leading-tight">
                From first review to stable rollout.
              </h2>
            </div>
          </AnimatedSection>

          {/* Steps */}
          <div className="grid gap-px bg-border/15 rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {engagementPath.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 70}>
                <div className="bg-background px-7 py-8 h-full">
                  <p className="font-display text-4xl font-semibold text-primary/15 leading-none mb-4">
                    {step.step}
                  </p>
                  <h3 className="font-display text-base font-semibold tracking-[-0.01em] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Operating model */}
          <AnimatedSection>
            <div className="mb-8 max-w-xl">
              <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-3">
                Production Standards
              </p>
              <h3 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em]">
                The operating model stays visible throughout delivery.
              </h3>
            </div>
          </AnimatedSection>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {operatingModel.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 60}>
                <div className="border-t border-border/20 pt-6">
                  <h4 className="font-display text-sm font-semibold tracking-[-0.01em] mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof + CTA ───────────────────────────────────────────────────── */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Proof numbers */}
          <AnimatedSection>
            <div className="mb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {proofHighlights.map((item) => (
                <div key={item.label}>
                  <p className="font-display text-4xl md:text-5xl font-semibold text-primary leading-none mb-2">
                    {item.value}
                  </p>
                  <p className="font-display text-[0.58rem] tracking-[0.2em] uppercase text-muted-foreground/60">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA block */}
          <AnimatedSection delay={80}>
            <div className="border-t border-border/20 pt-16 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-4">
                  Ready to scope the workflow?
                </p>
                <h2 className="font-display text-2xl md:text-[2rem] font-semibold tracking-[-0.025em] leading-tight mb-4">
                  Bring the process, and we'll map the right service path.
                </h2>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  If the problem is custom, connected, or high-risk, the service route is usually right. If it is repeatable, the product modules may be the better starting point.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/book-demo">
                  <Button className="font-display text-xs tracking-[0.15em] uppercase">
                    Book a Scoping Call
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" className="font-display text-xs tracking-[0.15em] uppercase border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary">
                    Review Product Modules
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Services;
