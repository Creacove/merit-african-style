-- Add colors field to products for color variants
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS colors text[] DEFAULT ARRAY[]::text[];

-- Add comment for documentation
COMMENT ON COLUMN public.products.colors IS 'Array of available colors for this product';