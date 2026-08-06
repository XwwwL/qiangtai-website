export type Locale = "en" | "zh" | "ru";

export const locales = ["en", "zh", "ru"] as const;

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  ru: "Русский",
};

export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ru: "RU",
};

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
  ru: "ru",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
