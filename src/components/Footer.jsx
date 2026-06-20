import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGlobe, FiHeart, FiMail, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import akritiLogo from "../assets/akritilogo.jpeg";

export default function Footer() {
  const { isCustomer, isSeller } = useShop();

  return (
    <footer className="border-t border-primary-dark bg-primary-dark pt-14 text-surface-soft">
      <div className="container-soft grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:max-w-sm">
          <Link to="/" className="flex items-center" aria-label="Akriti home">
                    <img
  src={akritiLogo}
  alt="Akriti"
  className="h-12 w-auto rounded-2xl border border-secondary/30 shadow-sm object-contain sm:h-14 lg:h-16"
/>
                  </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-surface-soft/80">
            Akriti is a creative handmade marketplace connecting talented artisans and small businesses with people who love unique handmade products.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-bold"><FiHeart className="text-secondary-light" /> Crafted for supporting small businesses.</p>
        </div>

        <div>
          <h3 className="font-black text-white">Customer Support</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-surface-soft/80">
            <Link to="/shop">Shop</Link>
            <Link to={isCustomer ? "/account/orders" : "/login"}>Orders and wishlist</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/contact">Contact support</Link>
          </div>
        </div>

        <div>
          <h3 className="font-black text-white">Seller Support</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-surface-soft/80">
            <Link to={isSeller ? "/seller-dashboard" : "/seller-register"}>{isSeller ? "Seller dashboard" : "Become a seller"}</Link>
            <Link to="/seller-login">Seller login</Link>
            <Link to="/contact">Shipping help</Link>
            <Link to="/contact">Return policy tools</Link>
          </div>
        </div>

        <div>
          <h3 className="font-black text-white">Policies</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-surface-soft/80">
            <Link to="/policies/returns-exchange">Returns and exchange</Link>
            <Link to="/policies/payment-issues">Payment issues</Link>
            <Link to="/policies/delivery-delay">Delivery delay</Link>
            <Link to="/policies/customization-queries">Customization queries</Link>
          </div>
          <h2 className="mt-7 font-black text-white">Akriti Support</h2>

<div className="mt-4 flex gap-3">
  <a
    href="mailto:support@akriti.com"
    title="Email"
    className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-secondary-light shadow-sm transition hover:-translate-y-1 hover:text-white"
  >
    <FiMail />
  </a>

  <a
    href="https://www.instagram.com/akriti"
    target="_blank"
    rel="noreferrer"
    title="Instagram"
    className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-secondary-light shadow-sm transition hover:-translate-y-1 hover:text-white"
  >
    <FaInstagram />
  </a>
</div>

<div className="mt-4 text-sm font-semibold text-surface-soft/80">
  <p className="flex items-center gap-2">
    <FiPhone />
    +91 92268 72234
  </p>

  <p className="mt-2 flex items-center gap-2">
    <FiPhone />
    +91 88560 52873
  </p>
</div>
      </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-sm font-semibold leading-7 text-surface-soft/80">
        © 2026 Akriti Marketplace.<br />
        All rights reserved. <br />
        Built by AXINEX TECHNOLOGIES
        <div className="mt-4 flex justify-center gap-3">
          <a href="https://axinextechnologies.com" target="_blank" rel="noreferrer" title="Website" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-secondary-light hover:text-white shadow-sm transition hover:-translate-y-1"><FiGlobe /></a>
          <a href="mailto:axinex.technologies@gmail.com" title="Email" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-secondary-light hover:text-white shadow-sm transition hover:-translate-y-1"><FiMail /></a>
          <a href="https://www.linkedin.com/company/axinex-technologies/" target="_blank" rel="noreferrer" title="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-secondary-light hover:text-white shadow-sm transition hover:-translate-y-1"><FaLinkedin /></a>
          <a href="https://www.instagram.com/axinex_technologies?igsh=OHpsajNvOWMxOXlx" target="_blank" rel="noreferrer" title="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-secondary-light hover:text-white shadow-sm transition hover:-translate-y-1"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}
