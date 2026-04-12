import type { Locale } from "@/lib/i18n";

/** تنسيق المعامل (1.5، 10، 100) قبل إلحاق k/m/b */
function formatCoefficient(v: number): string {
  if (!Number.isFinite(v) || v < 0) return "0";
  if (v >= 100) return String(Math.round(v));
  if (v >= 10) {
    const n = Math.round(v * 10) / 10;
    return String(Number(n.toFixed(1)));
  }
  const n = Math.round(v * 100) / 100;
  return String(Number(n.toFixed(2)));
}

function localizeDigits(coeff: string, locale: Locale): string {
  const n = Number.parseFloat(coeff);
  if (Number.isNaN(n)) return coeff;
  return n.toLocaleString(locale === "ar" ? "ar" : "en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    useGrouping: false,
  });
}

/**
 * أقل من 1000: رقم كامل مع فواصل محلية.
 * من 1000 فما فوق: لاحقة لاتينية ‎k / m / b‎ (مثل 1k، 1.5m).
 */
export function formatCompactMetric(n: number, locale: Locale): string {
  const x = Math.floor(Math.max(0, n));
  if (x < 1000) {
    return x.toLocaleString(locale === "ar" ? "ar" : "en");
  }

  const tiers = [
    { div: 1_000_000_000, suf: "b" },
    { div: 1_000_000, suf: "m" },
    { div: 1_000, suf: "k" },
  ] as const;

  for (const { div, suf } of tiers) {
    if (x >= div) {
      const v = x / div;
      const coeff = formatCoefficient(v);
      return `${localizeDigits(coeff, locale)}${suf}`;
    }
  }

  return x.toLocaleString(locale === "ar" ? "ar" : "en");
}
