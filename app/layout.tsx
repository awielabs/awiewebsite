import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/layout/CustomCursor';
import ParticleBackground from '@/components/3d/ParticleBackground';
import { CartProvider } from '@/components/store/CartContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'AWIE | Apps • Web • IoT • Electronics',
  description: 'Building premium digital products, embedded systems, IoT platforms, and smart engineering solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <body className="bg-[#0B0F17] text-gray-300 font-sans min-h-screen flex flex-col relative overflow-x-hidden selection:bg-[#2563EB] selection:text-white">
        <CartProvider>
          <CustomCursor />
          <ParticleBackground />
          <div className="bg-grid-pattern" />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
