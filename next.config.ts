import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // This skips ESLint checks during the build
  },
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"http",
        hostname:"**",
        pathname:"**",
      },
      {
        protocol:"https",
        hostname:"**",
        pathname:"**",
      }
    ]
  }
};

export default nextConfig;
