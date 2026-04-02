import type { NextConfig } from "next";
import { defaultLocale } from "./src/lib/i18n";

const nextConfig: NextConfig = {
  /**
   * standalone: انسخ بعد البناء مجلد `.next/static` إلى `.next/standalone/.next/static`
   * ومجلد `public` بجانب standalone وإلا تظهر ChunkLoadError (404 على `/_next/static/chunks/*`).
   */
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
