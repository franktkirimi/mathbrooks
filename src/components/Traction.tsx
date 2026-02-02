import { Activity, Globe, Server } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stats = [
  {
    icon: Activity,
    value: "3",
    label: "Active AI Labs",
    detail: "Agriculture, Mining, AI Employees",
  },
  {
    icon: Globe,
    value: "Southern Africa",
    label: "Operating Region",
    detail: "Zimbabwe-based, continent-wide ambition",
  },
  {
    icon: Server,
    value: "Production",
    label: "Systems in Development",
    detail: "Real infrastructure, not prototypes",
  },
];

const Traction = () => {
  return (
    <section className="py-16 md:py-[120px] lg:py-[150px] px-6 relative">
      {/* Subtle accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(217 91% 60% / 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
              Traction
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold mt-4">
              Where We Stand
            </h2>
            <div className="line-accent w-24 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 100}>
              <div className="card-glass card-hover rounded-lg p-6 md:p-8 text-center group h-full">
                <div className="mb-6 flex justify-center">
                  <div className="w-12 h-12 rounded-lg border border-border/50 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                    <stat.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                </div>

                <div className="font-display text-xl md:text-2xl font-bold text-gradient-accent mb-2">
                  {stat.value}
                </div>
                <h3 className="font-display text-sm tracking-wide mb-3">
                  {stat.label}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Traction;
