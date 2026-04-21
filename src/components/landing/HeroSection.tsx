import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const CHAOS_ELEMENTS = [
  { w: 140, h: 36, label: "process_error.log", col: "bg-red-500/10 border-red-500/30 text-red-400" },
  { w: 180, h: 36, label: "data_sync_pending", col: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" },
  { w: 160, h: 36, label: "report_draft_v7", col: "bg-primary/10 border-primary/30 text-primary" },
  { w: 120, h: 36, label: "invoice_missed", col: "bg-red-500/10 border-red-500/30 text-red-400/80" },
  { w: 200, h: 36, label: "workflow_manual.xlsx", col: "bg-primary/10 border-primary/30 text-primary/70" },
  { w: 150, h: 36, label: "hr_export_final", col: "bg-green-500/10 border-green-500/30 text-green-400" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chaosRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Phase 1: chips scatter chaotically on entry
      chipRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          x: gsap.utils.random(-160, 160),
          y: gsap.utils.random(-80, 80),
          rotation: gsap.utils.random(-25, 25),
          opacity: 0,
          scale: 0.75,
        });
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.1 + i * 0.07,
          ease: "back.out(1.4)",
        });
      });

      // Phase 2: after 1.4s, align chips into orderly rows
      gsap.delayedCall(1.4, () => {
        chipRefs.current.forEach((el, i) => {
          if (!el) return;
          const col = i % 2;
          const row = Math.floor(i / 2);
          gsap.to(el, {
            x: col === 0 ? -96 : 96,
            y: (row - 1) * 52,
            rotation: 0,
            opacity: 0.7,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.06,
          });
        });
      });

      // Headline words animate in
      const words = headlineRef.current?.querySelectorAll("span.word");
      if (words) {
        gsap.from(Array.from(words), {
          y: 60,
          opacity: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power4.out",
          delay: 0.3,
        });
      }

      gsap.from(subRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.95,
      });

      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = "We turn complexity into systems that work.";
  const words = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground) / 0.025) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground) / 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />
      {/* Radial vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, hsl(var(--background) / 0.9) 100%)",
        }}
      />
      {/* Accent glow orb */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(202 89% 37% / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Chaos → order visual (right side on lg, centered on mobile) */}
      <div
        ref={chaosRef}
        aria-hidden="true"
        className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center gap-0 w-80 h-80 pointer-events-none select-none"
      >
        {CHAOS_ELEMENTS.map((chip, i) => (
          <div
            key={chip.label}
            ref={(el) => { chipRefs.current[i] = el; }}
            className={`absolute flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-mono tracking-wide ${chip.col}`}
            style={{ width: chip.w }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
            {chip.label}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-display text-[0.7rem] tracking-[0.22em] uppercase text-primary/80">
            Harare, Zimbabwe · Est. 2020
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display text-[2.6rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[4.8rem] xl:text-[5.4rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground mb-6 overflow-hidden"
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="word inline-block mr-[0.22em]"
              style={
                word === "systems" || word === "work."
                  ? {
                      background: "linear-gradient(135deg, hsl(202 89% 69%) 0%, hsl(191 74% 78%) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }
                  : undefined
              }
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mx-auto mb-10"
        >
          Software. Automation. AI.{" "}
          <span className="text-foreground/80">Built for real-world impact.</span>
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-display text-sm tracking-[0.08em] uppercase text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_40px_hsl(202_89%_69%/0.35)] hover:-translate-y-0.5"
          >
            Start a Project
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/30 px-8 py-4 font-display text-sm tracking-[0.08em] uppercase text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:text-foreground hover:-translate-y-0.5"
          >
            See Our Work
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
          <span className="font-display text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
