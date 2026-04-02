"use client";

import Image from "next/image";

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

// Keep intrinsic dimensions close to rendered size to avoid load-time jump.
const REF_W = 156;
const REF_H = 47;

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
  return (
    <span
      className={`inline-block shrink-0 ${className}`}
      aria-hidden={decorative ? true : undefined}
    >
      {forcedVariant ? (
        <Image
          src={HIVE_LOGO[forcedVariant]}
          alt={alt}
          width={REF_W}
          height={REF_H}
          priority={!!priority}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          className={`${heightClass} w-auto ${maxWidthClass} object-contain object-left rtl:object-right`}
          sizes="(max-width: 640px) 168px, 192px"
        />
      ) : (
        <>
          <Image
            src={HIVE_LOGO.dark}
            alt={alt}
            width={REF_W}
            height={REF_H}
            priority={!!priority}
            loading={priority ? undefined : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            className={`${heightClass} w-auto ${maxWidthClass} object-contain object-left rtl:object-right light:hidden`}
            sizes="(max-width: 640px) 168px, 192px"
          />
          <Image
            src={HIVE_LOGO.light}
            alt={alt}
            width={REF_W}
            height={REF_H}
            priority={false}
            loading="lazy"
            fetchPriority="low"
            className={`${heightClass} hidden w-auto ${maxWidthClass} object-contain object-left rtl:object-right light:block`}
            sizes="(max-width: 640px) 168px, 192px"
          />
        </>
      )}
    </span>
  );
}
