import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLayout from "../components/auth/AuthLayout";
import InputField from "../components/auth/InputField";
import { useShop } from "../context/ShopContext";

export default function ForgotPassword() {
  const { showToast } = useShop();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    showToast("Password reset link sent");
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-xl">
        <AuthCard title="Forgot Password" subtitle="Enter your account email and we will show a fake success message for the reset flow." side="left">
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <InputField label="Email Address" type="email" value={email} error={error} onChange={(event) => setEmail(event.target.value)} />
            <button className="pill-button bg-gradient-to-r from-secondary to-secondary-light text-ink hover:scale-[1.02]"><FiMail /> Send reset link</button>
          </form>
          <div className="mt-6 flex justify-center gap-4 text-sm font-bold">
            <Link to="/login" className="text-rose-500">Customer login</Link>
            <Link to="/seller-login" className="text-rose-500">Seller login</Link>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
