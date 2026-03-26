import { createRoot } from "react-dom/client";
import HeroSection from "../hero/HeroSection";
import SplashIntro from "../splash/SplashIntro.jsx";

var heroEl = document.getElementById("hero-root");
if (heroEl) {
  createRoot(heroEl).render(<HeroSection />);
}

var splashMount = document.getElementById("splash-root");
if (splashMount) {
  createRoot(splashMount).render(<SplashIntro />);
}
