import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, Send } from "lucide-react";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { productCategories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { siteConfig } from "@/config/site";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyCategoryState } from "@/components/products/EmptyCategoryState";
import { StructuredData } from "@/components/seo/StructuredData";

interface Props { params: { locale: string; categorySlug: string } }

export async function generateStaticParams() {
  return productCategories.flatMap((cat) => [{ locale: "en", categorySlug: cat.slug }, { locale: "zh", categorySlug: cat.slug }]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, categorySlug: slug } = params;
  if (!isValidLocale(locale)) return {};
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Not Found" };
  const baseUrl = locale === "en" ? `${siteConfig.siteUrl}/products/${slug}` : `${siteConfig.siteUrl}/zh/products/${slug}`;
  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    alternates: { canonical: baseUrl, languages: { en: `${siteConfig.siteUrl}/products/${slug}`, "zh-CN": `${siteConfig.siteUrl}/zh/products/${slug}`, "x-default": `${siteConfig.siteUrl}/products/${slug}` } },
  };
}

export default function CategoryPage({ params }: Props) {
  const { locale, categorySlug: slug } = params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const l = locale as Locale;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();
  const products = getProductsByCategory(slug);
  const displayName = l === "zh" ? cat.nameZh : cat.name;

  return (
    <>
      <StructuredData type="ItemList" data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: cat.name, url: `${siteConfig.siteUrl}/${locale}/products/${slug}`, itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${siteConfig.siteUrl}/${locale}/products/${p.categorySlug}/${p.slug}` })) }} />
      <section className="bg-gradient-to-r from-navy-900 via-industrial-600 to-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col md:flex-row gap-8 mt-4 items-start">
            <div className="flex-1">
              <span className="text-sm text-teal-500 mb-2 block">{l === "zh" ? cat.nameZh : cat.nameZh}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{displayName}</h1>
              <p className="text-white/75 text-lg max-w-2xl">{cat.shortDescription}</p>
            </div>
            <div className="shrink-0 flex gap-3">
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors text-sm"><Send size={16} />{dict.categoryPage.requestQuote}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4">
          {cat.hasRealImages ? (
            products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{products.map((p) => (<ProductCard key={p.id} product={p} locale={l} />))}</div>
            ) : (<EmptyCategoryState categoryName={displayName} />)
          ) : (<EmptyCategoryState categoryName={displayName} />)}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">{dict.categoryPage.aboutCategory} {displayName}</h2>
              <p className="text-text-muted leading-relaxed mb-6">{cat.description}</p>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">{dict.categoryPage.keyFeatures}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">{cat.features.map((f) => (<div key={f} className="flex items-start gap-2"><CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" /><span className="text-sm text-text-muted">{f}</span></div>))}</div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">{dict.categoryPage.availableMaterials}</h3>
              <div className="flex flex-wrap gap-2 mb-6">{cat.materials.map((m) => (<span key={m} className="px-3 py-1 bg-teal-50 text-tech-500 text-xs font-medium rounded-full">{m}</span>))}</div>
            </div>
            <div className="space-y-6">
              <div className="metallic-card rounded-xl p-5"><h4 className="font-semibold text-navy-900 mb-3">{dict.categoryPage.connectionTypes}</h4><ul className="space-y-1.5">{cat.connectionTypes.map((c) => (<li key={c} className="text-sm text-text-muted flex items-center gap-2"><CheckCircle size={14} className="text-teal-600" />{c}</li>))}</ul></div>
              <div className="metallic-card rounded-xl p-5"><h4 className="font-semibold text-navy-900 mb-3">{dict.categoryPage.applications}</h4><ul className="space-y-1.5">{cat.applications.map((a) => (<li key={a} className="text-sm text-text-muted flex items-center gap-2"><CheckCircle size={14} className="text-teal-600" />{a}</li>))}</ul></div>
              <div className="metallic-card rounded-xl p-5"><h4 className="font-semibold text-navy-900 mb-2">{dict.categoryPage.oemOdm}</h4><p className="text-xs text-text-muted leading-relaxed">{dict.categoryPage.oemDesc}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-page-bg border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4"><div className="max-w-3xl"><h2 className="text-lg font-semibold text-navy-900 mb-3">{displayName} — {dict.categoryPage.manufacturerSupplier}</h2><p className="text-sm text-text-muted leading-relaxed">{siteConfig.companyName} {dict.categoryPage.seoDescription}</p></div></div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-navy-900 mb-6">{dict.categoryPage.relatedCategories}</h2>
          <div className="flex flex-wrap gap-3">{productCategories.filter((c) => c.slug !== cat.slug).slice(0, 6).map((rc) => (<Link key={rc.slug} href={`/${locale}/products/${rc.slug}`} className="px-4 py-2 bg-gray-50 hover:bg-teal-50 text-sm text-navy-900 hover:text-tech-500 rounded-lg transition-colors border border-gray-100 hover:border-tech-500/20">{l === "zh" ? rc.nameZh : rc.name}</Link>))}</div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-navy-900 to-industrial-600 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-3">{dict.categoryPage.needQuote} {displayName}?</h2>
          <p className="text-white/70 mb-6">{dict.categoryPage.needQuoteDesc}</p>
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors"><Send size={16} />{dict.categoryPage.requestQuote} <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
