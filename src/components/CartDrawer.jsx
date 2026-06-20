// This lightweight drawer becomes a mini cart preview on larger screens.
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function CartDrawer() {
  const { cart, cartTotal } = useShop();

  if (!cart.length) return null;

  return (
    <Link to="/cart" className="fixed bottom-6 left-6 z-30 hidden rounded-full bg-white/80 px-4 py-3 text-sm font-black shadow-soft backdrop-blur transition hover:-translate-y-1 md:flex">
      <FiShoppingBag className="mr-2 mt-0.5" /> {cart.length} item{cart.length > 1 ? "s" : ""} · ₹{cartTotal}
    </Link>
  );
}
