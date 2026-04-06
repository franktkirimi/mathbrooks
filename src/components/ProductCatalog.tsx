import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import { productFamilies, products } from "@/content/siteContent";

const productLookup = new Map(products.map((product) => [product.slug, product]));

const ProductCatalog = () => {
  return (
    <section id="product-catalog" className="px-6 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
        <AnimatedSection>
          <div className="max-w-3xl">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
              Product Catalog
            </p>
            <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
              Choose the module that matches the operational pressure first
            </h2>
            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              Every module can run on its own, and each one can connect into a broader MathBrooks rollout when the business needs more control. Start with the workflow that is currently slow, risky, or hard to see clearly.
            </p>
          </div>
        </AnimatedSection>

        {productFamilies.map((family, familyIndex) => (
          <div key={family.title} className="space-y-6">
            <AnimatedSection delay={familyIndex * 60}>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-2">
                    {family.title}
                  </p>
                  <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                    {family.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {family.slugs.map((slug, index) => {
                const product = productLookup.get(slug);
                if (!product) {
                  return null;
                }

                const Icon = product.icon;
                const contactPath = product.trialAvailable
                  ? `/start-trial?product=${product.slug}`
                  : `/book-demo?product=${product.slug}`;

                return (
                  <AnimatedSection key={product.slug} delay={familyIndex * 90 + index * 70}>
                    <div className="card-glass rounded-2xl p-6 md:p-8 h-full flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="w-12 h-12 rounded-md border border-border/40 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className={`rounded-full border px-3 py-1.5 text-[0.62rem] font-display tracking-[0.18em] uppercase ${product.trialAvailable ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300" : "border-border/30 bg-background/40 text-muted-foreground"}`}>
                          {product.trialAvailable ? "Guided trial" : "Demo-led rollout"}
                        </div>
                      </div>

                      <div className="mb-5">
                        <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-2">
                          {product.family}
                        </p>
                        <h3 className="font-display text-lg uppercase tracking-wide mb-3">
                          {product.shortName}
                        </h3>
                        <p className="text-sm font-light text-muted-foreground leading-relaxed">
                          {product.overview}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-border/20 bg-background/40 px-4 py-4 mb-5 space-y-1.5">
                        <p className="font-display text-[0.62rem] tracking-[0.18em] uppercase text-primary/70">
                          Starting Price
                        </p>
                        <p className="font-display text-xl text-foreground">
                          {product.startingPrice}
                        </p>
                        <p className="text-xs font-light text-muted-foreground leading-relaxed">
                          {product.trialAvailable
                            ? "Guided trial access is available before rollout."
                            : "Includes demo and onboarding-led rollout planning."}
                        </p>
                      </div>

                      <div className="space-y-2 flex-1">
                        <p className="font-display text-[0.62rem] tracking-[0.18em] uppercase text-primary/70">
                          Best For
                        </p>
                        <p className="text-sm font-light text-muted-foreground leading-relaxed">
                          {product.audience}
                        </p>
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link to={`/products/${product.slug}`}>
                          <Button className="font-display text-xs tracking-[0.15em] uppercase">
                            View Product
                          </Button>
                        </Link>
                        <Link
                          to={`/pricing#${product.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-display tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
                        >
                          See Plans
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link
                          to={contactPath}
                          className="inline-flex items-center gap-1 text-xs font-display tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                          {product.trialAvailable ? "Start Guided Trial" : "Book Demo"}
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCatalog;
