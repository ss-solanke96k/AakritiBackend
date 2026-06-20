import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { slugifySeller } from "../data/products";

export default function SellerCard({ story }) {
  const slug = story.slug || slugifySeller(story.name);

  return (
    <motion.article whileHover={{ y: -5 }} className="glass-card overflow-hidden rounded-[28px] transition">
      <img src={story.image} alt={story.name} className="h-48 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-black">{story.name}</h3>
          {(story.verified ?? true) && <FiCheckCircle className="text-emerald-500" />}
        </div>
        <p className="mt-2 flex items-center gap-2 text-sm font-black text-amber-500"><FiStar /> {story.rating || 4.8} seller rating</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{story.story}</p>
        <Link to={`/seller/${slug}`} className="pill-button mt-5 bg-gradient-to-r from-secondary to-secondary-light text-ink hover:scale-[1.02]">
          Visit store <FiArrowRight />
        </Link>
      </div>
    </motion.article>
  );
}
