import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mannequinRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const tailoringRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

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
      duration: 0.8,
      ease: "power3.out",
      clearProps: "transform"
    }, "-=0.8");

    // Fabric shimmer - tactile finish
    if (shimmerRef.current) {
      tl.to(shimmerRef.current, {
        x: "120%",
        duration: 0.6,
        ease: "power1.inOut"
      }, "+=0.15");
    }

    // Heritage badge entrance - subtle and refined
    if (badgeRef.current) {
      tl.from(badgeRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "transform"
      }, "-=0.4");
    }

    // Parallax on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.02;
      const ratefast = scrolled * -0.04;
      const ratemedium = scrolled * -0.03;

      if (bgRef.current) {
        gsap.to(bgRef.current, { y: rate, duration: 0.1 });
      }
      if (mannequinRef.current) {
        gsap.to(mannequinRef.current, {
          y: ratefast,
          duration: 0.1,
          transformOrigin: "center center"
        });
      }
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          y: ratemedium,
          duration: 0.1,
          transformOrigin: "center center"
        });
      }
    };

    // Luxury tailoring text animation
    if (tailoringRef.current) {
      // Create floating particles around the text
      const createParticles = () => {
        const particles = [];
        for (let i = 0; i < 6; i++) {
          particles.push({
            x: gsap.utils.random(-50, 50),
            y: gsap.utils.random(-30, 30),
            delay: gsap.utils.random(0, 2),
            duration: gsap.utils.random(3, 6)
          });
        }
        return particles;
      };

      // Multi-layer animation timeline for tailoring text
      const tailoringTl = gsap.timeline({ repeat: -1, yoyo: false });

      tailoringTl
        .fromTo(tailoringRef.current,
          {
            backgroundPosition: "0% 50%"
          },
          {
            backgroundPosition: "400% 50%",
            duration: 3,
            ease: "none"
          }, 0)
        .fromTo(tailoringRef.current,
          {
            filter: "brightness(1) contrast(1)"
          },
          {
            filter: "brightness(1.2) contrast(1.1) saturate(1.2)",
            duration: 1.5,
            ease: "power2.inOut"
          }, 0)
        .fromTo(tailoringRef.current,
          {
            textShadow: "0 0 0 hsla(42, 65%, 48%, 0)"
          },
          {
            textShadow: "0 0 10px hsla(42, 65%, 48%, 0.3), 0 0 20px hsla(42, 65%, 48%, 0.2)",
            duration: 2,
            ease: "power2.inOut"
          }, 0.5);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen px-6 lg:px-12 py-16 pb-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-start lg:items-center lg:min-h-screen">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left order-1 flex flex-col justify-center">
            <div className="space-y-4 lg:space-y-6">
              {/* Headline with "Tailoring" emphasis */}
              <h1 className="hero-title font-playfair font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] lg:leading-[1.05] tracking-tight text-foreground">
                <span className="inline-block">Bespoke</span>
                <br />
                <span className="inline-block relative text-[1.25em] font-black tailoring-text-animated bg-gradient-to-r from-[hsl(42,65%,48%)] to-[hsl(45,70%,55%)] bg-clip-text text-transparent animate-pulse" ref={tailoringRef}
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
                  variant="glass"
                  size="xl"
                  className="font-inter"
                >
                  Book a Fitting
                </Button>
              </div>
            </div>
          </div>
          
          {/* Hero Image Composition */}
          <div className="lg:col-span-5 relative order-2 w-full">
            <div className="hero-composition relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] mx-auto max-w-sm sm:max-w-md lg:max-w-none">

              {/* Background Stage Layer */}
              <div
                ref={bgRef}
                className="hero-bg absolute top-[100px] sm:top-[120px] md:top-[140px] lg:top-[180px] left-0 w-full h-[320px] sm:h-[344px] md:h-[368px] lg:h-[416px] rounded-[2.5rem] overflow-hidden z-[1] shadow-2xl"
              >
                <img
                  src="/lovable-uploads/e6c969f7-79b5-41a0-85a5-69eb63eb293d.png"
                  alt="Luxurious tailoring workshop background"
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'brightness(0.85) contrast(0.9)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #2B1714 0%, #1a0f0a 100%)';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(15,34%,8%)] to-transparent z-[5]"></div>
              </div>

              {/* Mannequin Foreground Layer - 2X SCALING */}
              <div
                ref={mannequinRef}
                className="hero-mannequin mannequin-image absolute top-[-2%] z-[2] w-full flex justify-center"
                style={{
                  transformOrigin: 'center bottom',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(199,154,43,0.1))',
                  animation: 'tilt 5s infinite ease-in-out'
                }}
              >
                <img
                  src="/lovable-uploads/fa1bcab1-df72-4fd9-b3f5-465190ca17ee.png"
                  alt="Elegant mannequin in bespoke tailoring"
                  className="h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-auto object-contain"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1) saturate(1.05)',
                    transform: 'scale(1)',
                    transformOrigin: 'center center',
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

              {/* Luxury Heritage Badge */}
              <div ref={badgeRef} className="absolute top-[385px] sm:top-[429px] md:top-[473px] lg:top-[561px] left-1/2 transform -translate-x-1/2 z-[9] w-[80px] h-[80px] flex items-center justify-center">
                <div
                  className="luxury-badge w-full h-full relative"
                  style={{
                    position: 'relative',
                    background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
                    borderRadius: '50%',
                    padding: '4px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.4), 0 0 0 2px rgba(184,134,11,0.3), inset 0 1px 0 rgba(255,215,0,0.1)',
                    border: '1px solid rgba(184,134,11,0.2)',
                  }}
                >
                  <div
                    className="badge-inner relative flex flex-col items-center justify-center overflow-hidden"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'conic-gradient(from 45deg, #FFD700 0deg, #DAA520 90deg, #B8860B 180deg, #FFD700 270deg, #F0C674 360deg)',
                      border: '3px solid #FFD700',
                      boxShadow: `
                        inset 0 3px 6px rgba(0,0,0,0.3),
                        inset 0 -2px 4px rgba(255,215,0,0.2),
                        0 0 20px rgba(184,134,11,0.4),
                        0 0 40px rgba(255,215,0,0.1)
                      `,
                      backgroundSize: '200% 200%',
                      animation: 'luxuryBadgeRotate 20s linear infinite',
                    }}
                  >
                    {/* Engraved border effect */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: '2px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.1)',
                        background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, transparent 50%, rgba(255,215,0,0.05) 100%)',
                      }}
                    />

                    {/* Laurel wreath with SVG for premium detail */}
                    <div
                      className="laurel-wreath absolute"
                      style={{
                        top: '15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '65%',
                        height: '30px',
                        zIndex: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {/* Left laurel branch */}
                      <svg
                        viewBox="0 0 40 50"
                        style={{
                          width: '18px',
                          height: '25px',
                          opacity: 0.9,
                          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))',
                        }}
                      >
                        <path
                          d="M5 35 Q12 20 25 35 Q20 28 18 22 Q15 28 10 35"
                          stroke="#000"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <circle cx="18" cy="28" r="1" fill="#FFD700" opacity="0.8"/>
                        <circle cx="15" cy="32" r="0.5" fill="#FFD700" opacity="0.6"/>
                      </svg>

                      {/* Right laurel branch */}
                      <svg
                        viewBox="0 0 40 50"
                        style={{
                          width: '18px',
                          height: '25px',
                          opacity: 0.9,
                          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))',
                        }}
                      >
                        <path
                          d="M35 35 Q28 20 15 35 Q20 28 22 22 Q25 28 30 35"
                          stroke="#000"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <circle cx="22" cy="28" r="1" fill="#FFD700" opacity="0.8"/>
                        <circle cx="25" cy="32" r="0.5" fill="#FFD700" opacity="0.6"/>
                      </svg>
                    </div>

                    {/* Crown emblem */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '38%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 3,
                        fontSize: '8px',
                        color: '#000',
                        opacity: 0.9,
                        filter: 'drop-shadow(0 0 3px rgba(255,215,0,0.5))',
                      }}
                    >
                      👑
                    </div>

                    {/* Heritage text - clean sans-serif engraved effect */}
                    <div
                      className="badge-text absolute text-center"
                      style={{
                        bottom: '14%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 3,
                        fontFamily: 'Inter, sans-serif',
                        color: 'rgba(0,0,0,0.92)',
                        fontWeight: '600',
                        lineHeight: 1.0,
                        textShadow: `
                          0px -0.5px 1px rgba(255,215,0,0.6),
                          0.5px 0 0.5px rgba(255,215,0,0.4),
                          0 0.5px 1px rgba(0,0,0,0.3),
                          -0.5px 0 0.5px rgba(255,215,0,0.3),
                          0 0 2px rgba(0,0,0,0.15)
                        `,
                        letterSpacing: '0.05em',
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          fontSize: '8px',
                          marginBottom: '4px',
                          fontWeight: '500',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                        }}
                      >
                        SINCE
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '13px',
                          fontWeight: '700',
                          letterSpacing: '0.1em',
                        }}
                      >
                        2012
                      </span>
                    </div>

                    {/* Subtle sparkle effects */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '25%',
                        right: '20%',
                        width: '3px',
                        height: '3px',
                        background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
                        borderRadius: '50%',
                        animation: 'luxurySparkle 3s ease-in-out infinite',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '25%',
                        left: '18%',
                        width: '2px',
                        height: '2px',
                        background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
                        borderRadius: '50%',
                        animation: 'luxurySparkle 3s ease-in-out infinite 0.5s',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
