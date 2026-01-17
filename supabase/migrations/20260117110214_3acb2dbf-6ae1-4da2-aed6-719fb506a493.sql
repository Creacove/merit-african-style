-- Add is_featured column to products table for featured products on homepage
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- Add compare_at_price column to products table for showing original/discount prices
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS compare_at_price numeric DEFAULT null;