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

const PageHero = ({ eyebrow: _eyebrow, title, description, actions, sideContent, chips }: PageHeroProps) => {
  return (
    <section className="relative px-5 pb-14 pt-28 sm:px-6 md:pb-28 md:pt-44 overflow-hidden">
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
            ? "max-w-7xl grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.85fr)] lg:items-end"
            : "max-w-5xl"
        }`}
      >
        <AnimatedSection>
          <div className={`min-w-0 ${sideContent ? "" : "text-center"}`}>
            <h1
              className={`font-display font-semibold leading-[1.14] tracking-[-0.02em] break-words w-full
                text-[2rem] sm:text-[2.35rem] md:text-[2.5rem] lg:text-[2.7rem] xl:text-[3.1rem]
                ${sideContent ? "" : "max-w-4xl mx-auto"}`}
            >
              {title}
            </h1>

            <p
              className={`mt-5 text-base font-light leading-7 text-muted-foreground md:text-[1.02rem] md:leading-8 ${
                sideContent ? "max-w-2xl" : "max-w-3xl mx-auto"
              }`}
            >
              {description}
            </p>

            {chips && chips.length > 0 ? (
              <div
                className={`mt-7 flex flex-wrap gap-x-5 gap-y-2 ${
                  sideContent ? "" : "justify-center"
                }`}
              >
                {chips.map((chip) => (
                  <span key={chip} className="text-sm font-light text-muted-foreground/70">
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}

            {actions ? (
              <div className={`mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center ${sideContent ? "" : "sm:justify-center"} [&>a]:w-full [&>a>button]:w-full sm:[&>a]:w-auto sm:[&>a>button]:w-auto`}>
                {actions}
              </div>
            ) : null}
          </div>
        </AnimatedSection>

        {sideContent ? (
          <AnimatedSection delay={100}>
            {sideContent}
          </AnimatedSection>
        ) : null}
      </div>
    </section>
  );
};

export default PageHero;
