import type { Locale } from "@/lib/i18n";
import { getSiteUrl, SITE_NAME, SITE_NAME_AR } from "@/lib/site";
import { serviceSlugs } from "@/lib/service-details";

const ORG_ID = () => `${getSiteUrl()}/#organization`;
const LOCAL_ID = () => `${getSiteUrl()}/#localbusiness`;
const WEBSITE_ID = () => `${getSiteUrl()}/#website`;

export type JsonLdGraph = Record<string, unknown>;

/** Organization + LocalBusiness (Aleppo) + Service offers for Rich Results */
export function buildHomeJsonLd(locale: Locale): { "@context": string; "@graph": JsonLdGraph[] } {
  const base = getSiteUrl();
  const name = locale === "ar" ? SITE_NAME_AR : SITE_NAME;
  const description =
    locale === "ar"
      ? "شركة حلول رقمية وبرمجيات في حلب، سوريا: تطوير ويب، تطبيقات موبايل، هوية بصرية، وتحول رقمي للشركات في سوريا والمنطقة."
      : "Digital solutions and software development company in Aleppo, Syria: web & mobile apps, branding, and digital transformation for Syrian and regional businesses.";

  const organization: JsonLdGraph = {
    "@type": "Organization",
    "@id": ORG_ID(),
    name,
    alternateName: locale === "ar" ? SITE_NAME : SITE_NAME_AR,
    url: base,
    logo: `${base}/hive_logo_new_dark.png`,
    description,
    sameAs: [] as string[],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Aleppo",
      addressRegion: "Aleppo Governorate",
      addressCountry: "SY",
    },
  };

  const localBusiness: JsonLdGraph = {
    "@type": "ProfessionalService",
    "@id": LOCAL_ID(),
    name,
    image: `${base}/hive_logo_new_dark.png`,
    url: `${base}/${locale}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Aleppo",
      addressLocality: "Aleppo",
      addressCountry: "SY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.2021,
      longitude: 37.1343,
    },
    areaServed: [
      { "@type": "Country", name: "Syria" },
      { "@type": "AdministrativeArea", name: "Aleppo" },
    ],
    inLanguage: locale === "ar" ? "ar" : "en",
    parentOrganization: { "@id": ORG_ID() },
  };

  const website: JsonLdGraph = {
    "@type": "WebSite",
    "@id": WEBSITE_ID(),
    url: base,
    name,
    alternateName: locale === "ar" ? SITE_NAME : SITE_NAME_AR,
    inLanguage: ["ar", "en"],
    publisher: { "@id": ORG_ID() },
  };

  const services: JsonLdGraph[] = serviceSlugs.map((slug) => ({
    "@type": "Service",
    "@id": `${base}/${locale}/services/${slug}#service`,
    name: serviceNameLabel(slug, locale),
    serviceType: "SoftwareDevelopment",
    provider: { "@id": ORG_ID() },
    areaServed: "SY",
    url: `${base}/${locale}/services/${slug}`,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, localBusiness, ...services],
  };
}

function serviceNameLabel(slug: string, locale: Locale): string {
  const labels: Record<string, { en: string; ar: string }> = {
    "web-apps": { en: "Web application development", ar: "تطوير تطبيقات الويب" },
    "mobile-apps": { en: "Mobile app development", ar: "تطوير تطبيقات الموبايل" },
    "desktop-apps": { en: "Desktop software development", ar: "تطوير برامج سطح المكتب" },
    "visual-identity": { en: "Visual identity & branding", ar: "الهوية البصرية والعلامة" },
    "social-media": { en: "Social media management", ar: "إدارة السوشيال ميديا" },
    "office-solutions": { en: "Office automation & internal systems", ar: "أتمتة مكتبية وأنظمة داخلية" },
    "google-maps": { en: "Google Maps & local SEO", ar: "خرائط Google وتحسين الظهور المحلي" },
  };
  const row = labels[slug];
  if (!row) return slug;
  return locale === "ar" ? row.ar : row.en;
}
