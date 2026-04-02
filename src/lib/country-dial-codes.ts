import type { Locale } from "@/lib/i18n";
import { COUNTRY_DIAL_RAW } from "./country-dial-raw";

export type CountryDialEntry = {
  iso: string;
  dial: string;
  nameEn: string;
  nameAr: string;
};

/** Default country for the contact phone field */
export const DEFAULT_COUNTRY_ISO = "SY";

const enRegionNames = new Intl.DisplayNames(["en"], { type: "region" });
const arRegionNames = new Intl.DisplayNames(["ar"], { type: "region" });

function regionLabel(iso: string, lang: "en" | "ar"): string {
  try {
    const dn = lang === "en" ? enRegionNames : arRegionNames;
    return dn.of(iso) ?? iso;
  } catch {
    return iso;
  }
}

function buildEntry(iso: string, dial: string): CountryDialEntry {
  return {
    iso,
    dial,
    nameEn: regionLabel(iso, "en"),
    nameAr: regionLabel(iso, "ar"),
  };
}

/** +1 territories/countries: US & CA first so dial-resolution prefers them */
function nanpOrder(a: CountryDialEntry, b: CountryDialEntry): number {
  const rank = (iso: string) => {
    if (iso === "US") return 0;
    if (iso === "CA") return 1;
    return 2;
  };
  const ra = rank(a.iso);
  const rb = rank(b.iso);
  if (ra !== rb) return ra - rb;
  return a.iso.localeCompare(b.iso);
}

const allBuilt = COUNTRY_DIAL_RAW.map((r) => buildEntry(r.iso, r.dial));
const nonNanp = allBuilt.filter((e) => e.dial !== "1");
const nanp = allBuilt.filter((e) => e.dial === "1").sort(nanpOrder);

export const COUNTRY_DIAL_CODES: CountryDialEntry[] = [...nonNanp, ...nanp];

const byIso = new Map(COUNTRY_DIAL_CODES.map((c) => [c.iso, c]));

export function getCountryByIso(iso: string): CountryDialEntry | undefined {
  return byIso.get(iso);
}

export function getCountriesSorted(locale: Locale): CountryDialEntry[] {
  const def = COUNTRY_DIAL_CODES.find((c) => c.iso === DEFAULT_COUNTRY_ISO);
  if (!def) {
    throw new Error(`Missing default country ${DEFAULT_COUNTRY_ISO} in COUNTRY_DIAL_CODES`);
  }
  const rest = COUNTRY_DIAL_CODES.filter((c) => c.iso !== DEFAULT_COUNTRY_ISO).sort(
    (a, b) =>
      locale === "ar"
        ? a.nameAr.localeCompare(b.nameAr, "ar")
        : a.nameEn.localeCompare(b.nameEn),
  );
  return [def, ...rest];
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
