"use client";

import { useEffect, useRef } from "react";
import type { Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";

export function VisionSection({ t }: { t: Messages["vision"] }) {
  const bg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bg.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = 1 - Math.min(Math.max((rect.top + rect.height / 2) / (vh + rect.height), 0), 1);
      const y = (p - 0.5) * 36;
      el.style.setProperty("--parallax", `${y}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="vision"
      className="hive-section-main relative overflow-hidden border-t border-hive-border-subtle py-28 sm:py-36"
    >
      <div
        ref={bg}
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          transform: "translate3d(0, var(--parallax, 0px), 0)",
          transition: "transform 0.1s linear",
          backgroundImage:
            "linear-gradient(to bottom, var(--hive-vision-overlay), var(--hive-vision-overlay))",
        }}
      />
      <div className="pointer-events-none absolute inset-0 hive-noise opacity-50" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <p className="hive-cta-hex hive-badge-hex hive-cta-hex--outline inline-flex w-fit items-center bg-[var(--hive-pill-bg)] px-5 py-2.5 text-base font-semibold uppercase tracking-[0.25em] text-hive-gold-light/90">
              {t.kicker}
            </p>
            <h2 className="mt-6 max-w-3xl text-balance text-3xl font-bold tracking-tight text-hive-off-white sm:text-4xl lg:text-5xl">
              {t.title}
            </h2>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-hive-off-white/72 light:text-neutral-700 sm:text-xl">
              {t.body}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-hive-black to-transparent" />
    </section>
  );
}
