import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { useShop } from "../context/ShopContext";

export default function ToastNotification() {
  const { toast } = useShop();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-soft">
          <FiCheckCircle /> {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
