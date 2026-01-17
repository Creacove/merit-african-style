import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Ruler, Scissors, Shirt, MessageSquare, Truck } from "lucide-react";

const journeySteps = [
  {
    id: 1,
    title: "Consultation",
    description: "Share your ideas.",
    icon: MessageSquare,
    duration: "15m"
  },
  {
    id: 2,
    title: "Fabric Choice",
    description: "Select materials.",
    icon: Scissors,
  },
  {
    id: 3,
    title: "Measure",
    description: "Precision fit.",
    icon: Ruler,
    duration: "In-app"
  },
  {
    id: 4,
    title: "Production",
    description: "Crafted by hand.",
    icon: Shirt,
  },
  {
    id: 5,
    title: "Delivery",
    description: "To your door.",
    icon: Truck,
    duration: "2-7 days"
  }
];

const BespokeJourney = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const handleStartJourney = () => {
    const phoneNumber = '+2348147480222';
    const message = 'Hello! I would like to start my bespoke tailoring journey.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="bespoke-journey" ref={sectionRef} className="py-16 bg-[hsl(var(--bg-section))] border-t border-[hsl(var(--gold-accent))]/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-[hsl(var(--ivory))] mb-12">
          The Bespoke <span className="text-[hsl(var(--gold-accent))]">Journey</span>
        </h2>

        {/* Desktop Process Flow */}
        <div className="hidden lg:flex justify-between items-start max-w-5xl mx-auto relative">
          {/* Connecting Line */}
          <div className="absolute top-[30px] left-0 w-full h-[2px] bg-[hsl(var(--gold-accent))]/20 -z-10"></div>

          {journeySteps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--deep-chocolate))] border border-[hsl(var(--gold-accent))] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[hsl(var(--gold-accent))] group-hover:text-black text-[hsl(var(--gold-accent))] shadow-lg">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-[hsl(var(--warm-ivory))] mb-1">{step.title}</h3>
              <p className="font-inter text-sm text-[hsl(var(--muted-foreground))] mb-2">{step.description}</p>
              {step.duration && (
                <span className="text-xs py-1 px-2 bg-[hsl(var(--deep-chocolate))] rounded-full text-[hsl(var(--gold-accent))] border border-[hsl(var(--gold-accent))]/20">
                  {step.duration}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Vertical List */}
        <div className="lg:hidden space-y-4 max-w-md mx-auto">
          {journeySteps.map((step) => (
            <div key={step.id} className="flex items-center gap-4 bg-[hsl(var(--deep-chocolate))] p-4 rounded-lg border border-[hsl(var(--gold-accent))]/10">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--gold-accent))]/10 flex items-center justify-center text-[hsl(var(--gold-accent))] shrink-0">
                <step.icon className="w-5 h-5" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-playfair font-bold text-[hsl(var(--warm-ivory))]">{step.title}</h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{step.description}</p>
              </div>
              {step.duration && (
                <span className="text-[10px] text-[hsl(var(--gold-accent))] whitespace-nowrap">
                  {step.duration}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button variant="glass" onClick={handleStartJourney}>
            Start Custom Request
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BespokeJourney;
