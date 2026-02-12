'use client';

import { useState, useEffect } from 'react';
import { getAdByPlacement } from '@/lib/storage';
import { Ad } from '@/types';

interface AdSlotProps {
  placement: Ad['placement'];
}

export default function AdSlot({ placement }: AdSlotProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const foundAd = getAdByPlacement(placement);
    if (foundAd) setAd(foundAd);
  }, [placement]);

  if (!mounted || !ad) return null;

  if (placement === 'search_top') {
    return (
      <a
        href={ad.destinationUrl}
        target={ad.destinationUrl.startsWith('/') ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className="block bg-surface border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/40 transition-all"
      >
        <div className="p-4 sm:p-5 flex items-center gap-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full">
            Sponsored
          </span>
          <p className="text-sm font-medium text-text">{ad.title}</p>
        </div>
      </a>
    );
  }

  if (placement === 'sidebar') {
    return (
      <a
        href={ad.destinationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-surface border border-border rounded-2xl overflow-hidden hover:border-zinc-700 transition-all"
      >
        <div
          className="h-[200px] bg-cover bg-center"
          style={{ backgroundImage: `url(${ad.imageUrl})` }}
        />
        <div className="p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1 block">
            Sponsored
          </span>
          <p className="text-sm font-medium text-text">{ad.title}</p>
        </div>
      </a>
    );
  }

  return null;
}
