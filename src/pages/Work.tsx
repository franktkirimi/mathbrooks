import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import PageHero from "@/components/site/PageHero";
import SiteLayout from "@/components/site/SiteLayout";
import { caseStudies } from "@/content/siteContent";
import { usePageMeta } from "@/hooks/usePageMeta";

const Work = () => {
  usePageMeta({
    title: "Case Studies | MathBrooks",
    description:
      "Representative MathBrooks case studies across workflow automation, education technology, and operational analytics.",
    canonicalPath: "/work",
    keywords: [
      "software case studies Africa",
      "workflow automation examples",
      "education platform case study",
      "analytics platform case study",
    ],
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case Studies"
        title="Representative delivery across operations, product, and visibility"
        description="These case studies show the kind of problems MathBrooks tends to solve: workflow friction, fragmented operations, and teams that need clearer systems and decision-making visibility."
        actions={(
          <>
            <Link to="/book-demo">
              <Button size="lg" className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6">
                Discuss a Similar Problem
              </Button>
            </Link>
            <Link to="/services">
              <Button
                variant="outline"
                size="lg"
                className="font-display text-xs tracking-[0.15em] uppercase px-8 py-6 border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
              >
                See Services
              </Button>
            </Link>
          </>
        )}
      />

      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
                What These Show
              </p>
              <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
                Each case study follows the same clear structure
              </h2>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                The goal is to make the delivery path easy to read: the business problem, the system that was built, the tools used, and the outcome the client cared about.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Problem first",
                detail: "The case study starts with the operational friction that made the work necessary.",
              },
              {
                title: "Build clearly explained",
                detail: "The solution is described in plain business and systems language, not feature noise.",
              },
              {
                title: "Outcome stays visible",
                detail: "Technology and measured results are shown as part of the delivery story, not decoration.",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 100}>
                <div className="card-glass rounded-3xl p-6 md:p-8 h-full min-h-[14rem]">
                  <h3 className="font-display text-base md:text-lg uppercase tracking-wide mb-4">
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
        <div className="max-w-6xl mx-auto space-y-6">
          {caseStudies.map((item, index) => (
            <AnimatedSection key={item.slug} delay={index * 120}>
              <article className="card-glass rounded-3xl p-6 md:p-8 lg:p-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
                  <div className="relative min-h-[280px] rounded-2xl overflow-hidden border border-border/20">
                    <img
                      src={item.image}
                      alt={`Screenshot of ${item.title}`}
                      loading="lazy"
                      width={800}
                      height={520}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/80 mb-2">
                        {item.sector}
                      </p>
                      <h2 className="font-display text-2xl uppercase tracking-wide text-foreground">
                        {item.title}
                      </h2>
                      <p className="text-sm font-light text-muted-foreground mt-3 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/20 bg-background/25 p-6 md:p-8 h-full flex flex-col justify-between">
                    <div>
                      <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-3">
                        Delivery Summary
                      </p>
                      <h3 className="font-display text-lg md:text-xl uppercase tracking-wide mb-3">
                        What changed operationally
                      </h3>
                      <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                        {item.result}
                      </p>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      {item.metrics.map((metric) => (
                        <div
                          key={metric}
                          className="rounded-2xl border border-border/20 bg-background/35 px-4 py-4 text-sm font-light text-muted-foreground text-center"
                        >
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-border/20 bg-background/25 p-6 md:p-7 h-full">
                    <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-3">
                      Business Problem
                    </p>
                    <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                      {item.businessProblem}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/20 bg-background/25 p-6 md:p-7 h-full">
                    <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-3">
                      What MathBrooks Built
                    </p>
                    <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                      {item.solution}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/20 bg-background/25 p-6 md:p-7 h-full">
                    <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-3">
                      Technology Used
                    </p>
                    <ul className="space-y-3">
                      {item.technology.map((tech) => (
                        <li key={tech} className="text-sm md:text-base font-light text-muted-foreground flex items-start gap-2">
                          <span className="text-primary/60 mt-0.5">—</span>
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-border/20 bg-background/25 p-6 md:p-7 h-full">
                    <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70 mb-3">
                      Outcome
                    </p>
                    <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Work;
