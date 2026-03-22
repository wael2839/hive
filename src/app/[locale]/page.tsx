import { notFound } from "next/navigation";
import { AboutSection } from "@/components/landing/AboutSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PackagesSection } from "@/components/landing/PackagesSection";
import { PortfolioSection } from "@/components/landing/PortfolioSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteNav } from "@/components/landing/SiteNav";
import { VisionSection } from "@/components/landing/VisionSection";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

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
      <SiteNav locale={locale} t={t} />
      <main>
        <HeroSection t={t.hero} />
        <AboutSection t={t.about} />
        <ServicesSection t={t.services} />
        <VisionSection t={t.vision} />
        <PackagesSection locale={locale} t={t.packages} />
        <PortfolioSection t={t.portfolio} />
        <ContactSection locale={locale} t={t.contact} />
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
