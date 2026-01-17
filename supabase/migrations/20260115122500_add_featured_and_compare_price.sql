-- Add is_featured column to products table
ALTER TABLE "public"."products" ADD COLUMN "is_featured" boolean DEFAULT false;

-- Add compare_at_price column to products table
ALTER TABLE "public"."products" ADD COLUMN "compare_at_price" numeric DEFAULT null;
