import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import ProductMockup from "@/components/site/ProductMockup";
import SiteLayout from "@/components/site/SiteLayout";
import { products } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";
import NotFound from "./NotFound";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((entry) => entry.slug === slug);

  usePageMeta({
    title: product ? `${product.shortName} | MathBrooks` : "Product | MathBrooks",
    description:
      product?.summary ??
      "MathBrooks business platforms for CRM, finance, HR, inventory, projects, automation, analytics, and AI assistant workflows.",
    canonicalPath: product ? `/products/${product.slug}` : "/products",
    keywords: product
      ? [product.shortName, `${product.shortName} software`, "business platform Africa", "MathBrooks"]
      : ["business software Africa", "MathBrooks products"],
    structuredData: product
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: product.name,
          applicationCategory: "BusinessApplication",
          description: product.summary,
          operatingSystem: "Web",
          url: `https://www.mathbrooks.com/products/${product.slug}`,
        }
      : undefined,
  });

  if (!product) {
    return <NotFound />;
  }

  const demoPath = `/book-demo?product=${product.slug}`;
  const pricingPath = `/pricing#${product.slug}`;
  const tertiaryPath = product.trialAvailable ? `/start-trial?product=${product.slug}` : "/services";
  const tertiaryLabel = product.trialAvailable ? "Start Guided Trial" : "Extend With Services";
  const commercialModelCopy = product.trialAvailable
    ? "Guided trial access is available before rollout."
    : "Rollout is handled through demo, onboarding, and the plan that matches your workflow.";
  const heroMetrics = product.metrics.slice(0, 3);
  const supportBlocks = [
    {
      label: "Who it helps",
      detail: product.audience,
    },
    {
      label: "Local fit",
      detail: product.localFit,
    },
    {
      label: "Commercial model",
      detail: commercialModelCopy,
    },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow={product.category}
        title={`${product.shortName} built for practical operations`}
        description={product.summary}
        chips={product.proofPoints}
        actions={(
          <>
            <Link to={demoPath}>
              <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
                Book a Demo
              </Button>
            </Link>
            <Link to={pricingPath}>
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
              >
                See Plans
              </Button>
            </Link>
            <Link
              to={tertiaryPath}
              className="inline-flex items-center font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              {tertiaryLabel}
            </Link>
          </>
        )}
        sideContent={(
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-[0.62rem] tracking-[0.24em] uppercase text-primary/70">
                  Best Fit
                </p>
                <h2 className="mt-1 font-display text-lg tracking-[0.08em] uppercase text-foreground">
                  {product.family}
                </h2>
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.62rem] font-display tracking-[0.16em] uppercase text-primary/80">
                {product.shortName}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-border/60 bg-background/60 p-3">
                  <p className="text-[0.58rem] font-display tracking-[0.16em] uppercase text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="mt-2 font-display text-sm tracking-[0.04em] text-foreground">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {supportBlocks.map((block) => (
                <div key={block.label} className="rounded-xl border border-border/60 bg-background/50 p-4">
                  <h3 className="font-display text-[0.65rem] tracking-[0.18em] uppercase text-primary/70">
                    {block.label}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                    {block.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      />

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="mb-6 md:mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)] lg:items-end">
              <div className="max-w-3xl">
                <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                  Product Surface
                </p>
                <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide leading-[1.02]">
                  A clearer operating view for {product.shortName}
                </h2>
                <p className="mt-5 max-w-2xl text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                  The mockup is arranged to show the operational signals first, then the supporting detail. It keeps the page readable on desktop and compact on mobile.
                </p>
              </div>

              <div className="card-glass rounded-2xl p-5 md:p-6">
                <p className="font-display text-[0.62rem] tracking-[0.24em] uppercase text-primary/70">
                  Starting From
                </p>
                <p className="mt-2 font-display text-2xl text-foreground">
                  {product.startingPrice}
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                  {product.trialAvailable ? "Guided trial access before rollout." : "Demo-led rollout with implementation support."}
                </p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <ProductMockup
              accent={product.accent}
              title={product.name}
              metrics={product.metrics}
              panels={product.panels}
            />
          </AnimatedSection>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="mb-8 max-w-3xl md:mb-12">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Why It Works
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide">
                Cleaner execution starts with a clearer operating view
              </h2>
              <p className="mt-4 text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                The layout gives the problem, the fit, and the proof points enough separation to read quickly without losing context.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <AnimatedSection>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Problem This Solves
              </p>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                {product.problem}
              </p>
            </div>
          </AnimatedSection>
            <div className="space-y-6">
              <AnimatedSection delay={120}>
                <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
                  <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                    Why This Product Works
                  </p>
                  <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                    {product.tagline} The goal is not feature overload. It is cleaner execution, clearer visibility, and a faster path from admin work to business action.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={180}>
                <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
                  <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                    Proof Points
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.proofPoints.map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-border/30 bg-background/40 px-3 py-1.5 text-xs font-display tracking-[0.14em] uppercase text-muted-foreground"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="mb-8 max-w-3xl md:mb-12">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Feature Breakdown
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide">
                What teams actually use day to day
              </h2>
              <p className="mt-4 text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                Each module focuses on the parts of the workflow that need clarity most: ownership, status, timing, and the next action.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid gap-4 md:grid-cols-2">
            {product.features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 120}>
                <div className="group card-glass rounded-2xl p-6 md:p-7 h-full transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-primary/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border/40" />
                  </div>
                  <h3 className="font-display text-sm tracking-[0.15em] uppercase mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {feature.detail}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <AnimatedSection>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Use Cases
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {product.useCases.map((useCase) => (
                  <div key={useCase.title} className="rounded-xl border border-border/30 bg-background/40 p-4">
                    <h3 className="font-display text-sm tracking-[0.15em] uppercase mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {useCase.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={120}>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full flex flex-col justify-between">
              <div>
                <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                  Implementation Path
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-5">
                  Deploy {product.shortName} as a focused platform, or connect it into a wider MathBrooks delivery covering custom software, workflow automation, analytics, or AI.
                </p>
                <ul className="space-y-3 text-sm font-light text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-primary/60 mt-0.5">—</span>
                    <span>Standalone deployment for a fast operational win.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary/60 mt-0.5">—</span>
                    <span>Integration with existing finance, operations, or reporting tools.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary/60 mt-0.5">—</span>
                    <span>Extension into bespoke workflows when the business outgrows a standard setup.</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/services">
                  <Button variant="outline" className="font-display text-xs tracking-[0.15em] uppercase border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary">
                    Customise the Workflow
                  </Button>
                </Link>
                <Link to={demoPath}>
                  <Button className="font-display text-xs tracking-[0.15em] uppercase">
                    Talk to MathBrooks
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ProductDetail;
