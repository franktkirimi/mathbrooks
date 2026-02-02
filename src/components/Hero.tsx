import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Abstract line network background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
          }}
        />
        {/* Grid schematic */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: "var(--grid-opacity)",
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Diagonal line accents */}
        <svg
          className="absolute inset-0 w-full h-full transition-opacity duration-300"
          style={{ opacity: "var(--line-opacity)" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1="20%" y1="100%" x2="80%" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1="40%" y1="100%" x2="100%" y2="20%" stroke="hsl(var(--primary))" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Brand mark */}
        <div className="mb-8 md:mb-16 animate-fade-in-up">
          <span className="font-display text-xs tracking-[0.4em] text-muted-foreground uppercase">
            MathBrooks
          </span>
        </div>

        {/* Headline — large, uppercase, tight */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold uppercase leading-[1.1] tracking-tight mb-6 md:mb-8 animate-fade-in-up-delay-1">
          Engineering AI-Driven
          <br />
          <span className="text-gradient-accent glow-text">
            Systems for Real-World Scale
          </span>
        </h1>

        {/* Subtext — single line, light */}
        <p className="text-sm sm:text-base md:text-lg font-light text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-14 animate-fade-in-up-delay-2">
          MathBrooks builds intelligent systems and autonomous AI for industries
          that power economies — from Africa to the world.
        </p>

        {/* CTA — thin outline, subtle hover glow */}
        <div className="animate-fade-in-up-delay-3">
          <Button
            variant="outline"
            size="lg"
            className="font-display text-xs tracking-[0.15em] uppercase px-8 sm:px-10 py-5 sm:py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 animate-pulse-glow"
            onClick={() =>
              document
                .getElementById("systems")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Our Vision
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-muted-foreground/60" />
      </div>
    </section>
  );
};

export default Hero;
