#!/usr/bin/env node

/**
 * Image Preparation Script
 *
 * Scans the picture/ directory, copies images to public/images/,
 * renames them to clean English kebab-case names, and generates
 * an image mapping JSON file.
 *
 * Usage: node scripts/prepare-images.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PICTURE_DIR = path.join(ROOT, "picture");
const PUBLIC_DIR = path.join(ROOT, "public", "images");
const MAPPING_OUTPUT = path.join(ROOT, "src", "lib", "imageMapping.ts");

// ── Image name mapping rules ──────────────────────────────────
// Maps Chinese directory names → English kebab-case names
const DIR_MAPPING = {
  "商标图片": "logo",
  "工厂图片": "factory",
  "产品图片": "products",
  "快速接头系列": "camlock-couplings",
  "丝扣管件系列": "threaded-fittings",
  "丝扣管子系列": "threaded-pipes",
  "高压管件系列": "high-pressure-fittings",
};

// Maps Chinese product folder names → English kebab-case names
const PRODUCT_MAPPING = {
  "快速接头-A型": "type-a",
  "快速接头-B型": "type-b",
  "快速接头-C型": "type-c",
  "快速接头-D型": "type-d",
  "快速接头-F型": "type-f",
  "管帽": "pipe-cap",
  "堵头": "plug",
  "补芯": "bushing",
  "外丝三通": "male-tee",
  "外丝弯头": "male-elbow",
  "双外丝活接头": "double-male-union",
  "异径三通": "reducing-tee",
  "内丝弯头": "female-elbow",
  "内外丝弯头": "male-female-elbow",
  "六角外丝": "hex-nipple",
  "内丝外接头": "female-coupling",
  "四通": "cross",
  "内丝三通": "female-tee",
  "内丝活接头": "female-union",
  "Y型三通": "y-type-tee",
  "立体三通": "3d-tee",
  "内外丝三通": "male-female-tee",
  "内外丝接头": "male-female-coupling",
  "六角皮管外丝": "hexagon-hose-nipple",
  "抛光加长管外丝": "polished-extended-nipple",
  "抛光管子内丝": "polished-female-pipe-nipple",
  "抛光管子单头外丝": "polished-pipe-nipple-male",
  "管子全螺纹外丝": "full-thread-nipple",
  "锻钢高压内外螺纹弯头": "forged-hp-elbow-male-female",
  "锻钢高压内螺纹三通": "forged-hp-tee",
  "锻钢高压内螺纹弯头": "forged-hp-elbow-female",
  "锻钢高压内螺纹接头": "forged-hp-coupling",
  "锻钢高压内螺纹活接头": "forged-hp-union",
};

// Maps Chinese product names → English product names
const PRODUCT_NAME_MAPPING = {
  "快速接头-A型": "Camlock Coupling Type A",
  "快速接头-B型": "Camlock Coupling Type B",
  "快速接头-C型": "Camlock Coupling Type C",
  "快速接头-D型": "Camlock Coupling Type D",
  "快速接头-F型": "Camlock Coupling Type F",
  "管帽": "Threaded Pipe Cap",
  "堵头": "Threaded Plug",
  "补芯": "Threaded Bushing",
  "外丝三通": "Male Threaded Tee",
  "外丝弯头": "Male Threaded Elbow",
  "双外丝活接头": "Double Male Threaded Union",
  "异径三通": "Reducing Tee",
  "内丝弯头": "Female Threaded Elbow",
  "内外丝弯头": "Male × Female Threaded Elbow",
  "六角外丝": "Hex Male Threaded Nipple",
  "内丝外接头": "Female Threaded Coupling",
  "四通": "Threaded Cross",
  "内丝三通": "Female Threaded Tee",
  "内丝活接头": "Female Threaded Union",
  "Y型三通": "Y-Type Threaded Tee",
  "立体三通": "Three-Dimensional Tee",
  "内外丝三通": "Male × Female Threaded Tee",
  "内外丝接头": "Male × Female Threaded Coupling",
  "六角皮管外丝": "Hexagon Hose Nipple",
  "抛光加长管外丝": "Polished Extended Pipe Nipple",
  "抛光管子内丝": "Polished Pipe Nipple (Female Thread)",
  "抛光管子单头外丝": "Polished Pipe Nipple (Single-End Male)",
  "管子全螺纹外丝": "Full Thread Pipe Nipple",
  "锻钢高压内外螺纹弯头": "Forged High Pressure Elbow (Male × Female Thread)",
  "锻钢高压内螺纹三通": "Forged High Pressure Threaded Tee",
  "锻钢高压内螺纹弯头": "Forged High Pressure Female Threaded Elbow",
  "锻钢高压内螺纹接头": "Forged High Pressure Threaded Coupling",
  "锻钢高压内螺纹活接头": "Forged High Pressure Threaded Union",
};

/** @type {Array<{originalPath: string, newPath: string, category: string, productName: string, productNameZh: string}>} */
const mappings = [];

/**
 * Get English directory name from Chinese directory name
 */
function getEnglishDir(chineseName) {
  return DIR_MAPPING[chineseName] || chineseName.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Get English product slug from Chinese product name
 */
function getProductSlug(chineseName) {
  return PRODUCT_MAPPING[chineseName] || chineseName.toLowerCase().replace(/[^\w一-鿿]+/g, "-");
}

/**
 * Get English product name from Chinese product name
 */
function getProductName(chineseName) {
  return PRODUCT_NAME_MAPPING[chineseName] || chineseName;
}

/**
 * Sanitize filename to kebab-case ASCII
 */
function sanitizeFilename(filename) {
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, ext);
  // Handle ChatGPT-generated names with dates
  let clean = base
    .replace(/ChatGPT\s+Image\s+\d+/gi, "image")
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
    .replace(/[^\w-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return clean + ext;
}

/**
 * Walk through picture directory and process images
 */
function walkDirectory(dir, relativePath = "", categoryContext = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      const englishDir = getEnglishDir(entry.name);
      let newCategoryContext = categoryContext;

      // Detect category from directory structure
      if (relPath.startsWith("产品图片/")) {
        const parts = relPath.split("/");
        if (parts.length === 2) {
          // Top-level product category
          newCategoryContext = getEnglishDir(entry.name);
        }
      }

      walkDirectory(fullPath, relPath, newCategoryContext);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(ext)) {
        processImage(fullPath, relPath, categoryContext);
      }
    }
  }
}

/**
 * Process and copy a single image file
 */
function processImage(fullPath, relPath, category) {
  const pathParts = relPath.split("/");
  const sanitizedFilename = sanitizeFilename(pathParts[pathParts.length - 1]);

  let targetDir;
  let productNameZh = "";
  let productNameEn = "";

  if (relPath.startsWith("商标图片/")) {
    targetDir = path.join(PUBLIC_DIR, "logo");
    productNameEn = "Company Logo";
    productNameZh = "公司商标";
    // Always name the logo "logo" with original extension
    const ext = path.extname(sanitizedFilename);
    const logoPath = path.join(targetDir, `logo${ext}`);
    ensureDir(targetDir);
    fs.copyFileSync(fullPath, logoPath);
    mappings.push({
      originalPath: relPath,
      newPath: `/images/logo/logo${ext}`,
      category: "logo",
      productName: "Company Logo",
      productNameZh: "公司商标",
    });
    return;
  }

  if (relPath.startsWith("工厂图片/")) {
    targetDir = path.join(PUBLIC_DIR, "factory");
    ensureDir(targetDir);
    const destPath = path.join(targetDir, sanitizedFilename);
    fs.copyFileSync(fullPath, destPath);
    mappings.push({
      originalPath: relPath,
      newPath: `/images/factory/${sanitizedFilename}`,
      category: "factory",
      productName: `Factory Image - ${path.basename(sanitizedFilename, path.extname(sanitizedFilename))}`,
      productNameZh: `工厂图片`,
    });
    return;
  }

  // Product images
  if (relPath.startsWith("产品图片/")) {
    const parts = relPath.split("/");
    // parts[0] = 产品图片
    // parts[1] = category (e.g. 快速接头系列)
    // parts[2] = product name (e.g. 快速接头-A型 or empty for category image)
    // parts[3] = filename

    const categorySlug = getEnglishDir(parts[1]);
    let productSlug = "";
    if (parts.length >= 3 && parts[2]) {
      productSlug = getProductSlug(parts[2]);
      productNameZh = parts[2];
      productNameEn = getProductName(parts[2]);
    }

    // Determine target directory
    if (productSlug && parts.length >= 4) {
      // Image inside a product subdirectory
      targetDir = path.join(PUBLIC_DIR, "products", categorySlug);
    } else if (parts.length === 3 && !fs.statSync(fullPath).isDirectory()) {
      // Direct image inside product folder
      targetDir = path.join(PUBLIC_DIR, "products", categorySlug);
    } else {
      targetDir = path.join(PUBLIC_DIR, "products", categorySlug);
    }

    ensureDir(targetDir);

    // Generate unique filename
    let destFilename;
    if (productSlug) {
      // Check if there are multiple images for the same product
      const existingForProduct = mappings.filter(
        (m) => m.category === categorySlug && m.productName === productNameEn
      );
      if (existingForProduct.length > 0) {
        destFilename = `${productSlug}-${existingForProduct.length + 1}${path.extname(sanitizedFilename)}`;
      } else {
        destFilename = `${productSlug}${path.extname(sanitizedFilename)}`;
      }
    } else {
      destFilename = sanitizedFilename;
    }

    const destPath = path.join(targetDir, destFilename);

    // Skip if already copied (idempotent)
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(fullPath, destPath);
      console.log(`  ✓ Copied: ${relPath} → public/images/products/${categorySlug}/${destFilename}`);
    } else {
      console.log(`  ○ Skipped (exists): public/images/products/${categorySlug}/${destFilename}`);
    }

    mappings.push({
      originalPath: relPath,
      newPath: `/images/products/${categorySlug}/${destFilename}`,
      category: categorySlug,
      productName: productNameEn,
      productNameZh: productNameZh,
    });
  }
}

/**
 * Ensure a directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Generate the TypeScript mapping file
 */
function generateMappingFile() {
  const lines = [
    "// Auto-generated by scripts/prepare-images.mjs",
    "// Do not edit manually",
    `// Generated: ${new Date().toISOString()}`,
    "",
    "export interface ImageMapEntry {",
    "  originalPath: string;",
    "  newPath: string;",
    "  category: string;",
    "  productName: string;",
    "  productNameZh: string;",
    "}",
    "",
    "export const imageMappings: ImageMapEntry[] = [",
  ];

  for (const m of mappings) {
    lines.push("  {");
    lines.push(`    originalPath: ${JSON.stringify(m.originalPath)},`);
    lines.push(`    newPath: ${JSON.stringify(m.newPath)},`);
    lines.push(`    category: ${JSON.stringify(m.category)},`);
    lines.push(`    productName: ${JSON.stringify(m.productName)},`);
    lines.push(`    productNameZh: ${JSON.stringify(m.productNameZh)},`);
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");

  const content = lines.join("\n");
  fs.writeFileSync(MAPPING_OUTPUT, content, "utf-8");
  console.log(`\n✓ Generated mapping file: src/lib/imageMapping.ts`);
}

/**
 * Main
 */
function main() {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║       Image Preparation Script — CHANTI Valve           ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  // Clear previous public/images (except keep directory structure)
  if (fs.existsSync(PUBLIC_DIR)) {
    console.log("Cleaning public/images/...");
    fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });
  }

  console.log("Scanning picture/ directory...\n");
  walkDirectory(PICTURE_DIR);

  console.log(`\n✓ Total images processed: ${mappings.length}`);
  console.log(`  - Logo: ${mappings.filter((m) => m.category === "logo").length}`);
  console.log(`  - Factory: ${mappings.filter((m) => m.category === "factory").length}`);
  console.log(
    `  - Product images: ${mappings.filter((m) => !["logo", "factory"].includes(m.category)).length}`
  );

  // Generate mapping file
  generateMappingFile();

  console.log("\n✓ Image preparation complete!\n");
}

main();
