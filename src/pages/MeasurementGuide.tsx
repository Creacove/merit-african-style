import React from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Ruler, Users, CheckCircle, AlertTriangle } from "lucide-react";

const MeasurementGuide = () => {
  const handleBookFitting = () => {
    const phoneNumber = '+2348147480222';
    const message = 'Hello! I need help with taking my measurements for bespoke tailoring.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const measurements = [
    {
      id: 1,
      name: "Chest",
      description: "Measure around the fullest part of your chest, keeping the tape horizontal",
      image: "https://i.ibb.co/Xx0JfXWJ/chest-measurement-guide.png"
    },
    {
      id: 2,
      name: "Waist",
      description: "Measure around your natural waistline, where your body bends",
      image: "https://i.ibb.co/0jFfXZWJ/waist-measurement-guide.png"
    },
    {
      id: 3,
      name: "Hips",
      description: "Measure around the widest part of your hips, about 8 inches below your waist",
      image: "https://i.ibb.co/Xx0JfXWJ/chest-measurement-guide.png"
    },
    {
      id: 4,
      name: "Inseam",
      description: "Measure from your crotch seam down to the bottom of your ankle",
      image: "https://i.ibb.co/0jFfXZWJ/waist-measurement-guide.png"
    },
    {
      id: 5,
      name: "Sleeve Length",
      description: "Measure from shoulder seam to wrist, with arm slightly bent",
      image: "https://i.ibb.co/Xx0JfXWJ/chest-measurement-guide.png"
    },
    {
      id: 6,
      name: "Shoulder Width",
      description: "Measure across the back from shoulder seam to shoulder seam",
      image: "https://i.ibb.co/0jFfXZWJ/waist-measurement-guide.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[hsl(36,37%,95%)]">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-[hsl(36,37%,90%)] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-[hsl(15,34%,13%)] mb-4">
            How to Take Your Measurements
          </h1>
          <p className="text-xl text-[hsl(15,34%,25%)] mb-8">
            Follow these simple steps for accurate measurements. For best results, have someone help you or use our professional measurement service.
          </p>
          <Button
            variant="glass"
            onClick={handleBookFitting}
            className="px-8 py-3 text-[hsl(15,34%,13%)] hover:text-[hsl(15,34%,13%)]"
          >
            ✨ Book Professional Measurement
          </Button>
        </div>
      </section>

      {/* Tools Needed */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[hsl(42,65%,48%,0.1)] rounded-lg p-8">
            <div className="flex items-center mb-4">
              <Ruler className="h-6 w-6 text-[hsl(42,65%,48%)] mr-3" />
              <h2 className="text-2xl font-semibold text-[hsl(15,34%,13%)]">What You'll Need</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[hsl(15,34%,20%)] mb-2">Required Tools:</h3>
                <ul className="space-y-2 text-[hsl(15,34%,30%)]">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Flexible measuring tape
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Mirror (for hard-to-see areas)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Pen and paper for notes
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(15,34%,20%)] mb-2">Tips:</h3>
                <ul className="space-y-2 text-[hsl(15,34%,30%)]">
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-[hsl(42,65%,48%)] mr-2 mt-0.5" />
                    Wear form-fitting clothes
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-[hsl(42,65%,48%)] mr-2 mt-0.5" />
                    Keep tape snug but not tight
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-[hsl(42,65%,48%)] mr-2 mt-0.5" />
                    Stand naturally, breathe normally
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Measurement Steps */}
      <section className="py-16 bg-[hsl(36,37%,92%)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[hsl(15,34%,13%)] text-center mb-12">
            Step-by-Step Measurements
          </h2>

          <div className="grid gap-8">
            {measurements.map((measurement) => (
              <div key={measurement.id} className="bg-white rounded-lg shadow-sm border p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[hsl(42,65%,48%,0.1)] rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-[hsl(42,65%,48%)]">{measurement.id}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[hsl(15,34%,13%)] mb-3">
                      {measurement.name}
                    </h3>
                    <p className="text-[hsl(15,34%,35%)] mb-4">
                      {measurement.description}
                    </p>
                    <div className="bg-[hsl(36,37%,95%)] rounded-lg p-6">
                      <img
                        src={measurement.image}
                        alt={`${measurement.name} measurement diagram`}
                        className="w-full max-w-md mx-auto h-48 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="text-center text-sm text-[hsl(15,34%,50%)] mt-4">
                        Measurement diagram for {measurement.name.toLowerCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-[hsl(42,65%,48%,0.05)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-12 w-12 text-[hsl(42,65%,48%)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[hsl(15,34%,13%)] mb-4">
            Still Need Help?
          </h2>
          <p className="text-[hsl(15,34%,35%)] mb-8">
            Our professional tailors can take your measurements for you. Book an appointment and get perfectly fitted garments.
          </p>
          <Button
            variant="glass"
            onClick={handleBookFitting}
            className="px-8 py-3 text-[hsl(15,34%,13%)] hover:text-[hsl(15,34%,13%)]"
          >
            ✨ Book Professional Service
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MeasurementGuide;
