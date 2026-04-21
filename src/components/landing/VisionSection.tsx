import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
};

const STATS = [
  { value: "50+", label: "Systems delivered" },
  { value: "8", label: "Industries served" },
  { value: "3×", label: "Avg. efficiency gain" },
  { value: "100%", label: "Africa-built" },
];

const VisionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((W * H) / 9000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(202, 89%, 69%, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(202, 89%, 69%, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      statsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          delay: i * 0.1,
        });
      });

      gsap.from(ctaRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6 overflow-hidden"
    >
      {/* Particle canvas background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Top fade */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background)), transparent)",
        }}
      />
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)), transparent)",
        }}
      />

      {/* Deep glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(202 89% 37% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="mb-5 font-display text-[0.68rem] tracking-[0.28em] uppercase text-primary/70">
          Our Vision
        </p>

        <h2
          ref={headlineRef}
          className="font-display text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[4.8rem] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground mb-6"
        >
          Built in Africa.{" "}
          <span className="text-gradient-accent">Designed for the world.</span>
        </h2>

        <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-8 text-base md:text-lg">
          Harare is our home. But the problems we solve — inefficiency, fragmentation,
          manual work — exist everywhere. We build with African precision and global ambition.
        </p>

        <p className="text-muted-foreground/60 font-light text-sm max-w-lg mx-auto mb-16">
          The next generation of intelligent business infrastructure won't come from Silicon
          Valley alone. It will come from everywhere systems are needed — including here.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { statsRef.current[i] = el; }}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-display text-3xl md:text-4xl font-semibold text-gradient-accent leading-none">
                {stat.value}
              </span>
              <span className="font-display text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 font-display text-sm tracking-[0.1em] uppercase text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_50px_hsl(202_89%_69%/0.4)] hover:-translate-y-0.5"
          >
            Start a Project
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="mailto:hello@mathbrooks.com"
            className="inline-flex items-center gap-2 font-display text-sm tracking-[0.1em] uppercase text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            hello@mathbrooks.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
