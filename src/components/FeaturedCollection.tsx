import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FeaturedCollection = () => {
    const navigate = useNavigate();
    const { data: products, isLoading } = useProducts();

    // Get top 8 newest products
    const newArrivals = products?.slice(0, 8) || [];

    if (isLoading) {
        return <div className="h-40 flex items-center justify-center"><Loader2 className="animate-spin text-[hsl(var(--gold-accent))]" /></div>;
    }

    if (newArrivals.length === 0) return null;

    return (
        <section className="py-16 px-4 bg-[hsl(var(--deep-chocolate))]">
            <div className="container mx-auto max-w-7xl">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="font-playfair font-bold text-2xl lg:text-4xl text-[hsl(var(--warm-ivory))] mb-2">
                            New Arrivals
                        </h2>
                        <p className="text-[hsl(var(--muted-foreground))]">Fresh from our atelier.</p>
                    </div>
                    <Button
                        variant="link"
                        className="text-[hsl(var(--gold-accent))]"
                        onClick={() => navigate('/shop')}
                    >
                        View All →
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
                    {newArrivals.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-[hsl(var(--bg-section))] rounded-xl overflow-hidden border border-[hsl(var(--gold-accent))]/10 hover:border-[hsl(var(--gold-accent))]/30 transition-all duration-300"
                            onClick={() => navigate('/shop')}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-[hsl(var(--deep-burgundy))]/20">
                                <img
                                    src={product.images?.[0] || '/placeholder.png'}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {product.compare_at_price && (
                                    <Badge className="absolute top-3 left-3 bg-red-600 hover:bg-red-700">
                                        Sale
                                    </Badge>
                                )}
                                {/* Floating Add Button on mobile/desktop */}
                                <button className="absolute bottom-3 right-3 w-10 h-10 bg-[hsl(var(--gold-accent))] rounded-full flex items-center justify-center text-black opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                    <ShoppingBag className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-4">
                                <h3 className="font-playfair text-lg text-[hsl(var(--warm-ivory))] mb-1 truncate">{product.title}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-[hsl(var(--gold-accent))] font-medium">
                                        {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.price)}
                                    </span>
                                    {product.compare_at_price && (
                                        <span className="text-xs text-[hsl(var(--muted-foreground))] line-through">
                                            {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.compare_at_price)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
