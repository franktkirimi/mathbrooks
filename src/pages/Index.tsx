import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeBuild from "@/components/WhatWeBuild";
import HowWeWork from "@/components/HowWeWork";
import OurProjects from "@/components/OurProjects";
import Packages from "@/components/Packages";
import AILabs from "@/components/AILabs";
import Roadmap from "@/components/Roadmap";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhatWeBuild />
      <HowWeWork />
      <OurProjects />
      <Packages />
      <AILabs />
      <Roadmap />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
