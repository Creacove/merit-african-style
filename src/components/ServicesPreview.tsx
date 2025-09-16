import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Custom Design & Pattern Making",
    description: "Bespoke design consultation and custom pattern creation tailored to your unique measurements and style preferences",
    textIcon: "📐",
    statusIcon: "☆"
  },
  {
    title: "Precision Sewing & Construction",
    description: "Expert craftsmanship using traditional African techniques combined with modern precision for flawless garment construction",
    textIcon: "🧵",
    statusIcon: "●"
  },
  {
    title: "Alterations & Restyling",
    description: "Professional garment modifications, repairs, and creative restyling to give new life to your existing wardrobe",
    textIcon: "✂️",
    statusIcon: "◇"
  },
];

const ServicesPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Initialize cards as visible to prevent them staying hidden
    cardRefs.current.forEach((cardEl) => {
      if (cardEl) {
        gsap.set(cardEl, { opacity: 1, y: 0, scale: 1 });
      }
    });

    const ctx = gsap.context(() => {
      // Set up ScrollTrigger animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          once: false // Allow re-triggering
        }
      });

      // Decorative line entrance
      tl.from(".services-decorative-line", {
        width: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Title entrance with improved visibility handling
      if (titleRef.current) {
        tl.fromTo(titleRef.current, {
          opacity: 0,
          y: 25
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.3");
      }

      // Paragraph entrance
      if (paragraphRef.current) {
        tl.fromTo(paragraphRef.current, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.2");
      }

      // Cards entrance with stagger and visibility guarantee
      cardRefs.current.forEach((cardEl, index) => {
        if (cardEl) {
          tl.fromTo(cardEl, {
            opacity: 0,
            y: 40,
            scale: 0.9
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out"
          }, `-=${0.8 - index * 0.1}`);
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 lg:px-12 py-12 lg:py-16 bg-background relative overflow-hidden"
    >
      {/* Enhanced background for glass effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
        {/* Subtle texture overlay for glass depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--deep-chocolate))]/5 via-transparent to-[hsl(var(--gold))]/5 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="services-decorative-line w-32 lg:w-40 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent mb-8 mx-auto"></div>

          <h2
            ref={titleRef}
            className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.02] text-[hsl(var(--ivory))] mb-6"
          >
            Our <span className="text-[hsl(var(--gold))] relative">
              Services
              {/* Subtle underline effect */}
              <div className="absolute -bottom-[4px] left-0 w-full h-[1px] bg-[hsl(var(--gold))] opacity-70"></div>
            </span>
          </h2>

          <p
            ref={paragraphRef}
            className="font-inter text-lg lg:text-xl text-[hsl(var(--muted-ivory))] max-w-3xl mx-auto leading-relaxed"
          >
            From <span className="text-[hsl(var(--gold))] font-semibold">bespoke design</span> to expert construction and creative restyling, we bring your vision to life with meticulous attention to detail and unparalleled craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Card
              key={index}
              ref={el => (cardRefs.current[index] = el)}
              className="transition-all duration-700 group relative overflow-hidden frosted-glass-card"
              style={{
                transform: 'translateY(0)',
                transformOrigin: 'center',
                backdropFilter: 'blur(20px) saturate(180%) contrast(120%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%) contrast(120%)'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -12,
                  scale: 1.03,
                  duration: 0.4,
                  ease: "power3.out",
                  backdropFilter: 'blur(16px) saturate(200%)',
                  boxShadow: `
                    0 35px 70px hsla(15,34%,13%,0.2),
                    0 15px 40px hsla(15,34%,13%,0.15),
                    inset 0 1px 0 hsla(255,255,255,0.2),
                    inset 0 -1px 0 hsla(42,65%,48%,0.08),
                    0 0 0 2px hsla(42,65%,48%,0.12)
                  `
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  duration: 0.4,
                  ease: "power3.out",
                  backdropFilter: 'blur(12px) saturate(180%)',
                  boxShadow: `
                    0 25px 50px hsla(15,34%,13%,0.15),
                    0 10px 30px hsla(15,34%,13%,0.1),
                    inset 0 1px 0 hsla(255,255,255,0.15),
                    inset 0 -1px 0 hsla(42,65%,48%,0.05),
                    0 0 0 2px hsla(42,65%,48%,0.08)
                  `
                });
              }}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Compact icon top section */}
                <div className="flex items-center justify-center mb-5 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--gold))]/10 to-[hsl(var(--gold))]/5 rounded-full flex items-center justify-center group-hover:bg-[hsl(var(--gold))]/20 transition-colors duration-300">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {service.textIcon || "✦"}
                    </span>
                  </div>
                  {/* Subtle status indicator */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[hsl(var(--gold))]/80 rounded-full flex items-center justify-center text-xs text-[hsl(var(--deep-chocolate))]">
                    {service.statusIcon || "•"}
                  </div>
                </div>

                <div className="flex-1 flex flex-col space-y-4">
                  <h3 className="font-playfair font-bold text-lg lg:text-xl text-white/95 text-center group-hover:text-[hsl(var(--gold))] transition-colors duration-300 leading-tight drop-shadow-sm">
                    {service.title}
                  </h3>

                  <p className="font-inter text-white/80 text-sm lg:text-base leading-relaxed text-center flex-1 drop-shadow-sm">
                    {service.description}
                  </p>

                  {/* Compact button */}
                  <Button
                    variant="outline"
                    className="w-full border-[hsl(var(--gold))]/50 hover:border-[hsl(var(--gold))] text-[hsl(var(--ivory))] hover:text-[hsl(var(--deep-chocolate))] font-inter font-medium hover:bg-[hsl(var(--gold))] transition-all duration-300 text-sm py-2 h-auto"
                  >
                    Learn More →
                  </Button>
                </div>

                {/* Subtle bottom accent */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/20 to-transparent mt-4 group-hover:opacity-60 opacity-30"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
