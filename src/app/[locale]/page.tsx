import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Factory, Shield, Globe, Zap, Award, Settings, Send, TrendingUp, Users, Package, Wrench } from "lucide-react";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/config/site";
import { productCategories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { StructuredData } from "@/components/seo/StructuredData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryCard } from "@/components/products/CategoryCard";

interface HomePageProps { params: { locale: string } }

export async function generateMetadata({ params }: HomePageProps) {
  const locale = params.locale;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const baseUrl = locale === "en" ? siteConfig.siteUrl : `${siteConfig.siteUrl}/zh`;
  return {
    title: dict.seo.homeTitle,
    description: dict.seo.homeDescription,
    alternates: { canonical: baseUrl, languages: { en: siteConfig.siteUrl, "zh-CN": `${siteConfig.siteUrl}/zh`, "x-default": siteConfig.siteUrl } },
  };
}

const iconMap = { Factory, Shield, Settings, Globe, Zap, Award };

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;
  if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const featuredProducts = getFeaturedProducts(8);
  const l = locale as Locale;

  return (
    <>
      <StructuredData type="Organization" />
      <StructuredData type="WebSite" />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/factory/a1484d99f7cbcb8964b8260a190fd3d8.jpg" alt="CHANTI Factory" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 gradient-overlay-navy" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-teal-500 mb-4">{l === "zh" ? siteConfig.taglineZh : siteConfig.tagline}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {dict.home.heroTitle1}<br /><span className="text-teal-500">{dict.home.heroTitle2}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">{dict.home.heroSubtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors">{dict.home.exploreProducts} <ArrowRight size={18} /></Link>
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg border border-white/25 transition-colors">{dict.home.requestQuote}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CORE ADVANTAGES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle={dict.home.whyChooseUs} title={dict.home.coreAdvantages} description={dict.home.coreAdvDesc} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {dict.advantages.map((item, i) => {
              const icons = [Factory, Shield, Settings, Globe, Zap, Award];
              const Icon = icons[i % icons.length];
              return (
                <div key={item.title} className="metallic-card rounded-xl p-6 card-hover group">
                  <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-tech-500 transition-colors">
                    <Icon size={22} className="text-tech-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-16 md:py-20 bg-page-bg bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle={dict.home.ourProducts} title={dict.home.productCategories} description={dict.home.productCatDesc} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {productCategories.map((cat) => (<CategoryCard key={cat.slug} category={cat} locale={l} />))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle={dict.home.featuredProducts} title={dict.home.popularProducts} description={dict.home.popularProdDesc} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {featuredProducts.map((p) => (<ProductCard key={p.id} product={p} locale={l} />))}
          </div>
          <div className="text-center mt-10">
            <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 text-sm font-semibold text-tech-500 hover:text-teal-600 transition-colors">{dict.home.viewAllProducts} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* FACTORY */}
      <section className="py-16 md:py-20 bg-navy-900 bg-tech-lines">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden"><Image src="/images/factory/a1484d99f7cbcb8964b8260a190fd3d8.jpg" alt="Factory" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" /></div>
              <div className="flex flex-col gap-3">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden"><Image src="/images/factory/image-8-2-16_54_21-1.jpg" alt="Production" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" /></div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden"><Image src="/images/factory/image-8-2-16_54_23-2.jpg" alt="QC" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" /></div>
              </div>
            </div>
            <div>
              <SectionHeading subtitle={dict.home.ourFacility} title={dict.home.advancedManufacturing} description={dict.home.advancedManuDesc} light centered={false} />
              <ul className="space-y-3 mt-6">
                {dict.factoryFeatures.map((item) => (<li key={item} className="flex items-start gap-3 text-white/80"><CheckCircle size={18} className="text-teal-500 shrink-0 mt-0.5" /><span>{item}</span></li>))}
              </ul>
              <Link href={`/${locale}/manufacturing`} className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors">{dict.home.viewManufacturing} <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 bg-gradient-to-r from-navy-900 via-industrial-600 to-teal-600">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {dict.stats.map((stat) => (<div key={stat.label}><p className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</p><p className="text-white/70 text-sm">{stat.label}</p></div>))}
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle={dict.home.qualityAssurance} title={dict.home.qualityControl} description={dict.home.qualityControlDesc} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {dict.qualitySteps.map((step, i) => (
              <div key={step.title} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-tech-500/30 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-tech-500 transition-colors"><span className="text-sm font-bold text-tech-500 group-hover:text-white transition-colors">{i + 1}</span></div>
                <div><h4 className="font-semibold text-navy-900 mb-1">{step.title}</h4><p className="text-sm text-text-muted">{step.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10"><Link href={`/${locale}/quality-control`} className="inline-flex items-center gap-2 text-sm font-semibold text-tech-500 hover:text-teal-600 transition-colors">{dict.home.learnMoreQuality} <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-16 md:py-20 bg-page-bg bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle={dict.home.industriesServed} title={dict.home.applicationAreas} description={dict.home.applicationAreasDesc} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {dict.applications.map((app) => (
              <div key={app.title} className="metallic-card rounded-xl p-5 text-center card-hover"><Wrench size={28} className="mx-auto text-tech-500 mb-3" /><h4 className="font-semibold text-navy-900 text-sm">{app.title}</h4><p className="text-xs text-text-muted mt-1.5 leading-relaxed">{app.desc}</p></div>
            ))}
          </div>
          <div className="text-center mt-10"><Link href={`/${locale}/applications`} className="inline-flex items-center gap-2 text-sm font-semibold text-tech-500 hover:text-teal-600 transition-colors">{dict.home.viewAllApplications} <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle={dict.home.whyChanti} title={dict.home.whyChooseUsTitle} description={dict.home.whyChooseUsDesc} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {dict.whyChooseUsItems.map((item, i) => {
              const icons = [Factory, Package, TrendingUp, Users];
              const Icon = icons[i % icons.length];
              return (
                <div key={item.title} className="flex gap-5">
                  <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center shrink-0"><Icon size={24} className="text-tech-500" /></div>
                  <div><h3 className="font-semibold text-navy-900 text-lg mb-2">{item.title}</h3><p className="text-sm text-text-muted leading-relaxed">{item.desc}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUOTE CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-navy-900 via-industrial-600 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-lines opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{dict.home.quoteCTATitle}</h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">{dict.home.quoteCTADesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-7 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors"><Send size={18} />{dict.home.requestQuote}</Link>
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-7 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg border border-white/25 transition-colors">{dict.home.contactUs}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
