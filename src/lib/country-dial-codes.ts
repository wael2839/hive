import type { Locale } from "@/lib/i18n";

export type CountryDialEntry = {
  iso: string;
  dial: string;
  nameEn: string;
  nameAr: string;
};

/** Default country for the contact phone field */
export const DEFAULT_COUNTRY_ISO = "SY";

export const COUNTRY_DIAL_CODES: CountryDialEntry[] = [
  { iso: "SY", dial: "963", nameEn: "Syria", nameAr: "سوريا" },
  { iso: "SA", dial: "966", nameEn: "Saudi Arabia", nameAr: "السعودية" },
  { iso: "AE", dial: "971", nameEn: "United Arab Emirates", nameAr: "الإمارات" },
  { iso: "EG", dial: "20", nameEn: "Egypt", nameAr: "مصر" },
  { iso: "JO", dial: "962", nameEn: "Jordan", nameAr: "الأردن" },
  { iso: "LB", dial: "961", nameEn: "Lebanon", nameAr: "لبنان" },
  { iso: "IQ", dial: "964", nameEn: "Iraq", nameAr: "العراق" },
  { iso: "PS", dial: "970", nameEn: "Palestine", nameAr: "فلسطين" },
  { iso: "KW", dial: "965", nameEn: "Kuwait", nameAr: "الكويت" },
  { iso: "QA", dial: "974", nameEn: "Qatar", nameAr: "قطر" },
  { iso: "BH", dial: "973", nameEn: "Bahrain", nameAr: "البحرين" },
  { iso: "OM", dial: "968", nameEn: "Oman", nameAr: "عُمان" },
  { iso: "YE", dial: "967", nameEn: "Yemen", nameAr: "اليمن" },
  { iso: "LY", dial: "218", nameEn: "Libya", nameAr: "ليبيا" },
  { iso: "TN", dial: "216", nameEn: "Tunisia", nameAr: "تونس" },
  { iso: "DZ", dial: "213", nameEn: "Algeria", nameAr: "الجزائر" },
  { iso: "MA", dial: "212", nameEn: "Morocco", nameAr: "المغرب" },
  { iso: "SD", dial: "249", nameEn: "Sudan", nameAr: "السودان" },
  { iso: "TR", dial: "90", nameEn: "Türkiye", nameAr: "تركيا" },
  { iso: "IR", dial: "98", nameEn: "Iran", nameAr: "إيران" },
  { iso: "US", dial: "1", nameEn: "United States", nameAr: "الولايات المتحدة" },
  { iso: "CA", dial: "1", nameEn: "Canada", nameAr: "كندا" },
  { iso: "GB", dial: "44", nameEn: "United Kingdom", nameAr: "المملكة المتحدة" },
  { iso: "DE", dial: "49", nameEn: "Germany", nameAr: "ألمانيا" },
  { iso: "FR", dial: "33", nameEn: "France", nameAr: "فرنسا" },
  { iso: "IT", dial: "39", nameEn: "Italy", nameAr: "إيطاليا" },
  { iso: "ES", dial: "34", nameEn: "Spain", nameAr: "إسبانيا" },
  { iso: "NL", dial: "31", nameEn: "Netherlands", nameAr: "هولندا" },
  { iso: "SE", dial: "46", nameEn: "Sweden", nameAr: "السويد" },
  { iso: "AU", dial: "61", nameEn: "Australia", nameAr: "أستراليا" },
  { iso: "IN", dial: "91", nameEn: "India", nameAr: "الهند" },
  { iso: "PK", dial: "92", nameEn: "Pakistan", nameAr: "باكستان" },
  { iso: "CN", dial: "86", nameEn: "China", nameAr: "الصين" },
  { iso: "JP", dial: "81", nameEn: "Japan", nameAr: "اليابان" },
  { iso: "KR", dial: "82", nameEn: "South Korea", nameAr: "كوريا الجنوبية" },
  { iso: "RU", dial: "7", nameEn: "Russia", nameAr: "روسيا" },
  { iso: "BR", dial: "55", nameEn: "Brazil", nameAr: "البرازيل" },
  { iso: "MX", dial: "52", nameEn: "Mexico", nameAr: "المكسيك" },
];

const byIso = new Map(COUNTRY_DIAL_CODES.map((c) => [c.iso, c]));

export function getCountryByIso(iso: string): CountryDialEntry | undefined {
  return byIso.get(iso);
}

export function getCountriesSorted(locale: Locale): CountryDialEntry[] {
  const sy = COUNTRY_DIAL_CODES.find((c) => c.iso === DEFAULT_COUNTRY_ISO)!;
  const rest = COUNTRY_DIAL_CODES.filter((c) => c.iso !== DEFAULT_COUNTRY_ISO).sort(
    (a, b) =>
      locale === "ar"
        ? a.nameAr.localeCompare(b.nameAr, "ar")
        : a.nameEn.localeCompare(b.nameEn),
  );
  return [sy, ...rest];
}

/** ISO 3166-1 alpha-2 → flag emoji (fallback where images are not used) */
export function countryFlagEmoji(iso: string): string {
  const u = iso.toUpperCase();
  if (u.length !== 2) return "";
  const A = 0x1f1e6;
  return String.fromCodePoint(
    A + u.charCodeAt(0) - 65,
    A + u.charCodeAt(1) - 65,
  );
}

/**
 * PNG flag URL (flagcdn.com).
 * Only documented sizes work — e.g. 16x12, 24x18, 32x24 or w20, w40, w80 (not w28).
 */
export function countryFlagSrc(
  iso: string,
  size: "16x12" | "24x18" | "32x24" = "24x18",
): string {
  return `https://flagcdn.com/${size}/${iso.toLowerCase()}.png`;
}

/**
 * Match a typed country calling code (digits only, no +) to a list entry.
 * Returns null if ambiguous or unknown.
 */
export function resolveCountryFromDialDigits(digits: string): CountryDialEntry | null {
  if (!digits || !/^\d+$/.test(digits)) return null;

  const exactMatches = COUNTRY_DIAL_CODES.filter((c) => c.dial === digits);
  if (exactMatches.length >= 1) return exactMatches[0]!;

  const expanding = COUNTRY_DIAL_CODES.filter((c) => c.dial.startsWith(digits));
  if (expanding.length === 1) return expanding[0]!;

  return null;
}

/** Strip non-digits; drop a single leading 0 (common for SY local format) */
export function normalizeNationalDigits(dial: string, raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("0")) d = d.slice(1);
  return d;
}

/** Validate composed E.164-style value against known dial prefixes (longest match first). */
export function isValidContactPhone(phone: string): boolean {
  if (!phone.startsWith("+")) return false;
  const digits = phone.slice(1);
  if (!/^\d+$/.test(digits)) return false;
  if (digits.length < 10 || digits.length > 15) return false;
  const sorted = [...COUNTRY_DIAL_CODES].sort(
    (a, b) => b.dial.length - a.dial.length,
  );
  return sorted.some(({ dial }) => {
    if (!digits.startsWith(dial)) return false;
    const national = digits.slice(dial.length);
    return national.length >= 5 && national.length <= 12;
  });
}
