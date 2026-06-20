import { useRef } from "react";
import {
  Amphora,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CookingPot,
  Flower2,
  Gem,
  Gift,
  Home,
  Lamp,
  Leaf,
  MonitorSmartphone,
  Package,
  Paintbrush,
  Palette,
  Scissors,
  Shirt,
  ShoppingBag,
  Sparkles,
  Watch
} from "lucide-react";
import { useShop } from "../context/ShopContext";

const categoryIcons = {
  Crochet: Scissors,
  "Clay Art": Amphora,
  "Resin Art": Sparkles,
  "Pot Painting": Amphora,
  Candles: Lamp,
  "Handmade Jewelry": Gem,
  Handbags: ShoppingBag,
  Embroidery: Paintbrush,
  "Knitted Wear": Shirt,
  "Home Decor": Home,
  "Handmade Paintings": Palette,
  "Handmade Gifts": Gift,
  Macrame: Leaf,
  Terracotta: Amphora,
  "Wooden Crafts": Package,
  Fashion: Shirt,
  Sarees: Shirt,
  Kurtis: Shirt,
  Footwear: ShoppingBag,
  Bags: Briefcase,
  Watches: Watch,
  Furniture: Home,
  Lighting: Lamp,
  Kitchen: CookingPot,
  Electronics: MonitorSmartphone,
  "Mobile Accessories": MonitorSmartphone,
  Beauty: Flower2,
  Handicrafts: Paintbrush,
  Paintings: Palette
};

const toTitleCase = (value) => value.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

export default function FilterSidebar({ selectedCategory, setSelectedCategory }) {
  const { categories } = useShop();
  const carouselRef = useRef(null);

  const scrollCategories = (direction) => {
    carouselRef.current?.scrollBy({
      left: direction * 320,
      behavior: "smooth"
    });
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4">
      <div className="relative mx-auto px-8 sm:px-10 xl:px-12">
        <button
          type="button"
          onClick={() => scrollCategories(-1)}
          className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(75,21,52,0.08)] bg-white text-primary shadow-[0_10px_30px_rgba(75,21,52,0.12)] transition-all duration-[250ms] ease-out hover:scale-105 hover:bg-background active:scale-[0.98] xl:left-2"
          aria-label="Previous Categories"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          ref={carouselRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-3 lg:gap-4 xl:gap-5"
        >
          <button
            type="button"
            role="button"
            tabIndex={0}
            onClick={() => setSelectedCategory("all")}
            className={`flex min-h-[112px] w-[138px] shrink-0 snap-start cursor-pointer flex-col items-center justify-center gap-2 rounded-[18px] bg-white p-3 text-center transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(75,21,52,0.08)] md:w-[150px] xl:w-[164px] ${
              selectedCategory === "all"
                ? "border-b-[3px] border-primary bg-surface-soft font-bold text-primary shadow-[0_6px_18px_rgba(75,21,52,0.08)]"
                : "border-b-[3px] border-transparent font-medium text-text-primary"
            }`}
          >
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-background text-primary sm:h-14 sm:w-14">
              <Sparkles className="h-7 w-7 sm:h-[34px] sm:w-[34px]" />
            </div>
            <span className="flex min-h-[2.2rem] w-full items-center justify-center text-center text-[13px] font-medium leading-[1.3]">All products</span>
          </button>
          {categories.map((category) => {
            const label = toTitleCase(category);
            const Icon = categoryIcons[label] || Sparkles;
            return (
              <button
                type="button"
                role="button"
                tabIndex={0}
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex min-h-[112px] w-[138px] shrink-0 snap-start cursor-pointer flex-col items-center justify-center gap-2 rounded-[18px] bg-white p-3 text-center transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(75,21,52,0.08)] md:w-[150px] xl:w-[164px] ${
                  selectedCategory === category
                    ? "border-b-[3px] border-primary bg-surface-soft font-bold text-primary shadow-[0_6px_18px_rgba(75,21,52,0.08)]"
                    : "border-b-[3px] border-transparent font-medium text-text-primary"
                }`}
              >
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-background text-primary sm:h-14 sm:w-14">
                  <Icon className="h-7 w-7 sm:h-[34px] sm:w-[34px]" />
                </div>
                <span className="flex min-h-[2.2rem] w-full items-center justify-center text-center text-[13px] font-medium leading-[1.3]">{category}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollCategories(1)}
          className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(75,21,52,0.08)] bg-white text-primary shadow-[0_10px_30px_rgba(75,21,52,0.12)] transition-all duration-[250ms] ease-out hover:scale-105 hover:bg-background active:scale-[0.98] xl:right-2"
          aria-label="Next Categories"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
