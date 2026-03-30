import Image from "next/image";
import type { Messages } from "@/lib/i18n";
import { serviceSlugs } from "@/lib/service-details";
import {
  Briefcase,
  Code,
  Hash,
  Mail,
  MapPin,
  Monitor,
  PenTool,
  Smartphone,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import SectionTitle from "../ui/SectionTitle";

const serviceImages = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
];

const serviceIcons: LucideIcon[] = [Code, Smartphone, Monitor, PenTool, Hash, Briefcase, MapPin];

export function ServicesSection({
  locale,
  t,
}: {
  locale: "ar" | "en";
  t: Messages["services"];
}) {
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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <ScrollReveal key={item.title} delayMs={60 + i * 40}>
              <article className="svc-card group">
                <div className="svc-card__data">
                  <Image
                    className="svc-card__image"
                    src={serviceImages[i % serviceImages.length]}
                    alt={item.title}
                    width={1200}
                    height={675}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="svc-card__social">
                    <a href="#contact" aria-label="Contact">
                      {(() => {
                        const Icon = serviceIcons[i % serviceIcons.length];
                        return <Icon size={16} strokeWidth={1.8} />;
                      })()}
                    </a>
                    <a href="#contact" aria-label="Contact us">
                      <Mail size={16} strokeWidth={1.8} />
                    </a>
                    <a href="#packages" aria-label="View packages">
                      <Tags size={16} strokeWidth={1.8} />
                    </a>
                  </div>
                  <div className="svc-card__info">
                    <h3 className="svc-card__title">{item.title}</h3>
                    <p className="svc-card__desc">{item.desc}</p>
                    <p className="svc-card__more">{item.more}</p>
                    <a href={`/${locale}/services/${serviceSlugs[i % serviceSlugs.length]}`} className="svc-card__btn">
                      {t.moreCta}
                    </a>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}


