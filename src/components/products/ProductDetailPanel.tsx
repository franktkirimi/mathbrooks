import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ProductEntry } from "@/content/siteContent";

interface Props {
  product: ProductEntry;
  onBack: () => void;
  onDecide: () => void;
}

export const ProductDetailPanel = ({ product, onBack, onDecide }: Props) => {
  const panelRef  = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const Icon = product.icon;

  // Entrance: expand from center
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(panelRef.current,
        { opacity: 0, scale: 0.96, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "power3.out" }
      );
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".detail-row"),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.25 }
      );
    });
    return () => ctx.revert();
  }, [product.slug]);

  const handleDecide = () => {
    gsap.to(panelRef.current, {
      opacity: 0, scale: 0.97, y: -20,
      duration: 0.45, ease: "power3.in",
      onComplete: onDecide,
    });
  };

  const handleBack = () => {
    gsap.to(panelRef.current, {
      opacity: 0, scale: 0.97, y: 20,
      duration: 0.4, ease: "power3.in",
      onComplete: onBack,
    });
  };

  return (
    <div
      ref={panelRef}
      className="w-full max-w-3xl mx-auto px-6"
      style={{ opacity: 0 }}
    >
      {/* Back */}
      <button
        type="button"
        onClick={handleBack}
        className="mb-7 inline-flex items-center gap-2 font-display text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
      >
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
          <path d="M10 6H2M6 10L2 6l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All systems
      </button>

      {/* Panel */}
      <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md overflow-hidden">
        {/* Header band */}
        <div className="flex items-center gap-4 px-7 py-6 border-b border-border/30 bg-background/30">
          <div className="w-12 h-12 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-display text-[0.62rem] tracking-[0.22em] uppercase text-primary/60 mb-0.5">
              {product.family}
            </p>
            <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-foreground">
              {product.name}
            </h2>
          </div>
          <div className="ml-auto hidden sm:block text-right">
            <p className="font-display text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground mb-0.5">
              Starting at
            </p>
            <p className="font-display text-lg text-foreground">{product.startingPrice}</p>
          </div>
        </div>

        <div ref={contentRef} className="px-7 py-7 space-y-7">
          {/* Tagline */}
          <div className="detail-row" style={{ opacity: 0 }}>
            <p className="text-base font-light text-muted-foreground leading-relaxed max-w-xl">
              {product.tagline}
            </p>
          </div>

          {/* Problem → solution */}
          <div className="detail-row rounded-xl border border-border/25 bg-background/40 p-5" style={{ opacity: 0 }}>
            <p className="font-display text-[0.62rem] tracking-[0.2em] uppercase text-primary/60 mb-2">
              The Problem
            </p>
            <p className="text-sm font-light text-muted-foreground leading-6">{product.problem}</p>
          </div>

          {/* Key capabilities */}
          <div className="detail-row" style={{ opacity: 0 }}>
            <p className="font-display text-[0.62rem] tracking-[0.2em] uppercase text-primary/60 mb-4">
              Key Capabilities
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {product.features.slice(0, 4).map((feat) => (
                <div key={feat.title} className="rounded-xl border border-border/20 bg-background/30 px-4 py-3.5">
                  <p className="text-sm font-semibold font-display tracking-[-0.01em] text-foreground mb-1">
                    {feat.title}
                  </p>
                  <p className="text-xs font-light text-muted-foreground leading-5">{feat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics strip */}
          {product.metrics.length > 0 && (
            <div className="detail-row flex flex-wrap gap-4" style={{ opacity: 0 }}>
              {product.metrics.map((m) => (
                <div key={m.label} className="flex-1 min-w-[120px] rounded-xl border border-border/20 bg-background/30 px-4 py-3 text-center">
                  <p className="font-display text-lg font-semibold text-primary">{m.value}</p>
                  <p className="font-display text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground mt-0.5">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Audience */}
          <div className="detail-row" style={{ opacity: 0 }}>
            <p className="font-display text-[0.62rem] tracking-[0.2em] uppercase text-primary/60 mb-2">
              Built For
            </p>
            <p className="text-sm font-light text-muted-foreground">{product.audience}</p>
          </div>

          {/* CTA */}
          <div className="detail-row flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2" style={{ opacity: 0 }}>
            <button
              type="button"
              onClick={handleDecide}
              className="flex-1 sm:flex-none rounded-xl bg-primary px-8 py-3.5 font-display text-sm tracking-[0.1em] uppercase text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(202_89%_69%/0.35)]"
            >
              Start Implementation
            </button>
            <a
              href="/contact"
              className="flex-1 sm:flex-none text-center rounded-xl border border-border/50 px-8 py-3.5 font-display text-sm tracking-[0.1em] uppercase text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground"
            >
              Talk to MathBrooks
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
