import type { NextConfig } from "next";
import { defaultLocale } from "./src/lib/i18n";

const nextConfig: NextConfig = {
  /** للنشر على VPS / Docker: ضع STANDALONE=1 ثم شغّل node .next/standalone/server.js (انظر توثيق Next) */
  ...(process.env.STANDALONE === "1" ? { output: "standalone" as const } : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
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
