import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AILabs from "@/components/AILabs";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import { aiLabFocus, serviceAssurance } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

const AILabsPage = () => {
  usePageMeta({
    title: "AI Labs | MathBrooks",
    description:
      "MathBrooks AI Labs explores practical applied AI for agriculture, mining, and operational agent systems in African business contexts.",
    canonicalPath: "/ai-labs",
    keywords: [
      "AI labs Africa",
      "applied AI Zimbabwe",
      "agentic systems operations",
      "AI for agriculture Africa",
    ],
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="AI Labs"
        title="Applied AI research grounded in sector problems, operational risk, and real deployment paths"
        description="MathBrooks AI Labs explores where intelligent systems can create clear value in African industries. The focus is not novelty for its own sake. It is practical experimentation that can become a pilot, a product capability, or a governed service line."
        actions={(
          <>
            <Link to="/book-demo">
              <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
                Discuss an AI Use Case
              </Button>
            </Link>
            <Link to="/services">
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
              >
                View AI Services
              </Button>
            </Link>
          </>
        )}
        sideContent={(
          <div className="space-y-3">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70">
              Current Focus
            </p>
            {aiLabFocus.map((item) => (
              <div key={item.title} className="rounded-xl border border-border/20 bg-background/40 p-4">
                <h2 className="font-display text-xs tracking-[0.15em] uppercase mb-2">
                  {item.title}
                </h2>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        )}
      />

      <AILabs />

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {serviceAssurance.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 120}>
              <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
                <div className="w-12 h-12 rounded-md border border-border/40 flex items-center justify-center mb-6">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-sm tracking-[0.15em] uppercase mb-3">
                  {item.title}
                </h2>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default AILabsPage;
