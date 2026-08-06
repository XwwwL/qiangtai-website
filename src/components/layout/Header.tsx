"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, X } from "lucide-react";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useDictionary, useLocale } from "@/hooks/useLocale";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";

export function Header() {
  const locale = useLocale();
  const dict = useDictionary();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const companyDisplay =
    locale === "zh" ? siteConfig.companyNameZh : siteConfig.companyNameShort;
  const taglineDisplay =
    locale === "zh" ? siteConfig.taglineZh : "Pipe Fittings & Valve";

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-[72px] md:h-[88px]">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.companyName}
              width={48}
              height={48}
              className="h-10 w-auto"
              priority
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-navy-900 leading-tight">
                {companyDisplay}
              </p>
              <p className="text-[10px] text-text-muted leading-tight">
                {taglineDisplay}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 ml-6">
            <Link
              href={`/${locale}`}
              className="px-2 xl:px-3 py-7 text-sm font-medium text-navy-900 hover:text-tech-500 transition-colors"
            >
              {dict.nav.home}
            </Link>
            <MegaMenu />
            <Link
              href={`/${locale}/manufacturing`}
              className="px-2 xl:px-3 py-7 text-sm font-medium text-navy-900 hover:text-tech-500 transition-colors"
            >
              {dict.nav.manufacturing}
            </Link>
            <Link
              href={`/${locale}/quality-control`}
              className="px-2 xl:px-3 py-7 text-sm font-medium text-navy-900 hover:text-tech-500 transition-colors"
            >
              {dict.nav.qualityControl}
            </Link>
            <Link
              href={`/${locale}/applications`}
              className="px-2 xl:px-3 py-7 text-sm font-medium text-navy-900 hover:text-tech-500 transition-colors"
            >
              {dict.nav.applications}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="px-2 xl:px-3 py-7 text-sm font-medium text-navy-900 hover:text-tech-500 transition-colors"
            >
              {dict.nav.aboutUs}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-2 xl:px-3 py-7 text-sm font-medium text-navy-900 hover:text-tech-500 transition-colors"
            >
              {dict.nav.contact}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Search */}
            {searchOpen && (
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
                <Search size={16} className="text-text-muted" />
                <input
                  type="text"
                  placeholder={dict.nav.searchPlaceholder}
                  className="bg-transparent border-none outline-none text-sm px-2 w-32 xl:w-48"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <X size={14} className="text-text-muted" />
                </button>
              </div>
            )}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden md:flex p-2 text-navy-900 hover:text-tech-500 transition-colors"
              aria-label={dict.nav.search}
            >
              <Search size={18} />
            </button>

            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex items-center px-3 xl:px-4 py-2 text-sm font-semibold text-white bg-tech-500 hover:bg-teal-600 rounded-lg transition-colors whitespace-nowrap"
            >
              {dict.nav.requestQuote}
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-navy-900 hover:text-tech-500 transition-colors"
              aria-label={dict.nav.menu}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
