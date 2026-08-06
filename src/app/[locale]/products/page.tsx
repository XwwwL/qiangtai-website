import Link from "next/link";
import { Metadata } from "next";
import { Search, ArrowRight } from "lucide-react";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { productCategories } from "@/data/categories";
import { CategoryCard } from "@/components/products/CategoryCard";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site";

interface Props { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const baseUrl = locale === "en" ? `${siteConfig.siteUrl}/products` : `${siteConfig.siteUrl}/zh/products`;
  return {
    title: dict.seo.productsTitle,
    description: dict.seo.productsDescription,
    alternates: { canonical: baseUrl, languages: { en: `${siteConfig.siteUrl}/products`, "zh-CN": `${siteConfig.siteUrl}/zh/products`, "x-default": `${siteConfig.siteUrl}/products` } },
  };
}

export default function ProductsPage({ params }: Props) {
  const { locale } = params;
  if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const l = locale as Locale;

  return (
    <>
      <StructuredData type="ItemList" data={{ itemListElement: productCategories.map((cat, i) => ({ "@type": "ListItem", position: i + 1, name: cat.name, url: `${siteConfig.siteUrl}/${locale}/products/${cat.slug}` })) }} />
      <section className="bg-gradient-to-r from-navy-900 via-industrial-600 to-navy-900 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-3">{dict.products.allProducts}</h1>
          <p className="text-white/75 text-lg max-w-2xl">{dict.products.browseProducts}</p>
        </div>
      </section>
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder={dict.products.searchCategories} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:border-tech-500 focus:ring-1 focus:ring-tech-500 outline-none transition-colors" />
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat) => (<CategoryCard key={cat.slug} category={cat} locale={l} />))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-navy-900 to-industrial-600 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{dict.products.needHelp}</h2>
          <p className="text-white/70 mb-6">{dict.products.needHelpDesc}</p>
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors">{dict.products.requestQuote} <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
