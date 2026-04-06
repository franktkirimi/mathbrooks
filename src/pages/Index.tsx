import AILabs from "@/components/AILabs";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import OurProjects from "@/components/OurProjects";
import Packages from "@/components/Packages";
import ProductsHighlight from "@/components/ProductsHighlight";
import Roadmap from "@/components/Roadmap";
import TechStack from "@/components/TechStack";
import WhyWorkWithUs from "@/components/Testimonials";
import WhatWeBuild from "@/components/WhatWeBuild";
import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Index = () => {
  useSmoothScroll();
  usePageMeta({
    title: "MathBrooks | Run Your Business Better. Built for Africa.",
    description:
      "MathBrooks builds custom software, business platforms, and applied AI systems for operations-heavy businesses across Zimbabwe and beyond.",
    canonicalPath: "/",
  });

  return (
    <SiteLayout>
      <Hero />
      <ProductsHighlight />
      <WhatWeBuild />
      <HowWeWork />
      <OurProjects />
      <WhyWorkWithUs />
      <TechStack />
      <Packages />
      <AILabs />
      <Roadmap />
      <FAQ />
      <Contact />
    </SiteLayout>
  );
};

export default Index;
