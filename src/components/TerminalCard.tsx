import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { dev } from "../data/terminal";

type Kind = "kw" | "str" | "num" | "fn" | "cm";
type Tok = { text: string; kind?: Kind };
const color: Record<Kind, string> = { kw: "text-cyan-glow", str: "text-[#ffb86b]", num: "text-[#ff8fa3]", fn: "text-[#6db3ff]", cm: "text-bone/35" };

/** Kode JavaScript yang "diketik", dibangun dari data di src/data/terminal.ts. */
function buildCode(): Tok[] {
  const t = (text: string, kind?: Kind): Tok => ({ text, kind });
  const nl = t("\n");
  const rows: Tok[][] = [
    [t(`// ${dev.file}`, "cm")],
    [t("const ", "kw"), t("name = "), t(`"${dev.name}"`, "str"), t(";")],
    [t("const ", "kw"), t("age = "), t(String(dev.age), "num"), t(";")],
    [t("const ", "kw"), t("stack = [")],
  ];
  for (let i = 0; i < dev.stack.length; i += 2) {
    const pair = dev.stack.slice(i, i + 2);
    const row: Tok[] = [t("  ")];
    pair.forEach((s, k) => { row.push(t(`"${s}"`, "str")); row.push(t(k < pair.length - 1 || i + 2 < dev.stack.length ? "," + (k < pair.length - 1 ? " " : "") : "")); });
    rows.push(row);
  }
  rows.push([t("];")], [t("")],
    [t("console.log", "fn"), t("("), t('"name:"', "str"), t(", name);")],
    [t("console.log", "fn"), t("("), t('"age:"', "str"), t(", age);")],
    [t("console.log", "fn"), t("("), t('"stack:"', "str"), t(', stack.join(", "));')],
  );
  return rows.flatMap((r, i) => (i < rows.length - 1 ? [...r, nl] : r));
}

const outputs = [`name: ${dev.name}`, `age: ${dev.age}`, `stack: ${dev.stack.join(", ")}`];

function Code({ toks, n }: { toks: Tok[]; n: number }) {
  let start = 0;
  return <>{toks.map((tk, i) => {
    const vis = Math.max(0, Math.min(tk.text.length, n - start));
    start += tk.text.length;
    return vis > 0 ? <span key={i} className={tk.kind ? color[tk.kind] : "text-bone/85"}>{tk.text.slice(0, vis)}</span> : null;
  })}</>;
}

function Body({ toks, n, run, out, cursor }: { toks: Tok[]; n: number; run: boolean; out: number; cursor: boolean }) {
  return (
    <pre className="whitespace-pre-wrap break-words font-mono">
      <Code toks={toks} n={n} />
      {run && <>{"\n\n"}<span className="text-[#28c840]">hanif@macbook</span> <span className="text-[#6db3ff]">~</span> <span className="text-bone/85">% node {dev.file}</span></>}
      {outputs.slice(0, out).map((o, i) => <span key={i} className="text-bone/60">{"\n"}{o}</span>)}
      {cursor && <span className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[2px] animate-pulse bg-cyan-glow" />}
    </pre>
  );
}

/** Jendela terminal melayang yang mengetik JavaScript lalu mencetak hasilnya. */
export default function TerminalCard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const started = useInView(ref, { once: true, amount: 0.5 });
  const toks = useMemo(buildCode, []);
  const total = useMemo(() => toks.reduce((a, t) => a + t.text.length, 0), [toks]);
  const [n, setN] = useState(0), [run, setRun] = useState(false), [out, setOut] = useState(0);

  useEffect(() => {
    if (!started) return;
    if (reduce) { setN(total); setRun(true); setOut(outputs.length); return; }
    let dead = false; const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => { timers.push(setTimeout(() => !dead && fn(), ms)); };
    const chars = toks.map((t) => t.text).join("");
    const type = (i: number) => {
      setN(i);
      if (i >= total) { later(() => { setRun(true); const print = (k: number) => { setOut(k); if (k < outputs.length) later(() => print(k + 1), 520); }; later(() => print(1), 650); }, 700); return; }
      later(() => type(i + 1), chars[i] === "\n" ? 130 : 10 + Math.random() * 22);
    };
    later(() => type(1), 500);
    return () => { dead = true; timers.forEach(clearTimeout); };
  }, [started, reduce, toks, total]);

  const done = out >= outputs.length;
  return (
    <motion.div animate={reduce ? undefined : { y: [0, -12, 0], rotate: [-0.6, 0.4, -0.6] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
      <div ref={ref} role="img" aria-label={`Terminal running ${dev.file}: prints ${dev.name}, age ${dev.age} and the tech stack`}
        className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0c0f]/95 shadow-[0_30px_80px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl">
        {/* Title bar ala macOS: lampu merah/kuning/hijau, ikon muncul saat di-hover */}
        <div className="relative flex items-center border-b border-black/60 bg-gradient-to-b from-[#3b3c40] to-[#2d2e32] px-3.5 py-3">
          <div aria-hidden className="group/lights z-10 flex gap-2">
            {([["#ff5f57", "M6 6l12 12M18 6 6 18"], ["#febc2e", "M5 12h14"], ["#28c840", "M12 5v14M5 12h14"]] as const).map(([c, d]) => (
              <span key={c} style={{ background: c }} className="grid h-3.5 w-3.5 place-items-center rounded-full">
                <svg viewBox="0 0 24 24" className="h-2 w-2 text-black/60 opacity-0 transition-opacity duration-200 group-hover/lights:opacity-100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><path d={d} /></svg>
              </span>
            ))}
          </div>
          <span className="pointer-events-none absolute inset-x-0 text-center font-sans text-[0.75rem] font-medium text-bone/55">hanif — node {dev.file}</span>
        </div>
        <div aria-hidden className="grid p-4 text-[clamp(10px,0.82vw,12.5px)] leading-[1.7]">
          {/* Lapisan hantu: menahan tinggi akhir supaya jendela tidak melompat saat mengetik */}
          <div className="invisible col-start-1 row-start-1"><Body toks={toks} n={total} run out={outputs.length} cursor={false} /></div>
          <div className="col-start-1 row-start-1"><Body toks={toks} n={n} run={run} out={out} cursor={!done} /></div>
        </div>
      </div>
    </motion.div>
  );
}