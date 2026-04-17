import { lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products } from "@/content/siteContent";

const HeroScene = lazy(() => import("./HeroScene"));

const productLookup = new Map(products.map((product) => [product.slug, product]));
const featuredProductSlugs = ["crm", "hr", "accounting", "projects", "ai-assistant"] as const;
const featuredApps = featuredProductSlugs.map((slug) => productLookup.get(slug)!);
const heroLines = ["Run your business", "on systems that actually work"];

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-28 md:py-32 lg:flex lg:items-center lg:py-0">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground) / 0.02) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground) / 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "88px 88px",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 72% 62% at 50% 50%, transparent 28%, hsl(var(--background) / 0.72) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.84fr)] lg:items-center">
        <div className="max-w-3xl">
          <h1 className="font-display mb-6 text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.04em] text-foreground sm:text-[3.75rem] md:mb-8 md:text-[4.35rem] lg:text-[4.75rem] xl:text-[5rem]">
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
            className="mb-8 max-w-2xl text-base font-light leading-8 text-muted-foreground md:mb-10 md:text-[1.1rem]"
            style={{ animation: "fadeInUp 0.8s ease-out 0.42s both" }}
          >
            CRM, finance, HR, operations and AI - software built for modern African companies.
          </p>

          <div
            className="flex flex-col items-stretch justify-start gap-4 sm:flex-row sm:items-center"
            style={{ animation: "fadeInUp 0.8s ease-out 0.56s both" }}
          >
            <Link to="/book-demo" className="block w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full rounded-xl px-8 py-6 font-body text-sm font-medium tracking-[0.01em] sm:w-auto"
              >
                Start a Demo
              </Button>
            </Link>

            <Link to="/products" className="block w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-xl border-border/70 bg-background/35 px-8 py-6 font-body text-sm font-medium tracking-[0.01em] text-foreground hover:bg-background/55 sm:w-auto"
              >
                See the Platform
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="card-glass rounded-[1.85rem] p-4 md:p-5"
          style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}
        >
          <div className="flex items-center justify-between gap-4 px-2 pb-4">
            <div>
              <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-primary/70">
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
                  <p className="mt-1 max-w-[24rem] text-sm font-light leading-6 text-muted-foreground">
                    {product.overview}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-3 border-t border-border/60 px-2 pt-4">
            <Link
              to="/products"
              className="flex items-center justify-between font-display text-xs uppercase tracking-[0.16em] text-primary/80 transition-colors duration-300 hover:text-primary"
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
