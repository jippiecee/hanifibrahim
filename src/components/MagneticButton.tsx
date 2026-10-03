import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
interface Props { href: string; children: ReactNode; variant?: "solid" | "ghost"; strength?: number; }
export default function MagneticButton({ href, children, variant = "ghost", strength = 0.3 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 }), y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength); y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  const base = "inline-flex items-center rounded-3xl px-7 py-3.5 text-sm md:text-base font-medium transition-colors duration-500 ease-cine";
  const look = variant === "solid" ? "bg-volt text-white" : "border border-white/15 bg-white/[0.04] hover:border-cyan-glow/60 hover:text-cyan-glow";
  return <motion.a ref={ref} href={href} style={{ x, y }} onPointerMove={move} onPointerLeave={reset} className={`${base} ${look}`}>{children}</motion.a>;
}
