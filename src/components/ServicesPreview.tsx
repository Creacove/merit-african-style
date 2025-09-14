import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Traditional Agbada",
    description: "Elegant flowing robes perfect for ceremonies and special occasions",
    textIcon: "♔",
    statusIcon: "☆"
  },
  {
    title: "Modern Buba & Shokoto",
    description: "Contemporary takes on classic Nigerian formal wear",
    textIcon: "♕",
    statusIcon: "●"
  },
  {
    title: "Custom Formal Wear",
    description: "Bespoke suits blending African aesthetics with modern tailoring",
    textIcon: "♛",
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

    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      });

      // Decorative line entrance
      tl.from(".services-decorative-line", {
        width: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Title entrance
      tl.from(titleRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");

      // Paragraph entrance
      tl.from(paragraphRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2");

      // Cards entrance with stagger
      cardRefs.current.forEach((cardEl, index) => {
        if (cardEl) {
          tl.from(cardEl, {
            opacity: 0,
            y: 40,
            scale: 0.9,
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
      className="px-6 lg:px-12 py-16 lg:py-24 bg-background relative overflow-hidden"
    >
      {/* Background gold accents */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="services-decorative-line w-32 lg:w-40 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent mb-8 mx-auto"></div>

          <h2
            ref={titleRef}
            className="font-playfair font-bold text-4xl lg:text-5xl xl:text-6xl leading-[1.02] text-[hsl(var(--ivory))] mb-6"
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
            From traditional <span className="text-[hsl(var(--gold))] font-semibold">Agbada</span> to modern formal wear, we craft each piece with meticulous attention to detail and unparalleled craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Card
              key={index}
              ref={el => (cardRefs.current[index] = el)}
              className="bg-gradient-to-br from-[hsl(var(--card-bg))] to-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold))]/30 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              style={{
                boxShadow: `
                  0 20px 40px rgba(0,0,0,0.3),
                  0 0 0 1px rgba(184,134,11,0.2),
                  inset 0 1px 0 rgba(255,255,255,0.1)
                `,
                transform: 'translateY(0)',
                transformOrigin: 'center',
                border:'2px solid hsl(var(--gold) / 0.3)'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  scale: 1.02,
                  duration: 0.3,
                  ease: "power3.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  duration: 0.3,
                  ease: "power3.out"
                });
              }}
            >
              <CardContent className="p-8 h-full flex flex-col">
                {/* Gold accent line at top */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/50 to-transparent mb-6 relative">
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--white))]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                </div>

                <div className="aspect-[3/4] bg-gradient-to-br from-[hsl(var(--deep-chocolate))] to-[hsl(var(--olive-secondary))]/20 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden">
                  {/* Icon display with luxury styling */}
                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-4 opacity-95 group-hover:opacity-100 transition-opacity duration-300">
                      {service.textIcon || "✦"}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[hsl(var(--gold))]/20 rounded-full flex items-center justify-center text-sm">
                      {service.statusIcon || "•"}
                    </div>
                  </div>

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gold))]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[hsl(var(--gold))]/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[hsl(var(--gold))]/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="font-playfair font-bold text-xl lg:text-2xl text-[hsl(var(--ivory))] mb-4 group-hover:text-[hsl(var(--gold))] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-inter text-[hsl(var(--muted-ivory))] mb-8 leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Luxury button */}
                  <Button
                    variant="outline"
                    className="w-full border-[hsl(var(--gold))]/50 hover:border-[hsl(var(--gold))] text-[hsl(var(--ivory))] hover:text-[hsl(var(--deep-chocolate))] font-inter font-medium hover:bg-[hsl(var(--gold))] transition-all duration-300 relative overflow-hidden group/button"
                  >
                    {/* Button background animation */}
                    <div className="absolute inset-0 bg-[hsl(var(--gold))] scale-x-0 group-hover/button:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Learn More
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </Button>
                </div>

                {/* Bottom accent line */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/30 to-transparent mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
