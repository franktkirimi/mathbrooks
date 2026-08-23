import { ArrowRight, BrainCircuit, Cable, Cpu, Database, Sparkles, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import LazyIndustryOrbit from "@/components/LazyIndustryOrbit";
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
  { code: "SOKO A01", field: "Embodied intelligence", href: "/research/soko-a01" },
  { code: "neFI", field: "National environmental infrastructure", href: "/research/zimbabwe-earth-intelligence" },
  { code: "Ilwimi", field: "Zimbabwean language intelligence", href: "/research/zimbabwe-language-intelligence" },
  { code: "Tessera", field: "Resilient decentralised networks", href: "/research/tessera" },
];

const heroStyles = `
  .mb-hero {
    --hero-ink: #0f1626;
    --hero-teal: #0f766e;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    min-height: 100vh;
    min-height: 100svh;
    background: #ffffff;
    color: var(--hero-ink);
    border-bottom: 1px solid #e2e4e7;
  }

  .mb-hero-shell {
    position: relative;
    z-index: 1;
    width: min(100%, 80rem);
    margin-inline: auto;
    padding: 4.5rem 1.25rem clamp(4.5rem, 8vh, 6.5rem);
    animation: mb-hero-enter 360ms ease-out both;
  }

  .mb-hero-main {
    position: relative;
    z-index: 2;
    padding-block: clamp(7rem, calc(10vh + 2.5rem), 9rem) 0;
  }

  .mb-hero-copy {
    max-width: 72rem;
  }

  .mb-hero-title {
    max-width: 72rem;
    margin: 0;
    color: var(--hero-ink);
    font-family: var(--font-display);
    font-size: clamp(3rem, 4.4vw, 4.5rem);
    font-weight: 600;
    line-height: 0.95;
    letter-spacing: -0.052em;
    text-wrap: balance;
  }

  .mb-hero-title-line {
    display: block;
    white-space: nowrap;
  }

  .mb-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: .75rem;
    margin-top: 3rem;
  }

  .mb-hero-actions a {
    height: 3rem;
    min-width: 12rem;
    padding-inline: 1.35rem;
    border-radius: .45rem;
    transition: transform 140ms ease, background-color 140ms ease, border-color 140ms ease, color 140ms ease;
  }

  .mb-hero-actions a:hover {
    transform: translateY(-1px);
  }

  .mb-hero-primary {
    background: var(--hero-teal) !important;
    color: #fff !important;
  }

  .mb-hero-primary:hover {
    background: #0b5f59 !important;
  }

  .mb-hero-secondary {
    border-color: #e2e4e7 !important;
    background: rgb(255 255 255 / .7) !important;
    backdrop-filter: blur(8px);
    color: var(--hero-ink) !important;
  }

  .mb-hero-secondary:hover {
    border-color: #b8bec5 !important;
    background: rgb(255 255 255 / .9) !important;
    color: var(--hero-ink) !important;
  }

  @keyframes mb-hero-enter {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 48rem) {
    .mb-hero-shell {
      padding: 4.25rem 1.25rem 3.5rem;
    }

    .mb-hero-main {
      display: block;
      padding-block: 5.5rem 0;
    }

    .mb-hero-copy { max-width: 100%; }

    .mb-hero-title {
      max-width: 39rem;
      font-size: 2.5rem;
      line-height: .98;
      letter-spacing: -.048em;
      text-wrap: initial;
    }

    .mb-hero-title-line {
      white-space: normal;
    }

    .mb-hero-actions {
      flex-direction: column;
      align-items: stretch;
      margin-top: 3rem;
    }

    .mb-hero-actions a {
      width: 100%;
      min-width: 0;
    }

  }

  @media (prefers-reduced-motion: reduce) {
    .mb-hero-shell { animation: none; }
  }

`;

const PeopleFirstHomepage = () => (
  <>
    <style>{heroStyles}</style>
    <section className="mb-hero overflow-hidden" aria-labelledby="home-hero-title">
      <div className="mb-hero-shell">
        <div className="mb-hero-main">
          <div className="mb-hero-copy">
            <h1 id="home-hero-title" className="mb-hero-title">
              <span className="mb-hero-title-line">We architect intelligent systems—</span>
              <span className="mb-hero-title-line">from operational software and AI</span>
              <span className="mb-hero-title-line">to mission-critical connected platforms</span>
              <span className="mb-hero-title-line">and sovereign national infrastructure.</span>
            </h1>
            <div className="mb-hero-actions">
              <Button asChild size="lg" className="mb-hero-primary">
                <Link to="/products">Deploy a product <ArrowRight aria-hidden="true" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="mb-hero-secondary">
                <Link to="/services">Commission a custom system</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section id="what-we-build" className="border-b border-[#dfe5ea] bg-white px-5 py-20 text-[#0f1626] sm:px-6 md:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="max-w-4xl">
          <p className="mb-caption text-[#1e7f65]">Two ways to build with MathBrooks</p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.01] tracking-[-0.05em] sm:text-5xl md:text-7xl">
            Deploy what already works. Architect what does not yet exist.
          </h2>
        </AnimatedSection>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#dfe5ea] bg-[#dfe5ea] md:mt-16 md:grid-cols-2">
          <AnimatedSection className="flex h-full flex-col bg-[#f8fafb] p-7 sm:p-10" delay={60}>
            <p className="mb-caption text-[#1e7f65]">01 · Product lane</p>
            <h3 className="mt-7 font-display text-3xl font-semibold tracking-[-0.035em]">Deploy a MathBrooks product</h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#5f6b78]">
              Production-ready software for the operational core of your organisation—from customers and people to finance, delivery, automation, analytics, and AI. Deploy one capability now. Connect products into a unified operating system as your requirements grow.
            </p>
            <Link to="/products" className="mt-10 inline-flex items-center gap-2 font-display text-sm font-semibold text-[#1e7f65] transition-colors hover:text-[#0f1626]">
              Compare deployable products <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
          <AnimatedSection className="flex h-full flex-col bg-[#f8fafb] p-7 sm:p-10" delay={120}>
            <p className="mb-caption text-[#1e7f65]">02 · Custom lane</p>
            <h3 className="mt-7 font-display text-3xl font-semibold tracking-[-0.035em]">Architect a custom system</h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#5f6b78]">
              Custom software, automation, AI, connected systems, and digital infrastructure for missions too specific, interconnected, or consequential for standard products.
            </p>
            <Link to="/services" className="mt-10 inline-flex items-center gap-2 font-display text-sm font-semibold text-[#1e7f65] transition-colors hover:text-[#0f1626]">
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
          <Link to="/research">Open the research portfolio <ArrowRight /></Link>
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
