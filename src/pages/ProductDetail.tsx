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

  return (
    <SiteLayout>
      <PageHero
        eyebrow={product.category}
        title={`${product.shortName} built for practical operations`}
        description={product.summary}
        chips={product.proofPoints}
        actions={(
          <>
            <Link to="/book-demo">
              <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
                Book a Demo
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
              >
                See Pricing
              </Button>
            </Link>
            <Link
              to="/start-trial"
              className="inline-flex items-center font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              Start Free Trial
            </Link>
          </>
        )}
        sideContent={(
          <div className="space-y-4">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70">
              Best Fit
            </p>
            <div className="rounded-xl border border-border/20 bg-background/40 p-4">
              <h2 className="font-display text-sm tracking-[0.15em] uppercase mb-2">
                Who it helps
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {product.audience}
              </p>
            </div>
            <div className="rounded-xl border border-border/20 bg-background/40 p-4">
              <h2 className="font-display text-sm tracking-[0.15em] uppercase mb-2">
                Local fit
              </h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                {product.localFit}
              </p>
            </div>
          </div>
        )}
      />

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
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
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-2">
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
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="mb-8 md:mb-12">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Feature Breakdown
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide">
                What teams actually use day to day
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2">
            {product.features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 120}>
                <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
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
              <div className="space-y-4">
                {product.useCases.map((useCase) => (
                  <div key={useCase.title} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
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
                <Link to="/book-demo">
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
