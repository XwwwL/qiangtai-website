"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeShortLabels, isValidLocale, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  variant?: "inline" | "stacked";
  onSwitch?: () => void;
}

export function LanguageSwitcher({ variant = "inline", onSwitch }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale and remaining path
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale: Locale = isValidLocale(segments[0]) ? segments[0] : "en";
  const rest = isValidLocale(segments[0]) ? segments.slice(1).join("/") : segments.join("/");

  const switchTo = (locale: Locale) => {
    if (locale === currentLocale) return;
    const newPath = `/${locale}${rest ? `/${rest}` : ""}`;
    router.push(newPath);
    onSwitch?.();
  };

  if (variant === "stacked") {
    return (
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">
          Language / 语言
        </p>
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchTo(loc)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
              currentLocale === loc
                ? "bg-tech-500 text-white"
                : "text-navy-900 hover:bg-gray-100"
            }`}
            aria-label={`Switch to ${localeShortLabels[loc]}`}
          >
            {localeShortLabels[loc]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="text-gray-300 mx-1">|</span>}
          <button
            onClick={() => switchTo(loc)}
            className={`px-1.5 py-0.5 rounded transition-colors ${
              currentLocale === loc
                ? "text-tech-500 font-semibold"
                : "text-navy-900 hover:text-tech-500"
            }`}
            aria-label={`Switch to ${localeShortLabels[loc]}`}
            aria-current={currentLocale === loc ? "true" : undefined}
          >
            {localeShortLabels[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
