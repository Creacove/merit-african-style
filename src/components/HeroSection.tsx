import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen px-6 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - 7/12 */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-6">
            <h1 className="font-playfair font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.98] tracking-tight text-foreground">
              Bespoke Tailoring for the Modern Gentleman
            </h1>
            
            <p className="font-inter text-lg lg:text-xl text-muted-foreground max-w-2xl">
              Luxury native wears — Agbada, Buba, and Shokoto — crafted with precision for Lagos' finest.
            </p>
            
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
          </div>
        </div>
        
        {/* Right Column - 5/12 */}
        <div className="lg:col-span-5 relative">
          <div className="relative bg-secondary rounded-3xl p-8 shadow-2xl">
            <div className="absolute top-6 left-6">
              <span className="text-xs font-inter uppercase tracking-wide text-secondary-foreground/70">
                2025 — Lagos, Nigeria
              </span>
            </div>
            
            <div className="aspect-[3/4] bg-muted rounded-2xl mt-8 flex items-center justify-center">
              <span className="text-muted-foreground font-inter">Hero Image</span>
            </div>
            
            {/* Circular CTA */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
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
