import RatingStars from "./RatingStars";

export default function ReviewCard({ review, highlight = false }) {
  return (
    <article className={`glass-card rounded-[26px] p-5 ${highlight ? "ring-2 ring-emerald-200" : ""}`}>
      <RatingStars rating={review.rating} />
      <p className="mt-4 text-sm leading-6 text-slate-600">"{review.text}"</p>
      <p className="mt-4 font-black">{review.name || review.user}</p>
      {review.role && <p className="text-xs font-bold uppercase text-rose-500">{review.role}</p>}
    </article>
  );
}
