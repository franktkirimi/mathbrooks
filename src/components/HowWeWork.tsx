import { useState, useEffect, useRef, useCallback } from "react";
import { Search, PenTool, Code2, Rocket, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedSection from "./AnimatedSection";

/* ─── Steps data ─── */
const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description: "Understand client needs, constraints, and opportunity space",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    description: "Architect modular, scalable systems built for longevity",
  },
  {
    number: "03",
    icon: Code2,
    title: "Build",
    description: "Build software and AI with precision engineering",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deploy",
    description: "Integrate seamlessly into existing operations",
  },
  {
    number: "05",
    icon: Headphones,
    title: "Support",
    description: "Maintain, monitor, and continuously evolve",
  },
];

/* ─── Read CSS variable helper ─── */
function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/* ─── Particle background canvas ─── */
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      particles.length = 0;
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: Math.random() * 1.2 + 0.3,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const color = getCssVar("--particle-color") || "217, 91%, 60%";
      const alpha = parseFloat(getCssVar("--particle-alpha") || "0.12");
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color},${alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

/* ─── Flow Diagram (desktop: horizontal, mobile: vertical) ─── */
const FlowDiagram = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    },
    [scrollRef],
  );

  return (
    <div ref={setRefs} className="relative">
      {/* ─── DESKTOP flow diagram ─── */}
      <div className="hidden lg:block">
        {/* SVG connecting lines */}
        <svg
          className="absolute top-[2.25rem] left-0 w-full pointer-events-none"
          height="4"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          {[0, 1, 2, 3].map((i) => {
            const x1 = `${(i * 25) + 12.5}%`;
            const x2 = `${((i + 1) * 25) + 12.5}%`;
            return (
              <line
                key={i}
                x1={x1}
                y1="0"
                x2={x2}
                y2="0"
                className="stroke-primary transition-all duration-700"
                strokeWidth="1"
                style={{
                  opacity: isVisible ? (hoveredIdx !== null && (hoveredIdx === i || hoveredIdx === i + 1) ? 0.6 : 0.15) : 0,
                  strokeDasharray: "500",
                  strokeDashoffset: isVisible ? 0 : 500,
                  transition: `stroke-dashoffset 1s ease ${i * 0.2}s, opacity 0.3s ease`,
                }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="grid grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center group cursor-default"
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Node circle */}
                <div
                  className={`relative w-[4.5rem] h-[4.5rem] rounded-full border flex items-center justify-center mb-8 transition-all duration-500 ${
                    isHovered
                      ? "border-primary/60 bg-primary/5 shadow-[0_0_30px_hsl(var(--primary)_/_0.2)]"
                      : "border-primary/20 bg-transparent"
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0.8)",
                    transition: `all 0.6s ease ${index * 0.15}s`,
                  }}
                >
                  <step.icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isHovered ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  {/* Number badge */}
                  <span
                    className={`absolute -top-2 -right-2 font-display text-[0.6rem] tracking-wider w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isHovered
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-primary/60 border-border"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Text */}
                <h3
                  className={`font-display text-xs tracking-[0.15em] uppercase mb-2 transition-colors duration-300 ${
                    isHovered ? "text-foreground" : "text-foreground/85"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-xs font-light leading-relaxed max-w-[180px] transition-colors duration-300 ${
                    isHovered ? "text-muted-foreground" : "text-muted-foreground/80"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── MOBILE / TABLET flow diagram (vertical) ─── */}
      <div className="lg:hidden">
        <div className="relative pl-12">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[1.1875rem] top-3 bottom-3 w-px transition-all duration-1000"
            style={{
              background: isVisible
                ? "linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.08))"
                : "transparent",
            }}
          />

          <div className="space-y-5">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex items-start gap-4 group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.6s ease ${index * 0.12}s`,
                }}
              >
                {/* Node dot */}
                <div className="absolute left-[-2.25rem] top-0.5 w-7 h-7 rounded-full border border-primary/20 flex items-center justify-center bg-background group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.15)] transition-all duration-300">
                  <span className="font-display text-[0.5rem] tracking-wider text-primary/60 group-hover:text-primary transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-300 hidden md:block" />
                    <h3 className="font-display text-[0.7rem] tracking-[0.15em] uppercase group-hover:text-foreground transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs font-light text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const HowWeWork = () => {
  return (
    <section id="how-we-work" className="py-16 md:py-[120px] lg:py-[150px] px-6 relative overflow-hidden">
      {/* Particle background */}
      <ParticleField />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide">
              How We Work
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <p className="text-center font-light text-muted-foreground text-sm md:text-lg leading-relaxed max-w-2xl mx-auto mb-12 md:mb-20">
            From idea to deployment, we engineer systems that scale and deliver impact.
          </p>
        </AnimatedSection>

        {/* Flow Diagram */}
        <AnimatedSection delay={200}>
          <FlowDiagram />
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={400}>
          <div className="text-center mt-12 md:mt-20">
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
                Request a Consultation
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HowWeWork;
