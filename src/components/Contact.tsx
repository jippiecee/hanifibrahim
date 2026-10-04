import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { socials } from "../data/contact";

type Line = { text: string; kind: "in" | "out" | "ok" | "err" };
const PROMPT = "hanif@portfolio:~$";
const lineColor: Record<Line["kind"], string> = { in: "text-bone/85", out: "text-bone/60", ok: "text-[#28c840]", err: "text-[#ff5f57]" };

const Kw = ({ children }: { children: ReactNode }) => <span className="text-cyan-glow">{children}</span>;
const Str = ({ children }: { children: ReactNode }) => <span className="text-[#ffb86b]">{children}</span>;
const Fn = ({ children }: { children: ReactNode }) => <span className="text-[#6db3ff]">{children}</span>;
const Cm = ({ children }: { children: ReactNode }) => <span className="text-bone/35">{children}</span>;

const HEADLINE = "Can't understand?";

export default function Contact() {
  const reduce = useReducedMotion();
  const pinned = !reduce;
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<Line[]>([]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Satu blok teks naik dari bawah layar (swipe up), dengan sedikit mantul
  const raw = useTransform(scrollYProgress, [0.13, 0.33], [0, 1], { clamp: true });
  const p = useSpring(raw, { stiffness: 140, damping: 16, mass: 0.8 });
  const y = useTransform(p, [0, 1], ["70vh", "0vh"]);

  const run = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    const out: Line[] = [{ text: `${PROMPT} ${rawCmd}`, kind: "in" }];
    switch (cmd) {
      case "":
        break;
      case "help":
        out.push({ text: `commands: ${socials.map((s) => s.cmd).join(", ")}, clear`, kind: "out" });
        break;
      case "clear":
        setLines([]); setValue(""); return;
      default: {
        const s = socials.find((x) => x.cmd === cmd);
        if (s) {
          out.push({ text: `opening ${s.cmd}...`, kind: "ok" });
          window.open(s.url, "_blank", "noopener,noreferrer");
        } else {
          out.push({ text: `command not found: ${cmd} (type "help")`, kind: "err" });
        }
      }
    }
    setLines((l) => [...l, ...out].slice(-8));
    setValue("");
  };

  const headline = (
    <h2
      className="text-center font-['Baloo_2',system-ui,sans-serif] text-[clamp(2.6rem,8vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight text-bone [-webkit-text-stroke:0.04em_currentColor] [paint-order:stroke_fill] [stroke-linejoin:round] [text-shadow:0_8px_0_rgba(0,0,0,0.6),0_0_40px_rgba(255,255,255,0.45),0_0_90px_rgba(255,255,255,0.25)]"
    >
      {HEADLINE}
    </h2>
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative z-10 bg-ink ${pinned ? "h-[400vh]" : "px-4 py-24"}`}
    >
      <div className={pinned ? "sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4" : "relative flex flex-col items-center gap-10"}>
        {/* Background SAMA dengan Projects supaya tidak ada transisi */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src="/bg-projects.jpg" alt="" decoding="async" className="h-full w-full object-cover opacity-[0.38]" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          className="relative w-[min(94vw,84rem)] cursor-text overflow-hidden rounded-xl border border-white/10 bg-[#0b0c0f]/95 shadow-[0_30px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl"
        >
          {/* Title bar ala Linux (GNOME): kontrol di kanan */}
          <div className="relative flex items-center border-b border-black/60 bg-gradient-to-b from-[#3b3c40] to-[#2d2e32] px-4 py-2.5">
            <span className="pointer-events-none absolute inset-x-0 text-center font-sans text-[12px] font-medium text-bone/55">{PROMPT.replace("$", "")} — contact.dart</span>
            <div aria-hidden className="z-10 ml-auto flex gap-2 text-bone/60">
              {["M5 12h14", "M6 6h12v12H6z", "M6 6l12 12M18 6 6 18"].map((d) => (
                <span key={d} className="grid h-5 w-5 place-items-center rounded-full bg-white/10">
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d={d} /></svg>
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 font-mono text-[clamp(12px,1.1vw,16px)] leading-[1.75] md:p-8">
            {/* Kode Dart (tampilan saja), dibangun dari socials */}
            <pre className="whitespace-pre-wrap break-words text-bone/85">
              <Kw>import</Kw> <Str>'dart:io'</Str>;{"\n\n"}
              <Kw>void</Kw> <Fn>main</Fn>() {"{"}{"\n"}
              {"  "}<Kw>final</Kw> cmd = stdin.<Fn>readLineSync</Fn>();{"\n\n"}
              {"  "}<Kw>switch</Kw> (cmd) {"{"}{"\n"}
              {socials.map((s) => (
                <span key={s.cmd}>{"    "}<Kw>case</Kw> <Str>'{s.cmd}'</Str>:{"\n"}{"      "}<Fn>open</Fn>(<Str>'{s.url}'</Str>);{"\n"}{"      "}<Kw>break</Kw>;{"\n"}</span>
              ))}
              {"    "}<Kw>default</Kw>:{"\n"}{"      "}<Fn>print</Fn>(<Str>'command not found'</Str>);{"\n"}
              {"  "}{"}"}{"\n"}
              {"}"}
            </pre>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-bone/35"><Cm>// ketik salah satu command, lalu tekan Enter</Cm></p>
              <p><span className="text-[#28c840]">hanif@portfolio</span><span className="text-bone/85">:</span><span className="text-[#6db3ff]">~</span><span className="text-bone/85">$ dart run contact.dart</span></p>
              <p className="mb-3 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-bone/60">
                available:
                {socials.map((s) => (
                  <button key={s.cmd} type="button" onClick={(e) => { e.stopPropagation(); run(s.cmd); }}
                    className="rounded border border-white/10 px-2 py-0.5 text-cyan-glow transition-colors hover:border-cyan-glow/60">{s.cmd}</button>
                ))}
              </p>

              {lines.map((l, i) => <p key={i} className={`whitespace-pre-wrap break-words ${lineColor[l.kind]}`}>{l.text}</p>)}

              <label className="flex items-center gap-2">
                <span className="shrink-0"><span className="text-[#28c840]">hanif@portfolio</span><span className="text-bone/85">:</span><span className="text-[#6db3ff]">~</span><span className="text-bone/85">$</span></span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") run(value); }}
                  aria-label="Terminal command"
                  autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent text-bone/90 caret-cyan-glow !outline-none"  
                />
              </label>
            </div>
          </div>
        </motion.div>

        {/* Teks gelembung: naik satu blok dari bawah, menimpa bagian bawah terminal, tidak menghalangi klik */}
        {pinned ? (
          <motion.div style={{ y }} className="pointer-events-none absolute inset-x-0 bottom-[1vh] z-20 flex justify-center px-4">
            {headline}
          </motion.div>
        ) : (
          <div className="relative">{headline}</div>
        )}
      </div>
    </section>
  );
}   