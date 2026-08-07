"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { productCategories } from "@/data/categories";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { useDictionary, useLocale } from "@/hooks/useLocale";

export function MegaMenu() {
  const locale = useLocale();
  const dict = useDictionary();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={`/${locale}/products`}
        className="flex items-center gap-1 px-2 xl:px-3 py-7 text-sm font-medium text-navy-900 hover:text-tech-500 transition-colors"
        onClick={(e) => {
          if (window.innerWidth < 1024) setOpen(!open);
          else e.preventDefault();
        }}
      >
        {dict.nav.products}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Link>

      {open && (
        <div
          className="absolute left-0 top-full w-[720px] xl:w-[800px] bg-white border border-gray-100 rounded-lg shadow-2xl z-50 p-6 grid grid-cols-2 gap-x-8 gap-y-2"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {productCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${locale}/products/${cat.slug}`}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-teal-50/60 transition-colors group"
              onClick={() => setOpen(false)}
            >
              <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                {cat.image && cat.hasRealImages ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={56}
                    height={56}
                    className="object-contain"
                    loading="lazy"
                  />
                ) : (
                  <PlaceholderImage className="w-full h-full" label={cat.name} />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy-900 group-hover:text-tech-500 transition-colors leading-tight">
                  {locale === "zh" ? cat.nameZh : locale === "ru" ? cat.nameRu || cat.name : cat.name}
                </p>
                <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
                  {cat.shortDescription.slice(0, 80)}...
                </p>
              </div>
            </Link>
          ))}
          <div className="col-span-2 mt-4 pt-4 border-t border-gray-100">
            <Link
              href={`/${locale}/products`}
              className="text-sm font-semibold text-tech-500 hover:text-teal-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              {dict.nav.viewAllCategories}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
