import type { Messages } from "@/lib/i18n";
import { HeroHexCursorEffect } from "@/components/landing/HeroHexCursorEffect";

type Props = {
  t: Messages["hero"];
};

export function HeroSection({ t }: Props) {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-hive-black light:bg-[#F0F0F0] pt-28"
    >
      <HeroHexCursorEffect />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="hive-hero-hex-grid-dark absolute inset-0" />
        <div className="hive-hero-hex-grid-light absolute inset-0" />
        <div className="hive-hero-vignette absolute inset-0" />
        <div className="hive-hero-hex-highlight hive-hero-hex-highlight--dark absolute inset-0" />
        <div className="hive-hero-hex-highlight hive-hero-hex-highlight--light absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-4xl items-center justify-center px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative flex w-full min-w-0 flex-col items-center text-center">
          <p className="hive-cta-hex hive-badge-hex rounded-md  mb-4 inline-flex items-center gap-2 bg-[var(--hive-pill-bg)] px-4 py-2 text-sm font-bold  text-hive-gold-light sm:px-8 sm:py-2.5 sm:text-4xl border-0">
            {t.kicker}
          </p>
          <h1 className="mt-4 w-full flex flex-col justify-center items-center text-balance text-[2.1rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl sm:leading-[1.06] lg:text-6xl">
            <span className="block text-hive-off-white text-start me-[25%]"><span className="text-hive-gold text-6xl sm:text-8xl">&quot;</span>{t.title}<span className="text-hive-gold">&#1548;</span></span>
            <span className="mt-4 block bg-hive-gold bg-clip-text text-transparent animate-hive-float sm:mt-6  text-start ms-[25%]">
              {t.titleAccent}
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-hive-off-white/75 light:text-neutral-700 sm:text-lg">
            {t.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#portfolio"
              className="hive-cta-hex rounded-md inline-flex items-center justify-center bg-gradient-to-r from-hive-btn-from to-hive-btn-to px-8 py-3 text-sm font-semibold text-neutral-900 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
            >
              {t.primary}
            </a>
            <a
              href="#about"
              className="hive-cta-hex rounded-md inline-flex items-center justify-center bg-[var(--hive-pill-bg)] px-8 py-3 text-sm font-semibold text-hive-off-white transition hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
            >
              {t.secondary}
            </a>
          </div>
        </div>

      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-hive-off-white/35 light:text-neutral-500">
        <div className="hive-scroll-cue flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="relative flex h-10 w-6 shrink-0 items-center justify-center">
            <span className="hive-scroll-cue-glow rounded-md" aria-hidden />
            <span className="relative z-[1] h-10 w-px bg-gradient-to-b from-hive-gold/60 to-transparent light:from-[#6e5f1a]/70" />
          </div>
        </div>
      </div>
    </section>
  );
}



