import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCards(new Set([0, 1, 2, 3]));
      return;
    }

    // Create IntersectionObserver for staggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisibleCards(prev => new Set([...prev, parseInt(entry.target.getAttribute('data-index') || '0')]));
          }, index * 150); // Stagger by 150ms
        }
      });
    }, { threshold: 0.1 });

    // Observe all testimonial cards
    const cards = sectionRef.current?.querySelectorAll('[data-animate]');
    cards?.forEach((card, index) => {
      card.setAttribute('data-index', index.toString());
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const testimonials = [
    {
      name: "Chidi",
      context: "Wedding Day",
      quote: "The agbada fit like it was made for me — flawless craftsmanship and perfect tailoring."
    },
    {
      name: "Kelechi",
      context: "Cultural Festival",
      quote: "Honoured my roots while feeling modern. Patient fittings and precise craftsmanship."
    },
    {
      name: "Tolu",
      context: "Business Gala",
      quote: "From consultation to fitting, they were thoughtful and exact. The cut and finish — I felt seen."
    },
    {
      name: "Amaka",
      context: "Graduation Ceremony",
      quote: "Every detail was perfect. People kept asking who made my dress - pure elegance."
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="worn-with-pride"
      aria-labelledby="worn-with-pride-heading"
      className="px-6 lg:px-12 py-16 lg:py-20 bg-[hsl(var(--bg-section))]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Clean Header */}
        <header className="text-center mb-16">
          <h2
            id="worn-with-pride-heading"
            className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--ivory))] mb-6"
          >
            Worn With Pride
          </h2>

          <p className="text-xl font-inter text-[hsl(var(--muted-ivory))] max-w-2xl mx-auto leading-relaxed mb-8">
            Our clients don't just wear clothes — they carry stories of confidence, culture, and craft.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[hsl(var(--muted-ivory))]">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--gold))]"></div>
              <span>450+ Happy Clients</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--gold))]"></div>
              <span>4.9★ Average Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--gold))]"></div>
              <span>13+ Years Excellence</span>
            </div>
          </div>
        </header>

        {/* Clean Testimonial Grid */}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <figure
              key={index}
              data-animate
              data-index={index}
              className={`group bg-[hsl(36,37%,95%)]/95 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-[hsl(var(--gold))]/10 transition-all duration-300 ${
                visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              } hover:shadow-lg hover:border-[hsl(var(--gold))]/20`}
              role="group"
              aria-label={`Testimonial from ${testimonial.name} about ${testimonial.context.toLowerCase()} experience`}
            >
              {/* Clean quote */}
              <blockquote className="font-inter text-lg leading-relaxed text-[hsl(var(--deep-chocolate))] mb-6 group-hover:text-[hsl(15,34%,13%)] transition-colors duration-300">
                "{testimonial.quote}"
              </blockquote>

              {/* Clean footer */}
              <figcaption className="flex items-end justify-between">
                <div>
                  <div className="font-playfair font-semibold text-[hsl(var(--deep-chocolate))] text-lg mb-1">
                    {testimonial.name}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[hsl(var(--gold))] text-sm font-medium tracking-wide">
                      {testimonial.context}
                    </span>
                    {/* Star rating */}
                    <div className="flex space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-[hsl(var(--gold))]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subtle icon */}
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--gold))]/10 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-[hsl(var(--gold))]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Clear CTA */}
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            className="bg-[hsl(var(--gold))] text-[hsl(var(--deep-chocolate))] font-semibold px-8 py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 font-inter hover:bg-[hsl(var(--gold),0.9)]"
            onClick={() => window.open('https://wa.me/+2348147480222?text=Hello!%20I%20would%20like%20to%20discuss%20my%20style%20preferences%20for%20bespoke%20tailoring.', '_blank')}
          >
            Start Your Journey
          </Button>
          <p className="mt-4 text-sm text-[hsl(var(--muted-ivory))] hover:text-[hsl(var(--ivory))] transition-colors duration-300 cursor-pointer" onClick={() => window.location.href = '/measurement-guide'}>
            View Measurement Guide
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
