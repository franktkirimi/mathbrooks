import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import { productFamilies, products } from "@/content/siteContent";
import type { ProductEntry, ProductFamily } from "@/content/siteContent";

const productLookup = new Map(products.map((p) => [p.slug, p]));

// Short tab labels that fit without wrapping
const TAB_LABELS: Record<string, string> = {
  "Sales & Customer Operations": "Sales",
  "People & Payroll": "People",
  "Finance & Operational Control": "Finance",
  "Delivery & Workflow Execution": "Delivery",
  "Visibility & Intelligence": "Intelligence",
};

// ─── Product Card ────────────────────────────────────────────────────────────
const ProductCard = ({ product, index }: { product: ProductEntry; index: number }) => {
  const Icon = product.icon;
  const contactPath = product.trialAvailable
    ? `/start-trial?product=${product.slug}`
    : `/book-demo?product=${product.slug}`;

  return (
    <AnimatedSection delay={index * 60}>
      <div className="card-glass rounded-2xl p-6 md:p-7 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl border border-border/40 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <span
            className={`text-xs font-light mt-0.5 ${
              product.trialAvailable ? "text-emerald-400" : "text-muted-foreground"
            }`}
          >
            {product.trialAvailable ? "Guided trial available" : "Demo-led rollout"}
          </span>
        </div>

        {/* Name + overview */}
        <div className="mb-5 flex-1">
          <p className="font-display text-[0.65rem] tracking-[0.2em] uppercase text-primary/60 mb-1.5">
            {product.family}
          </p>
          <h3 className="font-display text-lg font-semibold tracking-[-0.01em] mb-3 text-foreground">
            {product.shortName}
          </h3>
          <p className="text-sm font-light text-muted-foreground leading-6">
            {product.overview}
          </p>
        </div>

        {/* Pricing */}
        <div className="rounded-xl border border-border/20 bg-background/40 px-4 py-3.5 mb-5">
          <p className="font-display text-[0.62rem] tracking-[0.18em] uppercase text-primary/60 mb-1">
            Starting Price
          </p>
          <p className="font-display text-lg text-foreground mb-1">{product.startingPrice}</p>
          <p className="text-xs font-light text-muted-foreground">
            {product.trialAvailable
              ? "Trial access available before rollout."
              : "Includes demo and onboarding planning."}
          </p>
        </div>

        {/* Audience */}
        <div className="mb-6">
          <p className="font-display text-[0.62rem] tracking-[0.18em] uppercase text-primary/60 mb-1.5">
            Best For
          </p>
          <p className="text-sm font-light text-muted-foreground leading-6">{product.audience}</p>
        </div>

        {/* CTAs — one primary, one text link */}
        <div className="flex items-center gap-4 mt-auto">
          <Link to={`/products/${product.slug}`}>
            <Button className="font-display text-[0.7rem] tracking-[0.12em] uppercase px-5 py-2.5">
              View Product
            </Button>
          </Link>
          <Link
            to={contactPath}
            className="text-[0.7rem] font-display tracking-[0.12em] uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {product.trialAvailable ? "Start Trial" : "Book Demo"}
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
};

// ─── Family Group ─────────────────────────────────────────────────────────────
const FamilyGroup = ({ family }: { family: ProductFamily }) => {
  const familyProducts = family.slugs
    .map((slug) => productLookup.get(slug))
    .filter(Boolean) as ProductEntry[];

  return (
    <div className="space-y-5">
      <div className="pb-4 border-b border-border/30">
        <p className="font-display text-[0.65rem] tracking-[0.22em] uppercase text-primary/70 mb-1">
          {TAB_LABELS[family.title] ?? family.title}
        </p>
        <p className="text-sm font-light text-muted-foreground max-w-xl">{family.description}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {familyProducts.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i} />
        ))}
      </div>
    </div>
  );
};

// ─── Tab bar ──────────────────────────────────────────────────────────────────
const TABS = ["All", ...productFamilies.map((f) => TAB_LABELS[f.title] ?? f.title)];

const familyByShortLabel = Object.fromEntries(
  productFamilies.map((f) => [TAB_LABELS[f.title] ?? f.title, f])
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ProductCatalog = () => {
  const [activeTab, setActiveTab] = useState("All");

  const visibleFamilies =
    activeTab === "All"
      ? productFamilies
      : [familyByShortLabel[activeTab]].filter(Boolean) as ProductFamily[];

  return (
    <section id="product-catalog" className="px-6 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto space-y-10 md:space-y-14">

        {/* Section header */}
        <AnimatedSection>
          <div className="max-w-2xl">
            <p className="font-display text-[0.68rem] tracking-[0.28em] uppercase text-primary mb-3">
              Product Catalog
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] mb-3">
              Choose the module that matches the bottleneck first.
            </h2>
            <p className="text-sm font-light text-muted-foreground leading-7">
              Every module runs standalone and connects into a broader rollout when you need more control.
            </p>
          </div>
        </AnimatedSection>

        {/* Tab filter bar */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 font-display text-[0.68rem] tracking-[0.12em] uppercase transition-all duration-200 ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/50 bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Families */}
        <div className="space-y-14">
          {visibleFamilies.map((family) => (
            <FamilyGroup key={family.title} family={family} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
