"use client";

import { useEffect, useRef } from "react";
import type { Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";
import { VisionHexCard } from "./VisionHexCard";

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

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
            <SectionTitle>{t.title}</SectionTitle>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <div className="mx-auto mt-8 grid max-w-none gap-3 overflow-y-visible sm:mt-10 sm:gap-4 md:items-stretch lg:mt-12 lg:grid-cols-3 lg:gap-8 ">
            <VisionHexCard title={c0?.title ?? ""} body={c0?.body ?? ""} />
            <VisionHexCard title={c1?.title ?? ""} body={c1?.body ?? ""} />
            <VisionHexCard title={c2?.title ?? ""} body={c2?.body ?? ""} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


