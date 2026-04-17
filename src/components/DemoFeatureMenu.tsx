import { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type DemoFeature = {
  title: string;
  description: string;
  screen: "crm" | "hr" | "finance" | "inventory" | "projects" | "automation" | "analytics" | "ai";
};

type DemoFeatureMenuProps = {
  features: DemoFeature[];
  activeFeature: DemoFeature;
  onSelect: (feature: DemoFeature) => void;
};

const DemoFeatureMenu = ({ features, activeFeature, onSelect }: DemoFeatureMenuProps) => {
  return (
    <div className="card-glass overflow-hidden rounded-[1.5rem]">
      {features.map((feature) => {
        const active = activeFeature.screen === feature.screen;

        return (
          <motion.button
            key={feature.screen}
            type="button"
            onClick={() => onSelect(feature)}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "group relative w-full border-b border-border/60 px-4 py-3.5 text-left transition-all duration-300 last:border-b-0",
              active
                ? "bg-background/65 shadow-[0_0_0_1px_hsl(var(--primary)/0.08)]"
                : "bg-transparent hover:bg-background/50"
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300",
                  active ? "bg-primary shadow-[0_0_24px_hsl(var(--primary)/0.35)]" : "bg-foreground/15"
                )}
              />

              <div className="min-w-0">
                <h3 className="text-[0.98rem] font-medium tracking-[0.01em] text-foreground">
                  {feature.title}
                </h3>
                {active ? (
                  <p className="mt-1.5 max-w-[16rem] text-sm font-light leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                ) : null}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default memo(DemoFeatureMenu);
