import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AILabs from "@/components/AILabs";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import { aiLabPath, aiLabReadiness, serviceAssurance } from "@/content/siteContent";
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
        title="Applied AI research for sector problems that have a real path into operations"
        description="MathBrooks AI Labs is where new AI ideas are tested before they become a product capability or a scoped delivery path. The work stays focused on operational questions with enough value, structure, and risk clarity to justify experimentation."
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
      />

      <AILabs />

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                From Question To Pilot
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
                The lab turns useful questions into bounded delivery decisions
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                AI Labs is not a place where ideas stay abstract. The work is structured so promising research can move toward a pilot, a product capability, or a governed service path.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aiLabPath.map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 100}>
                <div className="card-glass rounded-3xl p-6 md:p-8 h-full min-h-[16rem]">
                  <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-3">
                    Step {item.step}
                  </p>
                  <h3 className="font-display text-base md:text-lg uppercase tracking-wide mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Fit And Readiness
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
                Not every AI idea belongs in the lab
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                The best work starts with a specific operational question and a realistic route into the business. If those are missing, the right next step is usually ordinary software, a product deployment, or more workflow definition.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 lg:grid-cols-2">
            {aiLabReadiness.map((group, index) => (
              <AnimatedSection key={group.title} delay={index * 120}>
                <div className="card-glass rounded-3xl p-6 md:p-8 h-full min-h-[20rem]">
                  <h3 className="font-display text-lg md:text-xl uppercase tracking-wide mb-4">
                    {group.title}
                  </h3>
                  <ul className="space-y-4">
                    {group.points.map((item) => (
                      <li key={item} className="text-sm md:text-base font-light text-muted-foreground flex items-start gap-2 leading-relaxed">
                        <span className="text-primary/60 mt-0.5">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Delivery Guardrails
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
                AI work stays useful when the operating rules are visible
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                The lab does not treat AI as a decorative layer. Research only matters if rollout, approvals, ownership, and operational fit are designed alongside the intelligence layer.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-3">
          {serviceAssurance.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 120}>
              <div className="card-glass rounded-3xl p-6 md:p-8 h-full min-h-[16rem]">
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
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto rounded-3xl border border-primary/20 bg-primary/5 px-6 py-10 md:px-10 md:py-12 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/80 mb-3">
                Looking for a practical AI route?
              </p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide mb-3">
                Bring the workflow question, then decide whether the lab is the right path
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                If the problem is clear enough to test, MathBrooks can help determine whether it belongs in AI Labs, a product module, or a scoped service engagement.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
            </div>
          </div>
        </AnimatedSection>
      </section>
    </SiteLayout>
  );
};

export default AILabsPage;
