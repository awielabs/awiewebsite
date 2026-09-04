'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { encryptSession, decryptSession, sanitizeConsole } from '@/lib/authCrypto';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider: 'google' | 'email';
  lastActive: number;
}

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes inactivity timeout
const STORAGE_KEY = 'awie_user_session';

// Helper to save user profile into Supabase public.profiles and awie_users table
async function syncProfileToSupabase(user: UserSession) {
  if (!user.email) return;
  try {
    await supabase.from('awie_users').upsert(
      {
        auth_user_id: user.id,
        email: user.email,
        name: user.name,
        role: 'customer',
        platform: 'AWIE Store and Products',
        is_verified: true,
        last_login: new Date().toISOString(),
      },
      { onConflict: 'email' }
    );
  } catch {
    // Ignore
  }

  try {
    await supabase.from('profiles').upsert(
      {
        email: user.email,
        full_name: user.name,
        avatar_url: user.avatarUrl,
        provider: user.provider,
        is_verified: true,
        last_login: new Date().toISOString(),
      },
      { onConflict: 'email' }
    );
  } catch {
    // Ignore network sync errors
  }
}

export function useAuthSession() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Sanitize web console to protect PII
  useEffect(() => {
    sanitizeConsole();
  }, []);

  // Update activity timestamp
  const refreshActivity = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = decryptSession(stored);
      if (parsed) {
        parsed.lastActive = Date.now();
        localStorage.setItem(STORAGE_KEY, encryptSession(parsed));
        setUser(parsed);
      }
    }
  }, []);

  // Logout helper
  const logout = useCallback(async (reason: 'manual' | 'timeout' = 'manual') => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    if (reason === 'timeout') {
      window.location.href = '/login?timeout=true';
    } else {
      window.location.href = '/login';
    }
  }, []);

  // Sync Supabase Auth & Local Session
  useEffect(() => {
    const initSession = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = decryptSession(stored);
        if (parsed) {
          // Check if session already expired (30 mins)
          if (Date.now() - parsed.lastActive > SESSION_TIMEOUT_MS) {
            logout('timeout');
            setLoading(false);
            return;
          }
          // Re-encrypt if was previously stored as plaintext
          localStorage.setItem(STORAGE_KEY, encryptSession(parsed));
          setUser(parsed);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // Supabase listener for Google & OAuth sign-ins
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user && event === 'SIGNED_IN') {
          // If returning on the login page, the login page itself will validate database account existence
          const isLoginPage = typeof window !== 'undefined' && (
            window.location.pathname === '/login' ||
            window.location.search.includes('mode=login')
          );
          if (isLoginPage) {
            return;
          }

          const newUser: UserSession = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'AWIE Member',
            avatarUrl: session.user.user_metadata?.avatar_url,
            provider: session.user.app_metadata?.provider === 'google' ? 'google' : 'email',
            lastActive: Date.now()
          };

          await syncProfileToSupabase(newUser);
          localStorage.setItem(STORAGE_KEY, encryptSession(newUser));
          setUser(newUser);
        }
      });

      setLoading(false);
      return () => subscription.unsubscribe();
    };

    initSession();
  }, [logout]);

  // Track user activity & enforce 30 min session timeout
  useEffect(() => {
    if (!user) return;

    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    
    let throttleTimer: NodeJS.Timeout | null = null;
    const handleActivity = () => {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          refreshActivity();
          throttleTimer = null;
        }, 5000); // throttle activity updates to max once per 5 seconds
      }
    };

    activityEvents.forEach((ev) => window.addEventListener(ev, handleActivity));

    // Check timeout every 15 seconds
    const interval = setInterval(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = decryptSession(stored);
        if (!parsed || Date.now() - parsed.lastActive > SESSION_TIMEOUT_MS) {
          logout('timeout');
        }
      }
    }, 15000);

    return () => {
      activityEvents.forEach((ev) => window.removeEventListener(ev, handleActivity));
      clearInterval(interval);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [user, refreshActivity, logout]);

  // Google Sign In / Sign Up helper
  const signInWithGoogle = async (mode: 'login' | 'signup' = 'login') => {
    try {
      const redirectUrl = `${window.location.origin}/${mode === 'signup' ? 'signup' : 'login'}?google_auth=1&mode=${mode}`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          }
        }
      });

      return { data, error };
    } catch (err) {
      return { error: err };
    }
  };

  return {
    user,
    loading,
    logout,
    signInWithGoogle,
    refreshActivity
  };
}

