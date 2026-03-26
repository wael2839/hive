import { useLayoutEffect, useRef } from "react";

var KEY = "hive-splash-seen-v1";
var WAIT_CLASS = "hive-splash-wait";
var TOTAL_MS = 10000;
var GOLD = { r: 212, g: 175, b: 55 };

function revealSiteChrome() {
  document.documentElement.classList.remove(WAIT_CLASS);
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function easeOutCubic(t) {
  var x = 1 - t;
  return 1 - x * x * x;
}

function easeInOutSine(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function drawHexStroke(ctx, x, y, r) {
  var i;
  for (i = 0; i < 6; i++) {
    var a = -Math.PI / 2 + i * (Math.PI / 3);
    var px = x + r * Math.cos(a);
    var py = y + r * Math.sin(a);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

export default function SplashIntro() {
  var rootRef = useRef(null);
  var canvasRef = useRef(null);
  var taglineRef = useRef(null);
  var lineRef = useRef(null);
  var logoRef = useRef(null);

  useLayoutEffect(function () {
    var splash = rootRef.current;
    var canvas = canvasRef.current;
    var tagline = taglineRef.current;
    var line = lineRef.current;
    var logo = logoRef.current;
    if (!splash || !canvas || !tagline || !line || !logo) return;

    try {
      if (sessionStorage.getItem(KEY) === "1") {
        splash.style.display = "none";
        return;
      }
    } catch (e) {}

    var taglineText = "All you need one Hive";
    var brandText = "Hive Digital Solutions";
    line.textContent = "";
    tagline.textContent = "";
    logo.src = "images/hive_logo_new_dark.png";

    var ctx = canvas.getContext("2d", { alpha: true, desynchronized: true }) || canvas.getContext("2d");
    if (!ctx) {
      splash.style.display = "none";
      revealSiteChrome();
      return;
    }

    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = 0;
    var h = 0;
    var hexR = 18;
    var stepX = 0;
    var stepY = 0;
    var cells = [];
    var raf = 0;
    var perfLite = false;
    var frameTick = 0;
    var doneTimer = null;
    var cancelled = false;

    function rebuild() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var narrow = w < 768;
      perfLite = narrow || window.matchMedia("(pointer: coarse)").matches;
      hexR = perfLite ? 30 : 19;
      stepX = hexR * 1.78;
      stepY = hexR * 1.52;
      cells = [];

      var rows = Math.ceil(h / stepY) + 1;
      var cols = Math.ceil(w / stepX) + 1;
      var y;
      var x;
      var r;
      var c;
      for (r = -1; r < rows; r++) {
        y = r * stepY;
        for (c = -1; c < cols; c++) {
          x = c * stepX + (r % 2 ? stepX * 0.5 : 0);
          cells.push({
            x: x,
            y: y,
            n: Math.random() * 6.283
          });
        }
      }
    }

    function onResize() {
      rebuild();
    }

    rebuild();
    window.addEventListener("resize", onResize, { passive: true });

    document.body.classList.add("splash-active");
    splash.classList.add("is-visible");
    splash.style.opacity = "1";

    var t0 = performance.now();

    function frame(now) {
      if (cancelled) return;
      var ms = now - t0;
      var p = clamp(ms / TOTAL_MS, 0, 1);
      frameTick += 1;

      if (perfLite && frameTick % 2 === 0) {
        raf = requestAnimationFrame(frame);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      var gridA = clamp((p - 0.12) / 0.32, 0, 1) * (1 - clamp((p - 0.88) / 0.12, 0, 1));
      var waveIn = clamp((p - 0.22) / 0.5, 0, 1);
      var waveOut = 1 - clamp((p - 0.75) / 0.2, 0, 1);
      var waveA = waveIn * waveOut;
      var cx = w * 0.5;
      var cy = h * 0.5;
      var front = -w * 0.08 + w * 1.1 * easeOutCubic(clamp((p - 0.26) / 0.46, 0, 1));
      var pull = clamp((p - 0.66) / 0.24, 0, 1);

      var i;
      var cell;
      for (i = 0; i < cells.length; i++) {
        cell = cells[i];
        var dx = cell.x - cx;
        var dy = cell.y - cy;
        var distC = Math.hypot(dx, dy);
        var organic = perfLite
          ? Math.sin(cell.y * 0.01 + cell.n + p * 2.2) * 3
          : Math.sin(cell.y * 0.018 + cell.n + p * 5.2) * 8 + Math.sin(cell.x * 0.011 - p * 3.2) * 6;
        var dFront = Math.abs(cell.x + organic - front);
        var waveSpread = perfLite ? 88 : 96;
        var wave = Math.exp(-(dFront * dFront) / (2 * waveSpread * waveSpread)) * waveA;
        var towardCenter = Math.exp(-(distC * distC) / (2 * 220 * 220)) * pull;
        var strength = Math.max(wave, towardCenter * 0.95);
        var base = perfLite ? 0.03 + gridA * 0.14 : 0.045 + gridA * 0.2;
        var alpha = base + strength * (perfLite ? 0.3 : 0.42);

        ctx.beginPath();
        drawHexStroke(ctx, cell.x, cell.y, hexR);
        ctx.strokeStyle =
          "rgba(" + GOLD.r + "," + GOLD.g + "," + GOLD.b + "," + clamp(alpha, 0, perfLite ? 0.45 : 0.6).toFixed(3) + ")";
        ctx.lineWidth = strength > 0.32 ? (perfLite ? 1.05 : 1.2) : perfLite ? 0.85 : 0.95;
        ctx.stroke();
      }

      var lineIn = clamp((p - 0.5) / 0.16, 0, 1);
      var lineOut = 1 - clamp((p - 0.78) / 0.16, 0, 1);
      var lineA = lineIn * lineOut;
      line.style.opacity = String(lineA);
      line.style.transform = "translateY(" + (1 - lineIn) * 10 + "px)";
      var tagIn = clamp((p - 0.18) / 0.18, 0, 1);
      var tagOut = 1 - clamp((p - 0.52) / 0.14, 0, 1);
      var tagA = tagIn * tagOut;
      tagline.style.opacity = String(tagA);
      tagline.style.transform = "translateY(" + (1 - tagIn) * 10 + "px)";
      var tagTypeProgress = clamp((p - 0.2) / 0.2, 0, 1);
      var tagChars = Math.floor(taglineText.length * easeOutCubic(tagTypeProgress));
      tagline.textContent = taglineText.slice(0, tagChars);
      var typeProgress = clamp((p - 0.52) / 0.22, 0, 1);
      var chars = Math.floor(brandText.length * easeOutCubic(typeProgress));
      line.textContent = brandText.slice(0, chars);

      var logoIn = clamp((p - 0.6) / 0.2, 0, 1);
      var logoOut = 1 - clamp((p - 0.9) / 0.1, 0, 1);
      var logoA = logoIn * logoOut;
      logo.style.opacity = String(logoA);
      logo.style.transform = "scale(" + (0.94 + easeInOutSine(logoIn) * 0.06) + ")";

      if (p < 1) {
        raf = requestAnimationFrame(frame);
        return;
      }

      splash.style.transition = "opacity 240ms ease";
      splash.style.opacity = "0";
      doneTimer = window.setTimeout(function () {
        if (cancelled) return;
        cancelAnimationFrame(raf);
        splash.classList.remove("is-visible");
        splash.style.display = "none";
        document.body.classList.remove("splash-active");
        revealSiteChrome();
        try {
          sessionStorage.setItem(KEY, "1");
        } catch (e) {}
      }, 250);
    }

    raf = requestAnimationFrame(frame);

    return function () {
      cancelled = true;
      window.removeEventListener("resize", onResize, { passive: true });
      cancelAnimationFrame(raf);
      if (doneTimer) clearTimeout(doneTimer);
      document.body.classList.remove("splash-active");
      revealSiteChrome();
    };
  }, []);

  return (
    <div ref={rootRef} className="splash-intro" id="splash-intro" aria-hidden="true">
      <canvas ref={canvasRef} className="splash-intro__canvas" width={300} height={200} />
      <div className="splash-intro__veil" aria-hidden="true" />
      <div className="splash-intro__content">
        <p ref={taglineRef} className="splash-intro__tagline">
          All you need one Hive
        </p>
        <p ref={lineRef} className="splash-intro__line">
          Hive Digital Solutions
        </p>
        <img
          ref={logoRef}
          className="splash-intro__logo"
          src="images/hive_logo_new_dark.png"
          alt="Hive Digital Solutions"
        />
      </div>
    </div>
  );
}
