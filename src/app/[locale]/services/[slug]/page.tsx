import { Fragment } from "react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteNav } from "@/components/landing/SiteNav";
import { getMessages, isLocale, locales, type Locale } from "@/lib/i18n";
import { getServiceDetail, isServiceSlug, serviceSlugs } from "@/lib/service-details";

export const dynamic = "force-static";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale: rawLocale, slug: rawSlug } = await params;
  if (!isLocale(rawLocale) || !isServiceSlug(rawSlug)) notFound();

  const locale = rawLocale as Locale;
  const t = getMessages(locale);
  const detail = getServiceDetail(rawSlug, locale);

  return (
    <>
      <SiteNav locale={locale} t={t} />
      <main className="service-detail-page border-t border-hive-border-subtle">
        <div className="service-detail__main">
          <section className="service-detail__hero">
            <h1 className="service-detail__title">{detail.title}</h1>
            <p className="service-detail__lead">{detail.lead}</p>
          </section>

          <section className="service-flow" aria-label={detail.flowLabel}>
            {detail.steps.map((step, idx) => (
              <Fragment key={step.head}>
                <article className="service-step">
                  <h3 className="service-step__head">{step.head}</h3>
                  <p className="service-step__text">{step.text}</p>
                </article>
                {idx < detail.steps.length - 1 ? (
                  <div className="service-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 4v16M6 14l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}
              </Fragment>
            ))}
          </section>
        </div>
      </main>

      <a className="service-detail__floating-back" href={`/${locale}#services`}>
        {locale === "ar" ? "رجوع للخدمات" : "Back to Services"}
      </a>

      <SiteFooter locale={locale} t={t} />
    </>
  );
}

