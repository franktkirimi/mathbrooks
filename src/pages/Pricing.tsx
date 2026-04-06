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
        sideContent={(
          <div className="space-y-3">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70">
              Payment Options
            </p>
            {pricingNotes.map((note) => (
              <div key={note} className="rounded-xl border border-border/20 bg-background/40 px-4 py-3 text-sm font-light text-muted-foreground leading-relaxed">
                {note}
              </div>
            ))}
          </div>
        )}
      />

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto space-y-12">
          {productSections.map(({ product, plans }) => (
            <div key={product.slug} id={product.slug} className="scroll-mt-32">
              <AnimatedSection>
                <div className="mb-8 md:mb-10 max-w-3xl">
                  <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                    {product.family}
                  </p>
                  <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-3">
                    {product.shortName}
                  </h2>
                  <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                    {product.summary}
                  </p>
                </div>
              </AnimatedSection>
              <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan, index) => {
                  const query = new URLSearchParams({
                    product: product.slug,
                    plan: plan.name,
                  }).toString();
                  const ctaPath = product.trialAvailable ? `/start-trial?${query}` : `/book-demo?${query}`;
                  const ctaLabel = product.trialAvailable ? "Start Guided Trial" : "Get Started";

                  return (
                    <AnimatedSection key={`${product.slug}-${plan.name}`} delay={index * 120}>
                      <div className={`card-glass rounded-2xl p-6 md:p-8 h-full flex flex-col ${plan.featured ? "border border-primary/40" : ""}`}>
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
                            variant={plan.featured ? "default" : "outline"}
                            className={`w-full font-display text-xs tracking-[0.15em] uppercase ${plan.featured ? "" : "border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"}`}
                          >
                            {ctaLabel}
                          </Button>
                        </Link>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-4 md:pb-8">
        <AnimatedSection>
          <div className="max-w-6xl mx-auto rounded-3xl border border-border/20 bg-background/30 px-6 py-8 md:px-8 md:py-10">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
              What is not included in the product fee
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                "Data migration beyond standard onboarding",
                "Custom integrations and bespoke workflow changes",
                "Advanced reporting or additional module implementation",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-border/20 bg-background/40 px-4 py-4 text-sm font-light text-muted-foreground">
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
