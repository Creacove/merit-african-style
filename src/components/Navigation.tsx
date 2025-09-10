import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-6 lg:px-12">
      <div className="flex items-center">
        <span className="text-xl font-playfair font-bold text-foreground">
          Merit Good
        </span>
      </div>
      
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
      
      <Button 
        variant="secondary" 
        className="bg-accent text-accent-foreground hover:bg-accent/90 font-inter font-medium text-sm px-6"
      >
        Contact Us
      </Button>
    </nav>
  );
};

export default Navigation;