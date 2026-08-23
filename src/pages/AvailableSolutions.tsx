import { ArrowDown, ArrowRight, Boxes } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCatalog from "@/components/ProductCatalog";
import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";

const AvailableSolutions = () => {
  usePageMeta({
    title: "Deployable Products | MathBrooks",
    description: "Compare production-ready MathBrooks products for customers, people, finance, delivery, automation, analytics, and AI.",
    canonicalPath: "/products",
  });

  return (
    <SiteLayout>
      <section className="px-5 pb-16 pt-32 sm:px-6 md:pb-20 md:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <AnimatedSection className="max-w-4xl">
            <p className="mb-caption text-primary">Deployable products</p>
            <h1 className="mt-6 font-display text-[clamp(3.4rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-black">
              Deploy proven systems. <span className="text-primary">Expand when ready.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black md:text-xl md:leading-9">
              Production-ready software for the operational core of your organisation—from customers and people to finance, delivery, automation, analytics, and AI.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#product-catalog" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[hsl(var(--primary-hover))]">
                Compare Deployable Products <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-lg border border-black px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#f1fbf9]">
                Architect a Custom System <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100} className="hidden lg:block">
            <div className="ml-auto max-w-[31rem] rounded-[2rem] bg-black p-8 text-white">
              <div className="flex items-center justify-between border-b border-white/20 pb-5">
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#71d7d5]">Module library</span>
                <Boxes className="h-5 w-5 text-white/60" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="mt-7 grid grid-cols-2 gap-2">
                {["CRM", "HR", "Finance", "Inventory", "Projects", "Automation", "Analytics", "AI"].map((module, index) => (
                  <span key={module} className={`border px-4 py-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] ${index === 1 || index === 6 ? "border-[#71d7d5] bg-[#71d7d5] text-black" : "border-white/25 text-white"}`}>{module}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <ProductCatalog />
    </SiteLayout>
  );
};

export default AvailableSolutions;
