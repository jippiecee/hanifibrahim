import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const parent = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const word = { hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1, ease } } };

/** Font tipis yang dipakai bergantian untuk kata "obsession". Font-nya dimuat di index.html. */
const fonts: CSSProperties[] = [
  { fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic", fontWeight: 300 },
  { fontFamily: '"Space Mono", monospace', fontWeight: 400 },
  { fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontWeight: 400 },
  { fontFamily: '"Italiana", serif', fontWeight: 400 },
  { fontFamily: '"Jost", sans-serif', fontWeight: 200 },
  { fontFamily: '"Caveat", cursive', fontWeight: 400 },
  { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 300 },
];
const START_DELAY = 1600; // ms: awalnya sama dengan font kalimat lain, baru mulai berubah setelah ini
const SPEED = 900;        // ms per ganti font

/** Kata yang fontnya berganti. Mulai dari font normal, lalu berubah-ubah. Berhenti saat di luar layar atau jika "reduce motion" aktif. */
function Cycling({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [i, setI] = useState(-1); // -1 = font normal (sama seperti kata lain)
  useEffect(() => {
    if (!inView || reduce) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      setI(0);
      id = setInterval(() => setI((n) => (n + 1) % fonts.length), SPEED);
    }, START_DELAY);
    return () => { clearTimeout(t); if (id) clearInterval(id); };
  }, [inView, reduce]);
  return <span ref={ref} style={i >= 0 ? fonts[i] : undefined}>{children}</span>;
}

/** Quote with a word-by-word masked reveal. The trigger sits on the parent: an observer on a clipped, translated word would never fire. */
export default function Quote({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <blockquote className="mx-auto max-w-7xl text-center">
      <p className="sr-only">{text}</p>
      <motion.p aria-hidden variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}
        className="font-display text-[clamp(2rem,4.8vw,4.75rem)] font-normal leading-[1.35] text-bone/50">
        {words.map((w, k) => {
          const m = w.match(/^(obsession)(.*)$/i); // pisahkan tanda baca di belakang kata
          return (
            <span key={k} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span variants={word} className="inline-block">
                {m ? <><Cycling>{m[1]}</Cycling>{m[2]}</> : w}{k < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          );
        })}
      </motion.p>
    </blockquote>
  );
}