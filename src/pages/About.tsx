import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import WhyWorkWithUs from "@/components/Testimonials";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import {
  businessPillars,
  leadershipProfiles,
  operatingModel,
  proofHighlights,
  trustSignals,
} from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

const About = () => {
  usePageMeta({
    title: "About | MathBrooks",
    description:
      "Learn how MathBrooks builds practical software, business platforms, and applied AI from Harare for operations-heavy teams.",
    canonicalPath: "/about",
    keywords: [
      "software company Zimbabwe",
      "Harare software developers",
      "applied AI Africa",
      "business platforms Africa",
    ],
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="About"
        title="An engineer-led software company building practical systems for African business"
        description="MathBrooks exists to replace fragmented operations with software that is clear, usable, and grounded in how real teams work. The company is based in Harare and builds for businesses that need more than generic templates."
        chips={businessPillars}
        actions={(
          <>
            <Link to="/book-demo">
              <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
                Talk to MathBrooks
              </Button>
            </Link>
            <Link to="/work">
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
              >
                See Case Studies
              </Button>
            </Link>
          </>
        )}
        sideContent={(
          <div className="space-y-3">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70">
              Trust Signals
            </p>
            {trustSignals.map((item) => (
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

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <AnimatedSection>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Why MathBrooks Exists
              </p>
              <div className="space-y-4 text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                <p>
                  Too many businesses are asked to choose between generic imported software that does not fit the workflow, or custom systems that take too long to become useful. MathBrooks sits between those extremes.
                </p>
                <p>
                  The company builds products where the business need repeats, then uses custom software and applied AI where the workflow is specific to the client. That keeps the offer practical and keeps delivery close to real operations.
                </p>
                <p>
                  The standard is simple: software should reduce admin drag, improve visibility, and make the next decision easier for the people running the business.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={120}>
            <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
              <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-4">
                Stage and Focus
              </p>
              <div className="space-y-4 text-sm font-light text-muted-foreground leading-relaxed">
                <p>
                  MathBrooks is still growing, and that is deliberate. The company stays selective so delivery remains close to architecture, implementation, and rollout.
                </p>
                <p>
                  That means fewer handoffs, clearer technical accountability, and direct conversations about what should be a product, what should be bespoke, and what should not be built at all.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="mb-8 md:mb-12 max-w-3xl">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Leadership
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-3">
                Small enough to stay close to the work
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                MathBrooks stays intentionally close to architecture, product thinking, and delivery. That means clients work with the people shaping the system, not a handoff chain.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            {leadershipProfiles.map((profile, index) => (
              <AnimatedSection key={profile.name} delay={index * 120}>
                <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
                  <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-3">
                    {profile.role}
                  </p>
                  <h3 className="font-display text-xl uppercase tracking-wide mb-2">
                    {profile.name}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground mb-4">
                    {profile.qualification}
                  </p>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {profile.roleFocus}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="mb-8 md:mb-12 max-w-3xl">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Proof
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-3">
                Credibility comes from delivery, not slogans
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                MathBrooks is still selective about what it takes on. The clearest proof is the work already shipped and the operational outcomes clients cared about.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {proofHighlights.map((item, index) => (
              <AnimatedSection key={item.label} delay={index * 120}>
                <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
                  <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-3">
                    {item.label}
                  </p>
                  <p className="font-display text-2xl md:text-3xl uppercase tracking-wide">
                    {item.value}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="mb-8 md:mb-12 max-w-3xl">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                Operating Model
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-3">
                How the company works with clients
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                The workflow matters first. Product, custom build, or AI is a delivery choice that comes after the business problem is clear.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {operatingModel.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 120}>
                <div className="card-glass rounded-2xl p-6 md:p-8 h-full">
                  <h3 className="font-display text-sm tracking-[0.15em] uppercase mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <WhyWorkWithUs />
    </SiteLayout>
  );
};

export default About;
