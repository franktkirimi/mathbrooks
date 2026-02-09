import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeBuild from "@/components/WhatWeBuild";
import HowWeWork from "@/components/HowWeWork";
import OurProjects from "@/components/OurProjects";
import TechStack from "@/components/TechStack";
import Packages from "@/components/Packages";
import AILabs from "@/components/AILabs";
import Roadmap from "@/components/Roadmap";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link for keyboard/screen reader users */}
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-display focus:tracking-wider focus:uppercase"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
      <Hero />
      <WhatWeBuild />
      <HowWeWork />
      <OurProjects />
      <TechStack />
      <Packages />
      <AILabs />
      <Roadmap />
      <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
