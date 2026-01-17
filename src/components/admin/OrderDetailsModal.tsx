import { Order } from '@/types/database';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Package, MapPin, Phone, Mail, Ruler, Calendar, CreditCard, Scissors, ShoppingBag } from 'lucide-react';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
  formatPrice: (price: number) => string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-600',
  paid: 'bg-blue-600',
  measuring: 'bg-purple-600',
  production: 'bg-orange-600',
  shipped: 'bg-cyan-600',
  delivered: 'bg-green-600',
  cancelled: 'bg-red-600',
};

export const OrderDetailsModal = ({ order, onClose, formatPrice }: OrderDetailsModalProps) => {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-[hsl(var(--bg-section))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-xl flex items-center gap-3">
            <Package className="w-5 h-5 text-[hsl(var(--gold-accent))]" />
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[hsl(var(--muted-foreground))] text-sm">Order ID</p>
              <p className="font-mono text-sm">{order.id.slice(0, 8)}...</p>
            </div>
            <div className="text-right">
              <Badge className={statusColors[order.status] || 'bg-gray-600'}>
                {order.status}
              </Badge>
              <p className="text-[hsl(var(--muted-foreground))] text-xs mt-1">
                {format(new Date(order.created_at), 'PPP')}
              </p>
            </div>
          </div>

          <Separator className="bg-[hsl(var(--gold-accent))]/10" />

          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[hsl(var(--gold-accent))] flex items-center gap-2">
              <Mail className="w-4 h-4" /> Customer Information
            </h3>
            <div className="bg-[hsl(var(--deep-chocolate))] rounded-xl p-4 space-y-2">
              <p className="font-medium text-lg">{order.customer_name}</p>
              <p className="text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                <Mail className="w-4 h-4" /> {order.customer_email}
              </p>
              {order.customer_phone && (
                <p className="text-[hsl(var(--muted-foreground))] flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {order.customer_phone}
                </p>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          {order.shipping_address && (
            <div className="space-y-3">
              <h3 className="font-semibold text-[hsl(var(--gold-accent))] flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Shipping Address
              </h3>
              <div className="bg-[hsl(var(--deep-chocolate))] rounded-xl p-4">
                <p>{order.shipping_address.street}</p>
                <p>{order.shipping_address.city}, {order.shipping_address.state}</p>
                <p>{order.shipping_address.country}</p>
                {order.shipping_address.postal_code && <p>Postal: {order.shipping_address.postal_code}</p>}
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[hsl(var(--gold-accent))] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Order Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 bg-[hsl(var(--deep-chocolate))] rounded-xl p-4">
                  {item.image && (
                    <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[hsl(var(--muted-foreground))] text-sm">Size: {item.size}</span>
                          <span className="text-[hsl(var(--muted-foreground))] text-sm">× {item.quantity}</span>
                        </div>
                      </div>
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    {item.is_bespoke && (
                      <Badge className="mt-2 bg-purple-600 text-white">
                        <Scissors className="w-3 h-3 mr-1" /> Bespoke
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Measurements (for bespoke orders) */}
          {order.order_type === 'bespoke' && order.measurements && (
            <div className="space-y-3">
              <h3 className="font-semibold text-[hsl(var(--gold-accent))] flex items-center gap-2">
                <Ruler className="w-4 h-4" /> Customer Measurements
              </h3>
              <div className="bg-[hsl(var(--deep-chocolate))] rounded-xl p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(order.measurements).map(([key, value]) => (
                    value !== undefined && value !== null && (
                      <div key={key}>
                        <p className="text-[hsl(var(--muted-foreground))] text-xs capitalize">
                          {key.replace(/_/g, ' ')}
                        </p>
                        <p className="font-medium">{value}"</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Delivery & Payment */}
          <div className="grid md:grid-cols-2 gap-4">
            {order.delivery_date && (
              <div className="space-y-2">
                <h3 className="font-semibold text-[hsl(var(--gold-accent))] flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Expected Delivery
                </h3>
                <div className="bg-[hsl(var(--deep-chocolate))] rounded-xl p-4">
                  <p>{format(new Date(order.delivery_date), 'PPP')}</p>
                </div>
              </div>
            )}
            {order.paystack_reference && (
              <div className="space-y-2">
                <h3 className="font-semibold text-[hsl(var(--gold-accent))] flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Payment Reference
                </h3>
                <div className="bg-[hsl(var(--deep-chocolate))] rounded-xl p-4">
                  <p className="font-mono text-sm">{order.paystack_reference}</p>
                </div>
              </div>
            )}
          </div>

          <Separator className="bg-[hsl(var(--gold-accent))]/10" />

          {/* Order Total */}
          <div className="flex items-center justify-between text-lg">
            <span className="font-semibold">Order Total</span>
            <span className="font-bold text-[hsl(var(--gold-accent))] text-2xl">
              {formatPrice(order.total_amount)}
            </span>
          </div>

          {/* Tracking Token */}
          {order.tracking_token && (
            <div className="bg-[hsl(var(--deep-burgundy))]/30 rounded-xl p-4 text-center">
              <p className="text-[hsl(var(--muted-foreground))] text-xs mb-1">Customer Tracking Token</p>
              <p className="font-mono text-sm">{order.tracking_token}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};