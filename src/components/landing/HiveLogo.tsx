"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const HIVE_LOGO = {
  dark: "/hive_logo_new_dark.png",
  light: "/hive_logo_new_light.png",
} as const;

export type HiveLogoVariant = keyof typeof HIVE_LOGO;

type Props = {
  variant?: HiveLogoVariant;
  className?: string;
  heightClass?: string;
  maxWidthClass?: string;
  priority?: boolean;
  alt?: string;
  decorative?: boolean;
};

const REF_W = 320;
const REF_H = 96;

/** إذا لم يُمرَّر variant، يُختار تلقائياً حسب الثيم: داكن → dark، فاتح → light */
export function HiveLogo({
  variant: forcedVariant,
  className = "",
  heightClass = "h-9",
  maxWidthClass = "max-w-[200px]",
  priority,
  alt = "",
  decorative,
}: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const autoVariant: HiveLogoVariant =
    mounted && resolvedTheme === "light" ? "light" : "dark";
  const variant = forcedVariant ?? autoVariant;

  return (
    <span
      className={`inline-block shrink-0 ${className}`}
      aria-hidden={decorative ? true : undefined}
    >
      <Image
        src={HIVE_LOGO[variant]}
        alt={alt}
        width={REF_W}
        height={REF_H}
        priority={priority}
        className={`${heightClass} w-auto ${maxWidthClass} object-contain object-left rtl:object-right`}
        sizes="(max-width: 640px) 168px, 192px"
      />
    </span>
  );
}
