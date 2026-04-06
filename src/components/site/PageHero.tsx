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
    <section className="relative px-6 pt-28 md:pt-36 pb-14 md:pb-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end">
        <AnimatedSection>
          <div>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">
              {eyebrow}
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-[3.8rem] font-bold uppercase tracking-wide leading-[1.02] max-w-4xl">
              {title}
            </h1>
            <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl mt-6">
              {description}
            </p>
            {chips && chips.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-8">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="font-display text-[0.6rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-primary/25 text-primary/80"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
            {actions ? <div className="flex flex-wrap gap-3 mt-8">{actions}</div> : null}
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
