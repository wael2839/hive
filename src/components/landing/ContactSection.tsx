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
import { CONTACT_SERVICE_OTHER } from "@/lib/contact-constants";
import { isValidContactPhone } from "@/lib/country-dial-codes";
import type { Locale, Messages } from "@/lib/i18n";
import { serviceSlugs } from "@/lib/service-details";
import { ContactPhoneField } from "./ContactPhoneField";
import { ContactServiceSelect } from "./ContactServiceSelect";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";

const inputClass =
  "mt-1.5 w-full rounded-md border border-hive-border bg-[var(--hive-input-bg)] px-3.5 py-2.5 text-sm text-hive-off-white outline-none transition placeholder:text-hive-off-white/35 light:placeholder:text-neutral-500 focus:border-hive-gold/50 focus:outline-none light:text-neutral-900";

export function ContactSection({
  locale,
  contact: c,
  serviceTitles,
}: {
  locale: Locale;
  contact: Messages["contact"];
  /** Same order as `serviceSlugs` — built on the server from `getMessages(locale).services.items`. */
  serviceTitles: string[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  /** تمييز رسالة 503 (SMTP غير مهيأ) عن أخطاء الإرسال العامة */
  const [errorVariant, setErrorVariant] = useState<"default" | "unavailable">(
    "default",
  );

  const serviceOptions = serviceSlugs.map((slug, i) => ({
    id: slug,
    label: serviceTitles[i] ?? slug,
  }));
  const serviceSelectOptions = [
    ...serviceOptions,
    { id: CONTACT_SERVICE_OTHER, label: c.serviceOther },
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fullName = String(fd.get("fullName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const serviceId = String(fd.get("serviceId") ?? "").trim();
    const details = String(fd.get("details") ?? "").trim();

    if (
      !fullName ||
      !email ||
      !phone ||
      !isValidContactPhone(phone) ||
      !serviceId ||
      details.length < 10
    ) {
      setErrorVariant("default");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          serviceId,
          details,
          locale,
        }),
      });
      if (!res.ok) {
        let variant: "default" | "unavailable" = "default";
        if (res.status === 503) {
          const data = (await res.json().catch(() => null)) as {
            code?: string;
          } | null;
          if (data?.code === "smtp_not_configured") {
            variant = "unavailable";
          }
        }
        setErrorVariant(variant);
        setStatus("error");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setErrorVariant("default");
      setStatus("error");
    }
  }

  /** جوال: التواصل المباشر أولاً ثم النموذج — lg: كما كان حسب اتجاه الصف */
  const formOrderClass =
    locale === "ar" ? "order-2 lg:order-2" : "order-2 lg:order-1";
  const channelsOrderClass =
    locale === "ar" ? "order-1 lg:order-1" : "order-1 lg:order-2";

  return (
    <section
      id="contact"
      className="bg-[var(--hive-bg2)]  relative py-15 sm:py-15 scroll-mt-28 sm:scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <SectionTitle>{c.title}</SectionTitle>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-hive-off-white/70 light:text-neutral-600">
              {c.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-start lg:justify-center lg:gap-10 xl:gap-12">
        <ScrollReveal
          delayMs={80}
          className={`w-full min-w-0 lg:max-w-xl lg:flex-none ${formOrderClass}`}
        >
          <h3
            id="contact-form-heading"
            className="mb-4 text-center text-lg font-bold leading-snug text-hive-gold-light sm:text-xl light:text-hive-gold"
          >
            {c.formTitle}
          </h3>
          <form
            aria-labelledby="contact-form-heading"
            onSubmit={onSubmit}
            className="space-y-4 rounded-md border border-hive-border bg-[var(--hive-card-glass)] p-6 backdrop-blur-md sm:p-7 lg:p-6"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {status === "sent" ? (
              <p className="rounded-md border border-hive-gold/35 bg-hive-gold/10 px-3 py-2 text-sm text-hive-off-white light:border-hive-gold/50 light:bg-amber-50 light:text-neutral-800">
                {c.sent}
              </p>
            ) : null}
            {status === "error" ? (
              <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-hive-off-white light:text-red-900">
                {errorVariant === "unavailable"
                  ? c.errorUnavailable
                  : c.error}
              </p>
            ) : null}

            <label className="block text-sm font-medium text-hive-off-white/85 light:text-neutral-800">
              {c.name}
              <input
                name="fullName"
                required
                autoComplete="name"
                className={inputClass}
                onChange={() => {
                  if (status === "sent" || status === "error") setStatus("idle");
                }}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="min-w-0 block text-sm font-medium text-hive-off-white/85 light:text-neutral-800">
                {c.email}
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                  onChange={() => {
                    if (status === "sent" || status === "error")
                      setStatus("idle");
                  }}
                />
              </label>

              <div className="min-w-0">
                <ContactPhoneField
                  locale={locale}
                  phoneLabel={c.phone}
                  phonePlaceholder={c.phonePlaceholder}
                  countryAria={c.phoneCountryAria}
                  countryListAria={c.phoneCountryListAria}
                  onInteract={() => {
                    if (status === "sent" || status === "error")
                      setStatus("idle");
                  }}
                />
              </div>
            </div>

            <label className="block text-sm font-medium text-hive-off-white/85 light:text-neutral-800">
              {c.service}
              <ContactServiceSelect
                name="serviceId"
                placeholder={c.servicePlaceholder}
                options={serviceSelectOptions}
                onInteract={() => {
                  if (status === "sent" || status === "error") setStatus("idle");
                }}
              />
            </label>

            <label className="block text-sm font-medium text-hive-off-white/85 light:text-neutral-800">
              {c.projectDetails}
              <textarea
                name="details"
                required
                minLength={10}
                rows={4}
                className={`${inputClass} resize-y`}
                onChange={() => {
                  if (status === "sent" || status === "error") setStatus("idle");
                }}
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-hive-off-white/45 light:text-neutral-500">
                {c.privacy}
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="hive-cta-hex rounded-md inline-flex items-center justify-center bg-gradient-to-r from-hive-btn-from to-hive-btn-to px-6 py-2.5 text-sm font-semibold text-neutral-900 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "sending" ? c.sending : c.send}
              </button>
            </div>
          </form>
        </ScrollReveal>

        <ScrollReveal
          delayMs={40}
          className={`w-full min-w-0 lg:max-w-md lg:flex-none ${channelsOrderClass}`}
        >
          <div>
            <h3 className="mb-4 text-center text-lg font-bold leading-snug text-hive-gold-light sm:text-xl light:text-hive-gold text-balance">
              {c.channelsTitle}
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <a
                href={siteContact.phone.href}
                aria-label={c.ariaPhone}
                className="flex items-center gap-3 rounded-md border border-hive-border bg-[var(--hive-bg)] px-4 py-3 text-sm text-hive-off-white transition hover:border-hive-gold/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
              >
                <IconPhone className="h-5 w-5 shrink-0 text-hive-gold-light" />
                <span dir="ltr" className="min-w-0 truncate font-medium">
                  {siteContact.phone.display}
                </span>
              </a>
              <a
                href={siteContact.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.ariaWhatsApp}
                className="flex items-center gap-3 rounded-md border border-hive-border bg-[var(--hive-bg)] px-4 py-3 text-sm text-hive-off-white transition hover:border-hive-gold/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
              >
                <IconWhatsApp className="h-5 w-5 shrink-0 text-hive-gold-light" />
                <span className="font-medium">{c.ariaWhatsApp}</span>
              </a>
              <a
                href={siteContact.email.href}
                aria-label={c.ariaEmail}
                className="flex items-center gap-3 rounded-md border border-hive-border bg-[var(--hive-bg)] px-4 py-3 text-sm text-hive-off-white transition hover:border-hive-gold/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
              >
                <IconMail className="h-5 w-5 shrink-0 text-hive-gold-light" />
                <span dir="ltr" className="min-w-0 truncate font-medium">
                  {siteContact.email.display}
                </span>
              </a>
            </div>

            <ul className="mt-8 flex w-full list-none flex-wrap items-center justify-center gap-4 p-0">
              <li>
                <a
                  href={siteContact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.ariaInstagram}
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-hive-border bg-[var(--hive-bg)] text-hive-off-white transition hover:border-hive-gold/50 hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
                >
                  <IconInstagram className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a
                  href={siteContact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.ariaFacebook}
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-hive-border bg-[var(--hive-bg)] text-hive-off-white transition hover:border-hive-gold/50 hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
                >
                  <IconFacebook className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a
                  href={siteContact.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.ariaTiktok}
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-hive-border bg-[var(--hive-bg)] text-hive-off-white transition hover:border-hive-gold/50 hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
                >
                  <IconTikTok className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a
                  href={siteContact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.ariaLinkedin}
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-hive-border bg-[var(--hive-bg)] text-hive-off-white transition hover:border-hive-gold/50 hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
                >
                  <IconLinkedIn className="h-6 w-6" />
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
