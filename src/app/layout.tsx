import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import { defaultLocale } from "@/lib/i18n";
import "./globals.css";

const ubuntuArabic = localFont({
  src: [
    {
      path: "../../public/Ubuntu-Arabic-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Ubuntu-Arabic-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ubuntu-arabic",
  display: "swap",
  /** يقلّل قفزات التخطيط عند استبدال خط النظام بـ Ubuntu */
  adjustFontFallback: "Arial",
});

/** يُحدَّث فوراً من السكربت أدناى حسب المسار — للبناء الثابت لا يتوفر pathname على الخادم */
const defaultHtmlLang = defaultLocale;
const defaultHtmlDir = defaultLocale === "ar" ? "rtl" : "ltr";

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/hive_logo_new_dark.png", type: "image/png" }],
    shortcut: "/hive_logo_new_dark.png",
    apple: "/hive_logo_new_dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultHtmlLang}
      dir={defaultHtmlDir}
      suppressHydrationWarning
      className="h-full"
    >
      <body
        className={`${ubuntuArabic.variable} min-h-full antialiased bg-hive-black text-hive-off-white`}
      >
        <Script id="hive-doc-lang" strategy="beforeInteractive">
          {`
(function(){
  try {
    var m = location.pathname.match(/^\\/(en|ar)(?=\\/|$)/);
    var lang = m ? m[1] : ${JSON.stringify(defaultLocale)};
    var dir = lang === "ar" ? "rtl" : "ltr";
    var r = document.documentElement;
    r.setAttribute("lang", lang);
    r.setAttribute("dir", dir);
  } catch (e) {}
})();
          `.trim()}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
