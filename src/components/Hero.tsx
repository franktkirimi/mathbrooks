import { lazy, Suspense, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { businessPillars } from "@/content/siteContent";

const HeroScene = lazy(() => import("./HeroScene"));

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.38;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.38;
    element.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
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

const line1 = ["Run", "Your", "Business"];
const line2 = ["Built", "For", "Africa"];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

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

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, hsl(var(--background) / 0.6) 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mb-8 md:mb-14" style={{ animation: "fadeInUp 0.8s ease-out both" }}>
          <span className="font-display text-xs tracking-[0.4em] text-muted-foreground uppercase">
            MathBrooks · Harare, Zimbabwe
          </span>
        </div>

        <h1 className="font-display text-[2rem] sm:text-5xl md:text-7xl lg:text-[6rem] xl:text-[7.5rem] font-bold uppercase leading-[0.95] tracking-tight mb-6 md:mb-10">
          <div className="flex flex-wrap justify-center gap-x-[0.22em]">
            {line1.map((word, index) => (
              <div key={word} style={{ overflow: "hidden" }}>
                <span
                  className="inline-block text-gradient-accent glow-text"
                  style={{
                    animation: `wordReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + index * 0.11}s both`,
                  }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-[0.22em] mt-[0.05em]">
            {line2.map((word, index) => (
              <div key={word} style={{ overflow: "hidden" }}>
                <span
                  className="inline-block"
                  style={{
                    animation: `wordReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${0.58 + index * 0.11}s both`,
                  }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg font-light text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-10"
          style={{ animation: "fadeInUp 0.8s ease-out 0.9s both" }}
        >
          Custom software, business platforms, and applied AI systems for operations-heavy businesses across Zimbabwe and beyond.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-10 md:mb-14"
          style={{ animation: "fadeInUp 0.8s ease-out 1s both" }}
        >
          {businessPillars.map((pillar, index) => (
            <span
              key={pillar}
              className="font-display text-[0.6rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-primary/30 text-primary/70"
              style={{ animationDelay: `${1 + index * 0.08}s` }}
            >
              {pillar}
            </span>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: "fadeInUp 0.8s ease-out 1.15s both" }}
        >
          <Magnetic>
            <Link to="/products">
              <Button
                size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 sm:px-10 py-5 sm:py-6 transition-all duration-300"
              >
                Explore Products
              </Button>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link to="/book-demo">
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 sm:px-10 py-5 sm:py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary transition-all duration-300"
              >
                Book a Demo
              </Button>
            </Link>
          </Magnetic>
        </div>

        <p
          className="text-xs sm:text-sm font-light text-muted-foreground max-w-2xl mx-auto mt-6"
          style={{ animation: "fadeInUp 0.8s ease-out 1.25s both" }}
        >
          Products for CRM, HR &amp; Payroll, Projects, and Analytics. Custom services for unique workflows, automation, and AI.
        </p>
        <Link
          to="/start-trial"
          className="inline-flex mt-4 font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
          style={{ animation: "fadeInUp 0.8s ease-out 1.3s both" }}
        >
          Start Free Trial
        </Link>
      </div>

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
