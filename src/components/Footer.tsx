import { Link } from "react-router-dom";

const productLinks = [
  { label: "CRM", href: "/products/crm" },
  { label: "HR & Payroll", href: "/products/hr" },
  { label: "Projects", href: "/products/projects" },
  { label: "Analytics", href: "/products/analytics" },
];

const companyLinks = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/work" },
  { label: "AI Labs", href: "/ai-labs" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
];

const Footer = () => {
  return (
    <footer className="pt-12 md:pt-16 pb-8 px-6 border-t border-border/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="font-display text-sm tracking-[0.2em] text-foreground hover:text-primary transition-colors duration-300"
            >
              MATHBROOKS
            </Link>
            <p className="text-sm font-light text-muted-foreground mt-4 leading-relaxed max-w-xs">
              Software, business platforms, and applied AI built in Harare for businesses that need practical operating systems.
            </p>
            <Link
              to="/book-demo"
              className="inline-flex mt-5 font-display text-xs tracking-[0.15em] uppercase text-primary/80 hover:text-primary transition-colors duration-300"
            >
              Book a Demo
            </Link>
          </div>

          <div>
            <h2 className="font-display text-xs tracking-[0.15em] uppercase text-foreground mb-4">
              Products
            </h2>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/products"
                  className="text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  All Products
                </Link>
              </li>
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xs tracking-[0.15em] uppercase text-foreground mb-4">
              Company
            </h2>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xs tracking-[0.15em] uppercase text-foreground mb-4">
              Contact
            </h2>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:cto@mathbrooks.com"
                  className="text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  cto@mathbrooks.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/263783469023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="tel:+263783469023"
                  className="text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  +263 78 346 9023
                </a>
              </li>
              <li className="text-sm font-light text-muted-foreground pt-2">
                Harare, Zimbabwe
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-muted-foreground">
            &copy; {new Date().getFullYear()} MathBrooks. All rights reserved.
          </p>
          <p className="text-xs font-light text-muted-foreground">
            Built for practical operations across Africa and beyond.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
