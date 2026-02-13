"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import RestaurantCardSkeleton from "@/components/restaurant/RestaurantCardSkeleton";
import SearchFilters from "@/components/common/SearchFilters";
import ViewToggle from "@/components/common/ViewToggle";
import AdSlot from "@/components/common/AdSlot";
import { getRestaurants } from "@/lib/storage";
import { calculateDistance, cityCoordinates } from "@/lib/utils";
import { Restaurant } from "@/types";
import { SlidersHorizontal } from "lucide-react";

const RestaurantMap = dynamic(
  () => import("@/components/restaurant/RestaurantMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-surface2 rounded-xl animate-pulse" />
    ),
  },
);

function RestaurantsContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [view, setView] = useState<"list" | "map">("list");
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [cityQuery, setCityQuery] = useState(searchParams.get("city") || "");
  const [radius, setRadius] = useState(searchParams.get("radius") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : [],
  );
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [certFilter, setCertFilter] = useState("");

  useEffect(() => {
    setMounted(true);
    const rests = getRestaurants().filter(
      (r) => !r.isHidden && r.status === "active",
    );
    setAllRestaurants(rests);
  }, []);

  const categories = useMemo(
    () => [...new Set(allRestaurants.map((r) => r.category))].sort(),
    [allRestaurants],
  );

  const filteredRestaurants = useMemo(() => {
    let results = [...allRestaurants];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisineType.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q),
      );
    }

    if (cityQuery) {
      const c = cityQuery.toLowerCase();
      results = results.filter((r) => r.city.toLowerCase().includes(c));
    }

    if (radius && cityQuery) {
      const cityKey = cityQuery.toLowerCase().trim();
      const cityCoord = cityCoordinates[cityKey];
      if (cityCoord) {
        const maxDist = parseFloat(radius);
        results = results.filter(
          (r) =>
            calculateDistance(cityCoord.lat, cityCoord.lng, r.lat, r.lng) <=
            maxDist,
        );
      }
    }

    if (selectedCategories.length > 0) {
      results = results.filter((r) => selectedCategories.includes(r.category));
    }

    if (priceFilter.length > 0) {
      results = results.filter((r) => priceFilter.includes(r.priceRange));
    }

    if (certFilter) {
      results = results.filter((r) => r.halalCertType === certFilter);
    }

    // Sort
    const featured = results.filter((r) => r.isFeatured);
    const nonFeatured = results.filter((r) => !r.isFeatured);

    switch (sortBy) {
      case "newest":
        nonFeatured.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      default:
        break;
    }

    // Featured always first
    return [...featured, ...nonFeatured];
  }, [
    allRestaurants,
    searchQuery,
    cityQuery,
    radius,
    selectedCategories,
    priceFilter,
    certFilter,
    sortBy,
  ]);

  const clearAll = () => {
    setSearchQuery("");
    setCityQuery("");
    setRadius("");
    setSelectedCategories([]);
    setPriceFilter([]);
    setCertFilter("");
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-20 lg:pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold font-heading tracking-tight mb-2">
            Halal Restaurants
          </h1>
          <p className="text-muted">
            Discover certified halal restaurants across Canada
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-lg text-sm font-medium text-muted hover:text-text transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`lg:w-[280px] flex-shrink-0 ${filtersOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-surface border border-border rounded-2xl p-5 sticky top-24">
              <SearchFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                cityQuery={cityQuery}
                setCityQuery={setCityQuery}
                radius={radius}
                setRadius={setRadius}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                certFilter={certFilter}
                setCertFilter={setCertFilter}
                categories={categories}
                onClearAll={clearAll}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Ad */}
            <div className="mb-6">
              <AdSlot placement="search_top" />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <p className="text-sm text-muted">
                Showing{" "}
                <span className="font-semibold text-text">
                  {filteredRestaurants.length}
                </span>{" "}
                halal restaurant{filteredRestaurants.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface2 border border-border text-text rounded-lg px-3 py-1.5 text-sm outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest</option>
                </select>
                <ViewToggle view={view} onViewChange={setView} />
              </div>
            </div>

            {!mounted ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <RestaurantCardSkeleton key={i} variant="horizontal" />
                ))}
              </div>
            ) : view === "list" ? (
              filteredRestaurants.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-4xl mb-4">🔍</p>
                  <h3 className="text-xl font-semibold font-heading mb-2">
                    No halal restaurants found
                  </h3>
                  <p className="text-muted">
                    Try expanding your search radius or adjusting your filters.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRestaurants.map((r) => (
                    <RestaurantCard
                      key={r.id}
                      restaurant={r}
                      variant="horizontal"
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="space-y-4">
                <RestaurantMap
                  restaurants={filteredRestaurants}
                  className="h-[500px] w-full rounded-xl"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredRestaurants.slice(0, 6).map((r) => (
                    <RestaurantCard key={r.id} restaurant={r} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function RestaurantsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <RestaurantsContent />
    </Suspense>
  );
}
