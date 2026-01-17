import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductModal from "@/components/shop/ProductModal";

const FeaturedCollection = () => {
    const navigate = useNavigate();
    const { data: products, isLoading } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Get top 8 newest products
    const newArrivals = products?.slice(0, 8) || [];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (isLoading) {
        return <div className="h-40 flex items-center justify-center"><Loader2 className="animate-spin text-[hsl(var(--gold-accent))]" /></div>;
    }

    if (newArrivals.length === 0) return null;

    return (
        <section id="shop-preview" className="py-16 px-4 bg-[hsl(var(--deep-chocolate))]">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {newArrivals.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-[hsl(var(--bg-section))] rounded-2xl overflow-hidden border border-[hsl(var(--gold-accent))]/10 hover:border-[hsl(var(--gold-accent))]/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[hsl(var(--deep-burgundy))]/30 to-[hsl(var(--bg-section))]">
                                <img
                                    src={product.images?.[0] || '/placeholder.png'}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {product.compare_at_price && (
                                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-3 py-1 rounded-full shadow-lg">
                                        Sale
                                    </Badge>
                                )}

                                {/* Floating action button */}
                                <button
                                    className="absolute bottom-4 right-4 w-12 h-12 bg-[hsl(var(--gold-accent))] rounded-full flex items-center justify-center text-[hsl(var(--deep-chocolate))] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-110"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProduct(product);
                                    }}
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-5">
                                <h3 className="font-playfair text-lg font-semibold text-[hsl(var(--warm-ivory))] mb-2 line-clamp-2 leading-tight">
                                    {product.title}
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <span className="text-[hsl(var(--gold-accent))] font-bold text-xl">
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.compare_at_price && (
                                        <span className="text-sm text-[hsl(var(--muted-foreground))] line-through">
                                            {formatPrice(product.compare_at_price)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Product Modal */}
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        formatPrice={formatPrice}
                    />
                )}
            </div>
        </section>
    );
};

export default FeaturedCollection;
