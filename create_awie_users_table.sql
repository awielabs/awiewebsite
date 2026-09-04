-- ==========================================================
-- DEDICATED USER REGISTRATION TABLE FOR AWIE STORE & PRODUCTS
-- ==========================================================
-- Copy and run this in your Supabase Dashboard -> SQL Editor

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

-- Indexes for fast email lookups
CREATE INDEX IF NOT EXISTS idx_awie_users_email ON public.awie_users(email);
CREATE INDEX IF NOT EXISTS idx_awie_users_auth_id ON public.awie_users(auth_user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.awie_users ENABLE ROW LEVEL SECURITY;

-- Grant access to service_role, authenticated and anon
GRANT ALL ON public.awie_users TO postgres, anon, authenticated, service_role;

-- Policies for viewing and registering accounts
DROP POLICY IF EXISTS "Allow read of awie_users" ON public.awie_users;
CREATE POLICY "Allow read of awie_users" ON public.awie_users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow upsert of awie_users" ON public.awie_users;
CREATE POLICY "Allow upsert of awie_users" ON public.awie_users FOR ALL USING (true) WITH CHECK (true);

-- Reload PostgREST schema cache immediately
NOTIFY pgrst, 'reload schema';
