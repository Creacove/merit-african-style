import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, A11y } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Swiper styles
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

const styleCategories = [
  {
    id: 1,
    title: "Agbada Elegance",
    descriptor: "Ceremonial presence",
    image: "/lovable-uploads/c4b18a22-ab38-42d8-a546-26bc827d56a4.png",
    alt: "Agbada — ceremonial tailoring"
  },
  {
    id: 2,
    title: "Kaftan Classics",
    descriptor: "Everyday distinguished",
    image: "/lovable-uploads/e6c969f7-79b5-41a0-85a5-69eb63eb293d.png",
    alt: "Kaftan — distinguished everyday wear"
  },
  {
    id: 3,
    title: "Buba & Sokoto",
    descriptor: "Rooted tradition",
    image: "/lovable-uploads/fa1bcab1-df72-4fd9-b3f5-465190ca17ee.png",
    alt: "Buba & Sokoto — traditional tailoring"
  },
  {
    id: 4,
    title: "Contemporary Fusion",
    descriptor: "Tailored modernity",
    image: "/lovable-uploads/c4b18a22-ab38-42d8-a546-26bc827d56a4.png",
    alt: "Contemporary fusion — modern tailoring"
  }
];

const SignatureStyles = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

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

      // Carousel cards staggered entrance
      tl.from(".styles-card", {
        opacity: 0,
        y: 28,
        duration: 0.42,
        stagger: 0.1,
        ease: "cubic-bezier(.22,.9,.35,1)"
      }, "-=0.35");

      // CTA gentle pulse
      tl.from(ctaRef.current, {
        scale: 0.98,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");

      // Shimmer effect on center card (only on first load)
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
      if (mediaQuery.matches) {
        tl.to(".shimmer-overlay", {
          x: "120%",
          duration: 0.64,
          ease: "power1.inOut",
          delay: 0.3
        }, "-=0.1");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSlideChange = () => {
    const slides = document.querySelectorAll('.styles-card');
    slides.forEach((slide, index) => {
      const isActive = slide.classList.contains('swiper-slide-active');
      gsap.to(slide, {
        scale: isActive ? 1 : 0.88,
        y: isActive ? -8 : 0,
        duration: 0.36,
        ease: "power3.out"
      });
    });
  };

  const handleBookConsultation = () => {
    // Analytics event - can be connected to your analytics service
    console.log('Book consultation clicked from signature styles section');
  };

  return (
    <section 
      ref={sectionRef}
      className="styles-section bg-[hsl(var(--bg-section))] px-5 py-12 lg:px-16 lg:py-18"
      aria-labelledby="styles-title"
    >
      <div className="container max-w-[1200px] mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 
            ref={titleRef}
            id="styles-title" 
            className="font-playfair font-bold text-[28px] lg:text-[48px] leading-[1.05] text-[hsl(var(--ivory))] mb-4"
          >
            <span>Discover Your </span>
            <span className="text-[hsl(var(--gold))]">Style</span>
          </h2>
          <p 
            ref={subtitleRef}
            className="styles-sub font-inter text-[16px] lg:text-[18px] leading-[1.5] text-[hsl(var(--muted-ivory))] max-w-2xl mx-auto"
          >
            From ceremonial Agbada to modern kaftans — each design is tailored to your posture, your presence, and your life.
          </p>
        </div>

        <div ref={carouselRef} className="styles-carousel mb-12 lg:mb-16">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Keyboard, A11y]}
            centeredSlides={true}
            slidesPerView={1.18}
            spaceBetween={24}
            breakpoints={{
              900: {
                slidesPerView: 3,
                spaceBetween: 24
              }
            }}
            autoplay={{
              delay: 4200,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            }}
            loop={true}
            keyboard={{
              enabled: true,
              onlyInViewport: true
            }}
            a11y={{
              enabled: true
            }}
            onSlideChangeTransitionStart={handleSlideChange}
            className="!overflow-visible"
            aria-roledescription="carousel"
            aria-label="Signature style carousel"
          >
            {styleCategories.map((category) => (
              <SwiperSlide key={category.id} className="!h-auto">
                <div 
                  className="styles-card relative aspect-[3/4] bg-[hsl(var(--card-bg))] rounded-[18px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.45)] cursor-pointer transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-[3px] focus:ring-[hsl(var(--gold))]/18 focus:outline-offset-[6px] group"
                  role="group"
                  aria-label={`${category.title}: ${category.descriptor}`}
                  tabIndex={0}
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
                    <h3 className="font-playfair font-bold text-[20px] lg:text-[24px] leading-[1.1] mb-1">
                      {category.title}
                    </h3>
                    <p className="font-inter text-[14px] lg:text-[16px] text-[hsl(var(--muted-ivory))] mb-3">
                      {category.descriptor}
                    </p>
                    <div className="gold-underline h-0.5 bg-[hsl(var(--gold))] w-0 group-hover:w-[56%] group-focus:w-[56%] transition-all duration-240 ease-out"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div ref={ctaRef} className="styles-cta text-center">
          <button 
            onClick={handleBookConsultation}
            className="btn-primary bg-gradient-to-b from-[hsl(var(--burg))] to-[hsl(var(--burg))] text-[hsl(var(--ivory))] font-semibold px-8 py-4 rounded-[40px] shadow-[0_10px_30px_rgba(106,31,31,0.45)] hover:shadow-[0_10px_30px_rgba(106,31,31,0.45),0_0_20px_rgba(199,154,43,0.3)] hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))] focus:ring-offset-2 min-h-[44px] mb-4"
          >
            Book Your Consultation →
          </button>
          <p className="micro-note font-inter text-[12px] lg:text-[14px] text-[hsl(var(--muted-ivory))]">
            Not off-the-rack. Each garment is made-to-measure.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignatureStyles;