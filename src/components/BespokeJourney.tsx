import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    id: 1,
    title: "Consultation",
    description: "We start with a conversation. Share your ideas, and let us shape them into possibilities.",
    image: "https://i.ibb.co/GQVbNXY4/1.webp", // Tailor speaking with client
    alt: "Tailor consulting with client over sketchbook and fabric samples",
    duration: "15–30 mins",
    icon: "💬"
  },
  {
    id: 2,
    title: "Fabric & Design",
    description: "Explore fabrics, colors, and custom details. Every choice reflects your style.",
    image: "https://i.ibb.co/dJ4vFTQV/2.webp", // Fabric rolls and swatches
    alt: "Beautiful array of African fabrics, colors, and design elements",
    icon: "🎨"
  },
  {
    id: 3,
    title: "Measurements",
    description: "Precision measurements — the foundation of a perfect fit.",
    image: "https://i.ibb.co/Txz2DZX7/3-1.webp", // Tailor measuring client
    alt: "Tailor taking precise measurements of client's posture and form",
    duration: "In-studio, home visit, or self-measure guide",
    icon: "📏"
  },
  {
    id: 4,
    title: "Fitting",
    description: "See your piece come alive. Together, we refine until it's flawless.",
    image: "https://i.ibb.co/B5M7hhGt/4-1.webp", // Client trying on garment
    alt: "Client viewing their bespoke garment in mirror during fitting session",
    icon: "👔"
  },
  {
    id: 5,
    title: "Delivery",
    description: "Collected in-store or delivered to your door — pressed, packaged, and ready.",
    image: "https://i.ibb.co/vCL0sF75/5.webp", // Finished garment in bag
    alt: "Finished bespoke garment neatly packaged in branded garment bag",
    duration: "Local & nationwide delivery available",
    guarantee: "Minor adjustments free within 7 days",
    icon: "📦"
  }
];

const BespokeJourney = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleStartJourney = () => {
    const phoneNumber = '+2348147480222';
    const message = 'Hello! I would like to start my bespoke tailoring journey.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleViewGuide = () => {
    // Could link to a measurement guide page or modal
    const phoneNumber = '+2348147480222';
    const message = 'Hello! Could you please share your measurement guide?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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

      // Title entrance with fabric texture reveal
      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });

      // Subtitle entrance
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4");

      // Timeline line "stitching" animation
      tl.from(".timeline-line", {
        height: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.2");

      // Step markers appear with stagger
      tl.from(".timeline-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.8");

      // Step content reveals with scroll trigger
      stepsRef.current.forEach((stepEl, index) => {
        if (stepEl) {
          gsap.from(stepEl, {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepEl,
              start: "top 85%",
              once: true
            }
          });
        }
      });

      // CTA entrance
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            once: true
          }
        });
      }

      // Gold shimmer effect on timeline
      gsap.to(".timeline-line", {
        background: "linear-gradient(180deg, #d4af37 0%, #f4e87c 50%, #d4af37 100%)",
        backgroundSize: "200% 200%",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
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
      className="relative px-6 lg:px-12 py-16 lg:py-24 bg-gradient-to-b from-[hsl(var(--bg-section))] to-background overflow-hidden"
    >
      {/* Subtle fabric texture background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="decorative-line w-32 lg:w-40 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent mb-8 mx-auto"></div>

          <h2
            ref={titleRef}
            className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.02] text-[hsl(var(--ivory))] mb-6"
          >
            The <span className="text-[hsl(var(--gold))] relative">
              Bespoke Journey
              <div className="absolute -bottom-[4px] left-0 w-full h-[1px] bg-[hsl(var(--gold))] opacity-70"></div>
            </span>
          </h2>

          <p
            ref={subtitleRef}
            className="font-inter text-lg lg:text-xl text-[hsl(var(--muted-ivory))] max-w-3xl mx-auto leading-relaxed"
          >
            Every stitch tells a story — here's how we bring yours to life.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-gradient-to-b from-[hsl(var(--gold))] to-[hsl(var(--gold))] opacity-80 top-0 bottom-0 hidden lg:block"></div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {journeySteps.map((step, index) => (
              <div
                key={step.id}
                ref={el => (stepsRef.current[index] = el)}
                className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[hsl(var(--gold))] rounded-full border-4 border-background shadow-lg z-10 hidden lg:block"></div>

                {/* Image */}
                <div className={`flex-shrink-0 w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <div
                    className="relative aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-br from-[hsl(var(--card-bg))] to-[hsl(var(--deep-chocolate))] rounded-[2.5rem] overflow-hidden shadow-2xl border border-[hsl(var(--gold))]/20 group cursor-pointer hover:scale-105 transition-transform duration-500"
                    style={{
                      boxShadow: `
                        0 25px 50px rgba(0,0,0,0.4),
                        0 0 0 1px rgba(184,134,11,0.1),
                        inset 0 1px 0 rgba(255,255,255,0.1)
                      `
                    }}
                  >
                    {/* Actual Image */}
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Hover Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[hsl(var(--gold))]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2.5rem]"></div>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 text-center lg:text-left ${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'}`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                      <span className="w-8 h-8 bg-[hsl(var(--gold))]/10 rounded-full flex items-center justify-center text-[hsl(var(--gold))] font-bold text-sm">
                        {step.id}
                      </span>
                      <h3 className="font-playfair font-bold text-2xl lg:text-3xl text-[hsl(var(--ivory))] relative">
                        {step.title}
                        <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-[hsl(var(--gold))] opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                      </h3>
                    </div>

                    <p className="font-inter text-base lg:text-lg text-[hsl(var(--muted-ivory))] leading-relaxed">
                      {step.description}
                    </p>

                    {/* Duration/Additional Info */}
                    {(step.duration || step.guarantee) && (
                      <div className="space-y-1 mt-4">
                        {step.duration && (
                          <p className="text-sm text-[hsl(var(--gold))] font-medium">
                            ⏱ {step.duration}
                          </p>
                        )}
                        {step.guarantee && (
                          <p className="text-sm text-[hsl(var(--gold))]/80 font-medium bg-[hsl(var(--gold))]/5 px-3 py-1 rounded-full inline-block">
                            🛡️ {step.guarantee}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center mt-16 lg:mt-24">
          <div className="space-y-6">
            <Button
              variant="glass"
              size="xl"
              className="font-inter mb-4 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-shadow duration-300"
              onClick={handleStartJourney}
            >
              ✨ Start Your Journey
            </Button>

            <div>
              <button
                onClick={handleViewGuide}
                className="text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80 font-medium text-base underline-offset-4 hover:underline transition-all duration-200"
              >
                View Measurement Guide →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BespokeJourney;
