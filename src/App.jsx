import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import { AddressesPage, OrdersPage, ProfilePage, WishlistPage } from "./pages/AccountPages";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import CustomerDashboard from "./pages/CustomerDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import PolicyPage from "./pages/PolicyPage";
import Register from "./pages/Register";
import SellerDashboard from "./pages/SellerDashboard";
import SellerLogin from "./pages/SellerLogin";
import SellerRegister from "./pages/SellerRegister";
import SellerStore from "./pages/SellerStore";
import Shop from "./pages/Shop";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<ProtectedRoute role="customer"><Checkout /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/seller-register" element={<SellerRegister />} />
          <Route path="/seller/:slug" element={<SellerStore />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/seller-dashboard" element={<ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>} />
          <Route path="/customer-dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/customer-dashboard/:section" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/account/orders" element={<ProtectedRoute role="customer"><OrdersPage /></ProtectedRoute>} />
          <Route path="/account/wishlist" element={<ProtectedRoute role="customer"><WishlistPage /></ProtectedRoute>} />
          <Route path="/account/addresses" element={<ProtectedRoute role="customer"><AddressesPage /></ProtectedRoute>} />
          <Route path="/account/profile" element={<ProtectedRoute role="customer"><ProfilePage /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies/:slug" element={<PolicyPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
