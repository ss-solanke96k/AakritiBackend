import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const shapes = [
    "left-8 top-16 h-28 w-28 bg-pastelPink",
    "right-10 top-28 h-36 w-36 bg-pastelBlue",
    "bottom-12 left-1/4 h-24 w-24 bg-lavender",
    "bottom-20 right-1/4 h-20 w-20 bg-mint"
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.span
          key={shape}
          animate={{ y: [0, index % 2 ? 18 : -18, 0], x: [0, index % 2 ? -10 : 10, 0] }}
          transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute rounded-full opacity-70 blur-2xl ${shape}`}
        />
      ))}
    </div>
  );
}
