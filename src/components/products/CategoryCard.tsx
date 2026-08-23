import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box } from "lucide-react";
import type { ProductCategory } from "@/types";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/utils";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface CategoryCardProps {
  category: ProductCategory;
  locale?: Locale;
}

export function CategoryCard({ category, locale = "en" }: CategoryCardProps) {
  const displayName = localized(category.name, category.nameZh, category.nameRu, category.nameJa, category.nameKo, locale);
  const displayDesc = localized(category.shortDescription, category.shortDescriptionZh, category.shortDescriptionRu, category.shortDescriptionJa, category.shortDescriptionKo, locale);
  const countLabel = locale === "zh" ? "款产品" : locale === "ru" ? "изделий" : "Products";
  const comingSoon = locale === "zh" ? "即将推出" : locale === "ru" ? "Скоро" : "Coming Soon";
  const viewLabel = locale === "zh" ? "查看产品" : locale === "ru" ? "Смотреть" : "View Products";

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
            loading="lazy"
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
              ? `${category.productCount}+ ${countLabel}`
              : comingSoon}
          </span>
        </div>
        <Link
          href={`/${locale}/products/${category.slug}`}
          className="text-base font-semibold text-navy-900 hover:text-tech-500 transition-colors leading-snug"
        >
          {displayName}
        </Link>
        <p className="text-xs text-text-muted mt-2 line-clamp-2 flex-1">
          {displayDesc}
        </p>
        <Link
          href={`/${locale}/products/${category.slug}`}
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-tech-500 hover:text-teal-600 transition-colors"
        >
          {viewLabel}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
