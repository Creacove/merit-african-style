import { X, Plus, Minus, Trash2, ShoppingBag, Scissors } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CartSlideOver = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalAmount, totalItems, hasBespokeItems } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Slide-over Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[hsl(var(--deep-chocolate))] z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--gold-accent))]/10">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-[hsl(var(--gold-accent))]" />
              <h2 className="font-playfair text-xl font-bold text-[hsl(var(--warm-ivory))]">
                Your Cart
              </h2>
              {totalItems > 0 && (
                <span className="bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))] text-sm font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--warm-ivory))] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-[hsl(var(--gold-accent))]/30 mb-4" />
                <p className="text-[hsl(var(--muted-foreground))] text-lg mb-2">Your cart is empty</p>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">
                  Add some beautiful pieces to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-[hsl(var(--bg-section))] rounded-2xl border border-[hsl(var(--gold-accent))]/10"
                  >
                    {/* Image */}
                    <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[hsl(var(--deep-burgundy))]/30 flex items-center justify-center">
                          <Scissors className="w-6 h-6 text-[hsl(var(--gold-accent))]/50" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[hsl(var(--warm-ivory))] line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[hsl(var(--muted-foreground))] text-sm">
                          Size: {item.size}
                        </span>
                        {item.isBespoke && (
                          <span className="bg-[hsl(var(--deep-burgundy))] text-white text-xs px-2 py-0.5 rounded">
                            Bespoke
                          </span>
                        )}
                      </div>
                      <p className="text-[hsl(var(--gold-accent))] font-semibold mt-2">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-[hsl(var(--deep-chocolate))] border border-[hsl(var(--gold-accent))]/20 flex items-center justify-center text-[hsl(var(--warm-ivory))] hover:border-[hsl(var(--gold-accent))] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-[hsl(var(--warm-ivory))] font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-[hsl(var(--deep-chocolate))] border border-[hsl(var(--gold-accent))]/20 flex items-center justify-center text-[hsl(var(--warm-ivory))] hover:border-[hsl(var(--gold-accent))] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[hsl(var(--gold-accent))]/10 space-y-4">
              {hasBespokeItems && (
                <div className="bg-[hsl(var(--deep-burgundy))]/30 rounded-xl p-4 text-sm text-[hsl(var(--warm-ivory))]">
                  <p className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[hsl(var(--gold-accent))]" />
                    Your order includes bespoke items. Measurements will be collected at checkout.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-lg">
                <span className="text-[hsl(var(--muted-foreground))]">Subtotal</span>
                <span className="font-bold text-[hsl(var(--warm-ivory))]">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))] hover:bg-[hsl(var(--gold-accent))]/90 py-6 rounded-2xl font-semibold text-lg"
              >
                Proceed to Checkout
              </Button>

              <p className="text-center text-[hsl(var(--muted-foreground))] text-sm">
                Shipping calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSlideOver;
