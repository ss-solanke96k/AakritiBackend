import { FiBarChart2, FiBell, FiBox, FiGrid, FiHeart, FiHome, FiPlusCircle, FiSettings, FiShoppingBag, FiUser, FiUsers } from "react-icons/fi";

const iconMap = { overview: FiHome, dashboard: FiHome, products: FiBox, orders: FiShoppingBag, wishlist: FiHeart, addresses: FiHome, profile: FiUser, analytics: FiBarChart2, customers: FiUsers, inventory: FiBox, "add-product": FiPlusCircle, categories: FiGrid, users: FiUsers, notifications: FiBell, settings: FiSettings };

export default function DashboardSidebar({ title, items, active, setActive }) {
  return (
    <aside className="glass-card h-fit rounded-[30px] p-5 lg:sticky lg:top-24">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-6 grid gap-2">
        {items.map((item) => {
          const Icon = iconMap[item.id] || FiHome;
          return (
            <button key={item.id} onClick={() => setActive(item.id)} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${active === item.id ? "bg-ink text-white" : "bg-white/55 hover:bg-pastelBlue"}`}>
              <Icon /> {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
