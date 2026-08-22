import {
  ArrowRight,
  Binary,
  BrainCircuit,
  Cable,
  CircuitBoard,
  Cpu,
  MapPin,
  MonitorCog,
  Network,
  ScanSearch,
  ShieldCheck,
  Signal,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";

const evolution = [
  {
    code: "01",
    title: "Software systems",
    detail: "Operational platforms, digital products, and infrastructure shaped around real work.",
    icon: MonitorCog,
  },
  {
    code: "02",
    title: "Applied intelligence",
    detail: "AI introduced where it improves a decision, removes friction, or extends human capability.",
    icon: BrainCircuit,
  },
  {
    code: "03",
    title: "Computing",
    detail: "Research into efficient, accessible forms of intelligence for African operating conditions.",
    icon: Cpu,
  },
  {
    code: "04",
    title: "Connected technology",
    detail: "Sensors, software, and machines working together beyond the boundaries of a screen.",
    icon: Cable,
  },
];

const operatingPrinciples = [
  {
    code: "INPUT",
    title: "Reality before novelty",
    detail: "We begin with the environment, the people, and the constraint—not a fashionable technology.",
    icon: ScanSearch,
  },
  {
    code: "SYSTEM",
    title: "Integrated by design",
    detail: "Connected intelligence unifies data, interfaces, and physical operations into one coherent system.",
    icon: Network,
  },
  {
    code: "CONTROL",
    title: "People remain in command",
    detail: "Automation should reduce risk and cognitive load without hiding decisions or removing human judgment.",
    icon: ShieldCheck,
  },
];

const About = () => {
  usePageMeta({
    title: "About | MathBrooks",
    description: "MathBrooks is a Zimbabwean intelligent-systems company architecting software, AI, computing, connected systems, and digital infrastructure.",
    canonicalPath: "/about",
    keywords: ["MathBrooks", "Zimbabwe technology company", "intelligent systems", "applied AI", "connected technology"],
  });

  return (
    <SiteLayout>
      <div className="px-5 pb-24 pt-28 sm:px-6 md:pb-32 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <section className="relative min-h-[680px] overflow-hidden rounded-[2rem] bg-[#071011] px-7 py-9 text-white shadow-[0_30px_90px_rgba(3,12,14,0.2)] md:rounded-[2.5rem] md:px-12 md:py-12 lg:px-16 lg:py-14">
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(93,201,198,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(93,201,198,0.1)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="absolute -right-48 -top-48 h-[38rem] w-[38rem] rounded-full border border-[#67c9c7]/15" />
            <div className="absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full border border-[#67c9c7]/20" />
            <div className="absolute right-14 top-14 h-2 w-2 rounded-full bg-[#67c9c7] shadow-[0_0_24px_rgba(103,201,199,0.9)]" />

            <div className="relative z-10 flex min-h-[580px] flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5">
                <div className="flex items-center gap-3">
                  <CircuitBoard className="h-5 w-5 text-[#67c9c7]" strokeWidth={1.5} aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#8bd8d6]">MathBrooks / System profile</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/60">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#67c9c7]" />
                  Building from Zimbabwe
                </div>
              </div>

              <div className="grid gap-12 py-14 lg:grid-cols-[1.45fr_0.55fr] lg:items-end">
                <AnimatedSection>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#8bd8d6]">Architects of connected intelligence</p>
                  <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[5.3rem]">
                    Technology that can think, connect, and act.
                  </h1>
                  <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 md:text-xl md:leading-9">
                    MathBrooks architects software, AI, computing, connected systems, and digital infrastructure for organisations, institutions, and national capability.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={120} className="grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15">
                  {[
                    ["Origin", "Harare, Zimbabwe"],
                    ["Orientation", "People + systems"],
                    ["Operating range", "Digital → physical"],
                    ["Standard", "Production-grade"],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[#0b1718]/95 px-5 py-4">
                      <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#67c9c7]">{label}</p>
                      <p className="mt-1 text-sm font-medium text-white/80">{value}</p>
                    </div>
                  ))}
                </AnimatedSection>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/50">
                <span>MB / ABOUT / 001</span>
                <span className="flex items-center gap-2"><Signal className="h-3.5 w-3.5 text-[#67c9c7]" /> Systems online</span>
              </div>
            </div>
          </section>

          <section className="grid gap-12 border-b border-border py-20 md:py-28 lg:grid-cols-[0.75fr_1.25fr]">
            <AnimatedSection>
              <p className="mb-caption text-primary">Our orientation</p>
              <div className="mt-5 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                Zimbabwe → wider world
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">
                People are the point. Technology is the system around them.
              </h2>
              <div className="mt-8 grid gap-6 text-base leading-8 text-muted-foreground md:grid-cols-2 md:text-lg">
                <p>We start with human needs and real operating conditions. Only then do we choose the software, intelligence, or hardware that can help.</p>
                <p>Our work is expanding, but the principle stays fixed: create technology that is understandable, dependable, and resilient beyond a controlled demonstration.</p>
              </div>
            </AnimatedSection>
          </section>

          <section className="py-20 md:py-28" aria-labelledby="capability-stack">
            <AnimatedSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-caption text-primary">Capability stack / 01—04</p>
                <h2 id="capability-stack" className="mt-4 font-display text-4xl font-semibold tracking-[-0.045em] text-foreground md:text-6xl">
                  One company. Four connected layers.
                </h2>
              </div>
              <p className="max-w-sm text-base leading-7 text-muted-foreground md:text-right">Each layer expands what we can build. Together, they turn information into governed action.</p>
            </AnimatedSection>

            <div className="relative mt-14 grid gap-4 lg:grid-cols-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent lg:block" />
              {evolution.map((item, index) => {
                const Icon = item.icon;
                return (
                  <AnimatedSection key={item.title} delay={index * 80}>
                    <article className="group relative min-h-[20rem] overflow-hidden rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[var(--shadow-overlay)]">
                      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-primary/10 transition-transform duration-500 group-hover:scale-110" />
                      <div className="relative flex items-center justify-between">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/25 bg-secondary text-primary">
                          <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span className="font-mono text-xs font-semibold text-primary">{item.code}</span>
                      </div>
                      <div className="relative mt-16">
                        <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-foreground">{item.title}</h3>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.detail}</p>
                      </div>
                    </article>
                  </AnimatedSection>
                );
              })}
            </div>
          </section>

          <section className="overflow-hidden rounded-[2rem] border border-border bg-[#f7faf9] md:rounded-[2.5rem]">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative overflow-hidden bg-[#0a1516] p-8 text-white md:p-12">
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(103,201,199,0.32)_1px,transparent_1px)] [background-size:22px_22px]" />
                <AnimatedSection className="relative z-10 flex h-full min-h-[28rem] flex-col justify-between">
                  <div>
                    <Binary className="h-8 w-8 text-[#67c9c7]" strokeWidth={1.4} aria-hidden="true" />
                    <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#8bd8d6]">Operating logic</p>
                    <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-5xl">How we decide what deserves to be built.</h2>
                  </div>
                  <p className="mt-10 max-w-sm text-base leading-7 text-white/65">A technology earns its place when it improves the complete system—not merely one impressive moment inside it.</p>
                </AnimatedSection>
              </div>

              <div className="divide-y divide-border">
                {operatingPrinciples.map((principle, index) => {
                  const Icon = principle.icon;
                  return (
                    <AnimatedSection key={principle.code} delay={index * 80}>
                      <article className="grid gap-6 p-7 md:grid-cols-[auto_1fr] md:p-10">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-white text-primary shadow-[var(--shadow-card)]">
                          <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">0{index + 1} / {principle.code}</p>
                          <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.035em] text-foreground">{principle.title}</h3>
                          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">{principle.detail}</p>
                        </div>
                      </article>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mt-20 flex flex-col justify-between gap-10 border-t border-border pt-14 md:mt-28 md:flex-row md:items-end md:pt-20">
            <AnimatedSection>
              <p className="mb-caption text-primary">Next connection</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.03] tracking-[-0.045em] text-foreground md:text-6xl">
                Bring us a problem worth engineering around.
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <Link to="/contact" className="button-primary whitespace-nowrap">
                Request Systems Brief
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </AnimatedSection>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
};

export default About;
