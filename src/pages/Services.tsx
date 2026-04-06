import { Link } from "react-router-dom";
import {
  Bot,
  Brain,
  Cpu,
  PhoneCall,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import { operatingModel, serviceAssurance } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

const services = [
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
];

const Services = () => {
  usePageMeta({
    title: "Services | MathBrooks",
    description:
      "MathBrooks provides custom software, workflow automation, applied AI, agentic systems, and voice automation for operations-heavy businesses.",
    canonicalPath: "/services",
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Custom software, automation, and AI built around real operations"
        description="MathBrooks services cover the workflows that are too specific for a standard product. The goal is not to sell complexity. It is to remove friction, improve visibility, and ship something the team can actually use."
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
              Delivery Standards
            </p>
            {serviceAssurance.map((item) => (
              <div key={item.title} className="rounded-xl border border-border/20 bg-background/40 p-4">
                <h2 className="font-display text-xs tracking-[0.15em] uppercase mb-2">
                  {item.title}
                </h2>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        )}
      />

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 120}>
              <article className="card-glass rounded-2xl p-6 md:p-8 h-full">
                <div className="w-12 h-12 rounded-md border border-border/40 flex items-center justify-center mb-6">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-base tracking-wider uppercase mb-3">
                  {service.title}
                </h2>
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
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <AnimatedSection>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                How engagements start
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-5">
                Most work starts with a short discovery conversation, followed by a recommendation on scope, risks, and the most sensible delivery path. If the right answer is not custom software, we say so early.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  "Share the business problem and current workflow.",
                  "We review delivery risk, constraints, and product fit.",
                  "You get a clear recommendation on the next step.",
                ].map((step) => (
                  <div key={step} className="rounded-xl border border-border/20 bg-background/40 p-4 text-sm font-light text-muted-foreground">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <div className="w-12 h-12 rounded-md border border-border/40 flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Delivery discipline
              </p>
              <div className="space-y-4">
                {operatingModel.map((item) => (
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
    </SiteLayout>
  );
};

export default Services;
