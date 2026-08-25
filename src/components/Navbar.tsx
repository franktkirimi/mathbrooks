import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Products", href: "/products" },
  { label: "Custom Systems", href: "/services" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/products") return location.pathname.startsWith("/products");
    if (href === "/research") return location.pathname.startsWith("/research");
    return location.pathname === href;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "border-b border-border/20 bg-background/85 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      {location.pathname === "/" && !scrolled && !mobileOpen ? (
        <div aria-hidden="true" className="human-signal-nav-stream pointer-events-none absolute -right-40 -top-8 hidden h-56 w-[64rem] lg:block" />
      ) : null}
      <nav className="relative z-10 mx-auto flex h-[4.25rem] w-full max-w-7xl items-center px-5 sm:h-[4.5rem] sm:px-6 xl:px-10">
        <Link to="/" className="group inline-flex shrink-0 items-center gap-2 text-foreground transition-colors duration-300">
          <img
            src="/mathbrooks-mark.svg"
            alt=""
            className="h-7 w-7 object-contain transition-transform duration-300 group-hover:-rotate-3 sm:h-8 sm:w-8"
            width="64"
            height="64"
          />
          <span className="font-display text-base font-semibold tracking-[0.02em] sm:text-lg">MATHBROOKS</span>
        </Link>

        <div className="ml-auto hidden min-w-0 items-center gap-6 xl:flex 2xl:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "mb-nav-link whitespace-nowrap font-display !font-medium",
                isActive(item.href) ? "text-primary" : "text-[hsl(var(--nav))] hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="action-button ml-2 whitespace-nowrap rounded-lg px-4 py-2 font-display text-sm font-medium transition-colors duration-300 !bg-[#0f766e] hover:!bg-[#0b5f59]"
          >
            Request Systems Brief
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border/40 transition-all duration-300 hover:border-primary/30"
          >
            {mobileOpen ? <X className="h-4 w-4 text-muted-foreground" /> : <Menu className="h-4 w-4 text-muted-foreground" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={cn(
          "overflow-hidden border-b border-border/20 bg-background/95 backdrop-blur-md transition-all duration-300 ease-in-out xl:hidden",
          mobileOpen ? "max-h-[80vh] overflow-y-auto opacity-100" : "max-h-0 border-b-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4 font-display sm:px-6" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "mb-nav-link border-b border-border/10 py-3 font-display !font-medium",
                isActive(item.href) ? "text-primary" : "text-[hsl(var(--nav))] hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/audit"
            className="mb-nav-link border-b border-border/10 py-3 font-display !font-medium text-[hsl(var(--nav))] hover:text-primary"
          >
            Audit My Business
          </Link>
          <Link
            to="/contact"
            className="action-button mt-3 inline-flex items-center justify-center rounded-lg px-4 py-3 font-display text-sm font-medium transition-colors duration-300 !bg-[#0f766e] hover:!bg-[#0b5f59]"
          >
            Request Systems Brief
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
