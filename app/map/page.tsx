"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { getRestaurants } from "@/lib/storage";
import { Restaurant } from "@/types";
import { ArrowLeft, Search, List, X } from "lucide-react";

const RestaurantMap = dynamic(
  () => import("@/components/restaurant/RestaurantMap"),
  {
    ssr: false,
    loading: () => <div className="h-full bg-surface2 animate-pulse" />,
  },
);

export default function MapPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    setRestaurants(
      getRestaurants().filter((r) => !r.isHidden && r.status === "active"),
    );
  }, []);

  const filtered = searchQuery
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.city.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : restaurants;

  return (
    <main className="h-screen flex flex-col">
      <Navbar />

      {/* Top bar */}
      <div className="pt-16 lg:pt-20 bg-surface border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <Link
            href="/restaurants"
            className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to List</span>
          </Link>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface2 border border-border focus:border-primary text-text placeholder:text-zinc-500 rounded-lg pl-10 pr-4 py-2 outline-none text-sm transition-all"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-muted hover:text-text transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <List className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Map + Sidebar */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Map */}
        <div className="flex-1">
          {mounted && (
            <RestaurantMap
              restaurants={filtered}
              className="h-full w-full"
              zoom={10}
            />
          )}
        </div>

        {/* Sidebar */}
        <div
          className={`absolute lg:relative right-0 top-0 bottom-0 w-[320px] bg-surface border-l border-border overflow-y-auto transition-transform z-10 ${
            sidebarOpen
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0 lg:hidden"
          }`}
        >
          <div className="p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
              {filtered.length} restaurants
            </h3>
            <div className="space-y-3">
              {filtered.map((r) => (
                <Link
                  key={r.id}
                  href={`/restaurants/${r.slug}`}
                  className="flex gap-3 p-3 bg-surface2 rounded-xl hover:bg-surface2/80 transition-all group"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={r.coverImage}
                      alt={r.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold group-hover:text-primary transition-colors truncate">
                      {r.name}
                    </h4>
                    <p className="text-xs text-muted truncate">
                      {r.cuisineType} • {r.city}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
