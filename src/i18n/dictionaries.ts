import { Locale } from "./config";
import en, { type Dictionary } from "./en";
import zh from "./zh";
import ru from "./ru";
import ja from "./ja";
import ko from "./ko";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = {
  en,
  zh,
  ru,
  ja,
  ko,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
