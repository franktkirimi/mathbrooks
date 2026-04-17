import { useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
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
    <section id="packages" className="px-6 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Custom Delivery
            </p>
            <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
              Engagement paths for work that sits outside standard product rollout
            </h2>
            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              Use these as starting points for custom software, automation, and AI work. Exact pricing still depends on workflow complexity, delivery risk, and rollout needs.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <AnimatedSection key={pkg.name} delay={index * 150}>
              <div
                className={`card-glass rounded-3xl p-6 md:p-8 h-full min-h-[26rem] flex flex-col ${
                  pkg.featured ? "border border-primary/40" : ""
                }`}
              >
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
                  }`}
                >
                  {pkg.cta}
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={450}>
          <div className="max-w-3xl mx-auto mt-8 text-center">
            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              Every engagement is scoped around business goals, technical risk, delivery constraints, and support needs. If a fixed package is the wrong fit, MathBrooks recommends a custom route instead of forcing a template.
            </p>
          </div>
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
