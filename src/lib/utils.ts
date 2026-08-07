import type { Locale } from "@/types";

/** Get localized text: en fallback if zh/ru missing */
export function localized(en: string, zh?: string, ru?: string, locale?: Locale): string {
  const l = locale || "en";
  if (l === "zh" && zh) return zh;
  if (l === "ru") return ru || zh || en;
  return en;
}

/** Get localized string array */
export function localizedArr(enArr: string[], zhArr: string[], ruArr: string[], locale: Locale): string[] {
  if (locale === "zh" && zhArr.length > 0) return zhArr;
  if (locale === "ru" && ruArr.length > 0) return ruArr;
  return enArr;
}

/**
 * Merge Tailwind CSS class names with conflict resolution
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Format phone number for tel: links
 */
export function formatPhoneForHref(phone: string): string {
  return `tel:${phone.replace(/[\s()-]/g, "")}`;
}

/**
 * Format WhatsApp link
 */
export function getWhatsAppUrl(number: string, message?: string): string {
  const cleanNumber = number.replace(/[\s()+]/g, "");
  const encoded = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${cleanNumber}${encoded}`;
}

/**
 * Format email for mailto: links
 */
export function formatEmailForHref(email: string, subject?: string): string {
  const encoded = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${encoded}`;
}

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}
