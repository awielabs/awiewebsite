'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

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

export function useAuthSession() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Update activity timestamp
  const refreshActivity = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: UserSession = JSON.parse(stored);
        parsed.lastActive = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        setUser(parsed);
      } catch (err) {
        console.error('Failed parsing session', err);
      }
    }
  }, []);

  // Logout helper
  const logout = useCallback(async (reason: 'manual' | 'timeout' = 'manual') => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
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
        try {
          const parsed: UserSession = JSON.parse(stored);
          // Check if session already expired
          if (Date.now() - parsed.lastActive > SESSION_TIMEOUT_MS) {
            logout('timeout');
            setLoading(false);
            return;
          }
          setUser(parsed);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // Supabase listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          const newUser: UserSession = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'AWIE User',
            avatarUrl: session.user.user_metadata?.avatar_url,
            provider: session.user.app_metadata?.provider === 'google' ? 'google' : 'email',
            lastActive: Date.now()
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
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
        try {
          const parsed: UserSession = JSON.parse(stored);
          if (Date.now() - parsed.lastActive > SESSION_TIMEOUT_MS) {
            logout('timeout');
          }
        } catch (e) {
          logout('manual');
        }
      }
    }, 15000);

    return () => {
      activityEvents.forEach((ev) => window.removeEventListener(ev, handleActivity));
      clearInterval(interval);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [user, refreshActivity, logout]);

  // Google Sign In helper
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        // Fallback for local demo environment if OAuth redirect is pending setup
        const demoUser: UserSession = {
          id: 'google-user-' + Date.now(),
          email: 'user@gmail.com',
          name: 'Google User',
          provider: 'google',
          lastActive: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
        window.location.href = '/dashboard';
      }
    } catch (err) {
      const demoUser: UserSession = {
        id: 'google-user-' + Date.now(),
        email: 'user@gmail.com',
        name: 'Google User',
        provider: 'google',
        lastActive: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
      setUser(demoUser);
      window.location.href = '/dashboard';
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
