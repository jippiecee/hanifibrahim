import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMedia } from "../hooks/useMedia";

const IMG = "/hands.png"; // ganti ke "/hands.jpg" kalau file lo jpg
const SW = "min(80rem, 100vw - 2.5rem)"; // lebar gambar sebelum membesar (80rem = 1280px). Mau lebih besar: 90rem
const GAP = "1rem"; // jarak quote ke gambar. Mau lebih renggang: 2rem / 3rem. Boleh minus.

export default function HandsBridge() {
  const reduce = useReducedMotion();
  const small = useMedia("(max-width: 767px)");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const g = useTransform(p, [0, 0.45], [0, 1]);
  const imgScale = useTransform(g, [0, 1], [1.18, 1]);
  const stageScale = useTransform(p, [0.5, 1], [1, 0.94]);
  const stageDim = useTransform(p, [0.5, 1], [1, 0.25]);

  // HP / reduce motion: gambar biasa, tanpa animasi scroll
  if (reduce || small) {
    return (
      <section className="bg-[#050506] px-5 pb-16 pt-10 md:px-12 md:pb-24">
        <img src={IMG} alt="Dua tangan yang terhubung oleh benang merah" loading="lazy" decoding="async"
          className="mx-auto block aspect-[16/9] w-full max-w-7xl rounded-[1.5rem] object-cover md:aspect-[8/3] md:rounded-[2rem]" />
      </section>
    );
  }

  const cardStyle = {
    "--g": g,
    "--sw": SW,
    "--eh": "max(60vh, min(100vh, 100vw))",
    "--r": "clamp(1.75rem, 4vw, 2.5rem)",
    width: "calc(var(--sw) + (100% - var(--sw)) * var(--g))",
    height: "calc(var(--sw) * 0.375 + (var(--eh) - var(--sw) * 0.375) * var(--g))",
    borderRadius: "calc(var(--r) * (1 - var(--g)))",
  } as React.ComponentProps<typeof motion.div>["style"];

  return (
    <section
      ref={ref}
      style={{ marginTop: `calc(${GAP} - (100vh - ${SW} * 0.375) / 2)` }}
      className="relative h-[300vh] bg-[#050506]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ scale: stageScale, opacity: stageDim }} className="flex h-full w-full items-center justify-center">
          <motion.div style={cardStyle} className="group relative overflow-hidden bg-[#f1f0f0] ring-1 ring-white/30 transition-shadow duration-700 hover:ring-white/80">
            <motion.img
              src={IMG}
              alt="Dua tangan yang terhubung oleh benang merah"
              decoding="async"
              draggable={false}
              style={{ scale: imgScale }}
              className="block h-full w-full object-cover brightness-90 transition-[filter] duration-[1400ms] ease-cine group-hover:brightness-100"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-[20deg] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 backdrop-blur-[3px] transition-[transform,opacity] duration-[1400ms] ease-cine group-hover:translate-x-[420%] group-hover:opacity-100" />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.35)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}