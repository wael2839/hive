import { Lightbulb, Sparkles, Target } from "lucide-react";
import type { Locale, Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";

const featureIcons = [Sparkles, Lightbulb, Target];

export function AboutSection({
  t,
  locale,
}: {
  t: Messages["about"];
  locale: Locale;
}) {
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
      className="relative overflow-hidden border-t border-hive-border-subtle bg-[var(--hive-bg2)] py-18"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <SectionTitle>{t.title}</SectionTitle>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-hive-off-white leading-10 light:text-neutral-600 sm:text-3xl">
              {t.body}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={70}>
          <div className="mx-auto mt-10 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-10 lg:gap-20">
              {featureLabels.map((label, idx) => {
                const Icon = featureIcons[idx] ?? Sparkles;
                return (
                  <article
                    key={label}
                    className=" inline-flex items-center justify-center gap-3 rounded-full border border-hive-border/70 bg-[var(--hive-bg)] px-5 py-2.5 text-[var(--hive-fg)] shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm light:bg-white/80 light:shadow-[0_8px_22px_rgba(0,0,0,0.06)]"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-hive-gold/20 text-hive-gold light:bg-amber-100 light:text-[#6e5f1a]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-serif text-lg">{label}</span>
                  </article>
                );
              })}
            </div>

            <div className="mt-12 grid overflow-hidden rounded-2xl border border-hive-border bg-[var(--hive-bg)] backdrop-blur-sm md:grid-cols-3">
              <div className="px-6 py-8 text-center md:border-e md:border-hive-border">
                <p className="text-5xl font-semibold tracking-tight text-[var(--hive-fg)]">10k+</p>
                <p className="mt-2 text-sm text-hive-off-white/60 light:text-neutral-600">{statLabels[0]}</p>
              </div>
              <div className="px-6 py-8 text-center md:border-e md:border-hive-border">
                <p className="text-5xl font-semibold tracking-tight text-[var(--hive-fg)]">15+</p>
                <p className="mt-2 text-sm text-hive-off-white/60 light:text-neutral-600">{statLabels[1]}</p>
              </div>
              <div className="px-6 py-8 text-center">
                <p className="text-5xl font-semibold tracking-tight text-hive-gold light:text-[#6e5f1a]">98%</p>
                <p className="mt-2 text-sm text-hive-off-white/60 light:text-neutral-600">{statLabels[2]}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


