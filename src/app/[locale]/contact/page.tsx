import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/config/site";
import { StructuredData } from "@/components/seo/StructuredData";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { GoogleMap } from "@/components/contact/GoogleMap";
import { formatEmailForHref } from "@/lib/utils";

interface Props { params: { locale: string } }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params; if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const baseUrl = `${siteConfig.siteUrl}/${locale === "en" ? "" : locale + "/"}contact`.replace(/\/\//g, "/");
  return { title: dict.seo.contactTitle, description: dict.seo.contactDescription, alternates: { canonical: `${siteConfig.siteUrl}/${locale === "en" ? "" : locale + "/"}contact`.replace(/\/\//g, "/"), languages: { en: `${siteConfig.siteUrl}/contact`, "zh-CN": `${siteConfig.siteUrl}/zh/contact`, ru: `${siteConfig.siteUrl}/ru/contact`, "x-default": `${siteConfig.siteUrl}/contact` } } };
}

export default function ContactPage({ params }: Props) {
  const { locale } = params; if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);
  const l = locale as Locale;

  return (
    <>
      <StructuredData type="Organization" />
      {/* Hero */}
      <section className="bg-gradient-to-r from-navy-900 via-industrial-600 to-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">{dict.contact.title}</h1>
          <p className="text-white/75 text-lg mt-3 max-w-2xl">{dict.contact.subtitle}</p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Inquiry Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">{dict.contactForm.title}</h2>
              <p className="text-text-muted mb-6 leading-relaxed text-sm">{dict.contactForm.description}</p>
              <div className="metallic-card rounded-2xl p-6">
                <QuoteForm locale={l} dictionary={dict.contactForm} />
              </div>
            </div>

            {/* Company Info */}
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">{dict.contact.companyInfo}</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-tech-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-navy-900">{dict.contact.address}</p>
                    <p className="text-sm text-text-muted">{l === "zh" ? siteConfig.addressZh : siteConfig.address}</p>
                    <p className="text-xs text-text-muted mt-0.5">ZIP: {siteConfig.zipCode}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-tech-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-navy-900">{dict.contact.email}</p>
                    <a href={formatEmailForHref(siteConfig.email)} className="text-sm text-tech-500 hover:text-teal-600 transition-colors">{siteConfig.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-tech-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-navy-900">{dict.contact.phone}</p>
                    <p className="text-sm text-text-muted">{siteConfig.phoneDisplay}</p>
                    <p className="text-sm text-text-muted">{siteConfig.phone2Display}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-tech-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-navy-900">{dict.contact.businessHours}</p>
                    <p className="text-sm text-text-muted">{dict.contact.businessHoursValue1}</p>
                    <p className="text-sm text-text-muted">{dict.contact.businessHoursValue2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-8 md:py-12 bg-page-bg">
        <div className="max-w-7xl mx-auto px-4">
          <GoogleMap locale={l} />
        </div>
      </section>

      {/* Spacer */}
      <div className="py-6 bg-page-bg" />
    </>
  );
}
