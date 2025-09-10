const Footer = () => {
  return (
    <footer className="px-6 lg:px-12 py-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="font-playfair font-bold text-xl text-foreground mb-4">
              Merit Good Clothing
            </h3>
            <p className="font-inter text-muted-foreground mb-6 max-w-md">
              Bespoke African tailoring for the modern gentleman. Creating luxury native wears that celebrate tradition and embrace contemporary style.
            </p>
          </div>
          
          <div>
            <h4 className="font-inter font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="font-inter text-muted-foreground hover:text-accent transition-colors">About</a></li>
              <li><a href="#" className="font-inter text-muted-foreground hover:text-accent transition-colors">Services</a></li>
              <li><a href="#" className="font-inter text-muted-foreground hover:text-accent transition-colors">Gallery</a></li>
              <li><a href="#" className="font-inter text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-inter font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><span className="font-inter text-muted-foreground">Lagos, Nigeria</span></li>
              <li><span className="font-inter text-muted-foreground">+234 xxx xxxx xxx</span></li>
              <li><span className="font-inter text-muted-foreground">info@meritgood.com</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="font-inter text-muted-foreground">
            © 2024 Merit Good Clothing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;