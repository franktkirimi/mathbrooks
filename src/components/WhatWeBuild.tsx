import { Cpu, Workflow, Brain } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const features = [
  {
    icon: Cpu,
    title: "Custom Software",
    description:
      "Tailored platforms and tools built for your specific business workflows, from internal dashboards to client-facing products.",
  },
  {
    icon: Workflow,
    title: "Automation",
    description:
      "Streamline repetitive processes with intelligent automation — reduce manual work, cut errors, and scale faster.",
  },
  {
    icon: Brain,
    title: "Applied AI",
    description:
      "Integrate machine learning and AI into your operations — from predictive analytics to natural language processing.",
  },
];

const WhatWeBuild = () => {
  return (
    <section id="services" className="py-16 md:py-[120px] lg:py-[150px] px-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 100}>
              <div className="card-glass card-hover rounded-lg p-6 md:p-8 group h-full flex flex-col">
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
                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* CTA */}
                <a
                  href="#packages"
                  className="mt-auto inline-flex items-center text-xs font-display tracking-wider uppercase text-primary/70 hover:text-primary transition-colors duration-300"
                >
                  Learn more →
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuild;
