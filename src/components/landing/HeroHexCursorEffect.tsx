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
    const COARSE_FOLLOW = 0.2;
    const HOVER_IN_OUT = 0.08;
    const HOVER_IN_OUT_COARSE = 0.28;
    const LEAVE_LINGER_MS = 220;
    const LEAVE_LINGER_MS_COARSE = 280;
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
      const follow = isCoarsePointer ? COARSE_FOLLOW : MAIN_FOLLOW;
      currentX += (targetX - currentX) * follow;
      currentY += (targetY - currentY) * follow;
      const hoverLerp = isCoarsePointer ? HOVER_IN_OUT_COARSE : HOVER_IN_OUT;
      hoverValue += ((shouldStayVisible ? 1 : 0) - hoverValue) * hoverLerp;

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
      if (isCoarsePointer) {
        // Keep touch responsive while avoiding hard jumps between taps.
        if (hoverValue < 0.08) {
          currentX = x;
          currentY = y;
        }
        hoverValue = Math.max(hoverValue, 1);
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

    const onPointerDown = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      isInside = true;
      if (isCoarsePointer) {
        // First tap: show immediately. Next taps: keep smooth travel to new target.
        targetX = x;
        targetY = y;
        if (hoverValue < 0.08) {
          currentX = x;
          currentY = y;
          hoverValue = 1;
        } else {
          hoverValue = Math.max(hoverValue, 0.94);
        }
        hero.style.setProperty("--hive-hero-mx", `${x}px`);
        hero.style.setProperty("--hive-hero-my", `${y}px`);
        hero.style.setProperty("--hive-hero-hover", `${hoverValue}`);
      }
      updateCursorVars(x, y);
      startTick();
    };

    const onPointerLeave = () => {
      isInside = false;
      if (isCoarsePointer) {
        lingerUntil = performance.now() + LEAVE_LINGER_MS_COARSE;
        startTick();
        return;
      }
      lingerUntil = performance.now() + LEAVE_LINGER_MS;
      startTick();
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerenter", onPointerEnter);
    hero.addEventListener("pointerdown", onPointerDown);
    hero.addEventListener("pointerleave", onPointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerenter", onPointerEnter);
      hero.removeEventListener("pointerdown", onPointerDown);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return null;
}
