import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev-mode indicator badge from the browser
  devIndicators: false,
  images: {
    domains: [
      'res.cloudinary.com',
      'rlcugpexkehndzyecjev.supabase.co',
      'lh3.googleusercontent.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rlcugpexkehndzyecjev.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
    imageSizes: [16, 32, 48, 64, 96, 112, 128, 256, 384],
  },
};

export default nextConfig;
