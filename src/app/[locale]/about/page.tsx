import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/config/site";
import { StructuredData } from "@/components/seo/StructuredData";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props { params: { locale: string } }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params; if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const baseUrl = locale === "en" ? `${siteConfig.siteUrl}/about` : `${siteConfig.siteUrl}/zh/about`;
  return { title: dict.seo.aboutTitle, description: dict.seo.aboutDescription, alternates: { canonical: baseUrl, languages: { en: `${siteConfig.siteUrl}/about`, "zh-CN": `${siteConfig.siteUrl}/zh/about`, "x-default": `${siteConfig.siteUrl}/about` } } };
}

export default function AboutPage({ params }: Props) {
  const { locale } = params; if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const l = locale as Locale;

  return (
    <>
      <StructuredData type="Organization" />
      <section className="bg-gradient-to-r from-navy-900 via-industrial-600 to-navy-900 py-16"><div className="max-w-7xl mx-auto px-4"><h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4">{dict.about.title}</h1><p className="text-white/75 text-lg mt-3 max-w-2xl">{dict.about.subtitle}</p></div></section>
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">{l === "zh" ? siteConfig.companyNameZh : siteConfig.companyName}</h2>
              <p className="text-text-muted leading-relaxed mb-4">
                {l === "zh"
                  ? "强泰是一家专业生产管件、螺纹管件、高压管件、快速接头和工业阀门的制造商，位于中国浙江省温州市。我们受益于完整的工业供应链和数十年的本地专业经验。我们的产品范围涵盖螺纹管件、螺纹管子和管接头、高压管件、快速接头以及各类工业球阀，包括电动和气动执行器型号。我们服务全球进口商、经销商、工程公司和工业终端用户。作为工厂直供制造商，我们提供有竞争力的价格、灵活的生产和可靠的质量控制。"
                  : `${siteConfig.companyNameShort} is a professional manufacturer specializing in pipe fittings, threaded fittings, high pressure fittings, camlock couplings, and industrial valves. Located in Wenzhou, Zhejiang — a major manufacturing hub for valves and fittings — we benefit from a complete industrial supply chain. Our product range covers threaded fittings, threaded pipes and nipples, high pressure fittings, camlock couplings, and various types of ball valves. We serve importers, distributors, engineering companies, and end-users worldwide.`}
              </p>
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden"><Image src="/images/factory/a1484d99f7cbcb8964b8260a190fd3d8.jpg" alt="CHANTI" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /></div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title={dict.about.ourMission} description={dict.about.ourMissionDesc} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[{ title: dict.about.qualityFirst, desc: dict.about.qualityFirstDesc }, { title: dict.about.customerFocus, desc: dict.about.customerFocusDesc }, { title: dict.about.continuousImprovement, desc: dict.about.continuousImprovementDesc }].map((item) => (
              <div key={item.title} className="metallic-card rounded-xl p-6 text-center"><div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4"><CheckCircle size={22} className="text-tech-500" /></div><h3 className="font-semibold text-navy-900 mb-2">{item.title}</h3><p className="text-sm text-text-muted leading-relaxed">{item.desc}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gradient-to-r from-navy-900 to-industrial-600 text-center"><div className="max-w-2xl mx-auto px-4"><h2 className="text-2xl font-bold text-white mb-4">{dict.about.partnerCTA}</h2><p className="text-white/70 mb-6">{dict.about.partnerCTADesc}</p><Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors">{dict.about.contactUsToday}</Link></div></section>
    </>
  );
}
