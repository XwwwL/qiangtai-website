import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Cog, Gauge, Wrench } from "lucide-react";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props { params: { locale: string } }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params; if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const baseUrl = locale === "en" ? `${siteConfig.siteUrl}/manufacturing` : `${siteConfig.siteUrl}/zh/manufacturing`;
  return { title: dict.seo.manufacturingTitle, description: dict.seo.manufacturingDescription, alternates: { canonical: baseUrl, languages: { en: `${siteConfig.siteUrl}/manufacturing`, "zh-CN": `${siteConfig.siteUrl}/zh/manufacturing`, "x-default": `${siteConfig.siteUrl}/manufacturing` } } };
}

const icons = { Cog, Wrench, Gauge, CheckCircle };
const capabilities = [
  { icon: "Cog" as const, titleKey: "manufacturing" as const, idx: 0 },
  { icon: "Wrench" as const, titleKey: "manufacturing" as const, idx: 1 },
  { icon: "Gauge" as const, titleKey: "manufacturing" as const, idx: 2 },
  { icon: "CheckCircle" as const, titleKey: "manufacturing" as const, idx: 3 },
];

const factoryImages = [
  { src: "/images/factory/a1484d99f7cbcb8964b8260a190fd3d8.jpg", alt: "Factory Workshop" },
  { src: "/images/factory/image-8-2-16_54_21-1.jpg", alt: "Production Line" },
  { src: "/images/factory/image-8-2-16_54_23-2.jpg", alt: "Quality Control" },
  { src: "/images/factory/image-8-2-16_54_25-3.jpg", alt: "Machining Center" },
  { src: "/images/factory/image-8-2-16_54_26-4.jpg", alt: "Assembly Area" },
  { src: "/images/factory/image-8-2-16_54_27-5.jpg", alt: "Warehouse" },
];

const capDescs = [
  "Multi-axis CNC machining centers for precise fitting and valve body production with tight tolerances.",
  "Automated threading lines for NPT, BSPT, BSPP threads with consistent accuracy across high-volume production.",
  "In-house hydrostatic and pneumatic pressure testing stations for validating every pressure-containing component.",
  "Polishing, passivation, galvanizing, and other surface treatments to meet application and aesthetic requirements.",
];
const capDescsZh = [
  "多轴CNC加工中心，用于精密管件和阀体生产，公差严格。",
  "自动化螺纹加工线，支持NPT、BSPT、BSPP螺纹，大批量生产保持一致精度。",
  "内部水压和气压测试站，验证每个承压部件。",
  "抛光、钝化、镀锌等表面处理，满足应用和美观要求。",
];

export default function ManufacturingPage({ params }: Props) {
  const { locale } = params; if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const l = locale as Locale;
  const steps = [dict.manufacturing.step1Title, dict.manufacturing.step2Title, dict.manufacturing.step3Title, dict.manufacturing.step4Title, dict.manufacturing.step5Title, dict.manufacturing.step6Title];
  const stepDescs = [dict.manufacturing.step1Desc, dict.manufacturing.step2Desc, dict.manufacturing.step3Desc, dict.manufacturing.step4Desc, dict.manufacturing.step5Desc, dict.manufacturing.step6Desc];

  return (
    <>
      <section className="bg-gradient-to-r from-navy-900 via-industrial-600 to-navy-900 py-16"><div className="max-w-7xl mx-auto px-4"><h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4">{dict.manufacturing.title}</h1><p className="text-white/75 text-lg mt-3 max-w-2xl">{dict.manufacturing.subtitle}</p></div></section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle="" title={dict.manufacturing.capabilities} description={dict.manufacturing.capabilitiesDesc} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {[Cog, Wrench, Gauge, CheckCircle].map((Icon, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-xl border border-gray-100 hover:border-tech-500/30 transition-colors group">
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-tech-500 transition-colors"><Icon size={24} className="text-tech-500 group-hover:text-white transition-colors" /></div>
                <div><h3 className="font-semibold text-navy-900 text-lg mb-2">{l === "zh" ? ["CNC精密加工", "螺纹加工与攻丝", "压力测试", "表面处理"][i] : ["CNC Precision Machining", "Threading & Tapping", "Pressure Testing", "Surface Treatment"][i]}</h3><p className="text-sm text-text-muted leading-relaxed">{l === "zh" ? capDescsZh[i] : capDescs[i]}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle={dict.manufacturing.factoryGallery} title={dict.manufacturing.insideFacility} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">{factoryImages.map((img) => (<div key={img.alt} className="relative aspect-[4/3] rounded-xl overflow-hidden card-hover"><Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" /></div>))}</div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">{dict.manufacturing.productionProcess}</h2>
              <div className="space-y-4">
                {steps.map((title, i) => (
                  <div key={title} className="flex gap-4"><span className="text-2xl font-extrabold text-tech-500 shrink-0 w-10">{String(i + 1).padStart(2, "0")}</span><div><h4 className="font-semibold text-navy-900">{title}</h4><p className="text-sm text-text-muted">{stepDescs[i]}</p></div></div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden"><Image src="/images/factory/a1484d99f7cbcb8964b8260a190fd3d8.jpg" alt="CHANTI Production" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-navy-900 to-industrial-600 text-center"><div className="max-w-2xl mx-auto px-4"><h2 className="text-2xl font-bold text-white mb-4">{dict.manufacturing.oemCTATitle}</h2><p className="text-white/70 mb-6">{dict.manufacturing.oemCTADesc}</p><Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors">{dict.manufacturing.requestCustom}</Link></div></section>
    </>
  );
}
