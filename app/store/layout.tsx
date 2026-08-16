import React from 'react';
import StoreHeader from '@/components/store/StoreHeader';
import StoreFooter from '@/components/store/StoreFooter';

export const metadata = {
  title: 'AWIE Store | Microcontrollers, Sensors & Electronics Kits',
  description: 'Shop genuine development boards, sensors, display modules, motor drivers, and electronics kits at AWIE Store.',
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <StoreHeader />
      <main className="flex-1">{children}</main>
      <StoreFooter />
    </div>
  );
}
