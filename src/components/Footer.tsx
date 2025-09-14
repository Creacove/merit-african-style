import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true
        }
      });

      // Decorative line entrance
      tl.from(".footer-decorative-line", {
        width: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Title entrance
      tl.from(titleRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");

      // Content sections staggered entrance
      tl.from(".footer-section", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.4");

      // Bottom copyright entrance
      tl.from(".footer-copyright", {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2");
    }, footerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="px-6 lg:px-12 py-16 lg:py-24 bg-gradient-to-br from-[hsl(var(--deep-chocolate))]/90 to-[hsl(var(--deep-chocolate))] border-t border-[hsl(var(--gold))]/10 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-4">
        <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-[hsl(var(--gold))] blur-2xl"></div>
        <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-[hsl(var(--gold))] blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[hsl(var(--gold))] blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          {/* Decorative top line */}
          <div className="footer-decorative-line w-24 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/60 to-transparent mb-8"></div>

          {/* Company logo and signature */}
          <div className="text-center mb-12">
            <div
              ref={titleRef}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <img
                src="/logo.png"
                alt="MeritGold Clothings Logo"
                className="h-12 lg:h-16 xl:h-20 w-auto object-contain filter brightness-0 invert"
                style={{
                  filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(25deg) brightness(1.2)'
                }}
              />
              <h3 className="font-playfair font-bold text-3xl lg:text-4xl xl:text-5xl text-[hsl(var(--ivory))] relative">
                <span className="text-transparent bg-gradient-to-r from-[hsl(var(--ivory))] via-[hsl(var(--gold))] to-[hsl(var(--ivory))] bg-clip-text">
                  MeritGold Clothings
                </span>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent opacity-80"></div>
              </h3>
            </div>

            <p className="font-inter text-[hsl(var(--muted-ivory))] text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              Bespoke African tailoring for <span className="text-[hsl(var(--gold))]/90 font-semibold">the modern gentleman</span>. Creating luxury native wears that celebrate tradition and embrace contemporary style.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Statement */}
          <div className="footer-section col-span-2">
            <h4 className="font-playfair font-bold text-xl text-[hsl(var(--ivory))] mb-6 relative">
              Our Craftmanship
              <div className="w-12 h-[1px] bg-[hsl(var(--gold))]/60 mt-3"></div>
            </h4>
            <p className="font-inter text-[hsl(var(--muted-ivory))]/90 leading-relaxed max-w-lg">
              Each garment tells a story. From the initial consultation to the final fitting, we pour our passion for perfection into every stitch, ensuring every piece reflects the elegance and heritage of African craftsmanship.
            </p>

            {/* Decorative quote icon */}
            <div className="mt-6 text-[hsl(var(--gold))] text-6xl opacity-20">"</div>
          </div>

          {/* Navigation Links */}
          <div className="footer-section">
            <h4 className="font-playfair font-bold text-xl text-[hsl(var(--ivory))] mb-6 relative">
              Navigate
              <div className="w-12 h-[1px] bg-[hsl(var(--gold))]/60 mt-3"></div>
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="font-inter text-[hsl(var(--muted-ivory))]/90 hover:text-[hsl(var(--gold))] transition-all duration-300 hover:translate-x-1 transform relative group">
                About Us
                <span className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a></li>
              <li><a href="#" className="font-inter text-[hsl(var(--muted-ivory))]/90 hover:text-[hsl(var(--gold))] transition-all duration-300 hover:translate-x-1 transform relative group">
                Our Services
                <span className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a></li>
              <li><a href="#" className="font-inter text-[hsl(var(--muted-ivory))]/90 hover:text-[hsl(var(--gold))] transition-all duration-300 hover:translate-x-1 transform relative group">
                Portfolio
                <span className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a></li>
              <li><a href="#" className="font-inter text-[hsl(var(--muted-ivory))]/90 hover:text-[hsl(var(--gold))] transition-all duration-300 hover:translate-x-1 transform relative group">
                Contact
                <span className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a></li>
            </ul>
          </div>

          {/* Contact Info with Premium Styling */}
          <div className="footer-section">
            <h4 className="font-playfair font-bold text-xl text-[hsl(var(--ivory))] mb-6 relative">
              Connect
              <div className="w-12 h-[1px] bg-[hsl(var(--gold))]/60 mt-3"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-[hsl(var(--gold))]/20 rounded-full flex items-center justify-center group-hover:bg-[hsl(var(--gold))] transition-colors duration-300">
                  <span className="text-[hsl(var(--ivory))] text-sm">📍</span>
                </div>
                <span className="font-inter text-[hsl(var(--muted-ivory))]/90 group-hover:text-[hsl(var(--ivory))] transition-colors">Lagos, Nigeria</span>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-[hsl(var(--gold))]/20 rounded-full flex items-center justify-center group-hover:bg-[hsl(var(--gold))] transition-colors duration-300">
                  <span className="text-[hsl(var(--ivory))] text-sm">📞</span>
                </div>
                <span className="font-inter text-[hsl(var(--muted-ivory))]/90 group-hover:text-[hsl(var(--ivory))] transition-colors">+234 814 748 0222</span>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-[hsl(var(--gold))]/20 rounded-full flex items-center justify-center group-hover:bg-[hsl(var(--gold))] transition-colors duration-300">
                  <span className="text-[hsl(var(--ivory))] text-sm">✉️</span>
                </div>
                <span className="font-inter text-[hsl(var(--muted-ivory))]/90 group-hover:text-[hsl(var(--ivory))] transition-colors">info@meritgold.com</span>
              </div>
            </div>

            {/* Social media icons placeholder */}
            <div className="mt-6 flex gap-3">
              <div className="w-8 h-8 bg-[hsl(var(--gold))]/10 rounded-full border border-[hsl(var(--gold))]/30 flex items-center justify-center hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--deep-chocolate))] transition-all duration-300 cursor-pointer transform hover:scale-110">
                <span className="text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-[hsl(var(--gold))]/10 rounded-full border border-[hsl(var(--gold))]/30 flex items-center justify-center hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--deep-chocolate))] transition-all duration-300 cursor-pointer transform hover:scale-110">
                <span className="text-sm">i</span>
              </div>
              <div className="w-8 h-8 bg-[hsl(var(--gold))]/10 rounded-full border border-[hsl(var(--gold))]/30 flex items-center justify-center hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--deep-chocolate))] transition-all duration-300 cursor-pointer transform hover:scale-110">
                <span className="text-sm">t</span>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant bottom divider */}
        <div className="footer-copyright mt-16 pt-8 border-t border-[hsl(var(--gold))]/10">
          <div className="text-center space-y-2">
            <p className="font-inter text-[hsl(var(--muted-ivory))]/70 text-sm lg:text-base">
              © 2025 MeritGold Clothings. All rights reserved.
            </p>
            <p className="font-inter text-[hsl(var(--muted-ivory))]/50 text-xs">
              Website designed & developed by <span className="text-[hsl(var(--gold))]/80 font-medium">Creacove</span>
            </p>
          </div>
        </div>
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[hsl(var(--gold))]/20 rounded-tl-[1rem] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[hsl(var(--gold))]/20 rounded-tr-[1rem] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[hsl(var(--gold))]/20 rounded-bl-[1rem] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[hsl(var(--gold))]/20 rounded-br-[1rem] pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
