import type { Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";

export function ServicesSection({ t }: { t: Messages["services"] }) {
  return (
    <section
      id="services"
      className="hive-bg-services hive-section-alt relative border-t border-hive-border-subtle py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <p className="hive-cta-hex hive-badge-hex rounded-md hive-cta-hex--outline inline-flex w-fit items-center bg-[var(--hive-pill-bg)] px-5 py-2.5 text-base font-semibold uppercase tracking-[0.2em] text-hive-gold-light/90">
              {t.kicker}
            </p>
            <h2 className="mt-6 max-w-2xl text-3xl font-bold tracking-tight text-hive-off-white sm:text-4xl">
              {t.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <ScrollReveal key={item.title} delayMs={60 + i * 40}>
              <article className="service-card group relative overflow-hidden rounded-md border border-hive-border bg-[var(--hive-card-glass)] p-7">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-md bg-[radial-gradient(circle_at_center,rgba(255,232,140,0.14),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md border border-hive-gold/25 bg-gradient-to-br from-hive-gold/25 to-transparent text-sm font-bold text-hive-gold-light">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-hive-black/40 text-[11px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-hive-off-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-hive-off-white/65 light:text-neutral-600">
                  {item.desc}
                </p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-hive-gold/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


