"use client";

import { useEffect } from "react";

export function HeroHexCursorEffect() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

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
    const isCoarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const startTick = () => {
      if (isTicking) return;
      isTicking = true;
      rafId = requestAnimationFrame(tick);
    };

    const tick = () => {
      const shouldStayVisible = isInside || performance.now() < lingerUntil;

      // Smooth movement so highlighted hex borders fade naturally while moving.
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
      if (isCoarsePointer) {
        currentX = x;
        currentY = y;
        targetX = x;
        targetY = y;
        hoverValue = 1;
        hero.style.setProperty("--hive-hero-mx", `${x}px`);
        hero.style.setProperty("--hive-hero-my", `${y}px`);
        hero.style.setProperty("--hive-hero-hover", "1");
        return;
      }

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
      if (isCoarsePointer) {
        hoverValue = 0;
        hero.style.setProperty("--hive-hero-hover", "0");
        return;
      }
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
