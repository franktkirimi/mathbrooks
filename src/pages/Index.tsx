import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import PeopleFirstHomepage from "@/components/landing/PeopleFirstHomepage";

const Index = () => {
  usePageMeta({
    title: "MathBrooks | Technology built around people",
    description:
      "MathBrooks builds intelligent technology for people and the real world: products, AI, software, computing, and connected systems that solve meaningful problems.",
    canonicalPath: "/",
    keywords: [
      "people-first technology company",
      "intelligent technology Zimbabwe",
      "products built in Zimbabwe",
      "applied AI systems",
      "connected technology Africa",
    ],
  });

  return (
    <SiteLayout>
      <PeopleFirstHomepage />
    </SiteLayout>
  );
};

export default Index;
