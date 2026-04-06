import { ArrowRight, BarChart3, FolderKanban, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import TextScramble from "./TextScramble";

const platforms = [
  {
    icon: Users,
    title: "CRM",
    subtitle: "Customer Relationships",
    description:
      "Track leads, manage clients, and follow up on deals without juggling spreadsheets or missing the next step.",
    href: "/products/crm",
  },
  {
    icon: FolderKanban,
    title: "HR & Payroll",
    subtitle: "People & Compliance",
    description:
      "Run payroll, manage leave, and stay NSSA and ZIMRA ready with workflows built for Zimbabwean operations.",
    href: "/products/hr",
  },
  {
    icon: BarChart3,
    title: "Projects",
    subtitle: "Delivery & Tasks",
    description:
      "Plan work, assign tasks, and track delivery across teams with one clear view of what is moving and what is stuck.",
    href: "/products/projects",
  },
  {
    icon: TrendingUp,
    title: "Analytics",
    subtitle: "Business Intelligence",
    description:
      "Turn business data into decisions with dashboards, reports, and alerts shaped around the way your operation actually runs.",
    href: "/products/analytics",
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
              Business Platforms
            </p>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[3.5rem] font-bold uppercase tracking-wide">
              <TextScramble text="Product Modules You Can Deploy Faster" />
            </h2>
            <p className="text-base font-light text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
              These are the repeatable modules in the MathBrooks platform: CRM, HR &amp; Payroll, Projects, and Analytics. They help teams move faster than a full custom build while staying ready for future extensions.
            </p>
            <div className="line-accent w-20 mx-auto mt-8" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <AnimatedSection key={platform.title} delay={index * 100}>
              <Link to={platform.href} className="group block h-full">
                <div className="card-glass rounded-lg p-6 md:p-8 h-full flex flex-col transition-all duration-300 group-hover:border-primary/30">
                  <div className="w-12 h-12 rounded-md border border-border/40 flex items-center justify-center mb-6 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.15)] transition-all duration-300">
                    <platform.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>

                  <h3 className="font-display text-base tracking-wider uppercase mb-1">
                    {platform.title}
                  </h3>
                  <p className="font-display text-[0.6rem] tracking-[0.15em] uppercase text-primary/60 mb-4">
                    {platform.subtitle}
                  </p>

                  <p className="text-sm font-light text-muted-foreground leading-relaxed flex-1">
                    {platform.description}
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-xs font-display tracking-wider uppercase text-primary/60 group-hover:text-primary transition-colors duration-300">
                    Learn more
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
