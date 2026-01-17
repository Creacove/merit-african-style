import { Button } from "@/components/ui/button";
import { Menu, X, Home, ShoppingBag, Briefcase, Image, Phone, Ruler, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: "/", label: "Home", icon: Home, delay: "0ms" },
    { href: "/shop", label: "Shop", icon: ShoppingBag, delay: "50ms" },
    { href: isHomePage ? "#bespoke-journey" : "/#bespoke-journey", label: "Bespoke", icon: Ruler, delay: "100ms" },
    { href: isHomePage ? "#about" : "/#about", label: "About", icon: User, delay: "150ms" },
    { href: "/measurement-guide", label: "Measurements", icon: Ruler, delay: "200ms" },
  ];

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-xl bg-background/80 border-b border-gold-accent/5">
      {/* Ambient Luxury Lighting */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-8 w-32 h-32 rounded-full bg-gradient-to-r from-gold-accent/20 to-transparent blur-3xl"></div>
        <div className="absolute top-6 right-16 w-24 h-24 rounded-full bg-gradient-to-l from-primary/15 to-transparent blur-2xl"></div>
      </div>

      {/* Logo with Premium Metallic Sheen */}
      <a href="/" className="flex items-center relative group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-accent/20 via-transparent to-gold-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-110"></div>
        <img
          src="/logo.png"
          alt="MeritGold Clothings Logo"
          className="relative h-12 lg:h-16 w-auto transition-all duration-500 transform group-hover:scale-105 group-hover:brightness-110"
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(184, 134, 11, 0.15))',
          }}
        />
      </a>

      {/* Desktop Navigation - Premium Glass Morphism & Cart */}
      <div className="hidden md:flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative px-6 py-2 font-lato font-medium text-foreground/85 hover:text-primary transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 overflow-hidden rounded-2xl"
              style={{ animationDelay: item.delay }}
            >
              {/* Multi-layered Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-accent/5 via-transparent to-gold-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

              {/* Metallic Border Animation */}
              <div className="absolute inset-0 rounded-2xl border border-gold-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-gold-accent to-transparent group-hover:w-full transition-all duration-500 delay-100"></div>
                <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-l from-transparent via-gold-accent to-transparent group-hover:w-full transition-all duration-500 delay-200"></div>
              </div>

              {/* Enhanced Shadow System */}
              <div className="absolute inset-0 rounded-2xl shadow-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.15), 0 0 0 1px rgba(184,134,11,0.1) inset' }}></div>

              {/* Icon with Sophisticated Animation */}
              <span className="relative z-10 flex items-center gap-3 tracking-wide">
                <div className="relative overflow-hidden rounded-xl">
                  <item.icon
                    size={18}
                    className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 rotate-12 group-hover:rotate-0"
                  />
                  <div className="absolute inset-0 bg-gold-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </div>
                <span className="relative transform group-hover:scale-105 transition-transform duration-300">{item.label}</span>
              </span>

              {/* Sophisticated Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold-accent/10 via-gold-accent/20 to-gold-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl transform scale-110"></div>
            </a>
          ))}
        </div>

        {/* Global Cart Button - Integrated into Nav */}
        <button
          onClick={openCart}
          className="group relative p-3 text-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
          aria-label="Open cart"
        >
          <div className="relative">
            <ShoppingBag size={24} className="text-primary transition-transform duration-300 group-hover:rotate-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-accent text-[10px] font-bold text-deep-chocolate shadow-lg animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </div>
          <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 transform scale-125"></div>
        </button>
      </div>

      {/* Desktop Contact Button - Enhanced Luxury Glass */}
      <Button
        variant="secondary"
        title="Contact Us"
        className="hidden md:flex group relative overflow-hidden font-lato font-semibold text-sm px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border border-gold-accent/20"
      >
        {/* Premium Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/15 to-white/10 rounded-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gold-accent/5 via-transparent to-gold-accent/5 rounded-2xl"></div>

        <span className="relative z-10 flex items-center gap-3">
          <div className="relative p-1">
            <Phone size={16} className="text-primary group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gold-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </div>
          <span>Contact Us</span>
        </span>

        {/* Multi-directional Shimmer System */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-800"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gold-accent/10 to-transparent transform skew-x-12 translate-x-[120%] group-hover:translate-x-[-120%] transition-transform duration-600"></div>

        {/* Enhanced Glow and Shadow */}
        <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300 transform scale-110"></div>
        <div className="absolute inset-0 rounded-2xl border border-gold-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Pulsing Luxury Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold-accent/5 via-transparent to-gold-accent/5 animate-pulse opacity-30 group-hover:opacity-60"></div>
      </Button>

      {/* Mobile Top Actions - Premium Design */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={openCart}
          className="group relative p-3 text-foreground hover:text-primary transition-all duration-300 hover:scale-110 rounded-2xl"
          aria-label="Open cart"
        >
          {/* Glass Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <ShoppingBag size={24} className="text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-accent text-[9px] font-bold text-deep-chocolate shadow-sm">
                {totalItems}
              </span>
            )}
          </div>
        </button>

        <button
          onClick={toggleMenu}
          className="group relative p-3 text-foreground hover:text-primary transition-all duration-300 hover:scale-110 rounded-2xl"
          aria-label="Toggle menu"
        >
          {/* Glass Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 border border-gold-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative w-6 h-6">
            {/* Animated hamburger icon */}
            <div className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
              <Menu size={24} />
            </div>
            <div className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}>
              <X size={24} />
            </div>
          </div>

          {/* Sophisticated glow */}
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 transform scale-110"></div>
        </button>
      </div>

      {/* Mobile Menu - Full-Screen Luxury Overlay */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-700 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ backdropFilter: 'blur(20px)' }}>

        {/* Sophisticated Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95"
          onClick={() => setIsMenuOpen(false)}>

          {/* Luxury Particle Effects */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-gold-accent/20 to-transparent blur-3xl animate-pulse"></div>
            <div className="absolute bottom-40 right-20 w-72 h-72 rounded-full bg-gradient-to-l from-primary/15 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-gold-accent/10 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Menu Content Container */}
        <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-background/90 via-background/95 to-background border-b border-gold-accent/10 shadow-2xl mt-24 transition-transform duration-700 ease-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-4'}`}>
          <div className="px-8 py-16 relative">

            {/* Premium Navigation Cards */}
            <div className="grid gap-4">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative overflow-hidden rounded-3xl p-6 text-xl font-lato font-semibold text-foreground/90 hover:text-primary transition-all duration-500 transform hover:scale-105 hover:translate-y-[-8px] border border-gold-accent/10 hover:border-gold-accent/30"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(184,134,11,0.02) 50%, rgba(255,255,255,0.03) 100%)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {/* Glass Morphism Layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-accent/5 via-transparent to-gold-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl"></div>

                  {/* Metallic Borders */}
                  <div className="absolute inset-0 rounded-3xl border border-gold-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <span className="relative z-10 flex items-center gap-6">
                    <div className="relative p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 border border-primary/20 group-hover:border-primary/40">
                      <item.icon size={24} className="text-primary group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gold-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    </div>
                    <div>
                      <div className="text-2xl font-snowburst transform group-hover:scale-105 transition-transform duration-300">{item.label}</div>
                      <div className="text-sm font-lato font-normal text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">Explore our premium {item.label.toLowerCase()}</div>
                    </div>
                  </span>

                  {/* Sophisticated Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-3xl"></div>

                  {/* Enhanced Shadow System */}
                  <div className="absolute inset-0 rounded-3xl shadow-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                    style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,134,11,0.1) inset' }}></div>
                </a>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <div className="mt-16 pt-12 border-t border-gold-accent/20">
              <Button
                variant="secondary"
                title="Contact Us"
                className="w-full group relative overflow-hidden font-lato font-bold text-lg py-6 px-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gold-accent/30 hover:border-gold-accent/50"
                onClick={() => setIsMenuOpen(false)}
              >
                {/* Premium Glass Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/20 to-white/10 rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-accent/10 via-transparent to-gold-accent/10 rounded-3xl"></div>

                <span className="relative z-10 flex items-center justify-center gap-4">
                  <div className="relative p-2 bg-primary/20 rounded-2xl group-hover:bg-primary/30 transition-colors duration-300 border border-primary/30 group-hover:border-primary/50">
                    <Phone size={24} className="text-primary group-hover:rotate-12 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gold-accent/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </div>
                  <div className="text-center">
                    <div className="font-snowburst text-xl">Contact Us</div>
                    <div className="text-sm font-lato font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-1">Begin your bespoke journey</div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <div className="text-gold-accent text-2xl">✦</div>
                  </div>
                </span>

                {/* Multi-layered Shimmer Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gold-accent/20 to-transparent transform skew-x-12 translate-x-[150%] group-hover:translate-x-[-150%] transition-transform duration-800 rounded-3xl"></div>

                {/* Enhanced Luxury Glow */}
                <div className="absolute inset-0 bg-primary/15 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 transform scale-110"></div>
                <div className="absolute inset-0 rounded-3xl border-2 border-gold-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Pulsing Luxury Rings */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold-accent/10 via-transparent to-gold-accent/10 animate-pulse opacity-40 group-hover:opacity-70"></div>
                <div className="absolute inset-0 rounded-3xl bg-primary/5 animate-ping opacity-0 group-hover:opacity-20"></div>
              </Button>

              {/* Luxury Decorative Elements */}
              <div className="mt-12 flex justify-center">
                <div className="flex space-x-3">
                  <div className="w-3 h-3 bg-gold-accent/40 rounded-full animate-pulse shadow-lg shadow-gold-accent/20"></div>
                  <div className="w-3 h-3 bg-primary/40 rounded-full animate-pulse shadow-lg shadow-primary/20" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-3 h-3 bg-gold-accent/40 rounded-full animate-pulse shadow-lg shadow-gold-accent/20" style={{ animationDelay: '0.6s' }}></div>
                  <div className="w-3 h-3 bg-primary/40 rounded-full animate-pulse shadow-lg shadow-primary/20" style={{ animationDelay: '0.9s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
