import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HandsFrame() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1.1, ease }}
      className="group relative mx-auto w-full max-w-5xl"
    >
      {/* Glow putih di belakang, menyala saat hover */}
      <div aria-hidden className="pointer-events-none absolute -inset-3 rounded-[2.4rem] bg-white/25 opacity-0 blur-2xl transition-opacity duration-700 ease-cine group-hover:opacity-100 md:rounded-[3rem]" />

      {/* Outline gradasi putih */}
      <div className="relative rounded-[1.75rem] bg-gradient-to-br from-white/50 via-white/20 to-white/10 p-[1.5px] transition-[background,transform] duration-700 ease-cine group-hover:-translate-y-1 group-hover:from-white group-hover:via-white/70 group-hover:to-white/50 md:rounded-[2.5rem]">
        <div className="relative overflow-hidden rounded-[calc(1.75rem-1.5px)] bg-[#f1f0f0] md:rounded-[calc(2.5rem-1.5px)]">
          <img
            src="/hands.png"
            alt="Dua tangan yang terhubung oleh benang merah"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="block aspect-[8/3] w-full object-cover brightness-90 transition-[transform,filter] duration-[1400ms] ease-cine group-hover:scale-[1.04] group-hover:brightness-100"
          />

          {/* Lapisan kaca putih */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Kilau putih yang menyapu kiri ke kanan */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-[20deg] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 backdrop-blur-[3px] transition-[transform,opacity] duration-[1400ms] ease-cine group-hover:translate-x-[420%] group-hover:opacity-100" />

          {/* Garis cahaya di tepi kaca */}
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.35)]" />
        </div>
      </div>
    </motion.figure>
  );
}