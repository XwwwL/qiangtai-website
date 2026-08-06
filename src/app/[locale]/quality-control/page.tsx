import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Shield, Search, Gauge, Eye, Package } from "lucide-react";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props { params: { locale: string } }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params; if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const baseUrl = locale === "en" ? `${siteConfig.siteUrl}/quality-control` : `${siteConfig.siteUrl}/zh/quality-control`;
  return { title: dict.seo.qualityTitle, description: dict.seo.qualityDescription, alternates: { canonical: baseUrl, languages: { en: `${siteConfig.siteUrl}/quality-control`, "zh-CN": `${siteConfig.siteUrl}/zh/quality-control`, "x-default": `${siteConfig.siteUrl}/quality-control` } } };
}

const stageIcons = [Search, Shield, Gauge, Eye, CheckCircle, Package];
const stageTitlesEn = ["1. Raw Material Inspection", "2. In-Process Inspection", "3. Dimensional Inspection", "4. Pressure Testing", "5. Surface & Visual Inspection", "6. Final Audit & Packaging"];
const stageTitlesZh = ["1. 原材料检验", "2. 过程检验", "3. 尺寸检测", "4. 压力测试", "5. 表面与外观检验", "6. 最终审核与包装"];
const stageDescsEn = [
  "All incoming materials are verified for chemical composition and mechanical properties against mill certificates.",
  "Quality checks at every production stage to catch and correct deviations before they become defects.",
  "Critical dimensions measured with calibrated instruments. Conformance to ANSI, DIN, BS, and JIS standards verified.",
  "Hydrostatic or pneumatic pressure testing per API 598, ANSI, and customer-specific requirements.",
  "Surface finish, thread quality, marking, and overall appearance inspected.",
  "Pre-shipment sampling audit. Products cleaned, protected, labeled, and packed to prevent transit damage.",
];
const stageDescsZh = [
  "对所有进厂材料进行化学成分和机械性能验证，对照材质证书检查。",
  "在每个生产阶段进行质量检查，及时发现并纠正偏差。",
  "使用校准仪器测量关键尺寸，验证是否符合ANSI、DIN、BS和JIS标准。",
  "按照API 598、ANSI和客户要求进行水压或气压测试。",
  "检查表面光洁度、螺纹质量、标识和整体外观。",
  "发货前抽样审核。产品清洁、防护、贴标并包装以防止运输损坏。",
];

export default function QualityControlPage({ params }: Props) {
  const { locale } = params; if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const l = locale as Locale;

  return (
    <>
      <section className="bg-gradient-to-r from-navy-900 via-industrial-600 to-navy-900 py-16"><div className="max-w-7xl mx-auto px-4"><h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4">{dict.quality.title}</h1><p className="text-white/75 text-lg mt-3 max-w-2xl">{dict.quality.subtitle}</p></div></section>
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle="" title={dict.quality.sixStageTitle} description={dict.quality.sixStageDesc} />
          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            {stageIcons.map((Icon, i) => (
              <div key={i} className="flex gap-5 p-5 rounded-xl border border-gray-100 hover:border-tech-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-tech-500 transition-colors"><Icon size={22} className="text-tech-500 group-hover:text-white transition-colors" /></div>
                <div><h3 className="font-semibold text-navy-900 mb-1.5">{l === "zh" ? stageTitlesZh[i] : stageTitlesEn[i]}</h3><p className="text-sm text-text-muted leading-relaxed">{l === "zh" ? stageDescsZh[i] : stageDescsEn[i]}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title={dict.quality.commitmentTitle} description={dict.quality.commitmentDesc} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { title: dict.quality.intlStandards, items: ["ANSI / ASME", "DIN", "BS", "JIS", "ISO"] },
              { title: dict.quality.testingCapabilities, items: ["Hydrostatic Testing", "Pneumatic Testing", "Dimensional Gauging", "Visual Inspection", "Thread Verification"] },
              { title: dict.quality.documentation, items: ["Material Certificates", "Test Reports", "Inspection Records", "Certificate of Conformance", "Packing List"] },
            ].map((col) => (
              <div key={col.title} className="metallic-card rounded-xl p-6"><h3 className="font-semibold text-navy-900 mb-3">{col.title}</h3><ul className="space-y-1.5">{col.items.map((item) => (<li key={item} className="flex items-center gap-2 text-sm text-text-muted"><CheckCircle size={14} className="text-teal-600" />{item}</li>))}</ul></div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gradient-to-r from-navy-900 to-industrial-600 text-center"><div className="max-w-2xl mx-auto px-4"><h2 className="text-2xl font-bold text-white mb-4">{dict.quality.qualityCTA}</h2><p className="text-white/70 mb-6">{dict.quality.qualityCTADesc}</p><Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors">{dict.common.requestQuote}</Link></div></section>
    </>
  );
}
