import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiHeart, FiLogOut, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { NavLink, Link, useNavigate } from "react-router-dom";
import akritiLogo from "../assets/akritilogo.jpeg";
import { useShop } from "../context/ShopContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { cart, wishlist, user, logout, isCustomer, isSeller } = useShop();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (event) => {
  event.preventDefault();

  if (!search.trim()) return;

  navigate(`/shop?search=${encodeURIComponent(search.trim())}`);

  setShowSearch(false); // Close desktop search popup
  setOpen(false);       // Close mobile menu
};

  const linkClass = ({ isActive }) =>
    `px-2 py-2 text-sm font-bold transition ${isActive ? "border-b-2 border-secondary text-primary" : "text-text-primary hover:text-primary"}`;

  
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setShowSearch(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  return (
    <header className={`sticky top-0 z-[9999] border-b border-[rgba(75,21,52,0.12)] bg-white/95 backdrop-blur-[10px] transition-shadow ${scrolled ? "shadow-soft" : "shadow-sm"}`}>
      <nav className="container-soft flex min-h-20 items-center justify-between gap-3 py-3">
        <Link to="/" className="flex items-center" aria-label="Akriti home">
          <img
  src={akritiLogo}
  alt="Akriti"
  className="h-12 w-auto rounded-2xl border border-secondary/30 shadow-sm object-contain sm:h-14 lg:h-16"
/>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => <NavLink key={link.to} to={link.to} className={linkClass}>{link.label}</NavLink>)}
          {isSeller && <NavLink to="/seller-dashboard" className={linkClass}>Seller Dashboard</NavLink>}
        </div>

        <div className="flex items-center gap-2">

 <div
  ref={searchRef}
  className="relative"
>
  <button
    title="Search"
    onClick={() => setShowSearch(!showSearch)}
    className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm"
    aria-label="Search"
  >
    <FiSearch />
  </button>

  {showSearch && (
    <form
      onSubmit={submitSearch}
      className="absolute right-0 top-full z-50 mt-2 flex w-72 items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg"
    >
      <FiSearch className="text-primary" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full outline-none"
        autoFocus
      />

      <button
        type="submit"
        className="rounded-lg bg-primary px-3 py-1 text-white"
      >
        Go
      </button>
    </form>
  )}
</div>

        
          <div className="hidden items-center gap-2 lg:flex">
            {!user ? (
              <>
                <Link to="/login" className="pill-button bg-white px-4 py-2 text-ink shadow-sm hover:bg-pastelPink">Login</Link>
                <Link to="/seller-register" className="pill-button bg-secondary px-4 py-2 text-text-primary shadow-soft hover:-translate-y-0.5">Become a Seller</Link>
              </>
            ) : (
              <>
                <Link to={user.role === "seller" ? "/seller-dashboard" : "/customer-dashboard"} className="pill-button bg-white/70 px-4 py-2 text-ink shadow-sm">
                  <FiUser /> {user.role === "seller" ? "Seller" : "Customer"}
                </Link>
                <button title="Logout" onClick={logout} className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm" aria-label="Logout"><FiLogOut /></button>
              </>
            )}
          </div>
          {user && <Link title="Account dashboard" to={user.role === "seller" ? "/seller-dashboard" : "/customer-dashboard"} className="hidden h-11 w-11 place-items-center rounded-full bg-white shadow-sm sm:grid lg:hidden" aria-label="Account dashboard"><FiUser /></Link>}
          {isCustomer && (
            <Link title="View Wishlist" to="/account/wishlist" className="relative hidden h-11 w-11 place-items-center rounded-full bg-white shadow-sm sm:grid" aria-label="Wishlist">
              <FiHeart />
              {wishlist.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-black text-white">{wishlist.length}</span>}
            </Link>
          )}
          <Link title="Go to Cart" to="/cart" className="relative grid h-11 w-11 place-items-center rounded-full bg-ink text-white shadow-sm" aria-label="Cart">
            <FiShoppingBag />
            {itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-black text-white">{itemCount}</span>}
          </Link>
          <button title="Open menu" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full bg-white xl:hidden" aria-label="Open menu"><FiMenu /></button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed inset-y-0 right-0 z-50 w-80 max-w-[90vw] border-l border-primary/10 bg-[#FAF8F5] p-5 text-text-primary shadow-lift xl:hidden">
            <button onClick={() => setOpen(false)} className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-white/70"><FiX /></button>
            <div className="mt-8 grid gap-3">
              {navLinks.map((link) => <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={linkClass}>{link.label}</NavLink>)}
              {isSeller && <NavLink to="/seller-dashboard" onClick={() => setOpen(false)} className={linkClass}>Seller Dashboard</NavLink>}
              {!user ? (
                <>
                  <NavLink to="/login" onClick={() => setOpen(false)} className={linkClass}>Login</NavLink>
                  <NavLink to="/seller-login" onClick={() => setOpen(false)} className={linkClass}>Seller Login</NavLink>
                  <NavLink to="/seller-register" onClick={() => setOpen(false)} className={linkClass}>Become a Seller</NavLink>
                </>
              ) : (
                <>
                  <NavLink to={user.role === "seller" ? "/seller-dashboard" : "/customer-dashboard"} onClick={() => setOpen(false)} className={linkClass}>My Dashboard</NavLink>
                  <button onClick={() => { logout(); setOpen(false); }} className="rounded-full px-4 py-2 text-left text-sm font-bold transition hover:bg-white/60">Logout</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
