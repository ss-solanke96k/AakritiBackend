import { useState, useEffect } from "react";
import { FiBox, FiDollarSign, FiShoppingBag, FiUsers, FiDatabase, FiTrash2, FiRefreshCw, FiCheckCircle, FiAlertTriangle, FiHardDrive } from "react-icons/fi";
import AnalyticsCard from "../components/AnalyticsCard";
import PageTransition from "../components/PageTransition";
import { products } from "../data/products";
import { toast } from "react-hot-toast";

export default function AdminDashboard() {
  const [mongoStatus, setMongoStatus] = useState({ connected: false, status: "checking", message: "Verifying connection..." });
  const [mongoSellers, setMongoSellers] = useState([]);
  const [refreshes, setRefreshes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchDbData() {
      try {
        setLoading(true);
        // Fetch MongoDB Connection Status
        const statusRes = await fetch("/api/mongodb/connection-status");
        const statusData = await statusRes.json();
        
        // Fetch MongoDB Sellers List
        const sellersRes = await fetch("/api/mongodb/sellers");
        const sellersData = await sellersRes.json();

        if (active) {
          if (statusData) setMongoStatus(statusData);
          if (sellersData && sellersData.success) {
            setMongoSellers(sellersData.sellers || []);
          }
        }
      } catch (err) {
        console.error("Failed to query MongoDB info:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchDbData();
    return () => {
      active = false;
    };
  }, [refreshes]);

  const handleDeleteSeller = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete seller "${name}" from MongoDB?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/mongodb/sellers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Artisan deleted successfully from MongoDB!");
        setRefreshes((prev) => prev + 1);
      } else {
        toast.error(data.message || "Failed to delete from database.");
      }
    } catch (err) {
      toast.error("Network connection error.");
    }
  };

  const handleResetCollection = async () => {
    if (!window.confirm("CRITICAL WARNING: Are you sure you want to reset and delete ALL registered sellers in MongoDB?")) {
      return;
    }
    try {
      const res = await fetch("/api/mongodb/sellers/reset", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("MongoDB collection cleared successfully!");
        setRefreshes((prev) => prev + 1);
      } else {
        toast.error(data.message || "Failed to clear collections.");
      }
    } catch (err) {
      toast.error("Network reset error.");
    }
  };

  return (
    <PageTransition>
      <section className="container-soft py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black">Admin dashboard</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500">Live analytics and real-time database synchronizations</p>
          </div>
          <button 
            type="button" 
            onClick={() => { setRefreshes(prev => prev + 1); toast.success("Refreshed live backend state!"); }} 
            className="flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2.5 text-xs font-black text-slate-800 shadow-sm border border-slate-200 outline-none hover:bg-slate-50 transition"
          >
            <FiRefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Sync Databases
          </button>
        </div>

        {/* Database Status Panel (MongoDB Status) */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="glass-card rounded-[30px] p-6 lg:col-span-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 uppercase text-[10px] font-black tracking-wider text-rose-600">
                  <FiDatabase className="h-3.5 w-3.5" /> Database Integration
                </span>
                {mongoStatus.connected ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    MONGODB LIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                    MONGODB LOCAL MOCK
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-2xl font-black tracking-tight">MongoDB Gateway</h2>
              <p className="mt-2 text-xs font-semibold text-slate-500 leading-relaxed">
                {mongoStatus.message}
              </p>

              {!mongoStatus.connected && (
                <div className="mt-4 rounded-2xl bg-amber-50/50 p-4 border border-amber-100 text-xs text-amber-900 leading-relaxed font-semibold">
                  <p className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                    <FiAlertTriangle className="h-3.5 w-3.5" /> Missing MONGODB_URI Key
                  </p>
                  To enable production database persistence, provide real MongoDB connection secrets in your <span className="font-mono bg-white px-1">.env</span> or settings panel.
                </div>
              )}
            </div>

            {mongoStatus.connected && (
              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={handleResetCollection}
                  className="w-full text-center py-2 px-3 text-xs font-black text-rose-600 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-100 transition flex items-center justify-center gap-1"
                >
                  <FiHardDrive className="h-3.5 w-3.5" /> Reset Collection
                </button>
              </div>
            )}
          </div>

          <div className="glass-card rounded-[30px] p-6 lg:col-span-2">
            <h2 className="text-2xl font-black">Live sales chart</h2>
            <div className="mt-6 flex h-48 items-end gap-4">
              {[42, 70, 55, 90, 76, 98, 82].map((height, index) => (
                <div key={index} style={{ height: `${height}%` }} className="flex-1 rounded-t-2xl bg-gradient-to-t from-secondary to-surface-soft" />
              ))}
            </div>
          </div>
        </div>

        {/* Analytics cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <AnalyticsCard icon={FiUsers} label="MongoDB Sellers" value={String(mongoSellers.length)} tone="bg-pastelPink" />
          <AnalyticsCard icon={FiUsers} label="Customers" value="8.4k" tone="bg-pastelBlue" />
          <AnalyticsCard icon={FiBox} label="Products" value="1.2k" tone="bg-mint" />
          <AnalyticsCard icon={FiDollarSign} label="GMV" value="₹12L" tone="bg-lavender" />
        </div>

        {/* MongoDB Registered Sellers Real-time Management */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-[30px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black">MongoDB Sellers Collection</h2>
              <span className="rounded-full bg-ink px-3 py-1 text-xs font-black text-white">{mongoSellers.length} Records</span>
            </div>
            
            {mongoSellers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400">
                <FiUsers className="h-10 w-10 stroke-1 mb-2 text-slate-300" />
                <p className="text-sm font-bold">No records stored in MongoDB yet</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">Register a new seller account to watch documents sync and save in your MongoDB cluster.</p>
              </div>
            ) : (
              <div className="grid gap-3 max-h-[360px] overflow-y-auto pr-1">
                {mongoSellers.map((seller) => (
                  <div key={seller._id || seller.id} className="flex items-center justify-between rounded-2xl bg-white/55 p-3.5 border border-slate-100 hover:border-slate-200 transition">
                    <div className="min-w-0 pr-2">
                      <p className="font-black text-sm truncate text-slate-800">{seller.name}</p>
                      <p className="text-xs font-bold text-slate-500 truncate">{seller.shopName || "No Shop Name"}</p>
                      <p className="text-[10px] font-semibold text-slate-400 font-mono mt-0.5 truncate">{seller.email} • {seller.phone}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteSeller(seller._id || seller.id, seller.name)}
                      className="h-8 w-8 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-400 flex items-center justify-center transition border border-slate-200/50"
                      title="Permanently remove"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Manage products</h2>
            <div className="mt-4 grid gap-3">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between rounded-2xl bg-white/55 p-3">
                  <span className="font-bold text-sm truncate pr-2">{product.title}</span>
                  <span className="shrink-0 rounded-full bg-mint px-3 py-1 text-xs font-black text-emerald-800">Approved</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {["Manage sellers", "Manage customers"].map((title) => (
            <div key={title} className="glass-card rounded-[30px] p-6">
              <h2 className="text-2xl font-black">{title}</h2>
              <div className="mt-4 grid gap-3">
                {["Verified", "Pending review", "Active"].map((status) => (
                  <div key={status} className="rounded-2xl bg-white/55 p-4 font-bold text-sm text-slate-700">
                    {status}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
