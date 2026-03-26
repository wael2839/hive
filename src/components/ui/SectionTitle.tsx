"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({ children, className }: Props) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || active) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActive(true); // trigger once when title itself enters viewport
        obs.unobserve(entry.target);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -18% 0px",
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [active]);

  return (
    <h2 ref={ref} className={`main-title ${active ? "is-active" : ""} ${className ?? ""}`}>
      <span className="text-accent">{children}</span>
    </h2>
  );
}