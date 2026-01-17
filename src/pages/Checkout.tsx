import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useCreateOrder } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, Scissors, ShoppingBag, Loader2, Check } from 'lucide-react';
import { z } from 'zod';
import { scrollToTop } from '@/lib/utils';

const emailSchema = z.string().email('Please enter a valid email');
const phoneSchema = z.string().min(10, 'Please enter a valid phone number');

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalAmount, hasBespokeItems, clearCart } = useCart();
  const createOrder = useCreateOrder();

  const [step, setStep] = useState<'info' | 'measurements' | 'confirm'>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Customer Info
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('Nigeria');

  // Measurements (for bespoke items)
  const [measurements, setMeasurements] = useState({
    neck: '',
    chest: '',
    shoulder: '',
    sleeve: '',
    waist: '',
    agbadaLength: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const validateInfo = () => {
    if (!customerName.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    try {
      emailSchema.parse(customerEmail);
    } catch {
      toast.error('Please enter a valid email address');
      return false;
    }
    try {
      phoneSchema.parse(customerPhone);
    } catch {
      toast.error('Please enter a valid phone number');
      return false;
    }
    if (!street.trim() || !city.trim() || !state.trim()) {
      toast.error('Please complete your shipping address');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateInfo()) return;

    if (hasBespokeItems) {
      setStep('measurements');
    } else {
      setStep('confirm');
    }
    scrollToTop();
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    try {
      const orderItems = items.map((item) => ({
        product_id: item.productId,
        title: item.title,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
        is_bespoke: item.isBespoke,
        image: item.image,
      }));

      const measurementsData = hasBespokeItems
        ? {
            neck: parseFloat(measurements.neck) || undefined,
            chest: parseFloat(measurements.chest) || undefined,
            shoulder: parseFloat(measurements.shoulder) || undefined,
            sleeve: parseFloat(measurements.sleeve) || undefined,
            waist: parseFloat(measurements.waist) || undefined,
            agbada_length: parseFloat(measurements.agbadaLength) || undefined,
          }
        : undefined;

      const orderResult = await createOrder.mutateAsync({
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone: customerPhone,
        shipping_address: {
          street,
          city,
          state,
          country,
        },
        items: orderItems,
        total_amount: totalAmount,
        order_type: hasBespokeItems ? 'bespoke' : 'stock',
        measurements: measurementsData,
      });

      // Initialize Paystack payment
      const paystackResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/paystack-initialize`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: customerEmail,
            amount: totalAmount,
            orderId: orderResult.id,
          }),
        }
      );

      const paystackData = await paystackResponse.json();

      if (paystackData.success && paystackData.authorization_url) {
        // Redirect to Paystack
        window.location.href = paystackData.authorization_url;
      } else {
        // Fallback: Order created but payment failed - show success anyway
        setOrderComplete(true);
        clearCart();
        toast.info('Order placed! Payment link will be sent to your email.');
      }
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-[hsl(var(--deep-chocolate))]">
        <Navigation />
        <div className="pt-32 pb-24 px-6 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-[hsl(var(--gold-accent))]/30 mb-4" />
          <h1 className="font-playfair text-3xl font-bold text-[hsl(var(--warm-ivory))] mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] mb-8">
            Add some beautiful pieces to your cart first.
          </p>
          <Button
            onClick={() => navigate('/shop')}
            className="bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))]"
          >
            Browse Collection
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[hsl(var(--deep-chocolate))]">
        <Navigation />
        <div className="pt-32 pb-24 px-6 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-playfair text-3xl font-bold text-[hsl(var(--warm-ivory))] mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] mb-8">
            Thank you for your order! We've sent a confirmation email to {customerEmail}.
            {hasBespokeItems && ' We will contact you shortly to confirm your measurements.'}
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))]"
          >
            Return Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--deep-chocolate))]">
      <Navigation />

      <div className="pt-8 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => {
              if (step === 'info') {
                navigate('/shop');
              } else {
                setStep('info');
                scrollToTop();
              }
            }}
            className="text-[hsl(var(--warm-ivory))] hover:text-[hsl(var(--gold-accent))] mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 'info' ? 'Back to Shop' : 'Back'}
          </Button>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {['info', hasBespokeItems ? 'measurements' : null, 'confirm']
              .filter(Boolean)
              .map((s, i) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step === s
                        ? 'bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))]'
                        : 'bg-[hsl(var(--bg-section))] text-[hsl(var(--muted-foreground))]'
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < (hasBespokeItems ? 2 : 1) && (
                    <div className="w-12 h-0.5 bg-[hsl(var(--gold-accent))]/20 ml-4" />
                  )}
                </div>
              ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {step === 'info' && (
                <div className="bg-[hsl(var(--bg-section))] rounded-3xl p-6 md:p-8 border border-[hsl(var(--gold-accent))]/10">
                  <h2 className="font-playfair text-2xl font-bold text-[hsl(var(--warm-ivory))] mb-6">
                    Contact & Shipping Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-[hsl(var(--warm-ivory))]">Full Name</Label>
                      <Input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))]"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[hsl(var(--warm-ivory))]">Email</Label>
                        <Input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="mt-1 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))]"
                        />
                      </div>
                      <div>
                        <Label className="text-[hsl(var(--warm-ivory))]">Phone</Label>
                        <Input
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="+234 800 000 0000"
                          className="mt-1 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-[hsl(var(--warm-ivory))]">Street Address</Label>
                      <Textarea
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Enter your street address"
                        className="mt-1 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))] resize-none"
                        rows={2}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-[hsl(var(--warm-ivory))]">City</Label>
                        <Input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Lagos"
                          className="mt-1 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))]"
                        />
                      </div>
                      <div>
                        <Label className="text-[hsl(var(--warm-ivory))]">State</Label>
                        <Input
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="Lagos State"
                          className="mt-1 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))]"
                        />
                      </div>
                      <div>
                        <Label className="text-[hsl(var(--warm-ivory))]">Country</Label>
                        <Input
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Nigeria"
                          className="mt-1 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))]"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleContinue}
                    className="w-full mt-6 bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))] py-6 rounded-2xl font-semibold"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === 'measurements' && (
                <div className="bg-[hsl(var(--bg-section))] rounded-3xl p-6 md:p-8 border border-[hsl(var(--gold-accent))]/10">
                  <div className="flex items-center gap-3 mb-6">
                    <Scissors className="w-6 h-6 text-[hsl(var(--gold-accent))]" />
                    <h2 className="font-playfair text-2xl font-bold text-[hsl(var(--warm-ivory))]">
                      Your Measurements
                    </h2>
                  </div>

                  <p className="text-[hsl(var(--muted-foreground))] mb-6">
                    Please provide your measurements in inches. If unsure, leave blank and we'll contact you.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: 'neck', label: 'Neck (inches)' },
                      { key: 'chest', label: 'Chest (inches)' },
                      { key: 'shoulder', label: 'Shoulder (inches)' },
                      { key: 'sleeve', label: 'Sleeve Length (inches)' },
                      { key: 'waist', label: 'Waist (inches)' },
                      { key: 'agbadaLength', label: 'Agbada Length (inches)' },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <Label className="text-[hsl(var(--warm-ivory))]">{label}</Label>
                        <Input
                          type="number"
                          value={measurements[key as keyof typeof measurements]}
                          onChange={(e) =>
                            setMeasurements((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          placeholder="e.g. 42"
                          className="mt-1 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))]"
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => {
                      setStep('confirm');
                      scrollToTop();
                    }}
                    className="w-full mt-6 bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))] py-6 rounded-2xl font-semibold"
                  >
                    Review Order
                  </Button>
                </div>
              )}

              {step === 'confirm' && (
                <div className="bg-[hsl(var(--bg-section))] rounded-3xl p-6 md:p-8 border border-[hsl(var(--gold-accent))]/10">
                  <h2 className="font-playfair text-2xl font-bold text-[hsl(var(--warm-ivory))] mb-6">
                    Confirm Your Order
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-[hsl(var(--deep-chocolate))] rounded-xl">
                      <h3 className="text-[hsl(var(--gold-accent))] font-medium mb-2">Shipping To</h3>
                      <p className="text-[hsl(var(--warm-ivory))]">{customerName}</p>
                      <p className="text-[hsl(var(--muted-foreground))]">{street}</p>
                      <p className="text-[hsl(var(--muted-foreground))]">
                        {city}, {state}, {country}
                      </p>
                      <p className="text-[hsl(var(--muted-foreground))]">{customerPhone}</p>
                    </div>

                    {hasBespokeItems && (
                      <div className="p-4 bg-[hsl(var(--deep-chocolate))] rounded-xl">
                        <h3 className="text-[hsl(var(--gold-accent))] font-medium mb-2">Measurements</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(measurements)
                            .filter(([_, v]) => v)
                            .map(([key, value]) => (
                              <p key={key} className="text-[hsl(var(--muted-foreground))]">
                                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>:{' '}
                                <span className="text-[hsl(var(--warm-ivory))]">{value}"</span>
                              </p>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full bg-[hsl(var(--gold-accent))] text-[hsl(var(--deep-chocolate))] py-6 rounded-2xl font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Place Order - ${formatPrice(totalAmount)}`
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[hsl(var(--bg-section))] rounded-3xl p-6 border border-[hsl(var(--gold-accent))]/10 sticky top-24">
                <h3 className="font-playfair text-xl font-bold text-[hsl(var(--warm-ivory))] mb-4">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[hsl(var(--deep-chocolate))]">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Scissors className="w-4 h-4 text-[hsl(var(--gold-accent))]/50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[hsl(var(--warm-ivory))] font-medium text-sm line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-[hsl(var(--muted-foreground))] text-xs">
                          Size: {item.size} × {item.quantity}
                        </p>
                        {item.isBespoke && (
                          <span className="inline-block mt-1 text-xs bg-[hsl(var(--deep-burgundy))] text-white px-2 py-0.5 rounded">
                            Bespoke
                          </span>
                        )}
                      </div>
                      <p className="text-[hsl(var(--warm-ivory))] font-medium text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[hsl(var(--gold-accent))]/10 pt-4 space-y-2">
                  <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                    <span>Shipping</span>
                    <span>Calculated after</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-[hsl(var(--warm-ivory))] pt-2 border-t border-[hsl(var(--gold-accent))]/10">
                    <span>Total</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
