import type { ReactNode } from "react";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppWidget from "./WhatsAppWidget";

type SiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <div className="site-shell min-h-screen bg-background overflow-x-hidden">
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
      <WhatsAppWidget />
      <Footer />
    </div>
  );
};

export default SiteLayout;
