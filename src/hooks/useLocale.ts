"use client";

import { usePathname } from "next/navigation";
import { Locale, locales, defaultLocale, isValidLocale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";

export function useLocale(): Locale {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  if (isValidLocale(segment)) return segment;
  return defaultLocale;
}

export function useDictionary(): Dictionary {
  const locale = useLocale();
  return getDictionary(locale);
}

export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (isValidLocale(segments[0])) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  return "/" + segments.join("/");
}
