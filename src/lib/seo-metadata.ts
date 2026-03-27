import type { Metadata } from "next";
import { getSiteUrl, SITE_NAME, SITE_NAME_AR } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/**
 * Shared metadata for `[locale]` routes: canonical, hreflang-style alternates, Open Graph.
 * `path` is pathname only, e.g. `/en` or `/en/services/web-apps`
 */
export function buildLocalePageMetadata(
  locale: Locale,
  opts: { title: string; description: string; path: string }
): Metadata {
  const base = getSiteUrl();
  const baseUrl = new URL(base);
  const path = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const url = `${base}${path}`;

  return {
    metadataBase: baseUrl,
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: path,
      languages: {
        "ar-SY": `${base}/ar`,
        en: `${base}/en`,
        "x-default": `${base}/ar`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SY" : "en_US",
      url,
      siteName: locale === "ar" ? SITE_NAME_AR : SITE_NAME,
      title: opts.title,
      description: opts.description,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function localeTitleTemplate(locale: Locale): string {
  return locale === "ar" ? "%s | هايڤ للحلول الرقمية" : "%s | Hive Digital Solutions";
}
