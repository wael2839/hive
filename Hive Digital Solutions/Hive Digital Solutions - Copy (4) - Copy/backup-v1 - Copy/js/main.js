(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Header scroll effect ───────────────────────────────── */

  var header = document.getElementById("site-header");

  function updateHeader() {
    header.classList.toggle("header--scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ── Mobile menu toggle ─────────────────────────────────── */

  var burger = document.getElementById("menu-toggle");
  var navList = document.querySelector(".header__nav-list");

  if (burger && navList) {
    burger.addEventListener("click", function () {
      var open = navList.classList.toggle("header__nav-list--open");
      burger.classList.toggle("header__burger--open", open);
      burger.setAttribute("aria-expanded", String(open));
    });

    [].slice.call(navList.querySelectorAll(".header__nav-link")).forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("header__nav-list--open");
        burger.classList.remove("header__burger--open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── Hexagon honeycomb grid ─────────────────────────────── */

  var grid = document.getElementById("hex-grid");
  if (!grid) return;

  var HEX_W = 60, HEX_H = 60, GAP_X = 6, GAP_Y = 6;
  var ROW_OFFSET = (HEX_W + GAP_X) / 2;
  var hexData = [];

  function buildGrid() {
    grid.innerHTML = "";
    hexData = [];

    var b = grid.getBoundingClientRect();
    var cols = Math.floor(b.width / (HEX_W + GAP_X));
    var rows = Math.floor(b.height / (HEX_H * 0.75 + GAP_Y));
    var mx = b.width / 2, my = b.height / 2;
    var frag = document.createDocumentFragment();

    for (var r = 0; r < rows; r++) {
      var odd = r % 2 === 1;
      for (var c = 0; c < cols; c++) {
        var x = c * (HEX_W + GAP_X) + (odd ? ROW_OFFSET : 0);
        var y = r * (HEX_H * 0.75 + GAP_Y);

        var el = document.createElement("div");
        el.className = "hex";

        var rn = Math.random();
        if (rn < 0.1) el.classList.add("hex--bright");
        else if (rn < 0.3) el.classList.add("hex--glow");

        el.style.left = x + "px";
        el.style.top = y + "px";
        el.style.setProperty("--float-duration", (3 + Math.random() * 3) + "s");
        el.style.setProperty("--float-delay", (Math.random() * 4) + "s");
        el.style.setProperty("--float-y", -(6 + Math.random() * 10) + "px");

        var angle = Math.atan2(y + HEX_H / 2 - my, x + HEX_W / 2 - mx);
        var jitter = (Math.random() - 0.5) * 0.8;
        var dist = 250 + Math.random() * 450;

        hexData.push({
          el: el,
          sx: Math.cos(angle + jitter) * dist,
          sy: Math.sin(angle + jitter) * dist,
          delay: Math.random() * 0.3
        });

        frag.appendChild(el);
      }
    }

    grid.appendChild(frag);
  }

  buildGrid();

  /* ── Section references ─────────────────────────────────── */

  var aboutSec = document.getElementById("about");
  var svcSec = document.getElementById("services");
  var pkgSec = document.getElementById("packages");
  var ctcSec = document.getElementById("contact");

  /* ── GSAP helpers ───────────────────────────────────────── */

  var storedSTs = [];

  function save(tl) {
    if (tl && tl.scrollTrigger) storedSTs.push(tl.scrollTrigger);
  }

  function killAll() {
    storedSTs.forEach(function (st) { st.kill(true); });
    storedSTs = [];
  }

  function qsa(parent, sel) {
    return parent ? [].slice.call(parent.querySelectorAll(sel)) : [];
  }

  /* ── Reusable: section reveal ───────────────────────────── */

  function reveal(section, sel, fromVars) {
    var items = qsa(section, sel);
    if (!items.length) return;

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        end: "top 22%",
        scrub: 1,
        onLeave: function () {
          items.forEach(function (el) { gsap.set(el, { clearProps: "all" }); });
        }
      }
    });

    items.forEach(function (el, i) {
      tl.fromTo(el,
        Object.assign({ opacity: 0 }, fromVars),
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
        i * 0.12
      );
    });

    save(tl);
  }

  /* ── Reusable: section hide + hex scatter ───────────────── */

  function hideAndScatter(section, nextSection, revealSel, hexSel) {
    if (!section || !nextSection) return;
    var items = qsa(section, revealSel);
    var hexItems = hexSel ? qsa(section, hexSel) : [];
    if (!items.length && !hexItems.length) return;

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: nextSection,
        start: "top 85%",
        end: "top 35%",
        scrub: 1,
        onLeaveBack: function () {
          items.forEach(function (el) { gsap.set(el, { clearProps: "all" }); });
          hexItems.forEach(function (el) { gsap.set(el, { clearProps: "all" }); });
        }
      }
    });

    items.forEach(function (el, i) {
      tl.fromTo(el,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -30, immediateRender: false, duration: 1, ease: "power2.in" },
        i * 0.06
      );
    });

    hexItems.forEach(function (el) {
      var a = Math.random() * Math.PI * 2;
      var d = 200 + Math.random() * 350;
      tl.fromTo(el,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: Math.cos(a) * d, y: Math.sin(a) * d, scale: 1.4, opacity: 0, immediateRender: false, duration: 1 },
        Math.random() * 0.15
      );
    });

    save(tl);
  }

  /* ── Initialize all scroll animations ───────────────────── */

  function initAnimations() {
    killAll();

    if (reducedMotion) {
      gsap.set(
        ".about__reveal, .services__reveal, .packages__reveal, .contact__reveal",
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    /* Initial hidden states */
    gsap.set(qsa(aboutSec, ".about__reveal"), { opacity: 0, y: 40 });
    gsap.set(qsa(svcSec, ".services__reveal"), { opacity: 0, y: 50, scale: 0.85 });
    gsap.set(qsa(pkgSec, ".packages__reveal"), { opacity: 0, y: 50, scale: 0.88 });
    gsap.set(qsa(ctcSec, ".contact__reveal"), { opacity: 0, y: 50, scale: 0.9 });

    /* ─ Hero hex grid scatter ─────────────────────────────── */

    if (aboutSec && hexData.length) {
      var hexTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSec,
          start: "top 85%",
          end: "top 15%",
          scrub: 1.5,
          onEnter: function () {
            hexData.forEach(function (h) { h.el.classList.add("hex--scattering"); });
          },
          onLeaveBack: function () {
            hexData.forEach(function (h) {
              h.el.classList.remove("hex--scattering");
              gsap.set(h.el, { clearProps: "x,y,scale,opacity" });
            });
          }
        }
      });

      hexData.forEach(function (h) {
        hexTl.to(h.el, {
          x: h.sx, y: h.sy, scale: 0.45, opacity: 0,
          duration: 1, ease: "power3.out"
        }, h.delay);
      });

      save(hexTl);
    }

    /* ─ About ─────────────────────────────────────────────── */

    reveal(aboutSec, ".about__reveal", { y: 40 });
    hideAndScatter(aboutSec, svcSec, ".about__reveal", ".about__list-hex, .about__value-hex");

    /* ─ Services ──────────────────────────────────────────── */

    reveal(svcSec, ".services__reveal", { y: 50, scale: 0.85 });
    hideAndScatter(svcSec, pkgSec, ".services__reveal", ".svc-card__hex");

    /* ─ Packages ──────────────────────────────────────────── */

    reveal(pkgSec, ".packages__reveal", { y: 50, scale: 0.88 });
    hideAndScatter(pkgSec, ctcSec, ".packages__reveal", ".pkg-card__hex");

    /* ─ Contact (reveal only) ─────────────────────────────── */

    reveal(ctcSec, ".contact__reveal", { y: 50, scale: 0.9 });
  }

  initAnimations();

  /* ── Resize handler ─────────────────────────────────────── */

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      buildGrid();
      initAnimations();
      ScrollTrigger.refresh();
    }, 250);
  });
})();
