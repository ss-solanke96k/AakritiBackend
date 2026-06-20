import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import SearchBar from "../components/SearchBar";
import { useShop } from "../context/ShopContext";

export default function Shop() {
  const [params] = useSearchParams();
  const { products } = useShop();
  const [search, setSearch] = useState(params.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(params.get("category") || "all");
  const [sortBy, setSortBy] = useState("featured");
  const [quickProduct, setQuickProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearch(params.get("search") || "");
    setSelectedCategory(params.get("category") || "all");
  }, [params]);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, [search, selectedCategory, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const query = search.toLowerCase();
      const matchesSearch = product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query) || product.seller?.name?.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    if (sortBy === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, search, selectedCategory, sortBy]);

  const displayedProducts = filteredProducts.slice(0, 12);

  return (
    <PageTransition>
      <section className="border-b border-[rgba(75,21,52,0.08)] bg-white py-4">
        <FilterSidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </section>

      <section className="pastel-gradient py-12">
        <div className="container-soft">
          <h1 className="text-4xl font-black md:text-5xl">Shop handmade products</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Browse small business creations with soft filters, search, sorting, and quick view.</p>
          <div className="mt-8 max-w-2xl"><SearchBar value={search} onChange={setSearch} /></div>
        </div>
      </section>

      <section className="container-soft py-12">
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-bold">{filteredProducts.length} products found</p>
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full bg-pastelBlue px-4 py-2 text-sm font-bold capitalize">{selectedCategory}</p>
              <label className="relative block min-w-48 text-sm font-bold text-slate-700">
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="w-full appearance-none rounded-full border border-[rgba(75,21,52,0.12)] bg-white px-5 py-2.5 pr-12 font-semibold text-slate-700 shadow-soft outline-none transition-all duration-300 hover:border-secondary focus:border-secondary focus:ring-4 focus:ring-secondary/20">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to high</option>
                  <option value="price-high">Price: High to low</option>
                  <option value="rating">Top rated</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <FiChevronDown />
                </span>
              </label>
            </div>
          </div>
          {loading ? <LoadingSkeleton count={8} /> : filteredProducts.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedProducts.map((product) => <ProductCard key={product.id} product={product} onQuickView={setQuickProduct} />)}
            </div>
          ) : (
            <div className="glass-card rounded-[32px] p-10 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pastelPink text-2xl text-ink"><FiSearch /></div>
              <h2 className="mt-5 text-2xl font-black">No products found</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Try another search term or explore a different handmade category.</p>
            </div>
          )}
        </div>
      </section>
      <QuickViewModal product={quickProduct} onClose={() => setQuickProduct(null)} />
    </PageTransition>
  );
}
