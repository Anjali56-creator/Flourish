export function SkeletonCard() {
  return (
    <div className="card p-4">
      <div className="skeleton mb-3 h-28 w-full" />
      <div className="skeleton mb-2 h-4 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
