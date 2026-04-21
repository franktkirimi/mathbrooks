import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAOS_NODES = [
  { id: "A", label: "Sales spreadsheet", x: "12%", y: "18%", delay: 0 },
  { id: "B", label: "Manual invoicing", x: "68%", y: "10%", delay: 0.08 },
  { id: "C", label: "WhatsApp orders", x: "38%", y: "32%", delay: 0.12 },
  { id: "D", label: "Duplicate data", x: "78%", y: "52%", delay: 0.06 },
  { id: "E", label: "Lost follow-ups", x: "8%", y: "62%", delay: 0.15 },
  { id: "F", label: "Email threads", x: "52%", y: "72%", delay: 0.04 },
  { id: "G", label: "No reporting", x: "28%", y: "82%", delay: 0.1 },
];

const PAIN_POINTS = [
  "Hours lost to manual data entry every week",
  "No single source of truth for your business",
  "Decisions made on gut feel, not real data",
  "Systems that don't talk to each other",
];

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const painRef = useRef<(HTMLLIElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline scrub reveal
      gsap.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      // Chaos nodes: enter scattered
      nodesRef.current.forEach((el, i) => {
        if (!el) return;
        const node = CHAOS_NODES[i];
        gsap.set(el, { opacity: 0, scale: 0.6, rotation: gsap.utils.random(-18, 18) });

        gsap.to(el, {
          opacity: 1,
          scale: 1,
          rotation: gsap.utils.random(-8, 8),
          duration: 0.65,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
          delay: node.delay,
        });
      });

      // SVG lines pulse in
      if (svgRef.current) {
        const lines = svgRef.current.querySelectorAll("line");
        gsap.set(lines, { opacity: 0, strokeDashoffset: 200 });
        gsap.to(lines, {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
          delay: 0.4,
        });
      }

      // Pain points stagger in
      gsap.from(painRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: painRef.current[0],
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 overflow-hidden"
    >
      {/* Subtle top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Headline + pain points */}
        <div>
          <p className="mb-4 font-display text-[0.68rem] tracking-[0.28em] uppercase text-primary/70">
            The Problem
          </p>
          <h2
            ref={headlineRef}
            className="font-display text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground mb-8"
          >
            Most businesses don't lack effort.{" "}
            <span className="text-gradient-accent">They lack systems.</span>
          </h2>

          <p className="text-muted-foreground font-light leading-relaxed mb-10 max-w-md">
            Your team is working hard. But without the right infrastructure, effort
            doesn't compound — it dissipates. Every manual process is a leak in your
            growth engine.
          </p>

          <ul className="space-y-4">
            {PAIN_POINTS.map((point, i) => (
              <li
                key={point}
                ref={(el) => { painRef.current[i] = el; }}
                className="flex items-start gap-3 group"
              >
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 10 10" fill="none">
                    <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Chaos visualization */}
        <div className="relative h-[340px] md:h-[420px] select-none">
          {/* SVG connector lines */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <style>{`line { stroke-dasharray: 200; }`}</style>
            </defs>
            <line x1="15" y1="20" x2="40" y2="34" stroke="hsl(202 89% 69% / 0.18)" strokeWidth="0.4" />
            <line x1="70" y1="12" x2="40" y2="34" stroke="hsl(202 89% 69% / 0.18)" strokeWidth="0.4" />
            <line x1="40" y1="34" x2="80" y2="54" stroke="hsl(202 89% 69% / 0.18)" strokeWidth="0.4" />
            <line x1="10" y1="64" x2="40" y2="34" stroke="hsl(202 89% 69% / 0.12)" strokeWidth="0.4" />
            <line x1="55" y1="74" x2="80" y2="54" stroke="hsl(202 89% 69% / 0.12)" strokeWidth="0.4" />
            <line x1="30" y1="84" x2="55" y2="74" stroke="hsl(202 89% 69% / 0.1)" strokeWidth="0.4" />
            <line x1="10" y1="64" x2="30" y2="84" stroke="hsl(202 89% 69% / 0.1)" strokeWidth="0.4" />
          </svg>

          {/* Chaos nodes */}
          {CHAOS_NODES.map((node, i) => (
            <div
              key={node.id}
              ref={(el) => { nodesRef.current[i] = el; }}
              className="absolute flex items-center gap-2 rounded-lg border border-border/50 bg-card/60 backdrop-blur-sm px-3 py-2 text-xs font-mono text-muted-foreground"
              style={{ left: node.x, top: node.y }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/70 flex-shrink-0" />
              {node.label}
            </div>
          ))}

          {/* Central "chaos" label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-red-500/20 bg-red-500/5 flex items-center justify-center">
            <span className="font-display text-[0.6rem] tracking-[0.15em] uppercase text-red-400/60 text-center leading-tight">
              no<br />system
            </span>
          </div>

          {/* Noise overlay for chaotic feel */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, hsl(var(--background) / 0.5) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
