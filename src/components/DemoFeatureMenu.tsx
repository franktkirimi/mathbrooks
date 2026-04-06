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
    <div className="space-y-3">
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
              "group w-full rounded-2xl border px-4 py-4 text-left transition-all duration-300",
              active
                ? "border-primary/30 bg-white/[0.05] shadow-[0_0_0_1px_hsl(var(--primary)/0.12)]"
                : "border-border/30 bg-transparent hover:border-white/15 hover:bg-white/[0.03]"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-white/45">
                  {String(feature.screen).toUpperCase()}
                </p>
                <h3 className="mt-1 font-display text-sm md:text-base uppercase tracking-wide text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <span
                className={cn(
                  "mt-1 h-2.5 w-2.5 rounded-full transition-all duration-300",
                  active ? "bg-primary shadow-[0_0_24px_hsl(var(--primary)/0.35)]" : "bg-white/20"
                )}
              />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default memo(DemoFeatureMenu);
