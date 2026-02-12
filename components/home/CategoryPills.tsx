'use client';

import Link from 'next/link';

const categories = [
  { emoji: '🥩', label: 'Pakistani' },
  { emoji: '🌯', label: 'Lebanese' },
  { emoji: '🍛', label: 'Indian' },
  { emoji: '🥘', label: 'Somali' },
  { emoji: '🍖', label: 'Turkish' },
  { emoji: '🧆', label: 'Middle Eastern' },
];

export default function CategoryPills() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {categories.map((cat) => (
        <Link
          key={cat.label}
          href={`/restaurants?category=${encodeURIComponent(cat.label)}`}
          className="flex items-center gap-2 px-4 py-2 bg-surface2/60 border border-border hover:border-primary/50 text-sm text-muted hover:text-text rounded-full transition-all hover:bg-surface2"
        >
          <span>{cat.emoji}</span>
          <span>{cat.label}</span>
        </Link>
      ))}
    </div>
  );
}
