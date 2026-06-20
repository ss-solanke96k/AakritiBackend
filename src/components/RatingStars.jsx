import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function RatingStars({ rating = 5 }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex items-center gap-1 text-amber-400">
      {stars.map((star) =>
        rating >= star ? (
          <FaStar key={star} />
        ) : rating > star - 1 ? (
          <FaStarHalfAlt key={star} />
        ) : (
          <FaStar key={star} className="text-slate-200" />
        )
      )}
      <span className="ml-1 text-xs font-bold text-slate-500">{rating}</span>
    </div>
  );
}
