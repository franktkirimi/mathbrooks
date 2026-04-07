import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";
import DemoFeatureMenu, { type DemoFeature } from "./DemoFeatureMenu";
import DemoScreen from "./DemoScreen";

const demoFeatures: DemoFeature[] = [
  {
    title: "Customer Management",
    description: "Track leads, customers and deals",
    screen: "crm",
  },
  {
    title: "HR & Payroll",
    description: "Manage employees and payroll",
    screen: "hr",
  },
  {
    title: "Finance",
    description: "Monitor revenue and invoices",
    screen: "finance",
  },
  {
    title: "Inventory",
    description: "Keep stock and purchasing visible",
    screen: "inventory",
  },
  {
    title: "Projects",
    description: "Organize team work and tasks",
    screen: "projects",
  },
  {
    title: "Automation",
    description: "Route work through approvals",
    screen: "automation",
  },
  {
    title: "Analytics",
    description: "See what the business is doing",
    screen: "analytics",
  },
  {
    title: "AI Assistant",
    description: "Ask questions about your business data",
    screen: "ai",
  },
];

const tabs = demoFeatures.map((feature) => feature.screen);

const InteractiveDemo = () => {
  const [activeFeature, setActiveFeature] = useState<DemoFeature>(demoFeatures[0]);

  return (
    <section className="relative px-6 py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.07) 0%, transparent 40%), hsl(var(--background))",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="max-w-3xl mb-10 md:mb-14">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">
              Interactive Demo
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] uppercase tracking-wide leading-[1.02]">
              Click through the platform without leaving the page
            </h2>
            <p className="mt-5 max-w-2xl text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              The left side shows the modules. The right side updates like a live product surface, so visitors can understand the platform before they ever book a call.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-[minmax(260px,280px)_minmax(0,1fr)] xl:grid-cols-[minmax(280px,300px)_minmax(0,1fr)]">
          <AnimatedSection className="min-w-0">
            <div className="lg:sticky lg:top-[120px]">
              <div className="hidden md:block">
                <DemoFeatureMenu
                  features={demoFeatures}
                  activeFeature={activeFeature}
                  onSelect={setActiveFeature}
                />
              </div>

              <div className="md:hidden overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/80 p-3">
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                  {tabs.map((tab) => {
                    const feature = demoFeatures.find((item) => item.screen === tab) as DemoFeature;
                    const active = feature.screen === activeFeature.screen;

                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveFeature(feature)}
                        className={cn(
                          "shrink-0 rounded-full border px-4 py-2 text-xs font-display uppercase tracking-[0.16em] transition-all duration-300",
                          active
                            ? "border-primary/35 bg-primary/10 text-primary"
                            : "border-border/60 bg-transparent text-muted-foreground"
                        )}
                      >
                        {feature.title}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3">
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {activeFeature.description}
                  </p>
                </div>
              </div>

            </div>
          </AnimatedSection>

          <AnimatedSection delay={120} className="min-w-0">
            <DemoScreen feature={activeFeature} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
