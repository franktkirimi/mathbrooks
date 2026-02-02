import { Leaf, Mountain, UserCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const labs = [
  {
    icon: Leaf,
    title: "AI for Agriculture",
    description:
      "Autonomous crop intelligence and predictive decision systems for smallholder and commercial farms across Southern Africa",
  },
  {
    icon: Mountain,
    title: "AI for Mining",
    description:
      "Operational optimization and safety monitoring built for Africa's mining sector",
  },
  {
    icon: UserCircle,
    title: "AI Employees",
    description:
      "Autonomous digital managers for enterprise operations — reducing cost and increasing output for African businesses",
  },
];

const AILabs = () => {
  return (
    <section id="labs" className="py-16 md:py-[120px] lg:py-[150px] px-6 relative">
      {/* Subtle accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, hsl(217 91% 60% / 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide">
              AI Labs
            </h2>
            <p className="text-base font-light text-muted-foreground mt-6 max-w-lg mx-auto">
              Pioneering autonomous intelligence for industries that matter
            </p>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        {/* Lab cards with thin geometric connecting lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {labs.map((lab, index) => (
            <AnimatedSection key={lab.title} delay={index * 150}>
              <div className="card-glass card-hover rounded-lg p-6 md:p-10 group relative overflow-hidden h-full">
                {/* Geometric accent triangle */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--primary)) 0%, transparent 70%)`,
                    clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                  }}
                />

                {/* Icon */}
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-md border border-border/40 flex items-center justify-center group-hover:border-primary/40 transition-all duration-300">
                    <lab.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-base tracking-wider uppercase mb-4">
                  {lab.title}
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {lab.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AILabs;
