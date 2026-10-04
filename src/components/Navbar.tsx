import { motion } from "framer-motion";

const link = "rounded-full px-1.5 py-1.5 text-[11px] text-bone/60 transition-colors duration-500 hover:text-bone min-[360px]:px-2 min-[360px]:text-[12px] sm:px-3.5 sm:text-[13px]";

/** Outer wrapper handles centering (so Framer's transform on the pill can't override it). */
export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <motion.nav aria-label="Primary" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex w-[min(94vw,32rem)] items-center justify-between rounded-full border border-white/15 bg-[#15171b]/95 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] sm:bg-[#15171b]/85 sm:backdrop-blur-xl">
        <a href="#top" className="px-1.5 py-1.5 text-[11px] font-semibold tracking-tight min-[360px]:px-2 min-[360px]:text-[12px] sm:px-4 sm:text-[13px]">Hanif<span className="text-cyan-glow">.</span></a>
        <a href="#experience" className={link}>Experience</a>
        <a href="#projects" className={link}>Projects</a>
        <a href="#contact" className={link}>Contact</a>
        <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className={link}>CV</a>
      </motion.nav>
    </header>
  );
}