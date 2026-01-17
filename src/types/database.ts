// Custom types for the Merit African Style e-commerce

export interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  images: string[];
  category: string;
  is_hybrid: boolean;
  stock_levels: Record<string, number>;
  production_time: string;
  model_stats: string | null;
  is_published: boolean;
  is_featured: boolean;
  compare_at_price: number | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  shipping_address: ShippingAddress | null;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  order_type: 'stock' | 'bespoke';
  measurements: Measurements | null;
  delivery_date: string | null;
  paystack_reference: string | null;
  tracking_token: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code?: string;
}

export interface OrderItem {
  product_id: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  is_bespoke: boolean;
  image?: string;
}

export interface Measurements {
  neck?: number;
  chest?: number;
  sleeve?: number;
  agbada_length?: number;
  shoulder?: number;
  waist?: number;
  hip?: number;
  trouser_length?: number;
  thigh?: number;
}

export type OrderStatus = 
  | 'pending'
  | 'paid'
  | 'measuring'
  | 'production'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Consultation {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  email: string | null;
  preferred_date: string | null;
  product_interest: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
}

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

// Stock size options
export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const;
export type Size = typeof SIZES[number];

// Product categories
export const CATEGORIES = [
  'Agbada',
  'Kaftan',
  'Senator',
  'Buba & Sokoto',
  'Accessory',
] as const;
export type Category = typeof CATEGORIES[number];

// Helper function to check stock for a size
export function getStockForSize(stockLevels: Record<string, number>, size: string): number {
  return stockLevels[size] ?? 0;
}

// Helper function to check if any size is in stock
export function hasAnyStock(stockLevels: Record<string, number>): boolean {
  return Object.values(stockLevels).some((qty) => qty > 0);
}

// Helper function to get available sizes
export function getAvailableSizes(stockLevels: Record<string, number>): string[] {
  return Object.entries(stockLevels)
    .filter(([_, qty]) => qty > 0)
    .map(([size]) => size);
}
