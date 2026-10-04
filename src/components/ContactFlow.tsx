import Contact from "./Contact";
import MoreContact from "./MoreContact";

export default function ContactFlow() {
  return (
    <div className="relative z-10 bg-ink">
      <div aria-hidden className="pointer-events-none sticky top-0 z-0 -mb-[100svh] h-[100svh] overflow-hidden">
        <img src="/bg-projects.jpg" alt="" decoding="async" className="h-full w-full object-cover opacity-[0.38]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      </div>
      <Contact />
      <MoreContact />
      <p className="relative z-10 px-6 pb-8 pt-28 text-center font-mono text-[11px] tracking-wide text-bone/50 md:pt-40 md:text-xs">
        © 2026 Hanif Ibrahim. All rights reserved.
      </p>
    </div>
  );
}