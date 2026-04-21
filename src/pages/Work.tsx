import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/site/SiteLayout";
import { caseStudies } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

gsap.registerPlugin(ScrollTrigger);

// ─── Hero ──────────────────────────────────────────────────────────────────────

const Hero = () => {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef   = useRef<number>(0);

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
      pts = Array.from({ length: Math.floor((W * H) / 11000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.3, a: Math.random() * 0.3 + 0.07,
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRefs.current.filter(Boolean),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.13, ease: "power3.out", delay: 0.2 }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => { lineRefs.current[i] = el; };

  return (
    <section ref={wrapRef} className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 pt-32 pb-16 text-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 40%, hsl(202 89% 69% / 0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <p ref={setRef(0)} className="font-display text-[0.68rem] tracking-[0.32em] uppercase text-primary/60 mb-6" style={{ opacity: 0 }}>
          Case Studies — {String(caseStudies.length).padStart(2, "0")} Projects
        </p>

        <h1
          ref={setRef(1)}
          className="font-display font-semibold leading-[1.06] tracking-[-0.03em] text-foreground mb-6"
          style={{ fontSize: "clamp(2.6rem, 8vw, 5.5rem)", opacity: 0 }}
        >
          Real delivery.{" "}
          <span style={{
            background: "linear-gradient(135deg, hsl(202 89% 69%) 0%, hsl(191 74% 78%) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Real problems solved.
          </span>
        </h1>

        <p ref={setRef(2)} className="text-base sm:text-lg font-light text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10" style={{ opacity: 0 }}>
          Workflow automation, platform engineering, and operational analytics — built for businesses where the process matters as much as the product.
        </p>

        <div ref={setRef(3) as React.Ref<HTMLDivElement>} className="flex flex-wrap justify-center gap-4" style={{ opacity: 0 }}>
          <Link to="/book-demo">
            <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
              Discuss a Similar Problem
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="outline" size="lg"
              className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary">
              See Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── Case Study Chapter ────────────────────────────────────────────────────────

type Study = typeof caseStudies[number];

const Chapter = ({ study, index }: { study: Study; index: number }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const numRef     = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(imgRef.current,
        { scale: 1.06 },
        { scale: 1, ease: "none",
          scrollTrigger: { trigger: imgRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 }
        }
      );

      // Ghost number
      gsap.fromTo(numRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );

      // Content block
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 82%" }
        }
      );

      // Metrics stagger
      gsap.fromTo(metricsRef.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: metricsRef.current[0], start: "top 85%" }
        }
      );

      // Details
      gsap.fromTo(detailsRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: detailsRef.current, start: "top 83%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const num = String(index + 1).padStart(2, "0");

  return (
    <section ref={sectionRef} className={`relative px-6 pb-28 md:pb-36 ${index > 0 ? "border-t border-border/15 pt-24 md:pt-32" : ""}`}>
      <div className="max-w-5xl mx-auto">

        {/* Ghost number + eyebrow */}
        <div className="flex items-end gap-5 mb-8">
          <span
            ref={numRef}
            className="font-display font-semibold leading-none select-none text-foreground/[0.04]"
            style={{ fontSize: "clamp(5rem, 18vw, 11rem)", opacity: 0 }}
          >
            {num}
          </span>
          <div className="pb-3">
            <p className="font-display text-[0.6rem] tracking-[0.28em] uppercase text-primary/55 mb-1">
              {study.sector}
            </p>
            <h2
              ref={contentRef as React.Ref<HTMLHeadingElement>}
              className="font-display font-semibold tracking-[-0.025em] leading-tight text-foreground"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", opacity: 0 }}
            >
              {study.title}
            </h2>
          </div>
        </div>

        {/* Summary */}
        <p className="text-base font-light text-muted-foreground leading-relaxed max-w-2xl mb-10">
          {study.summary}
        </p>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden mb-12" style={{ height: "clamp(240px, 40vw, 480px)" }}>
          <div ref={imgRef} className="absolute inset-0 w-full h-full">
            <img
              src={study.image}
              alt={study.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-8 mb-14 max-w-lg">
          {study.metrics.map((m, i) => (
            <div key={m} ref={(el) => { metricsRef.current[i] = el; }} style={{ opacity: 0 }}>
              <p className="font-display text-lg md:text-xl font-semibold text-primary leading-tight mb-1">
                {m.split(" ")[0]}
              </p>
              <p className="font-display text-[0.55rem] tracking-[0.16em] uppercase text-muted-foreground/55 leading-tight">
                {m.split(" ").slice(1).join(" ")}
              </p>
            </div>
          ))}
        </div>

        {/* Problem / Solution / Tech / Result */}
        <div ref={detailsRef} className="grid gap-px bg-border/12 rounded-2xl overflow-hidden sm:grid-cols-2" style={{ opacity: 0 }}>
          <div className="bg-background px-7 py-7">
            <p className="font-display text-[0.58rem] tracking-[0.22em] uppercase text-primary/50 mb-3">
              Business Problem
            </p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              {study.businessProblem}
            </p>
          </div>

          <div className="bg-background px-7 py-7">
            <p className="font-display text-[0.58rem] tracking-[0.22em] uppercase text-primary/50 mb-3">
              What Was Built
            </p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              {study.solution}
            </p>
          </div>

          <div className="bg-background px-7 py-7">
            <p className="font-display text-[0.58rem] tracking-[0.22em] uppercase text-primary/50 mb-3">
              Technology
            </p>
            <div className="flex flex-wrap gap-2">
              {study.technology.map((t) => (
                <span key={t} className="font-display text-[0.6rem] tracking-[0.14em] uppercase text-foreground/60 border border-border/30 rounded-full px-3 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-background px-7 py-7">
            <p className="font-display text-[0.58rem] tracking-[0.22em] uppercase text-primary/50 mb-3">
              Outcome
            </p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              {study.result}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────

const Work = () => {
  usePageMeta({
    title: "Case Studies | MathBrooks",
    description:
      "Representative MathBrooks case studies across workflow automation, education technology, and operational analytics.",
    canonicalPath: "/work",
    keywords: [
      "software case studies Africa",
      "workflow automation examples",
      "education platform case study",
      "analytics platform case study",
    ],
  });

  return (
    <SiteLayout>
      <Hero />

      <div className="pt-8">
        {caseStudies.map((study, i) => (
          <Chapter key={study.slug} study={study} index={i} />
        ))}
      </div>

      {/* CTA */}
      <section className="px-6 pb-28 md:pb-36">
        <div className="max-w-5xl mx-auto border-t border-border/20 pt-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-xl">
              <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-4">
                Start a project
              </p>
              <h2 className="font-display text-2xl md:text-[2rem] font-semibold tracking-[-0.025em] leading-tight mb-4">
                Facing a similar problem?<br />Let's scope it together.
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Every case study started with a conversation about the workflow that wasn't working. Bring your process and we'll find the right path forward.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/book-demo">
                <Button className="font-display text-xs tracking-[0.15em] uppercase">
                  Discuss a Project
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="font-display text-xs tracking-[0.15em] uppercase border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Work;
