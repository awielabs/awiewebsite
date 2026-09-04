-- ==========================================
-- AWIE SUPABASE POSTGRESQL SCHEMA
-- ==========================================

-- 1. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    budget_range VARCHAR(100),
    status VARCHAR(50) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'in_progress', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    technologies TEXT[] DEFAULT '{}',
    problem TEXT,
    technology_stack TEXT,
    what_was_built TEXT,
    result TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Products & Store Catalog Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    sku VARCHAR(100),
    category_slug VARCHAR(100),
    sub_category VARCHAR(100),
    description TEXT NOT NULL,
    price DECIMAL(10, 2),
    original_price DECIMAL(10, 2),
    discount_percent INT DEFAULT 0,
    in_stock BOOLEAN DEFAULT true,
    stock_count INT DEFAULT 10,
    rating DECIMAL(3, 2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'coming_soon', 'out_of_stock')),
    image_url TEXT,
    features TEXT[] DEFAULT '{}',
    specs JSONB DEFAULT '{}'::jsonb,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Store Orders Table
CREATE TABLE IF NOT EXISTS public.store_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(50),
    shipping_address TEXT,
    items JSONB NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending_confirmation' CHECK (status IN ('pending_confirmation', 'confirmed', 'dispatched', 'delivered', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Service Requests (Customer Dashboard) Table
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    budget VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Reviewed', 'Discussion', 'Proposal', 'In Development', 'Testing', 'Completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. AWIE Users Table (Dedicated Registrations for AWIE Store and Products)
CREATE TABLE IF NOT EXISTS public.awie_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'customer',
    phone VARCHAR(50),
    platform VARCHAR(100) DEFAULT 'AWIE Store and Products',
    is_verified BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. User Profiles Table (Unified AWIE Account)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    provider VARCHAR(50) DEFAULT 'email' CHECK (provider IN ('email', 'google')),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. OTP Verifications Table (6-digit Email Verification)
CREATE TABLE IF NOT EXISTS public.otp_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    purpose VARCHAR(50) DEFAULT 'signup' CHECK (purpose IN ('signup', 'login')),
    name VARCHAR(255),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_store_orders_email ON public.store_orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_service_requests_user ON public.service_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_awie_users_email ON public.awie_users(email);
CREATE INDEX IF NOT EXISTS idx_awie_users_auth_id ON public.awie_users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_otp_verifications_email ON public.otp_verifications(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awie_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Grant Permissions to Roles
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- Allow public inserts for contact messages & store orders
CREATE POLICY "Allow public contact message submissions" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public store orders submissions" ON public.store_orders FOR INSERT WITH CHECK (true);

-- Allow public read access to projects and products
CREATE POLICY "Allow public read access to projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);

-- AWIE Users, Profiles & OTP policies
CREATE POLICY "Allow public read of awie_users" ON public.awie_users FOR SELECT USING (true);
CREATE POLICY "Allow upsert of awie_users" ON public.awie_users FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read of profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow upsert of profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow otp verifications access" ON public.otp_verifications FOR ALL USING (true) WITH CHECK (true);
