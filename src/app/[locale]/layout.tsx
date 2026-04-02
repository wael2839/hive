import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentLocale } from "@/components/landing/DocumentLocale";
import { getMessages, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildLocalePageMetadata, localeTitleTemplate } from "@/lib/seo-metadata";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** توليد ثابت بالكامل عند البناء (SSG). لتحديث المحتوى أعد البناء والنشر. */
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
  const locale = raw as Locale;
  const m = getMessages(locale);
  const base = buildLocalePageMetadata(locale, {
    title: m.meta.title,
    description: m.meta.description,
    path: `/${locale}`,
  });
  return {
    ...base,
    title: {
      default: m.meta.title,
      template: localeTitleTemplate(locale),
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
        className="min-h-screen bg-hive-black font-[family-name:var(--font-ubuntu-arabic)]"
        dir={locale === "ar" ? "rtl" : "ltr"}
        lang={locale}
      >
        {children}
      </div>
    </>
  );
}
