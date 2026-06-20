import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";

export default function HeroBanner() {
  return (
    <section className="pastel-gradient relative overflow-hidden pb-20 pt-10">
      <div className="container-soft grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="rounded-full border border-secondary/40 bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-soft">
            Designed in Bharat
          </span>
          <h1 className="heading-font mt-6 text-5xl font-bold leading-tight text-primary sm:text-6xl lg:text-8xl">
            AKRITI
          </h1>
          <h2 className="heading-font mt-2 text-3xl font-semibold text-accent sm:text-4xl">Where Handmade Stories Come to Life.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-text-secondary">
            Discover beautiful handmade creations crafted by passionate artisans and small business owners across India. From crochet art and clay creations to candles, jewelry, and cozy decor, every piece is made with creativity, warmth, and love.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="pill-button bg-ink text-white shadow-soft">
              Shop now <FiArrowRight />
            </Link>
            <Link to="/seller-register" className="pill-button bg-white text-primary shadow-soft">
              Start selling <FiArrowRight />
            </Link>
          </div>
        </motion.div>
        <motion.div className="relative min-h-[440px]" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <motion.img animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 5 }} src={home1} alt="Crochet handmade bag" loading="lazy" className="absolute right-0 top-0 h-64 w-52 rounded-[28px] object-cover shadow-soft sm:h-80 sm:w-64" />
          <motion.img animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5.8 }} src={home2} alt="Indian handmade clay art" loading="lazy" className="absolute bottom-0 left-0 h-64 w-52 rounded-[28px] object-cover shadow-soft sm:h-80 sm:w-64" />
          
        </motion.div>
      </div>
    </section>
  );
}
