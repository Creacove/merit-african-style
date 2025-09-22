import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // If reduced-motion is preferred, make items visible immediately
      if (sectionRef.current) {
        const animatedElements = sectionRef.current.querySelectorAll('[data-animate]');
        animatedElements.forEach((el: Element) => {
          const element = el as HTMLElement;
          element.classList.remove('opacity-0', 'translate-y-6');
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        });
      }
      return;
    }

    // Create IntersectionObserver for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.remove('opacity-0', 'translate-y-6');
          element.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });

    // Observe all animated elements
    if (sectionRef.current) {
      const animatedElements = sectionRef.current.querySelectorAll('[data-animate]');
      animatedElements.forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="worn-with-pride"
      aria-labelledby="worn-with-pride-heading"
      className="px-6 lg:px-12 py-16 lg:py-20 bg-[hsl(var(--bg-section))] relative overflow-hidden"
    >
      {/* Enhanced background for premium effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
        {/* Subtle texture overlay for premium depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--deep-chocolate))]/5 via-transparent to-[hsl(var(--gold))]/5 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="max-w-3xl mb-16" data-animate>
          <h2
            id="worn-with-pride-heading"
            className="font-playfair font-bold text-4xl sm:text-5xl text-[hsl(var(--ivory))] leading-tight"
          >
            Worn With Pride
          </h2>
          <p
            className="mt-4 text-lg font-inter text-[hsl(var(--muted-ivory))] max-w-xl leading-relaxed"
          >
            Our clients don't just wear clothes — they carry stories of confidence, culture, and craft. Here's what they have to say.
          </p>
        </header>

        {/* Uniform 2x2 Grid */}
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Chidi's testimonial */}
          <figure
            data-animate
            tabIndex={0}
            className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#d4af37] transform opacity-0 translate-y-6 transition-all duration-700 ease-out focus:outline-none focus:ring-4 focus:ring-[#fbe8b0] h-56 flex flex-col justify-between"
            role="group"
            aria-label="Testimonial from Chidi about wedding day experience"
          >
            <blockquote className="font-playfair italic text-base text-[#111827] leading-relaxed">
              "The agbada fit like it was made for me — flawless craftsmanship and perfect tailoring."
            </blockquote>
            <figcaption className="text-sm font-inter text-gray-600">
              <span className="block font-semibold text-[#111827]">Chidi</span>
              <span className="block text-[#d4af37] text-xs tracking-wide">Wedding Day</span>
            </figcaption>
          </figure>

          {/* Kelechi's testimonial */}
          <figure
            data-animate
            tabIndex={0}
            className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#d4af37] transform opacity-0 translate-y-6 transition-all duration-700 ease-out focus:outline-none focus:ring-4 focus:ring-[#fbe8b0] h-56 flex flex-col justify-between"
            role="group"
            aria-label="Testimonial from Kelechi about cultural festival experience"
          >
            <blockquote className="font-playfair italic text-base text-[#111827] leading-relaxed">
              "Honoured my roots while feeling modern. Patient fittings and precise craftsmanship."
            </blockquote>
            <figcaption className="text-sm font-inter text-gray-600">
              <span className="block font-semibold text-[#111827]">Kelechi</span>
              <span className="block text-[#d4af37] text-xs tracking-wide">Cultural Festival</span>
            </figcaption>
          </figure>

          {/* Tolu's testimonial */}
          <figure
            data-animate
            tabIndex={0}
            className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#d4af37] transform opacity-0 translate-y-6 transition-all duration-700 ease-out focus:outline-none focus:ring-4 focus:ring-[#fbe8b0] h-56 flex flex-col justify-between"
            role="group"
            aria-label="Testimonial from Tolu about business gala experience"
          >
            <blockquote className="font-playfair italic text-base text-[#111827] leading-relaxed">
              "From consultation to fitting, they were thoughtful and exact. The cut and finish — I felt seen."
            </blockquote>
            <figcaption className="text-sm font-inter text-gray-600">
              <span className="block font-semibold text-[#111827]">Tolu</span>
              <span className="block text-[#d4af37] text-xs tracking-wide">Business Gala</span>
            </figcaption>
          </figure>

          {/* Amaka's testimonial */}
          <figure
            data-animate
            tabIndex={0}
            className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#d4af37] transform opacity-0 translate-y-6 transition-all duration-700 ease-out focus:outline-none focus:ring-4 focus:ring-[#fbe8b0] h-56 flex flex-col justify-between"
            role="group"
            aria-label="Testimonial from Amaka about graduation ceremony experience"
          >
            <blockquote className="font-playfair italic text-base text-[#111827] leading-relaxed">
              "Every detail was perfect. People kept asking who made my dress - pure elegance."
            </blockquote>
            <figcaption className="text-sm font-inter text-gray-600">
              <span className="block font-semibold text-[#111827]">Amaka</span>
              <span className="block text-[#d4af37] text-xs tracking-wide">Graduation Ceremony</span>
            </figcaption>
          </figure>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button
            variant="default"
            size="lg"
            className="bg-[#d4af37] text-[#111827] font-semibold px-8 py-3 rounded-full shadow hover:brightness-95 transition-all duration-300 font-inter"
            onClick={() => window.open('https://wa.me/+2348147480222?text=Hello!%20I%20would%20like%20to%20discuss%20my%20style%20preferences%20for%20bespoke%20tailoring.', '_blank')}
          >
            ✨ Start Your Journey
          </Button>
          <p className="mt-4 text-sm text-[hsl(var(--muted-ivory))] underline cursor-pointer hover:text-[hsl(var(--ivory))] transition-colors" onClick={() => window.location.href = '/measurement-guide'}>
            View Measurement Guide
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
