import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { locales, isValidLocale, localeHtmlLang, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { BackToTop } from "@/components/ui/BackToTop";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const locale = params.locale;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const lang = localeHtmlLang[locale as Locale];
  const baseUrl = locale === "en" ? siteConfig.siteUrl : `${siteConfig.siteUrl}/${locale}`;

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: dict.seo.defaultTitle,
      template: "%s | CHANTI",
    },
    description: dict.seo.defaultDescription,
    keywords: siteConfig.seo.defaultKeywords,
    authors: [{ name: siteConfig.companyName }],
    creator: siteConfig.companyName,
    publisher: siteConfig.companyName,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      locale: lang === "zh-CN" ? "zh_CN" : lang === "ru" ? "ru_RU" : "en_US",
      url: baseUrl,
      siteName: siteConfig.companyNameShort,
      title: dict.seo.defaultTitle,
      description: dict.seo.defaultDescription,
      images: [{ url: "/images/logo/chanti-logo.png", width: 1254, height: 1254, alt: siteConfig.companyName }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.defaultTitle,
      description: dict.seo.defaultDescription,
      images: ["/images/logo/chanti-logo.png"],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        en: siteConfig.siteUrl,
        "zh-CN": `${siteConfig.siteUrl}/zh`,
        ru: `${siteConfig.siteUrl}/ru`,
        "x-default": siteConfig.siteUrl,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: { icon: "/images/logo/chanti-logo.png" },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </>
  );
}
