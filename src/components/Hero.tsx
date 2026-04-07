import { lazy, Suspense, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products } from "@/content/siteContent";

const HeroScene = lazy(() => import("./HeroScene"));

const productLookup = new Map(products.map((product) => [product.slug, product]));
const featuredProductSlugs = ["crm", "hr", "accounting", "projects", "ai-assistant"] as const;
const featuredApps = featuredProductSlugs.map((slug) => productLookup.get(slug)!);

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

const heroLines = ["Run your business", "on systems that actually work"];

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-28 md:py-32 lg:py-0 lg:flex lg:items-center">
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

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.82fr)] lg:items-center">
        <div className="max-w-3xl">
          <h1 className="font-display text-[2.9rem] sm:text-5xl md:text-6xl lg:text-[4.9rem] xl:text-[5.7rem] font-semibold leading-[0.95] tracking-[-0.04em] mb-6 md:mb-8">
          {heroLines.map((line, lineIndex) => (
            <div
              key={line}
              className="overflow-hidden"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.15 + lineIndex * 0.12}s both`,
              }}
            >
              <span className="block">{line}</span>
            </div>
          ))}
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg font-light text-muted-foreground max-w-2xl leading-relaxed mb-8 md:mb-10"
            style={{ animation: "fadeInUp 0.8s ease-out 0.42s both" }}
          >
            CRM, finance, HR, operations and AI - software built for modern African companies.
          </p>

          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4"
            style={{ animation: "fadeInUp 0.8s ease-out 0.56s both" }}
          >
            <Magnetic>
              <Link to="/book-demo" className="block w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto font-display text-xs tracking-[0.15em] uppercase px-8 sm:px-10 py-5 sm:py-6 transition-all duration-300"
                >
                  Start a Demo
                </Button>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/products" className="block w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-display text-xs tracking-[0.15em] uppercase px-8 sm:px-10 py-5 sm:py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                >
                  See the Platform
                </Button>
              </Link>
            </Magnetic>
          </div>
        </div>

        <div
          className="rounded-[1.85rem] border border-border/60 bg-card/85 p-4 md:p-5 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-md"
          style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}
        >
          <div className="flex items-center justify-between gap-4 px-2 pb-4">
            <div>
              <p className="font-display text-[0.62rem] tracking-[0.24em] uppercase text-primary/70">
                Featured Apps
              </p>
              <p className="mt-1 text-sm font-light text-muted-foreground">
                The modules that make the suite real.
              </p>
            </div>
            <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 sm:flex">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="divide-y divide-border/60">
            {featuredApps.map((product) => (
              <Link
                key={product.slug}
                to={`/products/${product.slug}`}
                className="group flex items-center gap-4 rounded-2xl px-2 py-4 transition-colors duration-300 hover:bg-background/60"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background/70">
                  <product.icon className="h-5 w-5 text-primary/80 transition-colors duration-300 group-hover:text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-base tracking-[0.01em] text-foreground">
                      {product.shortName}
                    </h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                  <p className="mt-1 max-w-[24rem] text-sm font-light leading-5 text-muted-foreground">
                    {product.overview}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-3 border-t border-border/60 px-2 pt-4">
            <Link
              to="/products"
              className="flex items-center justify-between font-display text-xs tracking-[0.16em] uppercase text-primary/80 transition-colors duration-300 hover:text-primary"
            >
              <span>Explore all products</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
