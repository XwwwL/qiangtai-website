// Check trilingual completeness for all products
import { readFileSync } from "node:fs";

const c = readFileSync("src/data/products.ts", "utf8");

// Extract product slugs
const slugs = [...c.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
console.log("=== Product i18n Check ===\nTotal products:", slugs.length, "\n");

// Check descriptions
let zhMissing = 0, ruMissing = 0, enMissing = 0;
let zhSuspicious = 0, ruSuspicious = 0;

for (const slug of slugs) {
  const re = new RegExp('slug: "' + slug + '"[\\s\\S]*?},?\\s*\\n\\s*[{/]');
  const m = c.match(re);
  if (!m) continue;
  const block = m[0];

  const descZh = (block.match(/descriptionZh: "([^"]*)"/) || [,""])[1];
  const descRu = (block.match(/descriptionRu: "([^"]*)"/) || [,""])[1];
  const descEn = (block.match(/description: "([^"]*)"/) || [,""])[1];

  // Check missing
  if (!descZh) { zhMissing++; console.log("  ❌", slug, "- descriptionZh MISSING"); }
  if (!descEn) { enMissing++; console.log("  ❌", slug, "- description EN MISSING"); }
  if (!descRu) { ruMissing++; console.log("  ❌", slug, "- descriptionRu MISSING"); }

  // Check suspicious: zh containing mostly English
  if (descZh) {
    const zhChars = (descZh.match(/[一-龥]/g) || []).length;
    const enWords = (descZh.match(/[a-zA-Z]{3,}/g) || []).length;
    if (zhChars < 10 && enWords > 20) {
      zhSuspicious++;
      console.log("  ⚠", slug, "- descriptionZh looks English (zh chars:", zhChars, ", en words:", enWords + ")");
    }
  }

  // Check suspicious: ru without Cyrillic
  if (descRu) {
    const cyrillic = (descRu.match(/[Ѐ-ӿ]/g) || []).length;
    if (cyrillic < 5) {
      ruSuspicious++;
      console.log("  ⚠", slug, "- descriptionRu lacks Cyrillic chars:", cyrillic);
    }
  }
}

console.log("\n--- Results ---");
console.log("Description missing:");
console.log("  zh:", zhMissing, "/", slugs.length);
console.log("  en:", enMissing, "/", slugs.length);
console.log("  ru:", ruMissing, "/", slugs.length);
console.log("Suspicious descriptions:");
console.log("  zh:", zhSuspicious);
console.log("  ru:", ruSuspicious);

const pass = zhMissing === 0 && enMissing === 0 && ruMissing === 0 && zhSuspicious === 0 && ruSuspicious === 0;
console.log("\nResult:", pass ? "PASS ✅" : "FAIL ❌");
process.exit(pass ? 0 : 1);
