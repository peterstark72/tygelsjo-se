import type { NextConfig } from "next";


const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        'hostname': 'bcdn.se',
      }
    ],
  }
}

export default nextConfig;
