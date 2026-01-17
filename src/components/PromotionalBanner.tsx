import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PromotionalBanner = () => {
    const navigate = useNavigate();

    return (
        <section className="relative h-[400px] lg:h-[500px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1548171915-e79a380a2a4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")', // Stylized fabric or fashion shot
                    backgroundPosition: 'center 30%'
                }}
            >
                <div className="absolute inset-0 bg-[hsl(var(--deep-chocolate))]/70 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <span className="inline-block py-1 px-3 border border-[hsl(var(--gold-accent))] rounded-full text-[hsl(var(--gold-accent))] text-sm uppercase tracking-widest mb-4">
                    Limited Time Offer
                </span>
                <h2 className="font-playfair font-bold text-4xl lg:text-6xl text-white mb-6 leading-tight">
                    Elevate Your Wardrobe with <span className="text-[hsl(var(--gold-accent))]">Bespoke Luxury</span>
                </h2>
                <p className="font-inter text-lg text-gray-200 mb-8 max-w-xl mx-auto">
                    Get up to 20% off on your first bespoke consultation and measurement session.
                </p>
                <Button
                    size="xl"
                    className="bg-[hsl(var(--gold-accent))] text-black hover:bg-[hsl(var(--gold-accent))]/90 font-medium px-8 h-14 text-lg rounded-full"
                    onClick={() => navigate('/shop')}
                >
                    Explore Collections
                </Button>
            </div>
        </section>
    );
};

export default PromotionalBanner;
