-- MERIT AFRICAN STYLE - E-COMMERCE SCHEMA
-- Premium Nigerian Tailor E-commerce with Hybrid Commerce Logic

-- 1. PROFILES TABLE (Admin identification)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 2. PRODUCTS TABLE (Hybrid Commerce)
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL CHECK (price >= 0),
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  category TEXT NOT NULL, -- 'Agbada', 'Kaftan', 'Senator', 'Buba & Sokoto', 'Accessory'
  
  -- HYBRID LOGIC
  is_hybrid BOOLEAN DEFAULT TRUE, -- If true, allows 'Sew For Me' when stock is 0
  stock_levels JSONB DEFAULT '{"S": 0, "M": 0, "L": 0, "XL": 0, "XXL": 0}'::JSONB,
  production_time TEXT DEFAULT '2 Weeks', -- Displayed when switching to Bespoke mode
  
  -- SIZE CONTEXT
  model_stats TEXT, -- e.g. "Model is 6ft wearing Size L"
  
  -- VISIBILITY
  is_published BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 3. ORDERS TABLE (Guest Checkout + Bespoke)
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- CUSTOMER INFO (Guest First)
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB,
  
  -- ORDER DETAILS
  items JSONB NOT NULL DEFAULT '[]'::JSONB, -- Snapshot of what was bought
  total_amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'measuring', 'production', 'shipped', 'delivered', 'cancelled'
  
  -- BESPOKE TRACKING
  order_type TEXT DEFAULT 'stock', -- 'stock' or 'bespoke'
  measurements JSONB, -- { "neck": 18, "chest": 42, "sleeve": 34, "agbada_length": 55 }
  delivery_date DATE, -- SET BY ADMIN to manage expectations
  
  -- PAYMENT
  paystack_reference TEXT,
  
  -- ORDER TRACKING (for guest lookup)
  tracking_token TEXT DEFAULT encode(gen_random_bytes(16), 'hex')
);

-- 4. CONSULTATIONS TABLE (WhatsApp Bridge Alternative)
CREATE TABLE public.consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_date DATE,
  product_interest TEXT, -- Which product they're interested in
  message TEXT,
  status TEXT DEFAULT 'new' -- 'new', 'contacted', 'scheduled', 'completed', 'cancelled'
);

-- 5. HELPER FUNCTION: Check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = TRUE
  )
$$;

-- 6. AUTO-CREATE PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. UPDATE TIMESTAMP FUNCTION
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- 9. RLS POLICIES

-- PROFILES: Users can read own, admins can read all
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- PRODUCTS: Public read for published, Admin full access
CREATE POLICY "Anyone can view published products"
  ON public.products FOR SELECT
  USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  USING (public.is_admin());

-- ORDERS: Anyone can insert (guest checkout), only admins can view/update
CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete orders"
  ON public.orders FOR DELETE
  USING (public.is_admin());

-- CONSULTATIONS: Anyone can insert, only admins can view/update
CREATE POLICY "Anyone can request consultation"
  ON public.consultations FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins can view consultations"
  ON public.consultations FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update consultations"
  ON public.consultations FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete consultations"
  ON public.consultations FOR DELETE
  USING (public.is_admin());

-- 10. STORAGE BUCKET FOR PRODUCT IMAGES
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "Admins can update product images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "Admins can delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND public.is_admin());

-- 11. INDEXES FOR PERFORMANCE
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_is_published ON public.products(is_published);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_tracking_token ON public.orders(tracking_token);
CREATE INDEX idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX idx_consultations_status ON public.consultations(status);