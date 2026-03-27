"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const pairs: { locale: Locale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "ar", label: "AR" },
];

export function LanguageSwitcher({ active }: { active: Locale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(en|ar)/, "") || "";

  return (
    <div
      className="inline-flex items-center rounded-md border border-hive-border bg-[var(--hive-pill-bg)] p-1 backdrop-blur-md"
      role="group"
      aria-label="Language"
    >
      {pairs.map(({ locale, label }) => {
        const href = `/${locale}${rest}`;
        const isOn = active === locale;
        return (
          <Link
            key={locale}
            href={href}
            prefetch
            className={`relative rounded-md px-3 py-1 text-xs font-semibold tracking-wide transition-colors ${
              isOn
                ? "text-neutral-900"
                : "text-hive-off-white/70 light:text-neutral-600 hover:text-hive-gold-light"
            }`}
          >
            {isOn ? (
              <span
                className="absolute inset-0 rounded-sm bg-gradient-to-br from-hive-btn-to to-hive-btn-from"
                aria-hidden
              />
            ) : null}
            <span className="relative z-[1]">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}

