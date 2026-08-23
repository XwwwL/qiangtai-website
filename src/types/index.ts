// ── Locale ────────────────────────────────────────────────────
export type Locale = "en" | "zh" | "ru" | "ja" | "ko";

// ── Product Category ──────────────────────────────────────────
export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  nameZh: string;
  nameRu: string;
  nameJa?: string;
  nameKo?: string;
  shortDescription: string;
  shortDescriptionZh: string;
  shortDescriptionRu: string;
  shortDescriptionJa?: string;
  shortDescriptionKo?: string;
  description: string;
  descriptionZh: string;
  descriptionRu: string;
  descriptionJa?: string;
  descriptionKo?: string;
  image: string | null;
  productCount: number;
  features: string[];
  featuresZh: string[];
  featuresRu: string[];
  featuresJa?: string[];
  featuresKo?: string[];
  materials: string[];
  materialsZh: string[];
  materialsRu: string[];
  materialsJa?: string[];
  materialsKo?: string[];
  connectionTypes: string[];
  connectionTypesZh: string[];
  connectionTypesRu: string[];
  connectionTypesJa?: string[];
  connectionTypesKo?: string[];
  applications: string[];
  applicationsZh: string[];
  applicationsRu: string[];
  applicationsJa?: string[];
  applicationsKo?: string[];
  seoTitle: string;
  seoTitleZh: string;
  seoTitleRu: string;
  seoTitleJa?: string;
  seoTitleKo?: string;
  seoDescription: string;
  seoDescriptionZh: string;
  seoDescriptionRu: string;
  seoDescriptionJa?: string;
  seoDescriptionKo?: string;
  hasRealImages: boolean;
}

// ── Product ───────────────────────────────────────────────────
export interface Product {
  id: string;
  slug: string;
  categorySlug: string;
  name: string;
  nameZh: string;
  nameRu?: string;
  nameJa?: string;
  nameKo?: string;
  image: string | null;
  gallery: string[];
  shortDescription: string;
  shortDescriptionZh?: string;
  shortDescriptionRu?: string;
  shortDescriptionJa?: string;
  shortDescriptionKo?: string;
  description: string;
  descriptionZh?: string;
  descriptionRu?: string;
  descriptionJa?: string;
  descriptionKo?: string;
  features: string[];
  featuresZh?: string[];
  featuresRu?: string[];
  featuresJa?: string[];
  featuresKo?: string[];
  materials: string[];
  materialsZh?: string[];
  materialsRu?: string[];
  materialsJa?: string[];
  materialsKo?: string[];
  sizes: string[];
  connectionType: string;
  applications: string[];
  applicationsZh?: string[];
  applicationsRu?: string[];
  applicationsJa?: string[];
  applicationsKo?: string[];
  packaging: string;
  packagingZh?: string;
  packagingRu?: string;
  packagingJa?: string;
  packagingKo?: string;
  customizable: boolean;
  seoTitle: string;
  seoTitleZh?: string;
  seoTitleRu?: string;
  seoTitleJa?: string;
  seoTitleKo?: string;
  seoDescription: string;
  seoDescriptionZh?: string;
  seoDescriptionRu?: string;
  seoDescriptionJa?: string;
  seoDescriptionKo?: string;
}

// ── Site Config ───────────────────────────────────────────────
export interface SiteConfig {
  companyName: string;
  companyNameZh: string;
  companyNameShort: string;
  logo: string;
  tagline: string;
  taglineZh: string;
  email: string;
  whatsapp: string;
  whatsappDisplay: string;
  phone: string;
  phoneDisplay: string;
  phone2: string;
  phone2Display: string;
  phone3: string;
  phone3Display: string;
  phone4: string;
  phone4Display: string;
  address: string;
  addressZh: string;
  zipCode: string;
  founded: string;
  socialLinks: {
    linkedin?: string;
    youtube?: string;
    facebook?: string;
  };
  location: {
    latitude: number;
    longitude: number;
    coordinates: string;
    googleMapsSearchUrl: string;
    googleMapsDirectionsUrl: string;
  };
  siteUrl: string;
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    defaultKeywords: string[];
  };
}

// ── Navigation ────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ── Quote Form ────────────────────────────────────────────────
export interface QuoteFormData {
  fullName: string;
  companyName: string;
  country: string;
  email: string;
  phone: string;
  productCategory: string;
  productName: string;
  quantity: string;
  material: string;
  size: string;
  message: string;
  privacyAgreed: boolean;
}

export interface QuoteFormErrors {
  fullName?: string;
  companyName?: string;
  country?: string;
  email?: string;
  phone?: string;
  productCategory?: string;
  productName?: string;
  message?: string;
  privacyAgreed?: string;
}

// ── Image Mapping ─────────────────────────────────────────────
export interface ImageMapping {
  originalPath: string;
  newPath: string;
  category: string;
  productName: string;
  productNameZh: string;
}
