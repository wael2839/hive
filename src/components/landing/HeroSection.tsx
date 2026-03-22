import Image from "next/image";
import type { Messages } from "@/lib/i18n";

type Props = {
  t: Messages["hero"];
};

export function HeroSection({ t }: Props) {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-hive-black pt-28"
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-24 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 xl:gap-14">
        <div className="relative mt-6 flex w-full min-w-0 flex-col items-start text-start sm:mt-8 lg:mt-0 lg:max-w-none">
          <p className="hive-cta-hex hive-badge-hex hive-cta-hex--outline mb-4 inline-flex items-center gap-2 bg-[var(--hive-pill-bg)] px-5 py-2.5 text-base font-semibold uppercase tracking-[0.2em] text-hive-gold-light">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hive-gold" />
            {t.kicker}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-hive-off-white ">{t.title}</span>
            <span className="mt-8 block bg-gradient-to-r from-hive-gold-light via-hive-gold to-[#8a7a45] bg-clip-text text-transparent animate-hive-float light:from-[#5c4a12] light:via-[#735f18] light:to-[#3a300c]">
              {t.titleAccent}
            </span>
          </h1>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-hive-off-white/75 light:text-neutral-700 sm:text-lg">
            {t.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap justify-start gap-4">
            <a
              href="#portfolio"
              className="hive-cta-hex inline-flex items-center justify-center bg-gradient-to-r from-hive-btn-from to-hive-btn-to px-8 py-3 text-sm font-semibold text-neutral-900 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
            >
              {t.primary}
            </a>
            <a
              href="#about"
              className="hive-cta-hex hive-cta-hex--outline inline-flex items-center justify-center bg-[var(--hive-pill-bg)] px-8 py-3 text-sm font-semibold text-hive-off-white transition hover:text-hive-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hive-gold"
            >
              {t.secondary}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg min-w-0 justify-self-center sm:max-w-xl lg:mx-0 lg:max-w-none lg:justify-self-end">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-[min(72svh,560px)] lg:min-h-[280px] xl:min-h-[320px]">
            <Image
              src="/hero_img.png"
              alt={t.imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1023px) 90vw, 50vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-hive-off-white/35 light:text-neutral-500">
        <div className="hive-scroll-cue flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="relative flex h-10 w-6 shrink-0 items-center justify-center">
            <span className="hive-scroll-cue-glow" aria-hidden />
            <span className="relative z-[1] h-10 w-px bg-gradient-to-b from-hive-gold/60 to-transparent light:from-[#6e5f1a]/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
