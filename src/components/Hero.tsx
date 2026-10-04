import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "../data/content";
import Background from "./Background";
import MagneticButton from "./MagneticButton";

const expo = [0.16, 1, 0.3, 1] as const;

// Judul: naik dari bawah dengan sedikit miring + blur yang menghilang
const word = (delay: number) => ({
  initial: { y: "115%", rotate: 5, scale: 1.04, filter: "blur(10px)" },
  animate: { y: 0, rotate: 0, scale: 1, filter: "blur(0px)" },
  transition: { duration: 1.7, delay, ease: expo },
});

// Bar & tombol: efek "pop" dengan spring
const pop = (delay: number) => ({
  initial: { opacity: 0, y: 28, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: {
    default: { type: "spring" as const, stiffness: 170, damping: 15, mass: 0.9, delay },
    opacity: { duration: 0.6, delay },
  },
});

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Scroll: konten naik pelan + memudar, background zoom halus
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15]);
  const shown = profile.githubUrl.replace("https://", "");

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 text-center">
      {/* Background: masuk pelan, zoom saat scroll, plus "bernapas" sangat halus */}
      <motion.div aria-hidden className="absolute inset-0" initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.4, ease: expo }}>
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          <motion.div className="absolute inset-0" animate={reduce ? undefined : { scale: [1, 1.05, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}>
            <Background />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Transisi halus ke section berikutnya (tanpa garis tepi keras) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 1.0, ease: expo }}
          className="mb-10 pl-[0.4em] font-editorial text-[0.875rem] font-light uppercase tracking-[0.4em] text-bone/80 md:pl-[0.55em] md:text-[1.125rem] md:tracking-[0.55em]"
        >
          {profile.role}
        </motion.p>

        <h1 className="display text-[clamp(4rem,16.5vw,17rem)]">
          <span className="block overflow-hidden">
            <motion.span className="block" style={{ transformOrigin: "0% 100%" }} {...word(0.3)}>Hanif</motion.span>
          </span>
          <span className="-mt-[0.12em] block overflow-hidden">
            <motion.span className="block" style={{ transformOrigin: "0% 100%" }} {...word(0.5)}>Ibrahim</motion.span>
          </span>
        </h1>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-5 md:gap-8">
          <motion.div {...pop(1.3)}>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${shown}`}
              className="group flex items-center gap-3 rounded-3xl bg-ink px-6 py-3.5 font-mono text-sm transition-[padding] duration-700 ease-cine hover:px-10 md:text-base">
              <span>{shown}</span>
              <svg aria-hidden width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-bone/40 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-glow"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
          </motion.div>
          <motion.div {...pop(1.5)}>
            <MagneticButton href={profile.githubUrl} variant="solid">Quick Start</MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}