import { Cpu, Database, Cloud, Workflow } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const features = [
  {
    icon: Cpu,
    title: "Software Systems",
    description: "Production-grade platforms built for reliability and throughput at scale",
  },
  {
    icon: Database,
    title: "AI Labs",
    description: "Applied research turning models into real-world African solutions",
  },
  {
    icon: Cloud,
    title: "Digital Infrastructure",
    description: "Scalable backends and cloud architecture for growing demands",
  },
  {
    icon: Workflow,
    title: "Autonomous Platforms",
    description: "Self-operating systems that reduce human bottlenecks",
  },
];

const WhatWeBuild = () => {
  return (
    <section id="systems" className="py-16 md:py-[120px] lg:py-[150px] px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide">
              What We Build
            </h2>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        {/* Cards — horizontal grid, geometric layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 100}>
              <div className="card-glass card-hover rounded-lg p-6 md:p-8 group h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-11 h-11 rounded-md border border-border/40 flex items-center justify-center group-hover:border-primary/40 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-sm tracking-wider uppercase mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuild;
