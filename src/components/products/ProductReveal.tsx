import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import type { ProductEntry, ProductSlug } from "@/content/siteContent";
import { getProductAccentTone, products } from "@/content/siteContent";
import { INTENTS, type Intent } from "./intents";

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
          className="mb-6 inline-flex items-center gap-2 font-display text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground hover:text-[hsl(var(--teal))] hover:underline transition-colors duration-200"
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M10 6H2M6 10L2 6l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Change intent
        </button>

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
          const accentClass =
            getProductAccentTone(product.slug) === "coral"
              ? "text-[hsl(var(--action))] hover:border-[hsl(var(--action))]"
              : "text-[hsl(var(--teal))] hover:border-[hsl(var(--teal))]";
          return (
            <div
              key={product.slug}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className="product-card group relative rounded-2xl border p-7 flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
              style={{ opacity: 0 }}
              onClick={() => handleSelect(product, idx)}
            >
              {/* Family label */}
              <p className={`font-display text-[0.62rem] tracking-[0.22em] uppercase mb-4 ${accentClass}`}>
                {product.shortName}
              </p>

              {/* Icon + name */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl border border-border flex items-center justify-center transition-colors duration-300 ${accentClass}`}>
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
              <div className="mb-6 border-t border-border pt-4">
                <p className={`font-display text-[0.6rem] tracking-[0.18em] uppercase mb-1 ${accentClass}`}>
                  Built for
                </p>
                <p className="text-xs font-light text-muted-foreground leading-5">
                  {product.audience}
                </p>
              </div>

              {/* CTA row */}
              <div className="flex items-center justify-between mt-auto border-t border-border pt-4">
                <span className={`font-display text-[0.68rem] tracking-[0.15em] uppercase hover:underline ${accentClass}`}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
