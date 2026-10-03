import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
/** Smooth scroll for the whole page, including in-page anchor links. */
export function useLenis() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.5, wheelMultiplier: 0.7, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let id = requestAnimationFrame(function raf(time) { lenis.raf(time); id = requestAnimationFrame(raf); });
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector<HTMLElement>(a.getAttribute("href")!);
      if (!el) return;
      e.preventDefault(); lenis.scrollTo(el, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); cancelAnimationFrame(id); lenis.destroy(); };
  }, [reduce]);
}
