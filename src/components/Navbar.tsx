import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const productLink = { label: "Solutions", href: "/solutions" };
const thingsLink = { label: "Things", href: "/things" };

const mainNav = [
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isSolutions = location.pathname.startsWith("/solutions");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  useEffect(() => {
    if (!solutionsOpen) return;

    const closeMenu = (event: MouseEvent) => {
      if (!solutionsMenuRef.current?.contains(event.target as Node)) setSolutionsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSolutionsOpen(false);
    };

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [solutionsOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-background/85 backdrop-blur-md border-b border-border/20"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto grid h-[4.5rem] w-full max-w-[1800px] grid-cols-[auto,minmax(0,1fr),auto] items-center px-5 sm:h-20 sm:px-6 xl:px-10">
        <Link
          to="/"
          className="group inline-flex items-center gap-3 text-foreground transition-colors duration-300"
        >
          <img
            src="/mathbrooks-mark.svg"
            alt=""
            className="h-9 w-9 object-contain transition-transform duration-300 group-hover:-rotate-3 sm:h-11 sm:w-11"
            width="64"
            height="64"
          />
          <span className="font-body text-xl font-semibold tracking-[0.02em] sm:text-2xl">MATHBROOKS</span>
        </Link>

        <div className="hidden min-w-0 items-center justify-center gap-14 xl:flex">
          <Link
            to="/"
            className={cn(
              "mb-nav-link font-body whitespace-nowrap",
              location.pathname === "/"
                ? "text-primary"
                : "text-[hsl(var(--nav))] hover:text-primary"
            )}
          >
            Home
          </Link>

          <div className="relative" ref={solutionsMenuRef}>
            <button
              type="button"
              onClick={() => setSolutionsOpen((open) => !open)}
              aria-expanded={solutionsOpen}
              aria-haspopup="menu"
              aria-controls="solutions-menu"
              className={cn(
                "mb-nav-link inline-flex items-center gap-1 font-body whitespace-nowrap",
                isSolutions ? "text-primary" : "text-[hsl(var(--nav))] hover:text-primary"
              )}
            >
              {productLink.label}
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", solutionsOpen && "rotate-180")} aria-hidden="true" />
            </button>

            {solutionsOpen && (
              <div
                id="solutions-menu"
                role="menu"
                aria-label="Solutions"
                className="absolute left-1/2 top-[calc(100%+1rem)] w-80 -translate-x-1/2 rounded-lg border border-border bg-card p-2 shadow-[var(--shadow-overlay)]"
              >
                <Link
                  to="/solutions"
                  role="menuitem"
                  className="block rounded-md px-4 py-3 transition-colors hover:bg-muted focus-visible:bg-muted"
                >
                  <span className="mb-caption block text-primary">Custom</span>
                  <span className="block text-sm font-medium text-foreground">Configure a system around your work</span>
                </Link>
                <Link
                  to="/solutions/available"
                  role="menuitem"
                  className="block rounded-md px-4 py-3 transition-colors hover:bg-muted focus-visible:bg-muted"
                >
                  <span className="mb-caption block text-primary">Available</span>
                  <span className="block text-sm font-medium text-foreground">Choose from ready-to-use solutions</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            to={thingsLink.href}
            className={cn(
              "mb-nav-link font-body whitespace-nowrap",
              location.pathname === thingsLink.href
                ? "text-primary"
                : "text-[hsl(var(--nav))] hover:text-primary"
            )}
          >
            {thingsLink.label}
          </Link>

          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "mb-nav-link font-body whitespace-nowrap",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-[hsl(var(--nav))] hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden xl:flex items-center justify-end gap-4 ml-6">
          <Link
            to="/contact"
            className="action-button rounded-lg px-4 py-2 font-body text-sm font-medium transition-colors duration-300 whitespace-nowrap"
          >
            Contact us
          </Link>

        </div>

        <div className="xl:hidden col-start-3 flex items-center gap-3 justify-self-end">
          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
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
        id="mobile-navigation"
        className={cn(
          "xl:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-md border-b border-border/20",
          mobileOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 border-b-0"
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4 sm:px-6" aria-label="Mobile navigation">
          <Link
            to="/"
            className={cn(
              "mb-nav-link font-body py-3 border-b border-border/10",
              location.pathname === "/"
                ? "text-primary"
                : "text-[hsl(var(--nav))] hover:text-primary"
            )}
          >
            Home
          </Link>

          <div className="border-b border-border/10 py-3">
            <p className={cn("mb-nav-link font-body", isSolutions ? "text-primary" : "text-[hsl(var(--nav))]")}>{productLink.label}</p>
            <div className="mt-2 grid gap-1 border-l border-border/50 pl-4 text-sm">
              <Link to="/solutions" className="py-1.5 text-muted-foreground transition-colors hover:text-primary">Custom</Link>
              <Link to="/solutions/available" className="py-1.5 text-muted-foreground transition-colors hover:text-primary">Available</Link>
            </div>
          </div>

          <Link
            to={thingsLink.href}
            className={cn(
              "mb-nav-link font-body py-3 border-b border-border/10",
              location.pathname === thingsLink.href
                ? "text-primary"
                : "text-[hsl(var(--nav))] hover:text-primary"
            )}
          >
            {thingsLink.label}
          </Link>

          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "mb-nav-link font-body py-3 border-b border-border/10",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-[hsl(var(--nav))] hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/contact"
            className="action-button mt-3 inline-flex items-center justify-center rounded-lg px-4 py-3 font-body text-sm font-medium transition-colors duration-300"
          >
            Contact us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
