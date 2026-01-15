import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Scissors, MessageCircle, Ruler } from 'lucide-react';
import { Product, SIZES, getStockForSize, hasAnyStock } from '@/types/database';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  formatPrice: (price: number) => string;
}

const ProductModal = ({ product, onClose, formatPrice }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isBespokeMode, setIsBespokeMode] = useState(!hasAnyStock(product.stock_levels));
  const { addItem } = useCart();

  const inStock = hasAnyStock(product.stock_levels);
  const selectedSizeStock = selectedSize ? getStockForSize(product.stock_levels, selectedSize) : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (!isBespokeMode && selectedSizeStock < quantity) {
      toast.error('Not enough stock available');
      return;
    }

    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.images?.[0] || '',
      isBespoke: isBespokeMode,
    });

    toast.success(`${product.title} added to cart!`);
    onClose();
  };

  const whatsappMessage = `Hello, I am interested in "${product.title}" but need help with measurements. My name is...`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[hsl(var(--deep-chocolate))] rounded-3xl border border-[hsl(var(--gold-accent))]/20 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[hsl(var(--bg-section))] rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--warm-ivory))] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="aspect-[3/4] md:aspect-auto md:h-full relative">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
              />
            ) : (
              <div className="w-full h-full min-h-[400px] bg-[hsl(var(--deep-burgundy))]/30 flex items-center justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                <Scissors className="w-16 h-16 text-[hsl(var(--gold-accent))]/50" />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8">
            <p className="text-[hsl(var(--gold-accent))] text-sm font-medium mb-2">
              {product.category}
            </p>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[hsl(var(--warm-ivory))] mb-4">
              {product.title}
            </h2>
            <p className="text-3xl font-bold text-[hsl(var(--warm-ivory))] mb-6">
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p className="text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            {product.model_stats && (
              <p className="text-[hsl(var(--muted-foreground))] text-sm mb-6 italic">
                {product.model_stats}
              </p>
            )}

            {/* Mode Toggle (Stock vs Bespoke) */}
            {inStock && product.is_hybrid && (
              <div className="mb-6">
                <div className="flex rounded-xl bg-[hsl(var(--bg-section))] p-1">
                  <button
                    onClick={() => setIsBespokeMode(false)}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                      !isBespokeMode
                        ? 'bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))]'
                        : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--warm-ivory))]'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 inline mr-2" />
                    Ready to Wear
                  </button>
                  <button
                    onClick={() => setIsBespokeMode(true)}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                      isBespokeMode
                        ? 'bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))]'
                        : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--warm-ivory))]'
                    }`}
                  >
                    <Scissors className="w-4 h-4 inline mr-2" />
                    Sew For Me
                  </button>
                </div>
              </div>
            )}

            {/* Bespoke Notice */}
            {isBespokeMode && (
              <div className="bg-[hsl(var(--deep-burgundy))]/30 rounded-xl p-4 mb-6">
                <p className="text-[hsl(var(--warm-ivory))] font-medium flex items-center gap-2 mb-2">
                  <Scissors className="w-5 h-5 text-[hsl(var(--gold-accent))]" />
                  Custom Tailored for You
                </p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">
                  Production Time: <span className="text-[hsl(var(--gold-accent))]">{product.production_time}</span>
                </p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
                  Measurements will be collected at checkout.
                </p>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-[hsl(var(--warm-ivory))] font-medium">
                  Select Size
                </label>
                <Link
                  to="/measurement-guide"
                  className="text-[hsl(var(--gold-accent))] text-sm hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-4 h-4" />
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => {
                  const stock = getStockForSize(product.stock_levels, size);
                  const isOutOfStock = !isBespokeMode && stock === 0;

                  return (
                    <button
                      key={size}
                      onClick={() => !isOutOfStock && setSelectedSize(size)}
                      disabled={isOutOfStock}
                      className={`w-14 h-14 rounded-xl border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-[hsl(var(--gold-accent))] bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))]'
                          : isOutOfStock
                          ? 'border-[hsl(var(--muted-foreground))]/20 text-[hsl(var(--muted-foreground))]/40 cursor-not-allowed line-through'
                          : 'border-[hsl(var(--gold-accent))]/30 text-[hsl(var(--warm-ivory))] hover:border-[hsl(var(--gold-accent))]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {!isBespokeMode && selectedSize && selectedSizeStock > 0 && (
                <p className="text-[hsl(var(--muted-foreground))] text-sm mt-2">
                  {selectedSizeStock} in stock
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-[hsl(var(--warm-ivory))] font-medium mb-3 block">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl bg-[hsl(var(--bg-section))] border border-[hsl(var(--gold-accent))]/20 flex items-center justify-center text-[hsl(var(--warm-ivory))] hover:border-[hsl(var(--gold-accent))] transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center text-[hsl(var(--warm-ivory))] text-xl font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(isBespokeMode ? quantity + 1 : Math.min(selectedSizeStock, quantity + 1))
                  }
                  disabled={!isBespokeMode && quantity >= selectedSizeStock}
                  className="w-12 h-12 rounded-xl bg-[hsl(var(--bg-section))] border border-[hsl(var(--gold-accent))]/20 flex items-center justify-center text-[hsl(var(--warm-ivory))] hover:border-[hsl(var(--gold-accent))] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))] hover:bg-[hsl(var(--gold-accent))]/90 py-6 rounded-2xl font-semibold text-lg mb-4"
            >
              {isBespokeMode ? (
                <>
                  <Scissors className="w-5 h-5 mr-2" />
                  Order Bespoke - {formatPrice(product.price * quantity)}
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart - {formatPrice(product.price * quantity)}
                </>
              )}
            </Button>

            {/* Help Me Measure Button */}
            {isBespokeMode && (
              <a
                href={`https://wa.me/2348000000000?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-green-600 text-green-500 hover:bg-green-600/10 transition-colors font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                Help Me Measure (WhatsApp)
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
