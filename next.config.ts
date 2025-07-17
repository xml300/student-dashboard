import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // Use `true` for permanent 308 redirects
      },
    ];
  },
};

export default nextConfig;
