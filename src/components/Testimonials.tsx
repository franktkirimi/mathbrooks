import { Zap, Shield, Users, Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import InteractiveCard from "./InteractiveCard";
import TextScramble from "./TextScramble";

const highlights = [
  {
    icon: Zap,
    label: "Engineering",
    detail: "Modern architecture designed to scale cleanly",
  },
  {
    icon: Shield,
    label: "Security",
    detail: "Governance, approvals, and data protection built in",
  },
  {
    icon: Users,
    label: "Reliability",
    detail: "Systems designed for real operating pressure",
  },
  {
    icon: Globe,
    label: "Built in Africa",
    detail: "Grounded in local business realities, usable globally",
  },
];

const values = [
  {
    title: "Serious Engineering Standards",
    description:
      "Products and custom systems are built with a modular architecture so the platform can handle growth, integrations, and change without becoming brittle.",
  },
  {
    title: "Security And Permissions Matter",
    description:
      "Data access, approvals, and auditability are treated as part of the product surface, not last-minute enterprise add-ons.",
  },
  {
    title: "Reliability Over Demo Theatre",
    description:
      "The standard is not a flashy prototype. The standard is software that helps teams run operations consistently under real workload and reporting pressure.",
  },
  {
    title: "Direct Technical Accountability",
    description:
      "Clients work close to the people shaping the system, which keeps decisions grounded and reduces translation loss between product thinking and implementation.",
  },
];

const WhyWorkWithUs = () => {
  return (
    <section className="py-16 md:py-[120px] lg:py-[150px] px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(var(--primary) / 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-28">
            {highlights.map((item, index) => (
              <AnimatedSection key={item.label} delay={index * 100}>
                <div className="text-center group">
                  <div className="w-11 h-11 rounded-md border border-border/40 flex items-center justify-center mx-auto mb-3 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.15)] transition-all duration-300">
                    <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <div className="font-display text-sm tracking-wider uppercase mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs font-light text-muted-foreground leading-6">
                    {item.detail}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="text-center mb-14 md:mb-24">
            <h2 className="font-display text-[2rem] md:text-[3rem] lg:text-[3.5rem] font-bold uppercase tracking-wide">
              <TextScramble text="Serious Software Infrastructure" />
            </h2>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 150}>
              <InteractiveCard className="rounded-lg p-6 md:p-8 h-full flex flex-col">
                <div className="font-display text-5xl font-bold text-primary/10 mb-4">
                  0{index + 1}
                </div>

                <h3 className="font-display text-sm tracking-wider uppercase mb-4">
                  {value.title}
                </h3>

                <p className="text-base font-light text-muted-foreground leading-7 flex-1">
                  {value.description}
                </p>
              </InteractiveCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
