# CHANTI Valve — B2B Pipe Fittings & Industrial Valve Website

Professional B2B foreign trade website for **ZHEJIANG CHANTI PIPE-FITTING VALVE CO., LTD.** (浙江强泰管件阀门有限公司), a manufacturer of pipe fittings, threaded fittings, high pressure fittings, camlock couplings, and industrial valves based in Wenzhou, Zhejiang, China.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend Framework | Next.js 14 |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Routing | Next.js App Router |
| Icons | Lucide React |
| Package Manager | npm |
| Deployment | Vercel |

## Directory Structure

```
Web2/
├── public/
│   └── images/
│       ├── logo/          # Company logo
│       ├── factory/       # Factory images
│       └── products/      # Product images by category
│           ├── camlock-couplings/
│           ├── threaded-fittings/
│           ├── threaded-pipes/
│           └── high-pressure-fittings/
├── scripts/
│   └── prepare-images.mjs # Image preparation script
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/quote/     # Quote form API route
│   │   ├── products/      # Product pages
│   │   ├── about/
│   │   ├── manufacturing/
│   │   ├── quality-control/
│   │   ├── applications/
│   │   ├── contact/
│   │   ├── request-a-quote/
│   │   └── privacy-policy/
│   ├── components/
│   │   ├── layout/        # Header, Footer, MegaMenu, MobileMenu, TopBar
│   │   ├── home/          # (in page.tsx directly)
│   │   ├── products/      # ProductCard, CategoryCard, EmptyCategoryState
│   │   ├── forms/         # QuoteForm
│   │   ├── seo/           # Breadcrumbs, StructuredData
│   │   └── ui/            # SectionHeading, PlaceholderImage, FloatingWhatsApp, BackToTop
│   ├── config/
│   │   └── site.ts        # Company info, contact, SEO defaults
│   ├── data/
│   │   ├── categories.ts  # 10 product categories
│   │   └── products.ts    # 33 products with images
│   ├── lib/
│   │   ├── imageMapping.ts # Auto-generated image mapping
│   │   └── utils.ts        # Utility functions
│   └── types/
│       └── index.ts        # TypeScript type definitions
├── picture/                # Original images (DO NOT DELETE)
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── .eslintrc.json
├── .env.example
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18.17.0 (recommended: >= 20.9.0)

### Installation

```bash
npm install
npm run prepare-images
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Image Management

### Prepare Images

The script copies images from `picture/` to `public/images/` with clean English kebab-case filenames:

```bash
npm run prepare-images
```

This script:
- Scans `picture/` directory recursively
- Copies images to `public/images/` organized by category
- Renames files to clean English kebab-case names
- Generates `src/lib/imageMapping.ts` with the mapping
- Is idempotent — can be re-run safely without breaking anything

### Image Mapping

The mapping from Chinese folder/file names to English names is defined in `scripts/prepare-images.mjs`. See `src/lib/imageMapping.ts` for the generated output.

## How to Modify

### Change Company Information

Edit `src/config/site.ts`:

```typescript
export const siteConfig: SiteConfig = {
  companyName: "ZHEJIANG CHANTI PIPE-FITTING VALVE CO., LTD.",
  companyNameZh: "浙江强泰管件阀门有限公司",
  email: "sales@example.com",        // ← CHANGE THIS
  whatsapp: "+86-18057756988",       // ← CHANGE THIS
  address: "No. 768, Binhai 2nd Road...", // ← VERIFY
  // ...
};
```

### Add a New Product Category

1. Add entry to `src/data/categories.ts`
2. Add products to `src/data/products.ts`
3. Add images to `picture/` and run `npm run prepare-images`

### Add a New Product

Add entry to `src/data/products.ts`:

```typescript
{
  id: "prod-XXXX",
  slug: "product-name",
  categorySlug: "existing-category-slug",
  name: "Product Name",
  nameZh: "中文名称",
  image: "/images/products/category/product.jpg",
  // ... see types/index.ts for all fields
}
```

### Replace the Logo

Replace `public/images/logo/logo.png` with your own logo file.

### Configure WhatsApp

Edit `src/config/site.ts` — the `whatsapp` and `whatsappDisplay` fields.

### Configure SMTP Email

1. Copy `.env.example` to `.env.local`
2. Fill in SMTP credentials:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
CONTACT_EMAIL=sales@example.com
```

3. Uncomment the Nodemailer code block in `src/app/api/quote/route.ts`

**Without SMTP configured**, quotes are logged to the server console and the form returns a success response to the user. The website will NOT crash.

### Add a New Language

1. Add the language code to `TopBar.tsx` language list
2. Create translated content in a data structure (e.g., `src/data/translations/`)
3. Implement locale routing in Next.js or use a translation library

Current languages: English (default), Chinese (中文). Reserved: ES, PT, RU, AR.

## Deploy to Vercel

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set the framework to **Next.js**
4. Add environment variables from `.env.example`
5. Deploy

Or use the Vercel CLI:

```bash
npx vercel
```

## Current Status

### What's Complete

- ✅ 14 pages (Home, Products, 10 Categories, Product details, About, Manufacturing, QC, Applications, Contact, Quote, Privacy, 404)
- ✅ 42 product images copied and mapped
- ✅ 33 products with data across 4 categories
- ✅ 10 product categories (4 with real images, 6 with placeholder)
- ✅ Mega menu with all categories
- ✅ Mobile responsive menu
- ✅ Quote form with validation
- ✅ API route for quote submission
- ✅ SEO (metadata, sitemap.xml, robots.txt, JSON-LD, breadcrumbs)
- ✅ EN/中文 language switcher (UI ready, content needs translation)
- ✅ Floating WhatsApp button
- ✅ Back to top button
- ✅ npm run lint passes
- ✅ npm run build passes

### What Still Needs Human Input

| Item | Location | Action |
|------|----------|--------|
| **Company Email** | `src/config/site.ts` | Replace `sales@example.com` with real email |
| **WhatsApp Number** | `src/config/site.ts` | Verify `+86-18057756988` |
| **Company Address** | `src/config/site.ts` | Verify the address is correct |
| **6 Categories Without Images** | `picture/产品图片/` | Add product images for threaded valves, forged steel valves, flanged valves, hard/soft seal valves, electric valves, pneumatic valves |
| **Product Catalog PDF** | N/A | Create and upload to `public/files/` |
| **SMTP Configuration** | `.env.local` | Set up email sending for quote form |
| **Chinese Translation** | All pages | Translate page content to Chinese |
| **Product Data Accuracy** | `src/data/products.ts` | Verify product names, specs, features match actual products |
| **Google Maps API Key** | Contact page | Add Google Maps embed |

## Image File Name Mapping

See `src/lib/imageMapping.ts` for the complete mapping of original Chinese file paths to English kebab-case filenames.

Key mappings:
- `商标.png` → `logo.png`
- `工厂图片/*` → `factory/*`
- `丝扣管件系列/*` → `threaded-fittings/*`
- `丝扣管子系列/*` → `threaded-pipes/*`
- `高压管件系列/*` → `high-pressure-fittings/*`
- `快速接头系列/*` → `camlock-couplings/*`

## License

Private — All rights reserved by ZHEJIANG CHANTI PIPE-FITTING VALVE CO., LTD.
