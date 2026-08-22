import { ArrowRight, BrainCircuit, Cable, Cpu, Database, Sparkles, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import LazyIndustryOrbit from "@/components/LazyIndustryOrbit";
import LivingMathBrooksGrid from "@/components/landing/LivingMathBrooksGrid";
import { Button } from "@/components/ui/button";
import { industries, technologyTools } from "@/content/ecosystemContent";
import { toast } from "@/hooks/use-toast";

const capabilityIcons = [BrainCircuit, Workflow, Cpu, Database, Sparkles, Cable];

const audiences = [
  {
    name: "Founders",
    copy: "Launch the product and operating systems required to move from idea to functioning organisation.",
  },
  {
    name: "Enterprises",
    copy: "Replace fragmented workflows with governed platforms that integrate people, data, intelligence, and operations.",
  },
  {
    name: "Public institutions",
    copy: "Modernise critical services with resilient, interoperable systems designed for institutional continuity.",
  },
  {
    name: "Nations",
    copy: "Build sovereign digital capability around national data, infrastructure, language, environment, and public priorities.",
  },
];

const researchProjects = [
  { code: "SOKO A01", field: "Embodied intelligence", href: "/things/soko-a01" },
  { code: "neFI", field: "National environmental infrastructure", href: "/things/zimbabwe-earth-intelligence" },
  { code: "Ilwimi", field: "Zimbabwean language intelligence", href: "/things/zimbabwe-language-intelligence" },
  { code: "Tessera", field: "Resilient decentralised networks", href: "/things/tessera" },
];

const PeopleFirstHomepage = () => (
  <>
    <section className="relative isolate overflow-hidden bg-white px-5 pb-16 pt-28 text-foreground sm:px-6 md:pb-20 md:pt-36 lg:min-h-screen lg:py-0">
      <div className="relative mx-auto w-full max-w-7xl lg:min-h-screen">
        <AnimatedSection className="relative z-10 flex max-w-[57rem] flex-col justify-center lg:min-h-screen">
          <h1 className="human-signal-headline text-[clamp(2.75rem,6.4vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-foreground">
            We architect intelligent systems—from operational software to national infrastructure.
          </h1>
          <p className="mt-7 max-w-[48rem] text-lg font-normal leading-8 text-muted-foreground sm:text-xl sm:leading-9 md:mt-9 md:text-[1.3rem]">
            Deploy proven products or commission custom software, AI, connected systems, and digital infrastructure. Built in Zimbabwe. Engineered for organisations, institutions, and nations.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/solutions/available">Deploy a product <ArrowRight /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full bg-white/70 backdrop-blur-sm sm:w-auto">
              <Link to="/services">Architect a custom system</Link>
            </Button>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={120} className="pointer-events-none absolute inset-y-0 -right-[44%] z-0 flex w-[145%] items-center opacity-20 sm:-right-[30%] sm:w-[112%] sm:opacity-25 lg:-right-[19vw] lg:w-[68vw] lg:max-w-none lg:opacity-55">
          <LivingMathBrooksGrid />
        </AnimatedSection>
      </div>
    </section>

    <section id="what-we-build" className="bg-foreground px-5 py-20 text-white sm:px-6 md:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="max-w-4xl">
          <p className="mb-caption text-[hsl(var(--signal-4))]">Two ways to build with MathBrooks</p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.01] tracking-[-0.05em] sm:text-5xl md:text-7xl">
            Deploy what already works. Architect what does not yet exist.
          </h2>
        </AnimatedSection>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/15 md:mt-16 md:grid-cols-2">
          <AnimatedSection className="flex h-full flex-col bg-white/[0.06] p-7 sm:p-10" delay={60}>
            <p className="mb-caption text-[hsl(var(--signal-4))]">01 · Product lane</p>
            <h3 className="mt-7 font-display text-3xl font-semibold tracking-[-0.035em]">Deploy a MathBrooks product</h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
              Production-ready software for the operational core of your organisation—from customers and people to finance, delivery, automation, analytics, and AI. Deploy one capability now. Connect products into a unified operating system as your requirements grow.
            </p>
            <Link to="/solutions/available" className="mt-10 inline-flex items-center gap-2 font-display text-sm font-semibold text-[hsl(var(--signal-4))] transition-colors hover:text-white">
              Compare deployable products <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
          <AnimatedSection className="flex h-full flex-col bg-white/[0.06] p-7 sm:p-10" delay={120}>
            <p className="mb-caption text-[hsl(var(--signal-4))]">02 · Custom lane</p>
            <h3 className="mt-7 font-display text-3xl font-semibold tracking-[-0.035em]">Architect a custom system</h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
              Custom software, automation, AI, connected systems, and digital infrastructure for missions too specific, interconnected, or consequential for standard products.
            </p>
            <Link to="/services" className="mt-10 inline-flex items-center gap-2 font-display text-sm font-semibold text-[hsl(var(--signal-4))] transition-colors hover:text-white">
              Request an architecture review <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <section className="px-5 py-20 sm:px-6 md:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="max-w-4xl">
          <p className="mb-caption text-primary">Built for every scale of consequence</p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-[-0.05em] sm:text-5xl md:text-7xl">
            The system should match the scale of the mission.
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
            From a founder’s first operating platform to infrastructure serving an institution or a nation, MathBrooks designs for the complexity, risk, scale, and continuity the mission demands.
          </p>
        </AnimatedSection>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-16 md:grid-cols-2">
          {audiences.map((audience, index) => (
            <AnimatedSection key={audience.name} className="h-full bg-card p-7 sm:p-9" delay={index * 45}>
              <p className="mb-caption text-primary">0{index + 1}</p>
              <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.025em] text-foreground">{audience.name}</h3>
              <p className="mt-3 max-w-lg text-base leading-7 text-muted-foreground">{audience.copy}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section id="industries" className="relative isolate overflow-hidden px-5 py-20 sm:px-6 md:py-28 lg:py-36">
      <LazyIndustryOrbit />
      <div className="relative mx-auto max-w-6xl">
        <AnimatedSection className="max-w-3xl">
          <p className="mb-caption text-primary">Operating domains</p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">Technology across critical domains.</h2>
        </AnimatedSection>
        <div className="mx-auto mt-12 grid max-w-[48rem] grid-cols-3 gap-2.5 sm:gap-3.5 md:mt-16 md:gap-4">
          {industries.map((industry, index) => {
            const signalCell = index === 2 || index === 4;
            const tileClassName = `group flex aspect-square w-full items-center justify-center rounded-xl border p-2 text-center shadow-card transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 sm:rounded-2xl sm:p-4 ${signalCell ? "border-[hsl(var(--signal-8))] bg-[hsl(var(--signal-8))] text-white hover:bg-[hsl(var(--signal-9))]" : "border-black bg-black text-white hover:border-[hsl(var(--signal-8))] hover:bg-[hsl(var(--signal-9))]"}`;

            return (
              <AnimatedSection key={industry.name} delay={index * 45}>
                {industry.href ? (
                  <a href={industry.href} className={tileClassName} aria-label={`View ${industry.name} prototype`}>
                    <span className="font-display text-sm font-semibold leading-tight sm:text-lg md:text-xl">{industry.name}</span>
                  </a>
                ) : (
                  <button type="button" onClick={() => toast({ title: `${industry.name} prototype`, description: "This prototype is coming soon." })} className={tileClassName} aria-label={`${industry.name} prototype coming soon`}>
                    <span className="font-display text-sm font-semibold leading-tight sm:text-lg md:text-xl">{industry.name}</span>
                  </button>
                )}
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>

    <section id="technology" className="px-6 py-20 sm:py-24 md:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="max-w-3xl">
          <p className="mb-caption text-primary">Connected intelligence</p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">The technology behind the system.</h2>
          <p className="mt-5 text-lg font-normal leading-8 text-muted-foreground">We combine these capabilities according to the mission being served—not because any one of them is the point.</p>
        </AnimatedSection>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {technologyTools.map((tool, index) => {
            const Icon = capabilityIcons[index];
            return (
              <div key={tool} className="bg-card p-7">
                <Icon className="h-6 w-6 text-[hsl(var(--teal))]" />
                <h3 className="mt-8 font-display text-2xl font-bold tracking-[-0.02em] text-foreground">{tool}</h3>
                <p className="mt-3 text-sm font-normal leading-7 text-muted-foreground">A production-grade capability selected for its role in the wider system.</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="overflow-hidden bg-[hsl(var(--signal-1))] px-5 py-20 sm:px-6 md:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="max-w-5xl">
          <p className="mb-caption text-primary">Research · MathBrooks Things</p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-foreground sm:text-5xl md:text-7xl">
            Engineering the systems that determine what becomes possible next.
          </h2>
        </AnimatedSection>
        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {researchProjects.map((project, index) => (
            <AnimatedSection key={project.code} delay={index * 50}>
              <Link to={project.href} className="group flex min-h-52 flex-col justify-between rounded-2xl border border-border bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-overlay sm:p-9">
                <p className="mb-caption text-primary">Research system · 0{index + 1}</p>
                <div className="mt-10 flex items-end justify-between gap-6">
                  <div>
                    <h3 className="font-display text-3xl font-bold tracking-[-0.035em] text-foreground">{project.code}</h3>
                    <p className="mt-2 text-base text-muted-foreground">{project.field}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        <Button asChild size="lg" className="mt-10">
          <Link to="/things">Open the research portfolio <ArrowRight /></Link>
        </Button>
      </div>
    </section>

    <section className="bg-foreground px-6 py-28 text-white md:py-36">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <p className="mb-caption text-[hsl(var(--signal-4))]">One connected architecture</p>
          <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.045em] md:text-6xl">From human need to production-grade operating infrastructure.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {["Mission & operating conditions", "Systems architecture", "AI · software · computing · connected infrastructure", "Deployable products", "Institutional capability"].map((item, index) => (
              <div key={item} className="border-t border-white/30 pt-4">
                <span className="text-xs text-white/50">0{index + 1}</span>
                <p className="mt-3 text-sm leading-6">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild><Link to="/about">Our approach <ArrowRight /></Link></Button>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-sm text-white hover:underline">Request Systems Brief <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </>
);

export default PeopleFirstHomepage;
