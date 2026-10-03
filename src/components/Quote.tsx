import { motion } from "framer-motion";
const ease = [0.22, 1, 0.36, 1] as const;
const parent = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const word = { hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1, ease } } };
/** Quote with a word-by-word masked reveal. The trigger sits on the parent: an observer on a clipped, translated word would never fire. */
export default function Quote({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <blockquote className="mx-auto max-w-3xl text-center">
      <p className="sr-only">{text}</p>
      <motion.p aria-hidden variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}
        className="font-display text-[clamp(1.25rem,2.4vw,2rem)] font-normal leading-[1.35] text-bone/50">
        {words.map((w, k) => (
          <span key={k} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span variants={word} className="inline-block">{w}{k < words.length - 1 ? "\u00A0" : ""}</motion.span>
          </span>
        ))}
      </motion.p>
    </blockquote>
  );
}
