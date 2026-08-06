"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { productCategories } from "@/data/categories";
import { formatEmailForHref } from "@/lib/utils";
import { useDictionary, useLocale } from "@/hooks/useLocale";

export function Footer() {
  const locale = useLocale();
  const dict = useDictionary();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Company */}
          <div>
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 mb-4 group"
              aria-label={locale === "zh" ? "返回首页" : "Go to homepage"}
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-white">
                <Image
                  src={siteConfig.logo}
                  alt={
                    locale === "zh"
                      ? "浙江强泰管件阀门有限公司商标"
                      : "Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd. logo"
                  }
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <p className="font-bold text-white">
                  {locale === "zh" ? "强泰" : siteConfig.companyNameShort}
                </p>
                <p className="text-xs text-white/60">
                  {locale === "zh" ? "管件与工业阀门" : "Pipe Fittings & Valve"}
                </p>
              </div>
            </Link>
            <p className="text-sm text-white/65 leading-relaxed mb-5">
              {dict.footer.companyDesc}
            </p>
            <div className="space-y-2.5 text-sm text-white/65">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-teal-500" />
                <span>{locale === "zh" ? siteConfig.addressZh : siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-teal-500" />
                <a
                  href={formatEmailForHref(siteConfig.email)}
                  className="hover:text-teal-500 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-teal-500" />
                <a
                  href={`tel:${siteConfig.phone.replace(/[\s-]/g, "")}`}
                  className="hover:text-teal-500 transition-colors"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {dict.footer.productCategories}
            </h4>
            <ul className="space-y-2">
              {productCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${locale}/products/${cat.slug}`}
                    className="text-sm text-white/65 hover:text-teal-500 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight
                      size={13}
                      className="text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {locale === "zh" ? cat.nameZh : cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {dict.footer.getInTouch}
            </h4>
            <p className="text-sm text-white/65 mb-5 leading-relaxed">
              {dict.footer.getInTouchDesc}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-tech-500 hover:bg-teal-600 rounded-lg transition-colors mb-5"
            >
              {dict.footer.requestQuote}
            </Link>
            <div className="space-y-2 text-sm text-white/65">
              <p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/[\s+]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-500 transition-colors"
                >
                  {dict.footer.whatsapp}: {siteConfig.whatsappDisplay}
                </a>
              </p>
              <p>{siteConfig.phoneDisplay}</p>
              <p>{siteConfig.phone2Display}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/45">
            &copy; {currentYear} {siteConfig.companyNameShort}. {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-4 text-xs text-white/45">
            <Link
              href={`/${locale}/privacy-policy`}
              className="hover:text-teal-500 transition-colors"
            >
              {dict.footer.privacyPolicy}
            </Link>
            <Link href="/sitemap.xml" className="hover:text-teal-500 transition-colors">
              {dict.footer.sitemap}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
