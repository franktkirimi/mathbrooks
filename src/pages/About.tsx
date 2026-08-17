import { ArrowRight, BrainCircuit, Cable, Cpu, HeartHandshake, MonitorCog } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/usePageMeta";

const evolution = [
  { title: "Software", detail: "Building useful digital systems people can use.", icon: MonitorCog },
  { title: "Applied AI", detail: "Making those systems more intelligent where it is genuinely helpful.", icon: BrainCircuit },
  { title: "Computing", detail: "Exploring new forms of accessible intelligence.", icon: Cpu },
  { title: "Connected technology", detail: "Bringing intelligence closer to the physical world.", icon: Cable },
];

const About = () => {
  usePageMeta({
    title: "About | MathBrooks",
    description: "MathBrooks is a people-first technology company building practical intelligent systems for the real world.",
    canonicalPath: "/about",
    keywords: ["MathBrooks", "people-first technology", "intelligent systems", "connected technology"],
  });

  return (
    <SiteLayout>
      <section className="px-6 pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="max-w-4xl">
            <HeartHandshake className="h-9 w-9 text-[hsl(var(--teal))]" />
            <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground md:text-6xl">We are builders first.</h1>
            <p className="mt-7 max-w-3xl text-lg font-light leading-8 text-muted-foreground md:text-xl">MathBrooks believes technology is most valuable when it improves people’s ability to live, work, learn, create, and solve problems.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-card px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <AnimatedSection><h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl">People first. Technology in service of what matters.</h2></AnimatedSection>
          <AnimatedSection delay={100} className="space-y-5 text-base font-light leading-8 text-muted-foreground md:text-lg"><p>We start with human needs and real-world problems. Only then do we choose the technology that can help.</p><p>That is why MathBrooks is growing from useful digital systems into applied AI, computing, and connected technology. It is an evolution of the same idea—not a reinvention.</p><p>Our standard remains simple: build technology that works for people in the real world.</p></AnimatedSection>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl"><AnimatedSection className="max-w-3xl"><h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl">How MathBrooks is evolving.</h2><p className="mt-5 text-lg font-light leading-8 text-muted-foreground">Each layer expands what we can build, while keeping people and practical impact at the center.</p></AnimatedSection>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">{evolution.map((item, index) => { const Icon = item.icon; return <AnimatedSection key={item.title} delay={index * 90}><article className="min-h-[225px] bg-card p-7"><Icon className="h-7 w-7 text-[hsl(var(--teal))]" /><h3 className="mt-8 font-display text-2xl font-bold tracking-[-0.02em] text-foreground">{item.title}</h3><p className="mt-4 text-sm font-light leading-7 text-muted-foreground">{item.detail}</p></article></AnimatedSection>; })}</div>
        </div>
      </section>

      <section className="bg-foreground px-6 py-20 text-white md:py-28"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-end"><AnimatedSection><h2 className="max-w-3xl font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl">We start with people. We find problems worth solving. We build technology that works.</h2></AnimatedSection><AnimatedSection delay={100}><Button asChild><Link to="/contact">Talk to MathBrooks <ArrowRight /></Link></Button></AnimatedSection></div></section>
    </SiteLayout>
  );
};

export default About;
