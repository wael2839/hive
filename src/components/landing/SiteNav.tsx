"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale, Messages } from "@/lib/i18n";
import { HiveLogo } from "./HiveLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const anchors = [
  { id: "hero", key: "home" as const },
  { id: "about", key: "about" as const },
  { id: "vision", key: "vision" as const },
  { id: "services", key: "services" as const },
  { id: "packages", key: "packages" as const },
  { id: "contact", key: "contact" as const },
];

export function SiteNav({ locale, t }: { locale: Locale; t: Messages }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8">
        <div
          className={`mx-auto flex max-w-7xl relative items-center justify-between gap-4 rounded-lg border border-hive-border bg-[var(--hive-nav-bg)] px-4 py-2 backdrop-blur-xl sm:px-5 lg:px-6 ${
            locale === "ar"
              ? "max-lg:flex-row-reverse max-lg:[direction:ltr] lg:flex-row lg:[direction:inherit]"
              : "max-lg:flex-row max-lg:[direction:ltr] lg:flex-row lg:[direction:inherit]"
          }`}
        >
          <Link
            href={`/${locale}#hero`}
            className="flex min-w-0 max-w-[min(100%,18rem)] shrink-0 items-center gap-2 py-0.5 sm:max-w-none sm:gap-2.5"
            dir={locale === "ar" ? "rtl" : "ltr"}
            onClick={() => setOpen(false)}
          >
            <HiveLogo
              priority
              heightClass="h-8 sm:h-9"
              maxWidthClass="max-w-[min(100%,8.5rem)] sm:max-w-[9.75rem]"
              alt={t.meta.title}
            />
            {/* <span className="truncate text-base font-semibold tracking-tight text-hive-off-white sm:text-lg">
              {t.nav.brand}
            </span> */}
          </Link>

          <nav
            className="hidden items-center self-center gap-1 lg:flex absolute left-1/2 transform -translate-x-1/2"
            aria-label="Primary"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {anchors.map((a) => (
              <Link
                key={a.id}
                href={`/${locale}#${a.id}`}
                className="rounded-md px-3 py-2 text-sm font-semibold text-hive-off-white/80 light:text-neutral-700 transition-colors hover:bg-[var(--hive-hover-surface)] hover:text-hive-gold"
              >
                {t.nav[a.key]}
              </Link>
            ))}
          </nav>

          <div
            className={`flex items-center gap-2 sm:gap-3 ${
              locale === "ar"
                ? "max-lg:flex-row-reverse lg:flex-row"
                : "flex-row"
            }`}
          >
            <ThemeToggle
              switchToLight={t.nav.themeSwitchToLight}
              switchToDark={t.nav.themeSwitchToDark}
            />
            <LanguageSwitcher active={locale} />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hive-border bg-[var(--hive-pill-bg)] text-hive-off-white transition-colors hover:bg-[var(--hive-hover-surface)] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                {open ? (
                  <>
                    <path d="M6 6L18 18" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
            {/* <Link
              href={`/${locale}#contact`}
              className="hive-cta-hex rounded-md hidden items-center justify-center bg-gradient-to-r from-hive-btn-from to-hive-btn-to px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold sm:inline-flex"
            >
              {t.nav.cta}
            </Link> */}
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close mobile menu"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 w-[min(88vw,22rem)] border-hive-border bg-[var(--hive-nav-bg)] p-5 backdrop-blur-xl transition-transform duration-300 ease-out ${
            locale === "ar"
              ? "left-0 border-r"
              : "right-0 border-l"
          } ${open ? "translate-x-0" : locale === "ar" ? "-translate-x-full" : "translate-x-full"}`}
        >
            <div
              className={`mb-5 flex items-center justify-between ${
                locale === "ar" ? "flex-row" : "flex-row-reverse"
              }`}
              dir="ltr"
            >
              <span
                className="text-sm font-semibold text-hive-off-white/85"
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                {t.nav.brand}
              </span>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-hive-border bg-[var(--hive-pill-bg)] text-hive-off-white transition-colors hover:bg-[var(--hive-hover-surface)]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M6 6L18 18" />
                  <path d="M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav
              className="flex flex-col gap-3"
              aria-label="Mobile primary"
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              {anchors.map((a) => (
                <Link
                  key={a.id}
                  href={`/${locale}#${a.id}`}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-hive-off-white/85 transition-colors hover:bg-[var(--hive-hover-surface)] hover:text-hive-gold ring-hive-gold/50 ring-1"
                  onClick={() => setOpen(false)}
                >
                  {t.nav[a.key]}
                </Link>
              ))}
            </nav>

            {/* <Link
              href={`/${locale}#contact`}
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-hive-btn-from to-hive-btn-to px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:brightness-105"
            >
              {t.nav.cta}
            </Link> */}
          </aside>
      </div>
    </>
  );
}

