import { Zap, Shield, Users, Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const highlights = [
  {
    icon: Zap,
    label: "Fast Delivery",
    detail: "MVPs in weeks, not months",
  },
  {
    icon: Shield,
    label: "AI-First",
    detail: "Intelligence built into every system",
  },
  {
    icon: Users,
    label: "Direct Access",
    detail: "Work with the engineers, not middlemen",
  },
  {
    icon: Globe,
    label: "Global Reach",
    detail: "Headquartered in Africa, operating worldwide",
  },
];

const values = [
  {
    title: "We Ship Fast Without Cutting Corners",
    description:
      "Our lean team means less overhead and faster decisions. You get a working product in weeks — built with clean architecture that scales.",
  },
  {
    title: "Your Team Has Direct Access to Ours",
    description:
      "No account managers or ticket queues. You work directly with the engineers building your product via WhatsApp, Slack, or email.",
  },
  {
    title: "AI Isn't an Add-On — It's Built In",
    description:
      "We don't bolt AI onto finished products. We design intelligent systems from day one — automation, predictions, and insights baked into the core.",
  },
];

const WhyWorkWithUs = () => {
  return (
    <section className="py-16 md:py-[120px] lg:py-[150px] px-6 relative">
      {/* Subtle accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(217 91% 60% / 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Highlights bar */}
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
            {highlights.map((item) => (
              <div key={item.label} className="text-center group">
                <div className="w-11 h-11 rounded-md border border-border/40 flex items-center justify-center mx-auto mb-3 group-hover:border-primary/40 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <div className="font-display text-sm tracking-wider uppercase mb-1">
                  {item.label}
                </div>
                <div className="text-xs font-light text-muted-foreground">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-wide">
              Why Work With Us
            </h2>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        {/* Value proposition cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 150}>
              <div className="card-glass rounded-lg p-6 md:p-8 h-full flex flex-col relative group hover:border-primary/20 transition-colors duration-300">
                {/* Number accent */}
                <div className="font-display text-4xl font-bold text-primary/10 mb-4">
                  0{index + 1}
                </div>

                <h3 className="font-display text-sm tracking-wider uppercase mb-4">
                  {value.title}
                </h3>

                <p className="text-sm font-light text-muted-foreground leading-relaxed flex-1">
                  {value.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
