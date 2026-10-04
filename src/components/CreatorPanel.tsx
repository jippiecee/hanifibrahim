import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { creator } from "../data/creator";

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = (delay = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-12%" }, transition: { duration: 1.1, delay, ease } });
const label = "font-editorial text-[12px] font-normal uppercase tracking-[0.3em] text-bone/60 md:text-[13px]";

/** Satu kotak bento. `outside` dipakai untuk elemen yang boleh keluar dari kotak (mis. bubble). */
function Tile({ className, delay = 0, children, outside }: { className: string; delay?: number; children: ReactNode; outside?: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 48, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.1, delay, ease }} className={`relative ${className}`}>
      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0d0e10] transition-colors duration-300 hover:border-neutral-500">{children}</div>
      {outside}
    </motion.div>
  );
}

function Img({ src, alt, pos = "center" }: { src: string; alt: string; pos?: string }) {
  return <img src={src} alt={alt} loading="lazy" decoding="async" style={{ objectPosition: pos }}
    className="h-full w-full object-cover" />;
}

export default function CreatorPanel() {
  const { channel, images } = creator;
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 pb-0 pt-24 md:px-12 md:pb-0 md:pt-40">
      <motion.p {...reveal()} className={`mb-6 text-center ${label}`}>{creator.label}</motion.p>
      <motion.h2 {...reveal(0.1)} className="display mx-auto text-center text-[clamp(2.8rem,8vw,7rem)] !leading-[0.9]">{creator.title}</motion.h2>
      <motion.p {...reveal(0.2)} className="mx-auto mt-8 max-w-2xl text-center font-display text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-bone/55">{creator.statement}</motion.p>

      {/* Bento grid */}
      <div className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:aspect-video md:grid-cols-8 md:grid-rows-4 md:gap-4">
        {/* Profile + chat bubble */}
        <Tile className="col-span-1 aspect-square md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-1 md:aspect-auto"
          outside={
            <motion.a href={channel.url} target="_blank" rel="noopener noreferrer" aria-label={`${channel.name} on YouTube`}
              initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-8%" }}
              transition={{ default: { type: "spring", stiffness: 220, damping: 15, delay: 1.1 }, opacity: { duration: 0.4, delay: 1.1 } }}
              style={{ originX: 0, originY: 1 }}
              className="absolute left-[58%] top-[12%] z-20 w-fit whitespace-nowrap rounded-full rounded-bl-md bg-volt px-4 py-2.5 text-xs font-medium text-white shadow-[0_10px_30px_rgba(10,132,255,0.35)] md:left-[66%] md:px-5 md:py-3 md:text-[15px]">
              {channel.name}
            </motion.a>
          }>
          <Img src={images.profile} alt={`${channel.name} channel profile picture`} />
        </Tile>

        {/* Close-up */}
        <Tile delay={0.1} className="col-span-1 aspect-square md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-3 md:aspect-auto">
          <Img src={images.face} alt="Hanif Ibrahim avatar close-up" />
        </Tile>

        <Tile delay={0.08} className="col-span-2 aspect-video md:col-span-4 md:col-start-3 md:row-span-2 md:row-start-1 md:aspect-auto">
          <Img src={images.thumb1} alt="YouTube thumbnail: Available Resource Packs" />
        </Tile>

        <Tile delay={0.14} className="col-span-2 aspect-video md:col-span-4 md:col-start-3 md:row-span-2 md:row-start-3 md:aspect-auto">
          <Img src={images.thumb2} alt="YouTube thumbnail: Best Texturepack Bedwars" />
        </Tile>

        <Tile delay={0.16} className="col-span-2 aspect-[4/5] md:col-span-2 md:col-start-7 md:row-span-4 md:row-start-1 md:aspect-auto">
          <Img src={images.art} alt="Artwork" pos="center 40%" />
        </Tile>
      </div>

      {/* Banner channel */}
      <Tile delay={0.1} className="mt-3 aspect-[3/1] md:mt-4 md:aspect-[4/1]">
        <a href={channel.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${channel.handle} on YouTube`} className="block h-full w-full">
          <Img src={images.banner} alt="Hanifibrrhm_ channel banner" pos="center 52%" />
        </a>
      </Tile>
    </div>
  );
}