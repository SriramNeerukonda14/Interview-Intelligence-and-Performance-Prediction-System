import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import CTASection from "../components/CTASection";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <HeroSection />

      <FeatureSection />

      <CTASection />

    </div>
  );
}