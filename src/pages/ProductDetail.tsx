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
          <div className="space-y-8 pt-2">
            {/* Family + module */}
            <div>
              <p className="font-display text-[0.62rem] tracking-[0.26em] uppercase text-primary/60 mb-2">
                {product.family}
              </p>
              <p className="font-display text-sm font-light text-muted-foreground">
                Module: {product.shortName}
              </p>
            </div>

            {/* Open stat blocks */}
            <div className="grid grid-cols-3 gap-6">
              {heroMetrics.map((metric) => (
                <div key={metric.label}>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-primary leading-none mb-1">
                    {metric.value}
                  </p>
                  <p className="font-display text-[0.55rem] tracking-[0.18em] uppercase text-muted-foreground/60">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Support info — open text, no cards */}
            <div className="space-y-5 border-t border-border/20 pt-6">
              {supportBlocks.map((block) => (
                <div key={block.label}>
                  <p className="font-display text-[0.6rem] tracking-[0.2em] uppercase text-primary/50 mb-1.5">
                    {block.label}
                  </p>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
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
                <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-3">
                  Product Surface
                </p>
                <h2 className="font-display text-2xl md:text-[2rem] font-semibold tracking-[-0.02em] leading-tight">
                  {product.shortName} at a glance.
                </h2>
                <p className="mt-5 max-w-2xl text-base font-light text-muted-foreground leading-relaxed">
                  The mockup is arranged to show the operational signals first, then the supporting detail. It keeps the page readable on desktop and compact on mobile.
                </p>
              </div>

              <div className="border-l-2 border-primary/40 pl-5">
                <p className="font-display text-[0.6rem] tracking-[0.2em] uppercase text-primary/50 mb-1">
                  Starting from
                </p>
                <p className="font-display text-2xl font-semibold text-foreground">
                  {product.startingPrice}
                </p>
                <p className="mt-2 text-sm font-light text-muted-foreground">
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

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="mb-12 max-w-2xl">
              <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-3">
                Why It Works
              </p>
              <h2 className="font-display text-2xl md:text-[2.2rem] font-semibold tracking-[-0.02em] leading-tight">
                Cleaner execution starts with a clearer view.
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid gap-px bg-border/15 lg:grid-cols-3 rounded-2xl overflow-hidden">
            <AnimatedSection>
              <div className="bg-background px-7 py-8 h-full">
                <p className="font-display text-[0.6rem] tracking-[0.2em] uppercase text-primary/50 mb-4">
                  The Problem
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {product.problem}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="bg-background px-7 py-8 h-full">
                <p className="font-display text-[0.6rem] tracking-[0.2em] uppercase text-primary/50 mb-4">
                  Why This Works
                </p>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {product.tagline} The goal is not feature overload — it is cleaner execution, clearer visibility, and a faster path from admin work to business action.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div className="bg-background px-7 py-8 h-full">
                <p className="font-display text-[0.6rem] tracking-[0.2em] uppercase text-primary/50 mb-4">
                  Proof Points
                </p>
                <div className="space-y-3">
                  {product.proofPoints.map((point) => (
                    <p key={point} className="text-sm font-light text-muted-foreground flex items-start gap-2">
                      <span className="text-primary/40 mt-0.5 shrink-0">—</span>
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="mb-8 max-w-3xl md:mb-12">
              <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-3">
                Feature Breakdown
              </p>
              <h2 className="font-display text-2xl md:text-[2.2rem] font-semibold tracking-[-0.02em] leading-tight">
                What teams use every day.
              </h2>
              <p className="mt-4 text-base font-light text-muted-foreground leading-relaxed">
                Each module focuses on the parts of the workflow that need clarity most: ownership, status, timing, and the next action.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid gap-4 md:grid-cols-2">
            {product.features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 120}>
                <div className="group border border-border/20 bg-background/20 rounded-2xl p-6 md:p-7 h-full transition-all duration-300 hover:border-primary/25 hover:bg-background/40 hover:-translate-y-0.5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-primary/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-border/40" />
                  </div>
                  <h3 className="font-display text-sm tracking-[-0.01em] font-semibold mb-3">
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

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
            <AnimatedSection>
              <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-3">
                Use Cases
              </p>
              <h2 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] mb-8">
                Built for these operations.
              </h2>
              <div className="space-y-6">
                {product.useCases.map((useCase, i) => (
                  <div key={useCase.title} className="flex gap-5">
                    <span className="font-display text-[0.6rem] tracking-[0.2em] text-primary/40 mt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-semibold tracking-[-0.01em] mb-1">
                        {useCase.title}
                      </h3>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {useCase.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={120}>
              <p className="font-display text-[0.68rem] tracking-[0.3em] uppercase text-primary/60 mb-3">
                Implementation
              </p>
              <h2 className="font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] mb-5">
                How rollout works.
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-7">
                Deploy {product.shortName} as a focused platform, or connect it into a wider MathBrooks delivery covering custom software, workflow automation, analytics, or AI.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm font-light text-muted-foreground">
                  <span className="text-primary/50 shrink-0 mt-0.5">—</span>
                  Standalone deployment for a fast operational win.
                </li>
                <li className="flex items-start gap-3 text-sm font-light text-muted-foreground">
                  <span className="text-primary/50 shrink-0 mt-0.5">—</span>
                  Integration with existing finance, operations, or reporting tools.
                </li>
                <li className="flex items-start gap-3 text-sm font-light text-muted-foreground">
                  <span className="text-primary/50 shrink-0 mt-0.5">—</span>
                  Extension into bespoke workflows when the business outgrows a standard setup.
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link to="/services">
                  <Button variant="outline" className="font-display text-xs tracking-[0.15em] uppercase border-border/40 hover:border-primary/40 hover:text-primary">
                    Customise the Workflow
                  </Button>
                </Link>
                <Link to={demoPath}>
                  <Button className="font-display text-xs tracking-[0.15em] uppercase">
                    Talk to MathBrooks
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ProductDetail;
