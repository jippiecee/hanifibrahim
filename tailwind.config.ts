import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#050608", bone: "#f1f1ee", cyan: { glow: "#14f1ff" }, volt: "#0a84ff" },
    fontFamily: { display: ["Bricolage Grotesque", "system-ui", "sans-serif"], editorial: ["Cormorant Garamond", "Georgia", "serif"], serif: ["Instrument Serif", "Georgia", "serif"] },
    transitionTimingFunction: { cine: "cubic-bezier(0.22,1,0.36,1)" },
  } },
} satisfies Config;
