import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";
import FloatingActions from "../components/FloatingActions";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StartupLoader from "../components/StartupLoader";
import { Toaster } from "react-hot-toast";


export default function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="page-shell">
      <AnimatePresence>{loading && <StartupLoader />}</AnimatePresence>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingActions />
      <Toaster position="top-center" />
    </div>
  );
}
