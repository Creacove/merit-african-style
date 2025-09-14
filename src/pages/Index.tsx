import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SignatureStyles from "@/components/SignatureStyles";
import BrandStatement from "@/components/BrandStatement";
import ServicesPreview from "@/components/ServicesPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <SignatureStyles />
      <BrandStatement />
      <ServicesPreview />
      <Footer />
    </div>
  );
};

export default Index;
