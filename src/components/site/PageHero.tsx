import type { ReactNode } from "react";
import AnimatedSection from "@/components/AnimatedSection";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  sideContent?: ReactNode;
  chips?: string[];
};

const PageHero = ({ eyebrow, title, description, actions, sideContent, chips }: PageHeroProps) => {
  return (
    <section className="relative px-6 pt-36 pb-20 md:pt-44 md:pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      />

      <div
        className={`relative mx-auto ${
          sideContent
            ? "max-w-7xl grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.9fr)] lg:items-end"
            : "max-w-5xl"
        }`}
      >
        <AnimatedSection>
          <div className={sideContent ? "" : "text-center"}>
            <p className="font-display mb-4 text-[0.76rem] tracking-[0.24em] uppercase text-primary">
              {eyebrow}
            </p>
            <h1
              className={`font-display text-[2.8rem] font-bold uppercase tracking-wide leading-[1.03] md:text-[3.5rem] lg:text-[4rem] ${
                sideContent ? "max-w-5xl" : "max-w-4xl mx-auto"
              }`}
            >
              {title}
            </h1>
            <p
              className={`mt-6 text-base font-light leading-8 text-muted-foreground md:text-[1.08rem] ${
                sideContent ? "max-w-3xl" : "max-w-3xl mx-auto"
              }`}
            >
              {description}
            </p>
            {chips && chips.length > 0 ? (
              <div
                className={`mt-8 flex flex-wrap gap-x-6 gap-y-2 ${
                  sideContent ? "" : "justify-center"
                }`}
              >
                {chips.map((chip) => (
                  <span key={chip} className="text-sm font-light text-muted-foreground">
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
            {actions ? (
              <div className={`flex flex-wrap gap-3 mt-8 ${sideContent ? "" : "justify-center"}`}>
                {actions}
              </div>
            ) : null}
          </div>
        </AnimatedSection>

        {sideContent ? (
          <AnimatedSection delay={120}>
            <div className="card-glass rounded-2xl p-5 md:p-6">{sideContent}</div>
          </AnimatedSection>
        ) : null}
      </div>
    </section>
  );
};

export default PageHero;
