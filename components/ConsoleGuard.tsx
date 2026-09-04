'use client';

import { useEffect } from 'react';
import { sanitizeConsole } from '@/lib/authCrypto';

export default function ConsoleGuard() {
  useEffect(() => {
    sanitizeConsole();
  }, []);

  return null;
}
