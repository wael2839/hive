import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { serviceSlugs } from "@/lib/service-details";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${base}/${locale}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    });
    for (const slug of serviceSlugs) {
      entries.push({
        url: `${base}/${locale}/services/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }
  }

  return entries;
}
