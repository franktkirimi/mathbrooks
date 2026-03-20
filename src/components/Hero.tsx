import { useRef, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroScene = lazy(() => import("./HeroScene"));

// Magnetic wrapper — button drifts slightly toward cursor
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.38;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.38;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
};

const line1 = ["The", "Intelligence", "to", "Simplify"];
const line2 = ["Your", "Processes"];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Three.js neural network — lazy loaded, doesn't block paint */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          animation: "breatheGrid 8s ease-in-out infinite",
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Soft vignette so text stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, hsl(var(--background) / 0.6) 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Brand mark */}
        <div
          className="mb-8 md:mb-14"
          style={{ animation: "fadeInUp 0.8s ease-out both" }}
        >
          <span className="font-display text-xs tracking-[0.4em] text-muted-foreground uppercase">
            MathBrooks
          </span>
        </div>

        {/* Headline — cinematic word reveal */}
        <h1 className="font-display text-[2rem] sm:text-5xl md:text-7xl lg:text-[6rem] xl:text-[7.5rem] font-bold uppercase leading-[0.95] tracking-tight mb-6 md:mb-10">
          {/* Line 1 — gradient accent */}
          <div className="flex flex-wrap justify-center gap-x-[0.22em]">
            {line1.map((word, i) => (
              <div key={word} style={{ overflow: "hidden" }}>
                <span
                  className="inline-block text-gradient-accent glow-text"
                  style={{
                    animation: `wordReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.11}s both`,
                  }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
          {/* Line 2 — white */}
          <div className="flex flex-wrap justify-center gap-x-[0.22em] mt-[0.05em]">
            {line2.map((word, i) => (
              <div key={word} style={{ overflow: "hidden" }}>
                <span
                  className="inline-block"
                  style={{
                    animation: `wordReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${0.58 + i * 0.11}s both`,
                  }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
        </h1>

        {/* Subtext */}
        <p
          className="text-sm sm:text-base md:text-lg font-light text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-14"
          style={{ animation: "fadeInUp 0.8s ease-out 0.9s both" }}
        >
          We partner with operations-heavy teams to design, build, and deploy
          custom software, automation, and applied AI that solve real business
          problems.
        </p>

        {/* CTAs — magnetic */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: "fadeInUp 0.8s ease-out 1.1s both" }}
        >
          <Magnetic>
            <Button
              size="lg"
              className="font-display text-xs tracking-[0.15em] uppercase px-8 sm:px-10 py-5 sm:py-6 transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Discuss Your Project
            </Button>
          </Magnetic>
          <Magnetic>
            <a
              href="https://wa.me/263783469023?text=Hi%20MathBrooks%2C%20I%27d%20like%20to%20request%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 sm:px-10 py-5 sm:py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary transition-all duration-300"
              >
                Request Consultation
              </Button>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ animation: "fadeInUp 0.8s ease-out 1.4s both" }}
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground/60" />
      </div>
    </section>
  );
};

export default Hero;
