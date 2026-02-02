import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { label: "Systems", href: "#systems" },
  { label: "AI Labs", href: "#labs" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
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
          }}
          className="font-display text-sm tracking-[0.2em] text-foreground hover:text-primary transition-colors duration-300"
        >
          MATHBROOKS
        </a>

        {/* Nav links + theme toggle */}
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

        {/* Mobile: just the toggle */}
        <div className="sm:hidden">
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
