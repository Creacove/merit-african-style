import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const journeySteps = [
  {
    id: 1,
    title: "Consultation",
    description: "We start with a conversation. Share your ideas, and let us shape them into possibilities.",
    image: "https://i.ibb.co/GQVbNXY4/1.webp",
    alt: "Tailor consulting with client over sketchbook and fabric samples",
    duration: "15–30 mins"
  },
  {
    id: 2,
    title: "Fabric & Design",
    description: "Explore fabrics, colors, and custom details. Every choice reflects your style.",
    image: "https://i.ibb.co/dJ4vFTQV/2.webp",
    alt: "Beautiful array of African fabrics, colors, and design elements"
  },
  {
    id: 3,
    title: "Measurements",
    description: "Precision measurements — the foundation of a perfect fit.",
    image: "https://i.ibb.co/Txz2DZX7/3-1.webp",
    alt: "Tailor taking precise measurements of client's posture and form",
    duration: "In-studio, home visit, or self-measure guide"
  },
  {
    id: 4,
    title: "Fitting",
    description: "See your piece come alive. Together, we refine until it's flawless.",
    image: "https://i.ibb.co/B5M7hhGt/4-1.webp",
    alt: "Client viewing their bespoke garment in mirror during fitting session"
  },
  {
    id: 5,
    title: "Delivery",
    description: "Collected in-store or delivered to your door — pressed, packaged, and ready.",
    image: "https://i.ibb.co/vCL0sF75/5.webp",
    alt: "Finished bespoke garment neatly packaged in branded garment bag",
    duration: "Local & nationwide delivery available",
    guarantee: "Minor adjustments free within 7 days"
  }
];

const BespokeJourney = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  const handleStartJourney = () => {
    const phoneNumber = '+2348147480222';
    const message = 'Hello! I would like to start my bespoke tailoring journey.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleViewGuide = () => {
    const phoneNumber = '+2348147480222';
    const message = 'Hello! Could you please share your measurement guide?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    // Respect reduced motion preferences
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCards(new Set([0, 1, 2, 3, 4]));
      return;
    }

    // Create IntersectionObserver for smooth card reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-step-index') || '0');
          setTimeout(() => {
            setVisibleCards(prev => new Set([...prev, index]));
          }, index * 150); // Staggered entrance
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

    // Observe all journey steps
    const steps = sectionRef.current?.querySelectorAll('[data-step-index]');
    steps?.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
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
        <div className="text-center mb-12 lg:mb-24">
          <div className="decorative-line w-24 lg:w-40 h-[1px] lg:h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent mb-6 lg:mb-8 mx-auto"></div>

          <h2
            className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.02] text-[hsl(var(--ivory))] mb-4 lg:mb-6"
          >
            The <span className="text-[hsl(var(--gold))] relative">
              Bespoke Journey
              <div className="absolute -bottom-[4px] left-0 w-full h-[1px] bg-[hsl(var(--gold))] opacity-70"></div>
            </span>
          </h2>

          <p
            className="font-inter text-base lg:text-xl text-[hsl(var(--muted-ivory))] max-w-3xl mx-auto leading-relaxed px-4"
          >
            Every stitch tells a story — here's how we bring yours to life.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Clean Timeline Steps */}
          <div className="space-y-12 lg:space-y-16 relative">
            {/* Timeline line for all screen sizes */}
            <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-[hsl(var(--gold))]/30 lg:left-1/2 lg:w-[2px] lg:-translate-x-1/2"></div>

            {journeySteps.map((step, index) => (
              <article
                key={step.id}
                data-step-index={index}
                className={`relative transition-all duration-700 ease-out ${
                  visibleCards.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Floating Card with Image Background */}
                <div className="group relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl transform hover:scale-[1.01] lg:hover:scale-[1.02] transition-all duration-500 ease-out">
                  {/* Image Background */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9]">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Elegant Gradient Overlay - Responsive */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20 sm:from-black/70 sm:via-black/40 sm:to-transparent lg:from-black/80 lg:via-black/50 lg:to-black/30"></div>

                    {/* Subtle Brand Accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-bl from-[hsl(var(--gold))]/20 to-transparent rounded-bl-full opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                    {/* Micro-shimmer effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
                  </div>

                  {/* Content Overlay - Mobile Optimized */}
                  <div className="absolute inset-0 p-4 sm:p-6 lg:p-12 flex items-center">
                    <div className="w-full max-w-xl lg:max-w-2xl">
                      {/* Step Indicator with subtle animation */}
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-[hsl(var(--gold))] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-[hsl(var(--gold))]/50 ${visibleCards.has(index) ? 'animate-pulse' : ''}`}>
                          <span className="text-xs sm:text-sm font-bold text-[hsl(var(--deep-chocolate))]">{step.id}</span>
                        </div>
                        <div className="w-8 sm:w-12 h-[1px] bg-[hsl(var(--gold))]/60 group-hover:bg-[hsl(var(--gold))]/80 transition-colors duration-300"></div>
                      </div>

                      {/* Title with Elegant Typography */}
                      <h3 className="font-playfair font-bold text-xl sm:text-2xl lg:text-4xl text-white mb-2 sm:mb-4 leading-tight">
                        {step.title}
                        <span className="block text-sm sm:text-lg lg:text-xl font-normal text-[hsl(var(--gold))] mt-1 sm:mt-2 font-inter opacity-90">
                          Step {step.id} of 5
                        </span>
                      </h3>

                      {/* Description - Responsive text */}
                      <p className="font-inter text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed mb-4 sm:mb-6 max-w-lg">
                        {step.description}
                      </p>

                      {/* Duration/Additional Info - Mobile stacked */}
                      {(step.duration || step.guarantee) && (
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {step.duration && (
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20 hover:bg-white/15 transition-colors duration-200">
                              <span className="text-xs">⏱</span>
                              <span className="text-xs sm:text-sm font-medium text-white">{step.duration}</span>
                            </div>
                          )}
                          {step.guarantee && (
                            <div className="flex items-center gap-2 bg-[hsl(var(--gold))]/20 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-[hsl(var(--gold))]/30 hover:bg-[hsl(var(--gold))]/30 transition-colors duration-200">
                              <span className="text-xs">🛡️</span>
                              <span className="text-xs sm:text-sm font-medium text-[hsl(var(--gold))]">{step.guarantee}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Floating Timeline Dot */}
                  <div className="absolute -left-3 top-8 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-6 h-6 bg-[hsl(var(--gold))] rounded-full border-4 border-background shadow-xl z-20">
                    <div className="w-full h-full bg-[hsl(var(--gold))] rounded-full animate-pulse"></div>
                  </div>

                  {/* Connecting Line Visual (desktop) */}
                  <div className="hidden lg:block absolute left-1/2 top-0 w-[2px] h-8 bg-gradient-to-b from-transparent via-[hsl(var(--gold))]/40 to-transparent -translate-x-1/2 -translate-y-8"></div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 lg:mt-24">
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
              <a
                href="/measurement-guide"
                className="text-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]/80 font-medium text-base underline-offset-4 hover:underline transition-all duration-200 inline-block"
              >
                View Measurement Guide →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BespokeJourney;
