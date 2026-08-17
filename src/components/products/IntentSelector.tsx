import { useEffect, useRef } from "react";
import gsap from "gsap";
import { INTENTS } from "./intents";

interface Props {
  onSelect: (intentId: string) => void;
}

export const IntentSelector = ({ onSelect }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current?.querySelector(".intent-header"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSelect = (id: string, index: number) => {
    // Fade out unselected, pulse selected
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      if (i === index) {
        gsap.to(card, { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.inOut" });
      } else {
        gsap.to(card, { opacity: 0, scale: 0.94, y: -8, duration: 0.35, ease: "power2.in" });
      }
    });
    gsap.to(wrapRef.current?.querySelector(".intent-header"), {
      opacity: 0, y: -12, duration: 0.35, ease: "power2.in",
    });

    setTimeout(() => onSelect(id), 420);
  };

  return (
    <div ref={wrapRef} className="w-full max-w-5xl mx-auto px-6">
      <div className="intent-header text-center mb-10">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-foreground">
          Where is your operational pressure?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTENTS.map((intent, i) => (
          <button
            key={intent.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            type="button"
            onClick={() => handleSelect(intent.id, i)}
            className="product-card group relative text-left rounded-2xl border p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            style={{ opacity: 0 }}
          >
            {/* Icon */}
            <div className="mb-4 w-11 h-11 rounded-xl border border-border flex items-center justify-center text-[hsl(var(--teal))] group-hover:border-[hsl(var(--teal))] transition-colors duration-300">
              {intent.icon}
            </div>

            <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-foreground mb-2">
              {intent.label}
            </h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              {intent.description}
            </p>

            {/* Hover arrow */}
            <div className="mt-5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-display text-[0.65rem] tracking-[0.2em] uppercase text-[hsl(var(--teal))]">
                Select
              </span>
              <svg className="w-3 h-3 text-[hsl(var(--teal))] translate-x-0 group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

          </button>
        ))}
      </div>
    </div>
  );
};
