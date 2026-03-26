import { useEffect, useRef, useState } from "react";
import { useHeroHexCanvas } from "./useHeroHexCanvas";

function getLang() {
  return document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
}

function pickStr(dict, key, lang, fallback) {
  if (dict && dict[key] && dict[key][lang]) return dict[key][lang];
  if (dict && dict[key] && dict[key].en) return dict[key].en;
  return fallback;
}

export default function HeroSection() {
  var heroRef = useRef(null);
  var [, forceUpdate] = useState(0);

  useEffect(function () {
    function onLang() {
      forceUpdate(function (n) {
        return n + 1;
      });
    }
    window.addEventListener("hive:lang-change", onLang);
    return function () {
      window.removeEventListener("hive:lang-change", onLang);
    };
  }, []);

  useHeroHexCanvas(heroRef);

  var lang = getLang();
  var d = typeof window !== "undefined" ? window.__hiveDict : null;
  var titleHtml = pickStr(
    d,
    "hero.title",
    lang,
    'Your Partner in <span class="hero__headline--accent">Digital</span><br/><span class="hero__headline--accent">Software Solutions</span>'
  );
  var sub = pickStr(
    d,
    "hero.sub",
    lang,
    "We build web, mobile, and custom software solutions that help businesses launch faster and scale with confidence."
  );
  var cta1 = pickStr(d, "hero.cta1", lang, "Get a Free Consultation");
  var cta2 = pickStr(d, "hero.cta2", lang, "View Our Services");

  return (
    <section ref={heroRef} id="home" className="hero hero--lux" aria-labelledby="hero-heading">
      <div className="hero__deco" aria-hidden="true" />
      <div className="hero__inner hero__inner--full">
        <canvas className="hero__hex-canvas" aria-hidden="true" width={300} height={200} />
        <div className="hero__copy-frame hero__copy-frame--full">
          <div className="intro-text">
            <h1
              id="hero-heading"
              className="hero__headline"
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
            <p className="hero__subheadline">{sub}</p>
            <div className="hero__cta">
              <a href="#contact" className="btn btn--primary hero__btn-gold">
                {cta1}
              </a>
              <a href="#services" className="btn btn--outline hero__btn-ghost">
                {cta2}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
