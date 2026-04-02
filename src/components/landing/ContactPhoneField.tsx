"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  countryFlagSrc,
  DEFAULT_COUNTRY_ISO,
  getCountriesSorted,
  getCountryByIso,
  normalizeNationalDigits,
  resolveCountryFromDialDigits,
} from "@/lib/country-dial-codes";
import type { Locale } from "@/lib/i18n";
import countryPhonePlaceholders from "@/lib/country-phone-placeholders.json";

type Props = {
  locale: Locale;
  phoneLabel: string;
  phonePlaceholder: string;
  countryAria: string;
  countryListAria: string;
  onInteract?: () => void;
};

const shellClass =
  "flex h-[44px] w-max max-w-full shrink-0 items-stretch overflow-hidden rounded-md border border-hive-border bg-[var(--hive-bg)] outline-none transition focus-within:border-hive-gold/50 light:bg-white";

const dialInputClass =
  "w-[3.5rem] shrink-0 border-0 bg-transparent px-0.5 py-2 text-start text-sm text-hive-off-white outline-none ring-0 focus:ring-0 sm:w-[3rem] sm:px-1 light:text-neutral-900";

const listClass =
  "absolute z-30 mt-1 max-h-60 min-w-[min(100vw-2rem,18rem)] w-max max-w-[min(100vw-2rem,20rem)] overflow-auto rounded-md border border-hive-border bg-[var(--hive-bg)] py-1 light:bg-white";

const optionClass =
  "flex w-full items-center gap-2 px-3 py-2.5 text-start text-sm text-hive-off-white/90 transition hover:bg-neutral-800 hover:text-hive-gold-light light:text-neutral-800 light:hover:bg-neutral-100 light:hover:text-neutral-900";

const optionSelectedClass =
  "bg-neutral-800 text-hive-gold-light light:bg-amber-100 light:text-neutral-900";

const telClass =
  "min-h-[44px] min-w-0 flex-1 rounded-md border border-hive-border bg-[var(--hive-bg)] px-3.5 py-2.5 text-sm text-hive-off-white outline-none transition placeholder:text-hive-off-white/35 focus:border-hive-gold/50 focus:outline-none light:bg-white light:text-neutral-900 light:placeholder:text-neutral-500";

export function ContactPhoneField({
  locale,
  phoneLabel,
  phonePlaceholder,
  countryAria,
  countryListAria,
  onInteract,
}: Props) {
  const [countryOpen, setCountryOpen] = useState(false);
  const [iso, setIso] = useState(DEFAULT_COUNTRY_ISO);
  const [dialBuffer, setDialBuffer] = useState<string | null>(null);
  const [national, setNational] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const countryWrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const dialInputId = useId();
  const groupLabelId = useId();

  const countries = useMemo(() => getCountriesSorted(locale), [locale]);
  const entry = getCountryByIso(iso) ?? getCountryByIso(DEFAULT_COUNTRY_ISO)!;

  const dialDisplay =
    dialBuffer !== null ? dialBuffer : `+${entry.dial}`;

  const composed = useMemo(() => {
    const n = normalizeNationalDigits(entry.dial, national);
    if (!n) return "";
    return `+${entry.dial}${n}`;
  }, [entry.dial, national]);

  const nationalPlaceholder =
    (countryPhonePlaceholders as Record<string, string | undefined>)[iso] ??
    phonePlaceholder;

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;
    const onReset = () => {
      setIso(DEFAULT_COUNTRY_ISO);
      setDialBuffer(null);
      setNational("");
      setCountryOpen(false);
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  useEffect(() => {
    if (!countryOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!countryWrapRef.current?.contains(e.target as Node))
        setCountryOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [countryOpen]);

  function pickCountry(nextIso: string) {
    setIso(nextIso);
    setDialBuffer(null);
    setCountryOpen(false);
    onInteract?.();
  }

  function commitDialFromString(raw: string) {
    const digits = raw.replace(/\D/g, "");
    const resolved = resolveCountryFromDialDigits(digits);
    if (resolved) setIso(resolved.iso);
  }

  return (
    <div ref={rootRef} className="block" role="group" aria-labelledby={groupLabelId}>
      <span
        id={groupLabelId}
        className="block text-sm font-medium text-hive-off-white/85 light:text-neutral-800"
      >
        {phoneLabel}
      </span>
      <div
        className="mt-1.5 flex flex-row flex-nowrap items-stretch gap-2"
        dir="ltr"
      >
        <input type="hidden" name="phone" value={composed} />

        <div ref={countryWrapRef} className="relative w-max max-w-full shrink-0">
          <div className={shellClass}>
            <span className="flex shrink-0 items-center border-e border-hive-border px-1 sm:px-1.5 light:border-neutral-200">
              <Image
                src={countryFlagSrc(entry.iso, "24x18")}
                width={24}
                height={18}
                alt=""
                className="h-[1.15rem] w-auto rounded-[2px] object-cover"
                unoptimized
              />
            </span>
            <input
              id={dialInputId}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              dir="ltr"
              className={`${dialInputClass} tabular-nums `}
              value={dialDisplay}
              aria-label={countryAria}
              onFocus={() => {
                setDialBuffer(`+${getCountryByIso(iso)!.dial}`);
              }}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "");
                const next = digitsOnly.length > 0 ? `+${digitsOnly}` : "+";
                setDialBuffer(next);
                const resolved = resolveCountryFromDialDigits(digitsOnly);
                if (resolved) {
                  setIso(resolved.iso);
                  onInteract?.();
                }
              }}
              onBlur={() => {
                const raw =
                  dialBuffer !== null ? dialBuffer : `+${entry.dial}`;
                commitDialFromString(raw);
                setDialBuffer(null);
                onInteract?.();
              }}
            />
            <button
              type="button"
              className="flex shrink-0 items-center border-s border-hive-border px-1 sm:px-1.5 text-hive-gold transition hover:bg-[var(--hive-hover-surface)] light:border-neutral-200"
              aria-label={countryListAria}
              aria-expanded={countryOpen}
              aria-controls={listId}
              aria-haspopup="listbox"
              onClick={() => setCountryOpen((o) => !o)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setCountryOpen(false);
              }}
            >
              <span
                className={`transition-transform duration-200 ${
                  countryOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              >
                <svg
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
          </div>

          {countryOpen ? (
            <ul
              id={listId}
              role="listbox"
              aria-labelledby={dialInputId}
              className={listClass}
            >
              {countries.map((c) => (
                <li key={c.iso} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={iso === c.iso}
                    className={`${optionClass} ${
                      iso === c.iso ? optionSelectedClass : ""
                    }`}
                    onClick={() => pickCountry(c.iso)}
                  >
                    <Image
                      src={countryFlagSrc(c.iso, "24x18")}
                      width={24}
                      height={18}
                      alt=""
                      className="h-[1.15rem] w-auto shrink-0 rounded-[2px] object-cover"
                      unoptimized
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {locale === "ar" ? c.nameAr : c.nameEn}
                    </span>
                    <span
                      className="shrink-0 tabular-nums text-hive-off-white/70 light:text-neutral-600"
                      dir="ltr"
                    >
                      +{c.dial}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <input
          type="tel"
          autoComplete="tel-national"
          inputMode="numeric"
          placeholder={nationalPlaceholder}
          value={national}
          dir="ltr"
          className={telClass}
          onChange={(e) => {
            setNational(e.target.value);
            onInteract?.();
          }}
        />
      </div>
    </div>
  );
}
