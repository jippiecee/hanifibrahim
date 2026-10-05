import { useEffect, useState } from "react";
import type { Photo } from "../data/photos";

const FIRST_DURATION = 4500; // photo-1 tampil paling lama (ms)
const OTHER_DURATION = 2500; // foto lainnya (ms)

/** Foto ganti otomatis dengan efek "kedip" cepat, tanpa geser. */
export default function PhotoSlider({ photos }: { photos: Photo[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const delay = i === 0 ? FIRST_DURATION : OTHER_DURATION;
    const id = setTimeout(() => setI((v) => (v + 1) % photos.length), delay);
    return () => clearTimeout(id);
  }, [i, photos.length]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-ink sm:aspect-[16/10]">
      {photos.map((p, k) => (
        <img
          key={p.src}
          src={p.src}
          alt={p.alt}
          aria-hidden={k !== i}
          draggable={false}
          decoding="async"
          className={`absolute inset-0 h-full w-full select-none object-cover object-[center_30%] transition-opacity duration-150 ease-out ${
            k === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}