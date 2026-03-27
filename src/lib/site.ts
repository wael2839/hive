/**
 * Canonical site URL for metadata, sitemap, and JSON-LD.
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://yourdomain.com) — no trailing slash.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  if (!raw) {
    return "http://localhost:3000";
  }
  return raw.replace(/\/$/, "");
}

export const SITE_NAME = "Hive Digital Solutions";
export const SITE_NAME_AR = "هايڤ للحلول الرقمية";
