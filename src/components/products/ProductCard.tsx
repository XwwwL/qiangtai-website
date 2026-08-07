import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import type { Locale } from "@/i18n/config";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface ProductCardProps {
  product: Product;
  locale?: Locale;
}

export function ProductCard({ product, locale = "en" }: ProductCardProps) {
  const displayName = locale === "zh" ? product.nameZh : product.name;
  const displayChinese = locale === "zh" ? product.name : product.nameZh;

  return (
    <div className="metallic-card rounded-xl overflow-hidden card-hover group">
      <Link
        href={`/${locale}/products/${product.categorySlug}/${product.slug}`}
        className="block relative aspect-[4/3] bg-gray-50 overflow-hidden"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={displayName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <PlaceholderImage className="w-full h-full" />
        )}
      </Link>
      <div className="p-4">
        <Link
          href={`/${locale}/products/${product.categorySlug}/${product.slug}`}
          className="text-sm font-semibold text-navy-900 hover:text-tech-500 transition-colors line-clamp-2 leading-snug"
        >
          {displayName}
        </Link>
        <p className="text-xs text-text-muted mt-1.5 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-text-muted">{displayChinese}</span>
          <Link
            href={`/${locale}/products/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-tech-500 hover:text-teal-600 transition-colors"
          >
            {locale === "zh" ? "查看详情" : "View Details"}
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
