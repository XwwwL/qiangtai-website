import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box } from "lucide-react";
import type { ProductCategory } from "@/types";
import type { Locale } from "@/i18n/config";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface CategoryCardProps {
  category: ProductCategory;
  locale?: Locale;
}

export function CategoryCard({ category, locale = "en" }: CategoryCardProps) {
  const displayName = locale === "zh" ? category.nameZh : category.name;

  return (
    <div className="metallic-card rounded-xl overflow-hidden card-hover group flex flex-col">
      <Link
        href={`/${locale}/products/${category.slug}`}
        className="block relative aspect-[4/3] bg-gray-50 overflow-hidden"
      >
        {category.image && category.hasRealImages ? (
          <Image
            src={category.image}
            alt={displayName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <PlaceholderImage className="w-full h-full" label={displayName} />
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Box size={16} className="text-tech-500" />
          <span className="text-xs text-text-muted">
            {category.productCount > 0
              ? `${category.productCount}+ ${locale === "zh" ? "款产品" : "Products"}`
              : locale === "zh" ? "即将推出" : "Coming Soon"}
          </span>
        </div>
        <Link
          href={`/${locale}/products/${category.slug}`}
          className="text-base font-semibold text-navy-900 hover:text-tech-500 transition-colors leading-snug"
        >
          {displayName}
        </Link>
        <p className="text-xs text-text-muted mt-2 line-clamp-2 flex-1">
          {category.shortDescription}
        </p>
        <Link
          href={`/${locale}/products/${category.slug}`}
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-tech-500 hover:text-teal-600 transition-colors"
        >
          {locale === "zh" ? "查看产品" : "View Products"}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
