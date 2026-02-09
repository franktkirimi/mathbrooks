import AnimatedSection from "./AnimatedSection";

const technologies = [
  "React",
  "Python",
  "TypeScript",
  "AWS",
  "Vercel",
  "OpenAI",
  "PostgreSQL",
  "TensorFlow",
];

const TechStack = () => {
  return (
    <section className="py-16 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="font-display text-lg md:text-xl tracking-[0.2em] uppercase text-muted-foreground">
              Built With
            </h2>
            <p className="text-sm font-light text-muted-foreground mt-3 max-w-md mx-auto">
              The tools and platforms powering our solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="font-display text-xs md:text-sm tracking-[0.15em] uppercase text-muted-foreground/60 hover:text-primary/80 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TechStack;
