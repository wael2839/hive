import { useLayoutEffect } from "react";

/**
 * Interactive hex “lighting” on canvas — same behavior as former initHeroHexCanvas in main.js.
 */
export function useHeroHexCanvas(heroRef) {
  useLayoutEffect(() => {
    var hero = heroRef.current;
    var canvas = hero ? hero.querySelector(".hero__hex-canvas") : null;
    if (!hero || !canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    var narrowViewport =
      typeof window.innerWidth === "number" && window.innerWidth < 768;
    var hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    var perfLite =
      narrowViewport ||
      (!hasFinePointer && window.matchMedia("(pointer: coarse)").matches);

    var TILE_W = perfLite ? 72 : 56;
    var TILE_H = perfLite ? 126 : 100;
    var HEX_CX = TILE_W / 2;
    var HEX_CY = perfLite ? 42 : 33;
    var OFF_X = TILE_W / 2;
    var OFF_Y = TILE_H / 2;
    var HEX_R = perfLite ? 41 : 33;
    var MAX_WAVE = perfLite ? 2 : 3;
    var FADE_DELAY_MS = perfLite ? 260 : 320;
    var SPREAD_MS = perfLite ? 96 : 52;
    var FADE_STEPS = perfLite ? 6 : 11;
    var FADE_STEP_MS = perfLite ? 60 : 40;
    var SPARK_MIN_MS = perfLite ? 400 : 0;
    var MAX_ACTIVE_CELLS = perfLite ? 120 : 200;

    var ctx;
    try {
      ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    } catch (err) {
      ctx = null;
    }
    if (!ctx) ctx = canvas.getContext("2d");
    if (!ctx) return;

    var cells = [];
    var cellMap = new Map();
    var activeDrawList = [];
    var spreadTimers = [];
    var fadeDelayId = null;
    var fadeStepId = null;
    var fadeAlpha = 1;
    var dpr = 1;
    var heroOnScreen = true;
    var lastSparkAt = 0;
    var resizeRoTimer = null;
    var visitStamp = new Uint32Array(0);
    var visitGen = 0;
    var renderFrameId = 0;
    var hexPathLocal = null;
    var canPath2DAddPath =
      typeof Path2D !== "undefined" &&
      typeof DOMMatrix !== "undefined" &&
      typeof Path2D.prototype.addPath === "function";

    function buildHexPath2D() {
      if (typeof Path2D === "undefined") return;
      var p = new Path2D();
      var idx;
      var angle;
      var px;
      var py;
      for (idx = 0; idx < 6; idx++) {
        angle = -Math.PI / 2 + idx * (Math.PI / 3);
        px = HEX_R * Math.cos(angle);
        py = HEX_R * Math.sin(angle);
        if (idx === 0) p.moveTo(px, py);
        else p.lineTo(px, py);
      }
      p.closePath();
      hexPathLocal = p;
    }

    buildHexPath2D();

    function clearActiveCells() {
      var i;
      for (i = 0; i < activeDrawList.length; i++) {
        activeDrawList[i].active = false;
        activeDrawList[i].wave = 0;
      }
      activeDrawList.length = 0;
    }

    function cancelFade() {
      if (fadeDelayId) {
        clearTimeout(fadeDelayId);
        fadeDelayId = null;
      }
      if (fadeStepId) {
        clearTimeout(fadeStepId);
        fadeStepId = null;
      }
      fadeAlpha = 1;
    }

    function cancelSpread() {
      cancelFade();
      clearActiveCells();
      for (var t = 0; t < spreadTimers.length; t++) {
        clearTimeout(spreadTimers[t]);
      }
      spreadTimers = [];
    }

    function cellKey(kind, i, j) {
      return kind + "," + i + "," + j;
    }

    function getCell(kind, i, j) {
      return cellMap.get(cellKey(kind, i, j)) || null;
    }

    function centerFor(kind, i, j) {
      if (kind === 0) {
        return { x: HEX_CX + i * TILE_W, y: HEX_CY + j * TILE_H };
      }
      return { x: HEX_CX + OFF_X + i * TILE_W, y: HEX_CY + OFF_Y + j * TILE_H };
    }

    function getNeighbors(cell) {
      var i = cell.i;
      var j = cell.j;
      var out = [];
      var n;
      if (cell.kind === 0) {
        n = getCell(0, i - 1, j);
        if (n) out.push(n);
        n = getCell(0, i + 1, j);
        if (n) out.push(n);
        n = getCell(1, i, j);
        if (n) out.push(n);
        n = getCell(1, i - 1, j);
        if (n) out.push(n);
        n = getCell(1, i, j - 1);
        if (n) out.push(n);
        n = getCell(1, i - 1, j - 1);
        if (n) out.push(n);
      } else {
        n = getCell(0, i, j);
        if (n) out.push(n);
        n = getCell(0, i + 1, j);
        if (n) out.push(n);
        n = getCell(0, i, j + 1);
        if (n) out.push(n);
        n = getCell(0, i + 1, j + 1);
        if (n) out.push(n);
        n = getCell(1, i - 1, j);
        if (n) out.push(n);
        n = getCell(1, i + 1, j);
        if (n) out.push(n);
      }
      return out;
    }

    function pixelToCell(px, py) {
      var best = null;
      var bestD = Infinity;
      var k;
      var dx;
      var dy;
      var d;
      var skipR2 = (HEX_R * 4) * (HEX_R * 4);
      for (k = 0; k < cells.length; k++) {
        dx = cells[k].x - px;
        dy = cells[k].y - py;
        d = dx * dx + dy * dy;
        if (d > skipR2) continue;
        if (d < bestD) {
          bestD = d;
          best = cells[k];
        }
      }
      if (!best || bestD > HEX_R * HEX_R * 2.25) return null;
      return best;
    }

    function strokeForActive(cell, isLight) {
      var wScale = Math.max(MAX_WAVE, 1);
      var t = Math.min(1, Math.max(0, cell.wave / wScale));
      if (isLight) {
        var hueL = 38 + t * 24;
        var satL = 40 + t * 30;
        var ligL = 34 + t * 16;
        return "hsl(" + hueL + ", " + satL + "%, " + ligL + "%)";
      }
      var hue = 42 + t * 30;
      var sat = 50 + t * 35;
      var lig = 48 + t * 18;
      return "hsl(" + hue + ", " + sat + "%, " + lig + "%)";
    }

    function strokeCellsPerCell(list, isLight, lineW) {
      var i;
      var idx;
      var angle;
      var px;
      var py;
      var cell;
      for (i = 0; i < list.length; i++) {
        cell = list[i];
        ctx.beginPath();
        for (idx = 0; idx < 6; idx++) {
          angle = -Math.PI / 2 + idx * (Math.PI / 3);
          px = cell.x + HEX_R * Math.cos(angle);
          py = cell.y + HEX_R * Math.sin(angle);
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = strokeForActive(cell, isLight);
        ctx.lineWidth = lineW;
        ctx.stroke();
      }
    }

    function strokeActiveBatched(isLight, lineW) {
      var nAct = activeDrawList.length;
      if (nAct === 0) return;
      if (nAct > MAX_ACTIVE_CELLS) return;
      var i;
      if (!hexPathLocal || !canPath2DAddPath) {
        strokeCellsPerCell(activeDrawList, isLight, lineW);
        return;
      }
      var buckets = {};
      var col;
      var cell;
      for (i = 0; i < nAct; i++) {
        cell = activeDrawList[i];
        col = strokeForActive(cell, isLight);
        if (!buckets[col]) buckets[col] = [];
        buckets[col].push(cell);
      }
      var colors = Object.keys(buckets);
      var c;
      var list;
      var k;
      var combined;
      var mat;
      for (c = 0; c < colors.length; c++) {
        col = colors[c];
        list = buckets[col];
        combined = new Path2D();
        for (k = 0; k < list.length; k++) {
          cell = list[k];
          mat = new DOMMatrix([1, 0, 0, 1, cell.x, cell.y]);
          combined.addPath(hexPathLocal, mat);
        }
        ctx.strokeStyle = col;
        ctx.lineWidth = lineW;
        ctx.stroke(combined);
      }
    }

    function render(force) {
      renderFrameId++;
      if (!force && perfLite && renderFrameId % 2 === 0) return;
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      var nAct = activeDrawList.length;
      if (nAct === 0 && fadeAlpha >= 1) return;
      if (nAct > MAX_ACTIVE_CELLS) return;
      var isLight = document.documentElement.getAttribute("data-theme") === "light";
      var lineW = isLight ? 0.88 : 0.92;
      ctx.save();
      ctx.globalAlpha = fadeAlpha;
      strokeActiveBatched(isLight, lineW);
      ctx.restore();
    }

    function runFadeOut() {
      cancelFade();
      fadeAlpha = 1;
      var s = 0;
      function stepFade() {
        s++;
        fadeAlpha = Math.max(0, 1 - s / FADE_STEPS);
        render(true);
        if (s < FADE_STEPS) {
          fadeStepId = setTimeout(function () {
            stepFade();
          }, FADE_STEP_MS);
        } else {
          fadeStepId = null;
          fadeAlpha = 1;
          clearActiveCells();
          render(true);
        }
      }
      fadeStepId = setTimeout(stepFade, 0);
    }

    function scheduleFadeOut() {
      cancelFade();
      fadeDelayId = setTimeout(function () {
        fadeDelayId = null;
        runFadeOut();
      }, FADE_DELAY_MS);
    }

    function rebuildGrid() {
      cancelSpread();
      cells = [];
      cellMap.clear();
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      dpr = perfLite ? 1 : Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var iMin = Math.floor((0 - HEX_CX - HEX_R) / TILE_W) - 1;
      var iMax = Math.ceil((w - HEX_CX + HEX_R) / TILE_W) + 1;
      var jMin = Math.floor((0 - HEX_CY - HEX_R) / TILE_H) - 1;
      var jMax = Math.ceil((h - HEX_CY + HEX_R) / TILE_H) + 1;
      var i;
      var j;
      var p;
      var cell;
      var kind;
      for (j = jMin; j <= jMax; j++) {
        for (i = iMin; i <= iMax; i++) {
          for (kind = 0; kind <= 1; kind++) {
            p = centerFor(kind, i, j);
            if (p.x < -HEX_R || p.y < -HEX_R || p.x > w + HEX_R || p.y > h + HEX_R) {
              continue;
            }
            cell = {
              kind: kind,
              i: i,
              j: j,
              x: p.x,
              y: p.y,
              active: false,
              wave: 0,
              idx: cells.length
            };
            cells.push(cell);
            cellMap.set(cellKey(kind, i, j), cell);
          }
        }
      }
      visitStamp = new Uint32Array(cells.length);
      visitGen = 0;
      render(true);
    }

    function propagate(start) {
      if (!start || !heroOnScreen) return;
      cancelSpread();
      visitGen++;
      if (visitGen > 0x6fffffff) {
        visitGen = 1;
        visitStamp = new Uint32Array(cells.length);
      }
      visitStamp[start.idx] = visitGen;
      var queue = [start];
      var layer = 0;

      function spread() {
        var next = [];
        var j;
        var k;
        var cell;
        var neigh;
        var n;
        for (j = 0; j < queue.length; j++) {
          cell = queue[j];
          cell.active = true;
          cell.wave = layer;
          activeDrawList.push(cell);
        }
        var capped = activeDrawList.length >= MAX_ACTIVE_CELLS;
        if (!capped && layer < MAX_WAVE) {
          for (j = 0; j < queue.length; j++) {
            cell = queue[j];
            neigh = getNeighbors(cell);
            for (k = 0; k < neigh.length; k++) {
              n = neigh[k];
              if (visitStamp[n.idx] !== visitGen) {
                visitStamp[n.idx] = visitGen;
                next.push(n);
              }
            }
          }
        }
        layer++;
        render(false);
        if (next.length && !capped) {
          queue = next;
          spreadTimers.push(setTimeout(function () {
            spreadTimers.shift();
            spread();
          }, SPREAD_MS));
        } else {
          scheduleFadeOut();
        }
      }

      spread();
    }

    function trySpark(e) {
      if (!heroOnScreen || document.hidden) return;
      if (e.target.closest("a, button, input, textarea, select, label")) return;
      var now = Date.now();
      if (SPARK_MIN_MS && now - lastSparkAt < SPARK_MIN_MS) return;
      lastSparkAt = now;
      var rect = canvas.getBoundingClientRect();
      var gx = e.clientX - rect.left;
      var gy = e.clientY - rect.top;
      propagate(pixelToCell(gx, gy));
    }

    hero.addEventListener("pointerdown", trySpark, { passive: true });

    var lastVx = 0;
    var lastVy = 0;
    var lastT = 0;
    var minIntervalMs = perfLite ? 999999 : 2600;
    var minMovePx = 120;

    function onPointerEnter(e) {
      if (e.pointerType !== "mouse") return;
      var rect = canvas.getBoundingClientRect();
      lastVx = e.clientX - rect.left;
      lastVy = e.clientY - rect.top;
      lastT = 0;
      trySpark(e);
    }

    function onPointerMove(e) {
      if (e.pointerType !== "mouse") return;
      var now = Date.now();
      var rect = canvas.getBoundingClientRect();
      var lx = e.clientX - rect.left;
      var ly = e.clientY - rect.top;
      if (now - lastT < minIntervalMs || Math.hypot(lx - lastVx, ly - lastVy) < minMovePx) return;
      lastT = now;
      lastVx = lx;
      lastVy = ly;
      trySpark(e);
    }

    if (!perfLite) {
      hero.addEventListener("pointerenter", onPointerEnter, { passive: true });
      hero.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    function onVisibilityChange() {
      if (document.hidden) cancelSpread();
    }
    document.addEventListener("visibilitychange", onVisibilityChange, { passive: true });

    var heroIo = null;
    if (typeof IntersectionObserver === "function") {
      heroIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            heroOnScreen = en.isIntersecting && en.intersectionRatio > 0.02;
            if (!heroOnScreen) cancelSpread();
          });
        },
        { root: null, threshold: [0, 0.02, 0.08] }
      );
      heroIo.observe(hero);
    }

    var ro = new ResizeObserver(function () {
      clearTimeout(resizeRoTimer);
      resizeRoTimer = setTimeout(function () {
        resizeRoTimer = null;
        rebuildGrid();
      }, perfLite ? 180 : 100);
    });
    ro.observe(canvas.parentElement);

    var themeMoTimer = null;
    var themeMo = new MutationObserver(function () {
      clearTimeout(themeMoTimer);
      themeMoTimer = setTimeout(function () {
        themeMoTimer = null;
        render(true);
      }, 32);
    });
    themeMo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    rebuildGrid();

    window.__hiveHeroHexRebuild = rebuildGrid;

    return function () {
      cancelSpread();
      clearTimeout(resizeRoTimer);
      resizeRoTimer = null;
      hero.removeEventListener("pointerdown", trySpark, { passive: true });
      if (!perfLite) {
        hero.removeEventListener("pointerenter", onPointerEnter, { passive: true });
        hero.removeEventListener("pointermove", onPointerMove, { passive: true });
      }
      document.removeEventListener("visibilitychange", onVisibilityChange, { passive: true });
      if (heroIo) heroIo.disconnect();
      ro.disconnect();
      themeMo.disconnect();
      if (typeof window.__hiveHeroHexRebuild === "function") {
        delete window.__hiveHeroHexRebuild;
      }
    };
  }, []);
}
