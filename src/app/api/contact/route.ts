import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  CONTACT_SERVICE_OTHER,
  isContactServiceId,
} from "@/lib/contact-constants";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { isValidContactPhone } from "@/lib/country-dial-codes";
import { serviceSlugs, type ServiceSlug } from "@/lib/service-details";

export const runtime = "nodejs";

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_DETAILS = 10_000;
const MAX_PHONE = 24;

type Body = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  serviceId?: unknown;
  details?: unknown;
  locale?: unknown;
};

function trimStr(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  if (s.length === 0 || s.length > max) return null;
  return s;
}

function serviceTitle(locale: Locale, serviceId: string): string {
  const t = getMessages(locale);
  if (serviceId === CONTACT_SERVICE_OTHER) return t.contact.serviceOther;
  const idx = serviceSlugs.indexOf(serviceId as ServiceSlug);
  if (idx === -1) return serviceId;
  return t.services.items[idx]?.title ?? serviceId;
}

function getSmtp() {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.SMTP_FROM?.trim() || user;
  if (!host || !user || !pass || !to || !from) return null;
  const port = Number(portRaw || "587");
  if (!Number.isFinite(port) || port < 1 || port > 65535) return null;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  return { host, port, secure, user, pass, to, from };
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const fullName = trimStr(body.fullName, MAX_NAME);
  const email = trimStr(body.email, MAX_EMAIL);
  const phoneRaw =
    typeof body.phone === "string" ? body.phone.trim().slice(0, MAX_PHONE) : "";
  const phone =
    phoneRaw.length > 0 && isValidContactPhone(phoneRaw) ? phoneRaw : null;
  const details = trimStr(body.details, MAX_DETAILS);
  const serviceId =
    typeof body.serviceId === "string" ? body.serviceId.trim() : "";

  if (!fullName || !email || !phone || !details || details.length < 10) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!isContactServiceId(serviceId)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const localeRaw = body.locale;
  const locale: Locale =
    typeof localeRaw === "string" && isLocale(localeRaw) ? localeRaw : "en";

  const smtp = getSmtp();
  if (!smtp) {
    console.error(
      "[contact] SMTP not configured: set SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL (and optionally SMTP_PORT, SMTP_FROM, SMTP_SECURE)",
    );
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const serviceLabel = serviceTitle(locale, serviceId);
  const subject = `[Hive Contact] ${fullName} — ${serviceLabel}`;

  const text = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Service: ${serviceLabel} (${serviceId})`,
    `Locale: ${locale}`,
    "",
    "Project details:",
    details,
  ].join("\n");

  const html = buildContactEmailHtml({
    locale,
    fullName,
    email,
    phone,
    serviceLabel,
    serviceId,
    details,
  });

  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user, pass: smtp.pass },
    });

    await transporter.sendMail({
      from: smtp.from,
      to: smtp.to,
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const EMAIL_GOLD = "#bda957";
const EMAIL_GOLD_SOFT = "#f5f1e4";
const EMAIL_TEXT = "#1a1a1a";
const EMAIL_MUTED = "#5c5c5c";
const EMAIL_BORDER = "#e8e4d8";
const EMAIL_FONT =
  "Segoe UI, Tahoma, Arial, Helvetica, sans-serif";

function contactEmailLabels(locale: Locale) {
  if (locale === "ar") {
    return {
      title: "طلب تواصل جديد",
      subtitle: "من نموذج التواصل في موقع Hive",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الجوال",
      service: "الخدمة المطلوبة",
      lang: "لغة النموذج",
      details: "تفاصيل المشروع",
      footer: "يمكنك الرد مباشرة على المرسل عبر «رد» على هذه الرسالة.",
      idNote: "المعرّف:",
    };
  }
  return {
    title: "New contact request",
    subtitle: "From the Hive website contact form",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    service: "Service",
    lang: "Form language",
    details: "Project details",
    footer: "Reply to this email to respond directly to the sender.",
    idNote: "ID:",
  };
}

function buildContactEmailHtml(args: {
  locale: Locale;
  fullName: string;
  email: string;
  phone: string;
  serviceLabel: string;
  serviceId: string;
  details: string;
}): string {
  const L = contactEmailLabels(args.locale);
  const dir = args.locale === "ar" ? "rtl" : "ltr";
  const lang = args.locale === "ar" ? "ar" : "en";

  const row = (label: string, value: string, extra?: string) => `
    <tr>
      <td style="padding:0 0 18px 0;">
        <p style="margin:0 0 6px 0;font-family:${EMAIL_FONT};font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${EMAIL_GOLD};">
          ${label}
        </p>
        <p style="margin:0;font-family:${EMAIL_FONT};font-size:16px;line-height:1.5;color:${EMAIL_TEXT};">
          ${value}${extra ?? ""}
        </p>
      </td>
    </tr>`;

  const serviceExtra = ` <span style="font-family:${EMAIL_FONT};font-size:12px;color:${EMAIL_MUTED};">(${escapeHtml(L.idNote)} ${escapeHtml(args.serviceId)})</span>`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(L.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#ecebe6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#ecebe6;padding:28px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;border-collapse:collapse;background-color:#ffffff;border:1px solid ${EMAIL_BORDER};border-radius:14px;overflow:hidden;">
          <tr>
            <td style="background-color:${EMAIL_GOLD};padding:22px 26px;border-bottom:3px solid #9a8639;">
              <p style="margin:0;font-family:${EMAIL_FONT};font-size:20px;font-weight:800;letter-spacing:0.02em;color:#111111;">
                ${escapeHtml(L.title)}
              </p>
              <p style="margin:8px 0 0;font-family:${EMAIL_FONT};font-size:13px;line-height:1.45;color:#2a2410;">
                ${escapeHtml(L.subtitle)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 26px 8px 26px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                ${row(L.name, escapeHtml(args.fullName))}
                ${row(L.email, `<a href="mailto:${escapeHtml(args.email)}" style="color:#6e5f1a;text-decoration:none;font-weight:600;">${escapeHtml(args.email)}</a>`)}
                ${row(L.phone, `<span dir="ltr" style="unicode-bidi:embed;">${escapeHtml(args.phone)}</span>`)}
                ${row(L.service, escapeHtml(args.serviceLabel), serviceExtra)}
                ${row(L.lang, args.locale === "ar" ? "العربية" : "English")}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 26px 22px 26px;">
              <p style="margin:0 0 10px 0;font-family:${EMAIL_FONT};font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${EMAIL_GOLD};">
                ${escapeHtml(L.details)}
              </p>
              ${args.locale === "ar"
                ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background-color:${EMAIL_GOLD_SOFT};border-radius:10px;border:1px solid ${EMAIL_BORDER};">
                <tr>
                  <td style="padding:16px 18px;font-family:${EMAIL_FONT};font-size:14px;line-height:1.65;color:${EMAIL_TEXT};white-space:pre-wrap;">${escapeHtml(args.details)}</td>
                  <td style="width:4px;background-color:${EMAIL_GOLD};border-radius:0 10px 10px 0;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>`
                : `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background-color:${EMAIL_GOLD_SOFT};border-radius:10px;border:1px solid ${EMAIL_BORDER};">
                <tr>
                  <td style="width:4px;background-color:${EMAIL_GOLD};border-radius:10px 0 0 10px;font-size:0;line-height:0;">&nbsp;</td>
                  <td style="padding:16px 18px;font-family:${EMAIL_FONT};font-size:14px;line-height:1.65;color:${EMAIL_TEXT};white-space:pre-wrap;">${escapeHtml(args.details)}</td>
                </tr>
              </table>`}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 26px 22px 26px;border-top:1px solid ${EMAIL_BORDER};background-color:#fafaf8;">
              <p style="margin:0;font-family:${EMAIL_FONT};font-size:12px;line-height:1.5;color:${EMAIL_MUTED};">
                ${escapeHtml(L.footer)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
