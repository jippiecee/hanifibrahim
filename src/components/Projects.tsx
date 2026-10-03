import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects, projectsSection } from "../data/projects";

const label = "font-editorial text-[12px] font-normal uppercase tracking-[0.3em] text-bone/60 md:text-[13px]";

/**
 * Scroll ke bawah -> project bergeser ke samping.
 * Section dibuat tinggi (tinggi layar + jarak geser), panel di dalamnya "menempel" (sticky),
 * lalu progress scroll vertikal diubah jadi pergeseran horizontal.
 */
export default function Projects() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distRef = useRef(0);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const calc = () => {
      distRef.current = Math.max(0, el.scrollWidth - window.innerWidth);
      setHeight(distRef.current + window.innerHeight);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    window.addEventListener("resize", calc);
    return () => { ro.disconnect(); window.removeEventListener("resize", calc); };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distRef.current);

  const pinned = !reduce;

  return (
    <section id="projects" ref={sectionRef} className="relative bg-ink" style={pinned ? { height } : undefined}>
      <div className={pinned ? "sticky top-0 flex h-screen items-center overflow-hidden" : "flex items-center overflow-x-auto py-24"}>
        <motion.div ref={trackRef} style={pinned ? { x } : undefined} className="flex w-max items-center gap-[6vw] pl-[8vw] pr-[12vw]">
          {/* Intro */}
          <div className="w-[78vw] shrink-0 md:w-[32vw]">
            <p className={`mb-6 ${label}`}>{projectsSection.label}</p>
            <h2 className="display text-[clamp(2.8rem,8vw,7rem)] !leading-[0.9]">{projectsSection.title}</h2>
            <p className="mt-8 max-w-sm font-display text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-bone/55">{projectsSection.statement}</p>
          </div>

          {/* Cards */}
          {projects.map((p, i) => (
            <a key={p.title} href={p.url || undefined} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title}`}
              className="group block w-[72vw] shrink-0 md:w-[min(46vw,calc((100vh-22rem)*1.77))]">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0e10] transition-colors duration-300 group-hover:border-neutral-500">
                <img src={p.image} alt={`${p.title} website preview`} loading="lazy" decoding="async" draggable={false}
                  className="aspect-video w-full object-cover object-top" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p className={label}>{String(i + 1).padStart(2, "0")} — {p.tag}</p>
                  <h3 className="mt-2 font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-semibold leading-none tracking-tight">{p.title}</h3>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-bone/70 transition-colors duration-300 group-hover:border-neutral-500 group-hover:text-bone">
                  <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </span>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Progress bar */}
        {pinned && (
          <div aria-hidden className="absolute bottom-8 left-1/2 h-px w-[min(60vw,24rem)] -translate-x-1/2 bg-white/15">
            <motion.div style={{ scaleX: scrollYProgress, originX: 0 }} className="h-full w-full bg-bone" />
          </div>
        )}
      </div>
    </section>
  );
}