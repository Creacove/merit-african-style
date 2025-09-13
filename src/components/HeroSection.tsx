import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mannequinRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !bgRef.current || !mannequinRef.current) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Simple fade-in for reduced motion
      gsap.timeline()
        .from(bgRef.current, { opacity: 0, duration: 0.6 })
        .from(mannequinRef.current, { opacity: 0, duration: 0.6 }, "-=0.3");
      return;
    }

    // Luxury choreographed animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Background entrance - slow cinematic
    tl.from(bgRef.current, {
      opacity: 0,
      scale: 1.08,
      x: -10,
      duration: 1.2,
      ease: "power2.out"
    });

    // Mannequin entrance - crisp authoritative 
    tl.from(mannequinRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.98,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.8");

    // Fabric shimmer - tactile finish
    if (shimmerRef.current) {
      tl.to(shimmerRef.current, {
        x: "120%",
        duration: 0.6,
        ease: "power1.inOut"
      }, "+=0.15");
    }

    // Parallax on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.02;
      const ratefast = scrolled * -0.04;
      
      if (bgRef.current) {
        gsap.to(bgRef.current, { y: rate, duration: 0.1 });
      }
      if (mannequinRef.current) {
        gsap.to(mannequinRef.current, { y: ratefast, duration: 0.1 });
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen px-6 lg:px-12 py-16 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-center lg:items-start min-h-screen">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left order-1 flex flex-col justify-center">
            <div className="space-y-4 lg:space-y-6">
              {/* Headline with "Tailoring" emphasis */}
              <h1 className="hero-title font-playfair font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] lg:leading-[1.05] tracking-tight text-foreground">
                <span className="inline-block">Bespoke</span>
                <br />
                <span 
                  className="inline-block relative text-[1.25em] font-black bg-gradient-to-r from-[hsl(42,65%,48%)] to-[hsl(45,70%,55%)] bg-clip-text text-transparent animate-pulse"
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'goldTextShimmer 3s ease-in-out infinite'
                  }}
                >
                  Tailoring
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(42,65%,48%,0.3)] to-transparent opacity-0 animate-pulse"></span>
                </span>
                <span className="inline-block"> for the Modern Gentleman</span>
              </h1>
              
              {/* Subhead */}
              <p className="hero-subtitle font-inter text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg lg:max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Hand-finished techniques. Tailored to your posture and presence.
              </p>
              
              {/* Premium CTA */}
              <div className="pt-4 lg:pt-6">
                <Button 
                  variant="luxury" 
                  size="xl"
                  className="font-inter px-8 sm:px-10 lg:px-12"
                >
                  Book a Fitting
                </Button>
              </div>
              
              {/* Scroll Indicator - Desktop Only */}
              <div className="scroll-indicator hidden lg:flex flex-col items-center lg:items-start text-muted-foreground pt-6">
                <span className="text-xs mb-2 font-inter">Scroll to explore</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>
          </div>
          
          {/* Hero Image Composition */}
          <div className="lg:col-span-5 relative order-2 w-full">
            <div className="hero-composition relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Background Stage Layer */}
              <div 
                ref={bgRef}
                className="hero-bg absolute top-[100px] sm:top-[120px] md:top-[140px] lg:top-[180px] left-0 w-full h-[400px] sm:h-[430px] md:h-[460px] lg:h-[520px] rounded-[2.5rem] overflow-hidden z-[1] shadow-2xl"
                style={{
                  filter: 'brightness(0.85) contrast(0.9)',
                }}
              >
                <img 
                  src="/lovable-uploads/e6c969f7-79b5-41a0-85a5-69eb63eb293d.png" 
                  alt="Luxurious tailoring workshop background"
                  className="w-full h-full object-cover"
                  style={{ filter: 'blur(2px)' }}
                />
                
                {/* Fabric grain overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}
                />
                
                {/* Vertical blending gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
              
              {/* Mannequin Foreground Layer - 2X SCALED AND CENTERED */}
              <div 
                ref={mannequinRef}
                className="hero-mannequin absolute top-[20px] sm:top-[10px] md:top-[0px] lg:top-[-20px] left-1/2 transform -translate-x-1/2 scale-[2] z-[2]"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(199,154,43,0.1))',
                }}
              >
                <img 
                  src="/lovable-uploads/fa1bcab1-df72-4fd9-b3f5-465190ca17ee.png" 
                  alt="Elegant mannequin in bespoke tailoring"
                  className="h-[250px] sm:h-[275px] md:h-[300px] lg:h-[350px] w-auto object-contain"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1) saturate(1.05)',
                  }}
                />
                
                {/* Fabric shimmer overlay */}
                <div 
                  ref={shimmerRef}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(42,65%,48%,0.15)] to-transparent w-full h-full opacity-0 transform -translate-x-full pointer-events-none"
                  style={{
                    transform: 'translateX(-120%) skewX(-15deg)',
                    width: '120%',
                  }}
                />
              </div>
              
              {/* Circular Navigation CTA - Desktop Only */}
              <div className="absolute -left-6 lg:-left-8 top-1/2 transform -translate-y-1/2 z-[3] hidden lg:block">
                <Button
                  size="icon"
                  className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden">
        <Button 
          variant="luxury" 
          size="lg"
          className="w-full backdrop-blur-sm bg-gradient-to-b from-[hsl(0,56%,27%,0.95)] to-[hsl(0,56%,22%,0.95)] font-inter"
        >
          Book a Fitting
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
