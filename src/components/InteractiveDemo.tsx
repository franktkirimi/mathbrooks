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
    <section className="relative overflow-hidden px-6 py-24 md:py-36">
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
          <div className="max-w-3xl mb-14 md:mb-20">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">
              Interactive Demo
            </p>
            <h2 className="font-display text-[2.1rem] md:text-[3.05rem] lg:text-[3.5rem] uppercase tracking-wide leading-[1.04]">
              See the platform without the noise
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-[1.04rem] font-light text-muted-foreground leading-8">
              Pick a module on the left. The workspace updates on the right with just the
              most important signals, so the product feels calm and understandable at a glance.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-[minmax(230px,250px)_minmax(0,1fr)] xl:grid-cols-[minmax(240px,260px)_minmax(0,1fr)]">
          <AnimatedSection className="min-w-0">
            <div className="lg:sticky lg:top-[112px]">
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
                  <p className="text-sm font-light text-muted-foreground leading-6">
                    {activeFeature.description}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100} className="min-w-0">
            <DemoScreen feature={activeFeature} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
