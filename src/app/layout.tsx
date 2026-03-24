import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Noto_Sans_Arabic, Syne } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hive Digital Solutions",
    template: "%s | Hive Digital Solutions",
  },
  description:
    "Premium digital agency — strategy, design, and engineering at enterprise scale.",
  icons: {
    icon: "/hive_logo_new_dark.png",
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
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${syne.variable} ${notoArabic.variable} ${ubuntuArabic.variable} ${geistMono.variable} min-h-full antialiased bg-hive-black text-hive-off-white`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
