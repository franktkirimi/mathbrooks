import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { productFamilies, products } from "@/content/siteContent";
import type { ProductEntry, ProductFamily } from "@/content/siteContent";

const TAB_LABELS: Record<string, string> = {
  "Sales & Customer Operations": "Sales",
  "People & Payroll": "People",
  "Finance & Operational Control": "Finance",
  "Delivery & Workflow Execution": "Delivery",
  "Visibility & Intelligence": "Intelligence",
};

const TABS = ["All", ...productFamilies.map((family) => TAB_LABELS[family.title] ?? family.title)];

const familyByShortLabel = Object.fromEntries(
  productFamilies.map((family) => [TAB_LABELS[family.title] ?? family.title, family])
);

const productFamilyBySlug = new Map(
  productFamilies.flatMap((family) => family.slugs.map((slug) => [slug, family] as const))
);

const getFamilyLabel = (product: ProductEntry) => {
  const family = productFamilyBySlug.get(product.slug);
  return family ? TAB_LABELS[family.title] ?? family.title : product.category;
};

const ProductCard = ({ product }: { product: ProductEntry }) => {
  const Icon = product.icon;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex min-h-[19rem] flex-col rounded-2xl border border-black bg-white p-6 text-black transition duration-300 hover:-translate-y-1 hover:bg-[#f1fbf9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 md:min-h-[21rem] md:p-8"
      aria-label={`View ${product.shortName}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black bg-white">
          <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <span className={`rounded-full border px-3 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${product.trialAvailable ? "border-primary bg-[#dff5f2] text-black" : "border-black bg-black text-white"}`}>
          {product.trialAvailable ? "Trial available" : "Demo-led"}
        </span>
      </div>

      <div className="mt-8">
        <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-primary">{getFamilyLabel(product)}</p>
        <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-black">{product.shortName}</h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-black">{product.overview}</p>
      </div>

      <div className="mt-auto flex items-end justify-between gap-5 border-t border-black/20 pt-5">
        <div>
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-primary">Starting at</p>
          <p className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-black">{product.startingPrice}</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition group-hover:bg-primary">
          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};

const productsForFamily = (family?: ProductFamily) => {
  if (!family) return products;
  const slugs = new Set(family.slugs);
  return products.filter((product) => slugs.has(product.slug));
};

const ProductCatalog = () => {
  const [activeTab, setActiveTab] = useState("All");
  const activeFamily = activeTab === "All" ? undefined : familyByShortLabel[activeTab] as ProductFamily | undefined;
  const visibleProducts = productsForFamily(activeFamily);

  return (
    <section id="product-catalog" className="scroll-mt-24 border-t border-black px-5 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-caption text-primary">Available modules</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.045em] text-black md:text-6xl">Choose one place to start.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-black md:text-right">Deploy one capability now. Connect products into a unified operating system as your requirements grow.</p>
        </AnimatedSection>

        <div className="-mx-5 mt-10 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:px-0" aria-label="Filter deployable products">
          <div className="flex min-w-max gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`rounded-full border px-4 py-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition ${activeTab === tab ? "border-primary bg-primary text-white" : "border-black bg-white text-black hover:bg-[#f1fbf9]"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-black/60" aria-live="polite">
          {visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"} · {activeTab}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>

        <AnimatedSection className="mt-16 overflow-hidden rounded-[2rem] bg-black p-7 text-white md:mt-24 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#71d7d5]">Not sure which product fits?</p>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">Define the operational requirement. We will identify the right starting point.</h2>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#71d7d5] px-5 py-3 text-sm font-semibold text-black transition hover:bg-white">
              Request Systems Brief
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProductCatalog;
