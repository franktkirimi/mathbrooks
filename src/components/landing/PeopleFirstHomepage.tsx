import { ArrowRight, BrainCircuit, Cable, Cpu, Database, Sparkles, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import LazyIndustryOrbit from "@/components/LazyIndustryOrbit";
import { Button } from "@/components/ui/button";
import { industries, technologyTools } from "@/content/ecosystemContent";
import { toast } from "@/hooks/use-toast";

const capabilityIcons = [BrainCircuit, Workflow, Cpu, Database, Sparkles, Cable];

const PeopleFirstHomepage = () => (
  <>
    <section className="relative isolate min-h-[min(760px,100svh)] overflow-hidden bg-background px-5 py-28 text-foreground sm:px-6 md:py-36 lg:py-0">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 62% 0%, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex min-h-[calc(min(760px,100svh)-14rem)] max-w-7xl items-center lg:min-h-screen">
        <AnimatedSection className="max-w-3xl">
          <h1 className="font-display text-[clamp(3.15rem,9vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-foreground">Technology built around <span className="text-primary">people.</span></h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-7 text-muted-foreground sm:text-xl sm:leading-9 md:mt-8 md:text-2xl">MathBrooks builds intelligent technology for the real world.</p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"><Button asChild size="lg" className="w-full sm:w-auto"><a href="#what-we-build">Explore what we build <ArrowRight /></a></Button><Button asChild variant="outline" size="lg" className="w-full sm:w-auto"><a href="#technology">Our technology</a></Button></div>
        </AnimatedSection>
      </div>
    </section>

    <section id="what-we-build" className="px-5 py-20 sm:px-6 md:py-28 lg:py-36">
      <div className="mx-auto grid max-w-6xl gap-10 lg:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-5xl md:text-7xl">Built to solve the problems holding you back.</h2>
          <div className="mt-7 max-w-xl text-base font-light leading-8 text-muted-foreground md:text-lg"><p>If your organisation has a real-world challenge or a project that needs to work better, we begin by understanding what is at stake.</p></div>
          <Button asChild size="lg" className="mt-9"><Link to="/contact">Start a conversation <ArrowRight /></Link></Button>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <div className="relative min-h-[350px] overflow-hidden rounded-xl bg-[hsl(var(--signal-9))] p-4 shadow-overlay sm:min-h-[460px] sm:p-7">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,hsl(var(--signal-1)/0.9),transparent_34%),radial-gradient(circle_at_82%_10%,hsl(var(--signal-12)/0.84),transparent_40%),linear-gradient(125deg,hsl(var(--signal-2))_0%,hsl(var(--signal-9))_48%,hsl(var(--signal-6))_100%)]" />
            <span aria-hidden="true" className="absolute left-2 top-2 size-5 bg-white sm:left-5 sm:top-5" /><span aria-hidden="true" className="absolute bottom-2 right-2 size-5 bg-white sm:bottom-5 sm:right-5" />
            <div className="relative mx-auto mt-6 max-w-[38rem] rounded-xl border border-white/65 bg-white/95 p-5 shadow-overlay sm:mt-12 sm:p-8">
              <div className="flex items-center justify-between border-b border-black/8 pb-5"><div className="flex gap-2"><span className="size-3 rounded-full bg-[#ff605c]" /><span className="size-3 rounded-full bg-[#ffbd44]" /><span className="size-3 rounded-full bg-[#00ca4e]" /></div><span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Project brief · 01</span></div>
              <div className="pt-6 sm:pt-8"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">The starting point</p><h3 className="mt-3 font-display text-2xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-4xl">What needs to work better?</h3><div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">{["The people who rely on it.", "The real conditions around it.", "The outcome that would make a difference."].map((line, index) => <div key={line} className="flex gap-4 border-t border-black/10 pt-3 sm:pt-4"><span className="font-display text-xs tracking-[0.12em] text-primary">0{index + 1}</span><p className="text-sm font-medium text-foreground">{line}</p></div>)}</div></div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section id="industries" className="relative isolate overflow-hidden px-6 py-28 md:py-36"><LazyIndustryOrbit /><div className="relative mx-auto max-w-6xl"><AnimatedSection className="max-w-3xl"><h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">Technology for the real world.</h2></AnimatedSection><div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 justify-items-center gap-x-5 gap-y-8 sm:grid-cols-3">{industries.map((industry, index) => <AnimatedSection key={industry.name} delay={index * 50}>{industry.href ? <a href={industry.href} className="group flex size-32 items-center justify-center rounded-full border border-border bg-card/90 p-5 text-center shadow-[0_12px_32px_hsl(var(--foreground)/0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-primary hover:bg-card hover:shadow-[0_18px_40px_hsl(var(--primary)/0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 sm:size-36 md:size-40" aria-label={`View ${industry.name} prototype`}><span className="font-body text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">{industry.name}</span></a> : <button type="button" onClick={() => toast({ title: `${industry.name} prototype`, description: "This prototype is coming soon." })} className="group flex size-32 items-center justify-center rounded-full border border-border bg-card/90 p-5 text-center shadow-[0_12px_32px_hsl(var(--foreground)/0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-primary hover:bg-card hover:shadow-[0_18px_40px_hsl(var(--primary)/0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 sm:size-36 md:size-40" aria-label={`${industry.name} prototype coming soon`}><span className="font-body text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">{industry.name}</span></button>}</AnimatedSection>)}</div></div></section>

    <section id="technology" className="px-6 py-28 md:py-36"><div className="mx-auto max-w-6xl"><AnimatedSection className="max-w-3xl"><h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">The technology behind the work.</h2><p className="mt-5 text-lg font-light leading-8 text-muted-foreground">We combine these tools according to the problem being solved—not because any one of them is the point.</p></AnimatedSection><div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{technologyTools.map((tool, index) => { const Icon = capabilityIcons[index]; return <div key={tool} className="bg-card p-7"><Icon className="h-6 w-6 text-[hsl(var(--teal))]" /><h3 className="mt-8 font-display text-2xl font-bold tracking-[-0.02em] text-foreground">{tool}</h3><p className="mt-3 text-sm font-light leading-7 text-muted-foreground">A practical part of the system, selected because it can help people do more.</p></div>; })}</div></div></section>

    <section className="bg-foreground px-6 py-28 text-white md:py-36"><div className="mx-auto max-w-6xl"><AnimatedSection><h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-6xl">One ecosystem. Built from the real world out.</h2><div className="mt-12 grid gap-4 md:grid-cols-5">{["People & real-world problems", "MathBrooks", "AI · software · computing · connected technology", "Products", "Real-world applications"].map((item, index) => <div key={item} className="border-t border-white/30 pt-4"><span className="text-xs text-white/50">0{index + 1}</span><p className="mt-3 text-sm leading-6">{item}</p></div>)}</div><div className="mt-10 flex flex-wrap gap-4"><Button asChild><Link to="/about">Our approach <ArrowRight /></Link></Button><Link to="/contact" className="inline-flex items-center gap-2 px-5 py-3 text-sm text-white hover:underline">Talk to MathBrooks <ArrowRight className="h-4 w-4" /></Link></div></AnimatedSection></div></section>
  </>
);

export default PeopleFirstHomepage;
