import { Circle, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const milestones = [
  {
    phase: "Now",
    title: "Foundation",
    items: [
      "Core software systems in production",
      "AI Labs research underway",
      "First enterprise pilots in Zimbabwe",
    ],
    active: true,
  },
  {
    phase: "2025 – 2026",
    title: "Scale",
    items: [
      "Agriculture AI deployed to commercial farms",
      "Mining intelligence platform live",
      "AI Employee agents in enterprise use",
    ],
    active: false,
  },
  {
    phase: "2027 – 2030",
    title: "Expand",
    items: [
      "Operations across 5+ African countries",
      "Autonomous platforms running at national scale",
      "MathBrooks infrastructure as industry standard",
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
            <AnimatedSection key={milestone.phase} delay={index * 150} direction="left">
              <div className="card-glass card-hover rounded-lg p-6 md:p-10 group relative overflow-hidden">
                {/* Active indicator */}
                {milestone.active && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-full" />
                )}

                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Phase label */}
                  <div className="md:w-40 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Circle
                        className={`w-2.5 h-2.5 ${
                          milestone.active
                            ? "text-primary fill-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="font-display text-xs tracking-[0.2em] text-primary uppercase">
                        {milestone.phase}
                      </span>
                    </div>
                    <h3 className="font-display text-lg tracking-wide ml-[18px]">
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
