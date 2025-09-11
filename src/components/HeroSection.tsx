import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const titleWords = ["Bespoke", "Tailoring", "for", "the", "Modern", "Gentleman"];
  
  return (
    <section className="relative min-h-screen px-6 lg:px-12 py-16 overflow-hidden">
      {/* Floating Geometric Overlays */}
      <div className="overlay-shape top-20 left-10 w-32 h-32 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full text-secondary">
          <path d="M20,20 L80,20 L60,80 L40,80 Z" fill="currentColor" opacity="0.3"/>
          <circle cx="30" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      <div className="overlay-shape top-40 right-20 w-24 h-24 opacity-15" style={{animationDelay: '5s'}}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
          <polygon points="50,15 85,75 15,75" fill="currentColor" opacity="0.4"/>
          <line x1="30" y1="30" x2="70" y2="70" stroke="currentColor" strokeWidth="3"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column - 7/12 */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-6">
            <h1 className="hero-title font-playfair font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.98] tracking-tight text-foreground">
              {titleWords.map((word, index) => (
                <span key={index} className="inline-block mr-4">
                  {word}
                </span>
              ))}
            </h1>
            
            <p className="hero-subtitle font-inter text-lg lg:text-xl text-muted-foreground max-w-2xl">
              Fine fabrics and exacting cuts, hand-finished tailoring with attention to every seam.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 max-w-md">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="(0xx) xxxx xxxx"
                    className="pl-10 bg-input border-border text-foreground rounded-full"
                  />
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-inter font-semibold px-6 rounded-full">
                  Call Me
                </Button>
              </div>
              
              {/* Additional CTA */}
              <div className="flex items-center gap-4">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-inter font-semibold px-8 py-3 rounded-full">
                  Book a Fitting
                </Button>
                <div className="scroll-indicator flex flex-col items-center text-muted-foreground">
                  <span className="text-xs mb-1">Scroll</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - 5/12 - Layered 3D Hero Image */}
        <div className="lg:col-span-5 relative">
          <div className="hero-3d-container relative w-full h-[600px] lg:h-[700px]">
            {/* Background Image Layer */}
            <div className="absolute inset-0 w-full h-full rounded-b-[40px] overflow-hidden z-[1]">
              <img 
                src="/lovable-uploads/e6c969f7-79b5-41a0-85a5-69eb63eb293d.png" 
                alt="Nigerian cultural background with geometric patterns"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Mannequin Image Layer */}
            <div className="mannequin-container absolute top-[20%] left-1/2 transform -translate-x-1/2 z-[2] h-auto max-h-[800px]">
              <img 
                src="/lovable-uploads/fa1bcab1-df72-4fd9-b3f5-465190ca17ee.png" 
                alt="Mannequin wearing traditional green African attire"
                className="mannequin-image h-auto max-h-[800px] w-auto"
              />
            </div>
            
            {/* Circular CTA */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 z-[3]">
              <Button
                size="lg"
                className="w-16 h-16 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:scale-105 transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Small Floating Card */}
      <div className="absolute bottom-12 left-6 lg:left-12 max-w-xs">
        <div className="bg-accent rounded-2xl p-4 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">👤</span>
            </div>
            <div>
              <p className="font-inter font-medium text-accent-foreground text-sm">
                Suit for wedding events
              </p>
              <button className="text-xs font-inter text-accent-foreground/70 hover:text-accent-foreground underline">
                Explore More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSection;
