import { lazy, Suspense } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import VisionSection from "@/components/landing/VisionSection";

const DemoSection = lazy(() => import("@/components/landing/DemoSection"));

const Index = () => {
  usePageMeta({
    title: "MathBrooks | Software. Automation. AI. Built for real-world impact.",
    description:
      "MathBrooks designs and builds custom software, automation systems, and AI-powered solutions for real-world business problems. Based in Harare, Zimbabwe.",
    canonicalPath: "/",
    keywords: [
      "software company Zimbabwe",
      "custom software Harare",
      "business automation Africa",
      "applied AI systems",
      "software engineering Harare",
    ],
  });

  return (
    <SiteLayout>
      <HeroSection />
      <ProblemSection />
      <SolutionsSection />
      <Suspense fallback={null}>
        <DemoSection />
      </Suspense>
      <VisionSection />
    </SiteLayout>
  );
};

export default Index;
