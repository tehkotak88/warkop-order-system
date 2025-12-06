export const ProductSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden card-shadow border border-border/50">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 skeleton rounded" />
        <div className="h-4 w-full skeleton rounded" />
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 skeleton rounded" />
          <div className="h-8 w-8 skeleton rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const ProductSkeletonGrid = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};
