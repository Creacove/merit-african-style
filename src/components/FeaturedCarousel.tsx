import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, A11y } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

const FeaturedCarousel = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const navigate = useNavigate();

    // Fetch only published products
    const { data: products, isLoading } = useProducts();

    // Filter for featured products
    const featuredProducts = products?.filter(p => p.is_featured) || [];

    // Fallback to recent products if no featured ones (to ensure carousel isn't empty during dev)
    const displayProducts = featuredProducts.length > 0 ? featuredProducts : (products?.slice(0, 5) || []);

    // Need duplicate slides for seamless loop if we have few items
    const carouselItems = displayProducts.length < 5
        ? [...displayProducts, ...displayProducts, ...displayProducts]
        : displayProducts;

    const handleInit = (swiper: any) => {
        // Set up slide change animations
        swiper.on('slideChangeTransitionStart', () => {
            const slides = document.querySelectorAll('.featured-card');
            slides.forEach((slide: any) => {
                const isActive = slide.classList.contains('swiper-slide-active');
                gsap.to(slide, {
                    scale: isActive ? 1.0 : 0.9,
                    opacity: isActive ? 1 : 0.7,
                    filter: isActive ? 'grayscale(0%)' : 'grayscale(30%)',
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        });
    };

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Title entrance
            // Title entrance
            // Title entrance
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom-=100", // Start animating BEFORE it gets on screen
                    toggleActions: "play none none none", // Play once and keep it visible
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                clearProps: "all" // Ensure it stays visible
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleProductClick = (id: string) => {
        // Navigate to product detail (using shop page with product modal for now, or future dedicated page)
        // For now we'll just go to shop page
        navigate('/shop');
    };

    if (isLoading) {
        return (
            <div className="h-[500px] flex items-center justify-center bg-[hsl(var(--bg-section))]">
                <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--gold-accent))]" />
            </div>
        );
    }

    // If absolutely no products, hide section
    if (!isLoading && displayProducts.length === 0) return null;

    return (
        <section
            ref={sectionRef}
            className="bg-[hsl(var(--bg-section))] py-16 lg:py-24 overflow-hidden"
        >
            <div className="container mx-auto px-4 mb-12 text-center">
                <h2
                    ref={titleRef}
                    className="font-playfair font-bold text-3xl lg:text-5xl text-[hsl(var(--ivory))] mb-4"
                >
                    Discover Your <span className="text-[hsl(var(--gold-accent))]">Style</span>
                </h2>
                <p className="font-inter text-[hsl(var(--muted-ivory))] max-w-xl mx-auto">
                    Curated selections defining the essence of modern African elegance.
                </p>
            </div>

            <div className="w-full">
                <Swiper
                    modules={[Autoplay, Keyboard, A11y]}
                    centeredSlides={true}
                    slidesPerView={1.2}
                    spaceBetween={16}
                    loop={true}
                    speed={800}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                        1280: { slidesPerView: 3.5, spaceBetween: 40 }
                    }}
                    onInit={handleInit}
                    className="featured-swiper pb-12"
                >
                    {carouselItems.map((product, idx) => (
                        <SwiperSlide key={`${product.id}-${idx}`} className="transition-all duration-300">
                            {({ isActive }) => (
                                <div
                                    className={`featured-card relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group bg-[hsl(var(--deep-chocolate))] border border-[hsl(var(--gold-accent))]/10 transition-all duration-300 ${isActive ? 'scale-100 opacity-100 shadow-2xl shadow-black/50' : 'scale-90 opacity-70 grayscale-[30%]'}`}
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <img
                                        src={product.images?.[0] || '/placeholder.png'}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="w-12 h-0.5 bg-[hsl(var(--gold-accent))] mb-4 w-0 group-hover:w-12 transition-all duration-300" />
                                        <h3 className="font-playfair text-xl lg:text-2xl text-white mb-1">
                                            {product.title}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <p className="font-inter text-[hsl(var(--gold-accent))] font-medium">
                                                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.price)}
                                            </p>
                                            <Button size="icon" variant="ghost" className="text-white hover:text-[hsl(var(--gold-accent))] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <ArrowRight className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="text-center mt-8">
                <Button variant="outline" className="border-[hsl(var(--gold-accent))]/30 text-[hsl(var(--gold-accent))] hover:bg-[hsl(var(--gold-accent))]/10" onClick={() => navigate('/shop')}>
                    View All Collections
                </Button>
            </div>
        </section>
    );
};

export default FeaturedCarousel;
