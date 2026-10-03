import { motion } from "framer-motion";
import { profile } from "../data/content";
/** Outer wrapper handles centering (so Framer's transform on the pill can't override it). */
export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <motion.nav aria-label="Primary" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex w-[min(86vw,24rem)] items-center justify-between rounded-full border border-white/15 bg-[#15171b]/85 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <a href="#top" className="px-4 py-1.5 text-[13px] font-semibold tracking-tight">Hanif<span className="text-cyan-glow">.</span></a>
        <a href="#experience" className="rounded-full px-4 py-1.5 text-[13px] text-bone/60 transition-colors duration-500 hover:text-bone">Experience</a>
        <a href="#projects" className="rounded-full px-4 py-1.5 text-[13px] text-bone/60 transition-colors duration-500 hover:text-bone">Projects</a>
        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"
          className="rounded-full px-4 py-1.5 text-[13px] text-bone/60 transition-colors duration-500 hover:text-bone">GitHub</a>
      </motion.nav>
    </header>
  );
}
