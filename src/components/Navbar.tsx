import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-background/80 backdrop-blur-md border-b border-border/20"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMobileOpen(false);
          }}
          className="font-display text-sm tracking-[0.2em] text-foreground hover:text-primary transition-colors duration-300"
        >
          MATHBROOKS
        </a>

        {/* Desktop: Nav links + theme toggle */}
        <div className="hidden sm:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-[0.65rem] tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300 uppercase"
            >
              {item.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative w-12 h-6 rounded-full border border-border/40 bg-secondary/50 hover:border-primary/30 transition-all duration-300 flex items-center px-1"
          >
            <div
              className={cn(
                "w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300",
                isDark ? "translate-x-0 bg-primary/20" : "translate-x-6 bg-primary/20"
              )}
            >
              {isDark ? (
                <Moon className="w-2.5 h-2.5 text-primary" />
              ) : (
                <Sun className="w-2.5 h-2.5 text-primary" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile: hamburger + theme toggle */}
        <div className="sm:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-md border border-border/40 flex items-center justify-center hover:border-primary/30 transition-all duration-300"
          >
            {isDark ? (
              <Moon className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Sun className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="w-9 h-9 rounded-md border border-border/40 flex items-center justify-center hover:border-primary/30 transition-all duration-300"
          >
            {mobileOpen ? (
              <X className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Menu className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        className={cn(
          "sm:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-md border-b border-border/20",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-b-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-sm tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300 uppercase py-3 border-b border-border/10 last:border-0"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
