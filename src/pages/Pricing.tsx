import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Packages from "@/components/Packages";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import { pricingNotes, productFamilies, productPricing, products } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

const productLookup = new Map(products.map((product) => [product.slug, product]));
const productSections = productFamilies.flatMap((family) =>
  family.slugs.flatMap((slug) => {
    const product = productLookup.get(slug);
    return product
      ? [{
          product,
          plans: productPricing[product.slug],
        }]
      : [];
  })
);
const pricingJumpLinks = productSections.map(({ product, plans }) => ({
  product,
  startingPrice: plans[0]?.monthly ?? product.startingPrice,
}));

const pricingJumpBands = [
  {
    title: "Core operations",
    description: "The foundational modules for day-to-day business systems.",
    items: pricingJumpLinks.slice(0, 4),
  },
  {
    title: "Automation and intelligence",
    description: "The modules that extend operational workflows and decision support.",
    items: pricingJumpLinks.slice(4),
  },
];

const Pricing = () => {
  useEffect(() => {
    const targetId = window.location.hash.replace("#", "");
    if (!targetId) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  usePageMeta({
    title: "Pricing | MathBrooks",
    description:
      "MathBrooks pricing for CRM, HR and payroll, accounting, inventory, projects, automation, analytics, and AI assistant products, plus custom software engagements.",
    canonicalPath: "/pricing",
    keywords: [
      "CRM pricing Africa",
      "HR payroll pricing Zimbabwe",
      "accounting software pricing",
      "inventory software pricing",
      "analytics software pricing",
      "AI assistant pricing",
      "software pricing MathBrooks",
      "business software pricing",
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "MathBrooks Pricing",
      url: "https://www.mathbrooks.com/pricing",
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Pricing"
        title="Clear pricing across the full MathBrooks product platform"
        description="Every product module has its own repeatable pricing track. Custom software, deeper automation, and AI delivery beyond the standard modules are scoped separately around workflow complexity, risk, and rollout requirements."
        actions={(
          <>
            <Link to="/book-demo">
              <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
                Book a Demo
              </Button>
            </Link>
            <Link to="/products">
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
              >
                Compare Products
              </Button>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              Talk Custom Scope
            </Link>
          </>
        )}
      />

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                How Pricing Works
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
                Product pricing stays repeatable, delivery scope stays separate
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                The product plans are designed for clean, repeatable rollouts. When implementation, migration, or custom system work becomes more specific, that scope is priced separately instead of being buried inside a product fee.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pricingNotes.map((note, index) => (
              <AnimatedSection key={note} delay={index * 90}>
                <div className="card-glass rounded-3xl p-6 md:p-8 h-full min-h-[14rem]">
                  <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                    {note}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Product Pricing
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
                Jump to the module family you want to compare
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                The catalog is split into two balanced bands so the page reads in sections instead of one dense wall of cards.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-12 md:space-y-14">
            {pricingJumpBands.map((band, bandIndex) => (
              <div key={band.title} className="max-w-5xl mx-auto">
                <AnimatedSection delay={bandIndex * 80}>
                  <div className="max-w-2xl mx-auto text-center mb-6 md:mb-8">
                    <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                      {band.title}
                    </p>
                    <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                      {band.description}
                    </p>
                  </div>
                </AnimatedSection>

                <div className="grid gap-6 md:grid-cols-2">
                  {band.items.map(({ product, startingPrice }, index) => (
                    <AnimatedSection key={product.slug} delay={index * 60}>
                      <a
                        href={`#${product.slug}`}
                        className="card-glass rounded-3xl p-6 md:p-8 h-full min-h-[12rem] flex flex-col justify-between transition-colors duration-300 hover:border-primary/35"
                      >
                        <div>
                          <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-2">
                            {product.family}
                          </p>
                          <h3 className="font-display text-lg uppercase tracking-wide">
                            {product.shortName}
                          </h3>
                        </div>
                        <div className="mt-6">
                          <p className="font-display text-xl text-foreground">
                            From {startingPrice}
                          </p>
                          <p className="text-sm font-light text-muted-foreground mt-2">
                            {product.trialAvailable ? "Guided trial available" : "Demo and onboarding rollout"}
                          </p>
                        </div>
                      </a>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto space-y-6">
          {productSections.map(({ product, plans }, sectionIndex) => (
            <AnimatedSection key={product.slug} delay={sectionIndex * 40}>
              <article
                id={product.slug}
                className="card-glass rounded-3xl px-5 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-10 scroll-mt-32"
              >
                <div className="max-w-3xl mx-auto text-center">
                  <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                    {product.family}
                  </p>
                  <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
                    {product.shortName}
                  </h2>
                  <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                    {product.summary}
                  </p>
                </div>

                <div
                  className={`mt-8 grid gap-5 md:gap-6 justify-items-stretch ${
                    plans.length === 1
                      ? "max-w-2xl mx-auto"
                      : plans.length === 2
                        ? "md:grid-cols-2 max-w-5xl mx-auto"
                        : "md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto"
                  }`}
                >
                  {plans.map((plan) => {
                    const query = new URLSearchParams({
                      product: product.slug,
                      plan: plan.name,
                    }).toString();
                    const ctaPath = product.trialAvailable ? `/start-trial?${query}` : `/book-demo?${query}`;
                    const ctaLabel = product.trialAvailable ? "Start Guided Trial" : "Get Started";

                    return (
                      <div
                        key={`${product.slug}-${plan.name}`}
                        className="mx-auto w-full max-w-[22rem] rounded-3xl border border-border/20 bg-background/25 p-6 md:p-8 h-full flex flex-col"
                      >
                        <div className="mb-6">
                          <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-2">
                            {plan.audience}
                          </p>
                          <h3 className="font-display text-lg uppercase tracking-wide">
                            {plan.name}
                          </h3>
                        </div>
                        <div className="space-y-2 mb-6">
                          <p className="font-display text-2xl md:text-3xl text-foreground">
                            {plan.monthly}
                          </p>
                          <p className="text-sm font-light text-muted-foreground">
                            {plan.annual}
                          </p>
                          <p className="text-xs font-light uppercase tracking-[0.12em] text-primary/80">
                            {plan.note}
                          </p>
                        </div>
                        <ul className="space-y-3 flex-1">
                          {plan.includes.map((item) => (
                            <li key={item} className="text-sm font-light text-muted-foreground flex items-start gap-2">
                              <span className="text-primary/60 mt-0.5">—</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <Link to={ctaPath} className="mt-8">
                          <Button
                            variant="outline"
                            className="w-full font-display text-xs tracking-[0.15em] uppercase border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
                          >
                            {ctaLabel}
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link to={`/products/${product.slug}`}>
                    <Button
                      variant="outline"
                      className="font-display text-xs tracking-[0.15em] uppercase border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
                    >
                      View Product Details
                    </Button>
                  </Link>
                  <Link to={`/book-demo?product=${product.slug}`}>
                    <Button
                      variant="outline"
                      className="font-display text-xs tracking-[0.15em] uppercase border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
                    >
                      Discuss {product.shortName}
                    </Button>
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="px-6 pb-4 md:pb-8">
        <AnimatedSection>
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Scope Boundaries
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
                Product fees cover the module, not bespoke delivery extras
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                This keeps the plans easier to compare and makes it clear when a business is moving from standard rollout into custom work.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                "Data migration beyond standard onboarding",
                "Custom integrations and bespoke workflow changes",
                "Advanced reporting or additional module implementation",
              ].map((item) => (
                <div key={item} className="card-glass rounded-3xl p-6 md:p-8 h-full min-h-[12rem] text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <Packages />
    </SiteLayout>
  );
};

export default Pricing;
