import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Animations removed for immediate visibility
  useEffect(() => {
    // No-op
  }, []);

  return (
    <footer
      ref={footerRef}
      className="px-6 lg:px-12 py-16 lg:py-20 bg-gradient-to-br from-[hsl(var(--deep-chocolate))]/90 to-[hsl(var(--deep-chocolate))] border-t border-[hsl(var(--gold))]/10 relative overflow-hidden"
    >
      {/* Subtle background decorative elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-[hsl(var(--gold))] blur-2xl"></div>
        <div className="absolute bottom-8 left-8 w-28 h-28 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Brand header */}
        <div className="text-center mb-12">
          {/* Decorative top line */}
          <div className="footer-decorative-line w-32 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/60 to-transparent mb-8 mx-auto"></div>

          <div
            ref={titleRef}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <img
              src="/logo.png"
              alt="MeritGold Clothings Logo"
              className="h-12 lg:h-16 w-auto object-contain filter brightness-0 invert"
              style={{
                filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(25deg) brightness(1.2)'
              }}
            />
            <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-[hsl(var(--ivory))] relative">
              MeritGold Clothings
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent opacity-70 mt-2"></div>
            </h2>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Navigation */}
          <div className="footer-section text-center md:text-left">
            <h4 className="font-playfair font-bold text-lg text-[hsl(var(--ivory))] mb-6 relative">
              Explore
              <div className="w-12 h-[1px] bg-[hsl(var(--gold))]/60 mt-3"></div>
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="font-inter text-[hsl(var(--muted-ivory))]/90 hover:text-[hsl(var(--gold))] transition-colors duration-300">Our Services</a></li>
              <li><a href="#" className="font-inter text-[hsl(var(--muted-ivory))]/90 hover:text-[hsl(var(--gold))] transition-colors duration-300">Signature Styles</a></li>
              <li><a href="#" className="font-inter text-[hsl(var(--muted-ivory))]/90 hover:text-[hsl(var(--gold))] transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section text-center">
            <h4 className="font-playfair font-bold text-lg text-[hsl(var(--ivory))] mb-6 relative">
              Get in Touch
              <div className="w-12 h-[1px] bg-[hsl(var(--gold))]/60 mt-3"></div>
            </h4>
            <div className="space-y-3">
              <a href="#" className="font-inter text-[hsl(var(--muted-ivory))]/90 hover:text-[hsl(var(--gold))] transition-colors duration-300 block">
                +234 814 748 0222
              </a>
              <a href="mailto:info@meritgold.com" className="font-inter text-[hsl(var(--muted-ivory))]/90 hover:text-[hsl(var(--gold))] transition-colors duration-300 block">
                info@meritgold.com
              </a>
              <p className="font-inter text-[hsl(var(--muted-ivory))]/80 text-sm">
                Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Social & CTA */}
          <div className="footer-section text-center md:text-right">
            <h4 className="font-playfair font-bold text-lg text-[hsl(var(--ivory))] mb-6 relative">
              Follow
              <div className="w-12 h-[1px] bg-[hsl(var(--gold))]/60 mt-3"></div>
            </h4>

            {/* Social media icons */}
            <div className="flex gap-3 justify-center md:justify-end mb-6">
              <div className="w-10 h-10 bg-[hsl(var(--gold))]/10 rounded-full border border-[hsl(var(--gold))]/30 flex items-center justify-center hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--deep-chocolate))] transition-all duration-300 cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-10 h-10 bg-[hsl(var(--gold))]/10 rounded-full border border-[hsl(var(--gold))]/30 flex items-center justify-center hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--deep-chocolate))] transition-all duration-300 cursor-pointer">
                <span className="text-sm">i</span>
              </div>
              <div className="w-10 h-10 bg-[hsl(var(--gold))]/10 rounded-full border border-[hsl(var(--gold))]/30 flex items-center justify-center hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--deep-chocolate))] transition-all duration-300 cursor-pointer">
                <span className="text-sm">t</span>
              </div>
            </div>

            <button className="font-inter text-[hsl(var(--gold))] hover:text-[hsl(var(--ivory))] transition-colors duration-300 text-sm underline underline-offset-4">
              Book Consultation →
            </button>
          </div>
        </div>

        {/* Clean copyright */}
        <div className="footer-copyright mt-12 pt-8 border-t border-[hsl(var(--gold))]/10">
          <div className="text-center space-y-2">
            <p className="font-inter text-[hsl(var(--muted-ivory))]/60 text-sm">
              © 2025 MeritGold Clothings
            </p>
            <p className="font-inter text-[hsl(var(--muted-ivory))]/50 text-xs">
              <span>Website designed and developed by </span>
              <a
                href="https://www.creacove.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--gold))]/80 font-medium hover:text-[hsl(var(--gold))] transition-colors duration-300"
              >
                Creacove
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
