import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Traditional Agbada",
    description: "Elegant flowing robes perfect for ceremonies and special occasions",
    image: "Agbada Image",
  },
  {
    title: "Modern Buba & Shokoto",
    description: "Contemporary takes on classic Nigerian formal wear",
    image: "Buba Image",
  },
  {
    title: "Custom Formal Wear",
    description: "Bespoke suits blending African aesthetics with modern tailoring",
    image: "Formal Image",
  },
];

const ServicesPreview = () => {
  return (
    <section className="px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Our Services
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            From traditional Agbada to modern formal wear, we craft each piece with meticulous attention to detail.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="aspect-[3/4] bg-muted rounded-2xl mb-6 flex items-center justify-center">
                  <span className="text-muted-foreground font-inter">{service.image}</span>
                </div>
                <h3 className="font-playfair font-bold text-xl text-card-foreground mb-3">
                  {service.title}
                </h3>
                <p className="font-inter text-muted-foreground mb-6">
                  {service.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;