"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSearch from "@/components/home/HeroSearch";
import CategoryPills from "@/components/home/CategoryPills";
import FeaturedSection from "@/components/home/FeaturedSection";
import AdBanner from "@/components/home/AdBanner";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import RestaurantCardSkeleton from "@/components/restaurant/RestaurantCardSkeleton";
import { getRestaurants } from "@/lib/storage";
import { Restaurant } from "@/types";

const categoryIcons: Record<string, string> = {
  Pakistani: "🥩",
  Lebanese: "🌯",
  Indian: "🍛",
  Somali: "🥘",
  Turkish: "🍖",
  "Middle Eastern": "🧆",
  Afghan: "🫓",
  Bangladeshi: "🍚",
};

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRestaurants(
      getRestaurants().filter((r) => !r.isHidden && r.status === "active"),
    );
  }, []);

  // Build categories with counts
  const categoryCounts = mounted
    ? restaurants.reduce<Record<string, number>>((acc, r) => {
        acc[r.category] = (acc[r.category] || 0) + 1;
        return acc;
      }, {})
    : {};

  // Newly added (non-featured, sorted by createdAt desc, limit 4)
  const newRestaurants = mounted
    ? [...restaurants]
        .filter((r) => !r.isFeatured)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 4)
    : [];

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-bg to-indigo-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <h1 className="text-[38px] lg:text-[64px] font-extrabold font-heading tracking-[-2px] leading-tight mb-4 opacity-0 animate-fade-up">
            Find Halal Food You Can Trust
          </h1>
          <p className="text-lg lg:text-xl text-muted max-w-3xl mx-auto mb-10 opacity-0 animate-fade-up-delay-1">
            Discover certified halal restaurants across Canada — near you, right
            now.
          </p>

          <div className="opacity-0 animate-fade-up-delay-2">
            <HeroSearch />
          </div>

          <div className="opacity-0 animate-fade-up-delay-3">
            <CategoryPills />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-muted/50" />
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <FeaturedSection />

      {/* Ad Banner */}
      <AdBanner />

      {/* Browse by Category */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading tracking-tight mb-2">
            Browse by Category
          </h2>
          <p className="text-muted mb-8">Explore restaurants by cuisine type</p>

          {mounted && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <Link
                  key={category}
                  href={`/restaurants?category=${encodeURIComponent(category)}`}
                  className="group bg-surface border border-border rounded-2xl p-6 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-1 transition-all duration-200 text-center"
                >
                  <span className="text-3xl block mb-3">
                    {categoryIcons[category] || "🍽️"}
                  </span>
                  <h3 className="font-semibold font-heading group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    {count} restaurant{count > 1 ? "s" : ""}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newly Added */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading tracking-tight mb-2">
            Newly Added
          </h2>
          <p className="text-muted mb-8">
            Fresh halal restaurants just joined Munchhalal
          </p>

          {!mounted ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <RestaurantCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
              {newRestaurants.map((r) => (
                <div key={r.id} className="min-w-[300px] lg:min-w-0">
                  <RestaurantCard restaurant={r} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />

      <Footer />
    </main>
  );
}
