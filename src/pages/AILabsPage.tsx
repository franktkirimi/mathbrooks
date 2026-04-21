import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/site/SiteLayout";
import { aiLabSectors, aiLabPath } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

gsap.registerPlugin(ScrollTrigger);

// ─── Radar HUD Canvas ─────────────────────────────────────────────────────────

const RadarHUD = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 300;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const R = SIZE / 2 - 8;

    const contacts = [
      { a: 42,  r: 0.44, alpha: 0 },
      { a: 118, r: 0.66, alpha: 0 },
      { a: 198, r: 0.31, alpha: 0 },
      { a: 308, r: 0.71, alpha: 0 },
      { a: 256, r: 0.54, alpha: 0 },
    ];

    let scanAngle = 0;
    const SPEED = 0.6;
    const DECAY = 0.008;
    const TRAIL_DEG = 72;

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Background
      ctx.fillStyle = "hsl(216 28% 4%)";
      ctx.fillRect(0, 0, SIZE, SIZE);

      // Range rings
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (R * i) / 4, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(202,89%,69%,${0.05 + i * 0.02})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Cross hairs
      ctx.strokeStyle = "hsla(202,89%,69%,0.07)";
      ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();

      // Sweep trail (wedge slices)
      const slices = 36;
      for (let i = 0; i < slices; i++) {
        const fraction = i / slices;
        const alpha = (1 - fraction) * 0.18;
        const a0 = ((scanAngle - TRAIL_DEG * (i / slices)) * Math.PI) / 180;
        const a1 = ((scanAngle - TRAIL_DEG * ((i + 1) / slices)) * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, a0, a1, true);
        ctx.closePath();
        ctx.fillStyle = `hsla(202,89%,69%,${alpha})`;
        ctx.fill();
      }

      // Sweep line
      const sweepRad = (scanAngle * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(sweepRad), cy + R * Math.sin(sweepRad));
      ctx.strokeStyle = "hsla(202,89%,80%,0.85)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Contact points
      contacts.forEach((c) => {
        const diff = ((scanAngle - c.a) + 360) % 360;
        if (diff < SPEED * 2) c.alpha = 1;
        c.alpha = Math.max(0, c.alpha - DECAY);

        if (c.alpha > 0.01) {
          const aRad = (c.a * Math.PI) / 180;
          const x = cx + c.r * R * Math.cos(aRad);
          const y = cy + c.r * R * Math.sin(aRad);

          const grd = ctx.createRadialGradient(x, y, 0, x, y, 14);
          grd.addColorStop(0, `hsla(202,89%,69%,${c.alpha * 0.55})`);
          grd.addColorStop(1, "transparent");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(202,89%,75%,${c.alpha})`;
          ctx.fill();
        }
      });

      ctx.restore();

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "hsla(202,89%,69%,0.28)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(202,89%,69%,0.7)";
      ctx.fill();

      scanAngle = (scanAngle + SPEED) % 360;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{ width: 300, height: 300 }}
        className="opacity-80"
      />
      {/* Corner brackets */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none text-primary/30" viewBox="0 0 300 300" fill="none">
        <path d="M8 38 L8 8 L38 8" stroke="currentColor" strokeWidth="1" />
        <path d="M262 8 L292 8 L292 38" stroke="currentColor" strokeWidth="1" />
        <path d="M8 262 L8 292 L38 292" stroke="currentColor" strokeWidth="1" />
        <path d="M262 292 L292 292 L292 262" stroke="currentColor" strokeWidth="1" />
      </svg>
      {/* Label */}
      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-5 font-mono text-[0.52rem] tracking-[0.22em] text-primary/40 uppercase whitespace-nowrap">
        Active Scan — {aiLabSectors.length} sectors
      </p>
    </div>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef   = useRef<number>(0);

  // Particle field background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let pts: P[] = [];
    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      pts = Array.from({ length: Math.floor((W * H) / 14000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() * 1.1 + 0.3, a: Math.random() * 0.22 + 0.05,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(202,89%,69%,${p.a})`; ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  // GSAP text entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRefs.current.filter(Boolean),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.3 }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => { lineRefs.current[i] = el; };

  return (
    <section ref={wrapRef} className="relative flex items-center min-h-[92vh] px-6 pt-28 pb-16 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Radial glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 60% at 30% 50%, hsl(202 89% 69% / 0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid gap-16 lg:grid-cols-[1fr_auto] lg:items-center">

        {/* Left — text */}
        <div className="max-w-2xl">
          <p ref={setRef(0)} className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-primary/50 mb-5 flex items-center gap-3" style={{ opacity: 0 }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            MathBrooks AI Labs — Active Research
          </p>

          <h1
            ref={setRef(1)}
            className="font-display font-semibold leading-[1.04] tracking-[-0.03em] text-foreground mb-6"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", opacity: 0 }}
          >
            Building intelligence{" "}
            <span style={{
              background: "linear-gradient(135deg, hsl(202 89% 69%) 0%, hsl(191 74% 78%) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              for the world's hardest problems.
            </span>
          </h1>

          <p ref={setRef(2)} className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed mb-10 max-w-xl" style={{ opacity: 0 }}>
            Five research sectors. Agriculture, autonomous vehicles, mining, geo mapping, and internet satellites. The lab works on problems where AI can change the operational baseline — not just automate the obvious.
          </p>

          <div ref={setRef(3) as React.Ref<HTMLDivElement>} className="flex flex-wrap gap-4 mb-12" style={{ opacity: 0 }}>
            <Link to="/book-demo">
              <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
                Discuss an AI Use Case
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary">
                View AI Services
              </Button>
            </Link>
          </div>

          {/* Live status HUD */}
          <div ref={setRef(4) as React.Ref<HTMLDivElement>} className="flex flex-wrap gap-x-8 gap-y-3" style={{ opacity: 0 }}>
            {[
              { label: "Active", count: aiLabSectors.filter(s => s.status === "ACTIVE").length, color: "bg-emerald-400" },
              { label: "Research", count: aiLabSectors.filter(s => s.status === "RESEARCH").length, color: "bg-primary" },
              { label: "Prototype", count: aiLabSectors.filter(s => s.status === "PROTOTYPE").length, color: "bg-amber-400" },
            ].map(({ label, count, color }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground/60">
                  {count} {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Radar HUD */}
        <div className="hidden lg:flex flex-col items-center gap-6 opacity-90">
          <RadarHUD />
        </div>
      </div>
    </section>
  );
};

// ─── Sector Card ─────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  ACTIVE:    { dot: "bg-emerald-400", text: "text-emerald-400/80" },
  RESEARCH:  { dot: "bg-primary",     text: "text-primary/80"     },
  PROTOTYPE: { dot: "bg-amber-400",   text: "text-amber-400/80"   },
};

type Sector = typeof aiLabSectors[number];

const SectorCard = ({ sector, index }: { sector: Sector; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const status  = STATUS_STYLES[sector.status];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl border border-border/25 bg-background/40 backdrop-blur-sm p-7 flex flex-col group hover:border-primary/30 transition-colors duration-500"
      style={{ opacity: 0 }}
    >
      {/* Targeting reticle corners */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none text-primary/0 group-hover:text-primary/20 transition-colors duration-500" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <path d="M3 12 L3 3 L12 3"   stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <path d="M88 3 L97 3 L97 12" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <path d="M3 88 L3 97 L12 97" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <path d="M88 97 L97 97 L97 88" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Header row */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-primary/50">
            {sector.code}
          </span>
          <span className="text-border/30">·</span>
          <span className={`flex items-center gap-1.5 font-mono text-[0.58rem] tracking-[0.18em] uppercase ${status.text}`}>
            <span className={`w-1 h-1 rounded-full ${status.dot} ${sector.status === "ACTIVE" ? "animate-pulse" : ""}`} />
            {sector.status}
          </span>
        </div>
        <span className="font-mono text-[0.52rem] tracking-[0.14em] text-muted-foreground/35">
          {sector.coords}
        </span>
      </div>

      {/* Index ghost */}
      <span className="absolute top-5 right-6 font-display font-semibold text-foreground/[0.03] select-none leading-none"
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title */}
      <h2 className="font-display font-semibold tracking-[-0.02em] leading-tight text-foreground mb-3"
        style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}>
        {sector.title}
      </h2>

      {/* Summary */}
      <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6 flex-1">
        {sector.summary}
      </p>

      {/* Directions */}
      <div className="border-t border-border/15 pt-5">
        <p className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-primary/40 mb-3">
          Research directions
        </p>
        <ul className="space-y-2.5">
          {sector.directions.map((d) => (
            <li key={d} className="flex items-start gap-2 text-sm font-light text-muted-foreground/75 leading-snug">
              <span className="text-primary/30 shrink-0 mt-0.5">→</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ─── Tech Stack ───────────────────────────────────────────────────────────────

const STACK = {
  "AI / ML": [
    "Computer Vision", "Neural Networks", "Transformer Models", "Edge AI",
    "Reinforcement Learning", "LLM Orchestration", "Agentic Systems",
  ],
  "Data & Imagery": [
    "Satellite Imagery APIs", "Multi-spectral Analysis", "LiDAR Processing",
    "Geospatial Databases", "Real-time Sensor Streams", "DEM Terrain Models",
  ],
  "Infrastructure": [
    "Python / PyTorch", "TensorFlow", "GDAL / Rasterio", "PostGIS",
    "FastAPI", "Edge Inference Runtimes", "Cloud GPU Clusters",
  ],
};

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 pb-24 md:pb-32 border-t border-border/15 pt-20 md:pt-28">
      <div className="max-w-5xl mx-auto">
        <div ref={headRef} style={{ opacity: 0 }}>
          <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-primary/50 mb-4">
            Research Infrastructure
          </p>
          <h2 className="font-display text-2xl md:text-[2.2rem] font-semibold tracking-[-0.025em] leading-tight mb-3">
            The stack behind the research.
          </h2>
          <p className="text-base font-light text-muted-foreground leading-relaxed max-w-xl mb-14">
            Every sector runs on a combination of domain-specific data pipelines, modern ML tooling, and lightweight inference runtimes built for low-connectivity environments.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {Object.entries(STACK).map(([category, tools]) => (
            <div key={category}>
              <p className="font-mono text-[0.58rem] tracking-[0.22em] uppercase text-primary/40 mb-5">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span key={t} className="font-display text-[0.62rem] tracking-[0.12em] uppercase text-foreground/55 border border-border/25 rounded-full px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Research Path ────────────────────────────────────────────────────────────

const ResearchPath = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".path-step").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power3.out", delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 pb-24 md:pb-32 border-t border-border/15 pt-20 md:pt-28">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-primary/50 mb-4">
          From Question to Product
        </p>
        <h2 className="font-display text-2xl md:text-[2.2rem] font-semibold tracking-[-0.025em] leading-tight mb-16">
          How lab ideas move into operations.
        </h2>

        <div className="grid gap-0 divide-y divide-border/15">
          {aiLabPath.map((step, i) => (
            <div key={step.step} className="path-step grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_14rem_1fr] gap-6 py-8 items-start" style={{ opacity: 0 }}>
              <span className="font-mono text-[0.68rem] tracking-[0.2em] text-primary/35 pt-0.5">
                {step.step}
              </span>
              <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-foreground">
                {step.title}
              </h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed col-span-2 md:col-span-1">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const AILabsPage = () => {
  usePageMeta({
    title: "AI Labs | MathBrooks",
    description:
      "MathBrooks AI Labs — active research in agriculture AI, autonomous vehicles, mining intelligence, geo mapping, and internet satellite connectivity.",
    canonicalPath: "/ai-labs",
    keywords: [
      "AI labs Africa", "applied AI Zimbabwe", "agriculture AI satellite",
      "mining AI", "autonomous vehicles Africa", "geo mapping AI",
    ],
  });

  return (
    <SiteLayout>
      <Hero />

      {/* Mission Sectors */}
      <section className="px-6 pb-16 border-t border-border/15 pt-20 md:pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-primary/50 mb-3">
                Active Research Sectors — {String(aiLabSectors.length).padStart(2, "0")}
              </p>
              <h2 className="font-display text-2xl md:text-[2.2rem] font-semibold tracking-[-0.025em] leading-tight max-w-lg">
                Five domains. One mission. Build what doesn't exist yet.
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {aiLabSectors.map((sector, i) => (
              <SectorCard key={sector.code} sector={sector} index={i} />
            ))}
          </div>
        </div>
      </section>

      <TechStack />
      <ResearchPath />

      {/* CTA */}
      <section className="px-6 pb-28 md:pb-36">
        <div className="max-w-5xl mx-auto border-t border-border/20 pt-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-xl">
              <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-primary/50 mb-4">
                Bring the hard problem
              </p>
              <h2 className="font-display text-2xl md:text-[2.2rem] font-semibold tracking-[-0.025em] leading-tight mb-4">
                If it feels impossible,<br />that's where we start.
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Every sector in the lab started with a conversation about something that seemed too complex to automate, too expensive to detect, or too remote to reach. Bring your version of that problem.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/book-demo">
                <Button className="font-display text-xs tracking-[0.15em] uppercase">
                  Discuss an AI Use Case
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="font-display text-xs tracking-[0.15em] uppercase border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary">
                  View AI Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default AILabsPage;
