import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  // ── Company Identity ──────────────────────────────────────
  companyName: "Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd.",
  companyNameZh: "浙江强泰管件阀门有限公司",
  companyNameShort: "CHANTI",

  tagline: "Professional Pipe Fittings & Valve Manufacturer",
  taglineZh: "专业管件阀门制造商",

  logo: "/images/logo/chanti-logo.png",
  email: "123@zj-qt.com",
  whatsapp: "+86-18057756988",
  whatsappDisplay: "+86 180 5775 6988",
  phone: "+86-577-86820588",
  phoneDisplay: "+86-577-86820588",
  phone2: "+86-577-86820518",
  phone2Display: "+86-577-86820518",
  phone3: "+86-18057756988",
  phone3Display: "+86 180 5775 6988",
  phone4: "+86-13017890588",
  phone4Display: "+86 130 1789 0588",

  address: "No. 768, Binhai 2nd Road, Longwan District, Wenzhou, Zhejiang, China",
  addressZh: "浙江省温州市龙湾区滨海二道768号",
  zipCode: "325025",

  founded: "Established in Wenzhou, China",
  socialLinks: {},

  // ── Location ──────────────────────────────────────────────
  location: {
    latitude: 27.884339151323392,
    longitude: 120.80763918556248,
    coordinates: "27.884339151323392,120.80763918556248",
    googleMapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=27.884339151323392%2C120.80763918556248",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=27.884339151323392%2C120.80763918556248",
  },

  siteUrl: "https://www.zj-qt.com",
  seo: {
    defaultTitle: "Pipe Fittings & Industrial Valve Manufacturer | CHANTI",
    titleTemplate: "%s | CHANTI - Pipe Fittings & Valve Manufacturer",
    defaultDescription:
      "Professional manufacturer of threaded pipe fittings, high pressure fittings, camlock couplings and industrial valves. OEM/ODM support, global delivery from Wenzhou, China.",
    defaultKeywords: [
      "pipe fittings manufacturer",
      "industrial valves",
      "threaded fittings",
      "camlock couplings",
      "high pressure fittings",
      "ball valves",
      "OEM pipe fittings",
      "China valve manufacturer",
      "stainless steel fittings",
    ],
  },
};
