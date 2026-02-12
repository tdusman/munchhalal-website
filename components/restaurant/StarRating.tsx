import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  showNumber?: boolean;
  totalReviews?: number;
  size?: 'sm' | 'md';
}

export default function StarRating({ rating, showNumber = true, totalReviews, size = 'sm' }: StarRatingProps) {
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.floor(rating)
                ? 'fill-gold text-gold'
                : star <= rating
                ? 'fill-gold/50 text-gold'
                : 'fill-zinc-700 text-zinc-700'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-semibold text-gold">{rating.toFixed(1)}</span>
      )}
      {totalReviews !== undefined && (
        <span className="text-xs text-muted">({totalReviews})</span>
      )}
    </div>
  );
}
