#!/usr/bin/env node
import sharp from "sharp";
import { statSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readdir } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "public", "images");
const DST = join(__dirname, "..", "picture_compressed");

// Clean and recreate dest
const { rmSync } = await import("node:fs");
try { rmSync(DST, { recursive: true }); } catch {}
mkdirSync(DST, { recursive: true });

function fmt(n) { return n < 1024 ? `${n}B` : n < 1024*1024 ? `${(n/1024).toFixed(0)}KB` : `${(n/(1024*1024)).toFixed(1)}MB`; }

async function walk(dir, rel = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) {
      results.push(...(await walk(full, r)));
    } else if (/\.(jpg|jpeg|png)$/i.test(e.name)) {
      results.push({ path: full, rel: r, size: statSync(full).size });
    }
  }
  return results;
}

async function main() {
  console.log("Scanning images...\n");
  const all = await walk(SRC);

  let totalB = 0, totalA = 0;
  let count = 0;

  for (const { path: src, rel, size: before } of all) {
    const dest = join(DST, rel);
    mkdirSync(dirname(dest), { recursive: true });

    if (before > 500 * 1024) {
      // Compress large images
      await sharp(src)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(dest);
      const after = statSync(dest).size;
      totalB += before; totalA += after; count++;
      console.log(`  ✓ ${rel}: ${fmt(before)} → ${fmt(after)} (${((1-after/before)*100).toFixed(0)}% saved)`);
    } else {
      // Copy small images as-is
      const { copyFileSync } = await import("node:fs");
      copyFileSync(src, dest);
      totalB += before; totalA += before;
    }
  }

  console.log(`\n  Compressed ${count} images`);
  console.log(`  Total: ${fmt(totalB)} → ${fmt(totalA)} (${((1-totalA/totalB)*100).toFixed(0)}% saved)`);
  console.log(`\n  Output: ${DST}`);
  console.log(`  Next: manually copy picture_compressed/ → public/images/`);
}

main().catch(e => { console.error(e); process.exit(1); });
