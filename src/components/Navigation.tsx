import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Briefcase, Image, Phone } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Mobile menu state:', isMenuOpen);
  }

  const menuItems = [
    { href: "#", label: "Home", icon: Home, delay: "0ms" },
    { href: "#", label: "About", icon: User, delay: "50ms" },
    { href: "#", label: "Services", icon: Briefcase, delay: "100ms" },
    { href: "#", label: "Gallery", icon: Image, delay: "150ms" },
  ];

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-8 lg:px-12 backdrop-blur-sm">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="MeritGold Clothings Logo"
          className="h-20 lg:h-28 w-auto transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-2">
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className="group relative px-4 py-2 text-sm font-inter font-medium text-foreground/90 hover:text-primary transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5"
            style={{ animationDelay: item.delay }}
          >
          <span className="relative z-10 flex items-center gap-2 tracking-wide">
            <item.icon size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {item.label}
          </span>

          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold-accent/10 to-gold-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-95 group-hover:scale-100" />

          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gold-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm transform scale-110" />
          </a>
        ))}
      </div>

      {/* Desktop Contact Button */}
      <Button
        variant="secondary"
        title="Contact Us"
        className="hidden md:flex group relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary font-inter font-semibold text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Phone size={16} />
          Contact Us
        </span>

        {/* Button shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />

        {/* Enhanced glow */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>

      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden group relative p-3 text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-6">
          {/* Animated hamburger icon */}
          <div className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
            <Menu size={24} />
          </div>
          <div className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}>
            <X size={24} />
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Mobile Menu Dropdown */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Menu Content */}
        <div className="absolute top-0 left-0 right-0 bg-background border-b border-border shadow-2xl mt-20" onClick={() => setIsMenuOpen(false)}>
          <div className="px-6 py-12">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-4">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative overflow-hidden rounded-2xl p-4 text-xl font-inter font-semibold text-foreground/90 hover:text-primary transition-all duration-300 transform hover:scale-105 hover:translate-x-3"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10 flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    {item.label}
                  </span>

                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-accent/10 via-primary/5 to-gold-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </a>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-12 pt-8 border-t border-border/30">
              <Button
                variant="secondary"
                title="Contact Us"
                className="w-full group relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground hover:from-primary/90 hover:via-primary hover:to-primary/90 font-inter font-bold text-lg py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Phone size={20} />
                  Contact Us
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    →
                  </div>
                </span>

                {/* Button shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-800" />

                {/* Enhanced glow */}
                <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-0 group-hover:opacity-20" />
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gold-accent/30 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gold-accent/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
