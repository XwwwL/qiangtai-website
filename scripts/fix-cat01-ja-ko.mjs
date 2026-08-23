import { readFileSync, writeFileSync } from "node:fs";

let c = readFileSync("src/data/categories.ts", "utf8");

const dJa = "ANSI・DIN・BS・JISなどの国際規格に準拠したねじ込み管継手です。エルボ、ティー、クロス、カップリング、ユニオン、キャップ、プラグ、ブッシングなどを取り揃えています。";
const dKo = "ANSI, DIN, BS, JIS 등 국제 표준에 따라 제조된 나사식 배관 피팅입니다. 엘보, 티, 크로스, 커플링, 유니온, 캡, 플러그, 부싱 등을 갖추고 있습니다.";
const fJa = JSON.stringify(["精密なNPT/BSPT/BSPPねじ加工","1/8〜4インチサイズ対応","ステンレス鋼304/316/316L","亜鉛めっき炭素鋼対応","ANSI/DIN/BS/JIS規格準拠","150#〜3000#圧力等級"]);
const fKo = JSON.stringify(["정밀 NPT/BSPT/BSPP 나사 가공","1/8~4인치 크기","스테인리스강 304/316/316L","아연도금 탄소강","ANSI/DIN/BS/JIS 규격","150#~3000# 압력 등급"]);
const mJa = JSON.stringify(["ステンレス鋼304","ステンレス鋼316","ステンレス鋼316L","炭素鋼","亜鉛めっき鋼"]);
const mKo = JSON.stringify(["스테인리스강 304","스테인리스강 316","스테인리스강 316L","탄소강","아연도금강"]);
const ctJa = JSON.stringify(["NPTねじ","BSPTねじ","BSPPねじ","ソケット溶接"]);
const ctKo = JSON.stringify(["NPT 나사","BSPT 나사","BSPP 나사","소켓 용접"]);
const aJa = JSON.stringify(["水処理","石油・ガス","化学処理","配管システム","消防","空調"]);
const aKo = JSON.stringify(["수처리","석유·가스","화학 처리","배관 시스템","소방","공조"]);

// Only process cat-01 (before cat-02)
const splitIdx = c.indexOf('id: "cat-02"');
let head = c.slice(0, splitIdx);
const tail = c.slice(splitIdx);

// Add descriptionJa/Ko after descriptionRu
head = head.replace(
  /(descriptionRu:\s*"Наши резьбовые фитинги[^"]*")/,
  `$1, descriptionJa: "${dJa}", descriptionKo: "${dKo}"`
);

// Add featuresJa/Ko after featuresRu
head = head.replace(
  /(featuresRu:\s*\[[^\]]*\])/,
  `$1, featuresJa: ${fJa}, featuresKo: ${fKo}`
);

// Add materialsJa/Ko after materialsRu
head = head.replace(
  /(materialsRu:\s*\[[^\]]*\])/,
  `$1, materialsJa: ${mJa}, materialsKo: ${mKo}`
);

// Add connectionTypesJa/Ko after connectionTypesRu
head = head.replace(
  /(connectionTypesRu:\s*\[[^\]]*\])/,
  `$1, connectionTypesJa: ${ctJa}, connectionTypesKo: ${ctKo}`
);

// Add applicationsJa/Ko after applicationsRu
head = head.replace(
  /(applicationsRu:\s*\[[^\]]*\])/,
  `$1, applicationsJa: ${aJa}, applicationsKo: ${aKo}`
);

// Add seoTitleJa/Ko after seoTitleRu
head = head.replace(
  /(seoTitleRu:\s*"[^"]*")/,
  `$1, seoTitleJa: "ねじ込み管継手メーカー | CHANTI", seoTitleKo: "나사식 배관 피팅 제조업체 | CHANTI"`
);

// Add seoDescriptionJa/Ko after seoDescriptionRu
head = head.replace(
  /(seoDescriptionRu:\s*"[^"]*")/,
  `$1, seoDescriptionJa: "中国温州のねじ込み管継手メーカー。OEM/ODM対応。", seoDescriptionKo: "중국 원저우의 나사식 배관 피팅 제조업체. OEM/ODM 지원."`
);

c = head + tail;
writeFileSync("src/data/categories.ts", c);
console.log("✅ cat-01 ja/ko added");
