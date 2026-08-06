import { siteConfig } from "@/config/site";

interface StructuredDataProps {
  type: "Organization" | "WebSite" | "Product" | "ItemList";
  data?: Record<string, unknown>;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.companyName,
  alternateName: siteConfig.companyNameShort,
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}${siteConfig.logo}`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    contactType: "sales",
    email: siteConfig.email,
    availableLanguage: ["English", "Chinese"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 768, Binhai 2nd Road",
    addressLocality: "Wenzhou",
    addressRegion: "Zhejiang",
    postalCode: siteConfig.zipCode,
    addressCountry: "CN",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.companyNameShort,
  url: siteConfig.siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.siteUrl}/products?search={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export function StructuredData({ type, data = {} }: StructuredDataProps) {
  let schema: Record<string, unknown>;

  switch (type) {
    case "Organization":
      schema = { ...organizationSchema, ...data };
      break;
    case "WebSite":
      schema = { ...websiteSchema, ...data };
      break;
    case "Product":
      schema = { "@context": "https://schema.org", "@type": "Product", ...data };
      break;
    case "ItemList":
      schema = { "@context": "https://schema.org", "@type": "ItemList", ...data };
      break;
    default:
      schema = organizationSchema;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
