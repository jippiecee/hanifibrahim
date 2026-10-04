import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
const ease = [0.22, 1, 0.36, 1] as const;
const pill = "w-fit rounded-full px-5 py-3 text-sm font-medium md:text-[15px]";
/** Pop-out messages: appear one by one, dismissible, reopenable. */
export default function MentorBubbles({ schools }: { schools: string[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [open, setOpen] = useState(true);
  const motionProps = (delay: number, n: number) => ({
    initial: { opacity: 0, x: 28, scale: 0.94, filter: "blur(6px)" },
    animate: inView ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, delay, ease } } : {},
    exit: { opacity: 0, x: 20, scale: 0.95, filter: "blur(4px)", transition: { duration: 0.4, delay: n * 0.04, ease } },
  });
  return (
    <ul ref={ref} className="flex flex-col items-start gap-2.5">
      <AnimatePresence mode="popLayout">
          {open ? [
  <motion.li key="title" {...motionProps(0.3, 0)} className={`${pill} bg-[#0b55bd] text-white`}>
    Mentor at
  </motion.li>,
  ...schools.map((s, k) => <motion.li key={s} {...motionProps(0.3 + (k + 1) * 0.45, k + 1)} className={`${pill} bg-volt text-white`}>{s}</motion.li>),
  <motion.li key="close" {...motionProps(0.5 + (schools.length + 1) * 0.45, schools.length + 1)} className="pt-1">
            <button onClick={() => setOpen(false)} aria-label="Close messages"
              className="grid h-11 w-11 place-items-center rounded-full bg-volt text-white transition-transform duration-500 ease-cine hover:rotate-90">
              <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </motion.li>,
        ] : (
          <motion.li key="reopen" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3, ease } }} exit={{ opacity: 0 }}>
            <button onClick={() => setOpen(true)} className={`${pill} border border-white/15 bg-ink text-bone/80 transition-colors duration-500 hover:border-cyan-glow hover:text-cyan-glow`}>
              Mentor at {schools.length} schools
            </button>
          </motion.li>
        )}
      </AnimatePresence>
    </ul>
  );
}