import type { Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";

const statKeys = [
  { valueKey: "stat1" as const, labelKey: "stat1Label" as const },
  { valueKey: "stat2" as const, labelKey: "stat2Label" as const },
  { valueKey: "stat3" as const, labelKey: "stat3Label" as const },
];

export function AboutSection({ t }: { t: Messages["about"] }) {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-hive-border-subtle bg-hive-black py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hive-gold/35 to-transparent" />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(189,169,87,0.12),transparent_68%)] sm:-right-20 lg:right-0"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,232,140,0.06),transparent_70%)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <p className="hive-cta-hex hive-badge-hex hive-cta-hex--outline inline-flex w-fit items-center bg-[var(--hive-pill-bg)] px-5 py-2.5 text-base font-semibold uppercase tracking-[0.2em] text-hive-gold-light/90">
              {t.kicker}
            </p>
            <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-hive-off-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
              {t.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-hive-off-white/60 light:text-neutral-600 sm:text-lg">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={70}>
          <div className="mx-auto mt-8 max-w-3xl lg:mt-8">
            <p className="text-pretty text-start text-lg leading-[1.75] text-hive-off-white/85 light:text-neutral-800 sm:text-xl">
              {t.body}
            </p>

            {/* <div className="mt-10 flex flex-wrap justify-center gap-2.5">
              {t.pillars.map((label) => (
                <span
                  key={label}
                  className="hive-cta-hex hive-badge-hex hive-cta-hex--outline inline-flex items-center bg-[var(--hive-pill-bg)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-hive-off-white/90 light:bg-white/90 light:text-neutral-800"
                >
                  {label}
                </span>
              ))}
            </div> */}

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {statKeys.map(({ valueKey, labelKey }) => (
                <div
                  key={labelKey}
                  className="group relative overflow-hidden rounded-2xl border border-hive-border bg-[var(--hive-card-glass)] p-6 text-center transition-colors duration-300 hover:border-hive-gold/25 light:hover:border-[#c4b896]/40 sm:text-start"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hive-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-hive-gold-light via-hive-gold to-[#8a7a45] bg-clip-text sm:text-4xl light:from-[#6e5f1a] light:via-[#8a7524] light:to-[#5c4a12]">
                    {t[valueKey]}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-hive-off-white/50 light:text-neutral-600">
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
