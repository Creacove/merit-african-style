import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderItem, ShippingAddress, Measurements } from '@/types/database';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

// Admin: Fetch all orders
export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }

      // Cast JSONB fields properly
      return (data || []).map((order) => ({
        ...order,
        items: (order.items as unknown) as OrderItem[],
        shipping_address: (order.shipping_address as unknown) as ShippingAddress | null,
        measurements: (order.measurements as unknown) as Measurements | null,
        order_type: (order.order_type as 'stock' | 'bespoke') || 'stock',
        status: order.status || 'pending',
        tracking_token: order.tracking_token || '',
      })) as Order[];
    },
  });
}

// Admin: Update order status
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated');
    },
    onError: (error) => {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    },
  });
}

// Admin: Set delivery date
export function useSetDeliveryDate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, delivery_date }: { id: string; delivery_date: string }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ delivery_date })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Delivery date set successfully');
    },
    onError: (error) => {
      console.error('Error setting delivery date:', error);
      toast.error('Failed to set delivery date');
    },
  });
}

// Create order (guest checkout)
interface CreateOrderInput {
  customer_email: string;
  customer_name: string;
  customer_phone?: string;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  total_amount: number;
  order_type: 'stock' | 'bespoke';
  measurements?: Measurements;
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: CreateOrderInput) => {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_email: orderData.customer_email,
          customer_name: orderData.customer_name,
          customer_phone: orderData.customer_phone || null,
          shipping_address: orderData.shipping_address as unknown as Json,
          items: orderData.items as unknown as Json,
          total_amount: orderData.total_amount,
          order_type: orderData.order_type,
          measurements: (orderData.measurements || null) as unknown as Json,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      // Decrement stock for stock items
      for (const item of orderData.items) {
        if (!item.is_bespoke) {
          // Get current product
          const { data: product } = await supabase
            .from('products')
            .select('stock_levels')
            .eq('id', item.product_id)
            .single();

          if (product && product.stock_levels) {
            const stockLevels = product.stock_levels as Record<string, number>;
            const newStock = Math.max(0, (stockLevels[item.size] || 0) - item.quantity);
            
            await supabase
              .from('products')
              .update({
                stock_levels: { ...stockLevels, [item.size]: newStock } as unknown as Json,
              })
              .eq('id', item.product_id);
          }
        }
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Order placed successfully!');
    },
    onError: (error) => {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
    },
  });
}
