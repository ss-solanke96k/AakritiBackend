import { useState } from "react";
import { FiArrowRight, FiHeart, FiShoppingBag, FiUserCheck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLayout from "../components/auth/AuthLayout";
import InputField from "../components/auth/InputField";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import { useShop } from "../context/ShopContext";

export default function Login() {
  const { login, showToast } = useShop();
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("customer");
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!/^\d{10}$/.test(form.mobile)) nextErrors.mobile = "Enter a valid 10 digit mobile number";
    if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (login({ phone: form.mobile, password: form.password, role: accountType })) navigate(accountType === "seller" ? "/seller-dashboard" : "/customer-dashboard");
  };

  return (
    <AuthLayout>
      <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[38px] bg-white/45 p-8 backdrop-blur">
          <span className="rounded-full bg-pastelPink px-4 py-2 text-sm font-black text-rose-600">Dual account access</span>
          <h1 className="mt-5 text-5xl font-black">Welcome back to Akriti</h1>
          <p className="mt-4 leading-8 text-slate-600">Use the same mobile number as a customer and seller. Akriti stores the selected role separately for the correct dashboard.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="glass-card rounded-[24px] p-5"><FiHeart className="text-2xl text-rose-500" /><p className="mt-3 font-black">Wishlist favorites</p></div>
            <div className="glass-card rounded-[24px] p-5"><FiShoppingBag className="text-2xl text-rose-500" /><p className="mt-3 font-black">Order history</p></div>
          </div>
        </div>
        <AuthCard title="Login" subtitle="Choose how you want to continue on Akriti.">
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div>
              <p className="mb-2 text-sm font-black">Login as</p>
              <div className="grid grid-cols-2 rounded-full bg-white/70 p-1">
                {["customer", "seller"].map((role) => (
                  <button key={role} type="button" onClick={() => setAccountType(role)} className={`rounded-full px-4 py-3 text-sm font-black capitalize transition ${accountType === role ? "bg-ink text-white" : "text-slate-600"}`}>
                    {role}
                  </button>
                ))}
              </div>
            </div>
            <InputField label="Mobile Number" value={form.mobile} error={errors.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value.replace(/\D/g, "").slice(0, 10) })} />
            <PasswordInput label="Password" value={form.password} error={errors.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold">
              <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
              <Link to="/forgot-password" className="text-rose-500">Forgot password?</Link>
            </div>
            <button className="pill-button bg-gradient-to-r from-secondary to-secondary-light text-ink hover:scale-[1.02]">Login <FiArrowRight /></button>
          </form>
          <div className="mt-5"><SocialLoginButtons onSocialLogin={(provider) => { if (login({ email: `${accountType}@${provider.toLowerCase()}.demo`, role: accountType })) { showToast(`${provider} ${accountType} login successful`); navigate(accountType === "seller" ? "/seller-dashboard" : "/customer-dashboard"); } }} /></div>
          <p className="mt-6 text-center text-sm font-semibold"> New to Akriti ? <Link to="/register" className="text-rose-500">Join as Customer</Link> or <Link to="/seller-register" className="text-rose-500">Join as Seller</Link></p>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
