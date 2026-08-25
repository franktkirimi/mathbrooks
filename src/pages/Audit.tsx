import SiteLayout from "@/components/site/SiteLayout";
import AuditFlow from "@/components/audit/AuditFlow";
import { usePageMeta } from "@/hooks/usePageMeta";

const Audit = () => {
  usePageMeta({
    title: "Free AI Business Efficiency Audit | MathBrooks Zimbabwe",
    description:
      "Run a free, structured AI business audit to find inefficient processes, manual work, and technology gaps — then see which MathBrooks systems could help.",
    canonicalPath: "/audit",
    keywords: ["free business audit", "digital efficiency score", "business technology audit Zimbabwe"],
  });

  return (
    <SiteLayout>
      <AuditFlow />
    </SiteLayout>
  );
};

export default Audit;
