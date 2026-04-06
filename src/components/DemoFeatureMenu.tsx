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
              "group relative w-full rounded-2xl border px-4 py-4 text-left transition-all duration-300",
              active
                ? "border-primary/25 bg-white/[0.05] shadow-[0_0_0_1px_hsl(var(--primary)/0.1)]"
                : "border-border/30 bg-transparent hover:border-white/15 hover:bg-white/[0.03]"
            )}
          >
            <span
              className={cn(
                "absolute left-0 top-4 bottom-4 w-px rounded-full transition-all duration-300",
                active ? "bg-primary/70" : "bg-transparent"
              )}
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/40">
                  {String(feature.screen).toUpperCase()}
                </p>
                <h3 className="mt-1 text-sm md:text-base font-medium tracking-[0.02em] text-white">
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
