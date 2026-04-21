import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import type { ProductEntry, ProductSlug } from "@/content/siteContent";
import { products } from "@/content/siteContent";
import type { Intent } from "./IntentSelector";
import { INTENTS } from "./IntentSelector";

const productLookup = new Map(products.map((p) => [p.slug, p]));

const INTENT_SLUGS: Record<string, ProductSlug[]> = {
  "reduce-manual-work":  ["automation", "ai-assistant"],
  "improve-visibility":  ["analytics",  "crm"],
  "scale-operations":    ["hr",          "projects"],
  "automate-workflows":  ["automation",  "projects"],
  "enhance-decisions":   ["analytics",   "ai-assistant"],
};

interface Props {
  intentId: string;
  onSelect: (product: ProductEntry) => void;
  onBack: () => void;
}

export const ProductReveal = ({ intentId, onSelect, onBack }: Props) => {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const intent = INTENTS.find((i: Intent) => i.id === intentId);
  const slugs  = INTENT_SLUGS[intentId] ?? [];
  const revealed: ProductEntry[] = slugs
    .map((s) => productLookup.get(s))
    .filter(Boolean) as ProductEntry[];

  // Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(cardRefs.current,
        { opacity: 0, y: 48, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.15 }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, [intentId]);

  const handleSelect = (product: ProductEntry, idx: number) => {
    cardRefs.current.forEach((c, i) => {
      if (!c) return;
      gsap.to(c, i === idx
        ? { scale: 1.02, duration: 0.15 }
        : { opacity: 0, scale: 0.93, duration: 0.3, ease: "power2.in" }
      );
    });
    gsap.to(headerRef.current, { opacity: 0, y: -16, duration: 0.3, ease: "power2.in" });
    setTimeout(() => onSelect(product), 360);
  };

  return (
    <div ref={wrapRef} className="w-full max-w-4xl mx-auto px-6">
      {/* Header */}
      <div ref={headerRef} className="text-center mb-10" style={{ opacity: 0 }}>
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 font-display text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M10 6H2M6 10L2 6l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Change intent
        </button>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5">
          <span className="font-display text-[0.65rem] tracking-[0.24em] uppercase text-primary/70">
            {intent?.label ?? intentId}
          </span>
        </div>

        <p className="font-display text-[0.68rem] tracking-[0.28em] uppercase text-primary/50 mb-2">
          Step 02 — System Match
        </p>
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-2">
          Systems matched to your need.
        </h2>
        <p className="text-sm text-muted-foreground font-light max-w-sm mx-auto">
          Select a system to explore how it works.
        </p>
      </div>

      {/* Product cards */}
      <div className={`grid gap-5 ${revealed.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {revealed.map((product, idx) => {
          const Icon = product.icon;
          return (
            <div
              key={product.slug}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className="group relative rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-7 flex flex-col cursor-pointer transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:-translate-y-1.5 hover:shadow-[0_12px_50px_hsl(202_89%_37%/0.2)]"
              style={{ opacity: 0 }}
              onClick={() => handleSelect(product, idx)}
            >
              {/* Family label */}
              <p className="font-display text-[0.62rem] tracking-[0.22em] uppercase text-primary/50 mb-4">
                {product.family}
              </p>

              {/* Icon + name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl border border-border/50 bg-background/60 flex items-center justify-center text-primary/70 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-foreground">
                  {product.shortName}
                </h3>
              </div>

              {/* Tagline */}
              <p className="text-sm font-light text-muted-foreground leading-relaxed flex-1 mb-6">
                {product.tagline}
              </p>

              {/* Audience */}
              <div className="mb-6 rounded-xl border border-border/20 bg-background/40 px-4 py-3">
                <p className="font-display text-[0.6rem] tracking-[0.18em] uppercase text-primary/50 mb-1">
                  Built for
                </p>
                <p className="text-xs font-light text-muted-foreground leading-5">
                  {product.audience}
                </p>
              </div>

              {/* CTA row */}
              <div className="flex items-center justify-between mt-auto">
                <span className="font-display text-[0.68rem] tracking-[0.15em] uppercase text-primary group-hover:text-primary transition-colors duration-200">
                  View System →
                </span>
                <Link
                  to={`/contact`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Talk to us
                </Link>
              </div>

              <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
