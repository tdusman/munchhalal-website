"use client";

import { X } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  cityQuery: string;
  setCityQuery: (v: string) => void;
  radius: string;
  setRadius: (v: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  priceFilter: string[];
  setPriceFilter: (v: string[]) => void;
  certFilter: string;
  setCertFilter: (v: string) => void;
  categories: string[];
  onClearAll: () => void;
}

export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  cityQuery,
  setCityQuery,
  radius,
  setRadius,
  selectedCategories,
  setSelectedCategories,
  priceFilter,
  setPriceFilter,
  certFilter,
  setCertFilter,
  categories,
  onClearAll,
}: SearchFiltersProps) {
  const toggleCategory = (cat: string) => {
    setSelectedCategories(
      selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat],
    );
  };

  const togglePrice = (price: string) => {
    setPriceFilter(
      priceFilter.includes(price)
        ? priceFilter.filter((p) => p !== price)
        : [...priceFilter, price],
    );
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">
          Search
        </label>
        <input
          type="text"
          placeholder="Restaurant or cuisine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface2 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 text-text placeholder:text-zinc-500 rounded-lg px-4 py-2.5 outline-none text-sm transition-all"
        />
      </div>

      {/* City */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">
          City
        </label>
        <input
          type="text"
          placeholder="Enter city..."
          value={cityQuery}
          onChange={(e) => setCityQuery(e.target.value)}
          className="w-full bg-surface2 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 text-text placeholder:text-zinc-500 rounded-lg px-4 py-2.5 outline-none text-sm transition-all"
        />
      </div>

      {/* Radius */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">
          Radius
        </label>
        <select
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="w-full bg-surface2 border border-border focus:border-primary text-text rounded-lg px-4 py-2.5 outline-none text-sm transition-all"
        >
          <option value="">Any distance</option>
          <option value="5">5 km</option>
          <option value="10">10 km</option>
          <option value="25">25 km</option>
          <option value="50">50 km</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">
          Category
        </label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="rounded border-border bg-surface2 text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">
          Price Range
        </label>
        <div className="flex gap-2">
          {["$", "$$", "$$$", "$$$$"].map((p) => (
            <button
              key={p}
              onClick={() => togglePrice(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                priceFilter.includes(p)
                  ? "bg-primary text-black border-primary"
                  : "bg-surface2 text-muted border-border hover:border-zinc-700"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Halal Cert */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">
          Halal Certification
        </label>
        <select
          value={certFilter}
          onChange={(e) => setCertFilter(e.target.value)}
          className="w-full bg-surface2 border border-border focus:border-primary text-text rounded-lg px-4 py-2.5 outline-none text-sm transition-all"
        >
          <option value="">All</option>
          <option value="certified">Certified</option>
          <option value="self_declared">Self Declared</option>
        </select>
      </div>

      {/* Clear */}
      <button
        onClick={onClearAll}
        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
      >
        <X className="w-4 h-4" />
        Clear All Filters
      </button>
    </div>
  );
}
