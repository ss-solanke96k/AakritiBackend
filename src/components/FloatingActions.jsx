import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-30">
      <button title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="grid h-14 w-14 place-items-center rounded-full bg-ink p-4 text-xl text-white shadow-soft transition hover:-translate-y-1" aria-label="Scroll to top">
        <FiArrowUp />
      </button>
    </div>
  );
}
