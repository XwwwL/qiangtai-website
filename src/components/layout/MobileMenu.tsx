"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { productCategories } from "@/data/categories";
import { siteConfig } from "@/config/site";
import { formatEmailForHref } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useDictionary, useLocale } from "@/hooks/useLocale";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const locale = useLocale();
  const dict = useDictionary();
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[300px] sm:w-[350px] bg-white z-50 transform transition-transform duration-300 lg:hidden overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-navy-900 text-lg">{dict.nav.menu}</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={dict.nav.close}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          <Link
            href={`/${locale}`}
            onClick={onClose}
            className="block py-3 px-2 text-sm font-medium text-navy-900 hover:text-tech-500 transition-colors rounded-lg hover:bg-gray-50"
          >
            {dict.nav.home}
          </Link>

          {/* Products with submenu */}
          <div>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="w-full flex items-center justify-between py-3 px-2 text-sm font-medium text-navy-900 hover:text-tech-500 transition-colors rounded-lg hover:bg-gray-50"
            >
              {dict.nav.products}
              <ChevronDown
                size={16}
                className={`transition-transform ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {productsOpen && (
              <div className="ml-3 space-y-1 border-l-2 border-teal-100 pl-3">
                {productCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${locale}/products/${cat.slug}`}
                    onClick={onClose}
                    className="block py-2 px-2 text-sm text-text-muted hover:text-tech-500 transition-colors rounded-lg hover:bg-teal-50/50"
                  >
                    {locale === "zh" ? cat.nameZh : cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[
            { key: "manufacturing" as const, href: `/${locale}/manufacturing` },
            { key: "qualityControl" as const, href: `/${locale}/quality-control` },
            { key: "applications" as const, href: `/${locale}/applications` },
            { key: "aboutUs" as const, href: `/${locale}/about` },
            { key: "contact" as const, href: `/${locale}/contact` },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block py-3 px-2 text-sm font-medium text-navy-900 hover:text-tech-500 transition-colors rounded-lg hover:bg-gray-50"
            >
              {dict.nav[item.key]}
            </Link>
          ))}

          <Link
            href={`/${locale}/contact`}
            onClick={onClose}
            className="block mt-4 py-3 px-4 text-sm font-semibold text-white bg-tech-500 hover:bg-teal-600 rounded-lg text-center transition-colors"
          >
            {dict.nav.requestQuote}
          </Link>

          {/* Language switch */}
          <div className="pt-5 mt-5 border-t border-gray-100">
            <LanguageSwitcher variant="stacked" onSwitch={onClose} />
          </div>

          {/* Contact */}
          <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
            <a
              href={formatEmailForHref(siteConfig.email)}
              className="block text-sm text-text-muted hover:text-tech-500 transition-colors"
            >
              {siteConfig.email}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/[\s+]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-text-muted hover:text-tech-500 transition-colors"
            >
              WhatsApp: {siteConfig.whatsappDisplay}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
