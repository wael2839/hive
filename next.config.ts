import type { NextConfig } from "next";
import { defaultLocale } from "./src/lib/i18n";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: `/${defaultLocale}`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
