/** أيقونات SVG خفيفة — بدون lucide-react لتقليل حجم الحزمة */

type IconProps = { className?: string };

const common = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconSend({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

export function IconGlobe({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/** نجمة بسيطة (بديل Sparkles) */
export function IconSparkles({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeWidth={1.5} />
      <path d="m12 8 1.5 4 4 1.5-4 1.5L12 19l-1.5-4-4-1.5 4-1.5L12 8z" />
    </svg>
  );
}

export function IconLightbulb({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M9 18h6M10 22h4" />
      <path d="M15 14a4 4 0 0 0 2-4 4 4 0 1 0-8 0 4 4 0 0 0 2 4l-1 4h6l-1-4z" />
    </svg>
  );
}

export function IconTarget({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function IconFolderCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
      <path d="M9 13l2 2 4-4" strokeWidth={2} />
    </svg>
  );
}

export function IconCalendarClock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M16 2v4M8 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
      <path d="M16 14l-3-3M16 14v-4" strokeWidth={2} />
    </svg>
  );
}

export function IconBadgeCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.77 4.78 4 4 0 01-6.75 0 4 4 0 01-4.78-4.77 4 4 0 010-6.76z" />
      <path d="M9 12l2 2 4-4" strokeWidth={2} />
    </svg>
  );
}

/** علامة صح بخط سميك — تُعرض داخل حاوية دائرية في قوائم الباقات */
export function IconPackageFeatureCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" className={className} aria-hidden fill="none">
      <path
        d="M2.75 7.1 5.45 9.8 11.25 4"
        stroke="currentColor"
        strokeWidth="2.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
