import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCatalog from "@/components/ProductCatalog";
import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";

const AvailableSolutions = () => {
  usePageMeta({
    title: "Available Solutions | MathBrooks",
    description: "Explore ready-to-use MathBrooks solutions for HR and payroll, CRM, finance, projects, inventory, analytics, and workflow automation.",
    canonicalPath: "/solutions/available",
  });

  return (
    <SiteLayout>
      <section className="border-b border-border/60 px-6 pb-12 pt-36 md:pb-16 md:pt-44">
        <div className="mb-container">
          <p className="mb-caption mb-5 text-primary">Available solutions</p>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] lg:items-end">
            <div className="max-w-4xl">
              <h1 className="mb-display">Ready-to-use systems for the work you do every day.</h1>
              <p className="mb-body mt-6 max-w-2xl text-muted-foreground">
                Start with a proven solution for HR and payroll, customer management, finance, projects, inventory, analytics, and workflow automation.
              </p>
            </div>
            <div className="border-l-2 border-primary pl-5">
              <p className="text-base font-medium text-foreground">Need something more specific?</p>
              <Link to="/solutions" className="mb-link mt-3 inline-flex items-center gap-2">
                Build a custom system <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ProductCatalog />
    </SiteLayout>
  );
};

export default AvailableSolutions;
