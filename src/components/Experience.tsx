import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experience } from "../data/experience";
import { photos } from "../data/photos";
import PhotoSlider from "./PhotoSlider";
import MentorBubbles from "./MentorBubbles";
import Quote from "./Quote";
import TerminalCard from "./TerminalCard";
import CreatorPanel from "./CreatorPanel";
import InstagramFrame from "./InstagramFrame";

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = (delay = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-12%" }, transition: { duration: 1.1, delay, ease } });

export default function Experience() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);

  // Bagian mentor "menempel" begitu dasarnya sampai di dasar layar, lalu panel hitam naik menutupinya.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const calc = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    window.addEventListener("resize", calc);
    return () => { ro.disconnect(); window.removeEventListener("resize", calc); };
  }, []);

  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const dim = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.2]);

  return (
    <section id="experience" className="relative bg-black">
      {/* Bagian 1: Mentor */}
      <div ref={stageRef} className="sticky" style={{ top }}>
        <motion.div style={{ scale, opacity: dim, transformOrigin: "50% 100%" }} className="px-5 py-28 md:px-12 md:py-44">
          <div className="mx-auto max-w-6xl">
            <motion.p {...reveal()} className="mb-6 pl-[0.4em] text-center font-editorial text-[14px] font-light uppercase tracking-[0.4em] text-bone/80 md:pl-[0.55em] md:text-[18px] md:tracking-[0.55em]">{experience.label}</motion.p>
            <motion.h2 {...reveal(0.1)} className="display mx-auto max-w-4xl text-center text-[clamp(2.8rem,8vw,7rem)] !leading-[0.9]">{experience.title}</motion.h2>
     <div className="relative mx-auto mt-16 flex w-full flex-col items-center gap-6 md:mt-24 lg:block lg:w-[min(44vw,52rem)]">

  {/* TERMINAL: melayang di kiri atas foto, mulai dari tengah huruf "S" */}
 <motion.div
  {...reveal(0.05)}
  className="w-full max-w-md lg:absolute lg:right-full lg:mr-24  lg:z-20 lg:w-[clamp(15.5rem,24vw,22rem)] lg:max-w-none"
  style={{ top: "calc(-6rem - 0.45 * clamp(2.8rem, 8vw, 7rem))" }}
>
  <TerminalCard />
</motion.div>

  {/* FOTO: selalu di tengah */}
  <motion.div {...reveal(0.1)} className="w-full">
    <PhotoSlider photos={photos} />
  </motion.div>

  {/* BUBBLE: melayang di kanan foto */}
 <div className="self-start lg:absolute lg:left-full lg:top-1/2 lg:z-10 lg:-ml-24 lg:w-max lg:-translate-y-1/2 lg:self-auto">
  <MentorBubbles schools={experience.schools} />
</div>

{/* INSTAGRAM FRAME: paling kanan, di samping bubble */}
<div className="mx-auto w-full max-w-[18rem] lg:mt-8 min-[1440px]:absolute min-[1440px]:left-full min-[1440px]:-top-24 min-[1440px]:z-10 min-[1440px]:ml-44 min-[1440px]:mx-0 min-[1440px]:mt-0 min-[1440px]:max-w-none min-[1440px]:w-[clamp(12rem,15vw,17rem)]">
  <InstagramFrame />
</div>

</div>
            <div className="mt-10 md:mt-14"><Quote text={experience.quote} /></div>
          </div>
        </motion.div>
      </div>

      {/* Bagian 2: Content Creator, menutupi bagian mentor saat di-scroll */}
      <div ref={coverRef} className="relative z-10 rounded-t-[2.5rem] border-t border-white/10 bg-[#050506] shadow-[0_-60px_120px_rgba(0,0,0,0.95)] md:rounded-t-[4rem]">
        <CreatorPanel />
      </div>
    </section>
  );
}