import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconTikTok,
  IconWhatsApp,
} from "@/components/icons/ContactChannelIcons";
import { SiteNav } from "@/components/landing/SiteNav";
import { siteContact } from "@/config/site-contact";
import { getMessages, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildLocalePageMetadata } from "@/lib/seo-metadata";

export const dynamic = "force-static";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const lp = getMessages(locale).linksPage;
  return buildLocalePageMetadata(locale, {
    title: lp.title,
    description: lp.description,
    path: `/${locale}/links`,
  });
}

export default async function LocaleLinksPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getMessages(locale);
  const lp = t.linksPage;
  const c = t.contact;
  const homeHref = `/${locale}`;

  const rows: {
    href: string;
    label: string;
    sub?: string;
    external?: boolean;
    Icon: ComponentType<{ className?: string }>;
  }[] = [
    {
      href: siteContact.social.instagram,
      label: c.ariaInstagram,
      external: true,
      Icon: IconInstagram,
    },
    {
      href: siteContact.social.facebook,
      label: c.ariaFacebook,
      external: true,
      Icon: IconFacebook,
    },
    {
      href: siteContact.social.tiktok,
      label: c.ariaTiktok,
      external: true,
      Icon: IconTikTok,
    },
    {
      href: siteContact.social.linkedin,
      label: c.ariaLinkedin,
      external: true,
      Icon: IconLinkedIn,
    },
    {
      href: siteContact.phone.href,
      label: c.ariaPhone,
      sub: siteContact.phone.display,
      Icon: IconPhone,
    },
    {
      href: siteContact.whatsapp.href,
      label: c.ariaWhatsApp,
      external: true,
      Icon: IconWhatsApp,
    },
    {
      href: siteContact.email.href,
      label: c.ariaEmail,
      sub: siteContact.email.display,
      Icon: IconMail,
    },
  ];

  return (
    <>
      <SiteNav locale={locale} t={t} />
      <main
        id="links-main"
        className="mx-auto max-w-lg px-4 pb-16 pt-28 sm:pt-32"
      >
        <h1 className="text-center text-2xl font-extrabold text-hive-gold-light sm:text-3xl light:text-hive-gold">
          {lp.heading}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-7 text-hive-off-white/75 light:text-neutral-600">
          {lp.intro}
        </p>

        <nav
          aria-label={lp.heading}
          className="mt-10 flex flex-col gap-3"
        >
          {rows.map(({ href, label, sub, external, Icon }) => (
            <a
              key={href}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={label}
              className="flex items-center gap-3 rounded-md border border-hive-border bg-[var(--hive-bg)] px-4 py-3.5 text-sm text-hive-off-white transition hover:border-hive-gold/40 light:text-neutral-900"
            >
              <Icon className="h-5 w-5 shrink-0 text-hive-gold-light light:text-hive-gold" />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-semibold">{label}</span>
                {sub ? (
                  <span dir="ltr" className="truncate text-xs text-hive-off-white/65 light:text-neutral-600">
                    {sub}
                  </span>
                ) : null}
              </span>
            </a>
          ))}

          <Link
            prefetch={false}
            href={homeHref}
            className="hive-cta-hex mt-2 inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-hive-btn-from to-hive-btn-to px-4 py-3.5 text-center text-sm font-semibold text-neutral-900 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
          >
            {lp.websiteLinkLabel}
          </Link>
        </nav>
      </main>
    </>
  );
}
