import Link from "next/link";
import { siteContact } from "@/config/site-contact";
import type { Locale, Messages } from "@/lib/i18n";
import { HiveLogo } from "./HiveLogo";

const footerAnchors = [
  { id: "hero", key: "home" as const },
  { id: "about", key: "about" as const },
  { id: "services", key: "services" as const },
  { id: "vision", key: "vision" as const },
  { id: "packages", key: "packages" as const },
  { id: "portfolio", key: "portfolio" as const },
  { id: "contact", key: "contact" as const },
];

type Props = {
  locale: Locale;
  t: Messages;
};

export function SiteFooter({ locale, t }: Props) {
  const f = t.footer;
  const nav = t.nav;

  return (
    <footer className="relative border-t border-hive-border bg-[var(--hive-bg)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hive-gold/25 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-md shrink-0">
            <Link
              href={`/${locale}#hero`}
              className="inline-block outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-hive-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-bg)]"
            >
              <HiveLogo
                heightClass="h-7 sm:h-8"
                maxWidthClass="max-w-[180px] sm:max-w-[200px]"
                alt={t.meta.title}
              />
            </Link>
            <p className="mt-3 line-clamp-3 text-sm leading-snug text-hive-off-white/55 light:text-neutral-600">
              {t.meta.description}
            </p>
            <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-hive-gold/80 light:text-[#5c4a12]">
              {f.tagline}
            </p>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:max-w-lg">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hive-gold-light/90">
                {f.sitemapTitle}
              </p>
              <nav aria-label={f.sitemapTitle} className="mt-3">
                <ul className="space-y-1.5">
                  {footerAnchors.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={`/${locale}#${a.id}`}
                        className="text-sm text-hive-off-white/70 transition-colors hover:text-hive-gold-light light:text-neutral-700"
                      >
                        {nav[a.key]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hive-gold-light/90">
                {f.contactTitle}
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href={`/${locale}#contact`}
                    className="text-sm text-hive-off-white/70 transition-colors hover:text-hive-gold-light light:text-neutral-700"
                  >
                    {nav.contact}
                  </Link>
                </li>
                <li>
                  <a
                    href={siteContact.email.href}
                    className="text-sm text-hive-off-white/70 transition-colors hover:text-hive-gold-light light:text-neutral-700"
                    dir="ltr"
                  >
                    {siteContact.email.display}
                  </a>
                </li>
                <li>
                  <a
                    href={siteContact.phone.href}
                    className="text-sm text-hive-off-white/70 transition-colors hover:text-hive-gold-light light:text-neutral-700"
                    dir="ltr"
                  >
                    {siteContact.phone.display}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-hive-border-subtle pt-5 sm:flex-row sm:items-center">
          <p className="text-center text-xs text-hive-off-white/45 sm:text-pretty sm:text-start light:text-neutral-500">
            {f.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
