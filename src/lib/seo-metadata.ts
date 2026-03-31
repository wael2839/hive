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
  const enPath = swapLocaleInPath(path, "en");
  const arPath = swapLocaleInPath(path, "ar");
  const keywords = buildLocaleKeywords(locale);

  return {
    metadataBase: baseUrl,
    title: opts.title,
    description: opts.description,
    keywords,
    alternates: {
      canonical: path,
      languages: {
        "ar-SY": `${base}${arPath}`,
        en: `${base}${enPath}`,
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

function swapLocaleInPath(path: string, target: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.replace(/^\/(ar|en)(?=\/|$)/, `/${target}`);
}

function buildLocaleKeywords(locale: Locale): string[] {
  if (locale === "ar") {
    return [
      "هايڤ للحلول الرقمية",
      "شركة برمجة في حلب",
      "شركة برمجة في سوريا",
      "تطوير مواقع في حلب",
      "تطوير مواقع في سوريا",
      "تصميم مواقع احترافية",
      "تطوير تطبيقات موبايل",
      "تطوير تطبيقات أندرويد و iOS",
      "برمجة أنظمة مخصصة",
      "حلول رقمية للشركات",
      "تحول رقمي للشركات",
      "خدمات برمجية في حلب",
      "خدمات برمجية في سوريا",
      "تصميم هوية بصرية",
      "إدارة سوشيال ميديا",
      "أتمتة مكتبية للشركات",
      "Google Maps SEO",
      "شركة تقنية في حلب",
      "وكالة رقمية في سوريا",
      "تطوير برمجيات في الشرق الأوسط",
      "software company in Syria",
      "software company in Aleppo",
      "web development Syria",
      "mobile app development Syria",
      "digital agency Aleppo",
    ];
  }

  return [
    "Hive Digital Solutions",
    "software company in Aleppo",
    "software company in Syria",
    "web development Aleppo",
    "web development Syria",
    "mobile app development Syria",
    "mobile app development Aleppo",
    "custom software development",
    "digital transformation services",
    "digital agency in Syria",
    "branding and visual identity",
    "UI UX design agency",
    "ERP workflow automation",
    "office automation solutions",
    "social media management agency",
    "Google Maps SEO services",
    "outsourcing software development MENA",
    "full stack development company",
    "enterprise software solutions",
    "web and mobile development company",
    "شركة برمجة في حلب",
    "شركة برمجة في سوريا",
    "تطوير مواقع في سوريا",
    "تطوير تطبيقات في حلب",
  ];
}
