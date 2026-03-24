"use client";

import { useState } from "react";
import type { Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";

export function PortfolioSection({ t }: { t: Messages["portfolio"] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      className="hive-section-main relative border-t border-hive-border-subtle py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <p className="hive-cta-hex hive-badge-hex hive-cta-hex--outline inline-flex w-fit items-center bg-[var(--hive-pill-bg)] px-5 py-2.5 text-base font-semibold uppercase tracking-[0.2em] text-hive-gold-light/90">
              {t.kicker}
            </p>
              <h2 className="mt-6 max-w-2xl text-3xl font-bold tracking-tight text-hive-off-white sm:text-4xl">
              {t.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {t.items.map((item, i) => {
            const sizes = ["h-64", "h-52", "h-72", "h-56", "h-68", "h-60", "h-64", "h-52"];
            const h = sizes[i % sizes.length];
            const isActive = active === i;
            return (
              <ScrollReveal key={item.name} delayMs={40 + (i % 5) * 35}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group mb-5 w-full break-inside-avoid text-start focus:outline-none"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl border transition duration-500 ${isActive ? "border-hive-gold/50" : "border-hive-border"}`}
                  >
                    <div
                      className={`relative ${h} w-full max-w-none overflow-hidden rounded-2xl bg-gradient-to-br from-hive-border/30 to-transparent light:from-hive-border/40`}
                    >
                      <div
                        className="absolute inset-0 opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                        style={{
                          backgroundImage: [
                            "linear-gradient(135deg, var(--hive-portfolio-a), var(--hive-portfolio-b))",
                            `radial-gradient(circle at ${30 + (i * 7) % 40}% ${20 + (i * 11) % 50}%, rgba(255,232,140,0.22), transparent 55%)`,
                            `radial-gradient(circle at ${70 - (i * 5) % 30}% ${60 + (i * 3) % 30}%, rgba(189,169,87,0.28), transparent 60%)`,
                          ].join(", "),
                        }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--hive-portfolio-bottom),transparent_45%)]" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="hive-cta-hex hive-badge-hex hive-cta-hex--outline inline-flex w-fit items-center bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-hive-gold-light/95 backdrop-blur-sm">
                          {item.tag}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-hive-off-white">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
