const navLinks = [
  { label: "Systems", href: "#systems" },
  { label: "AI Labs", href: "#labs" },
  { label: "About", href: "#about" },
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
          </div>

          {/* Copyright */}
          <p className="text-sm font-light text-muted-foreground">
            © {new Date().getFullYear()} MathBrooks
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
