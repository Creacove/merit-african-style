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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mobile-First Beautiful Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-center lg:items-start">
          
          {/* Hero Content - First on Mobile */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left order-1">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="hero-title font-playfair font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] lg:leading-[0.98] tracking-tight text-foreground">
                {titleWords.map((word, index) => (
                  <span key={index} className="inline-block mr-2 sm:mr-3 lg:mr-4">
                    {word}
                  </span>
                ))}
              </h1>
              
              <p className="hero-subtitle font-inter text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-lg lg:max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Fine fabrics and exacting cuts, hand-finished tailoring with attention to every seam.
              </p>
              
              {/* Simplified CTA - Mobile First */}
              <div className="pt-2 lg:pt-4">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-inter font-semibold px-8 sm:px-10 lg:px-12 py-3 lg:py-4 rounded-full text-sm lg:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Book a Fitting
                </Button>
              </div>
              
              {/* Scroll Indicator - Desktop Only */}
              <div className="scroll-indicator hidden lg:flex flex-col items-center lg:items-start text-muted-foreground pt-4">
                <span className="text-xs mb-1">Scroll to explore</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>
          </div>
          
          {/* Hero Image - Second on Mobile */}
          <div className="lg:col-span-5 relative order-2 w-full">
            <div className="hero-3d-container relative w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[650px] mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Mannequin Image Layer - 200% BIGGER with SCALE transform */}
              <div className="mannequin-container absolute top-[-60px] sm:top-[-70px] md:top-[-80px] lg:top-[-100px] left-1/2 transform -translate-x-1/2 scale-[2] z-[2]">
                <img 
                  src="/lovable-uploads/fa1bcab1-df72-4fd9-b3f5-465190ca17ee.png" 
                  alt="Mannequin wearing traditional green African attire"
                  className="h-[450px] sm:h-[500px] md:h-[550px] lg:h-[650px] w-auto object-contain"
                />
              </div>
              
              {/* Background Image Layer - SAME AS ORIGINAL - Starts at Sleeve Level */}
              <div className="background-layer absolute top-[120px] sm:top-[140px] md:top-[160px] lg:top-[200px] left-0 w-full h-[330px] sm:h-[360px] md:h-[390px] lg:h-[450px] rounded-3xl lg:rounded-b-[40px] overflow-hidden z-[1] shadow-2xl">
                <img 
                  src="/lovable-uploads/e6c969f7-79b5-41a0-85a5-69eb63eb293d.png" 
                  alt="Nigerian cultural background with geometric patterns"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Circular CTA - Desktop Only */}
              <div className="absolute -left-6 lg:-left-8 top-1/2 transform -translate-y-1/2 z-[3] hidden lg:block">
                <Button
                  size="lg"
                  className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Card - Mobile Optimized */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-12 left-4 sm:left-6 lg:left-12 max-w-[280px] sm:max-w-xs z-20">
        <div className="bg-accent/95 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg hover:shadow-xl hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-muted/50 rounded-full flex-shrink-0 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">👤</span>
            </div>
            <div>
              <p className="font-inter font-medium text-accent-foreground text-xs lg:text-sm">
                Suits for special events
              </p>
              <button className="text-xs font-inter text-accent-foreground/70 hover:text-accent-foreground underline hidden sm:block">
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
