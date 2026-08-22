import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductMockup from "@/components/site/ProductMockup";
import { products, type ProductSlug } from "@/content/siteContent";
import FeatureBand from "./FeatureBand";

const flagshipContent: Array<{
  slug: ProductSlug;
  headline: string;
  highlight: string;
}> = [
  {
    slug: "crm",
    headline: "Follow every opportunity",
    highlight: "without relying on memory.",
  },
  {
    slug: "hr",
    headline: "Payroll and people operations",
    highlight: "in one controlled workspace.",
  },
  {
    slug: "analytics",
    headline: "A clearer operating picture",
    highlight: "without manual reporting.",
  },
];

const flagshipProducts = flagshipContent.map((entry) => ({
  ...entry,
  product: products.find((product) => product.slug === entry.slug)!,
}));

const ProductSuiteSection = () => {
  return (
    <>
      <section className="editorial-light relative overflow-hidden px-5 py-24 sm:px-6 md:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 78% 50%, hsl(var(--primary) / 0.12), transparent 30rem), linear-gradient(180deg, hsl(var(--background)), hsl(var(--card) / 0.55))",
          }}
        />
        <div className="relative mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-24">
          <div>
            <h2 className="editorial-heading max-w-[690px]">Proven foundations for the systems businesses need most.</h2>
          </div>
          <div className="max-w-[600px] lg:justify-self-end">
            <p className="editorial-copy">
              Our product suite packages recurring operating needs into practical starting points. Each product can stand alone or connect into a wider MathBrooks system.
            </p>
            <Link to="/solutions/available" className="mt-7 inline-flex items-center gap-2 text-base font-semibold text-primary">
              Explore the complete suite
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {flagshipProducts.map(({ product, headline, highlight }, index) => (
        <FeatureBand
          key={product.slug}
          title={<>{headline} <span className="text-primary">{highlight}</span></>}
          description={product.summary}
          bullets={product.proofPoints.slice(0, 3)}
          primaryAction={{ label: `Explore ${product.shortName}`, href: `/solutions/available/${product.slug}` }}
          secondaryAction={index === 0 ? { label: "See product pricing", href: "/pricing" } : undefined}
          visual={(
            <ProductMockup
              accent={product.accent}
              title={product.name}
              metrics={product.metrics}
              panels={product.panels}
            />
          )}
          reverse={index % 2 === 1}
          surface={index % 2 === 1 ? "dark" : "light"}
        />
      ))}

      <section className="editorial-light relative px-5 pb-24 sm:px-6 md:pb-32">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-card p-7 shadow-[0_22px_70px_rgba(15,23,42,0.08)] sm:p-9 md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">Accounting, inventory, projects, automation and AI can connect when you are ready.</h3>
          </div>
          <Link to="/solutions/available" className="button-primary flex-none">
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProductSuiteSection;
