import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    number: "01",
    title: "Custom Software",
    short: "Built for you.",
    description:
      "We design and engineer systems tailored to your exact workflows — not generic tools that force you to adapt to them. From internal platforms to customer-facing products.",
    features: ["Web & mobile apps", "Internal tools", "API integrations", "Database architecture"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 18l-4 4 4 4M27 18l4 4-4 4M22 14l-4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Automation",
    short: "Remove the friction.",
    description:
      "We identify the manual, repetitive processes eating your team's time and replace them with intelligent automation — so your people can focus on work that actually matters.",
    features: ["Workflow automation", "Data pipelines", "Scheduled tasks", "System triggers"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 4v4M20 32v4M4 20h4M32 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.58 8.58l2.83 2.83M28.59 28.59l2.83 2.83M8.58 31.42l2.83-2.83M28.59 11.41l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Applied AI",
    short: "Intelligence, grounded.",
    description:
      "Not AI for the sake of it — AI that solves real problems. We build LLM-powered tools, predictive systems, and intelligent agents that deliver measurable business outcomes.",
    features: ["LLM integrations", "Predictive analytics", "AI assistants", "Document intelligence"],
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 6C12.268 6 6 12.268 6 20s6.268 14 14 14 14-6.268 14-14S27.732 6 20 6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 20c0-2.761 2.239-5 5-5s5 2.239 5 5-2.239 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 15v-4M20 29v-4M26 20h3M11 20h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

const SolutionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.12,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <p className="mb-4 font-display text-[0.68rem] tracking-[0.28em] uppercase text-primary/70">
            What We Build
          </p>
          <h2
            ref={headlineRef}
            className="font-display text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground max-w-2xl mx-auto"
          >
            Three pillars.{" "}
            <span className="text-gradient-accent">One integrated approach.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.number}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="group relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-7 md:p-8 transition-all duration-500 hover:border-primary/30 hover:bg-card/60 hover:-translate-y-2 hover:shadow-[0_20px_60px_hsl(202_89%_37%/0.15)] cursor-default"
            >
              {/* Number */}
              <span className="font-display text-[0.65rem] tracking-[0.28em] uppercase text-primary/40 mb-5 block">
                {pillar.number}
              </span>

              {/* Icon */}
              <div className="mb-5 w-12 h-12 rounded-xl border border-border/60 bg-background/60 flex items-center justify-center text-primary/70 group-hover:text-primary group-hover:border-primary/30 transition-colors duration-300">
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl tracking-[0.02em] text-foreground mb-1">
                {pillar.title}
              </h3>
              <p className="text-primary/70 text-sm font-light mb-4">{pillar.short}</p>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                {pillar.description}
              </p>

              {/* Feature list */}
              <ul className="space-y-2">
                {pillar.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
