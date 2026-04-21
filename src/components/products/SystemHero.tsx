import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  onBegin: () => void;
}

export const SystemHero = ({ onBegin }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleBegin = () => {
    gsap.to(wrapRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.55,
      ease: "power3.in",
      onComplete: onBegin,
    });
  };

  return (
    <div ref={wrapRef} className="flex flex-col items-center text-center px-6 opacity-0">
      <h1 className="font-display text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.6rem] font-semibold leading-[1.06] tracking-[-0.03em] text-foreground mb-5 max-w-3xl">
        Let's configure{" "}
        <span
          style={{
            background: "linear-gradient(135deg, hsl(202 89% 69%) 0%, hsl(191 74% 78%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          your system.
        </span>
      </h1>

      <p className="text-base sm:text-lg text-muted-foreground font-light max-w-md leading-relaxed mb-12">
        Tell us where your operational pressure is — we'll surface the right solution.
      </p>

      <button
        type="button"
        onClick={handleBegin}
        className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 font-display text-sm tracking-[0.12em] uppercase text-primary-foreground transition-all duration-300 hover:shadow-[0_0_40px_hsl(202_89%_69%/0.5)] hover:-translate-y-0.5 active:translate-y-0"
      >
        Begin Configuration
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Scroll hint line */}
      <div className="mt-16 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
    </div>
  );
};
