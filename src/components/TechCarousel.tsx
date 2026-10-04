import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  siReact, siTailwindcss, siLaravel, siPhp, siFlutter, siDart,
  siJavascript, siTypescript, siNextdotjs, siNodedotjs, siMysql, siFirebase,
} from "simple-icons";

// Urutan icon. Mau ganti/tambah/hapus: edit di sini.
const tech = [siReact, siTypescript, siNextdotjs, siTailwindcss, siJavascript, siNodedotjs, siFlutter, siDart, siLaravel, siPhp, siMysql, siFirebase];
// Warna yang terlalu gelap di background hitam diganti
const colorFix: Record<string, string> = { Flutter: "#54C5F8", "Next.js": "#f1f1ee" };

const TILE = 168;   // ukuran kartu (px)
const STEP = 208;   // jarak antar kartu (px), harus lebih besar dari TILE
const CURVE = 28;   // seberapa turun kartu di pinggir (px)
const TILT = 7;     // seberapa miring kartu di pinggir (derajat)
const DRIFT = -22;  // kecepatan jalan sendiri (px/detik). 0 = diam
const BASE = "#0b0b0e"; // warna dasar kartu
const TOTAL = STEP * tech.length;
const HALF = TOTAL / 2;
const wrap = (v: number) => ((((v + HALF) % TOTAL) + TOTAL) % TOTAL) - HALF;
const clamp = (v: number) => Math.max(-2500, Math.min(2500, v));

// Semua angka px di atas adalah ukuran "desain" di layar 1920px. SCALE = font-size html / 16,
// jadi di zoom 125% / 150% kartu ikut mengecil proporsional (sama seperti bagian lain yang pakai rem).
const rootScale = () => (typeof window === "undefined" ? 1 : parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1);

function Item({ t, k, x, s, sv }: { t: (typeof tech)[number]; k: number; x: MotionValue<number>; s: number; sv: MotionValue<number> }) {
  const pos = useTransform(x, (v) => wrap(k * STEP + v));
  const px = useTransform([pos, sv], ([p, sc]: number[]) => p * sc);
  const y = useTransform([pos, sv], ([p, sc]: number[]) => (p / STEP) ** 2 * CURVE * sc);
  const rotate = useTransform(pos, (p) => (p / STEP) * TILT);
  const color = colorFix[t.title] ?? `#${t.hex}`;
  return (
    <motion.div style={{ x: px, y, rotate, width: TILE * s, marginLeft: -(TILE * s) / 2 }} className="absolute left-1/2 top-6 will-change-transform">
      <div
        className="grid place-items-center rounded-[2rem]"
        style={{
          height: TILE * s,
          background: `color-mix(in srgb, ${color} 14%, ${BASE})`,
          border: `1px solid color-mix(in srgb, ${color} 35%, ${BASE})`,
          boxShadow: "0 18px 40px rgba(0,0,0,0.55)",
        }}>
        <svg viewBox="0 0 24 24" className="h-20 w-20" fill={color} role="img" aria-label={t.title}><path d={t.path} /></svg>
      </div>
      <p className="mt-3 text-center font-mono text-sm text-bone/85">{t.title}</p>
    </motion.div>
  );
}

export default function TechCarousel() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const vel = useRef(DRIFT);
  const panning = useRef(false);
  const drag = useRef<{ id: number; lastX: number; lastT: number } | null>(null);
  const target = reduce ? 0 : DRIFT;
  const [s, setS] = useState(rootScale);
  const sv = useMotionValue(s);
  useEffect(() => {
    const upd = () => { const v = rootScale(); setS(v); sv.set(v); };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, [sv]);

  // Jalan sendiri + meluncur pelan setelah dilepas
  useAnimationFrame((_, dt) => {
    if (panning.current) return;
    const s = dt / 1000;
    x.set(x.get() + vel.current * s);
    vel.current += (target - vel.current) * (1 - Math.exp(-s * 2.5));
  });

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, lastX: e.clientX, lastT: performance.now() };
    panning.current = true;
    vel.current = 0;
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const now = performance.now();
    const dx = e.clientX - d.lastX;
    const dt = Math.max(1, now - d.lastT);
    x.set(x.get() + dx / sv.get());
    vel.current = clamp(vel.current * 0.6 + (dx / sv.get() / dt) * 1000 * 0.4);
    d.lastX = e.clientX;
    d.lastT = now;
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (performance.now() - d.lastT > 80) vel.current = 0; // ditahan diam sebelum dilepas = nggak meluncur
    drag.current = null;
    panning.current = false;
  };
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) x.set(x.get() - e.deltaX / sv.get());
  };

  return (
    <div>
      <div
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onWheel={onWheel}
        className="relative h-[19rem] w-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
        }}>
        {tech.map((t, k) => <Item key={t.title} t={t} k={k} x={x} s={s} sv={sv} />)}
      </div>
    </div>
  );
}