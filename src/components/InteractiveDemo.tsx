import { useMemo, useState } from "react";
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

  const activeIndex = useMemo(
    () => demoFeatures.findIndex((feature) => feature.screen === activeFeature.screen),
    [activeFeature.screen]
  );

  return (
    <section className="relative px-6 py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 40%), linear-gradient(180deg, rgba(11,15,25,0.98) 0%, rgba(11,15,25,1) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
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

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.78fr)_minmax(0,1.22fr)]">
          <AnimatedSection>
            <div className="lg:sticky lg:top-[120px]">
              <div className="hidden md:block">
                <DemoFeatureMenu
                  features={demoFeatures}
                  activeFeature={activeFeature}
                  onSelect={setActiveFeature}
                />
              </div>

              <div className="md:hidden rounded-[1.5rem] border border-border/40 bg-white/[0.03] p-3">
                <div className="flex gap-2 overflow-x-auto pb-1">
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
                            ? "border-primary/35 bg-primary/10 text-white"
                            : "border-border/30 bg-transparent text-white/55"
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

              <div className="mt-4 rounded-[1.5rem] border border-border/30 bg-white/[0.02] px-4 py-3">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/45">
                  Platform module {String(activeIndex + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-sm font-light text-muted-foreground">
                  Each module uses the same operating surface, adjusted to the workflow.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={120}>
            <DemoScreen feature={activeFeature} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
