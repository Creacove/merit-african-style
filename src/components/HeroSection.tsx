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

      {/* Tailoring SVG Background Shapes */}
      <div className="tailoring-shapes">
        {/* Sewing Machine Icon */}
        <div className="absolute top-16 left-1/4 w-20 h-20 opacity-20 z-[5]" style={{animationDelay: '2s'}}>
          <svg width="80" height="80" viewBox="0 0 120 120" className="text-secondary animate-drift">
            <g transform="translate(10,10)">
              <rect x="0" y="60" width="80" height="30" rx="5" fill="currentColor" opacity="0.8"/>
              <rect x="30" y="20" width="40" height="40" rx="10" fill="currentColor"/>
              <line x1="50" y1="20" x2="50" y2="0" stroke="#fff" strokeWidth="2"/>
              <circle cx="50" cy="10" r="5" fill="#fff"/>
            </g>
          </svg>
        </div>

        {/* Needle and Thread Icon */}
        <div className="absolute top-1/3 right-1/4 w-16 h-16 opacity-15 z-[5]" style={{animationDelay: '4s'}}>
          <svg width="64" height="64" viewBox="0 0 120 120" className="text-accent animate-drift">
            <g transform="translate(10,70)">
              <line x1="0" y1="0" x2="80" y2="80" stroke="currentColor" strokeWidth="3"/>
              <path d="M80,80 Q85,75 80,70" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="80" cy="80" r="3" fill="currentColor"/>
            </g>
          </svg>
        </div>

        {/* Fabric Scissors Icon */}
        <div className="absolute bottom-1/3 left-16 w-12 h-12 opacity-20 z-[5]" style={{animationDelay: '6s'}}>
          <svg width="48" height="48" viewBox="0 0 120 120" className="text-muted animate-drift">
            <g transform="translate(60,10)">
              <path d="M0,0 L40,40 M40,0 L0,40" stroke="currentColor" strokeWidth="4" fill="none"/>
              <circle cx="20" cy="20" r="5" fill="currentColor"/>
            </g>
          </svg>
        </div>

        {/* Traditional Bead Icon */}
        <div className="absolute top-2/3 right-12 w-14 h-14 opacity-15 z-[5]" style={{animationDelay: '8s'}}>
          <svg width="56" height="56" viewBox="0 0 120 120" className="text-secondary animate-drift">
            <g transform="translate(60,70)">
              <circle cx="20" cy="20" r="15" fill="currentColor"/>
              <circle cx="20" cy="20" r="10" fill="currentColor" opacity="0.7"/>
              <circle cx="20" cy="20" r="5" fill="#fff"/>
              <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4"/>
            </g>
          </svg>
        </div>

        {/* Adire Pattern Wheel Icon */}
        <div className="absolute bottom-16 right-1/3 w-18 h-18 opacity-20 z-[5]" style={{animationDelay: '10s'}}>
          <svg width="72" height="72" viewBox="0 0 120 120" className="text-accent animate-drift">
            <g transform="translate(100,40)">
              <circle cx="20" cy="20" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M20,0 A20,20 0 0,1 40,20 A20,20 0 0,1 20,40 A20,20 0 0,1 0,20 A20,20 0 0,1 20,0" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5"/>
              <circle cx="20" cy="20" r="3" fill="currentColor"/>
            </g>
          </svg>
        </div>
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
        <div className="lg:col-span-5 relative overflow-visible">
          <div className="hero-3d-container relative w-full h-[600px] lg:h-[700px] overflow-visible">
            {/* Background Image Layer - Full size with proper radius */}
            <div className="background-layer absolute inset-0 w-full h-full rounded-b-[40px] overflow-hidden z-[1]">
              <img 
                src="/lovable-uploads/e6c969f7-79b5-41a0-85a5-69eb63eb293d.png" 
                alt="Nigerian cultural background with geometric patterns"
                className="background-image w-full h-full object-cover"
              />
            </div>
            
            {/* Mannequin Image Layer - Properly proportioned */}
            <div className="mannequin-container absolute top-[-8%] left-1/2 transform -translate-x-1/2 z-[2] overflow-visible">
              <img 
                src="/lovable-uploads/fa1bcab1-df72-4fd9-b3f5-465190ca17ee.png" 
                alt="Mannequin wearing traditional green African attire"
                className="mannequin-image h-auto w-auto"
                style={{ minHeight: '850px', minWidth: '400px' }}
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
