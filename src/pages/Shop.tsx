import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { Product, CATEGORIES, getStockForSize, hasAnyStock, getAvailableSizes } from '@/types/database';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Scissors, Filter, X, MessageCircle, Loader2 } from 'lucide-react';
import CartSlideOver from '@/components/shop/CartSlideOver';
import ProductModal from '@/components/shop/ProductModal';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: products, isLoading, error } = useProducts(selectedCategory);
  const { openCart, totalItems } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--deep-chocolate))]">
      <Navigation />
      
      {/* Cart Button - Fixed */}
      <button
        onClick={openCart}
        className="fixed right-6 bottom-6 z-40 bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <ShoppingBag className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-[hsl(var(--deep-burgundy))] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--warm-ivory))] mb-4">
            The <span className="text-[hsl(var(--gold-accent))]">Collection</span>
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
            Each piece is a testament to African craftsmanship. Available off-the-rack or tailored to your exact measurements.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 lg:px-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <Button
              variant={!selectedCategory ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(undefined)}
              className={`rounded-full ${
                !selectedCategory
                  ? 'bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))]'
                  : 'border-[hsl(var(--gold-accent))]/30 text-[hsl(var(--warm-ivory))] hover:bg-[hsl(var(--gold-accent))]/10'
              }`}
            >
              All Styles
            </Button>
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category
                    ? 'bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))]'
                    : 'border-[hsl(var(--gold-accent))]/30 text-[hsl(var(--warm-ivory))] hover:bg-[hsl(var(--gold-accent))]/10'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--gold-accent))]" />
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <p className="text-[hsl(var(--muted-foreground))]">Failed to load products. Please try again.</p>
            </div>
          ) : products && products.length === 0 ? (
            <div className="text-center py-24">
              <Scissors className="w-12 h-12 mx-auto text-[hsl(var(--gold-accent))] mb-4" />
              <p className="text-[hsl(var(--muted-foreground))]">No products available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WhatsApp Help Button */}
      <a
        href={`https://wa.me/2348000000000?text=${encodeURIComponent(
          'Hello, I need help with measurements for my order.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-6 bottom-6 z-40 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline text-sm font-medium">Help Me Measure</span>
      </a>

      {/* Cart Slide-over */}
      <CartSlideOver />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          formatPrice={formatPrice}
        />
      )}

      <Footer />
    </div>
  );
};

// Product Card Component
function ProductCard({
  product,
  onClick,
  formatPrice,
}: {
  product: Product;
  onClick: () => void;
  formatPrice: (price: number) => string;
}) {
  const inStock = hasAnyStock(product.stock_levels);
  const availableSizes = getAvailableSizes(product.stock_levels);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-[hsl(var(--card-bg))] rounded-2xl overflow-hidden border border-[hsl(var(--gold-accent))]/10 hover:border-[hsl(var(--gold-accent))]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Image */}
      <div className="aspect-[3/4] relative overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[hsl(var(--deep-burgundy))]/30 flex items-center justify-center">
            <Scissors className="w-12 h-12 text-[hsl(var(--gold-accent))]/50" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!inStock && product.is_hybrid && (
            <Badge className="bg-[hsl(var(--deep-burgundy))] text-white">
              Bespoke Only
            </Badge>
          )}
          {inStock && (
            <Badge className="bg-green-600 text-white">In Stock</Badge>
          )}
        </div>

        {/* Quick Action */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))] hover:bg-[hsl(var(--gold-accent))]/90 rounded-xl">
            {inStock ? 'Add to Cart' : 'Sew For Me'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[hsl(var(--gold-accent))] text-sm font-medium mb-1">
          {product.category}
        </p>
        <h3 className="font-playfair text-lg font-bold text-[hsl(var(--warm-ivory))] mb-2 line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-[hsl(var(--warm-ivory))] font-semibold">
            {formatPrice(product.price)}
          </span>
          {inStock && (
            <span className="text-[hsl(var(--muted-foreground))] text-sm">
              {availableSizes.join(', ')}
            </span>
          )}
        </div>
        {!inStock && product.is_hybrid && (
          <p className="text-[hsl(var(--muted-foreground))] text-sm mt-2">
            Production: {product.production_time}
          </p>
        )}
      </div>
    </div>
  );
}

export default Shop;
