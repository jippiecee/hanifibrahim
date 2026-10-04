import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

// ====== GANTI ANGKA DI SINI ======
// value = angka tujuan, suffix = tulisan setelah angka (K, M, +), decimals = jumlah angka di belakang koma
const STATS = [
  { label: "Subscribers", value: 38, suffix: "K+", decimals: 0 },
  { label: "Videos", value: 102, suffix: "+", decimals: 0 },
  { label: "Total Views", value: 3, suffix: "M+", decimals: 0 },
];
// =================================

const ease = [0.22, 1, 0.36, 1] as const;

function Count({ to, decimals, suffix }: { to: number; decimals: number; suffix: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => v.toFixed(decimals) + suffix);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { mv.set(to); return; }
    const c = animate(mv, to, { duration: 2.4, ease });
    return () => c.stop();
  }, [inView, reduce, to, mv]);

  return <motion.span ref={ref} className="tabular-nums">{text}</motion.span>;
}

/** Strip angka channel, tepat di bawah banner Content Creator. */
export default function CreatorStats() {
  return (
    <section className="relative bg-[#050506] px-5 pb-8 pt-6 md:px-12 md:pb-12 md:pt-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.1, delay: i * 0.12, ease }}
              className="px-2 py-10 text-center md:py-16">
              <div className="display text-[clamp(2rem,7vw,6rem)] !leading-none"><Count to={s.value} decimals={s.decimals} suffix={s.suffix} /></div>
              <p className="mt-4 font-editorial text-[10px] font-normal uppercase tracking-[0.25em] text-bone/60 md:mt-6 md:text-[13px] md:tracking-[0.3em]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}