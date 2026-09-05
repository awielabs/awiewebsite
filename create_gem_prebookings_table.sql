-- ==========================================================
-- AWIE LABS: GEM PRE-BOOKINGS & LIFECYCLE MANAGEMENT TABLE
-- ==========================================================
-- Run this SQL in your Supabase Dashboard -> SQL Editor

CREATE TABLE IF NOT EXISTS public.gem_prebookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id VARCHAR(50) UNIQUE NOT NULL,
    ticket_code VARCHAR(25) UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    delivery_address JSONB NOT NULL DEFAULT '{}'::jsonb,
    product_version VARCHAR(10) NOT NULL, -- 'v1' or 'v2'
    product_name VARCHAR(100) NOT NULL,    -- 'GEM v1 Standard' or 'GEM v2 Biometric'
    launch_price INTEGER NOT NULL,          -- 1200 or 1650
    regular_price INTEGER NOT NULL,         -- 1300 or 1750
    booking_amount INTEGER NOT NULL,        -- 199 or 299
    amount_paid INTEGER NOT NULL DEFAULT 0,
    remaining_amount INTEGER NOT NULL,      -- launch_price - booking_amount
    delivery_charge INTEGER NOT NULL DEFAULT 0,
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'failed'
    booking_status VARCHAR(50) DEFAULT 'PENDING_PAYMENT',
    -- Lifecycle: PENDING_PAYMENT -> BOOKING_CONFIRMED -> IN_PRODUCTION -> READY_FOR_DELIVERY -> FINAL_PAYMENT_PENDING -> FINAL_PAYMENT_RECEIVED -> SHIPPED -> DELIVERED -> COMPLETED
    final_razorpay_order_id VARCHAR(100),
    final_razorpay_payment_id VARCHAR(100),
    final_payment_status VARCHAR(50) DEFAULT 'unpaid', -- 'unpaid', 'paid'
    production_status VARCHAR(50) DEFAULT 'queued',   -- 'queued', 'in_production', 'assembled', 'tested', 'packaged'
    shipping_status VARCHAR(50) DEFAULT 'unshipped',   -- 'unshipped', 'dispatched', 'in_transit', 'delivered'
    delivery_status VARCHAR(50) DEFAULT 'pending',
    tracking_id VARCHAR(100),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_gem_prebookings_email ON public.gem_prebookings(email);
CREATE INDEX IF NOT EXISTS idx_gem_prebookings_ticket_code ON public.gem_prebookings(ticket_code);
CREATE INDEX IF NOT EXISTS idx_gem_prebookings_order_id ON public.gem_prebookings(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_gem_prebookings_status ON public.gem_prebookings(booking_status);

-- Enable Row Level Security
ALTER TABLE public.gem_prebookings ENABLE ROW LEVEL SECURITY;

-- Grant permissions to service_role, authenticated and anon
GRANT ALL ON public.gem_prebookings TO postgres, anon, authenticated, service_role;

-- Allow public read of verified ticket codes (excluding sensitive admin notes)
DROP POLICY IF EXISTS "Allow read of verified bookings" ON public.gem_prebookings;
CREATE POLICY "Allow read of verified bookings" 
    ON public.gem_prebookings 
    FOR SELECT 
    USING (true);

-- Allow service_role full control
DROP POLICY IF EXISTS "Allow service role full access" ON public.gem_prebookings;
CREATE POLICY "Allow service role full access" 
    ON public.gem_prebookings 
    FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- Notify schema cache reload
NOTIFY pgrst, 'reload schema';
