import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ThatsWhy() {
  const reduce = useReducedMotion();
  return (
    <section className="relative z-10 px-6 pt-16 md:pt-24">
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 1.1, ease }}
        className="text-center font-['Baloo_2',system-ui,sans-serif] text-[clamp(2.6rem,8vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight text-bone [-webkit-text-stroke:0.04em_currentColor] [paint-order:stroke_fill] [stroke-linejoin:round] [text-shadow:0_8px_0_rgba(0,0,0,0.6),0_0_40px_rgba(255,255,255,0.45),0_0_90px_rgba(255,255,255,0.25)]"
      >
        That's why I'm here
      </motion.h2>
    </section>
  );
}