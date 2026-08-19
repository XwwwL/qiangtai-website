"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  gallery: string[];
  alt: string;
}

export function ProductGallery({ gallery, alt }: ProductGalleryProps) {
  const images = gallery.length > 0 ? gallery : [];
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden metallic-card">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 via-industrial-600 to-teal-600">
          <p className="text-white/50 text-lg">Product Image Coming Soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden metallic-card">
        <Image
          src={images[active]}
          alt={`${alt} — image ${active + 1}`}
          fill
          className="object-contain p-8"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={active === 0}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 bg-gray-50 transition-colors ${
                i === active ? "border-tech-500" : "border-gray-200 hover:border-tech-500/50"
              }`}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
            >
              <Image src={img} alt={`${alt} thumbnail ${i + 1}`} fill className="object-contain p-1" sizes="80px" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
