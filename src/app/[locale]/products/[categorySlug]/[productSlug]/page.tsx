import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Send } from "lucide-react";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategoryBySlug } from "@/data/categories";
import { getProductByCategoryAndSlug, getRelatedProducts, products } from "@/data/products";
import { siteConfig } from "@/config/site";
import { localized, localizedArr } from "@/lib/utils";
import { StructuredData } from "@/components/seo/StructuredData";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGallery } from "@/components/products/ProductGallery";

interface Props { params: { locale: string; categorySlug: string; productSlug: string } }

export async function generateStaticParams() {
  return products.flatMap((p) =>
    locales.map((locale) => ({ locale, categorySlug: p.categorySlug, productSlug: p.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, categorySlug, productSlug } = params;
  if (!isValidLocale(locale)) return {};
  const prod = getProductByCategoryAndSlug(categorySlug, productSlug);
  if (!prod) return { title: "Not Found" };
  const l = locale as Locale;
  const prefix = l === "en" ? "" : `/${locale}`;
  const baseUrl = `${siteConfig.siteUrl}${prefix}/products/${categorySlug}/${productSlug}`;
  const title = localized(prod.seoTitle, prod.seoTitleZh || `${prod.nameZh} | ${siteConfig.companyNameShort}`, prod.seoTitleRu, l);
  const desc = localized(prod.seoDescription, prod.seoDescriptionZh, prod.seoDescriptionRu, l);
  return {
    title: title || prod.name,
    description: desc || prod.shortDescription,
    alternates: {
      canonical: baseUrl,
      languages: {
        en: `${siteConfig.siteUrl}/products/${categorySlug}/${productSlug}`,
        "zh-CN": `${siteConfig.siteUrl}/zh/products/${categorySlug}/${productSlug}`,
        ru: `${siteConfig.siteUrl}/ru/products/${categorySlug}/${productSlug}`,
        ja: `${siteConfig.siteUrl}/ja/products/${categorySlug}/${productSlug}`,
        ko: `${siteConfig.siteUrl}/ko/products/${categorySlug}/${productSlug}`,
        "x-default": `${siteConfig.siteUrl}/products/${categorySlug}/${productSlug}`,
      },
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const { locale, categorySlug, productSlug } = params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const l = locale as Locale;
  const product = getProductByCategoryAndSlug(categorySlug, productSlug);
  if (!product) notFound();
  const category = getCategoryBySlug(categorySlug);
  const relatedProducts = getRelatedProducts(product.slug, categorySlug, 4);

  const displayName = localized(product.name, product.nameZh, product.nameRu, l);
  const displaySubtitle = localized(product.name, product.nameZh, product.nameRu, l === "zh" ? "en" : "zh");
  const displayDesc = localized(product.description, product.descriptionZh, product.descriptionRu, l);
  const displayFeatures = localizedArr(product.features, product.featuresZh || [], product.featuresRu || [], l);
  const displayMaterials = localizedArr(product.materials, product.materialsZh || [], product.materialsRu || [], l);
  const displayApps = localizedArr(product.applications, product.applicationsZh || [], product.applicationsRu || [], l);
  const displayPackaging = localized(product.packaging, product.packagingZh, product.packagingRu, l);

  const productSchema = { "@context": "https://schema.org", "@type": "Product", name: displayName, description: product.shortDescription, url: `${siteConfig.siteUrl}/${locale}/products/${product.categorySlug}/${product.slug}`, manufacturer: { "@type": "Organization", name: siteConfig.companyName }, ...(product.image && { image: `${siteConfig.siteUrl}${product.image}` }) };

  return (
    <>
      <StructuredData type="Product" data={productSchema} />
      <section className="bg-gradient-to-r from-navy-900 via-industrial-600 to-navy-900 py-12">
        <div className="max-w-7xl mx-auto px-4" />
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ProductGallery gallery={product.gallery} alt={displayName} />
            <div>
              <span className="text-sm text-tech-500 font-medium">{displaySubtitle}</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-navy-900 mt-1 mb-3">{displayName}</h1>
              <p className="text-text-muted leading-relaxed mb-6">{displayDesc}</p>
              <h3 className="font-semibold text-navy-900 mb-3">{dict.productDetail.features}</h3>
              <ul className="space-y-2 mb-6">{displayFeatures.map((f) => (<li key={f} className="flex items-start gap-2 text-sm text-text-muted"><CheckCircle size={16} className="text-teal-600 mt-0.5 shrink-0" />{f}</li>))}</ul>
              <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                <table className="w-full text-sm"><tbody>{[
                  { label: dict.productDetail.materialOptions, value: displayMaterials.join(", ") },
                  { label: dict.productDetail.availableSizes, value: product.sizes.join(", ") },
                  { label: dict.productDetail.connectionType, value: product.connectionType },
                  { label: dict.productDetail.applications, value: displayApps.slice(0, 4).join(", ") },
                  { label: dict.productDetail.customization, value: product.customizable ? dict.productDetail.oemOdmAvailable : dict.productDetail.standard },
                  { label: dict.productDetail.packaging, value: displayPackaging },
                ].map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}><td className="px-4 py-2.5 font-medium text-navy-900 w-1/3">{row.label}</td><td className="px-4 py-2.5 text-text-muted">{row.value}</td></tr>
                ))}</tbody></table>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${locale}/contact?product=${product.slug}&category=${product.categorySlug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-tech-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"><Send size={16} />{dict.productDetail.requestQuote}</Link>
                <a href={`https://wa.me/${siteConfig.whatsapp.replace(/[\s+]/g, "")}?text=${encodeURIComponent(`Hi, I'm interested in ${displayName}.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1fa952] text-white font-semibold rounded-lg transition-colors">{dict.productDetail.whatsapp}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="metallic-card rounded-xl p-6"><h3 className="font-semibold text-navy-900 mb-2">{dict.productDetail.customization}</h3><p className="text-sm text-text-muted leading-relaxed">{dict.productDetail.oemDesc}</p></div>
            <div className="metallic-card rounded-xl p-6"><h3 className="font-semibold text-navy-900 mb-2">{dict.productDetail.packaging}</h3><p className="text-sm text-text-muted leading-relaxed">{displayPackaging}</p></div>
            <div className="metallic-card rounded-xl p-6"><h3 className="font-semibold text-navy-900 mb-2">{dict.productDetail.shipping}</h3><p className="text-sm text-text-muted leading-relaxed">{dict.productDetail.shippingDesc}</p></div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold text-navy-900 mb-6">{dict.productDetail.relatedProducts}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{relatedProducts.map((p) => (<ProductCard key={p.id} product={p} locale={l} />))}</div>
          </div>
        </section>
      )}
    </>
  );
}
