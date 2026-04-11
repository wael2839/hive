import type { Messages } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";
import { VisionHexCard } from "./VisionHexCard";

export function VisionSection({ t }: { t: Messages["vision"] }) {
  const c0 = t.cards[0];
  const c1 = t.cards[1];
  const c2 = t.cards[2];

  return (
    <section
      id="vision"
      className="relative overflow-x-hidden bg-[var(--hive-bg)] py-15 sm:py-15 scroll-mt-28 sm:scroll-mt-40"
    >
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
