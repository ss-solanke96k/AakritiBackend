import { motion } from "framer-motion";

export default function AuthCard({ title, subtitle, children, side = "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "right" ? 35 : -35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="glass-card rounded-[34px] p-6 sm:p-8"
    >
      <h1 className="text-3xl font-black md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</p>}
      {children}
    </motion.div>
  );
}
