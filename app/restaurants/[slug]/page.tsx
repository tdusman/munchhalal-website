'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HalalBadge from '@/components/restaurant/HalalBadge';
import StarRating from '@/components/restaurant/StarRating';
import GalleryLightbox from '@/components/restaurant/GalleryLightbox';
import AdSlot from '@/components/common/AdSlot';
import { getRestaurantBySlug } from '@/lib/storage';
import { Restaurant } from '@/types';
import { MapPin, Phone, Globe, Instagram, Facebook, Twitter, Clock, ExternalLink } from 'lucide-react';

const RestaurantMap = dynamic(() => import('@/components/restaurant/RestaurantMap'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-surface2 rounded-xl animate-pulse" />,
});

export default function RestaurantDetailPage() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const slug = params.slug as string;
    const r = getRestaurantBySlug(slug);
    if (r) setRestaurant(r);
  }, [params.slug]);

  if (!mounted) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[420px] bg-surface2 animate-pulse rounded-2xl" />
        </div>
      </main>
    );
  }

  if (!restaurant) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold font-heading mb-2">Restaurant Not Found</h1>
          <p className="text-muted mb-6">The restaurant you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/restaurants"
            className="inline-flex px-6 py-3 bg-primary hover:bg-primary-dark text-black font-bold rounded-lg transition-all"
          >
            Browse Restaurants
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`;

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: restaurant.name,
            servesCuisine: restaurant.cuisineType,
            priceRange: restaurant.priceRange,
            address: {
              '@type': 'PostalAddress',
              streetAddress: restaurant.address,
              addressLocality: restaurant.city,
              addressRegion: restaurant.province,
              postalCode: restaurant.postalCode,
              addressCountry: 'CA',
            },
            telephone: restaurant.phone,
            url: restaurant.website,
            image: restaurant.coverImage,
          }),
        }}
      />

      {/* Hero Cover */}
      <div className="relative h-[300px] sm:h-[420px] w-full">
        <Image
          src={restaurant.coverImage}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            {restaurant.isFeatured && (
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                ⭐ Featured
              </span>
            )}
            <HalalBadge type={restaurant.halalCertType} size="md" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight">
            {restaurant.name}
          </h1>
          <p className="text-muted text-lg mt-2">
            {restaurant.cuisineType} • {restaurant.city}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Column */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Quick Info */}
            <div className="flex items-center gap-4 flex-wrap">
              <StarRating rating={restaurant.avgRating} totalReviews={restaurant.totalReviews} size="md" />
              <span className="text-lg font-semibold text-muted">{restaurant.priceRange}</span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold font-heading mb-3">About</h2>
              <p className="text-muted leading-relaxed">{restaurant.description}</p>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="text-xl font-bold font-heading mb-4">Photos</h2>
              <GalleryLightbox images={restaurant.images} restaurantName={restaurant.name} />
            </div>

            {/* Opening Hours */}
            <div>
              <h2 className="text-xl font-bold font-heading mb-4">
                <Clock className="w-5 h-5 inline mr-2" />
                Opening Hours
              </h2>
              <div className="bg-surface border border-border rounded-xl overflow-hidden">
                {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                  <div
                    key={day}
                    className={`flex items-center justify-between px-4 py-3 border-b border-border last:border-0 ${
                      day === today ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                    }`}
                  >
                    <span className={`text-sm font-medium ${day === today ? 'text-primary' : 'text-text'}`}>
                      {day} {day === today && '(Today)'}
                    </span>
                    <span className="text-sm text-muted">
                      {hours.closed ? 'Closed' : `${hours.open} – ${hours.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-xl font-bold font-heading mb-4">Location</h2>
              <RestaurantMap
                restaurants={[restaurant]}
                center={[restaurant.lat, restaurant.lng]}
                zoom={15}
                className="h-[300px] w-full rounded-xl"
              />
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-black font-bold text-sm rounded-lg transition-all btn-press"
              >
                <ExternalLink className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[340px] flex-shrink-0 space-y-6">
            {/* Contact Card */}
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-4 sticky top-24">
              <h3 className="text-lg font-semibold font-heading">Contact Info</h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted">
                  {restaurant.address}, {restaurant.city}, {restaurant.province} {restaurant.postalCode}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`tel:${restaurant.phone}`} className="text-sm text-muted hover:text-text transition-colors">
                  {restaurant.phone}
                </a>
              </div>

              {restaurant.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-text transition-colors truncate"
                  >
                    {restaurant.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                {restaurant.socialLinks.instagram && (
                  <a href={restaurant.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-surface2 text-muted hover:text-primary transition-all">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {restaurant.socialLinks.facebook && (
                  <a href={restaurant.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-surface2 text-muted hover:text-primary transition-all">
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {restaurant.socialLinks.twitter && (
                  <a href={restaurant.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-surface2 text-muted hover:text-primary transition-all">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Claim CTA */}
            <div className="bg-surface border border-border rounded-2xl p-6 text-center">
              <p className="text-sm text-muted mb-3">Is this your restaurant?</p>
              <Link
                href="/contact?subject=Restaurant+Owner"
                className="inline-flex items-center px-5 py-2.5 bg-transparent border border-primary/50 hover:border-primary text-primary font-semibold text-sm rounded-lg transition-all"
              >
                Claim This Listing
              </Link>
            </div>

            {/* Sidebar Ad */}
            <AdSlot placement="sidebar" />
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
