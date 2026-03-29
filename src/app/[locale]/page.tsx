import { notFound } from "next/navigation";
import { AboutSection } from "@/components/landing/AboutSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PackagesSection } from "@/components/landing/PackagesSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteNav } from "@/components/landing/SiteNav";
import { VisionSection } from "@/components/landing/VisionSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { buildHomeJsonLd } from "@/lib/seo-jsonld";

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
        <AboutSection t={t.about} />
        <VisionSection t={t.vision} />
        <ServicesSection locale={locale} t={t.services} />
        <PackagesSection locale={locale} t={t.packages} />
        <ContactSection
          locale={locale}
          contact={t.contact}
          serviceTitles={t.services.items.map((item) => item.title)}
        />
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
