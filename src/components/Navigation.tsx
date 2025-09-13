import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-6 lg:px-12">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="MeritGold Clothings Logo"
          className="h-20 lg:h-28 w-auto"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-sm font-inter text-foreground hover:text-accent transition-colors">
          Home
        </a>
        <a href="#" className="text-sm font-inter text-foreground hover:text-accent transition-colors">
          About
        </a>
        <a href="#" className="text-sm font-inter text-foreground hover:text-accent transition-colors">
          Services
        </a>
        <a href="#" className="text-sm font-inter text-foreground hover:text-accent transition-colors">
          Gallery
        </a>
      </div>

      {/* Desktop Contact Button */}
      <Button
        variant="secondary"
        className="hidden md:flex bg-accent text-accent-foreground hover:bg-accent/90 font-inter font-medium text-sm px-6"
      >
        Contact Us
      </Button>

      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-xl md:hidden animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col px-6 py-8 space-y-6">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-lg font-inter font-medium text-foreground hover:text-primary transition-all duration-200 hover:translate-x-2 py-2 border-b border-border/20 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#"
                className="text-lg font-inter font-medium text-foreground hover:text-primary transition-all duration-200 hover:translate-x-2 py-2 border-b border-border/20"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#"
                className="text-lg font-inter font-medium text-foreground hover:text-primary transition-all duration-200 hover:translate-x-2 py-2 border-b border-border/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#"
                className="text-lg font-inter font-medium text-foreground hover:text-primary transition-all duration-200 hover:translate-x-2 py-2 border-b border-border/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </a>
            </div>

            {/* CTA Section */}
            <div className="pt-4 border-t border-border/20">
              <Button
                variant="secondary"
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 font-inter font-semibold text-base py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
