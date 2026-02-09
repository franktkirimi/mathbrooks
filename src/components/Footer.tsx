import { Link } from "react-router-dom";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "AI Labs", href: "#ai-labs" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="py-8 md:py-12 px-6 border-t border-border/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="font-display text-sm tracking-[0.2em] text-muted-foreground">
            MATHBROOKS
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/privacy"
              className="text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm font-light text-muted-foreground">
            &copy; {new Date().getFullYear()} MathBrooks
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
