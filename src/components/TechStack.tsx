import AnimatedSection from "./AnimatedSection";

const row1 = [
  "React", "Python", "TypeScript", "AWS", "Vercel",
  "OpenAI", "PostgreSQL", "TensorFlow", "Docker", "Next.js",
];

const row2 = [
  "FastAPI", "Redis", "Kubernetes", "Supabase", "LangChain",
  "Tailwind", "Node.js", "PyTorch", "GraphQL", "Prisma",
];

const MarqueeRow = ({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) => (
  <div className="relative overflow-hidden group">
    {/* Fade edges */}
    <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

    <div
      className={`flex gap-12 whitespace-nowrap ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      } group-hover:[animation-play-state:paused]`}
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="font-display text-lg md:text-2xl tracking-[0.15em] uppercase text-muted-foreground/20 hover:text-primary/60 transition-colors duration-500 cursor-default select-none"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const TechStack = () => (
  <section className="py-16 md:py-24 overflow-hidden">
    <AnimatedSection>
      <div className="text-center mb-10">
        <h2 className="font-display text-lg md:text-xl tracking-[0.2em] uppercase text-muted-foreground">
          Built With
        </h2>
      </div>
    </AnimatedSection>
    <div className="space-y-6">
      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reverse />
    </div>
  </section>
);

export default TechStack;
