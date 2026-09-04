import type { Metadata } from 'next';
import { Poppins, Outfit } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/layout/CustomCursor';
import ParticleBackground from '@/components/3d/ParticleBackground';
import { CartProvider } from '@/components/store/CartContext';
import MobileDesktopBanner from '@/components/MobileDesktopBanner';
import PagePreloader from '@/components/layout/PagePreloader';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'AWIE',
  description: 'Building premium digital products, embedded systems, IoT platforms, and smart engineering solutions.',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.jpeg', type: 'image/jpeg' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${outfit.variable} dark scroll-smooth`}>
      <body className={`${poppins.className} bg-[#0B0F17] text-gray-300 font-sans min-h-screen flex flex-col relative overflow-x-hidden selection:bg-[#2563EB] selection:text-white`}>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <CartProvider>
          <PagePreloader />
          <CustomCursor />
          <ParticleBackground />
          <div className="bg-grid-pattern" />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <MobileDesktopBanner />
        </CartProvider>
      </body>
    </html>
  );
}

