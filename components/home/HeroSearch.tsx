'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [radius, setRadius] = useState('10');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (city) params.set('city', city);
    if (radius) params.set('radius', radius);
    router.push(`/restaurants?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="bg-surface/80 backdrop-blur-md border border-border rounded-2xl p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search restaurant or cuisine..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-surface2 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 text-text placeholder:text-zinc-500 rounded-lg px-4 py-3 outline-none transition-all"
          />
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 sm:max-w-[180px] bg-surface2 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 text-text placeholder:text-zinc-500 rounded-lg px-4 py-3 outline-none transition-all"
          />
          <select
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="sm:w-[120px] bg-surface2 border border-border focus:border-primary text-text rounded-lg px-4 py-3 outline-none transition-all"
          >
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="25">25 km</option>
            <option value="50">50 km</option>
          </select>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black font-bold rounded-lg px-6 py-3 transition-all btn-press"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
