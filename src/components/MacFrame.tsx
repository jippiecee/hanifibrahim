/** Mockup laptop (gaya MacBook) tanpa dependency: layar berisi screenshot, bezel tipis, notch kamera, dan dasar space gray. */
export default function MacFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full">
      {/* Layar */}
      <div className="rounded-t-[0.9rem] rounded-b-[0.2rem] bg-[#0b0b0d] p-[1.5%] pb-[2%] shadow-[0_0_0_1.5px_#2c2d31,0_30px_80px_rgba(0,0,0,0.6)] transition-shadow duration-500 group-hover:shadow-[0_0_0_1.5px_#55565c,0_30px_90px_rgba(0,0,0,0.7)]">
        <div className="relative overflow-hidden rounded-[0.35rem] bg-black">
          <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} className="block aspect-video w-full object-cover object-top" />
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-transparent" />
          <span aria-hidden className="absolute left-1/2 top-0 h-[3.4%] w-[10%] -translate-x-1/2 rounded-b-[0.4rem] bg-[#0b0b0d]" />
        </div>
      </div>
      {/* Dasar keyboard */}
      <div aria-hidden className="relative z-10 -mx-[5%] rounded-b-[1rem] rounded-t-[0.1rem] border-t border-white/20 bg-gradient-to-b from-[#3d3e43] via-[#2c2d31] to-[#1c1d20] pt-[1.8%] shadow-[0_18px_40px_rgba(0,0,0,0.6)]">
        <span className="absolute left-1/2 top-0 h-[45%] w-[14%] -translate-x-1/2 rounded-b-[0.5rem] bg-black/40" />
      </div>
    </div>
  );
} 