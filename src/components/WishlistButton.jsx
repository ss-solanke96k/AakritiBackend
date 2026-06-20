import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function WishlistButton({ product }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, isCustomer, showToast } = useShop();
  const active = wishlist.some((item) => item.id === product.id);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.82 }}
      whileHover={{ scale: 1.08 }}
      onClick={(event) => {
        event.preventDefault();
        if (!isCustomer) {
          showToast("Login required to continue");
          navigate("/login");
          return;
        }
        toggleWishlist(product);
      }}
      className="grid h-10 w-10 place-items-center rounded-full bg-white/85 text-rose-500 shadow-soft backdrop-blur transition"
      aria-label="Toggle wishlist"
    >
      {active ? <FaHeart /> : <FaRegHeart />}
    </motion.button>
  );
}
