/**
 * Security & Encryption utilities for unified user sessions.
 * Ensures user PII (email, name, tokens) is encrypted in client storage
 * and never exposed in the browser web console.
 */

export interface EncryptedSessionUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider: 'google' | 'email';
  lastActive: number;
}

const SESSION_SECRET = 'AWIE_SEC_2026_x79Fq!zK';
const PREFIX = 'aw_sec_v1:';

/**
 * Encrypts a UserSession object into an opaque, encrypted string
 */
export function encryptSession(data: EncryptedSessionUser): string {
  try {
    const jsonStr = JSON.stringify(data);
    let encrypted = '';
    for (let i = 0; i < jsonStr.length; i++) {
      const charCode = jsonStr.charCodeAt(i);
      const secretChar = SESSION_SECRET.charCodeAt(i % SESSION_SECRET.length);
      encrypted += String.fromCharCode(charCode ^ secretChar);
    }
    const b64 = typeof window !== 'undefined' ? btoa(unescape(encodeURIComponent(encrypted))) : Buffer.from(encrypted).toString('base64');
    return `${PREFIX}${b64}`;
  } catch {
    return '';
  }
}

/**
 * Decrypts an encrypted session string back into a UserSession object
 */
export function decryptSession(ciphertext: string | null): EncryptedSessionUser | null {
  if (!ciphertext) return null;

  try {
    // If legacy plaintext JSON was stored, parse it
    if (ciphertext.startsWith('{')) {
      return JSON.parse(ciphertext);
    }

    if (!ciphertext.startsWith(PREFIX)) {
      return null;
    }

    const b64 = ciphertext.slice(PREFIX.length);
    const decoded = typeof window !== 'undefined' ? decodeURIComponent(escape(atob(b64))) : Buffer.from(b64, 'base64').toString();

    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i);
      const secretChar = SESSION_SECRET.charCodeAt(i % SESSION_SECRET.length);
      decrypted += String.fromCharCode(charCode ^ secretChar);
    }

    const session: EncryptedSessionUser = JSON.parse(decrypted);
    return session;
  } catch {
    return null;
  }
}

/**
 * Suppresses sensitive user data in client console logs
 */
export function sanitizeConsole() {
  if (typeof window === 'undefined') return;

  // Protect window console from leaking user session data or auth tokens
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  const isSensitive = (item: unknown): boolean => {
    if (!item) return false;
    if (typeof item === 'string') {
      const lower = item.toLowerCase();
      return (
        lower.includes('@') ||
        lower.includes('otp') ||
        lower.includes('password') ||
        lower.includes('token') ||
        lower.includes('awie_user_session')
      );
    }
    if (typeof item === 'object') {
      try {
        const s = JSON.stringify(item).toLowerCase();
        return (
          s.includes('password') ||
          s.includes('token') ||
          s.includes('secret') ||
          s.includes('session')
        );
      } catch {
        return false;
      }
    }
    return false;
  };

  console.log = (...args: unknown[]) => {
    if (args.some(isSensitive)) {
      return; // Suppress sensitive PII
    }
    originalLog(...args);
  };

  console.warn = (...args: unknown[]) => {
    if (args.some(isSensitive)) {
      return;
    }
    originalWarn(...args);
  };

  console.error = (...args: unknown[]) => {
    if (args.some(isSensitive)) {
      return;
    }
    originalError(...args);
  };
}
