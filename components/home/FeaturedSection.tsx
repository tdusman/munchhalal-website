'use client';

import { useState, useEffect } from 'react';
import { getRestaurants } from '@/lib/storage';
import { Restaurant } from '@/types';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import RestaurantCardSkeleton from '@/components/restaurant/RestaurantCardSkeleton';

export default function FeaturedSection() {
  const [featured, setFeatured] = useState<Restaurant[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const restaurants = getRestaurants();
    setFeatured(restaurants.filter((r) => r.isFeatured && !r.isHidden && r.status === 'active'));
  }, []);

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading tracking-tight mb-2">
          Featured Halal Restaurants
        </h2>
        <p className="text-muted mb-8">Top-rated and verified halal dining in your area</p>

        {!mounted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {featured.map((r) => (
              <div key={r.id} className="min-w-[300px] lg:min-w-0">
                <RestaurantCard restaurant={r} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
