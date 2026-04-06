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
        sideContent={(
          <div className="space-y-3">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-primary/70">
              What to expect
            </p>
            {[
              "Clear business problem framing",
              "What MathBrooks actually built",
              "Technology used and measured result",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-border/20 bg-background/40 px-4 py-3 text-sm font-light text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        )}
      />

      <section className="px-6 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto space-y-8">
          {caseStudies.map((item, index) => (
            <AnimatedSection key={item.slug} delay={index * 120}>
              <article className="card-glass rounded-2xl overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]">
                  <div className="relative min-h-[240px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-border/20">
                    <img
                      src={item.image}
                      alt={`Screenshot of ${item.title}`}
                      loading="lazy"
                      width={800}
                      height={520}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                    <div className="absolute left-6 bottom-6 right-6">
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

                  <div className="p-6 md:p-8 space-y-6">
                    <div>
                      <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/70 mb-2">
                        Business Problem
                      </p>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {item.businessProblem}
                      </p>
                    </div>

                    <div>
                      <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/70 mb-2">
                        What MathBrooks Built
                      </p>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {item.solution}
                      </p>
                    </div>

                    <div>
                      <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/70 mb-2">
                        Technology Used
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.technology.map((tech) => (
                          <span
                            key={tech}
                            className="text-[0.65rem] font-display tracking-wider uppercase px-3 py-1 rounded-full border border-border/30 text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-display text-[0.65rem] tracking-[0.15em] uppercase text-primary/70 mb-2">
                        Measured Result
                      </p>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                        {item.result}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="text-[0.65rem] font-display tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary/80"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
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
