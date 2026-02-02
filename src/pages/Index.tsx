import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeBuild from "@/components/WhatWeBuild";
import AILabs from "@/components/AILabs";
import HowWeWork from "@/components/HowWeWork";
import Traction from "@/components/Traction";
import Roadmap from "@/components/Roadmap";
import Principles from "@/components/Principles";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhatWeBuild />
      <AILabs />
      <HowWeWork />
      <Traction />
      <Roadmap />
      <Principles />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
