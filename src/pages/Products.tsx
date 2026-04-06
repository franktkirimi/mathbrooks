import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCatalog from "@/components/ProductCatalog";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { complianceSignals, operatingModel, productFamilies } from "@/content/siteContent";

const Products = () => {
  usePageMeta({
    title: "Products | MathBrooks",
    description:
      "Explore MathBrooks business platforms for CRM, HR and payroll, accounting, inventory, projects, automation, analytics, and AI assistant workflows.",
    canonicalPath: "/products",
    keywords: [
      "CRM software Africa",
      "HR payroll software Zimbabwe",
      "accounting software Africa",
      "inventory software Africa",
      "automation platform business",
      "project management software Africa",
      "analytics platform business",
    ],
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Products"
        title="Product modules for the workflows that create the most operational drag"
        description="MathBrooks products cover CRM, HR and payroll, accounting, inventory, projects, automation, analytics, and AI assistant workflows. Start with the module that fixes the current bottleneck, then connect more as the business needs tighter control."
        chips={productFamilies.map((family) => family.title)}
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
                View Pricing
              </Button>
            </Link>
            <a
              href="#product-catalog"
              className="inline-flex items-center font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              Compare Modules
            </a>
          </>
        )}
        sideContent={(
          <div className="space-y-4">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70">
              How To Choose
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Start where work is currently slowing down",
                  detail: "Use the products page to match the module to the bottleneck first: sales follow-up, payroll, invoicing, stock visibility, project control, automation, reporting, or AI-assisted analysis.",
                },
                {
                  title: "Use pricing for repeatable rollouts",
                  detail: "Every product has a pricing track. CRM and HR also support guided trial access before full rollout.",
                },
                {
                  title: "Extend later if the workflow gets more complex",
                  detail: "Products can connect into custom software, automation, analytics, or AI work when the business needs a broader operating system.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border/30 bg-background/40 p-4">
                  <h2 className="font-display text-xs tracking-[0.15em] uppercase mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      />

      <ProductCatalog />

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <AnimatedSection>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Deployment Options
              </p>
              <div className="space-y-4">
                {operatingModel.map((item) => (
                  <div key={item.title} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                    <h2 className="font-display text-sm tracking-[0.15em] uppercase mb-2">
                      {item.title}
                    </h2>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Local Credibility
              </p>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6">
                The product direction is grounded in how businesses in Zimbabwe and the region actually run: mixed channels, operational handoffs, local compliance, and teams that need software to be clear on day one.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {complianceSignals.map((signal) => (
                  <div key={signal} className="rounded-xl border border-border/20 bg-background/40 px-4 py-3 text-sm font-light text-muted-foreground">
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <AnimatedSection>
          <div className="max-w-6xl mx-auto rounded-3xl border border-primary/20 bg-primary/5 px-6 py-8 md:px-8 md:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/80 mb-3">
                Need more than an off-the-shelf module?
              </p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide mb-3">
                Start with a product, then extend with custom software or AI
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                MathBrooks products are designed to connect with automation, reporting, and custom workflows when the business needs more than a standard deployment.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/services">
                <Button variant="outline" className="font-display text-xs tracking-[0.15em] uppercase border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary">
                  Explore Services
                </Button>
              </Link>
              <Link to="/book-demo">
                <Button className="font-display text-xs tracking-[0.15em] uppercase">
                  Discuss Your Stack
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </SiteLayout>
  );
};

export default Products;
