export default function RestaurantCardSkeleton({ variant = 'vertical' }: { variant?: 'horizontal' | 'vertical' }) {
  if (variant === 'horizontal') {
    return (
      <div className="flex flex-col sm:flex-row bg-surface border border-border rounded-2xl overflow-hidden animate-pulse">
        <div className="w-full sm:w-[240px] h-[180px] bg-surface2" />
        <div className="flex-1 p-5 space-y-3">
          <div className="h-5 bg-surface2 rounded w-3/4" />
          <div className="h-4 bg-surface2 rounded w-1/2" />
          <div className="h-4 bg-surface2 rounded w-1/3" />
          <div className="h-4 bg-surface2 rounded w-2/3" />
          <div className="h-6 bg-surface2 rounded w-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-video w-full bg-surface2" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-surface2 rounded w-3/4" />
        <div className="h-4 bg-surface2 rounded w-1/2" />
        <div className="h-4 bg-surface2 rounded w-1/3" />
        <div className="h-6 bg-surface2 rounded w-20" />
      </div>
    </div>
  );
}
