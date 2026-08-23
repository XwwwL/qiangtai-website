export type Locale = "en" | "zh" | "ru" | "ja" | "ko";

export const locales = ["en", "zh", "ru", "ja", "ko"] as const;

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  ru: "Русский",
  ja: "日本語",
  ko: "한국어",
};

export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ru: "RU",
  ja: "日本語",
  ko: "한국어",
};

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
  ru: "ru",
  ja: "ja",
  ko: "ko",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
