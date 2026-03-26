(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /* ── Header scroll effect ───────────────────────────────── */

  var header = document.getElementById("site-header");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("header--scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ── Mobile sidebar toggle ───────────────────────────────── */

  var burger = document.getElementById("menu-toggle");
  var sidebar = document.getElementById("sidebar");
  var sidebarOverlay = document.getElementById("sidebar-overlay");
  var sidebarLinks = sidebar ? sidebar.querySelectorAll(".sidebar__link") : [];
  var sidebarLangBtn = document.getElementById("sidebar-lang-toggle");

  function closeSidebar() {
    if (!sidebar || !sidebarOverlay || !burger) return;
    sidebar.classList.remove("sidebar--open");
    sidebarOverlay.classList.remove("sidebar-overlay--open");
    sidebar.setAttribute("aria-hidden", "true");
    sidebarOverlay.setAttribute("aria-hidden", "true");
    burger.classList.remove("header__burger--open");
    burger.setAttribute("aria-expanded", "false");
  }

  function openSidebar() {
    if (!sidebar || !sidebarOverlay || !burger) return;
    sidebar.classList.add("sidebar--open");
    sidebarOverlay.classList.add("sidebar-overlay--open");
    sidebar.setAttribute("aria-hidden", "false");
    sidebarOverlay.setAttribute("aria-hidden", "false");
    burger.classList.add("header__burger--open");
    burger.setAttribute("aria-expanded", "true");
  }

  function toggleSidebar() {
    if (!sidebar) return;
    if (sidebar.classList.contains("sidebar--open")) closeSidebar();
    else openSidebar();
  }

  function syncSidebarLangLabel() {
    if (!sidebarLangBtn) return;
    var sidebarLangText = sidebarLangBtn.querySelector(".sidebar__lang-text");
    try {
      var current = window.__hiveI18n && typeof window.__hiveI18n.getLang === "function"
        ? window.__hiveI18n.getLang()
        : "en";
      if (sidebarLangText) sidebarLangText.textContent = current === "ar" ? "EN" : "AR";
    } catch (e) {}
  }

  if (burger && sidebar && sidebarOverlay) {
    // Enforce a deterministic closed state on startup.
    closeSidebar();

    burger.addEventListener("click", toggleSidebar);
    sidebarOverlay.addEventListener("click", closeSidebar);
    window.addEventListener("keydown", function (e) {
      if (e && e.key === "Escape") closeSidebar();
    });
    [].slice.call(sidebarLinks).forEach(function (link) {
      link.addEventListener("click", closeSidebar);
    });
  }

  if (sidebarLangBtn) {
    syncSidebarLangLabel();
    sidebarLangBtn.addEventListener("click", function () {
      var langToggle = document.getElementById("lang-toggle");
      if (langToggle) langToggle.click();
      closeSidebar();
    });
  }

  window.addEventListener("hive:lang-change", function () {
    syncSidebarLangLabel();
    closeSidebar();
  });

  /* ── Direction-aware sliders (RTL/LTR + theme sync) ─────── */

  function getSliderDirection() {
    return document.documentElement.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
  }

  function initDirectionalSlider(slider) {
    if (!slider) return null;

    var track = slider.querySelector("[data-slider-track]");
    var slides = track ? [].slice.call(track.querySelectorAll("[data-slide]")) : [];
    var prevBtn = slider.querySelector("[data-slider-prev]");
    var nextBtn = slider.querySelector("[data-slider-next]");
    var dotsWrap = slider.querySelector("[data-slider-dots]");
    if (!track || !slides.length) return null;

    slider.dataset.dir = getSliderDirection();

    var index = 0;
    if (slider.dataset.sliderIndex) {
      var saved = parseInt(slider.dataset.sliderIndex, 10);
      if (!isNaN(saved)) index = Math.max(0, Math.min(saved, slides.length - 1));
    }

    // Rebuild dots once per init to avoid stale bindings after reinitialize.
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      for (var i = 0; i < slides.length; i++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider__dot";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.dataset.dotIndex = String(i);
        dotsWrap.appendChild(dot);
      }
    }

    function update() {
      index = Math.max(0, Math.min(index, slides.length - 1));
      slider.dataset.sliderIndex = String(index);
      var dir = getSliderDirection();
      slider.dataset.dir = dir;

      // Keep movement physically stable; only invert button behavior by dir.
      track.style.transform = "translate3d(" + (-index * 100) + "%,0,0)";

      for (var i = 0; i < slides.length; i++) {
        slides[i].setAttribute("aria-hidden", i === index ? "false" : "true");
      }

      if (dotsWrap) {
        var dots = dotsWrap.querySelectorAll(".slider__dot");
        [].slice.call(dots).forEach(function (dotEl) {
          var active = parseInt(dotEl.dataset.dotIndex, 10) === index;
          dotEl.classList.toggle("slider__dot--active", active);
          dotEl.setAttribute("aria-current", active ? "true" : "false");
        });
      }
    }

    function goPrev() {
      var dir = getSliderDirection();
      index = dir === "rtl" ? index + 1 : index - 1;
      if (index < 0) index = slides.length - 1;
      if (index > slides.length - 1) index = 0;
      update();
    }

    function goNext() {
      var dir = getSliderDirection();
      index = dir === "rtl" ? index - 1 : index + 1;
      if (index < 0) index = slides.length - 1;
      if (index > slides.length - 1) index = 0;
      update();
    }

    function onDotClick(e) {
      var target = e.target;
      if (!target || !target.matches(".slider__dot")) return;
      var next = parseInt(target.dataset.dotIndex, 10);
      if (isNaN(next)) return;
      index = next;
      update();
    }

    function onKeyDown(e) {
      if (!e) return;
      if (e.key === "ArrowLeft") {
        if (getSliderDirection() === "rtl") goNext();
        else goPrev();
      } else if (e.key === "ArrowRight") {
        if (getSliderDirection() === "rtl") goPrev();
        else goNext();
      }
    }

    if (prevBtn) prevBtn.addEventListener("click", goPrev);
    if (nextBtn) nextBtn.addEventListener("click", goNext);
    if (dotsWrap) dotsWrap.addEventListener("click", onDotClick);
    slider.addEventListener("keydown", onKeyDown);

    update();

    return {
      destroy: function () {
        if (prevBtn) prevBtn.removeEventListener("click", goPrev);
        if (nextBtn) nextBtn.removeEventListener("click", goNext);
        if (dotsWrap) dotsWrap.removeEventListener("click", onDotClick);
        slider.removeEventListener("keydown", onKeyDown);
      },
      refresh: update
    };
  }

  var sliderControllers = [];
  function initAllDirectionalSliders() {
    sliderControllers.forEach(function (c) { if (c && c.destroy) c.destroy(); });
    sliderControllers = [];

    var sliders = document.querySelectorAll("[data-slider]");
    [].slice.call(sliders).forEach(function (sliderEl) {
      var controller = initDirectionalSlider(sliderEl);
      if (controller) sliderControllers.push(controller);
    });
  }

  initAllDirectionalSliders();
  window.addEventListener("hive:lang-change", initAllDirectionalSliders);
  window.addEventListener("hive:theme-change", function () {
    sliderControllers.forEach(function (c) { if (c && c.refresh) c.refresh(); });
  });

  /* ── Contact form → mailto: (see js/contact-config.js → mailtoRecipient) ─ */

  function hiveT(key) {
    try {
      if (window.__hiveI18n && typeof window.__hiveI18n.t === "function") {
        return window.__hiveI18n.t(key);
      }
    } catch (e) {}
    return "";
  }

  function initContactForm() {
    var form = document.getElementById("contact-form");
    var statusEl = document.getElementById("contact-form-status");
    var submitBtn = form ? form.querySelector(".contact__submit") : null;
    if (!form || !submitBtn) return;

    var defaultBtnText = submitBtn.textContent;

    function setStatus(type, text) {
      if (!statusEl) return;
      statusEl.hidden = false;
      statusEl.textContent = text;
      statusEl.classList.remove("contact__form-status--success", "contact__form-status--error", "contact__form-status--sending");
      if (type) statusEl.classList.add("contact__form-status--" + type);
    }

    function clearStatus() {
      if (!statusEl) return;
      statusEl.textContent = "";
      statusEl.hidden = true;
      statusEl.classList.remove("contact__form-status--success", "contact__form-status--error", "contact__form-status--sending");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearStatus();

      if (typeof form.reportValidity === "function" && !form.reportValidity()) {
        return;
      }

      var nameEl = form.querySelector("#form-name");
      var emailEl = form.querySelector("#form-email");
      var msgEl = form.querySelector("#form-message");
      var name = (nameEl && nameEl.value.trim()) || "";
      var email = (emailEl && emailEl.value.trim()) || "";
      var message = (msgEl && msgEl.value.trim()) || "";

      if (!name || !email || !message) {
        setStatus("error", hiveT("ctc.form.validate"));
        return;
      }

      var simpleEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!simpleEmail.test(email)) {
        setStatus("error", hiveT("ctc.form.emailbad"));
        return;
      }

      var cfg = window.__hiveContact || {};
      var recipient = String(cfg.mailtoRecipient || "contact.hivedigitalsolutions@gmail.com").trim();
      if (!recipient) {
        setStatus("error", hiveT("ctc.form.err"));
        return;
      }

      var subjectLine = "Hive — Website contact / تواصل من الموقع";
      function buildBody(msg) {
        return (
          "Name / الاسم: " + name + "\n" +
          "Email / البريد: " + email + "\n\n" +
          "Message / الرسالة:\n" + msg
        );
      }

      var MAILTO_SAFE = 1950;
      var msgWork = message;
      var bodyText = buildBody(msgWork);
      var mailtoUrl =
        "mailto:" +
        recipient +
        "?subject=" +
        encodeURIComponent(subjectLine) +
        "&body=" +
        encodeURIComponent(bodyText);
      var guard = 0;
      while (mailtoUrl.length > MAILTO_SAFE && msgWork.length > 80 && guard++ < 40) {
        msgWork = msgWork.slice(0, Math.floor(msgWork.length * 0.88));
        bodyText = buildBody(msgWork + "\n\n[... اختُصرت — أكمل الرسالة في Outlook إن لزم]");
        mailtoUrl =
          "mailto:" +
          recipient +
          "?subject=" +
          encodeURIComponent(subjectLine) +
          "&body=" +
          encodeURIComponent(bodyText);
      }

      submitBtn.disabled = true;
      submitBtn.textContent = hiveT("ctc.form.sending") || "…";

      /* نقرة على <a> أوضح لبعض المتصفحات/Outlook من location.href وحده */
      try {
        var link = document.createElement("a");
        link.href = mailtoUrl;
        link.rel = "noopener noreferrer";
        link.style.position = "fixed";
        link.style.left = "-9999px";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        window.location.href = mailtoUrl;
      }

      setStatus("success", hiveT("ctc.form.mailto_ok"));
      form.reset();

      window.setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultBtnText;
      }, 600);
    });

    window.addEventListener("hive:lang-change", function () {
      defaultBtnText = submitBtn.textContent;
    });
  }

  initContactForm();

  /* ── Section references ─────────────────────────────────── */

  var aboutSec = document.getElementById("about");
  var aboutWhySec = document.getElementById("about-why");
  var aboutValuesSec = document.getElementById("about-values");
  var svcSec = document.getElementById("services");
  var workSec = document.getElementById("work-steps");
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

  /* ── Reusable: section hide (Simple Fade) ───────────────── */

  function hide(section, nextSection, revealSel) {
    if (!section || !nextSection) return;
    var items = qsa(section, revealSel);
    if (!items.length) return;

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: nextSection,
        start: "top 85%",
        end: "top 35%",
        scrub: 1,
        onLeaveBack: function () {
          items.forEach(function (el) { gsap.set(el, { clearProps: "all" }); });
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

    save(tl);
  }

  function initAboutWhyPremiumMotion() {
    if (!aboutWhySec) return;

    var network = aboutWhySec.querySelector(".about-why__network");
    var cards = qsa(aboutWhySec, ".about-why__item");
    var floaters = qsa(aboutWhySec, ".about-why__floater");

    if (network) {
      var networkTween = gsap.fromTo(
        network,
        { opacity: 0, scale: 0.96, y: 22 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutWhySec,
            start: "top 80%",
            end: "top 45%",
            scrub: 1
          }
        }
      );
      if (networkTween && networkTween.scrollTrigger) storedSTs.push(networkTween.scrollTrigger);
    }

    if (cards.length) {
      var cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutWhySec,
          start: "top 78%",
          end: "top 30%",
          scrub: 1
        }
      });

      cardsTl.fromTo(
        cards,
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, ease: "power2.out", stagger: 0.16, duration: 1 }
      );
      save(cardsTl);
    }

    floaters.forEach(function (el, idx) {
      var distance = idx % 2 === 0 ? -26 : 24;
      var floaterTween = gsap.to(el, {
        y: distance,
        ease: "none",
        scrollTrigger: {
          trigger: aboutWhySec,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
      if (floaterTween && floaterTween.scrollTrigger) storedSTs.push(floaterTween.scrollTrigger);
    });
  }

  /* Section title + buttons: filled state is CSS-driven (section:hover), not scroll. */

  /* ── Initialize all scroll animations ───────────────────── */

  function initAnimations() {
    killAll();

    // Keep reveal motion for About sections only.
    reveal(aboutSec, ".about__reveal", { y: 50, scale: 0.92 });
    reveal(aboutWhySec, ".about__reveal", { y: 40, scale: 0.94 });
    reveal(aboutValuesSec, ".about__reveal", { y: 40, scale: 0.94 });
    reveal(workSec, ".work-steps__reveal", { y: 42, scale: 0.96 });
    initAboutWhyPremiumMotion();

    // Keep the remaining sections static as before.
    gsap.set(qsa(svcSec, ".services__reveal"), { opacity: 1, y: 0, scale: 1 });
    gsap.set(qsa(pkgSec, ".packages__reveal"), { opacity: 1, y: 0, scale: 1 });
    gsap.set(qsa(ctcSec, ".contact__reveal"), { opacity: 1, y: 0, scale: 1 });
  }

  /* ── About typing effect (Why + Values) ─────────────────── */

  var aboutTypingTimers = [];
  var aboutTypingObserver = null;
  var aboutTypingPlayed = false;

  function clearAboutTypingTimers() {
    while (aboutTypingTimers.length) clearTimeout(aboutTypingTimers.pop());
  }

  function typeText(el, text, speed, done) {
    var i = 0;
    el.textContent = "";
    el.classList.add("typing--active");

    function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i += 1;
        var t = setTimeout(step, speed);
        aboutTypingTimers.push(t);
      } else {
        el.classList.remove("typing--active");
        if (typeof done === "function") done();
      }
    }

    step();
  }

  function runAboutTypingSequence() {
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var targets = qsa(document, ".about__card--textual .about__why-lead, .about__card--textual .about-choice strong, .about__card--textual .about-choice p, .about__card--textual .about__value strong, .about__card--textual .about__value p");
    if (!targets.length) return;

    clearAboutTypingTimers();

    targets.forEach(function (el) {
      el.classList.add("typing-target");
      if (!el.dataset.fullText) el.dataset.fullText = (el.textContent || "").trim();
    });

    if (reducedMotion) {
      targets.forEach(function (el) {
        el.textContent = el.dataset.fullText || "";
        el.classList.remove("typing--active");
      });
      return;
    }

    var startDelay = 120;
    targets.forEach(function (el, idx) {
      var delay = startDelay + (idx * 135);
      var timer = setTimeout(function () {
        var speed = (el.dataset.fullText || "").length > 90 ? 11 : 16;
        typeText(el, el.dataset.fullText || "", speed);
      }, delay);
      aboutTypingTimers.push(timer);
    });
  }

  function initAboutTyping() {
    var aboutSection = document.querySelector("#about");
    if (!aboutSection) return;

    if (aboutTypingObserver) {
      aboutTypingObserver.disconnect();
      aboutTypingObserver = null;
    }

    aboutTypingPlayed = false;
    aboutTypingObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !aboutTypingPlayed) {
          aboutTypingPlayed = true;
          runAboutTypingSequence();
        }
      });
    }, { threshold: 0.35 });

    aboutTypingObserver.observe(aboutSection);
  }

  initAnimations();
  initAboutTyping();

  window.addEventListener("hive:lang-change", function () {
    clearAboutTypingTimers();
    aboutTypingPlayed = false;
    initAboutTyping();
  });

  /* ── Resize handler ─────────────────────────────────────── */

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      closeSidebar();
      initAnimations();
      ScrollTrigger.refresh();
      if (typeof window.__hiveHeroHexRebuild === "function") window.__hiveHeroHexRebuild();
    }, 250);
  });
})();
