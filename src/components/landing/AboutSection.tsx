"use client";

import {
  IconBadgeCheck,
  IconCalendarClock,
  IconFolderCheck,
  IconLightbulb,
  IconSparkles,
  IconTarget,
} from "@/components/icons/MiniUiIcons";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale, Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";

const featureIcons = [IconSparkles, IconLightbulb, IconTarget];

export function AboutSection({
  t,
  locale,
}: {
  t: Messages["about"];
  locale: Locale;
}) {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);

  const statTargets = useMemo(() => [50, 5, 98], []);

  useEffect(() => {
    const node = statsRef.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const durationMs = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) * (1 - progress);

      setCounts(statTargets.map((target) => Math.round(target * eased)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasAnimated, statTargets]);

  const statLabels =
    locale === "ar"
      ? [
          "إجمالي المشاريع المكتملة",
          "سنوات من الخبرة",
          "معدل رضا العملاء",
        ]
      : [
          "Total Projects Completed",
          "Years of experience",
          "Client Satisfaction Rate",
        ];
  const featureLabels =
    locale === "ar"
      ? ["إبداع", "ابتكار", "استراتيجية"]
      : ["Creativity", "Innovation", "Strategy"];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[var(--hive-bg2)] py-18 scroll-mt-28 sm:scroll-mt-10"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <SectionTitle>{t.title}</SectionTitle>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-hive-off-white leading-10  sm:text-2xl">
              {t.body}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={70}>
          <div className="mx-auto mt-10 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-10 lg:gap-20">
              {featureLabels.map((label, idx) => {
                const Icon = featureIcons[idx] ?? IconSparkles;
                return (
                  <article
                    key={label}
                    className="min-w-36  inline-flex items-center justify-center gap-3 rounded-full border border-hive-border/70 bg-[var(--hive-bg)]! px-5 py-2.5 text-[var(--hive-fg)] shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm light:bg-white/80 light:shadow-[0_8px_22px_rgba(0,0,0,0.06)]"
                  >
                    <span className=" inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffe88c_0%,#d3b85a_55%,#8a6f1e_100%)] text-white  light:text-neutral-900 light:bg-[linear-gradient(135deg,var(--hive-btn-to),var(--hive-btn-from))]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className=" text-md sm:text-lg text-center ">{label}</span>
                  </article>
                );
              })}
            </div>

            <div
              ref={statsRef}
              className="mt-12 grid overflow-hidden rounded-2xl border border-hive-border bg-[var(--hive-bg)] backdrop-blur-sm md:grid-cols-3"
            >
              <div className="px-6 py-8 text-center md:border-e md:border-hive-border">
                <span className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffe88c_0%,#d3b85a_55%,#8a6f1e_100%)] text-white  light:text-neutral-900 light:bg-[linear-gradient(135deg,var(--hive-btn-to),var(--hive-btn-from))]">
                  <IconFolderCheck className="h-5 w-5" />
                </span>
                <p className="text-5xl font-semibold tracking-tight text-[var(--hive-fg)]">
                  {counts[0]}+
                </p>
                <p className="mt-2 text-sm text-hive-off-white/60 light:text-neutral-600">{statLabels[0]}</p>
              </div>
              <div className="px-6 py-8 text-center md:border-e md:border-hive-border">
                <span className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffe88c_0%,#d3b85a_55%,#8a6f1e_100%)] text-white  light:text-neutral-900 light:bg-[linear-gradient(135deg,var(--hive-btn-to),var(--hive-btn-from))]">
                  <IconCalendarClock className="h-5 w-5" />
                </span>
                <p className="text-5xl font-semibold tracking-tight text-[var(--hive-fg)]">
                  {counts[1]}+
                </p>
                <p className="mt-2 text-sm text-hive-off-white/60 light:text-neutral-600">{statLabels[1]}</p>
              </div>
              <div className="px-6 py-8 text-center">
                <span className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffe88c_0%,#d3b85a_55%,#8a6f1e_100%)] text-white  light:text-neutral-900 light:bg-[linear-gradient(135deg,var(--hive-btn-to),var(--hive-btn-from))]">
                  <IconBadgeCheck className="h-5 w-5" />
                </span>
                <p className="text-5xl font-semibold tracking-tight text-[var(--hive-fg)]">
                  {counts[2]}%
                </p>
                <p className="mt-2 text-sm text-hive-off-white/60 light:text-neutral-600">{statLabels[2]}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


