import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const milestones = [
  {
    title: "Now",
    items: [
      "Custom software delivery for operations-heavy businesses.",
      "Discovery and pilot work for applied AI where it can clearly reduce manual effort.",
      "Post-launch support for systems that need to keep improving after release.",
    ],
    active: true,
  },
  {
    title: "Next",
    items: [
      "Reusable components for agriculture, mining, and operational analytics use cases.",
      "More internal copilots and workflow tools tied to measurable business outcomes.",
      "Stronger reporting and data products built around client KPIs.",
    ],
    active: false,
  },
  {
    title: "Long Term",
    items: [
      "Regional partnerships with operators and sector specialists across Africa and beyond.",
      "Repeatable IP developed from successful engagements rather than speculative R&D.",
      "Selective long-horizon research only where it strengthens client delivery.",
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
              Direction
            </span>
            <p className="text-base font-light text-muted-foreground mt-3 max-w-xl mx-auto">
              Where we are focusing the business so delivery stays grounded in real
              client value.
            </p>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide mt-8">
              Strategic Focus
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
