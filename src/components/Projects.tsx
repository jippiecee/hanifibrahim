import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects, projectsSection } from "../data/projects";
import { useMedia } from "../hooks/useMedia";
import MacFrame from "./MacFrame";

const label = "font-editorial text-[0.75rem] font-normal uppercase tracking-[0.3em] text-bone/60 md:text-[0.8125rem]";

type Project = (typeof projects)[number];

function Card({ project, index, progress, tick, centers, dist, pinned }: {
  project: Project; index: number; progress: MotionValue<number>; tick: MotionValue<number>;
  centers: React.MutableRefObject<number[]>; dist: React.MutableRefObject<number>; pinned: boolean;
}) {
  const focus = useTransform([progress, tick], (latest: number[]) => {
    const vw = window.innerWidth;
    const c = (centers.current[index] ?? vw / 2) - latest[0] * dist.current;
    return Math.min(1, Math.abs(c - vw / 2) / (vw * 0.6));
  });
  const scale = useTransform(focus, [0, 1], [1.03, 0.92]);
  const opacity = useTransform(focus, [0, 1], [1, 0.4]);

  return (
    <motion.a data-card href={project.url || undefined} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}
      style={pinned ? { scale, opacity } : undefined}
      className={`group block shrink-0 ${pinned ? "w-[82vw] md:w-[min(42vw,calc((100vh-20rem)*1.65))]" : "w-full"}`}>
      <MacFrame src={project.image} alt={`${project.title} website preview`} />
      <div className="mt-5 flex items-start justify-between gap-4 md:mt-7 md:gap-6">
        <div>
          <p className={label}>{String(index + 1).padStart(2, "0")} — {project.tag}</p>
          <h3 className="mt-2 font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-semibold leading-none tracking-tight">{project.title}</h3>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-bone/70 transition-colors duration-300 group-hover:border-neutral-500 group-hover:text-bone">
          <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </span>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();
  const small = useMedia("(max-width: 767px)");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distRef = useRef(0);
  const centers = useRef<number[]>([]);
  const tick = useMotionValue(0);
  const [height, setHeight] = useState<number | undefined>(undefined);

  // Tablet/desktop: scroll vertikal menggeser deretan card. HP: daftar vertikal biasa.
  const pinned = !reduce && !small;

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !pinned) return;
    const calc = () => {
      distRef.current = Math.max(0, el.scrollWidth - window.innerWidth);
      centers.current = Array.from(el.querySelectorAll<HTMLElement>("[data-card]")).map((c) => c.offsetLeft + c.offsetWidth / 2);
      setHeight(distRef.current + window.innerHeight);
      tick.set(tick.get() + 1);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    window.addEventListener("resize", calc);
    return () => { ro.disconnect(); window.removeEventListener("resize", calc); };
  }, [tick, pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distRef.current);

  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { stiffness: 200, damping: 40 });
  const skewX = useTransform(vel, [-2500, 2500], [3, -3]);

  // HP / reduce motion: daftar vertikal sederhana
  if (!pinned) {
    return (
      <section id="projects" ref={sectionRef} className="relative bg-ink px-5 py-20 md:px-12">
        <div className="mx-auto max-w-xl md:max-w-3xl">
          <p className={`mb-4 ${label}`}>{projectsSection.label}</p>
          <h2 className="display text-[clamp(2.8rem,8vw,7rem)] !leading-[0.9]">{projectsSection.title}</h2>
          <p className="mt-6 max-w-sm font-display text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-bone/55">{projectsSection.statement}</p>
          <div className="mt-12 flex flex-col gap-14">
            {projects.map((p, i) => (
              <Card key={p.title} project={p} index={i} progress={scrollYProgress} tick={tick} centers={centers} dist={distRef} pinned={false} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" ref={sectionRef}
      className="relative z-10 -mt-[100vh] overflow-clip rounded-t-[2.5rem] bg-ink shadow-[0_-60px_120px_rgba(0,0,0,0.95)] md:rounded-t-[4rem]"
      style={{ height }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Background kain */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src="/bg-projects.jpg" alt="" decoding="async" className="h-full w-full object-cover opacity-[0.38]" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
        </div>

        <motion.div ref={trackRef} style={{ x, skewX }} className="relative flex w-max items-center gap-[6vw] self-start pl-[8vw] pr-[12vw]">
          <div className="w-[78vw] shrink-0 md:w-[32vw]">
            <p className={`mb-6 ${label}`}>{projectsSection.label}</p>
            <h2 className="display text-[clamp(2.8rem,8vw,7rem)] !leading-[0.9]">{projectsSection.title}</h2>
            <p className="mt-8 max-w-sm font-display text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-bone/55">{projectsSection.statement}</p>
          </div>

          {projects.map((p, i) => (
            <Card key={p.title} project={p} index={i} progress={scrollYProgress} tick={tick} centers={centers} dist={distRef} pinned />
          ))}
        </motion.div>

        <div aria-hidden className="relative mt-10 h-px w-[min(60vw,24rem)] self-center bg-white/15 md:mt-14">
          <motion.div style={{ scaleX: scrollYProgress, originX: 0 }} className="h-full w-full bg-bone" />
        </div>
      </div>
    </section>
  );
}