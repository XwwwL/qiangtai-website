// Upgrade products.ts with full trilingual fields
import { readFileSync, writeFileSync } from "node:fs";

let c = readFileSync("src/data/products.ts", "utf8");

// 1. Add nameRu after nameZh (Russian product names)
const ruNames = [
  ["camlock-type-a", "Соединение Camlock тип A"], ["camlock-type-b", "Соединение Camlock тип B"],
  ["camlock-type-c", "Соединение Camlock тип C"], ["camlock-type-d", "Соединение Camlock тип D"],
  ["camlock-type-f", "Соединение Camlock тип F"], ["pipe-cap", "Резьбовая заглушка"],
  ["threaded-plug", "Резьбовая пробка"], ["threaded-bushing", "Резьбовая переходная втулка"],
  ["male-threaded-tee", "Тройник с наружной резьбой"], ["male-threaded-elbow", "Отвод с наружной резьбой"],
  ["double-male-union", "Разъёмное соединение с наружной резьбой"], ["reducing-tee", "Переходной тройник"],
  ["female-threaded-elbow", "Отвод с внутренней резьбой"], ["male-female-elbow", "Отвод комбинированный"],
  ["hex-male-threaded-nipple", "Шестигранный ниппель"], ["female-coupling", "Муфта с внутренней резьбой"],
  ["threaded-cross", "Крестовина резьбовая"], ["female-threaded-tee", "Тройник с внутренней резьбой"],
  ["female-threaded-union", "Разъёмное соединение с внутренней резьбой"],
  ["y-type-tee", "Y-образный тройник"], ["three-dimensional-tee", "Пространственный тройник"],
  ["male-female-threaded-tee", "Тройник комбинированный"],
  ["male-female-threaded-coupling", "Муфта комбинированная"],
  ["polished-pipe-nipple-male", "Полированный ниппель с наружной резьбой"],
  ["polished-female-pipe-nipple", "Полированный ниппель с внутренней резьбой"],
  ["full-thread-pipe-nipple", "Ниппель с полной резьбой"],
  ["hexagon-hose-nipple", "Шестигранный штуцер для шланга"],
  ["polished-extended-nipple", "Полированный удлинённый ниппель"],
  ["forged-hp-threaded-coupling", "Кованая муфта высокого давления"],
  ["forged-hp-threaded-union", "Кованое разъёмное соединение высокого давления"],
  ["forged-hp-elbow-male-female", "Кованый отвод высокого давления"],
  ["forged-hp-threaded-tee", "Кованый тройник высокого давления"],
  ["forged-hp-elbow-female", "Кованый отвод высокого давления"],
];
for (const [slug, ru] of ruNames) {
  const re = new RegExp('(slug: "' + slug + '"[\\s\\S]*?nameZh: "[^"]*")', "g");
  c = c.replace(re, '$1, nameRu: "' + ru + '"');
}

// 2. Add shortDescriptionZh/Ru
c = c.replace(/shortDescription:\s*"([^"]*)"/g, 'shortDescription: "$1", shortDescriptionZh: "", shortDescriptionRu: ""');

// 3. Add descriptionZh/Ru
c = c.replace(/description:\s*"([^"]*)"/g, 'description: "$1", descriptionZh: "", descriptionRu: ""');

// 4. Add packagingZh/Ru
c = c.replace(/packaging:\s*"([^"]*)"/g,
  'packaging: "$1", packagingZh: "标准出口纸箱包装，内附独立塑料袋。可定制包装。", packagingRu: "Стандартная экспортная упаковка с индивидуальными пакетами. Возможна индивидуальная упаковка."');

// 5. Add SEO zh/ru
c = c.replace(/seoTitle:\s*"([^"]*)"/g,
  'seoTitle: "$1", seoTitleZh: "管件产品 | 浙江强泰", seoTitleRu: "Фитинги | Zhejiang Qiangtai"');
c = c.replace(/seoDescription:\s*"([^"]*)"/g,
  'seoDescription: "$1", seoDescriptionZh: "浙江强泰管件阀门有限公司专业生产高品质管件产品，提供OEM/ODM服务。中国温州工厂直供。", seoDescriptionRu: "Zhejiang Qiangtai Pipe Fitting & Valve Co., Ltd. — профессиональный производитель фитингов."');

// 6. Add featuresZh/Ru per category
const cats = {
  "threaded-pipe-fittings": {
    fZh: '["精密 NPT / BSPT / BSPP 螺纹加工","可提供 1/8英寸至 4英寸规格","可选 304、316、316L 不锈钢","可提供镀锌碳钢材质","符合 ANSI / DIN / BS / JIS 标准","可提供 150# 至 3000# 压力等级"]',
    fRu: '["Точная резьба NPT / BSPT / BSPP","Размеры от 1/8 до 4 дюймов","Нержавеющая сталь 304, 316, 316L","Углеродистая сталь с оцинковкой","Стандарты ANSI / DIN / BS / JIS","Классы давления 150# до 3000#"]',
    mZh: '["304 不锈钢","316 不锈钢","316L 不锈钢","碳钢","镀锌钢"]',
    mRu: '["Нерж. сталь 304","Нерж. сталь 316","Нерж. сталь 316L","Углеродистая сталь","Оцинкованная сталь"]',
    aZh: '["水处理","石油与天然气","化工设备","管道系统","消防系统","暖通空调"]',
    aRu: '["Водоподготовка","Нефть и газ","Хим. промышленность","Трубопроводы","Пожаротушение","ОВК"]',
  },
  "threaded-pipes": {
    fZh: '["无缝和焊接管可选","可提供抛光表面","可按需定制长度","NPT / BSPT / BSPP 螺纹","单头和双头螺纹","不锈钢和碳钢材质"]',
    fRu: '["Бесшовные и сварные трубы","Полированная поверхность","Индивидуальная длина","Резьба NPT/BSPT/BSPP","Одно- и двухсторонняя резьба","Нерж. и углеродистая сталь"]',
    mZh: '["304 不锈钢","316 不锈钢","碳钢"]',
    mRu: '["Нерж. сталь 304","Нерж. сталь 316","Углеродистая сталь"]',
    aZh: '["流体输送","压缩空气","仪表管路","液压系统","食品加工"]',
    aRu: '["Транспортировка жидкостей","Сжатый воздух","КИП","Гидравлика","Пищевая промышленность"]',
  },
  "high-pressure-fittings": {
    fZh: '["锻钢制造","额定压力 6000 psi","精密加工螺纹","NPT 和 BSPP 连接","逐件压力测试","可追溯材质认证"]',
    fRu: '["Кованая сталь","До 6000 psi","Точная резьба","NPT и BSPP","Индивидуальные испытания","Сертификаты материалов"]',
    mZh: '["锻钢碳钢","锻钢 316 不锈钢","合金钢"]',
    mRu: '["Кованая углеродистая сталь","Кованая нерж. сталь 316","Легированная сталь"]',
    aZh: '["液压系统","高压流体输送","化学注入","海上平台","石油天然气","电力行业"]',
    aRu: '["Гидравлика","Транспортировка под давлением","Хим. впрыск","Морские платформы","Нефть и газ","Энергетика"]',
  },
  "camlock-couplings": {
    fZh: '["快速连接/断开","不锈钢凸轮臂","防泄漏密封","兼容国际标准","A/B/C/D/E/F 型可选","多种端部配置"]',
    fRu: '["Быстрое соединение/разъединение","Нерж. кулачковые рычаги","Герметичное уплотнение","Совместимость с мировыми стандартами","Типы A, B, C, D, E, F","Различные концевые конфигурации"]',
    mZh: '["304 不锈钢","316 不锈钢","铝合金","黄铜"]',
    mRu: '["Нерж. сталь 304","Нерж. сталь 316","Алюминий","Латунь"]',
    aZh: '["石油输送","化工处理","农业与灌溉","食品加工","水处理","工业流体输送"]',
    aRu: '["Перекачка нефтепродуктов","Химическая промышленность","Сельское хозяйство","Пищевая промышленность","Водоснабжение","Промышленная передача жидкостей"]',
  },
};

for (const [slug, cd] of Object.entries(cats)) {
  const prefix = 'categorySlug: "' + slug + '"';
  const reF = new RegExp("(" + prefix + "[\\s\\S]*?)(features: \\[[^\\]]*?\\])", "g");
  c = c.replace(reF, '$1$2, featuresZh: ' + cd.fZh + ', featuresRu: ' + cd.fRu);
  const reM = new RegExp("(" + prefix + "[\\s\\S]*?)(materials: \\[[^\\]]*?\\])", "g");
  c = c.replace(reM, '$1$2, materialsZh: ' + cd.mZh + ', materialsRu: ' + cd.mRu);
  const reA = new RegExp("(" + prefix + "[\\s\\S]*?)(applications: \\[[^\\]]*?\\])", "g");
  c = c.replace(reA, '$1$2, applicationsZh: ' + cd.aZh + ', applicationsRu: ' + cd.aRu);
}

// Clean up double commas
c = c.replace(/,,/g, ",");

writeFileSync("src/data/products.ts", c);
console.log("✅ Done: 33 products upgraded with trilingual fields");
