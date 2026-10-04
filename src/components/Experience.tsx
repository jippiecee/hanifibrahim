import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experience } from "../data/experience";
import { photos } from "../data/photos";
import { useMedia } from "../hooks/useMedia";
import PhotoSlider from "./PhotoSlider";
import MentorBubbles from "./MentorBubbles";
import TerminalCard from "./TerminalCard";
import CreatorPanel from "./CreatorPanel";
import InstagramFrame from "./InstagramFrame";

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = (delay = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-12%" }, transition: { duration: 1.1, delay, ease } });

export default function Experience() {
  const reduce = useReducedMotion();
  const wide = useMedia("(min-width: 1024px)"); // efek sticky + panel menutupi cuma di desktop
  const stageRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);

  // Desktop: bagian mentor "menempel" begitu dasarnya sampai di dasar layar, lalu panel hitam naik menutupinya.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !wide) return;
    const calc = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    window.addEventListener("resize", calc);
    return () => { ro.disconnect(); window.removeEventListener("resize", calc); };
  }, [wide]);

  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const dim = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.2]);

  return (
    <section id="experience" className="relative bg-black">
      {/* Bagian 1: Mentor */}
      <div ref={stageRef} className={wide ? "sticky" : "relative"} style={wide ? { top } : undefined}>
        <motion.div
          style={wide ? { scale, opacity: dim, transformOrigin: "50% 100%" } : undefined}
          className="px-5 pb-24 pt-28 md:px-12 md:pb-40 md:pt-44">
          <div className="mx-auto max-w-6xl">
            <motion.p {...reveal()} className="mb-6 pl-[0.4em] text-center font-editorial text-[0.875rem] font-light uppercase tracking-[0.4em] text-bone/80 md:pl-[0.55em] md:text-[1.125rem] md:tracking-[0.55em]">{experience.label}</motion.p>
            <motion.h2 {...reveal(0.1)} className="display mx-auto max-w-4xl text-center text-[clamp(2.8rem,8vw,7rem)] !leading-[0.9]">{experience.title}</motion.h2>

            <div className="relative mx-auto mt-14 flex w-full flex-col items-center gap-6 md:mt-24 lg:block lg:w-[min(44vw,52rem)]">
              {/* TERMINAL: disembunyikan di HP, melayang di kiri atas foto di desktop */}
              <motion.div
                {...reveal(0.05)}
                className="hidden w-full max-w-md md:block lg:absolute lg:right-full lg:z-20 lg:mr-24 lg:w-[clamp(15.5rem,24vw,22rem)] lg:max-w-none"
                style={{ top: "calc(-6rem - 0.45 * clamp(2.8rem, 8vw, 7rem))" }}
              >
                <TerminalCard />
              </motion.div>

              {/* FOTO: selalu di tengah */}
              <motion.div {...reveal(0.1)} className="w-full">
                <PhotoSlider photos={photos} />
              </motion.div>

              {/* BUBBLE: di bawah foto (HP/tablet), melayang di kanan foto (desktop) */}
             <div className="hidden w-full md:block lg:absolute lg:left-full lg:top-1/2 lg:z-10 lg:-ml-24 lg:w-max lg:-translate-y-1/2">
                <MentorBubbles schools={experience.schools} />
              </div>

              {/* INSTAGRAM FRAME */}
              <div className="mx-auto w-full max-w-[18rem] lg:mt-8 min-[1440px]:absolute min-[1440px]:-top-24 min-[1440px]:left-full min-[1440px]:z-10 min-[1440px]:ml-44 min-[1440px]:mt-0 min-[1440px]:mx-0 min-[1440px]:w-[clamp(12rem,15vw,17rem)] min-[1440px]:max-w-none">
                <InstagramFrame />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Jeda sebelum panel menutupi: cuma di desktop */}
      {wide && <div aria-hidden className="h-[90vh]" />}

      {/* Bagian 2: Content Creator */}
      <div ref={coverRef} className="relative z-10 rounded-t-[2.5rem] border-t border-white/10 bg-[#050506] shadow-[0_-60px_120px_rgba(0,0,0,0.95)] md:rounded-t-[4rem]">
        <CreatorPanel />
      </div>
    </section>
  );
}