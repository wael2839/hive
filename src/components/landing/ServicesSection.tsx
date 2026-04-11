import Image from "next/image";
import type { Locale, Messages } from "@/lib/i18n";
import { serviceSlugs, type ServiceSlug } from "@/lib/service-details";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";
import { SectionDivider } from "./SectionDivider";

/** صور الخدمات من `public/` — مرتبطة بـ `serviceSlugs` */
const SERVICE_IMAGES: Record<ServiceSlug, string> = {
  "web-apps": "/webapps.png",
  "mobile-apps": "/mobileapps.png",
  "desktop-apps": "/desktopapps.png",
  "visual-identity": "/graphicdesign.png",
  "office-services": "/desktopservices.png",
  "google-maps": "/googlemaps.png",
};

/** أبعاد أصغر للشبكة (أداء LCP/الشبكة على الموبايل) — `sizes` يطابق أعمدة البطاقات */

export function ServicesSection({ locale, t }: { locale: Locale; t: Messages["services"] }) {
  return (
    <section
      id="services"
      className="bg-[var(--hive-bg2)]  relative py-15 sm:py-15 scroll-mt-28 sm:scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <SectionTitle>{t.title}</SectionTitle>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const slug = serviceSlugs[i % serviceSlugs.length];
            return (
              <ScrollReveal
                key={item.title}
                delayMs={60 + i * 40}
                className="h-full min-h-0 w-full min-w-0 self-stretch"
              >
                <article className="svc-card flex h-full min-h-0 w-full flex-col">
                  <div className="svc-card__data">
                    <div className="svc-card__media">
                      <Image
                        className="svc-card__image"
                        src={SERVICE_IMAGES[slug]}
                        alt={item.title}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        quality={72}
                        fetchPriority={i === 0 ? "high" : "low"}
                      />
                      <a
                        className="svc-card__top-more"
                        href={`/${locale}/services/${slug}`}
                      >
                        {t.moreCta}
                      </a>
                    </div>
                    <div className="relative w-[70%] mx-auto">
                    <SectionDivider className="absolute w-full "/>
                    </div>
                    <div className="svc-card__info  ">

                      <h3 className="svc-card__title">{item.title}</h3>
                      <p className="svc-card__excerpt">
                        {item.desc} {item.more}
                      </p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


