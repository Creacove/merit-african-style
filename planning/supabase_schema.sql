-- MERIT AFRICAN STYLE - SUPABASE BLUEPRINT
-- AUTHOR: Antigravity (Product Manager)
-- DATE: Jan 15, 2026

-- 1. PRODUCTS TABLE
-- Handles both ready-to-wear inventory and bespoke product definitions.
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price numeric not null,
  images text[] default array[]::text[],
  category text not null, -- 'Agbada', 'Kaftan', 'Senator', 'Accessory'
  
  -- HYBRID LOGIC
  is_hybrid boolean default true, -- If true, allows 'Sew For Me' when stock is 0
  stock_levels jsonb default '{"S": 0, "M": 0, "L": 0, "XL": 0}'::jsonb,
  production_time text default '2 Weeks', -- Displayed when switching to Bespoke mode
  
  -- SIZE CONTEXT
  model_stats text, -- e.g. "Model is 6ft wearing Size L"
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. ORDERS TABLE
-- Centralizes all transaction types (Guest, Stock, Bespoke).
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- CUSTOMER INFO (Guest First)
  customer_email text not null,
  customer_name text not null,
  customer_phone text,
  shipping_address jsonb,
  
  -- ORDER DETAILS
  items jsonb not null, -- Snapshot of what was bought
  total_amount numeric not null,
  status text default 'pending', -- 'pending', 'paid', 'measuring', 'production', 'shipped', 'delivered'
  
  -- BESPOKE TRACKING
  order_type text default 'stock', -- 'stock' or 'bespoke'
  measurements jsonb, -- { "neck": 18, "chest": 42, "sleeve": 34, "agbada_length": 55 }
  delivery_date date, -- SET BY ADMIN to manage expectations
  
  -- PAYMENT
  paystack_reference text
);

-- 3. CONSULTATIONS TABLE
-- For users who need physical measuring sessions.
create table if not exists public.consultations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  customer_name text not null,
  phone text not null,
  preferred_date date,
  status text default 'new' -- 'new', 'contacted', 'scheduled', 'completed'
);

-- 4. STORAGE
-- Bucket: 'product-images' (Public Read, Admin Write)

-- 5. RLS POLICIES (Abstract)
-- Products: Public READ, Admin ALL
-- Orders: Public INSERT (Guest Checkout), Admin ALL
-- Consultations: Public INSERT, Admin ALL
