import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { socials } from "../data/contact";
import TechCarousel from "./TechCarousel";

const icons: Record<string, ReactNode> = {
  instagram: (<><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><path d="M17.5 6.5h.01" /></>),
  youtube: (<><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></>),
  linkedin: (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>),
  github: (<><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></>),
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function MoreContact() {
  const reduce = useReducedMotion();
  return (
    <section id="morecontact" className="relative z-10 px-6 pt-16 md:-mt-[4.5vh] md:px-12 md:pt-0">
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 1.1, ease }}
        className="hidden px-2 text-center md:block font-['Baloo_2',system-ui,sans-serif] text-[clamp(2.6rem,8vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight text-bone [-webkit-text-stroke:0.04em_currentColor] [paint-order:stroke_fill] [stroke-linejoin:round] [text-shadow:0_8px_0_rgba(0,0,0,0.6),0_0_40px_rgba(255,255,255,0.45),0_0_90px_rgba(255,255,255,0.25)]">
        That's why I'm here
      </motion.h2>

      <div className="mx-auto max-w-[88rem] md:mt-32">
        <div className="grid w-full grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
          {/* KIRI: foto + teks */}
          <div className="flex min-w-0 flex-col items-center gap-8 md:flex-row md:gap-12">
            <motion.div
              animate={reduce ? undefined : { y: [0, -14, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative shrink-0"
            >
              <div className="relative aspect-[4/5] w-[min(78vw,17rem)] overflow-hidden rounded-3xl border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:h-[clamp(20rem,52svh,32rem)] md:w-auto">
                <img src="/me.jpg" alt="Hanif Ibrahim" decoding="async" loading="lazy" className="h-full w-full origin-[0%_38%] scale-[2.1] object-cover object-[50%_62%]" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <nav aria-label="Social media" className="absolute inset-x-0 bottom-4 flex justify-center gap-2.5">
                {socials.map((s) => (
                  <a key={s.cmd} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${s.cmd}`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-bone backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-bone hover:text-ink">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icons[s.cmd]}</svg>
                  </a>
                ))}
              </nav>
            </motion.div>

            <blockquote className="text-center md:text-left">
              <p className="whitespace-nowrap font-display text-[clamp(1.9rem,3.4vw,3.75rem)] font-semibold leading-[1.08] tracking-tight">
                Let's<br />create,<br />innovate,<br />and<br />inspire.
              </p>
            </blockquote>
          </div>

          {/* KANAN: carousel tech stack + bar Instagram (lg:-top-6 = naik/turunin posisinya) */}
          <div className="relative min-w-0 lg:-top-6">
            <TechCarousel />
            {socials.filter((s) => s.cmd === "instagram").map((s) => (
              <div key={s.cmd} className="mt-2 flex justify-center">
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram: ${s.url.replace("https://", "")}`}
                  className="group flex max-w-full items-center gap-3 rounded-3xl bg-ink px-5 py-3 font-mono text-xs ring-1 ring-white/10 transition-[padding] duration-700 ease-cine md:px-6 md:py-3.5 md:text-base md:hover:px-10">
                  <span className="min-w-0 truncate">{s.url.replace("https://", "")}</span>
                  <svg aria-hidden width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-bone/40 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-glow"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}