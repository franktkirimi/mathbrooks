import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import type { ProductEntry } from "@/content/siteContent";

interface Props {
  product: ProductEntry;
  onRestart: () => void;
}

export const DecisionCTA = ({ product, onRestart }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current?.querySelectorAll(".decision-line"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power3.out", delay: 0.1 }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
      {/* Confirmation badge */}
      <div className="decision-line mb-8 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/5 px-4 py-1.5" style={{ opacity: 0 }}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="font-display text-[0.65rem] tracking-[0.24em] uppercase text-green-400/80">
          System configured
        </span>
      </div>

      <h2
        className="decision-line font-display text-[1.9rem] sm:text-[2.6rem] md:text-[3.2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground mb-4"
        style={{ opacity: 0 }}
      >
        This system fits{" "}
        <span
          style={{
            background: "linear-gradient(135deg, hsl(202 89% 69%) 0%, hsl(191 74% 78%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          your need.
        </span>
      </h2>

      <p className="decision-line text-sm text-muted-foreground font-light max-w-sm mb-3 leading-relaxed" style={{ opacity: 0 }}>
        {product.shortName} — {product.tagline}
      </p>

      <p className="decision-line text-xs text-muted-foreground/50 font-light mb-12" style={{ opacity: 0 }}>
        Starting at {product.startingPrice}
      </p>

      <div className="decision-line flex flex-col sm:flex-row items-center gap-4" style={{ opacity: 0 }}>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-10 py-4 font-display text-sm tracking-[0.1em] uppercase text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_50px_hsl(202_89%_69%/0.45)] hover:-translate-y-0.5"
        >
          Start Implementation
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Link
          to="/contact"
          className="font-display text-sm tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          Talk to MathBrooks
        </Link>
      </div>

      {/* Restart */}
      <button
        type="button"
        onClick={onRestart}
        className="decision-line mt-12 font-display text-[0.62rem] tracking-[0.22em] uppercase text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-200"
        style={{ opacity: 0 }}
      >
        ← Configure a different system
      </button>
    </div>
  );
};
