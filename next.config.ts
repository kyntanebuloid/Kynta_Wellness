import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/hospitality", destination: "/for-hospitality", permanent: true },
      { source: "/partnership", destination: "/partner", permanent: true },
    ];
  },
};

export default nextConfig;
