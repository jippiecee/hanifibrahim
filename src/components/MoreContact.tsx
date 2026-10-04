import { useRef, type ReactNode } from "react";
import { cubicBezier, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { socials } from "../data/contact";

/** Ikon sosmed (gaya garis), key-nya sama dengan `cmd` di data/contact.ts */
const icons: Record<string, ReactNode> = {
  instagram: (<><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><path d="M17.5 6.5h.01" /></>),
  youtube: (<><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></>),
  linkedin: (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>),
  github: (<><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></>),
};

export default function MoreContact() {
  const reduce = useReducedMotion();
  const pinned = !reduce;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Transisi wipe-up: tersapu naik dari bawah, pelan, dengan easing in-out
  const ease = cubicBezier(0.65, 0, 0.35, 1);
  const clip = useTransform(p, [0, 0.8], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], { ease });
  const bgScale = useTransform(p, [0, 0.8], [1.15, 1], { ease });

  return (
    <section
      id="morecontact"
      ref={ref}
      className={pinned ? "pointer-events-none relative z-20 -mt-[260vh] h-[290vh]" : "relative z-20 bg-ink"}
    >
      <motion.div
        style={pinned ? { clipPath: clip } : undefined}
        className={pinned ? "pointer-events-auto sticky top-0 h-screen overflow-hidden bg-ink" : "relative overflow-hidden py-24"}
      >
        {/* Background */}
        <motion.div aria-hidden style={pinned ? { scale: bgScale } : undefined} className="absolute inset-0">
          <img src="/bg-contact.jpg" alt="" decoding="async" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/60" />
        </motion.div>

        {/* Heading page: nempel di atas */}
        <h2 className={`display z-10 px-6 text-center text-[clamp(2.4rem,7vw,6.5rem)] !leading-[0.9] ${pinned ? "absolute inset-x-0 top-[11vh]" : "relative mb-12"}`}>
          That's why I'm here
        </h2>

        {/* Foto + quote */}
        <div className={`relative z-10 mx-auto max-w-7xl px-6 ${pinned ? "flex h-full items-center justify-center pt-[8vh]" : ""}`}>
          <div className="grid w-full items-center gap-8 md:grid-cols-2 md:gap-16">
            {/* Kiri: foto melayang + logo sosmed menimpa foto */}
            <div className="flex justify-center md:justify-end">
              <motion.div
                animate={reduce ? undefined : { y: [0, -14, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="relative aspect-[4/5] h-[min(40vh,30rem)] overflow-hidden rounded-3xl border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                  <img
                    src="/me.jpg"
                    alt="Hanif Ibrahim"
                    decoding="async"
                    className="h-full w-full origin-[25%_60%] scale-[1.7] object-cover object-[50%_62%]"
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <nav aria-label="Social media" className="absolute inset-x-0 bottom-4 flex justify-center gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.cmd}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${s.cmd}`}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-bone backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-bone hover:text-ink"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {icons[s.cmd]}
                      </svg>
                    </a>
                  ))}
                </nav>
              </motion.div>
            </div>

            {/* Kanan: quote */}
            <blockquote className="text-center md:text-left">
              <p className="font-display text-[clamp(2rem,4.8vw,4.6rem)] font-semibold leading-[1.05] tracking-tight">
                Let's create,<br />innovate,<br />and inspire.
              </p>
            </blockquote>
          </div>
        </div>

        {/* Copyright */}
        <p className={`z-10 px-6 text-center font-mono text-[11px] tracking-wide text-bone/50 md:text-xs ${pinned ? "absolute inset-x-0 bottom-6" : "relative mt-16"}`}>
          © 2026 Hanif Ibrahim. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}