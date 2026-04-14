import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Blocks,
  Briefcase,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  FileUser,
  Gauge,
  LayoutTemplate,
  Link2,
  MapPinned,
  Monitor,
  Palette,
  PenTool,
  Presentation,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteNav } from "@/components/landing/SiteNav";
import { getMessages, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildLocalePageMetadata } from "@/lib/seo-metadata";
import {
  getServiceDetail,
  isServiceSlug,
  serviceSlugs,
  type ServiceSlug,
} from "../../../../lib/service-details";
import { SectionDivider } from "@/components/landing/SectionDivider";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-static";

const FEATURE_ICON_MAP: Record<ServiceSlug, LucideIcon[]> = {
  "web-apps": [LayoutTemplate, ShieldCheck, Briefcase, LayoutTemplate, Link2],
  "mobile-apps": [Smartphone, Smartphone, ShieldCheck, Gauge],
  "desktop-apps": [LayoutTemplate, ShieldCheck, Monitor, Gauge],
  "visual-identity": [Palette, PenTool, Briefcase, FileText],
  "office-services": [BookOpen, Presentation, FileSpreadsheet, FileText, FileUser, ClipboardCheck],
  "google-maps": [MapPinned, Search, BadgeCheck, BarChart3],
};

function getFeatureIcon(featureText: string, slug: ServiceSlug, itemIndex: number): LucideIcon {
  const mapped = FEATURE_ICON_MAP[slug]?.[itemIndex];
  if (mapped) return mapped;

  const text = featureText.toLowerCase();

  const rules: { icon: LucideIcon; keys: string[] }[] = [
    { icon: FileSpreadsheet, keys: ["excel", "spreadsheet", "محاسبية", "حسابية", "تنظيمية"] },
    { icon: Presentation, keys: ["powerpoint", "presentation", "عروض تقديمية"] },
    { icon: FileUser, keys: ["cv", "resume", "سيرة ذاتية"] },
    { icon: BookOpen, keys: ["research", "thesis", "بحوث", "أطروحات", "تخرج"] },
    { icon: FileText, keys: ["word", "reports", "report", "letters", "رسائل", "تقارير", "تنسيق ملفات"] },
    { icon: ClipboardCheck, keys: ["delivery", "printing", "جاهز للطباعة", "تسليم", "ready for"] },
    { icon: MapPinned, keys: ["google maps", "maps", "map", "profile setup", "خرائط", "ملف google"] },
    { icon: Search, keys: ["seo", "visibility", "local", "keywords", "الظهور", "التصنيفات", "محلي"] },
    { icon: BadgeCheck, keys: ["review", "reviews", "ratings", "تقييمات", "المصداقية", "trust"] },
    { icon: BarChart3, keys: ["tracking", "monitoring", "performance", "kpi", "تقارير", "متابعة", "تحسين"] },
    { icon: LayoutTemplate, keys: ["responsive", "ux", "ui", "interface", "متجاوب", "واجهة", "واجهات", "لوحات"] },
    { icon: Smartphone, keys: ["ios", "android", "mobile", "الموبايل", "الجوال"] },
    { icon: ShieldCheck, keys: ["secure", "security", "auth", "login", "أمن", "آمن", "صلاحيات"] },
    { icon: Link2, keys: ["integration", "integrations", "api", "connect", "ربط", "تكامل"] },
    { icon: Monitor, keys: ["desktop", "operational", "internal", "سطح المكتب", "داخلي", "تشغيلية"] },
    { icon: Palette, keys: ["logo", "visual", "branding", "brand", "typography", "هوية", "شعار", "بصري"] },
    { icon: Briefcase, keys: ["business", "marketing", "commercial", "أعمال", "تجارية"] },
    { icon: Gauge, keys: ["speed", "fast", "scalable", "architecture", "سرعة", "أداء", "قابلة للتوسع"] },
    { icon: Users, keys: ["team", "users", "clients", "عملاء", "فريق", "مستخدمين"] },
  ];

  for (const rule of rules) {
    if (rule.keys.some((key) => text.includes(key))) return rule.icon;
  }

  return Blocks;
}

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug: rawSlug } = await params;
  if (!isLocale(rawLocale) || !isServiceSlug(rawSlug)) return {};
  const locale = rawLocale as Locale;
  const detail = getServiceDetail(rawSlug, locale);
  return buildLocalePageMetadata(locale, {
    title: detail.title,
    description: detail.lead,
    path: `/${locale}/services/${rawSlug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale: rawLocale, slug: rawSlug } = await params;
  if (!isLocale(rawLocale) || !isServiceSlug(rawSlug)) notFound();

  const locale = rawLocale as Locale;
  const slug = rawSlug as ServiceSlug;
  const t = getMessages(locale);
  const detail = getServiceDetail(slug, locale);

  return (
    <>
      <SiteNav locale={locale} t={t} />
      <main className="border-t border-hive-border-subtle bg-[var(--hive-bg)] text-[var(--hive-fg)]">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-65">
            <div className="absolute -start-28 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--hive-gold-light)_28%,transparent)_0%,transparent_68%)] blur-2xl" />
            <div className="absolute -end-20 bottom-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--hive-gold-light)_22%,transparent)_0%,transparent_70%)] blur-2xl" />
          </div>
          
          <div className="relative mx-auto grid w-full max-w-[1220px] gap-8 px-4 pb-10 pt-[calc(var(--header-height,72px)+2.2rem)] sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.38fr)] lg:gap-10 lg:px-8 lg:pb-10">
          
            <section className="relative rounded-3xl border border-hive-border bg-[color-mix(in_srgb,var(--hive-card-glass)_85%,transparent)] p-5 backdrop-blur-sm sm:p-7 lg:p-9">
            {/* <Link
                  href={`/${locale}#services`}
                  className="absolute -top-[25px] start-[25px] underline-offset-4 transition hover:text-[var(--hive-gold-light)] hover:underline"
                >
                  {t.serviceDetail.breadcrumbBack}
                </Link> */}
              <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[color-mix(in_srgb,var(--hive-fg)_72%,transparent)] sm:text-sm">
                
                
              </div>
              <h1 className="mt-1 text-hive-gold-light text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {detail.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[color-mix(in_srgb,var(--hive-fg)_90%,transparent)] sm:text-lg">
                {detail.lead}
              </p>
              <div className="mt-8 rounded-2xl border border-hive-border-subtle bg-[var(--hive-pill-bg)] p-4 sm:p-5">
                {/* <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--hive-gold-light)]">
                  {t.serviceDetail.importanceTitle}
                </p> */}
                <p className="mt-2 text-sm leading-8 text-[color-mix(in_srgb,var(--hive-fg)_90%,transparent)] sm:text-base">
                  {detail.importance}
                </p>
              </div>
            </section>
            <aside className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-hive-border bg-[color-mix(in_srgb,var(--hive-card-glass)_80%,transparent)] p-5 backdrop-blur-sm sm:p-6">
                <div className="space-y-3">
                  <h2 className="text-lg font-bold">{t.serviceDetail.processTitle}</h2>
                  <p className="text-sm leading-7 text-[color-mix(in_srgb,var(--hive-fg)_82%,transparent)]">
                    {t.serviceDetail.processSubtitle}
                  </p>
                </div>
                <div className="mt-auto flex flex-col gap-3 pt-6">
                  <Link
                    href={`/${locale}#contact`}
                    className="inline-flex items-center justify-center rounded-md bg-hive-gold-light px-4 py-3 text-sm font-bold text-neutral-900 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold-light"
                  >
                    {t.serviceDetail.primaryCta}
                  </Link>
                  <Link
                    href={`/${locale}#contact`}
                    className="inline-flex items-center justify-center rounded-md border border-hive-border bg-[var(--hive-pill-bg)] px-4 py-3 text-sm font-semibold transition hover:border-[color-mix(in_srgb,var(--hive-gold-light)_45%,var(--hive-border))] hover:text-[var(--hive-gold-light)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold-light"
                  >
                    {t.serviceDetail.secondaryCta}
                  </Link>
                </div>
               
              </div>
            </aside>
          </div>
          <section className="mx-auto w-full max-w-[1220px] px-4 pb-10 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-extrabold sm:text-3xl">{t.serviceDetail.featuresTitle}</h2>
            
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {detail.highlights.map((item, itemIndex) => {
                const Icon = getFeatureIcon(item, slug, itemIndex);
                return (
                  <article key={item} className="rounded-2xl border border-hive-border bg-[color-mix(in_srgb,var(--hive-card-glass)_85%,transparent)] p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[color-mix(in_srgb,var(--hive-gold-light)_45%,transparent)] bg-[color-mix(in_srgb,var(--hive-gold-light)_14%,transparent)] text-[var(--hive-gold-light)]">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <p className="text-sm leading-10 text-[color-mix(in_srgb,var(--hive-fg)_92%,transparent)] sm:text-[0.97rem]">
                        {item}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
          <section
            aria-label={t.serviceDetail.timelineLabel}
            className="relative mx-auto w-full max-w-[1220px] px-4 pb-20 sm:px-6 lg:px-8"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-extrabold sm:text-3xl">{t.serviceDetail.differenceTitle}</h2>
              
            </div>
            <ol className="relative space-y-4 sm:space-y-5">
              {/* <div
                className="pointer-events-none absolute  bottom-[30px] top-[50px] w- bg-hive-gold-light ms-4 sm:ms-5"
                aria-hidden
              /> */}
              {detail.steps.map((step, idx) => (
                <li key={step.head} className="relative">
                  <article className="rounded-2xl border border-hive-border bg-[color-mix(in_srgb,var(--hive-card-glass)_85%,transparent)] p-4 transition hover:border-[color-mix(in_srgb,var(--hive-gold-light)_38%,var(--hive-border))] ms-4 sm:ms-5 sm:p-5">
                    <span className="absolute inset-y-0 my-auto ms-[-2.25rem] grid h-7 w-7 place-items-center rounded-full border border-[color-mix(in_srgb,var(--hive-gold-light)_60%,transparent)] bg-[linear-gradient(135deg,var(--hive-gold-light)_0%,#d8be63_55%,#a4862e_100%)] text-xs font-extrabold text-neutral-900 shadow-[0_0_0_3px_var(--hive-bg)] sm:ms-[-2.75rem] sm:h-8 sm:w-8">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-[var(--hive-gold-light)] sm:text-lg">{step.head}</h3>
                    <p className="mt-2 text-sm leading-7 text-[color-mix(in_srgb,var(--hive-fg)_90%,transparent)] sm:text-[0.97rem]">
                      {step.text}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
      <SectionDivider/>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
