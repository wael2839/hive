"use client";

import { useState } from "react";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconTikTok,
  IconWhatsApp,
} from "@/components/icons/ContactChannelIcons";
import { siteContact } from "@/config/site-contact";
import type { Locale, Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";

export function ContactSection({
  locale,
  t,
}: {
  locale: Locale;
  t: Messages["contact"];
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const formOrderClass =
    locale === "ar" ? "lg:order-2" : "lg:order-1";
  const channelsOrderClass =
    locale === "ar" ? "lg:order-1" : "lg:order-2";

  return (
    <section
      id="contact"
      className="hive-bg-contact hive-section-alt relative border-t border-hive-border-subtle py-15 sm:py-15"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hive-gold/35 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <SectionTitle>{t.title}</SectionTitle>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-hive-off-white/70 light:text-neutral-600">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-start lg:gap-12">
        <ScrollReveal delayMs={80} className={`w-full min-w-0 flex-1 ${formOrderClass}`}>
          <form
            onSubmit={onSubmit}
            className="space-y-6 rounded-md border border-hive-border bg-[var(--hive-card-glass)] p-8 backdrop-blur-md sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-medium text-hive-off-white/85 light:text-neutral-800">
                {t.name}
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-md border border-hive-border bg-[var(--hive-input-bg)] px-4 py-3 text-hive-off-white outline-none transition placeholder:text-hive-off-white/35 light:placeholder:text-neutral-500 focus:border-hive-gold/50 focus:outline-none"
                  placeholder=""
                />
              </label>
              <label className="block text-sm font-medium text-hive-off-white/85 light:text-neutral-800">
                {t.email}
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-md border border-hive-border bg-[var(--hive-input-bg)] px-4 py-3 text-hive-off-white outline-none transition placeholder:text-hive-off-white/35 light:placeholder:text-neutral-500 focus:border-hive-gold/50 focus:outline-none"
                />
              </label>
            </div>
            <label className="block text-sm font-medium text-hive-off-white/85 light:text-neutral-800">
              {t.company}
              <input
                name="company"
                autoComplete="organization"
                className="mt-2 w-full rounded-md border border-hive-border bg-[var(--hive-input-bg)] px-4 py-3 text-hive-off-white outline-none transition focus:border-hive-gold/50 focus:outline-none"
              />
            </label>
            <label className="block text-sm font-medium text-hive-off-white/85 light:text-neutral-800">
              {t.message}
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-y rounded-md border border-hive-border bg-[var(--hive-input-bg)] px-4 py-3 text-hive-off-white outline-none transition focus:border-hive-gold/50 focus:outline-none"
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-hive-off-white/45 light:text-neutral-500">
                {t.privacy}
              </p>
              <button
                type="submit"
                className="hive-cta-hex rounded-md inline-flex items-center justify-center bg-gradient-to-r from-hive-btn-from to-hive-btn-to px-8 py-3 text-sm font-semibold text-neutral-900 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
              >
                {sent ? t.sent : t.send}
              </button>
            </div>
          </form>
        </ScrollReveal>

        <ScrollReveal delayMs={40} className={`w-full min-w-0 flex-1 lg:max-w-md ${channelsOrderClass}`}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-hive-gold-light/90">
              {t.channelsTitle}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <a
                href={siteContact.phone.href}
                aria-label={t.ariaPhone}
                className="flex items-center gap-3 rounded-md border border-hive-border bg-[var(--hive-pill-bg)] px-4 py-3 text-sm text-hive-off-white transition hover:border-hive-gold/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
              >
                <IconPhone className="h-5 w-5 shrink-0 text-hive-gold-light" />
                <span dir="ltr" className="min-w-0 truncate font-medium">
                  {siteContact.phone.display}
                </span>
              </a>
              <a
                href={siteContact.email.href}
                aria-label={t.ariaEmail}
                className="flex items-center gap-3 rounded-md border border-hive-border bg-[var(--hive-pill-bg)] px-4 py-3 text-sm text-hive-off-white transition hover:border-hive-gold/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
              >
                <IconMail className="h-5 w-5 shrink-0 text-hive-gold-light" />
                <span dir="ltr" className="min-w-0 truncate font-medium">
                  {siteContact.email.display}
                </span>
              </a>
              <a
                href={siteContact.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.ariaWhatsApp}
                className="flex items-center gap-3 rounded-md border border-hive-border bg-[var(--hive-pill-bg)] px-4 py-3 text-sm text-hive-off-white transition hover:border-hive-gold/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
              >
                <IconWhatsApp className="h-5 w-5 shrink-0 text-hive-gold-light" />
                <span className="font-medium">{t.ariaWhatsApp}</span>
              </a>
            </div>

            <ul className="mt-8 flex list-none flex-wrap items-center justify-start gap-3 p-0">
              <li>
                <a
                  href={siteContact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.ariaInstagram}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-hive-border bg-[var(--hive-pill-bg)] text-hive-off-white transition hover:border-hive-gold/50 hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
                >
                  <IconInstagram className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href={siteContact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.ariaFacebook}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-hive-border bg-[var(--hive-pill-bg)] text-hive-off-white transition hover:border-hive-gold/50 hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
                >
                  <IconFacebook className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href={siteContact.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.ariaTiktok}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-hive-border bg-[var(--hive-pill-bg)] text-hive-off-white transition hover:border-hive-gold/50 hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
                >
                  <IconTikTok className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href={siteContact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.ariaLinkedin}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-hive-border bg-[var(--hive-pill-bg)] text-hive-off-white transition hover:border-hive-gold/50 hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
                >
                  <IconLinkedIn className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}


