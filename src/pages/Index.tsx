import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import PromotionalBanner from "@/components/PromotionalBanner";
import FeaturedCollection from "@/components/FeaturedCollection";
import BespokeJourney from "@/components/BespokeJourney";
import BrandStatement from "@/components/BrandStatement";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      {/* Dynamic Featured Products Loop */}
      <FeaturedCarousel />
      {/* Marketing Banner */}
      <PromotionalBanner />
      {/* New Arrivals Grid */}
      <FeaturedCollection />
      {/* Compact Process Steps */}
      <BespokeJourney />

      <BrandStatement />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
