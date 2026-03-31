"use client";

import { useEffect, useRef } from "react";
import type { Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";

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
      className="bg-[var(--hive-bg)] relative overflow-hidden py-15 sm:py-15 scroll-mt-28 sm:scroll-mt-40"
    >
      <div
        ref={bg}
        className="pointer-events-none absolute inset-0 opacity-90"
        
      />
      <div className="pointer-events-none absolute inset-0 hive-noise opacity-50" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <SectionTitle>{t.title}</SectionTitle>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-hive-off-white/76 light:text-neutral-700 sm:text-xl">
              {t.body}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-hive-black to-transparent" />
    </section>
  );
}


