import { lazy, Suspense } from "react";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import OurProjects from "@/components/OurProjects";
import ProductsHighlight from "@/components/ProductsHighlight";
import WhyWorkWithUs from "@/components/Testimonials";
import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const InteractiveDemo = lazy(() => import("@/components/InteractiveDemo"));
const ScrollProductReveal = lazy(() => import("@/components/ScrollProductReveal"));

const Index = () => {
  useSmoothScroll();
  usePageMeta({
    title: "MathBrooks | Run Your Business Better. Built for Africa.",
    description:
      "CRM, finance, HR, operations and AI - software built for modern African companies.",
    canonicalPath: "/",
    keywords: [
      "software company Zimbabwe",
      "business platforms Africa",
      "custom software Harare",
      "applied AI systems",
    ],
  });

  return (
    <SiteLayout>
      <Hero />
      <ProductsHighlight />
      <Suspense fallback={null}>
        <InteractiveDemo />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollProductReveal />
      </Suspense>
      <OurProjects />
      <WhyWorkWithUs />
      <Contact />
    </SiteLayout>
  );
};

export default Index;
