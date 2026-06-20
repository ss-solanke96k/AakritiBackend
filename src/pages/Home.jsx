import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { products, sellerStories, testimonials } from "../data/products";
import CategoryCard from "../components/CategoryCard";
import HeroBanner from "../components/HeroBanner";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import ReviewCard from "../components/ReviewCard";
import SectionHeading from "../components/SectionHeading";
import SellerCard from "../components/SellerCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import SellerSkeleton from "../components/SellerSkeleton";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Home() {
  const [quickProduct, setQuickProduct] = useState(null);
  const [loadingSections, setLoadingSections] = useState(true);
  const categoryRowRef = useRef(null);
  const { categories } = useShop();
  const featured = products.filter((product) => product.trend).slice(0, 4);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadingSections(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const scrollCategories = (direction) => {
    categoryRowRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <PageTransition>
      <HeroBanner />

      <section className="container-soft py-14">
        <SectionHeading eyebrow="Featured" title="Handmade favorites" text="A curated shelf of soft, giftable pieces from verified small sellers." />
        {loadingSections ? <LoadingSkeleton count={4} /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => <ProductCard key={product.id} product={product} onQuickView={setQuickProduct} />)}
          </div>
        )}
      </section>

      <section className="container-soft py-14">
        <SectionHeading eyebrow="Categories" title="Shop by craft mood" />
        <div className="relative">
          <div ref={categoryRowRef} className="flex snap-x gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <div key={category} className="w-[250px] shrink-0 snap-start sm:w-[270px]">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => scrollCategories(-1)} className="absolute -left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-soft transition hover:-translate-y-1 sm:grid" aria-label="Scroll categories left">
            <FiChevronLeft />
          </button>
          <button type="button" onClick={() => scrollCategories(1)} className="absolute -right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-soft transition hover:-translate-y-1 sm:grid" aria-label="Scroll categories right">
            <FiChevronRight />
          </button>
        </div>
        <div className="mt-8 text-center">
          <Link to="/shop" className="pill-button bg-ink text-white shadow-soft">Explore more</Link>
        </div>
      </section>

      <section className="container-soft py-14">
        <SectionHeading eyebrow="Featured Small Businesses" title="Meet the makers behind the magic" text="Each shop has its own products, story, rating, and verified seller profile." />
        {loadingSections ? <SellerSkeleton /> : (
          <div className="grid gap-6 md:grid-cols-3">
            {sellerStories.map((story) => <SellerCard key={story.name} story={story} />)}
          </div>
        )}
      </section>

      <section className="container-soft py-14">
        <SectionHeading eyebrow="Testimonials" title="Loved by thoughtful shoppers" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((review) => <ReviewCard key={review.name} review={review} />)}
        </div>
      </section>

      <QuickViewModal product={quickProduct} onClose={() => setQuickProduct(null)} />
    </PageTransition>
  );
}
