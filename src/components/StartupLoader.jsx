import { motion } from "framer-motion";

export default function StartupLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className="pastel-gradient fixed inset-0 z-[100] grid place-items-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="glass-card rounded-[28px] px-10 py-12 text-center shadow-soft"
      >
        <motion.h1
          animate={{ letterSpacing: ["0.08em", "0.14em", "0.08em"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl font-black md:text-6xl"
        >
          AKRITI
        </motion.h1>
        <motion.p animate={{ opacity: [0.65, 1, 0.65] }} transition={{ duration: 2, repeat: Infinity }} className="mt-4 text-lg font-extrabold text-rose-500">
          Designed in Bharat
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
