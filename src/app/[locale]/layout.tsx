import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentLocale } from "@/components/landing/DocumentLocale";
import { getMessages, isLocale, locales, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = "force-static";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const m = getMessages(raw);
  return {
    title: m.meta.title,
    description: m.meta.description,
    alternates: {
      canonical: `/${raw}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <>
      <DocumentLocale locale={locale} />
      <div
        className={`min-h-screen bg-hive-black ${locale === "ar" ? "font-[family-name:var(--font-noto-arabic)]" : "font-[family-name:var(--font-syne)]"}`}
        dir={locale === "ar" ? "rtl" : "ltr"}
        lang={locale}
      >
        {children}
      </div>
    </>
  );
}
