import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { categories, products } from "../data/products";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sellerProducts, setSellerProducts] = useState(() => JSON.parse(localStorage.getItem("akriti-seller-products") || "[]"));
  const [sellerCategories, setSellerCategories] = useState(() => JSON.parse(localStorage.getItem("akriti-seller-categories") || "[]"));
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem("akriti-reviews") || "{}"));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("akriti-orders") || JSON.stringify([
    { id: "AK-1008", productId: 3, status: "Shipped", payment: "UPI", expectedDelivery: "27 May 2026" },
    { id: "AK-0997", productId: 5, status: "Processing", payment: "UPI", expectedDelivery: "30 May 2026" },
    { id: "AK-0996", productId: 6, status: "Delivered", payment: "Card", deliveredAt: "15 May 2026" }
  ])));
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("akriti-notifications");
    return saved ? JSON.parse(saved) : [
      { id: "n1", role: "customer", text: "Welcome to Akriti. Track handmade orders here.", read: false },
      { id: "n2", role: "seller", text: "New order notifications will appear in your seller studio.", read: false }
    ];
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("akriti-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });


  // Persist fake frontend authentication so refreshes keep the user logged in.
  useEffect(() => {
    if (user) {
      localStorage.setItem("akriti-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("akriti-user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("akriti-notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("akriti-seller-products", JSON.stringify(sellerProducts));
  }, [sellerProducts]);

  useEffect(() => {
    localStorage.setItem("akriti-seller-categories", JSON.stringify(sellerCategories));
  }, [sellerCategories]);

  useEffect(() => {
    localStorage.setItem("akriti-reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("akriti-orders", JSON.stringify(orders));
  }, [orders]);

  const showToast = useCallback((message) => {
    toast(message, {
      duration: 2400,
      style: {
        background: "#FAF8F5",
        border: "1px solid rgba(75,21,52,0.12)",
        color: "#1F1A17",
        fontWeight: 800,
        borderRadius: "999px"
      }
    });
  }, []);

  const redirectToLogin = useCallback((message = "Please login first") => {
    showToast(message);
    window.setTimeout(() => {
      window.location.href = "/login";
    }, 450);
  }, [showToast]);

  const isLoggedIn = Boolean(user);
  const role = user?.role || null;
  const isCustomer = isLoggedIn && (role === "customer" || role === "seller");
  const isSeller = isLoggedIn && role === "seller";

  const isOwnProduct = useCallback((product) => Boolean(user?.id && product?.sellerId && product.sellerId === user.id), [user?.id]);

  const addToCart = (product, quantity = 1) => {
    if (!isCustomer) {
      redirectToLogin("Please register before purchasing");
      return false;
    }
    if (isOwnProduct(product)) {
      showToast("You cannot purchase your own product.");
      return false;
    }
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...items, { ...product, quantity }];
    });
    showToast(`${product.title} added to cart`);
    return true;
  };

  const getAccounts = () => JSON.parse(localStorage.getItem("akriti-accounts") || "[]");
  const saveAccounts = (accounts) => localStorage.setItem("akriti-accounts", JSON.stringify(accounts));
  const getPendingOtps = () => JSON.parse(localStorage.getItem("akriti-pending-otps") || "{}");
  const savePendingOtps = (otps) => localStorage.setItem("akriti-pending-otps", JSON.stringify(otps));

  const addNotification = (role, text) => {
    setNotifications((items) => [{ id: `n-${Date.now()}`, role, text, read: false }, ...items].slice(0, 12));
  };

  const removeFromCart = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
    showToast("Item removed from cart");
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCart((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const toggleWishlist = (product) => {
    if (!isCustomer) {
      redirectToLogin("Login required to continue");
      return false;
    }
    setWishlist((items) => {
      const exists = items.some((item) => item.id === product.id);
      showToast(exists ? "Removed from wishlist" : "Added to wishlist");
      return exists ? items.filter((item) => item.id !== product.id) : [...items, product];
    });
    return true;
  };

  const addRecentlyViewed = useCallback((product) => {
    setRecentlyViewed((items) => [product, ...items.filter((item) => item.id !== product.id)].slice(0, 4));
  }, []);

  // Fake authentication helpers keep this project frontend-only.
  const login = ({ email, phone, password, role = "customer" }) => {
    const accounts = getAccounts();
    const account = accounts.find((item) =>
      (item.role === role || item.roles?.includes(role)) &&
      (item.email?.toLowerCase() === email?.toLowerCase() || item.phone === phone) &&
      (!password || item.password === password)
    );
    if (role === "seller" && !account) {
      showToast("Please complete Seller Registration first");
      return false;
    }
    if (!account && accounts.length) {
      showToast("No matching account found");
      return false;
    }
    const name = account?.name || email?.split("@")[0] || (role === "seller" ? "Seller" : "Customer");
    const roles = account?.roles || [role];
    if (role === "seller" && !roles.includes("seller")) {
      showToast("Please complete Seller Registration first");
      return false;
    }
    setUser({ ...account, name, email: account?.email || email, phone: account?.phone || phone, roles, role });
    showToast(`${role === "seller" ? "Seller" : "Customer"} login successful`);
    return true;
  };

  const requestOtp = (account) => {
    const role = account.role || "customer";
    const accounts = getAccounts();
    const emailExists = accounts.some((item) => item.email?.toLowerCase() === account.email?.toLowerCase() && (item.role === role || item.roles?.includes(role)));
    const phoneExists = accounts.some((item) => item.phone === account.phone && (item.role === role || item.roles?.includes(role)));
    if (emailExists || phoneExists) {
      showToast(emailExists ? "Email already registered" : "Mobile number already registered");
      return null;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const key = account.email?.toLowerCase() || account.phone;
    const pending = getPendingOtps();
    pending[key] = { account: { ...account, role, roles: [role] }, code, expiresAt: Date.now() + 5 * 60 * 1000 };
    savePendingOtps(pending);
    showToast(`OTP sent: ${code}`);
    return code;
  };

  const verifyOtpAndRegister = ({ email, phone, otp }) => {
    const key = email?.toLowerCase() || phone;
    const pending = getPendingOtps();
    const entry = pending[key];
    if (!entry) {
      showToast("Please request OTP first");
      return false;
    }
    if (Date.now() > entry.expiresAt) {
      delete pending[key];
      savePendingOtps(pending);
      showToast("OTP expired. Please resend OTP");
      return false;
    }
    if (entry.code !== otp) {
      showToast("Invalid OTP");
      return false;
    }
    delete pending[key];
    savePendingOtps(pending);
    return register(entry.account);
  };

  const register = (account) => {
    const role = account.role || "customer";
    const accounts = getAccounts();
    const emailExists = accounts.some((item) => item.email?.toLowerCase() === account.email?.toLowerCase() && (item.role === role || item.roles?.includes(role)));
    const phoneExists = accounts.some((item) => item.phone === account.phone && (item.role === role || item.roles?.includes(role)));
    if (emailExists || phoneExists) {
      showToast(emailExists ? "Email already registered" : "Mobile number already registered");
      return false;
    }
    const existingByPhone = accounts.find((item) => item.phone === account.phone);
    const roles = [...new Set([...(existingByPhone?.roles || []), ...(account.roles || []), role])];
    const savedAccount = { ...account, role, roles, id: `acc-${Date.now()}` };
    saveAccounts([...accounts, savedAccount]);
    setUser(savedAccount);
    showToast(`${role === "seller" ? "Seller" : "Customer"} account created`);
    addNotification(role, role === "seller" ? "Seller store registered successfully" : "Customer account created successfully");
    return true;
  };

  const addSellerCategory = ({ name, description }) => {
    const normalized = name.trim().toLowerCase();
    if (!normalized) {
      showToast("Category name is required");
      return false;
    }
    if ([...sellerCategories, ...products.map((product) => ({ name: product.category }))].some((item) => item.name === normalized || item === normalized)) {
      showToast("Category already exists");
      return false;
    }
    setSellerCategories((items) => [...items, { id: `cat-${Date.now()}`, name: normalized, description }]);
    showToast("Category created");
    return true;
  };

  const updateSellerCategory = (id, updates) => {
    setSellerCategories((items) => items.map((item) => (item.id === id ? { ...item, ...updates, name: updates.name?.trim().toLowerCase() || item.name } : item)));
    showToast("Category updated");
  };

  const deleteSellerCategory = (id) => {
    setSellerCategories((items) => items.filter((item) => item.id !== id));
    showToast("Category deleted");
  };

  const addSellerProduct = (product) => {
    const savedProduct = {
      ...product,
      id: `seller-${Date.now()}`,
      sellerId: user?.id,
      price: Number(product.price || product.basePrice || 0),
      rating: 0,
      reviews: [],
      trend: false,
      discount: Number(product.discount || 0)
    };
    setSellerProducts((items) => [savedProduct, ...items]);
    addNotification("seller", `${product.title} saved as a seller product`);
    showToast("Product saved successfully");
    return savedProduct;
  };

  const updateSellerProduct = (id, updates) => {
    setSellerProducts((items) => items.map((item) => (item.id === id ? { ...item, ...updates, price: Number(updates.price ?? item.price), stock: Number(updates.stock ?? item.stock ?? 0) } : item)));
    addNotification("seller", "Product details updated");
    showToast("Product updated");
  };

  const deleteSellerProduct = (id) => {
    setSellerProducts((items) => items.filter((item) => item.id !== id));
    addNotification("seller", "Product deleted from seller listing");
    showToast("Product deleted");
  };

  const addReview = ({ productId, rating, text }) => {
    const delivered = orders.some((order) => Number(order.productId) === Number(productId) && order.status === "Delivered");
    if (!delivered) {
      showToast("Reviews are available after successful delivery");
      return false;
    }
    const review = { user: user?.name || "Customer", rating: Number(rating), text, createdAt: new Date().toISOString() };
    setReviews((items) => ({ ...items, [productId]: [review, ...(items[productId] || [])] }));
    showToast("Thanks for your feedback");
    return true;
  };

  const placeOrder = ({ payment = "UPI" } = {}) => {
    if (!cart.length) {
      showToast("Your cart is empty");
      return false;
    }
    if (cart.some((item) => isOwnProduct(item))) {
      showToast("You cannot purchase your own product.");
      return false;
    }
    const createdOrders = cart.map((item, index) => ({
      id: `AK-${Date.now().toString().slice(-6)}-${index + 1}`,
      productId: item.id,
      status: "Pending",
      payment,
      expectedDelivery: "5-8 business days"
    }));
    setOrders((items) => [...createdOrders, ...items]);
    setCart([]);
    showToast("Order placed successfully");
    addNotification("customer", "Order placed notification: your handmade order is confirmed.");
    addNotification("seller", "New order notification: prepare and ship a customer order.");
    return true;
  };

  const cancelOrder = (orderId) => {
    const order = orders.find((item) => item.id === orderId);
    if (!order) return false;
    if (!["Pending", "Processing"].includes(order.status)) {
      showToast("Only pending or processing orders can be cancelled.");
      return false;
    }
    setOrders((items) => items.map((item) => item.id === orderId ? { ...item, status: "Cancelled" } : item));
    showToast("Order cancelled successfully.");
    return true;
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
    showToast("Logged out successfully");
  };

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const value = {
    products: [...sellerProducts, ...products],
    baseProducts: products,
    categories: [...new Set([...categories, ...sellerCategories.map((category) => category.name)])],
    sellerCategories,
    sellerProducts,
    reviews,
    orders,
    cart,
    wishlist,
    user,
    role,
    isLoggedIn,
    isCustomer,
    isSeller,
    isOwnProduct,
    isAuthenticated: isLoggedIn,
    recentlyViewed,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    showToast,
    redirectToLogin,
    addRecentlyViewed,
    login,
    register,
    requestOtp,
    verifyOtpAndRegister,
    logout,
    notifications,
    addNotification,
    placeOrder,
    cancelOrder,
    addSellerCategory,
    updateSellerCategory,
    deleteSellerCategory,
    addSellerProduct,
    updateSellerProduct,
    deleteSellerProduct,
    addReview
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}


export function useShop() {
  return useContext(ShopContext);
}
