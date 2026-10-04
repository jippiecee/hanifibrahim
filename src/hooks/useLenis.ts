import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

// Makin kecil wheelMultiplier = scroll makin pelan. Makin besar duration = luncuran makin panjang.
const WHEEL = 0.45;
const DURATION = 1.9;

// Klik menu navbar: dekat = NAV_NEAR detik, jauh (>= FAR_SCREENS layar) = NAV_FAR detik.
const NAV_NEAR = 2;
const NAV_FAR = 6;
const FAR_SCREENS = 10;
const linear = (t: number) => t; // kecepatan konstan dari awal sampai akhir

/** Smooth scroll for the whole page, including in-page anchor links. */
export function useLenis() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: DURATION, wheelMultiplier: WHEEL, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let id = requestAnimationFrame(function raf(time) { lenis.raf(time); id = requestAnimationFrame(raf); });
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector<HTMLElement>(a.getAttribute("href")!);
      if (!el) return;
      e.preventDefault();
      const screens = Math.abs(el.getBoundingClientRect().top) / window.innerHeight;
      const duration = NAV_NEAR + (NAV_FAR - NAV_NEAR) * Math.min(1, screens / FAR_SCREENS);
      lenis.scrollTo(el, { duration, easing: linear });
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); cancelAnimationFrame(id); lenis.destroy(); };
  }, [reduce]);
}