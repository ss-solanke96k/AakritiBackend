import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

// Protects dashboard pages and checks the user's fake frontend role.
export default function ProtectedRoute({ children, role }) {
  const { user, showToast } = useShop();
  const hasAccess = !role || (role === "customer" ? ["customer", "seller"].includes(user?.role) : user?.role === role);
  const isWrongRole = Boolean(user && !hasAccess);
  const message = !user
    ? role === "seller" ? "Seller access only" : "Please login first"
    : role === "seller" ? "Seller access only" : "Login required to continue";

  useEffect(() => {
    if (!user || isWrongRole) showToast(message);
  }, [isWrongRole, message, showToast, user]);

  if (!user) {
    return <Navigate to={role === "seller" ? "/seller-login" : "/login"} replace />;
  }

  if (isWrongRole) {
    return <Navigate to={user.role === "seller" ? "/seller-dashboard" : "/customer-dashboard"} replace />;
  }

  return children;
}
