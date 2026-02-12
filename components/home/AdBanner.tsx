'use client';

import { useState, useEffect } from 'react';
import { getAdByPlacement } from '@/lib/storage';
import { Ad } from '@/types';
import Link from 'next/link';

export default function AdBanner() {
  const [ad, setAd] = useState<Ad | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const bannerAd = getAdByPlacement('homepage_banner');
    if (bannerAd) setAd(bannerAd);
  }, []);

  if (!mounted) return null;

  if (!ad) {
    return (
      <section className="py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-surface2 to-primary/10 border border-border p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-bold font-heading mb-2">Advertise with Munchhalal</h3>
            <p className="text-muted mb-6">Reach thousands of halal food lovers across Canada</p>
            <Link
              href="/contact?subject=Advertising"
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-black font-bold rounded-lg transition-all btn-press"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href={ad.destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-2xl border border-border group"
        >
          <div
            className="relative h-[200px] sm:h-[280px] bg-cover bg-center"
            style={{ backgroundImage: `url(${ad.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2 block">
                  Sponsored
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-4">{ad.title}</h3>
                <span className="inline-flex items-center px-5 py-2.5 bg-primary hover:bg-primary-dark text-black font-bold text-sm rounded-lg transition-all">
                  Learn More →
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
