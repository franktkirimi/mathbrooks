import { useState } from "react";
import { Link } from "react-router-dom";
import { Cpu, Workflow, Brain } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import InteractiveCard from "./InteractiveCard";
import TextScramble from "./TextScramble";
import ServiceModal from "./ServiceModal";

const features = [
  {
    icon: Cpu,
    title: "Custom Software",
    description:
      "Tailored platforms and tools built for your specific business workflows, from internal dashboards to client-facing products.",
    span: "md:col-span-2 lg:col-span-1 lg:row-span-2",
  },
  {
    icon: Workflow,
    title: "Automation",
    description:
      "Streamline repetitive processes with intelligent automation — reduce manual work, cut errors, and scale faster.",
    span: "",
  },
  {
    icon: Brain,
    title: "Applied AI",
    description:
      "Integrate machine learning and AI into your operations — from predictive analytics to natural language processing.",
    span: "",
  },
];

const WhatWeBuild = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<typeof features[0] | null>(null);

  const openModal = (feature: typeof features[0]) => {
    setActiveService(feature);
    setModalOpen(true);
  };

  return (
    <section id="services" className="py-16 md:py-[120px] lg:py-[150px] px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[3.5rem] font-bold uppercase tracking-wide">
              <TextScramble text="What We Build" />
            </h2>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 120} className={feature.span}>
              <InteractiveCard className="rounded-lg p-6 md:p-10 group h-full flex flex-col">
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-md border border-border/40 flex items-center justify-center group-hover:border-primary/40 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="font-display text-base tracking-wider uppercase mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6 flex-1">
                  {feature.description}
                </p>

                <button
                  onClick={() => openModal(feature)}
                  className="mt-auto inline-flex items-center text-xs font-display tracking-wider uppercase text-primary/70 hover:text-primary transition-colors duration-300 cursor-pointer bg-transparent border-0 p-0"
                >
                  Learn more →
                </button>
              </InteractiveCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={350}>
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              View full services overview
            </Link>
          </div>
        </AnimatedSection>
      </div>

      {activeService && (
        <ServiceModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          serviceName={activeService.title}
          serviceDescription={activeService.description}
        />
      )}
    </section>
  );
};

export default WhatWeBuild;
