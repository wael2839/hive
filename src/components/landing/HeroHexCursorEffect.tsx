"use client";

import { useEffect } from "react";

export function HeroHexCursorEffect() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const isCoarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    /** على الشاشات اللمسية: تحديث مباشر بدون حلقة requestAnimationFrame لتقليل ضغط المعالج (TBT). */
    if (isCoarsePointer) {
      const apply = (x: number, y: number, hover: number) => {
        hero.style.setProperty("--hive-hero-mx", `${x}px`);
        hero.style.setProperty("--hive-hero-my", `${y}px`);
        hero.style.setProperty("--hive-hero-hover", `${hover}`);
      };

      const onPointerDown = (event: PointerEvent) => {
        const rect = hero.getBoundingClientRect();
        apply(event.clientX - rect.left, event.clientY - rect.top, 1);
      };

      const onPointerLeave = () => {
        hero.style.setProperty("--hive-hero-hover", "0");
      };

      hero.addEventListener("pointerdown", onPointerDown);
      hero.addEventListener("pointerleave", onPointerLeave);

      return () => {
        hero.removeEventListener("pointerdown", onPointerDown);
        hero.removeEventListener("pointerleave", onPointerLeave);
      };
    }

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hoverValue = 0;
    let isInside = false;
    let isTicking = false;
    let lingerUntil = 0;
    const MAIN_FOLLOW = 0.16;
    const HOVER_IN_OUT = 0.08;
    const LEAVE_LINGER_MS = 220;

    const startTick = () => {
      if (isTicking) return;
      isTicking = true;
      rafId = requestAnimationFrame(tick);
    };

    const tick = () => {
      const shouldStayVisible = isInside || performance.now() < lingerUntil;

      currentX += (targetX - currentX) * MAIN_FOLLOW;
      currentY += (targetY - currentY) * MAIN_FOLLOW;
      hoverValue += ((shouldStayVisible ? 1 : 0) - hoverValue) * HOVER_IN_OUT;

      hero.style.setProperty("--hive-hero-mx", `${currentX}px`);
      hero.style.setProperty("--hive-hero-my", `${currentY}px`);
      hero.style.setProperty("--hive-hero-hover", `${hoverValue}`);

      const closeToTarget =
        Math.abs(targetX - currentX) < 0.2 && Math.abs(targetY - currentY) < 0.2;
      const fullyHidden = hoverValue < 0.01;

      if (!isInside && closeToTarget && fullyHidden) {
        isTicking = false;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const updateCursorVars = (x: number, y: number) => {
      targetX = x;
      targetY = y;
      if (hoverValue === 0 && !isTicking) {
        currentX = x;
        currentY = y;
      }
      startTick();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      isInside = true;
      updateCursorVars(event.clientX - rect.left, event.clientY - rect.top);
    };

    const onPointerEnter = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      isInside = true;
      updateCursorVars(event.clientX - rect.left, event.clientY - rect.top);
    };

    const onPointerLeave = () => {
      isInside = false;
      lingerUntil = performance.now() + LEAVE_LINGER_MS;
      startTick();
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerenter", onPointerEnter);
    hero.addEventListener("pointerleave", onPointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerenter", onPointerEnter);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return null;
}
