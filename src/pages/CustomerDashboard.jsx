import DashboardSidebar from "../components/DashboardSidebar";
import OrderHistory from "../components/OrderHistory";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
import { useNavigate, useParams } from "react-router-dom";

const items = [
  { id: "orders", label: "Orders" },
  { id: "wishlist", label: "Wishlist" },
  { id: "addresses", label: "Addresses" },
  { id: "profile", label: "Profile" }
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { section } = useParams();
  const active = items.some((item) => item.id === section) ? section : "orders";
  const { wishlist, recentlyViewed, notifications, user, cart } = useShop();
  const customerNotifications = notifications.filter((item) => item.role === "customer");
  const setActive = (next) => navigate(`/customer-dashboard/${next}`);

  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar title="My Account" items={items} active={active} setActive={setActive} />
        <div className="space-y-8">
          <h1 className="text-4xl font-black">Customer dashboard</h1>
          <div className="grid gap-5 md:grid-cols-4">
            {[
              ["Total Orders", 10],
              ["Wishlist", wishlist.length],
              ["Cart Items", cart.reduce((total, item) => total + item.quantity, 0)],
              ["Recent Purchases", 2]
            ].map(([label, value]) => (
              <div key={label} className="glass-card marketplace-card rounded-[24px] p-5"><p className="text-sm font-bold text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>
            ))}
          </div>
          {active === "orders" && (
            <>
              <div className="glass-card rounded-[30px] p-6">
                <h2 className="mb-5 text-2xl font-black">Order tracking</h2>
                <OrderHistory />
              </div>
              <div className="glass-card rounded-[30px] p-6">
                <h2 className="text-2xl font-black">Notifications</h2>
                <div className="mt-4 grid gap-3">{customerNotifications.map((item) => <p key={item.id} className="rounded-2xl bg-white/60 p-4 font-bold">{item.text}</p>)}</div>
              </div>
            </>
          )}
          {active === "wishlist" && <div>
            <h2 className="mb-5 text-2xl font-black">Wishlist</h2>
            {wishlist.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{wishlist.map((product) => <ProductCard key={product.id} product={product} onQuickView={() => {}} />)}</div> : <div className="glass-card rounded-[28px] p-8 text-center"><p className="text-2xl font-black">No wishlist items yet.</p><p className="mt-2 text-sm text-slate-600">Tap the heart on a product after login to save it here.</p></div>}
          </div>}
          {active === "addresses" && <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Saved addresses</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input placeholder="Name" defaultValue={user?.name || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
              <input placeholder="Mobile" defaultValue={user?.phone || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
              <input placeholder="Address" defaultValue={user?.address || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none md:col-span-2" />
            </div>
          </div>}
          {active === "profile" && <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Profile details</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input placeholder="Name" defaultValue={user?.name || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
              <input placeholder="Email" defaultValue={user?.email || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
              <input placeholder="Mobile" defaultValue={user?.phone || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
              <input placeholder="Role" defaultValue={user?.role || "customer"} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold capitalize outline-none" />
            </div>
          </div>}
          <div>
            <h2 className="mb-5 text-2xl font-black">Product suggestions</h2>
            {recentlyViewed.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{recentlyViewed.map((product) => <ProductCard key={product.id} product={product} onQuickView={() => {}} />)}</div> : <p className="glass-card rounded-[24px] p-6 font-bold">Recently viewed and wishlist-based suggestions will appear here.</p>}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
