"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function ScrollReveal({ children, className = "", delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let io: IntersectionObserver | null = null;

    const revealIfInView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const visible =
        r.top < vh * 0.98 &&
        r.bottom > vh * 0.02 &&
        r.width > 0 &&
        r.height > 0;
      if (visible) {
        setVisible(true);
        io?.disconnect();
      }
    };

    io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io?.disconnect();
        }
      },
      /* بدون هامش سالب أسفل — على الجوال كان العنصر أحياناً لا يُعتبر ظاهراً فتبقى opacity-0 */
      { threshold: 0.05, rootMargin: "0px 0px 32px 0px" },
    );
    io.observe(el);

    /** بعد الرجوع من الصفحة السابقة (bfcache) قد لا يُستدعَى IntersectionObserver من جديد */
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        requestAnimationFrame(() => revealIfInView());
      }
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      io?.disconnect();
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transform-gpu transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
