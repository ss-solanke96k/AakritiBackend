import { useState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLayout from "../components/auth/AuthLayout";
import InputField from "../components/auth/InputField";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import { useShop } from "../context/ShopContext";

export default function SellerLogin() {
  const { login, showToast } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.email.includes("@")) nextErrors.email = "Enter a valid seller email";
    if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (login({ email: form.email, password: form.password, role: "seller" })) navigate("/seller-dashboard");
  };

  return (
    <AuthLayout>
      <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[38px] bg-white/45 p-8 backdrop-blur">
          <span className="rounded-full bg-mint px-4 py-2 text-sm font-black text-emerald-700">Seller access</span>
          <h2 className="mt-5 text-5xl font-black">Return to your maker dashboard</h2>
          <p className="mt-4 leading-8 text-slate-600">Login to manage product listings, orders, customer messages, and shop analytics.</p>
          <div className="mt-6 grid gap-3">
            {["Dashboard redirect after login", "Verified seller workspace", "Order and product tools"].map((item) => (
              <p key={item} className="flex items-center gap-2 font-bold"><FiCheckCircle className="text-emerald-500" /> {item}</p>
            ))}
          </div>
        </div>
        <AuthCard title="Seller Login" subtitle="Use your seller email to continue to the Akriti studio.">
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <InputField label="Email" type="email" value={form.email} error={errors.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <PasswordInput label="Password" value={form.password} error={errors.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold">
              <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
              <Link to="/forgot-password" className="text-rose-500">Forgot password?</Link>
            </div>
            <button className="pill-button bg-gradient-to-r from-secondary to-secondary-light text-ink hover:scale-[1.02]">Go to dashboard <FiArrowRight /></button>
          </form>
          <div className="mt-5"><SocialLoginButtons onSocialLogin={(provider) => { if (login({ email: `seller@${provider.toLowerCase()}.demo`, role: "seller" })) { showToast(`${provider} seller login successful`); navigate("/seller-dashboard"); } }} /></div>
          <p className="mt-6 text-center text-sm font-semibold">New seller? <Link to="/seller-register" className="text-rose-500">Create seller shop</Link></p>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
