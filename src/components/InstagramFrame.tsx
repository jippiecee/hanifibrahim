import { motion } from "framer-motion";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  src?: string;
  caption?: string;
};

/** Bingkai foto gaya polaroid: foto di atas, caption kecil di bawah. Foto blur sampai di-klik. */
export default function InstagramFrame({
  src = "/photos/ig-photo.jpg",
  caption = "Vice President of the Student Council at IDN ISIP",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1.1, delay: 0.6, ease }}
      className="w-full rounded-[0.875rem] bg-[#f3f3f1] p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
    >
      {/* Foto: klik untuk membuka / menutup */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-pressed={open}
        aria-label={open ? "Hide photo" : "Reveal photo"}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-[0.5rem] bg-neutral-300"
      >
        <img
          src={src}
          alt={caption}
          loading="lazy"
          draggable={false}
          className={`h-full w-full object-cover transition-[filter,transform] duration-[900ms] ease-cine ${open ? "scale-100 blur-0" : "scale-110 blur-2xl"}`}
        />
        <span
          className={`absolute inset-0 grid place-items-center bg-black/25 transition-opacity duration-500 ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-[0.75rem] font-medium text-white backdrop-blur-md">
            <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
            </svg>
            Tap to view
          </span>
        </span>
      </button>

      {/* Caption */}
      <figcaption className="px-1 pb-1.5 pt-3 text-[0.8125rem] font-medium leading-snug text-neutral-500">
        {caption}
      </figcaption>
    </motion.figure>
  );
}