import { motion } from "framer-motion";
import { Amphora, CookingPot, Gem, Gift, Home, Lamp, MonitorSmartphone, Package, Paintbrush, Palette, Scissors, Shirt, ShoppingBag, Sparkles, Watch } from "lucide-react";
import { Link } from "react-router-dom";

const categoryIcons = {
  crochet: Scissors,
  "clay art": Amphora,
  "resin art": Sparkles,
  "pot painting": Amphora,
  candles: Lamp,
  "handmade jewelry": Gem,
  handbags: ShoppingBag,
  embroidery: Paintbrush,
  "home decor": Home,
  "handmade paintings": Palette,
  "handmade gifts": Gift,
  macrame: Scissors,
  terracotta: Amphora,
  "fabric art": Shirt,
  "handmade toys": Gift,
  "wooden crafts": Package,
  "floral crafts": Sparkles,
  "handwoven products": Shirt,
  fashion: Shirt,
  "men's wear": Shirt,
  "women's wear": Shirt,
  "kids wear": Shirt,
  "ethnic wear": Shirt,
  sarees: Shirt,
  kurtis: Shirt,
  lehengas: Shirt,
  footwear: ShoppingBag,
  bags: ShoppingBag,
  watches: Watch,
  jewellery: Gem,
  home: Home,
  furniture: Home,
  lighting: Lamp,
  kitchen: CookingPot,
  electronics: MonitorSmartphone,
  "mobile accessories": MonitorSmartphone,
  "smart gadgets": MonitorSmartphone,
  beauty: Sparkles,
  "beauty products": Sparkles,
  "personal care": Sparkles,
  handmade: Gift,
  handicrafts: Paintbrush,
  paintings: Palette,
  pottery: Amphora,
  food: CookingPot,
  "homemade snacks": CookingPot,
  "organic products": Sparkles
};

const categoryDescriptions = {
  crochet: "Soft handmade crochet creations crafted with creativity and care.",
  "clay art": "Beautiful clay pieces designed with artistic handmade charm.",
  "resin art": "Unique resin creations with modern aesthetic designs.",
  "pot painting": "Hand-painted pots perfect for cozy and creative spaces.",
  candles: "Cozy handmade candles crafted to brighten your mood.",
  handbags: "Stylish handcrafted bags made with creativity and detail.",
  embroidery: "Traditional embroidery art blended with modern handmade fashion.",
  "handmade jewelry": "Elegant handmade jewelry crafted for unique personal style."
};

export default function CategoryCard({ category }) {
  const Icon = categoryIcons[category] || Package;

  return (
    <motion.div whileHover={{ y: -5 }} className="glass-card marketplace-card h-full rounded-[20px] border-[rgba(75,21,52,0.08)] bg-white p-5 text-center hover:border-secondary hover:bg-background">
      <Link to={`/shop?category=${encodeURIComponent(category)}`} className="block">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-surface-soft text-3xl text-primary shadow-inner">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="mt-4 min-h-[3.5rem] text-lg font-black capitalize leading-snug">{category}</h3>
        <p className="mt-2 text-sm text-text-secondary">
          {categoryDescriptions[category] || "Explore beautiful handmade creations crafted with care."}
        </p>
      </Link>
    </motion.div>
  );
}
