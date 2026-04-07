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
    <div className="overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/85 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
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
              "group relative w-full border-b border-border/60 px-4 py-4 text-left transition-all duration-300 last:border-b-0",
              active
                ? "bg-background/65 shadow-[0_0_0_1px_hsl(var(--primary)/0.08)]"
                : "bg-transparent hover:bg-background/50"
            )}
          >
            <span
              className={cn(
                "absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all duration-300",
                active ? "bg-primary shadow-[0_0_24px_hsl(var(--primary)/0.35)]" : "bg-foreground/15"
              )}
            />
            <div className="pr-7">
              <p className="text-[0.58rem] font-medium uppercase tracking-[0.26em] text-muted-foreground/75">
                {String(feature.screen).toUpperCase()}
              </p>
              <h3 className="mt-1 text-base font-medium tracking-[0.01em] text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1.5 max-w-[18rem] text-sm font-light leading-5 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default memo(DemoFeatureMenu);
