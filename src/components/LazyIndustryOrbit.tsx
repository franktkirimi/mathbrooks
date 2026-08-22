import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const IndustryOrbit = lazy(() => import("./IndustryOrbit"));

const LazyIndustryOrbit = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_52%,hsl(var(--primary)/0.07),transparent_34%)]" />
      {shouldLoad ? <Suspense fallback={null}><IndustryOrbit /></Suspense> : null}
    </div>
  );
};

export default LazyIndustryOrbit;
