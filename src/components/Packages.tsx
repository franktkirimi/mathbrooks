import { useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import ServiceModal from "./ServiceModal";

const packages = [
  {
    name: "Starter",
    label: "MVP",
    price: "From $2,000",
    audience: "Startups & small teams",
    features: [
      "Core feature build",
      "Responsive design",
      "Basic deployment",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Professional",
    label: "Full Build + AI",
    price: "From $8,000",
    audience: "Growing businesses",
    features: [
      "Full platform build",
      "AI/ML integration",
      "Cloud infrastructure",
      "3-month support",
    ],
    cta: "Start Building",
    featured: true,
  },
  {
    name: "Enterprise",
    label: "Custom + Ongoing",
    price: "Custom",
    audience: "Organisations at scale",
    features: [
      "Custom architecture",
      "Dedicated team",
      "AI strategy",
      "Ongoing partnership",
    ],
    cta: "Contact Us",
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
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide">
              Packages
            </h2>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <AnimatedSection key={pkg.name} delay={index * 150}>
              <div
                className={`card-glass card-hover rounded-lg p-6 md:p-10 group relative overflow-hidden h-full flex flex-col ${
                  pkg.featured ? "border border-primary/40" : ""
                }`}
              >
                {/* Featured accent */}
                {pkg.featured && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)",
                    }}
                  />
                )}

                {/* Package name + label */}
                <h3 className="font-display text-base tracking-wider uppercase mb-1">
                  {pkg.name}
                </h3>
                <span className="text-xs font-light text-muted-foreground tracking-wide">
                  {pkg.label}
                </span>

                {/* Price */}
                <p className="font-display text-2xl tracking-wide mt-4 mb-2 text-foreground">
                  {pkg.price}
                </p>

                {/* Audience */}
                <p className="text-sm font-light text-muted-foreground mb-6">
                  For: {pkg.audience}
                </p>

                {/* Features */}
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

                {/* CTA */}
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
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Package inquiry modal */}
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
