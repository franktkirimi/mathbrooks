import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeBuild from "@/components/WhatWeBuild";
import HowWeWork from "@/components/HowWeWork";
import Packages from "@/components/Packages";
import AILabs from "@/components/AILabs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhatWeBuild />
      <HowWeWork />
      <Packages />
      <AILabs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
