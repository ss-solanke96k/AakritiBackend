import { motion } from "framer-motion";

export default function AnalyticsCard({ icon: Icon, label, value, tone = "bg-pastelPink" }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="glass-card rounded-[20px] border-t-4 border-t-primary p-5">
      <div className={`grid h-12 w-12 place-items-center rounded-2xl ${tone} text-xl`}>
        <Icon />
      </div>
      <p className="mt-5 text-sm font-bold text-text-secondary">{label}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </motion.div>
  );
}
