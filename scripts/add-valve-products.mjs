// Add 6 new valve categories and ~41 products with images
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PIC = join(ROOT, "picture", "产品图片");
const PUB = join(ROOT, "public", "images", "products");

// Category mapping (Chinese dir → slug)
const CAT = {
  "丝扣阀门和球阀系列": "threaded-valves-ball-valves",
  "气动球阀": "pneumatic-ball-valves",
  "法兰三通和四通球阀系列": "flanged-multi-way-ball-valves",
  "电动球阀": "electric-ball-valves",
  "硬密封和软密封球阀系列": "hard-soft-seal-ball-valves",
  "锻钢球阀系列": "forged-steel-ball-valves",
};

// Product mapping: Chinese folder → { slug, en, zh }
const PROD = {
  "Y型过滤器": { slug: "y-strainer", en: "Y-Type Strainer" },
  "一片式内螺纹球阀": { slug: "one-piece-threaded-ball-valve", en: "One-Piece Threaded Ball Valve" },
  "三片式内螺纹球阀": { slug: "three-piece-threaded-ball-valve", en: "Three-Piece Threaded Ball Valve" },
  "三片式带哨口焊接球阀": { slug: "three-piece-weld-ball-valve-bleed", en: "Three-Piece Weld Ball Valve with Bleed" },
  "三片式快装球阀": { slug: "three-piece-clamp-ball-valve", en: "Three-Piece Clamp Ball Valve" },
  "三片式焊接球阀": { slug: "three-piece-weld-ball-valve", en: "Three-Piece Weld Ball Valve" },
  "二片式内螺纹球阀": { slug: "two-piece-threaded-ball-valve", en: "Two-Piece Threaded Ball Valve" },
  "内螺纹三通球阀": { slug: "threaded-three-way-ball-valve", en: "Threaded Three-Way Ball Valve" },
  "内螺纹止回阀": { slug: "threaded-check-valve", en: "Threaded Check Valve" },
  "内螺纹闸阀": { slug: "threaded-gate-valve", en: "Threaded Gate Valve" },
  "立式止回阀": { slug: "vertical-check-valve", en: "Vertical Check Valve" },
  "美标内螺纹截止阀": { slug: "ansi-threaded-globe-valve", en: "ANSI Threaded Globe Valve" },

  "气动三片式法兰球阀": { slug: "pneumatic-three-piece-flanged-ball-valve", en: "Pneumatic Three-Piece Flanged Ball Valve" },
  "气动三片式球阀": { slug: "pneumatic-three-piece-ball-valve", en: "Pneumatic Three-Piece Ball Valve" },
  "气动三通法兰球阀": { slug: "pneumatic-three-way-flanged-ball-valve", en: "Pneumatic Three-Way Flanged Ball Valve" },

  "Q44F-16P三通法兰球阀": { slug: "q44f-three-way-flanged-ball-valve", en: "Q44F-16P Three-Way Flanged Ball Valve" },
  "Q45F-16P三通法兰球阀": { slug: "q45f-three-way-flanged-ball-valve", en: "Q45F-16P Three-Way Flanged Ball Valve" },
  "Q46F-16P四密封四通球阀": { slug: "q46f-four-way-ball-valve", en: "Q46F-16P Four-Way Ball Valve" },
  "美标三通法兰球阀": { slug: "ansi-three-way-flanged-ball-valve", en: "ANSI Three-Way Flanged Ball Valve" },
  "美标高平台硬密封三通球阀": { slug: "ansi-high-platform-hard-seal-three-way", en: "ANSI High-Platform Hard-Seal Three-Way Ball Valve" },
  "衬氟T型三通球阀": { slug: "fluorine-lined-t-type-three-way", en: "Fluorine-Lined T-Type Three-Way Ball Valve" },

  "电动三通法兰球阀": { slug: "electric-three-way-flanged-ball-valve", en: "Electric Three-Way Flanged Ball Valve" },
  "电动智能法兰球阀": { slug: "electric-intelligent-flanged-ball-valve", en: "Electric Intelligent Flanged Ball Valve" },
  "部分回转动法兰球阀": { slug: "part-turn-electric-flanged-ball-valve", en: "Part-Turn Electric Flanged Ball Valve" },
  "防爆电动智能法兰球阀": { slug: "explosion-proof-electric-intelligent-flanged", en: "Explosion-Proof Electric Intelligent Flanged Ball Valve" },
  "防爆电动法兰球阀": { slug: "explosion-proof-electric-flanged", en: "Explosion-Proof Electric Flanged Ball Valve" },

  "国标硬密封法兰球阀": { slug: "gb-hard-seal-flanged-ball-valve", en: "GB Hard-Seal Flanged Ball Valve" },
  "国标软密封法兰球阀": { slug: "gb-soft-seal-flanged-ball-valve", en: "GB Soft-Seal Flanged Ball Valve" },
  "德标软密封法兰球阀": { slug: "din-soft-seal-flanged-ball-valve", en: "DIN Soft-Seal Flanged Ball Valve" },
  "美标硬密封法兰球阀": { slug: "ansi-hard-seal-flanged-ball-valve", en: "ANSI Hard-Seal Flanged Ball Valve" },
  "美标软密封法兰球阀": { slug: "ansi-soft-seal-flanged-ball-valve", en: "ANSI Soft-Seal Flanged Ball Valve" },

  "意式薄型法兰球阀": { slug: "italian-wafer-flanged-ball-valve", en: "Italian-Style Wafer Flanged Ball Valve" },
  "锻钢三片式内螺纹球阀": { slug: "forged-three-piece-threaded-ball-valve", en: "Forged Three-Piece Threaded Ball Valve" },
  "锻钢三片式加长焊接球阀": { slug: "forged-three-piece-extended-weld", en: "Forged Three-Piece Extended Weld Ball Valve" },
  "锻钢三片式圆体焊接球阀": { slug: "forged-three-piece-round-weld", en: "Forged Three-Piece Round-Body Weld Ball Valve" },
  "锻钢三片式承插球阀": { slug: "forged-three-piece-socket-weld", en: "Forged Three-Piece Socket Weld Ball Valve" },
  "锻钢三片式方体焊接球阀": { slug: "forged-three-piece-square-weld", en: "Forged Three-Piece Square-Body Weld Ball Valve" },
  "锻钢三片式法兰球阀": { slug: "forged-three-piece-flanged-ball-valve", en: "Forged Three-Piece Flanged Ball Valve" },
  "锻钢二片式内螺纹球阀": { slug: "forged-two-piece-threaded-ball-valve", en: "Forged Two-Piece Threaded Ball Valve" },
  "锻钢二片式法兰球阀": { slug: "forged-two-piece-flanged-ball-valve", en: "Forged Two-Piece Flanged Ball Valve" },
  "锻钢意式薄型球阀": { slug: "forged-italian-wafer-ball-valve", en: "Forged Italian-Style Wafer Ball Valve" },
};

// Russian name generation (basic industrial Russian)
function ruName(en) {
  if (en.includes("Strainer")) return "Сетчатый фильтр";
  if (en.includes("Check Valve")) return "Обратный клапан";
  if (en.includes("Gate Valve")) return "Задвижка";
  if (en.includes("Globe Valve")) return "Запорный клапан";
  if (en.includes("Three-Way") || en.includes("Four-Way") || en.includes("T-Type")) return "Шаровой кран многоходовой";
  if (en.includes("Ball Valve")) return "Шаровой кран";
  return "Промышленный клапан";
}

// Category-level zh/ru descriptions
const catDescs = {
  "threaded-valves-ball-valves": {
    zh: "螺纹阀门和球阀系列，涵盖一片式、二片式、三片式球阀、闸阀、截止阀、止回阀及Y型过滤器等多种类型，适用于水处理、化工、石油等行业管道系统。",
    ru: "Резьбовые клапаны и шаровые краны: одно-, двух- и трёхсоставные шаровые краны, задвижки, запорные и обратные клапаны, сетчатые фильтры. Для водоснабжения, химической и нефтяной промышленности.",
  },
  "pneumatic-ball-valves": {
    zh: "气动球阀系列，配备气动执行器，实现快速自动开关控制。包括三片式、法兰式和三通式等多种结构，适用于自动化生产线和过程控制。",
    ru: "Шаровые краны с пневмоприводом для быстрого автоматического управления. Трёхсоставные, фланцевые и трёхходовые исполнения для автоматизированных линий и управления процессами.",
  },
  "flanged-multi-way-ball-valves": {
    zh: "法兰三通和四通球阀系列，用于流体换向、混合和分配。包括Q44F、Q45F、Q46F等三通/四通球阀及美标、衬氟等特殊结构，适用于罐区、换热器和多管路系统。",
    ru: "Фланцевые трёх- и четырёхходовые шаровые краны для переключения, смешивания и распределения потоков. Исполнения Q44F, Q45F, Q46F, а также ANSI и фторопластовые варианты.",
  },
  "electric-ball-valves": {
    zh: "电动球阀系列，配备电动执行器，实现远程和自动化控制。包括三通法兰、智能法兰、防爆型等结构，适用于过程自动化、水处理和化工加药等场景。",
    ru: "Шаровые краны с электроприводом для дистанционного и автоматизированного управления. Трёхходовые, интеллектуальные и взрывозащищённые исполнения для автоматизации процессов.",
  },
  "hard-soft-seal-ball-valves": {
    zh: "硬密封和软密封球阀系列，提供金属对金属硬密封和PTFE软密封两种方案。硬密封适用于高温和磨蚀性介质，软密封适用于一般流体的严密关闭。",
    ru: "Шаровые краны с металлическим и мягким уплотнением. Металлическое уплотнение для высоких температур и абразивных сред, мягкое — для герметичного перекрытия обычных жидкостей.",
  },
  "forged-steel-ball-valves": {
    zh: "锻钢球阀系列，采用锻造阀体，强度高、结构紧凑。包括二片式、三片式、法兰式、焊接式和意式薄型等多种结构，适用于高压和高温工况。",
    ru: "Шаровые краны из кованой стали с высокой прочностью и компактной конструкцией. Двух- и трёхсоставные, фланцевые, приварные и пластинчатые исполнения для высокого давления и температуры.",
  },
};

// Read existing products.ts and categories.ts
let products = readFileSync(join(ROOT, "src", "data", "products.ts"), "utf8");
let categories = readFileSync(join(ROOT, "src", "data", "categories.ts"), "utf8");

// Copy images and build product entries
const newProductEntries = [];
let productCounter = 100; // start after existing IDs

for (const [catZh, catSlug] of Object.entries(CAT)) {
  const catDir = join(PIC, catZh);
  if (!existsSync(catDir)) continue;

  const productDirs = readdirSync(catDir).filter(d => statSync(join(catDir, d)).isDirectory());

  for (const prodZh of productDirs) {
    const p = PROD[prodZh];
    if (!p) { console.log(`⚠ No mapping for: ${prodZh}`); continue; }

    const prodDir = join(catDir, prodZh);
    const images = readdirSync(prodDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

    if (images.length === 0) continue;

    const targetDir = join(PUB, catSlug);
    if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

    // Copy images with slug-based names
    const gallery = [];
    images.forEach((img, i) => {
      const ext = img.toLowerCase().endsWith('.png') ? '.jpg' : (img.toLowerCase().endsWith('.jpeg') ? '.jpg' : '.jpg');
      const base = i === 0 ? p.slug : `${p.slug}-${i + 1}`;
      const destName = base + ext;
      copyFileSync(join(prodDir, img), join(targetDir, destName));
      gallery.push(`/images/products/${catSlug}/${destName}`);
    });

    const desc = catDescs[catSlug] || { zh: "", ru: "" };
    const image = gallery[0];

    // Build product object
    productCounter++;
    const id = `prod-${String(productCounter).padStart(4, '0')}`;
    const entry = `  {
    id: "${id}",
    slug: "${p.slug}",
    categorySlug: "${catSlug}",
    name: "${p.en}",
    nameZh: "${prodZh}",
    nameRu: "${ruName(p.en)}",
    image: "${image}",
    gallery: ${JSON.stringify(gallery)},
    shortDescription: "${p.en} for industrial fluid control applications.",
    shortDescriptionZh: "${prodZh}，适用于工业流体控制应用。",
    shortDescriptionRu: "${p.en} для управления потоками в промышленности.",
    description: "${p.en} for industrial piping and fluid control. Manufactured to international standards with quality materials and precision machining.",
    descriptionZh: "${prodZh}，用于工业管道和流体控制。按照国际标准制造，采用优质材料和精密加工。${desc.zh}",
    descriptionRu: "${p.en} для промышленных трубопроводов и управления потоками. Изготавливается по международным стандартам из качественных материалов.${desc.ru}",
    features: ["Precision machined body", "Reliable sealing performance", "Corrosion-resistant materials", "International standard compliance", "Custom configuration available"],
    featuresZh: ["精密加工阀体", "可靠密封性能", "耐腐蚀材质", "符合国际标准", "支持定制"],
    featuresRu: ["Точная обработка корпуса", "Надёжное уплотнение", "Коррозионностойкие материалы", "Соответствие стандартам", "Индивидуальное исполнение"],
    materials: ["Stainless Steel 304", "Stainless Steel 316", "Carbon Steel"],
    materialsZh: ["304 不锈钢", "316 不锈钢", "碳钢"],
    materialsRu: ["Нерж. сталь 304", "Нерж. сталь 316", "Углеродистая сталь"],
    sizes: ["DN15", "DN20", "DN25", "DN32", "DN40", "DN50"],
    connectionType: "Flanged / Threaded / Weld",
    applications: ["Water Treatment", "Chemical Processing", "Oil & Gas", "Industrial Piping"],
    applicationsZh: ["水处理", "化工设备", "石油天然气", "工业管道"],
    applicationsRu: ["Водоподготовка", "Химическая промышленность", "Нефть и газ", "Промышленные трубопроводы"],
    packaging: "Standard export carton packaging with protective wrapping.",
    packagingZh: "标准出口纸箱包装，带防护包装。",
    packagingRu: "Стандартная экспортная упаковка с защитной обёрткой.",
    customizable: true,
    seoTitle: "${p.en} Manufacturer | CHANTI",
    seoTitleZh: "${prodZh}生产厂家 | 浙江强泰",
    seoTitleRu: "${p.en} | Zhejiang Qiangtai",
    seoDescription: "Professional manufacturer of ${p.en.toLowerCase()}. Factory direct from Wenzhou, China. OEM/ODM available.",
    seoDescriptionZh: "专业生产${prodZh}。中国温州工厂直供，支持OEM/ODM。",
    seoDescriptionRu: "Профессиональный производитель ${p.en}. Прямые поставки из Вэньчжоу, Китай. OEM/ODM.",
  },`;

    newProductEntries.push(entry);
  }
}

// Append new products before the closing "];" of the products array
const arrayCloseIdx = products.indexOf("\n];");
if (arrayCloseIdx !== -1) {
  const insertion = "\n\n" + newProductEntries.join("\n") + "\n";
  products = products.slice(0, arrayCloseIdx) + insertion + products.slice(arrayCloseIdx);
}

writeFileSync(join(ROOT, "src", "data", "products.ts"), products);

// Update categories: set hasRealImages: true and productCount
for (const [catZh, catSlug] of Object.entries(CAT)) {
  const count = newProductEntries.filter(e => e.includes(`categorySlug: "${catSlug}"`)).length;
  // Replace placeholder category entry
  const regex = new RegExp(`(slug: "${catSlug}"[\\s\\S]*?hasRealImages: )false`, 'g');
  categories = categories.replace(regex, `$1true`);
  const regex2 = new RegExp(`(slug: "${catSlug}"[\\s\\S]*?productCount: )0`, 'g');
  categories = categories.replace(regex2, `$1${count}`);
}

writeFileSync(join(ROOT, "src", "data", "categories.ts"), categories);

console.log(`✅ Added ${newProductEntries.length} new products across ${Object.keys(CAT).length} categories`);
console.log('Done');
