import { useEffect, useRef } from "react";
import gsap from "gsap";
import { products } from "@/content/siteContent";

export const ProductPreviewStrip = () => {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );

    const track = trackRef.current;
    if (!track) return;

    // Animate exactly one copy-width so the loop is seamless
    const halfWidth = track.scrollWidth / 2;
    tweenRef.current = gsap.to(track, {
      x: -halfWidth,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    return () => { tweenRef.current?.kill(); };
  }, []);

  const pause = () => tweenRef.current?.pause();
  const play  = () => tweenRef.current?.play();

  // Duplicate for seamless loop
  const doubled = [...products, ...products];

  return (
    <div ref={wrapRef} className="w-full mb-10" style={{ opacity: 0 }}>
      {/* Label */}
      <p className="text-center font-display text-[0.62rem] tracking-[0.28em] uppercase text-primary/45 mb-5">
        {String(products.length).padStart(2, "0")} systems available
      </p>

      {/* Fade masks on edges */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24"
          style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24"
          style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
        />

        <div
          className="overflow-hidden"
          onMouseEnter={pause}
          onMouseLeave={play}
        >
          <div ref={trackRef} className="flex gap-3 w-max">
            {doubled.map((product, i) => {
              const Icon = product.icon;
              return (
                <div
                  key={`${product.slug}-${i}`}
                  className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 backdrop-blur-sm px-4 py-3 shrink-0 select-none"
                >
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-foreground/50">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-display text-[0.78rem] font-semibold tracking-[-0.01em] text-foreground/70 leading-none mb-1">
                      {product.shortName}
                    </p>
                    <p className="font-display text-[0.55rem] tracking-[0.16em] uppercase text-foreground/30 leading-none">
                      {product.family}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
