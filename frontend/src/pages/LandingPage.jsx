import React from "react";
import HeroSection from "../components/Hero";
import SupportSection from "../components/Support";
import AssHome from "../components/AssHome";
import FeaturesSection from "../components/Features";
import AIAssistants from "../components/AI";
import Credible from "../components/Credible";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SupportSection /> 
      <AssHome />
      <FeaturesSection />
      <AIAssistants />
      <Credible />
      <Footer />
    </>
  );
}