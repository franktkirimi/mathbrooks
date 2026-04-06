import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  CreditCard,
  FolderKanban,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import TextScramble from "./TextScramble";

const platforms = [
  {
    icon: Users,
    title: "CRM",
    price: "Starting from $65/mo",
    description:
      "Manage leads, customers, and deals in one place.",
    href: "/products/crm",
  },
  {
    icon: FolderKanban,
    title: "HR & Payroll",
    price: "Starting from $85/mo",
    description:
      "Manage employees, payroll, and compliance workflows.",
    href: "/products/hr",
  },
  {
    icon: CreditCard,
    title: "Accounting",
    price: "Starting from $45/mo",
    description:
      "Track revenue, invoices, and cash movement with clarity.",
    href: "/products/accounting",
  },
  {
    icon: Boxes,
    title: "Inventory",
    price: "Starting from $55/mo",
    description:
      "Keep stock, purchasing, and reorder visibility in one layer.",
    href: "/products/inventory",
  },
  {
    icon: Workflow,
    title: "Projects",
    price: "Starting from $60/mo",
    description:
      "Organize initiatives, delivery work, and task ownership.",
    href: "/products/projects",
  },
  {
    icon: Sparkles,
    title: "Automation",
    price: "Starting from $35/mo",
    description:
      "Route approvals, reminders, and handoffs automatically.",
    href: "/products/automation",
  },
  {
    icon: TrendingUp,
    title: "Analytics",
    price: "Starting from $50/mo",
    description:
      "Turn operational data into dashboards, alerts, and reports.",
    href: "/products/analytics",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    price: "Starting from $15/mo",
    description:
      "Ask questions about your business data and get answers fast.",
    href: "/products/ai-assistant",
  },
];

const ProductsHighlight = () => {
  return (
    <section id="products" className="py-16 md:py-[120px] lg:py-[150px] px-6 relative">
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
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Platform Overview
            </p>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[3.5rem] font-bold uppercase tracking-wide">
              <TextScramble text="Everything your business needs to run properly" />
            </h2>
            <p className="text-base font-light text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
              CRM, finance, HR, inventory, projects, automation, analytics, and AI. The platform is designed to give growing businesses one operational system instead of disconnected tools.
            </p>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <AnimatedSection key={platform.title} delay={index * 100}>
              <Link to={platform.href} className="group block h-full">
                <div className="card-glass relative rounded-lg p-6 md:p-8 h-full flex flex-col transition-all duration-300 group-hover:border-primary/30 group-hover:-translate-y-1">
                  <div className="absolute inset-x-6 top-0 h-px overflow-hidden">
                    <div className="h-full w-24 -translate-x-24 bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-[320%] group-hover:opacity-100" />
                  </div>
                  <div className="w-12 h-12 rounded-md border border-border/40 flex items-center justify-center mb-6 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.15)] transition-all duration-300">
                    <platform.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>

                  <h3 className="font-display text-base tracking-wider uppercase mb-4">
                    {platform.title}
                  </h3>

                  <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5">
                    <span className="text-[0.62rem] font-display tracking-[0.18em] uppercase text-primary/80">
                      {platform.price}
                    </span>
                  </div>

                  <p className="text-sm font-light text-muted-foreground leading-relaxed flex-1">
                    {platform.description}
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-xs font-display tracking-wider uppercase text-primary/60 group-hover:text-primary transition-colors duration-300">
                    Get Started
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={450}>
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              View the product platform
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProductsHighlight;
