import { useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import InteractiveCard from "./InteractiveCard";
import TextScramble from "./TextScramble";
import ServiceModal from "./ServiceModal";

const packages = [
  {
    name: "Starter",
    label: "Scoped MVP",
    engagement: "Discovery-led pilot",
    timeline: "Typical timeline: 4-6 weeks",
    audience: "Teams validating a workflow, internal tool, or early product",
    features: [
      "Business workflow review",
      "Core feature build",
      "Deployment-ready handoff",
    ],
    cta: "Discuss Starter Scope",
    featured: false,
  },
  {
    name: "Professional",
    label: "Product Build + AI",
    engagement: "End-to-end delivery",
    timeline: "Typical timeline: 8-12 weeks",
    audience: "Growing businesses turning manual operations into software",
    features: [
      "Full platform build",
      "Automation and AI integration",
      "Cloud infrastructure",
      "3-month support",
    ],
    cta: "Plan the Build",
    featured: true,
  },
  {
    name: "Enterprise",
    label: "Custom + Ongoing",
    engagement: "Strategic partnership",
    timeline: "Roadmap scoped to business priorities",
    audience: "Organisations with complex systems, multiple stakeholders, or AI strategy needs",
    features: [
      "Custom architecture",
      "Dedicated team",
      "AI and systems strategy",
      "Long-term delivery support",
    ],
    cta: "Request a Proposal",
    featured: false,
  },
];

const Packages = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePackage, setActivePackage] = useState<typeof packages[0] | null>(null);

  const openModal = (pkg: typeof packages[0]) => {
    setActivePackage(pkg);
    setModalOpen(true);
  };

  return (
    <section id="packages" className="py-16 md:py-[120px] lg:py-[150px] px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Custom Delivery
            </p>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[3.5rem] font-bold uppercase tracking-wide">
              <TextScramble text="Engagement Paths" />
            </h2>
            <p className="text-base font-light text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
              Use these as starting points for custom software, automation, and AI
              work. Exact scope still depends on workflow complexity, delivery risk,
              and rollout needs.
            </p>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <AnimatedSection key={pkg.name} delay={index * 150}>
              <InteractiveCard
                className={`rounded-lg p-6 md:p-10 group h-full flex flex-col ${
                  pkg.featured ? "border border-primary/40" : ""
                }`}
              >
                {/* Featured accent line */}
                {pkg.featured && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px z-30"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)",
                    }}
                  />
                )}

                <h3 className="font-display text-base tracking-wider uppercase mb-1">
                  {pkg.name}
                </h3>
                <span className="text-xs font-light text-muted-foreground tracking-wide">
                  {pkg.label}
                </span>

                <p className="font-display text-2xl tracking-wide mt-4 mb-2 text-foreground">
                  {pkg.engagement}
                </p>
                <p className="text-xs font-light uppercase tracking-[0.12em] text-primary/70 mb-2">
                  {pkg.timeline}
                </p>

                <p className="text-sm font-light text-muted-foreground mb-6">
                  For: {pkg.audience}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm font-light text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary/60 mt-0.5">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.featured ? "default" : "outline"}
                  onClick={() => openModal(pkg)}
                  className={`w-full font-display text-xs tracking-[0.15em] uppercase ${
                    pkg.featured
                      ? ""
                      : "border-primary/30 hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
                  } transition-all duration-300`}
                >
                  {pkg.cta}
                </Button>
              </InteractiveCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={450}>
          <p className="text-center text-sm font-light text-muted-foreground max-w-3xl mx-auto mt-8 leading-relaxed">
            Every engagement is scoped around business goals, technical risk, delivery
            constraints, and support needs. If a fixed package is the wrong fit, we
            recommend a custom route instead of forcing a template.
          </p>
        </AnimatedSection>
      </div>

      {activePackage && (
        <ServiceModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          serviceName={`${activePackage.name} (${activePackage.label})`}
          serviceDescription={`For ${activePackage.audience}. Includes: ${activePackage.features.join(", ")}.`}
        />
      )}
    </section>
  );
};

export default Packages;
