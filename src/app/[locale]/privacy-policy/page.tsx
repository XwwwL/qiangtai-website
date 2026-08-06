import { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/config/site";

interface Props { params: { locale: string } }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params; if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  const baseUrl = locale === "en" ? `${siteConfig.siteUrl}/privacy-policy` : `${siteConfig.siteUrl}/zh/privacy-policy`;
  return { title: dict.seo.privacyTitle, description: dict.seo.privacyDescription, alternates: { canonical: baseUrl } };
}

export default function PrivacyPolicyPage({ params }: Props) {
  const { locale } = params; if (!isValidLocale(locale)) return null;
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <section className="bg-gradient-to-r from-navy-900 via-industrial-600 to-navy-900 py-16"><div className="max-w-7xl mx-auto px-4"><h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4">{dict.footer.privacyPolicy}</h1></div></section>
      <section className="py-12 md:py-16 bg-white"><div className="max-w-3xl mx-auto px-4 prose prose-sm max-w-none text-text-muted">
        <p className="text-sm text-text-muted mb-4">Last updated: August 2026</p>
        <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">1. Introduction</h2><p className="mb-4">{siteConfig.companyName} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data.</p>
        <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">2. Information We Collect</h2><p className="mb-2">We may collect: contact information (name, email, phone, company), country, product inquiry details, technical documents, website usage data via cookies.</p>
        <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">3. How We Use Your Information</h2><p className="mb-2">Responding to inquiries, providing quotations, processing orders, improving our website, complying with legal obligations.</p>
        <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">4. Data Protection</h2><p className="mb-4">We implement appropriate technical and organizational measures to protect your personal data.</p>
        <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">5. Contact Us</h2><p className="mb-4">If you have questions about this Privacy Policy, please contact us at {siteConfig.email}.</p>
      </div></section>
    </>
  );
}
