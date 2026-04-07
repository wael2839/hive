import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteNav } from "@/components/landing/SiteNav";
import { getMessages, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildLocalePageMetadata } from "@/lib/seo-metadata";
import { getServiceDetail, isServiceSlug, serviceSlugs } from "@/lib/service-details";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-static";

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
  const t = getMessages(locale);
  const detail = getServiceDetail(rawSlug, locale);
  const stepsCount = detail.steps.length;

  return (
    <>
      <SiteNav locale={locale} t={t} />
      <main className="border-t border-hive-border-subtle bg-[var(--hive-bg)] text-[var(--hive-fg)]">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-65">
            <div className="absolute -start-28 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--hive-gold)_28%,transparent)_0%,transparent_68%)] blur-2xl" />
            <div className="absolute -end-20 bottom-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--hive-gold-light)_22%,transparent)_0%,transparent_70%)] blur-2xl" />
          </div>
          <div className="relative mx-auto grid w-full max-w-[1220px] gap-8 px-4 pb-16 pt-[calc(var(--header-height,72px)+2.2rem)] sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.38fr)] lg:gap-10 lg:px-8 lg:pb-20">
            <section className="rounded-3xl border border-hive-border bg-[color-mix(in_srgb,var(--hive-card-glass)_85%,transparent)] p-5 backdrop-blur-sm sm:p-7 lg:p-9">
              <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[color-mix(in_srgb,var(--hive-fg)_72%,transparent)] sm:text-sm">
                <span className="rounded-full border border-hive-border-subtle bg-[var(--hive-pill-bg)] px-3 py-1">
                  {t.serviceDetail.breadcrumbLabel}
                </span>
                <span aria-hidden>•</span>
                <Link
                  href={`/${locale}#services`}
                  className="underline-offset-4 transition hover:text-[var(--hive-gold)] hover:underline"
                >
                  {t.serviceDetail.breadcrumbBack}
                </Link>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--hive-gold)]">{t.serviceDetail.sectionKicker}</p>
              <h1 className="mt-3 text-balance text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {detail.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[color-mix(in_srgb,var(--hive-fg)_90%,transparent)] sm:text-lg">
                {detail.lead}
              </p>
              <div className="mt-8 rounded-2xl border border-hive-border-subtle bg-[var(--hive-pill-bg)] p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--hive-gold)]">
                  {t.serviceDetail.importanceTitle}
                </p>
                <p className="mt-2 text-sm leading-8 text-[color-mix(in_srgb,var(--hive-fg)_90%,transparent)] sm:text-base">
                  {detail.importance}
                </p>
              </div>
            </section>
            <aside className="lg:sticky lg:top-[calc(var(--header-height,72px)+1.5rem)] lg:self-start">
              <div className="rounded-3xl border border-hive-border bg-[color-mix(in_srgb,var(--hive-card-glass)_80%,transparent)] p-5 backdrop-blur-sm sm:p-6">
                <h2 className="text-lg font-bold">{t.serviceDetail.processTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-[color-mix(in_srgb,var(--hive-fg)_82%,transparent)]">
                  {t.serviceDetail.processSubtitle}
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href={`/${locale}#contact`}
                    className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-hive-btn-from to-hive-btn-to px-4 py-3 text-sm font-bold text-neutral-900 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
                  >
                    {t.serviceDetail.primaryCta}
                  </Link>
                  <Link
                    href={`/${locale}#contact`}
                    className="inline-flex items-center justify-center rounded-md border border-hive-border bg-[var(--hive-pill-bg)] px-4 py-3 text-sm font-semibold transition hover:border-[color-mix(in_srgb,var(--hive-gold)_45%,var(--hive-border))] hover:text-[var(--hive-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
                  >
                    {t.serviceDetail.secondaryCta}
                  </Link>
                </div>
                <div className="mt-5 rounded-2xl border border-hive-border-subtle bg-[var(--hive-pill-bg)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--hive-gold)]">
                    {t.serviceDetail.stepsCountLabel}
                  </p>
                  <p className="mt-2 text-2xl font-bold">{stepsCount}</p>
                  <p className="mt-1 text-xs text-[color-mix(in_srgb,var(--hive-fg)_72%,transparent)]">
                    {t.serviceDetail.summaryBody}
                  </p>
                </div>
              </div>
            </aside>
          </div>
          <section className="mx-auto w-full max-w-[1220px] px-4 pb-10 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-extrabold sm:text-3xl">{t.serviceDetail.featuresTitle}</h2>
              <span className="rounded-full border border-hive-border-subtle bg-[var(--hive-pill-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hive-gold)]">
                Core Value
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {detail.highlights.map((item) => (
                <article
                  key={item}
                  className="rounded-2xl border border-hive-border bg-[color-mix(in_srgb,var(--hive-card-glass)_85%,transparent)] p-4 sm:p-5"
                >
                  <p className="text-sm leading-7 text-[color-mix(in_srgb,var(--hive-fg)_92%,transparent)] sm:text-[0.97rem]">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </section>
          <section
            aria-label={t.serviceDetail.timelineLabel}
            className="relative mx-auto w-full max-w-[1220px] px-4 pb-20 sm:px-6 lg:px-8"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-extrabold sm:text-3xl">{t.serviceDetail.differenceTitle}</h2>
              <span className="rounded-full border border-hive-border-subtle bg-[var(--hive-pill-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hive-gold)]">
                {detail.flowLabel}
              </span>
            </div>
            <ol className="relative space-y-4 sm:space-y-5">
              <div
                className="pointer-events-none absolute bottom-4 top-4 w-px bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--hive-gold)_48%,transparent)] to-transparent ms-4 sm:ms-5"
                aria-hidden
              />
              {detail.steps.map((step, idx) => (
                <li key={step.head} className="relative">
                  <article className="ms-9 rounded-2xl border border-hive-border bg-[color-mix(in_srgb,var(--hive-card-glass)_85%,transparent)] p-4 transition hover:border-[color-mix(in_srgb,var(--hive-gold)_38%,var(--hive-border))] sm:ms-11 sm:p-5">
                    <span className="absolute inset-y-0 my-auto ms-[-2.25rem] grid h-7 w-7 place-items-center rounded-full border border-[color-mix(in_srgb,var(--hive-gold)_45%,transparent)] bg-[var(--hive-bg)] text-xs font-extrabold text-[var(--hive-gold)] sm:ms-[-2.75rem] sm:h-8 sm:w-8">
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
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
