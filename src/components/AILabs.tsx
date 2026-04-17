import { Leaf, Mountain, UserCircle, type LucideIcon } from "lucide-react";
import { aiLabFocus } from "@/content/siteContent";
import AnimatedSection from "./AnimatedSection";

const iconByTitle: Record<string, LucideIcon> = {
  Agriculture: Leaf,
  Mining: Mountain,
  "Operational agents": UserCircle,
};

const AILabs = () => {
  return (
    <section id="labs" className="px-6 pb-16 md:pb-24">
      <div className="relative max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
              Research Focus
            </p>
            <h2 className="font-display text-2xl md:text-4xl uppercase tracking-wide mb-4">
              AI Labs stays concentrated on a few high-value operating contexts
            </h2>
            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
              The lab stays narrow on purpose. It focuses on contexts where AI can materially improve operating visibility, workflow speed, or decision quality without becoming a detached demo exercise.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-3">
          {aiLabFocus.map((lab, index) => {
            const Icon = iconByTitle[lab.title] ?? UserCircle;
            return (
              <AnimatedSection key={lab.title} delay={index * 150}>
                <div className="card-glass rounded-3xl p-6 md:p-8 h-full min-h-[22rem] flex flex-col">
                  <div className="w-12 h-12 rounded-md border border-border/40 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg md:text-xl uppercase tracking-wide mb-4">
                    {lab.title}
                  </h3>
                  <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                    {lab.summary}
                  </p>

                  <div className="mt-6 border-t border-border/20 pt-4">
                    <p className="font-display text-xs tracking-[0.15em] uppercase text-primary/70 mb-3">
                      Current directions
                    </p>
                    <ul className="space-y-3">
                      {lab.directions.map((item) => (
                        <li key={item} className="text-sm font-light text-muted-foreground flex items-start gap-2">
                          <span className="text-primary/60 mt-0.5">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AILabs;
