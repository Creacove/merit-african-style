const BrandStatement = () => {
  return (
    <section className="px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-foreground">
            We create clothes for:
          </h2>
          <p className="font-inter text-lg text-muted-foreground leading-relaxed">
            Bright, strong personalities. For real men who want to feel perfect. Our bespoke African tailoring combines traditional craftsmanship with modern elegance, creating pieces that celebrate your heritage while embracing contemporary style.
          </p>
        </div>
        
        <div className="relative">
          <div className="aspect-[4/5] bg-secondary rounded-3xl flex items-center justify-center">
            <span className="text-secondary-foreground font-inter">Founder Portrait</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;