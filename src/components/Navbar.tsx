import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const productLinks = [
  { label: "All Products", href: "/products" },
  { label: "CRM", href: "/products/crm" },
  { label: "HR & Payroll", href: "/products/hr" },
  { label: "Accounting", href: "/products/accounting" },
  { label: "Inventory", href: "/products/inventory" },
  { label: "Projects", href: "/products/projects" },
  { label: "Automation", href: "/products/automation" },
  { label: "Analytics", href: "/products/analytics" },
  { label: "AI Assistant", href: "/products/ai-assistant" },
];

const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/work" },
  { label: "AI Labs", href: "/ai-labs" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/blog" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileProductsOpen(false);
    setDesktopDropdownOpen(false);
  }, [location.pathname]);

  const productsActive = location.pathname === "/products" || location.pathname.startsWith("/products/");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-background/85 backdrop-blur-md border-b border-border/20"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-sm tracking-[0.2em] text-foreground hover:text-primary transition-colors duration-300"
        >
          MATHBROOKS
        </Link>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/"
            className={cn(
              "font-display text-[0.65rem] tracking-[0.08em] uppercase transition-colors duration-300",
              location.pathname === "/"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Home
          </Link>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDesktopDropdownOpen((current) => !current)}
              className={cn(
                "flex items-center gap-1 font-display text-[0.65rem] tracking-[0.08em] uppercase transition-colors duration-300",
                productsActive || desktopDropdownOpen
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Products
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform duration-200",
                  desktopDropdownOpen ? "rotate-180" : ""
                )}
              />
            </button>

            {desktopDropdownOpen ? (
              <div className="absolute top-full left-0 mt-3 w-60 rounded-xl border border-border/30 bg-background/95 backdrop-blur-md shadow-xl py-2">
                {productLinks.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setDesktopDropdownOpen(false)}
                    className={cn(
                      "block px-4 py-2.5 font-display text-[0.65rem] tracking-[0.08em] uppercase transition-colors duration-200",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary",
                      item.href === "/products" ? "border-b border-border/20 mb-1" : ""
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "font-display text-[0.65rem] tracking-[0.08em] uppercase transition-colors duration-300",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/book-demo"
            className="font-display text-[0.65rem] tracking-[0.08em] uppercase px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 whitespace-nowrap"
          >
            Start Demo
          </Link>

          <button
            type="button"
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

        <div className="lg:hidden flex items-center gap-3">
          <button
            type="button"
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
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
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

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-md border-b border-border/20",
          mobileOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 border-b-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          <Link
            to="/"
            className={cn(
              "font-display text-sm tracking-[0.15em] uppercase py-3 border-b border-border/10 transition-colors duration-300",
              location.pathname === "/"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Home
          </Link>

          <button
            type="button"
            onClick={() => setMobileProductsOpen((current) => !current)}
            className="flex items-center justify-between font-display text-sm tracking-[0.15em] uppercase py-3 border-b border-border/10 w-full text-left text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Products
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                mobileProductsOpen ? "rotate-180 text-primary" : ""
              )}
            />
          </button>

          {mobileProductsOpen ? (
            <div className="pl-4 flex flex-col gap-1 pb-2 border-b border-border/10">
              {productLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "font-display text-xs tracking-[0.15em] uppercase py-2 transition-colors duration-300",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}

          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "font-display text-sm tracking-[0.15em] uppercase py-3 border-b border-border/10 transition-colors duration-300",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/book-demo"
            className="mt-3 inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 font-display text-xs tracking-[0.15em] uppercase text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
          >
            Start Demo
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
