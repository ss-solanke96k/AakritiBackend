import { useEffect, useMemo, useState } from "react";
import { FiAlertTriangle, FiBell, FiBox, FiDollarSign, FiEdit3, FiPlusCircle, FiSave, FiShoppingBag, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import AnalyticsCard from "../components/AnalyticsCard";
import DashboardSidebar from "../components/DashboardSidebar";
import PageTransition from "../components/PageTransition";
import { useShop } from "../context/ShopContext";

const items = [
  { id: "dashboard", label: "Dashboard" },
  { id: "products", label: "Products" },
  { id: "orders", label: "Orders" },
  { id: "analytics", label: "Analytics" },
  { id: "customers", label: "Customers" },
  { id: "inventory", label: "Inventory" },
  { id: "add-product", label: "Add Product" },
  { id: "settings", label: "Settings" }
];

export default function SellerDashboard() {
  const [active, setActive] = useState("dashboard");
  const shop = useShop();
  const sellerNotifications = shop.notifications.filter((item) => item.role === "seller");
  const lowStock = shop.products.filter((product) => Number(product.stock ?? 12) > 0 && Number(product.stock ?? 12) <= 5);

  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar title="Seller Studio" items={items} active={active} setActive={setActive} />
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="heading-font text-4xl font-black">Seller dashboard</h1>
              <p className="mt-2 text-sm font-semibold text-slate-600">Manage listings, stock, categories, images, and marketplace alerts.</p>
            </div>
            <span className="rounded-full bg-mint px-4 py-2 text-sm font-black text-emerald-700">82% store completion</span>
          </div>
          {active === "dashboard" && <DashboardHome sellerNotifications={sellerNotifications} products={shop.products} lowStock={lowStock} />}
          {active === "products" && <ProductsSection products={shop.products} updateSellerProduct={shop.updateSellerProduct} deleteSellerProduct={shop.deleteSellerProduct} showToast={shop.showToast} />}
          {active === "orders" && <ListSection title="Order management" items={["New order received: AK-2041", "Pending orders: 12", "Delivered orders: 84", "Return requests: 3"]} />}
          {active === "analytics" && <DashboardHome sellerNotifications={sellerNotifications} products={shop.products} lowStock={lowStock} />}
          {active === "customers" && <ListSection title="Customers" items={["Repeat customers: 42", "New customers this month: 18", "Pending feedback requests: 5", "Wishlist saves: 62"]} />}
          {active === "inventory" && <LowStockAlerts lowStock={lowStock} />}
          {active === "add-product" && <AddProduct {...shop} />}
          {active === "settings" && <ListSection title="Settings" items={["Shipping price: Rs. 69 base", "Delivery regions: All India", "Pincode pricing enabled", "Estimated delivery: 4-8 days"]} />}
        </div>
      </section>
    </PageTransition>
  );
}

function DashboardHome({ sellerNotifications, products, lowStock }) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-4">
        <AnalyticsCard icon={FiBox} label="Total Products" value={String(products.length)} tone="bg-pastelBlue" />
        <AnalyticsCard icon={FiShoppingBag} label="Orders" value="128" tone="bg-pastelPink" />
        <AnalyticsCard icon={FiDollarSign} label="Revenue" value="Rs. 82k" tone="bg-mint" />
        <AnalyticsCard icon={FiAlertTriangle} label="Low Stock Items" value={String(lowStock.length)} tone="bg-lavender" />
      </div>
      <LowStockAlerts lowStock={lowStock.slice(0, 4)} compact />
      <div className="glass-card rounded-[30px] p-6">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-black"><FiBell /> Notifications Panel</h2>
        <div className="grid gap-3">
          {[
            "Product running low: Cotton Kurti only 5 items left.",
            "Product out of stock: Handcrafted Wall Clock.",
            "New order received: Brass Diya x 2."
          ].map((item) => <p key={item} className="rounded-2xl bg-white/60 p-4 font-bold">{item}</p>)}
          {sellerNotifications.map((item) => <p key={item.id} className="rounded-2xl bg-white/60 p-4 font-bold">{item.text}</p>)}
        </div>
      </div>
    </>
  );
}

function LowStockAlerts({ lowStock, compact = false }) {
  return (
    <div className="glass-card rounded-[30px] p-6">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-black"><FiAlertTriangle className="text-amber-500" /> Low Stock Alerts</h2>
      {lowStock.length ? (
        <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {lowStock.map((product) => (
            <div key={product.id} className="rounded-2xl bg-amber-50 p-4 font-bold text-amber-900">
              <p>{product.title}</p>
              <p className="mt-1 text-sm">Only {product.stock} items left.</p>
            </div>
          ))}
        </div>
      ) : <p className="rounded-2xl bg-white/60 p-4 font-bold">No low stock products right now.</p>}
    </div>
  );
}

function ProductsSection({ products, updateSellerProduct, deleteSellerProduct, showToast }) {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setRows(products.slice(0, 18).map((product) => ({ ...product, stock: Number(product.stock ?? 12) })));
  }, [products]);

  const saveProduct = (updates) => {
    setRows((current) => current.map((item) => (item.id === updates.id ? { ...item, ...updates } : item)));
    if (String(updates.id).startsWith("seller-")) updateSellerProduct(updates.id, updates);
    showToast("Product updated");
    setEditing(null);
  };

  const removeProduct = (id) => {
    setRows((current) => current.filter((item) => item.id !== id));
    if (String(id).startsWith("seller-")) deleteSellerProduct(id);
    else showToast("Mock product deleted from dashboard view");
  };

  return (
    <div className="glass-card overflow-x-auto rounded-[30px] p-6">
      <h2 className="mb-4 text-2xl font-black">Product Management</h2>
      <table className="w-full min-w-[880px] text-left text-sm">
        <thead>
          <tr className="text-slate-500"><th className="py-3">Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {rows.map((product) => (
            <tr key={product.id} className="border-t border-white/60">
              <td className="py-3 font-bold">{product.title}</td>
              <td className="capitalize">{product.category}</td>
              <td>Rs. {product.price}</td>
              <td>{product.stock}</td>
              <td><StockBadge stock={product.stock} /></td>
              <td className="flex gap-2 py-3">
                <button onClick={() => setEditing(product)} title="Edit Product" className="grid h-10 w-10 place-items-center rounded-full bg-pastelBlue text-ink"><FiEdit3 /></button>
                <button onClick={() => removeProduct(product.id)} title="Delete Product" className="grid h-10 w-10 place-items-center rounded-full bg-red-100 text-red-600"><FiTrash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && <ProductEditModal product={editing} onClose={() => setEditing(null)} onSave={saveProduct} />}
    </div>
  );
}

function ProductEditModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({ ...product, imageFile: null });
  return (
    <div className="fixed inset-0 z-[10000] grid place-items-center bg-black/40 p-4 backdrop-blur">
      <div className="glass-card w-full max-w-2xl rounded-[28px] p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black">Edit Product</h3>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/70"><FiX /></button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
          <input type="number" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
          <input type="number" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
          <input type="file" accept="image/*" onChange={(event) => setForm({ ...form, imageFile: event.target.files?.[0] })} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
        </div>
        <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-4 min-h-28 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
        <button onClick={() => onSave({ ...form, stock: Number(form.stock), price: Number(form.price) })} className="pill-button mt-5 bg-ink text-white"><FiSave /> Save changes</button>
      </div>
    </div>
  );
}

function StockBadge({ stock }) {
  const label = stock <= 0 ? "Out of Stock" : stock <= 5 ? "Low Stock" : "In Stock";
  const tone = stock <= 0 ? "bg-red-100 text-red-700" : stock <= 5 ? "bg-amber-100 text-amber-700" : "bg-mint text-emerald-800";
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${tone}`}>{label}</span>;
}

function AddProduct({ categories, sellerCategories, addSellerCategory, updateSellerCategory, deleteSellerCategory, addSellerProduct, showToast }) {
  const [productData, setProductData] = useState({ title: "", category: "", basePrice: "", stock: "", description: "", careInstructions: "", returnPolicy: "", shippingInfo: "" });
  const [productImages, setProductImages] = useState([]);
  const [optimized, setOptimized] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "", id: null });
  const [saving, setSaving] = useState(false);

  const imagePreviews = useMemo(() => productImages.map((image) => URL.createObjectURL(image)), [productImages]);

  const handleImages = (files) => {
    const selected = Array.from(files).filter((file) => ["image/jpeg", "image/png"].includes(file.type));
    if (selected.some((file) => file.size > 5 * 1024 * 1024)) return showToast("Each product image must be 5MB or less");
    setProductImages(selected.slice(0, 6));
    setOptimized(false);
    window.setTimeout(() => {
      setOptimized(true);
      showToast("Images optimized successfully");
    }, 550);
  };

  const saveCategory = (event) => {
    event.preventDefault();
    if (categoryForm.id) updateSellerCategory(categoryForm.id, categoryForm);
    else if (addSellerCategory(categoryForm)) setProductData((data) => ({ ...data, category: categoryForm.name.trim().toLowerCase() }));
    setCategoryForm({ name: "", description: "", id: null });
    setCategoryModal(false);
  };

  const handleSaveProduct = () => {
    if (!productData.title.trim() || !productData.category || !productData.basePrice || !productData.stock) return showToast("Complete product title, category, price and stock");
    if (productImages.length < 3 || productImages.length > 6) return showToast("Upload 3 to 6 product images");
    setSaving(true);
    window.setTimeout(() => {
      addSellerProduct({
        title: productData.title,
        category: productData.category,
        price: productData.basePrice,
        stock: Number(productData.stock),
        description: productData.description,
        images: imagePreviews,
        handmadeDetails: productData.careInstructions || productData.description,
        estimatedDelivery: productData.shippingInfo || "4-8 days",
        policy: { returnAvailable: true, returnDays: 7, refundRules: productData.returnPolicy || "Seller policy applies." },
        seller: { name: "Akriti Seller Studio", location: "India", verified: true, avatar: imagePreviews[0], rating: 0, story: productData.description, socials: { instagram: "#", website: "#" } }
      });
      setSaving(false);
      setProductData({ title: "", category: "", basePrice: "", stock: "", description: "", careInstructions: "", returnPolicy: "", shippingInfo: "" });
      setProductImages([]);
      setOptimized(false);
    }, 500);
  };

  return (
    <div className="grid gap-6">
      <div className="glass-card rounded-[30px] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-black">Add Product</h2>
          <button onClick={() => setCategoryModal(true)} className="pill-button bg-pastelBlue text-ink"><FiPlusCircle /> Add New Category</button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <input name="title" placeholder="Product title" value={productData.title} onChange={(event) => setProductData({ ...productData, title: event.target.value })} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
          <select value={productData.category} onChange={(event) => event.target.value === "__new" ? setCategoryModal(true) : setProductData({ ...productData, category: event.target.value })} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold capitalize outline-none">
            <option value="">Select category</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            <option value="__new">+ Add New Category</option>
          </select>
          <input type="number" placeholder="Base price" value={productData.basePrice} onChange={(event) => setProductData({ ...productData, basePrice: event.target.value })} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
          <input type="number" placeholder="Stock quantity" value={productData.stock} onChange={(event) => setProductData({ ...productData, stock: event.target.value })} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
        </div>
        <textarea placeholder="Product description" value={productData.description} onChange={(event) => setProductData({ ...productData, description: event.target.value })} className="mt-4 min-h-32 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />

        <div className="mt-8 rounded-[26px] bg-white/50 p-5">
          <h3 className="text-xl font-black">Upload 3-6 product images</h3>
          <ul className="mt-3 grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-2">
            <li>Use clear, well-lit images</li>
            <li>Show product from different angles</li>
            <li>Include close-up images of important details</li>
            <li>Use plain background if possible</li>
          </ul>
          <p className="mt-3 text-xs font-bold text-slate-500">Formats: JPG, PNG. Max size: 5MB each.</p>
          <label className="mt-5 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-pastelPink bg-white/60 px-4 py-6 font-black">
            <FiUpload /> Upload product images
            <input type="file" multiple accept="image/png,image/jpeg" onChange={(event) => handleImages(event.target.files || [])} className="hidden" />
          </label>
          {optimized && <p className="mt-4 rounded-2xl bg-mint p-4 text-sm font-black text-emerald-800">Images optimized successfully.</p>}
          <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {imagePreviews.map((image, index) => <img key={index} src={image} alt={`Product preview ${index + 1}`} className="aspect-square w-full rounded-2xl object-cover" />)}
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <textarea placeholder="Care instructions" value={productData.careInstructions} onChange={(event) => setProductData({ ...productData, careInstructions: event.target.value })} className="min-h-20 rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
          <textarea placeholder="Return & exchange policy" value={productData.returnPolicy} onChange={(event) => setProductData({ ...productData, returnPolicy: event.target.value })} className="min-h-20 rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
          <textarea placeholder="Shipping & delivery information" value={productData.shippingInfo} onChange={(event) => setProductData({ ...productData, shippingInfo: event.target.value })} className="min-h-20 rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
        </div>
        <button onClick={handleSaveProduct} disabled={saving} className="pill-button mt-8 bg-ink text-white disabled:opacity-60">{saving ? "Saving..." : "Save Product"}</button>
      </div>

      <div className="glass-card rounded-[30px] p-6">
        <h2 className="text-2xl font-black">Seller Category Management</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {sellerCategories.length ? sellerCategories.map((category) => (
            <div key={category.id} className="rounded-2xl bg-white/60 p-4">
              <p className="font-black capitalize">{category.name}</p>
              <p className="mt-1 text-sm text-slate-600">{category.description || "No description added."}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => { setCategoryForm(category); setCategoryModal(true); }} className="rounded-full bg-pastelBlue px-3 py-2 text-xs font-black text-ink">Edit</button>
                <button onClick={() => deleteSellerCategory(category.id)} className="rounded-full bg-red-100 px-3 py-2 text-xs font-black text-red-600">Delete</button>
              </div>
            </div>
          )) : <p className="rounded-2xl bg-white/60 p-4 font-bold">Add seller-created categories here; they become available in the product category dropdown immediately.</p>}
        </div>
      </div>

      {categoryModal && (
        <div className="fixed inset-0 z-[10000] grid place-items-center bg-black/40 p-4 backdrop-blur">
          <form onSubmit={saveCategory} className="glass-card w-full max-w-lg rounded-[28px] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black">{categoryForm.id ? "Edit Category" : "Add New Category"}</h3>
              <button type="button" onClick={() => setCategoryModal(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white/70"><FiX /></button>
            </div>
            <input placeholder="Category Name" value={categoryForm.name} onChange={(event) => setCategoryForm({ ...categoryForm, name: event.target.value })} className="mt-5 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
            <textarea placeholder="Description" value={categoryForm.description} onChange={(event) => setCategoryForm({ ...categoryForm, description: event.target.value })} className="mt-4 min-h-28 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
            <button className="pill-button mt-5 bg-ink text-white">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

function ListSection({ title, items }) {
  return (
    <div className="glass-card rounded-[30px] p-6">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => <p key={item} className="rounded-2xl bg-white/60 p-4 font-bold">{item}</p>)}
      </div>
    </div>
  );
}
