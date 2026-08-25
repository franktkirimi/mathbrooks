import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppWidget from "@/components/site/WhatsAppWidget";
import { useAuditActive } from "@/components/audit/AuditActiveContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SiteLayoutProps = {
  children: ReactNode;
};

const HashScroll = () => {
  const { hash } = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    target?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }, [hash, reducedMotion]);

  return null;
};

const RouteScroll = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const { active: auditActive } = useAuditActive();

  return (
    <div className="site-shell min-h-screen bg-background overflow-x-hidden">
      <HashScroll />
      <RouteScroll />
      <ScrollProgress />
      <CursorGlow />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-display focus:tracking-wider focus:uppercase"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      {/* Suppressed while a diagnostic is in progress (approved plan §4/§11) — every
          competing conversion path is removed until results are reached. */}
      {!auditActive ? <WhatsAppWidget /> : null}
    </div>
  );
};

export default SiteLayout;
