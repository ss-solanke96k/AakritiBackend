import { FiCheckCircle, FiMapPin, FiShoppingBag, FiStar } from "react-icons/fi";
import { useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import { products, sellers } from "../data/products";

export default function SellerStore() {
  const { slug } = useParams();
  const seller = sellers.find((item) => item.slug === slug);
  const sellerProducts = products.filter((product) => product.seller.name === seller?.name);

  if (!seller) {
    return <div className="container-soft py-20 text-center text-2xl font-black">Seller store not found.</div>;
  }

  return (
    <PageTransition>
      <section className="pastel-gradient py-14">
        <div className="container-soft">
          <div className="glass-card grid gap-8 rounded-[38px] p-7 md:grid-cols-[180px_1fr] md:p-9">
            <img src={seller.avatar} alt={seller.name} className="h-44 w-44 rounded-full border-8 border-white object-cover shadow-glow" />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-black md:text-5xl">{seller.name}</h1>
                {seller.verified && <span className="inline-flex items-center gap-1 rounded-full bg-mint px-3 py-1 text-xs font-black text-emerald-700"><FiCheckCircle /> Verified</span>}
              </div>
              <p className="mt-3 flex items-center gap-2 font-bold text-slate-600"><FiMapPin /> {seller.location}</p>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">{seller.story}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-black"><FiStar className="text-amber-400" /> {seller.rating} rating</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-black"><FiShoppingBag /> {sellerProducts.length} products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-soft py-12">
        <h2 className="mb-6 text-3xl font-black">Products by {seller.name}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sellerProducts.map((product) => <ProductCard key={product.id} product={product} onQuickView={() => {}} />)}
        </div>
      </section>
    </PageTransition>
  );
}
