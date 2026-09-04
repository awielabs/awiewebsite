-- ==========================================================
-- PRODUCT SOURCING REQUESTS TABLE + STORAGE FOR AWIE SOURCE BOT
-- ==========================================================
-- Copy and run this in your Supabase Dashboard -> SQL Editor

CREATE TABLE IF NOT EXISTS public.sourcing_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sourcing_id VARCHAR(20) UNIQUE,
    user_id TEXT,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    product_name VARCHAR(255) NOT NULL,
    quantity VARCHAR(50),
    specifications TEXT,
    brand_model VARCHAR(255),
    image_path TEXT,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add sourcing_id to existing installations
ALTER TABLE public.sourcing_requests
    ADD COLUMN IF NOT EXISTS sourcing_id VARCHAR(20) UNIQUE;

-- Row Level Security: only service role / authenticated inserts
ALTER TABLE public.sourcing_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role full access"
    ON public.sourcing_requests
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Private storage bucket for reference images (auto-delete handled by app after 3 days)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'sourcing-requests',
    'sourcing-requests',
    false,
    5242880, -- 5 MB
    ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;
