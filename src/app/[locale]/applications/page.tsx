import { Metadata } from "next";
import Link from "next/link";
import { Droplets, Flame, Beaker, Utensils, Cog, ShieldCheck, Anchor, Building2 } from "lucide-react";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Props { params: { locale: string } }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params; if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const baseUrl = locale === "en" ? `${siteConfig.siteUrl}/applications` : `${siteConfig.siteUrl}/zh/applications`;
  return { title: dict.seo.applicationsTitle, description: dict.seo.applicationsDescription, alternates: { canonical: baseUrl, languages: { en: `${siteConfig.siteUrl}/applications`, "zh-CN": `${siteConfig.siteUrl}/zh/applications`, "x-default": `${siteConfig.siteUrl}/applications` } } };
}

const appIcons = [Flame, Droplets, Beaker, Utensils, Cog, ShieldCheck, Anchor, Building2];
const appTitlesEn = ["Oil & Gas", "Water Treatment", "Chemical Processing", "Food Processing", "Industrial Equipment", "Fire Protection", "Marine Systems", "Construction & HVAC"];
const appTitlesZh = ["石油天然气", "水处理", "化工处理", "食品加工", "工业设备", "消防系统", "船舶系统", "建筑与暖通"];
const appDescsEn = [
  "High-pressure forged fittings and valves for exploration, production, refining, and transportation.",
  "Corrosion-resistant threaded fittings, couplings, and valves for water purification and wastewater treatment.",
  "Stainless steel and specialty alloy fittings for aggressive chemical media.",
  "Sanitary polished stainless steel fittings and nipples for food-grade piping.",
  "OEM fittings, connectors, and valve components for machinery and equipment manufacturers.",
  "Reliable threaded and grooved fittings for fire sprinkler, standpipe, and hydrant systems.",
  "Corrosion-resistant fittings and valves for shipboard piping and offshore platform utilities.",
  "Pipe fittings and connectors for commercial and residential plumbing, HVAC, and building services.",
];
const appDescsZh = [
  "用于勘探、生产、炼油和运输的高压锻造管件和阀门。",
  "用于水净化和废水处理的耐腐蚀螺纹管件、接头和阀门。",
  "用于腐蚀性化学介质的不锈钢和特种合金管件。",
  "用于食品级管道的卫生级抛光不锈钢管件和管接头。",
  "为机械和设备制造商提供OEM管件、连接件和阀门组件。",
  "用于消防喷淋、立管和消火栓系统的可靠螺纹和沟槽管件。",
  "用于船舶管道和海上平台设备的耐腐蚀管件和阀门。",
  "用于商业和住宅管道、暖通空调和建筑服务的管件和连接件。",
];

export default function ApplicationsPage({ params }: Props) {
  const { locale } = params; if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const l = locale as Locale;

  return (
    <>
      <section className="bg-gradient-to-r from-navy-900 via-industrial-600 to-navy-900 py-16"><div className="max-w-7xl mx-auto px-4"><h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4">{dict.nav.applications}</h1><p className="text-white/75 text-lg mt-3 max-w-2xl">{dict.home.applicationAreasDesc}</p></div></section>
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appIcons.map((Icon, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-xl border border-gray-100 hover:border-tech-500/30 transition-colors group">
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-tech-500 transition-colors"><Icon size={24} className="text-tech-500 group-hover:text-white transition-colors" /></div>
                <div><h3 className="font-semibold text-navy-900 text-lg mb-2">{l === "zh" ? appTitlesZh[i] : appTitlesEn[i]}</h3><p className="text-sm text-text-muted leading-relaxed">{l === "zh" ? appDescsZh[i] : appDescsEn[i]}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-page-bg"><div className="max-w-3xl mx-auto px-4 text-center"><SectionHeading title="Need a Solution?" description="Tell us about your application and we will recommend the right product." /><Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-tech-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">{dict.common.requestQuote}</Link></div></section>
    </>
  );
}
