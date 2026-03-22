import Link from "next/link";
import type { Locale, Messages } from "@/lib/i18n";
import { HiveLogo } from "./HiveLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const anchors = [
  { id: "hero", key: "home" as const },
  { id: "about", key: "about" as const },
  { id: "services", key: "services" as const },
  { id: "vision", key: "vision" as const },
  { id: "packages", key: "packages" as const },
  { id: "portfolio", key: "portfolio" as const },
  { id: "contact", key: "contact" as const },
];

export function SiteNav({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hive-border-subtle bg-[var(--hive-nav-bg)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}#hero`}
          className="flex min-w-0 max-w-[min(100%,18rem)] shrink-0 items-center gap-2.5 py-1 sm:max-w-none sm:gap-3"
        >
          <HiveLogo
            priority
            heightClass="h-9 sm:h-10"
            maxWidthClass="max-w-[min(100%,9rem)] sm:max-w-[10.5rem]"
            alt={t.meta.title}
          />
          <span className="truncate text-base font-semibold tracking-tight text-hive-off-white sm:text-2xl">
            {t.nav.brand}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {anchors.map((a) => (
            <Link
              key={a.id}
              href={`/${locale}#${a.id}`}
              className="rounded-full px-3 py-2 text-sm text-hive-off-white/75 light:text-neutral-700 transition-colors hover:bg-[var(--hive-hover-surface)] hover:text-hive-gold-light"
            >
              {t.nav[a.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle
            switchToLight={t.nav.themeSwitchToLight}
            switchToDark={t.nav.themeSwitchToDark}
          />
          <LanguageSwitcher active={locale} />
          <Link
            href={`/${locale}#contact`}
            className="hive-cta-hex hidden items-center justify-center bg-gradient-to-r from-hive-btn-from to-hive-btn-to px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold sm:inline-flex"
          >
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
