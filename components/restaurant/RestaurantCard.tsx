import Link from "next/link";
import Image from "next/image";
import { Restaurant } from "@/types";
import HalalBadge from "./HalalBadge";
import { MapPin, Phone } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  variant?: "horizontal" | "vertical";
}

export default function RestaurantCard({
  restaurant,
  variant = "vertical",
}: RestaurantCardProps) {
  if (variant === "horizontal") {
    return (
      <Link href={`/restaurants/${restaurant.slug}`} className="block group">
        <div className="flex flex-col sm:flex-row bg-surface border border-border rounded-2xl overflow-hidden hover:border-zinc-700 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-200">
          {/* Image */}
          <div className="relative w-full sm:w-[240px] h-[180px] sm:h-auto flex-shrink-0">
            <Image
              src={restaurant.coverImage}
              alt={restaurant.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 240px"
            />
            {restaurant.isFeatured && (
              <span className="absolute top-3 left-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                ⭐ Featured
              </span>
            )}
          </div>
          {/* Content */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold font-heading group-hover:text-primary transition-colors">
                {restaurant.name}
              </h3>
              <span className="text-sm font-semibold text-muted flex-shrink-0">
                {restaurant.priceRange}
              </span>
            </div>
            <p className="text-sm text-muted">
              {restaurant.cuisineType} • {restaurant.category}
            </p>
            <div className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {restaurant.address}, {restaurant.city}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted">
              <Phone className="w-3.5 h-3.5" />
              <span>{restaurant.phone}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <HalalBadge type={restaurant.halalCertType} />
            </div>
            <span className="text-sm font-semibold text-primary mt-auto group-hover:underline underline-offset-4">
              View Profile →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/restaurants/${restaurant.slug}`} className="block group">
      <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-zinc-700 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-1 transition-all duration-200">
        <div className="relative aspect-video w-full">
          <Image
            src={restaurant.coverImage}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {restaurant.isFeatured && (
            <span className="absolute top-3 left-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
              ⭐ Featured
            </span>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold font-heading group-hover:text-primary transition-colors line-clamp-1">
            {restaurant.name}
          </h3>
          <p className="text-sm text-muted">
            {restaurant.cuisineType} • {restaurant.city}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted">
              {restaurant.priceRange}
            </span>
          </div>
          <HalalBadge type={restaurant.halalCertType} />
          <span className="block text-sm font-semibold text-primary group-hover:underline underline-offset-4 pt-1">
            View Restaurant →
          </span>
        </div>
      </div>
    </Link>
  );
}
