import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const milestones = [
  {
    title: "Core Systems & R&D",
    items: [
      "Current: Core software systems fully operational in production.",
      "Research: AI Labs actively exploring next-generation intelligence.",
      "Enterprise Pilots: Initial deployments.",
    ],
    active: true,
  },
  {
    title: "Scale",
    items: [
      "Agriculture AI: Deployed on commercial farms, optimizing productivity.",
      "Mining Intelligence: Platform live and delivering actionable insights.",
      "Enterprise AI Agents: Employee-facing AI tools in active use.",
    ],
    active: false,
  },
  {
    title: "Expansion",
    items: [
      "Regional Operations: Across Africa and globally.",
      "Autonomous Platforms: Running at national scale, enabling large-scale automation.",
      "Industry Standard: MathBrooks infrastructure recognized as the benchmark across sectors.",
    ],
    active: false,
  },
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-16 md:py-[120px] lg:py-[150px] px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
              Vision
            </span>
            <p className="text-base font-light text-muted-foreground mt-3 max-w-xl mx-auto">
              To simplify earth's most complex problems through intelligent systems
            </p>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide mt-8">
              The Road Ahead
            </h2>
            <div className="line-accent w-24 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <AnimatedSection key={milestone.title} delay={index * 150} direction="left">
              <div className="card-glass card-hover rounded-lg p-6 md:p-10 group relative overflow-hidden">
                {/* Active indicator */}
                {milestone.active && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-full" />
                )}

                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Title */}
                  <div className="md:w-40 flex-shrink-0">
                    <h3 className="font-display text-lg tracking-wide">
                      {milestone.title}
                    </h3>
                  </div>

                  {/* Items */}
                  <div className="flex-1 space-y-3">
                    {milestone.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-primary transition-colors duration-300" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
