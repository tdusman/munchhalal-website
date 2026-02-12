'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryLightboxProps {
  images: string[];
  restaurantName: string;
}

export default function GalleryLightbox({ images, restaurantName }: GalleryLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={img}
              alt={`${restaurantName} photo ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={prev}
            className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="relative w-[90vw] h-[70vh] max-w-4xl">
            <Image
              src={images[currentIndex]}
              alt={`${restaurantName} photo ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            onClick={next}
            className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
