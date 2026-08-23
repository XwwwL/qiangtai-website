import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";

interface GoogleMapProps {
  locale: Locale;
}

const contentByLocale = {
  en: {
    eyebrow: "Our Location",
    company: "Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd.",
    description: "International buyers, distributors and business partners are welcome to contact us.",
    viewMap: "View on Google Maps",
    directions: "Get Directions",
    mapTitle: "Location of Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd.",
  },
  zh: {
    eyebrow: "公司位置",
    company: "浙江强泰管件阀门有限公司",
    description: "欢迎海外采购商、经销商及合作伙伴与我们联系。",
    viewMap: "在 Google 地图中查看",
    directions: "获取路线",
    mapTitle: "浙江强泰管件阀门有限公司位置地图",
  },
  ru: {
    eyebrow: "Наше местоположение",
    company: "Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd.",
    description: "Приглашаем международных покупателей, дистрибьюторов и деловых партнёров связаться с нами.",
    viewMap: "Открыть в Google Картах",
    directions: "Построить маршрут",
    mapTitle: "Местоположение Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd.",
  },
  ja: {
    eyebrow: "所在地",
    company: "Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd.",
    description: "海外のバイヤー、ディストリビューター、ビジネスパートナーの皆様のお問い合わせをお待ちしております。",
    viewMap: "Googleマップで見る",
    directions: "ルートを取得",
    mapTitle: "Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd.の所在地",
  },
  ko: {
    eyebrow: "위치",
    company: "Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd.",
    description: "해외 바이어, 유통업체, 비즈니스 파트너의 문의를 환영합니다.",
    viewMap: "Google 지도에서 보기",
    directions: "경로 보기",
    mapTitle: "Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd. 위치",
  },
} as const;

export function GoogleMap({ locale }: GoogleMapProps) {
  const content = contentByLocale[locale] ?? contentByLocale.en;
  const { latitude, longitude } = siteConfig.location;
  const coordinates = `${latitude},${longitude}`;

  const mapsEmbedUrl =
    `https://maps.google.com/maps?q=${encodeURIComponent(`loc:${coordinates}`)}&z=16&output=embed`;

  return (
    <section
      aria-labelledby="company-location-title"
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="grid lg:grid-cols-[360px_minmax(0,1fr)]">
        {/* Left — info panel */}
        <div className="flex flex-col justify-center bg-gradient-to-br from-navy-900 to-tech-500 p-7 text-white md:p-9">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal-500">
            {content.eyebrow}
          </p>
          <h2 id="company-location-title" className="text-2xl font-bold leading-tight md:text-3xl">
            {content.company}
          </h2>
          <p className="mt-4 leading-7 text-white/70">{content.description}</p>
          <p className="mt-5 font-mono text-sm text-white/50">
            {latitude}, {longitude}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={siteConfig.location.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 font-semibold text-white transition hover:bg-teal-500"
            >
              {content.viewMap}
            </a>
            <a
              href={siteConfig.location.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/30 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10"
            >
              {content.directions}
            </a>
          </div>
        </div>

        {/* Right — map iframe */}
        <div className="relative min-h-[360px] bg-gray-100 lg:min-h-[480px]">
          <iframe
            src={mapsEmbedUrl}
            title={content.mapTitle}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
