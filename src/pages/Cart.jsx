import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { useShop } from "../context/ShopContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, cartTotal, removeFromCart, updateQuantity, isCustomer, isOwnProduct, showToast } = useShop();
  const shipping = cart.length ? 79 : 0;

  return (
    <PageTransition>
      <section className="container-soft py-12">
        <h1 className="text-4xl font-black">Your cart</h1>
        {!cart.length ? (
          <div className="glass-card pastel-gradient mt-8 rounded-[32px] p-10 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/70 text-3xl shadow-soft"><FiShoppingBag /></div>
            <p className="mt-5 text-2xl font-black">Your cart is waiting for something cute.</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Login and add handmade pieces from verified small businesses when you are ready.</p>
            <Link to="/shop" className="pill-button mt-6 bg-ink text-white">Browse products</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4">
              {cart.map((item) => (
                <article key={item.id} className="glass-card flex flex-col gap-4 rounded-[28px] p-4 sm:flex-row">
                  <img src={item.images[0]} alt={item.title} className="h-32 w-full rounded-2xl object-cover sm:w-32" />
                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div>
                      <h3 className="font-black">{item.title}</h3>
                      <p className="text-sm capitalize text-slate-500">{item.category}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xl font-black">₹{item.price}</p>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="grid h-9 w-9 place-items-center rounded-full bg-white/70"><FiMinus /></button>
                        <span className="w-8 text-center font-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="grid h-9 w-9 place-items-center rounded-full bg-white/70"><FiPlus /></button>
                        <button onClick={() => removeFromCart(item.id)} className="grid h-9 w-9 place-items-center rounded-full bg-pastelPink text-rose-600"><FiTrash2 /></button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <aside className="glass-card h-fit rounded-[30px] p-6">
              <h2 className="text-2xl font-black">Order summary</h2>
              <div className="mt-5 grid gap-3 text-sm font-semibold">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>₹{shipping}</span></div>
                <div className="flex justify-between border-t border-white/60 pt-3 text-xl font-black"><span>Total</span><span>₹{cartTotal + shipping}</span></div>
              </div>
              <button
                onClick={() => {
                  if (!isCustomer) {
                    showToast("Please login to continue");
                    navigate("/login");
                    return;
                  }
                  if (cart.some((item) => isOwnProduct(item))) {
                    showToast("You cannot purchase your own product.");
                    return;
                  }
                  navigate("/checkout");
                }}
                className="pill-button mt-6 w-full bg-ink text-white"
              >
                Checkout
              </button>
            </aside>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
