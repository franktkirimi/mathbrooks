import SiteLayout from "@/components/site/SiteLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import PeopleFirstHomepage from "@/components/landing/PeopleFirstHomepage";

const Index = () => {
  usePageMeta({
    title: "MathBrooks | Intelligent Systems Architecture",
    description:
      "MathBrooks architects intelligent systems—from operational software to national infrastructure—for organisations, institutions, and nations.",
    canonicalPath: "/",
    keywords: [
      "intelligent systems company Zimbabwe",
      "digital infrastructure Zimbabwe",
      "production-grade software products",
      "applied AI systems",
      "connected systems Africa",
    ],
  });

  return (
    <SiteLayout>
      <PeopleFirstHomepage />
    </SiteLayout>
  );
};

export default Index;
