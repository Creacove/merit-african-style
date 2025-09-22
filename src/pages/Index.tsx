import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SignatureStyles from "@/components/SignatureStyles";
import BespokeJourney from "@/components/BespokeJourney";
import BrandStatement from "@/components/BrandStatement";
import ServicesPreview from "@/components/ServicesPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <SignatureStyles />
      <BespokeJourney />
      <BrandStatement />
      <ServicesPreview />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
