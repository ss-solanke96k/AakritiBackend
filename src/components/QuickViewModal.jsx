import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import RatingStars from "./RatingStars";

export default function QuickViewModal({ product, onClose }) {
  const navigate = useNavigate();
  const { addToCart, isCustomer, showToast } = useShop();

  return (
    <AnimatePresence>
      {product && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-ink/35 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            className="glass-card grid max-w-3xl overflow-hidden rounded-[34px] md:grid-cols-2"
          >
            <img src={product.images[0]} alt={product.title} className="h-full min-h-80 w-full object-cover" />
            <div className="p-6">
              <button onClick={onClose} className="float-right grid h-10 w-10 place-items-center rounded-full bg-white/70 text-ink">
                <FiX />
              </button>
              <p className="text-sm font-bold uppercase text-rose-400">{product.category}</p>
              <h3 className="mt-2 text-3xl font-black">{product.title}</h3>
              <div className="mt-3"><RatingStars rating={product.rating} /></div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{product.description}</p>
              <p className="mt-5 text-3xl font-black">₹{product.price}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    if (!isCustomer) {
                      showToast("Please login first");
                      onClose();
                      navigate("/login");
                      return;
                    }
                    addToCart(product);
                  }}
                  className="pill-button bg-ink text-white"
                >
                  Add to cart
                </button>
                <Link to={`/product/${product.id}`} onClick={onClose} className="pill-button bg-pastelBlue text-ink">View details</Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
