import AnimatedSection from "./AnimatedSection";

const principles = [
  "Build systems for complexity and scale",
  "Prioritize clarity over unnecessary features",
  "Engineering-first, execution-focused",
  "Long-term vision: 5–10 year horizon",
];

const Principles = () => {
  return (
    <section id="about" className="py-16 md:py-[120px] lg:py-[150px] px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide">
              Why MathBrooks
            </h2>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        {/* Mission statement */}
        <AnimatedSection delay={100}>
          <p className="text-center font-light text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 md:mb-16">
            MathBrooks is an engineering company based in Harare, Zimbabwe — building
            AI-driven systems that solve hard, real-world problems across Africa.
            We think in decades, build for scale, and ship what matters.
          </p>
        </AnimatedSection>

        {/* Principles — minimal bullets, whitespace emphasis */}
        <div className="space-y-0">
          {principles.map((principle, index) => (
            <AnimatedSection key={index} delay={150 + index * 80} direction="left">
              <div className="group flex items-center gap-5 py-5 border-b border-border/20 last:border-0">
                <span className="font-display text-xs tracking-[0.2em] text-primary/50 group-hover:text-primary transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-light text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {principle}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Principles;
