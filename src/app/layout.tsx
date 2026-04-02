import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
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
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/hive_logo_new_dark.png" },
      { url: "/hive_logo_new_dark.png", sizes: "32x32", type: "image/png" },
      { url: "/hive_logo_new_dark.png", sizes: "48x48", type: "image/png" },
      { url: "/hive_logo_new_dark.png", sizes: "192x192", type: "image/png" },
    ],
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
        className={`${ubuntuArabic.variable} min-h-full antialiased bg-hive-black text-hive-off-white`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
