import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-awie-store.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // PKCE flow: OAuth callback returns ?code= on the full redirect URL
    flowType: 'pkce',
    // We exchange the code explicitly on the login/signup pages only —
    // never let the client silently consume it on other pages (OTP enforcement)
    detectSessionInUrl: false,
    persistSession: true,
    autoRefreshToken: true,
  },
});
