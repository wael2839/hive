import type { Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";

const statKeys = [
  { valueKey: "stat1" as const, labelKey: "stat1Label" as const },
  { valueKey: "stat2" as const, labelKey: "stat2Label" as const },
  { valueKey: "stat3" as const, labelKey: "stat3Label" as const },
];

export function AboutSection({ t }: { t: Messages["about"] }) {
  return (
    <section
      id="about"
      className="hive-section-main relative overflow-hidden border-t border-hive-border-subtle py-15 sm:py-15"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hive-gold/35 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <SectionTitle>{t.kicker}</SectionTitle>
           
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-hive-off-white/65 light:text-neutral-600 sm:text-lg">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={70}>
          <div className="mx-auto mt-8 max-w-3xl lg:mt-8">
            <p className="text-pretty text-start text-lg leading-9 text-hive-off-white/85 light:text-neutral-800">
              {t.body}
            </p>

            {/* <div className="mt-10 flex flex-wrap justify-center gap-2.5">
              {t.pillars.map((label) => (
                <span
                  key={label}
                  className="hive-cta-hex hive-badge-hex rounded-md hive-cta-hex--outline inline-flex items-center bg-[var(--hive-pill-bg)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-hive-off-white/90 light:bg-white/90 light:text-neutral-800"
                >
                  {label}
                </span>
              ))}
            </div> */}

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {statKeys.map(({ valueKey, labelKey }) => (
                <div
                  key={labelKey}
                  className="group relative min-h-[148px] overflow-hidden rounded-md border border-hive-border bg-[var(--hive-card-glass)] p-6 text-center transition-colors duration-300 hover:border-hive-gold/25 light:hover:border-[#c4b896]/40 sm:text-start"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hive-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="text-xl font-bold tracking-tight text-transparent bg-gradient-to-r from-hive-gold-light via-hive-gold to-[#8a7a45] bg-clip-text sm:text-2xl light:from-[#6e5f1a] light:via-[#8a7524] light:to-[#5c4a12]">
                    {t[valueKey]}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-hive-off-white/65 light:text-neutral-600">
                    {t[labelKey]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


