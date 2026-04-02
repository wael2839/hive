import Link from "next/link";
import { IconGlobe, IconSend } from "@/components/icons/MiniUiIcons";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconTikTok,
  IconWhatsApp,
} from "@/components/icons/ContactChannelIcons";
import { siteContact } from "@/config/site-contact";
import type { Locale, Messages } from "@/lib/i18n";
import { serviceSlugs } from "@/lib/service-details";
import { HiveLogo } from "./HiveLogo";

const quickLinks = [
  { id: "hero", key: "home" as const },
  { id: "about", key: "about" as const },
  { id: "services", key: "services" as const },
  { id: "packages", key: "packages" as const },
  { id: "contact", key: "contact" as const },
] as const;

const socialBarClass =
  "flex h-11 w-11 items-center justify-center rounded-lg border border-hive-border bg-[var(--hive-pill-bg)] text-hive-off-white transition hover:border-hive-gold/45 hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold";

const contactRowClass =
  "group flex items-center gap-2.5 text-start text-sm text-hive-off-white/85 transition-colors hover:text-hive-gold-light light:text-neutral-700 light:hover:text-hive-gold";

const linkMutedClass =
  "text-sm text-hive-off-white/80 transition-colors hover:text-hive-gold-light light:text-neutral-700 light:hover:text-hive-gold";

type Props = {
  locale: Locale;
  t: Messages;
};

export function SiteFooter({ locale, t }: Props) {
  const f = t.footer;
  const nav = t.nav;
  const c = t.contact;
  const year = new Date().getFullYear();
  const rightsText = f.rights.replace("{year}", String(year));

  return (
    <footer className="relative border-t border-hive-border bg-[var(--hive-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-12">
          {/* العمود 1 — الهوية: شعار أعلى منتصف النص */}
          <div className="flex flex-col items-center text-center sm:col-span-2 lg:col-span-1">
            <Link
              prefetch={false}
              href={`/${locale}#hero`}
              className="inline-flex outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-hive-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-bg)]"
            >
              <HiveLogo
                heightClass="h-8 sm:h-9"
                maxWidthClass="max-w-[200px] sm:max-w-[220px]"
                alt={t.meta.title}
              />
            </Link>
            <h2 className="mt-4 max-w-sm text-lg font-bold leading-snug text-hive-gold sm:text-xl">
              {f.tagline}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-hive-off-white/75 light:text-neutral-600">
              {f.brandIntro}
            </p>
          </div>

          {/* العمود 2 — روابط سريعة */}
          <div className="text-start">
            <p className="text-sm font-semibold text-hive-gold">{f.sitemapTitle}</p>
            <nav aria-label={f.sitemapTitle} className="mt-4">
              <ul className="flex flex-col gap-2.5">
                {quickLinks.map((a) => (
                  <li key={a.id}>
                    <Link
                      prefetch={false}
                      href={`/${locale}#${a.id}`}
                      className={linkMutedClass}
                    >
                      {nav[a.key]}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link prefetch={false} href={`/${locale}`} className={linkMutedClass}>
                    {nav.allLinks}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* العمود 3 — خدماتنا */}
          <div className="text-start">
            <p className="text-sm font-semibold text-hive-gold">{f.servicesTitle}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {serviceSlugs.map((slug, i) => {
                const title = t.services.items[i]?.title;
                if (!title) return null;
                return (
                  <li key={slug}>
                    <Link
                      prefetch={false}
                      href={`/${locale}/services/${slug}`}
                      className={linkMutedClass}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* العمود 4 — تواصل */}
          <div className="text-start">
            <p className="text-sm font-semibold text-hive-gold">{f.contactTitle}</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link prefetch={false} href={`/${locale}#contact`} className={contactRowClass}>
                  <IconSend className="size-4 shrink-0 text-hive-gold" />
                  <span>{f.contactForm}</span>
                </Link>
              </li>
              <li>
                <a
                  href={siteContact.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactRowClass}
                >
                  <IconWhatsApp className="size-4 shrink-0 text-hive-gold" />
                  <span className="flex min-w-0 flex-col text-start">
                    <span>{c.ariaWhatsApp}</span>
                    <span
                      dir="ltr"
                      className="text-xs text-hive-off-white/50 light:text-neutral-500"
                    >
                      {siteContact.phone.display}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={siteContact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactRowClass}
                >
                  <IconFacebook className="size-4 shrink-0 text-hive-gold" />
                  <span>{c.ariaFacebook}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteContact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactRowClass}
                >
                  <IconInstagram className="size-4 shrink-0 text-hive-gold" />
                  <span>{c.ariaInstagram}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteContact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactRowClass}
                >
                  <IconLinkedIn className="size-4 shrink-0 text-hive-gold" />
                  <span>{c.ariaLinkedin}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteContact.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactRowClass}
                >
                  <IconTikTok className="size-4 shrink-0 text-hive-gold" />
                  <span>{c.ariaTiktok}</span>
                </a>
              </li>
              <li>
                <a href={siteContact.email.href} className={contactRowClass}>
                  <IconMail className="size-4 shrink-0 text-hive-gold" />
                  <span dir="ltr" className="min-w-0 break-all">
                    {siteContact.email.display}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-hive-border-subtle pt-8">
          <p className="text-center text-xs text-hive-off-white/45 light:text-neutral-500">
            {rightsText}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={siteContact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.ariaWhatsApp}
              className={socialBarClass}
            >
              <IconWhatsApp className="size-5" />
            </a>
            <a
              href={siteContact.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.ariaTiktok}
              className={socialBarClass}
            >
              <IconTikTok className="size-5" />
            </a>
            <a
              href={siteContact.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.ariaInstagram}
              className={socialBarClass}
            >
              <IconInstagram className="size-5" />
            </a>
            <a
              href={siteContact.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.ariaFacebook}
              className={socialBarClass}
            >
              <IconFacebook className="size-5" />
            </a>
            <a
              href={siteContact.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.ariaLinkedin}
              className={socialBarClass}
            >
              <IconLinkedIn className="size-5" />
            </a>
            <Link
              prefetch={false}
              href={`/${locale}`}
              aria-label={nav.home}
              className={socialBarClass}
            >
              <IconGlobe className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
