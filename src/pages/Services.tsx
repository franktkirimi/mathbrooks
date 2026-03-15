import { Link } from "react-router-dom";
import { ArrowLeft, Brain, Cpu, Workflow } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
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
];

const Services = () => {
  usePageMeta({
    title: "Services | MathBrooks",
    description:
      "MathBrooks provides custom software development, workflow automation, and applied AI for operations-heavy businesses.",
    canonicalPath: "/services",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <AnimatedSection>
          <div className="max-w-3xl">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Services
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-wide leading-tight mb-6">
              Software, Automation, and AI Built Around Real Operations
            </h1>
            <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl">
              We scope work around business bottlenecks, delivery risk, and the
              systems you already have. The goal is not to sell complexity. It is to
              remove friction and ship something the team can actually use.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 md:mt-16">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 120}>
              <article className="card-glass rounded-lg p-6 md:p-8 h-full">
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

        <AnimatedSection delay={360}>
          <div className="card-glass rounded-lg p-6 md:p-8 mt-12 md:mt-16">
            <h2 className="font-display text-base tracking-wider uppercase mb-4">
              How Engagements Start
            </h2>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-3xl">
              Most work starts with a short discovery conversation, followed by a
              recommendation on scope, risks, and the most sensible delivery path. If
              the right answer is not custom software, we say so early.
            </p>
            <a
              href="/#contact"
              className="inline-block mt-6 font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              Discuss a project
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Services;
