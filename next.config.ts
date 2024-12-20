import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/todos',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
