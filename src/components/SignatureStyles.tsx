import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, A11y } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";

// Import Swiper styles
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

const originalStyleCategories = [
  {
    id: 1,
    title: "Agbada Elegance",
    descriptor: "Ceremonial presence",
    image: "https://i.ibb.co/Xxrw7pQM/Generated-Image-September-14-2025-10-01-AM.png",
    alt: "Agbada — ceremonial tailoring"
  },
  {
    id: 2,
    title: "Kaftan Classics",
    descriptor: "Everyday distinguished",
    image: "https://i.ibb.co/ds3jgFpy/Generated-Image-September-14-2025-10-49-AM.png",
    alt: "Kaftan — distinguished everyday wear"
  },
  {
    id: 3,
    title: "Buba & Sokoto",
    descriptor: "Rooted tradition",
    image: "https://i.ibb.co/pBD6FQjT/Generated-Image-September-14-2025-10-24-AM.png",
    alt: "Buba & Sokoto — traditional tailoring"
  },
  {
    id: 4,
    title: "Contemporary Fusion",
    descriptor: "Tailored modernity",
    image: "https://i.ibb.co/fdnTMW1s/SUIT.png",
    alt: "Contemporary fusion — modern tailoring"
  },
  {
    id: 5,
    title: "Daima Elegance",
    descriptor: "Modern inspiration",
    image: "https://i.ibb.co/V0Cb49Yk/Generated-Image-September-14-2025-10-05-AM.png",
    alt: "Daima — modern African elegance"
  }
];

// Create multiple duplicates for smooth infinite loop (need ~12+ slides for perfect 3-view loop)
const styleCategories = [
  ...originalStyleCategories,
  ...originalStyleCategories.map(item => ({ ...item, id: item.id + 100 })),
  ...originalStyleCategories.map(item => ({ ...item, id: item.id + 200 })),
];

const SignatureStyles = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleInit = (swiper: any) => {
    console.log('🚀 Swiper initialized with continuous scrolling');
    
    // Set up slide change animations
    swiper.on('slideChangeTransitionStart', () => {
      const slides = document.querySelectorAll('.styles-card');
      slides.forEach((slide: any, index) => {
        const isActive = slide.classList.contains('swiper-slide-active');
        gsap.to(slide, {
          scale: isActive ? 1.0 : 0.88,
          y: isActive ? -8 : 0,
          opacity: isActive ? 1 : 0.86,
          duration: 0.36,
          ease: "power3.out"
        });

        // Animate title text in active card
        const title = slide.querySelector('h3');
        if (title) {
          gsap.to(title, {
            opacity: isActive ? 1 : 0.6,
            scale: isActive ? 1.02 : 1,
            y: isActive ? -2 : 0,
            duration: 0.28,
            ease: "power3.out",
            css: isActive ? {
              filter: 'brightness(1.15) contrast(1.05)'
            } : {
              filter: 'brightness(1) contrast(1)'
            }
          });
        }

        // Animate description text in active card
        const desc = slide.querySelector('p');
        if (desc) {
          gsap.to(desc, {
            opacity: isActive ? 1 : 0.4,
            scale: isActive ? 1.01 : 1,
            y: isActive ? -1 : 0,
            duration: 0.32,
            ease: "power3.out",
            css: isActive ? {
              filter: 'brightness(1.1)'
            } : {
              filter: 'brightness(1) saturate(1)'
            }
          });
        }

        // Animate gold underline accent
        const underline = slide.querySelector('.gold-underline');
        if (underline) {
          gsap.to(underline, {
            width: isActive ? '100%' : '0%',
            duration: 0.44,
            ease: "power3.out"
          });
        }
      });
    });

    // Trigger initial shimmer after Swiper is ready
    setTimeout(() => {
      // Set initial active state
      const slides = document.querySelectorAll('.styles-card');
      slides.forEach((slide: any, index) => {
        const isActive = slide.classList.contains('swiper-slide-active');
        gsap.set(slide, {
          scale: isActive ? 1.0 : 0.88,
          y: isActive ? -8 : 0,
          opacity: isActive ? 1 : 0.86
        });
      });

      // Shimmer all cards on load
      document.querySelectorAll('.shimmer-overlay').forEach((shimmer, index) => {
        const delay = index * 0.2; // Stagger shimmer effects
        gsap.fromTo(shimmer,
          { x: '-40%', opacity: 0.06 },
          { x: '120%', opacity: 0, duration: 0.64, ease: 'power1.inOut', delay }
        );
      });
    }, 100);
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

      // Title entrance
      tl.from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.52,
        ease: "cubic-bezier(.22,.9,.35,1)"
      });

      // Subtitle entrance (90ms after title start)
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.48,
        ease: "cubic-bezier(.22,.9,.35,1)"
      }, "-=0.43");

      // CTA gentle pulse
      tl.from(ctaRef.current, {
        scale: 0.98,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");

      // Delay carousel entrance to ensure Swiper is ready
      setTimeout(() => {
        const carouselTl = gsap.timeline();

        // Carousel cards staggered entrance
        carouselTl.from(".styles-card", {
          opacity: 0,
          y: 28,
          duration: 0.42,
          stagger: 0.1,
          ease: "cubic-bezier(.22,.9,.35,1)"
        });

        // Card title text entrance
        carouselTl.from(".styles-card h3", {
          opacity: 0,
          y: 8,
          duration: 0.36,
          stagger: 0.12,
          ease: "power3.out"
        }, "-=0.5");

        // Card description text entrance
        carouselTl.from(".styles-card p", {
          opacity: 0,
          y: 6,
          duration: 0.32,
          stagger: 0.12,
          ease: "power3.out"
        }, "-=0.62");
      }, 100);
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleBookConsultation = () => {
    // Send WhatsApp message
    const phoneNumber = '+2348147480222';
    const message = 'Hello! I would like to discuss my style preferences for bespoke tailoring.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Analytics event - can be connected to your analytics service
    console.log('WhatsApp message sent from signature styles section');
  };

  return (
    <section
      ref={sectionRef}
      className="styles-section bg-[hsl(var(--bg-section))] px-0 py-12 lg:px-16 lg:py-18 -mx-4 lg:mx-0"
      aria-labelledby="styles-title"
    >
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16 relative px-4 lg:px-0 -mx-4 lg:-mx-0">
          {/* Yellow decorative line over text */}
          <div className="absolute top-[20px] lg:top-[35px] left-1/2 transform -translate-x-1/2 w-[200px] lg:w-[320px] z-10">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent opacity-80"></div>
          </div>

          {/* Title container with line overlay effect */}
          <div className="relative z-20">
            <h2
              ref={titleRef}
              id="styles-title"
              className="font-playfair font-bold text-[28px] lg:text-[48px] leading-[1.05] text-[hsl(var(--ivory))] mb-4 relative"
            >
              <span className="relative inline-block">
                Discover Your
                {/* Subtle text shadow/line effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--gold),0.1)] to-transparent opacity-30 blur-sm transform scale-y-125"></div>
              </span>
              <span className="text-[hsl(var(--gold))] relative inline-block">
                Style
                {/* Decorative line accent on "Style" */}
                <div className="absolute -bottom-[2px] left-0 w-full h-[1px] bg-[hsl(var(--gold))] opacity-60"></div>
              </span>
            </h2>
          </div>

          {/* Subtitle positioned under the line */}
          <div className="relative z-0 mt-8 lg:mt-12">
            <p
              ref={subtitleRef}
              className="styles-sub font-inter text-[16px] lg:text-[18px] leading-[1.5] text-[hsl(var(--muted-ivory))] max-w-2xl mx-auto px-8 lg:px-16"
            >
              From ceremonial Agbada to modern kaftans — each design is tailored to your posture, your presence, and your life.
            </p>
          </div>
        </div>

        <div ref={carouselRef} className="styles-carousel mb-12 lg:mb-16">
          {/* Constrained centered container - full width on mobile */}
          <div className="max-w-full overflow-hidden mx-auto px-4 lg:px-0 -mx-4 lg:-mx-0">
            <Swiper
              modules={[Autoplay, Keyboard, A11y]}
              centeredSlides={true}
              slidesPerView={1.4}
              spaceBetween={16}
              initialSlide={5} // Start in middle of duplicated items
              breakpoints={{
                900: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                  initialSlide: 5  // Start in middle
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                  initialSlide: 5
                },
                1600: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                  initialSlide: 5
                }
              }}
              autoplay={{
                delay: 4200,
                disableOnInteraction: true,
                pauseOnMouseEnter: true
              }}
              loop={true}
              loopAdditionalSlides={3}
              watchOverflow={false}
              speed={700}
              keyboard={{
                enabled: true,
                onlyInViewport: true
              }}
              a11y={{
                enabled: true
              }}
              onInit={handleInit}
              className="relative w-full"
              aria-roledescription="carousel"
              aria-label="Signature style carousel"
            >
            {styleCategories.map((category, index) => (
              <SwiperSlide key={`${category.id}-${index}`} className="!h-auto">
                <div 
                  className="styles-card relative aspect-[3/4] bg-[hsl(var(--card-bg))] rounded-[18px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.45)] cursor-pointer transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-[3px] focus:ring-[hsl(var(--gold))]/18 focus:outline-offset-[6px] group opacity-86"
                  role="group"
                  aria-label={`${category.title}: ${category.descriptor}`}
                  tabIndex={0}
                  style={{ transform: 'scale(0.88) translateY(0px)' }}
                >
                  <div className="image-wrap relative w-full h-full overflow-hidden rounded-[18px]">
                    <img 
                      src={category.image}
                      alt={category.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="shimmer-overlay absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="card-copy absolute bottom-6 left-6 right-6 text-[hsl(var(--ivory))]">
                    {/* Gold line positioned above text */}
                    <div className="gold-underline h-0.5 bg-[hsl(var(--gold))] w-0 group-hover:w-full group-focus:w-full transition-all duration-300 ease-out mb-4"></div>

                    <h3 className="font-playfair font-bold text-[20px] lg:text-[24px] leading-[1.1] mb-1">
                      {category.title}
                    </h3>
                    <p className="font-inter text-[14px] lg:text-[16px] text-[hsl(var(--muted-ivory))] mb-3">
                      {category.descriptor}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        </div>

        <div ref={ctaRef} className="styles-cta text-center">
          <Button
            variant="glass"
            size="xl"
            className="font-inter mb-4"
            onClick={handleBookConsultation}
          >
            Let's Talk Style →
          </Button>
          <p className="micro-note font-inter text-[12px] lg:text-[14px] text-[hsl(var(--muted-ivory))]">
            Not off-the-rack. Each garment is made-to-measure.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignatureStyles;
