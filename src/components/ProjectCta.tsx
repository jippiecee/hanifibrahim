import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import { email } from "../data/contact";

// ====== GANTI WARNA DI SINI ======
const ACCENT = "#6b55f5";      // warna huruf "OH!"
const ACCENT_DEEP = "#4b3fe6"; // warna bar "Contact me"
// Versi biru: ACCENT = "#0a84ff", ACCENT_DEEP = "#0b55bd"
// =================================

const ease = [0.22, 1, 0.36, 1] as const;
const INTERVAL = 3200; // ms antar ganti gambar project

function Oh({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const parent = { hidden: {}, show: { transition: { staggerChildren: 0.16 } } };
  const grow = { hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { type: "spring" as const, stiffness: 120, damping: 15 } } };
  const drop = { hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 260, damping: 12 } } };
  const base = { originX: 0.5, originY: 1 };
  return (
    <motion.svg aria-hidden viewBox="0 0 199 268" className={className} fill={ACCENT}
      variants={parent} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.5 }}>
      <motion.rect variants={grow} style={base} x="13.5" y="13.5" width="49" height="241" rx="24.5" fill="none" stroke={ACCENT} strokeWidth="27" />
      <motion.rect variants={grow} style={base} x="87" y="0" width="26" height="268" />
      <motion.rect variants={grow} style={base} x="139" y="0" width="26" height="268" />
      <motion.rect variants={grow} style={{ originX: 0.5, originY: 0.5 }} x="113" y="116" width="26" height="36" />
      <motion.rect variants={grow} style={base} x="173" y="0" width="26" height="194" />
      <motion.rect variants={drop} style={{ originX: 0.5, originY: 0.5 }} x="173" y="218" width="26" height="50" />
    </motion.svg>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function Showcase() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!inView || hover || reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % projects.length), INTERVAL);
    return () => clearInterval(id);
  }, [inView, hover, reduce, i]);

  const current = projects[i];
  return (
    <div ref={ref} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e10] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
        </span>
        <span className="truncate font-mono text-[11px] text-bone/50">~/projects/{slug(current.title)}</span>
        <div className="ml-auto flex gap-1" role="tablist" aria-label="Project previews">
          {projects.map((p, k) => (
            <button key={p.title} type="button" role="tab" aria-selected={k === i} aria-label={`Show ${p.title}`} onClick={() => setI(k)}
              className="grid h-6 w-5 place-items-center">
              <span className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-4 bg-bone" : "w-1.5 bg-white/25"}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="relative aspect-[16/10] bg-black">
        {projects.map((p, k) => (
          <motion.img key={p.title} src={p.image} alt={`${p.title} website preview`} loading="lazy" decoding="async" draggable={false}
            initial={false} animate={{ opacity: k === i ? 1 : 0, scale: k === i ? 1 : 1.06 }} transition={{ duration: 1.1, ease }}
            className="absolute inset-0 h-full w-full object-cover object-top" />
        ))}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.p key={current.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}
            className="absolute bottom-10 left-5 text-sm font-medium text-bone md:bottom-11 md:left-6 md:text-base">
            {current.title} <span className="text-bone/60">· {current.tag}</span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

const arrow = <svg aria-hidden width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>;

export default function ProjectCta() {
  const reduce = useReducedMotion();
  // Kalau email di data/contact.ts masih kosong, tombol scroll ke ikon sosmed.
  const href = email ? `mailto:${email}?subject=${encodeURIComponent("Let's start a project")}` : "#morecontact";

  return (
    <section id="start-project" className="relative z-10 px-5 py-24 md:px-12 md:py-44">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:gap-24">
        <div>
          <div className="flex items-center gap-5 md:gap-8">
            <Oh className="h-[clamp(9rem,21vw,16.75rem)] w-auto shrink-0" />
            <h2 className="max-w-[9em] text-balance font-display text-[clamp(1.6rem,2.7vw,2.5rem)] font-semibold leading-[1.05] tracking-tight">
              Still Not Sure About Starting a Project With Me?
            </h2>
          </div>
          <div aria-hidden className="mt-8 h-px w-full max-w-md bg-white/20 md:mt-10" />
        </div>

        <div>
          <Showcase />
          <motion.a href={href}
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.85 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.6 }}
            transition={{ default: { type: "spring", stiffness: 170, damping: 15, delay: 0.5 }, opacity: { duration: 0.5, delay: 0.5 } }}
            style={{ background: ACCENT_DEEP, boxShadow: `0 18px 44px ${ACCENT_DEEP}66` }}
            className="group relative z-10 -mt-7 flex w-full items-center justify-center gap-3 rounded-full py-4 text-base font-semibold text-white transition-[filter] duration-500 hover:brightness-110 md:py-[1.1rem] md:text-lg">
            Contact me
            <span className="transition-transform duration-500 ease-cine group-hover:-translate-y-0.5 group-hover:translate-x-0.5">{arrow}</span>
          </motion.a>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-bone/70">
            Don't worry, there's no commitment. Send me a rough idea, even a messy one, and we'll figure out the rest together ;)
          </p>
        </div>
      </div>
    </section>
  );
}