import { Link } from "react-router-dom";
import {
  Bot,
  Brain,
  Cpu,
  PhoneCall,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import { operatingModel, serviceAssurance } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

type ServiceItem = {
  icon: typeof Cpu;
  title: string;
  buyer: string;
  description: string;
  outcomes: string[];
};

type ServiceGroup = {
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceItem[];
};

const serviceGroups: ServiceGroup[] = [
  {
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
    eyebrow: "Applied Intelligence",
    title: "AI and Agentic Systems",
    description:
      "Use this when faster answers, tool-connected AI, or bounded task execution can improve a live business process.",
    items: [
      {
        icon: Brain,
        title: "Applied AI",
        buyer: "For teams that can turn better predictions, faster decisions, or copilots into measurable value",
        description:
          "We use AI where it earns its place in the workflow, from analytics and classification to natural-language interfaces and internal copilots.",
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
    title: "Use products when the need is repeatable",
    detail:
      "If the business needs CRM, payroll, accounting, inventory, projects, automation, analytics, or AI assistant workflows, start with the product modules first.",
  },
  {
    title: "Use services when the workflow is specific",
    detail:
      "If the process crosses systems, needs bespoke rules, or carries higher operational risk, services are the better route.",
  },
  {
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
      <PageHero
        eyebrow="Services"
        title="Custom software, automation, and AI built around real operations"
        description="MathBrooks services are for workflows that are too specific for a standard product, or too connected to be left in spreadsheets and chat threads. The goal is to remove friction, improve visibility, and ship something the team can actually use."
        actions={(
          <>
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
          </>
        )}
        sideContent={(
          <div className="space-y-3">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70">
              When to choose services
            </p>
            {[
              "The workflow spans multiple tools or approval paths.",
              "The process is important enough that a generic product will not fit cleanly.",
              "The business needs custom logic, guided rollout, or AI with human control.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-border/20 bg-background/40 px-4 py-3 text-sm font-light text-muted-foreground leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        )}
      />

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <AnimatedSection>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Products vs Services
              </p>
              <div className="space-y-4">
                {useServicesVsProducts.map((item) => (
                  <div key={item.title} className="rounded-xl border border-border/20 bg-background/40 p-4">
                    <h2 className="font-display text-sm tracking-[0.15em] uppercase mb-2">
                      {item.title}
                    </h2>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Delivery standards
              </p>
              <div className="space-y-4">
                {serviceAssurance.map((item) => (
                  <div key={item.title} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                    <h2 className="font-display text-sm tracking-[0.15em] uppercase mb-2">
                      {item.title}
                    </h2>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Service Families
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
                Structured service lanes for different kinds of operational work
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                The page is organized around the kind of decision a buyer is trying to make, not just a list of capabilities.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {serviceGroups.map((group, groupIndex) => (
              <AnimatedSection key={group.title} delay={groupIndex * 90}>
                <section className="rounded-3xl border border-border/20 bg-background/25 p-6 md:p-8">
                  <div className="max-w-3xl mb-6 md:mb-8">
                    <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-2">
                      {group.eyebrow}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide mb-3">
                      {group.title}
                    </h3>
                    <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((service) => (
                      <article key={service.title} className="card-glass rounded-2xl p-6 md:p-8 h-full">
                        <div className="w-12 h-12 rounded-md border border-border/40 flex items-center justify-center mb-6">
                          <service.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-display text-base tracking-wider uppercase mb-3">
                          {service.title}
                        </h4>
                        <p className="text-sm font-light text-primary/75 mb-4 leading-relaxed">
                          {service.buyer}
                        </p>
                        <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <ul className="space-y-3">
                          {service.outcomes.map((item) => (
                            <li key={item} className="text-sm font-light text-muted-foreground flex items-start gap-2">
                              <span className="text-primary/60 mt-0.5">—</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8 flex flex-wrap gap-3">
                          <Link to="/book-demo">
                            <Button className="font-display text-xs tracking-[0.15em] uppercase">
                              Discuss This Service
                            </Button>
                          </Link>
                          <Link
                            to="/products"
                            className="inline-flex items-center font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
                          >
                            Compare With Products
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <AnimatedSection>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Engagement Path
              </p>
              <div className="space-y-4">
                {engagementPath.map((step) => (
                  <div key={step.step} className="rounded-xl border border-border/20 bg-background/40 p-4">
                    <p className="font-display text-[0.62rem] tracking-[0.18em] uppercase text-primary/70 mb-2">
                      Step {step.step}
                    </p>
                    <h3 className="font-display text-sm tracking-[0.15em] uppercase mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Production Standards
              </p>
              <div className="space-y-4">
                {operatingModel.map((item) => (
                  <div key={item.title} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-display text-sm tracking-[0.15em] uppercase mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <AnimatedSection>
          <div className="max-w-6xl mx-auto rounded-3xl border border-primary/20 bg-primary/5 px-6 py-8 md:px-8 md:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/80 mb-3">
                Ready to scope the workflow?
              </p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide mb-3">
                Bring the process, and we will map the right service path
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                If the problem is custom, connected, or high-risk, the service route is usually the right one. If it is repeatable, the product modules may be the better starting point.
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
      </section>
    </SiteLayout>
  );
};

export default Services;
