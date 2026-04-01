"use client";

import { useEffect, useRef } from "react";
import type { Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";

export function VisionSection({ t }: { t: Messages["vision"] }) {
  const c0 = t.cards[0];
  const c1 = t.cards[1];
  const c2 = t.cards[2];
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
      className="bg-[var(--hive-bg)] relative overflow-hidden py-15 sm:py-15 scroll-mt-28 sm:scroll-mt-40"
    >
      <div
        ref={bg}
        className="pointer-events-none absolute inset-0 opacity-90"
        
      />
      <div className="pointer-events-none absolute inset-0 hive-noise opacity-50" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-30!">
            <SectionTitle>{t.title}</SectionTitle>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <div className="mx-auto  overflow-y-visible mt-12 grid max-w-6xl gap-6 sm:gap-7 md:grid-cols-3 md:items-stretch md:gap-8">
            <article className="hive-vision-hex-card flex h-full w-full flex-col  ">
              <div className="hive-vision-hex-card__shell ">
                <div className="hive-vision-hex-card__frame" aria-hidden />
                <div className="hive-vision-hex-card__inner ">
                  <h3 className=" max-w-full text-balance break-words text-base font-bold leading-snug text-[var(--hive-fg)] sm:text-lg">
                    {c0?.title}
                  </h3>
                  <p className="mt-3 max-w-full text-pretty break-words text-sm leading-relaxed text-hive-off-white/88 light:text-neutral-700">
                    {c0?.body}
                  </p>
                </div>
              </div>
            </article>

            <article className="hive-vision-hex-card flex h-full w-full flex-col  ">
              <div className="hive-vision-hex-card__shell">
                <div className="hive-vision-hex-card__frame" aria-hidden />
                <div className="hive-vision-hex-card__inner">
                  <h3 className="max-w-full text-balance break-words text-base font-bold leading-snug text-[var(--hive-fg)] sm:text-lg">
                    {c1?.title}
                  </h3>
                  <p className="mt-3 max-w-full text-pretty break-words text-sm leading-relaxed text-hive-off-white/88 light:text-neutral-700">
                    {c1?.body}
                  </p>
                </div>
              </div>
            </article>

            <article className="hive-vision-hex-card flex h-full w-full flex-col ">
              <div className="hive-vision-hex-card__shell">
                <div className="hive-vision-hex-card__frame" aria-hidden />
                <div className="hive-vision-hex-card__inner">
                  <h3 className="max-w-full text-balance break-words text-base font-bold leading-snug text-[var(--hive-fg)] sm:text-lg">
                    {c2?.title}
                  </h3>
                  <p className="mt-3 max-w-full text-pretty break-words text-sm leading-relaxed text-hive-off-white/88 light:text-neutral-700">
                    {c2?.body}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


