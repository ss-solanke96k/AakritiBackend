import { useState } from "react";

export default function ProductGallery({ images, title }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <div className="glass-card group overflow-hidden rounded-[34px]">
        <img src={active} alt={title} loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-125" />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((image) => (
          <button key={image} onClick={() => setActive(image)} className={`overflow-hidden rounded-2xl border-4 transition ${active === image ? "border-rose-300" : "border-white/60"}`}>
            <img src={image} alt={title} loading="lazy" className="aspect-square w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
