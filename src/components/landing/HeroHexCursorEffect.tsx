"use client";

import { useEffect } from "react";

/**
 * تأثير تتبع موضع التوهج على شبكة الـ hero.
 * مسار واحد: حلقة RAF (تموضع سلس + تلاشٍ expo).
 * على اللمس: لا نستخدم pointerleave للخروج (غالباً مزيف/مجدول فوراً)، بل pointerup بالتقاط على document.
 */
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

    let touchEngaged = false;
    let activeTouchId: number | null = null;

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

    const onPointerDownCapture = (event: PointerEvent) => {
      const t = event.target;
      if (!(t instanceof Node) || !hero.contains(t)) return;

      isInside = true;
      if (event.pointerType === "touch") {
        if (!touchEngaged) {
          touchEngaged = true;
          activeTouchId = event.pointerId;
        }
      }
      const rect = hero.getBoundingClientRect();
      updateCursorVars(event.clientX - rect.left, event.clientY - rect.top);
    };

    const onDocumentPointerEndCapture = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      if (!touchEngaged || event.pointerId !== activeTouchId) return;
      touchEngaged = false;
      activeTouchId = null;
      isInside = false;
      lingerUntil = performance.now() + LEAVE_LINGER_MS;
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

    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      isInside = false;
      lingerUntil = performance.now() + LEAVE_LINGER_MS;
      startTick();
    };

    hero.addEventListener("pointerdown", onPointerDownCapture, true);
    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerenter", onPointerEnter);
    hero.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerup", onDocumentPointerEndCapture, true);
    document.addEventListener("pointercancel", onDocumentPointerEndCapture, true);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      hero.removeEventListener("pointerdown", onPointerDownCapture, true);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerenter", onPointerEnter);
      hero.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerup", onDocumentPointerEndCapture, true);
      document.removeEventListener("pointercancel", onDocumentPointerEndCapture, true);
    };
  }, []);

  return null;
}
