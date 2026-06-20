export default function SellerSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="glass-card animate-pulse rounded-[28px] p-4">
          <div className="h-44 rounded-[24px] bg-white/70" />
          <div className="mt-4 h-4 w-2/3 rounded bg-white/70" />
          <div className="mt-3 h-4 w-full rounded bg-white/70" />
        </div>
      ))}
    </div>
  );
}
