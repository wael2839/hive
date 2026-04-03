import Link from "next/link";
import type { Locale, Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";

type Props = {
  locale: Locale;
  t: Messages["packages"];
};

export function PackagesSection({ locale, t }: Props) {
  return (
    <section
      id="packages"
      className="relative bg-[var(--hive-bg)] py-15 sm:py-15 scroll-mt-28 sm:scroll-mt-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <SectionTitle>{t.title}</SectionTitle>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-hive-off-white/70 light:text-neutral-600">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-5 lg:items-stretch">
          {t.items.map((item, i) => (
            <ScrollReveal key={item.name} delayMs={50 + i * 45} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-md border p-7 transition-colors ${
                  item.featured
                    ? "border-hive-gold/45 bg-[var(--hive-card-glass)] shadow-[0_0_0_1px_rgba(189,169,87,0.12)] light:border-[#c4b896]/50 light:shadow-[0_0_40px_-12px_rgba(110,95,26,0.15)]"
                    : "border-hive-border bg-[var(--hive-card-glass)] hover:border-hive-border-subtle"
                }`}
              >
                {item.featured ? (
                  <p className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-lg border border-hive-gold/45 bg-hive-black px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-hive-gold-light shadow-sm sm:-top-4 sm:px-4 sm:py-2 sm:text-[13px] light:bg-[#e6e6e0] light:text-[#5c4a12]">
                    {t.badgePopular}
                  </p>
                ) : null}
                <h3 className="min-h-[3.5rem] text-lg font-semibold leading-7 text-hive-off-white">
                  {item.name}
                </h3>
                <p className="mt-3 text-2xl font-bold tracking-tight text-hive-gold-light sm:text-3xl">
                  {item.price}
                </p>
                <p className="mt-4 text-sm leading-7 text-hive-off-white/70 light:text-neutral-600">
                  {item.description}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-hive-border-subtle pt-6">
                  {item.features.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2.5 text-sm text-hive-off-white/80 light:text-neutral-700"
                    >
                      <span
                        className="mt-0.5 shrink-0 text-hive-gold"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 min-h-2 flex-1" aria-hidden />
                <Link
                  prefetch={false}
                  href={`/${locale}#contact`}
                  className={`inline-flex w-full items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold ${
                    item.featured
                      ? "bg-gradient-to-r from-hive-btn-from to-hive-btn-to text-neutral-900 hover:brightness-110"
                      : "border border-hive-border bg-[var(--hive-pill-bg)] text-hive-off-white hover:border-hive-gold/40 hover:text-hive-gold-light"
                  }`}
                >
                  {item.cta}
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
