export default function LoadingSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="glass-card animate-pulse rounded-[28px] p-4">
          <div className="aspect-[4/5] rounded-[24px] bg-white/70" />
          <div className="mt-4 h-4 w-3/4 rounded bg-white/70" />
          <div className="mt-3 h-4 w-1/2 rounded bg-white/70" />
        </div>
      ))}
    </div>
  );
}
