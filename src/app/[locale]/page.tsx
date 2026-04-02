import nextDynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { SectionDivider } from "@/components/landing/SectionDivider";
import { SiteNav } from "@/components/landing/SiteNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { buildHomeJsonLd } from "@/lib/seo-jsonld";

const AboutSection = nextDynamic(() =>
  import("@/components/landing/AboutSection").then((m) => ({
    default: m.AboutSection,
  })),
);
const VisionSection = nextDynamic(() =>
  import("@/components/landing/VisionSection").then((m) => ({
    default: m.VisionSection,
  })),
);
const ServicesSection = nextDynamic(() =>
  import("@/components/landing/ServicesSection").then((m) => ({
    default: m.ServicesSection,
  })),
);
const PackagesSection = nextDynamic(() =>
  import("@/components/landing/PackagesSection").then((m) => ({
    default: m.PackagesSection,
  })),
);
const ContactSection = nextDynamic(() =>
  import("@/components/landing/ContactSection").then((m) => ({
    default: m.ContactSection,
  })),
);
const SiteFooter = nextDynamic(() =>
  import("@/components/landing/SiteFooter").then((m) => ({
    default: m.SiteFooter,
  })),
);

export const dynamic = "force-static";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHome({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getMessages(locale);

  return (
    <>
      <JsonLd data={buildHomeJsonLd(locale)} />
      <SiteNav locale={locale} t={t} />
      <main>
        <HeroSection t={t.hero} />
        <SectionDivider />
        <AboutSection t={t.about} locale={locale} />
        <SectionDivider />
        <VisionSection t={t.vision} />
        <SectionDivider />
        <ServicesSection locale={locale} t={t.services} />
        <SectionDivider />
        <PackagesSection locale={locale} t={t.packages} />
        <SectionDivider />
        <ContactSection
          locale={locale}
          contact={t.contact}
          serviceTitles={t.services.items.map((item) => item.title)}
        />
      </main>
      <SectionDivider />
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
