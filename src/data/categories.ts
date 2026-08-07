// ═══════════════════════════════════════════════════
// Product Categories — trilingual (en / zh / ru)
// ═══════════════════════════════════════════════════

import { ProductCategory } from "@/types";

const TFP = "threaded-pipe-fittings"; // slug prefix

export const productCategories: ProductCategory[] = [
  // ── 1. Threaded Pipe Fittings ─────────────────
  {
    id: "cat-01", slug: TFP,
    name: "Threaded Pipe Fittings", nameZh: "丝扣管件系列", nameRu: "Резьбовые фитинги",
    shortDescription:
      "Wide range of threaded pipe fittings including elbows, tees, couplings, caps, plugs, and more. Available in stainless steel and carbon steel with precision threading.",
    shortDescriptionZh:
      "丰富的螺纹管件系列，包括弯头、三通、接头、管帽、堵头等。提供不锈钢和碳钢材质，精密螺纹加工。",
    shortDescriptionRu:
      "Широкий ассортимент резьбовых фитингов: отводы, тройники, муфты, заглушки, пробки и др. Доступны из нержавеющей и углеродистой стали с точной резьбой.",
    description:
      "Our threaded pipe fittings are manufactured to meet international standards including ANSI, DIN, BS, and JIS. We produce a comprehensive range covering threaded elbows, tees, crosses, couplings, unions, caps, plugs, bushings, and specialty fittings. Available in stainless steel (304, 316, 316L) and carbon steel with various surface treatments including galvanizing, polishing, and passivation. Each fitting undergoes strict dimensional inspection and pressure testing before shipment.",
    descriptionZh:
      "我们的丝扣管件按照 ANSI、DIN、BS、JIS 等国际标准生产。产品范围涵盖螺纹弯头、三通、四通、接头、活接、管帽、堵头、补芯以及其他特殊管件。可提供 304、316、316L 不锈钢及碳钢材质，并可根据需求进行镀锌、抛光、钝化等表面处理。每批产品在出货前均进行严格的尺寸检验和压力测试。",
    descriptionRu:
      "Наши резьбовые фитинги производятся в соответствии с международными стандартами ANSI, DIN, BS и JIS. Ассортимент включает резьбовые отводы, тройники, крестовины, муфты, разъёмные соединения, заглушки, пробки, переходные втулки и другие специальные фитинги. Доступны изделия из нержавеющей стали 304, 316, 316L и углеродистой стали с различными вариантами обработки поверхности, включая оцинковку, полировку и пассивацию. Перед отгрузкой каждая партия проходит строгий контроль размеров и испытание давлением.",
    image: "/images/products/threaded-fittings/pipe-cap.jpg", productCount: 18, hasRealImages: true,
    features: [
      "Precision NPT / BSPT / BSPP threading",
      "Available in 1/8\" to 4\" sizes",
      "Stainless steel 304, 316, 316L",
      "Carbon steel with galvanized finish",
      "ANSI / DIN / BS / JIS standards",
      "150# to 3000# pressure ratings",
    ],
    featuresZh: [
      "精密 NPT / BSPT / BSPP 螺纹加工",
      "可提供 1/8 英寸至 4 英寸规格",
      "可选 304、316、316L 不锈钢",
      "可提供镀锌碳钢材质",
      "符合 ANSI / DIN / BS / JIS 标准",
      "可提供 150# 至 3000# 压力等级",
    ],
    featuresRu: [
      "Точная резьба NPT / BSPT / BSPP",
      "Размеры от 1/8\" до 4\"",
      "Нержавеющая сталь 304, 316, 316L",
      "Углеродистая сталь с оцинковкой",
      "Стандарты ANSI / DIN / BS / JIS",
      "Классы давления 150#–3000#",
    ],
    materials: ["Stainless Steel 304","Stainless Steel 316","Stainless Steel 316L","Carbon Steel","Galvanized Steel"],
    materialsZh: ["304 不锈钢","316 不锈钢","316L 不锈钢","碳钢","镀锌钢"],
    materialsRu: ["Нерж. сталь 304","Нерж. сталь 316","Нерж. сталь 316L","Углеродистая сталь","Оцинкованная сталь"],
    connectionTypes: ["NPT Threaded","BSPT Threaded","BSPP Threaded","Socket Weld"],
    connectionTypesZh: ["NPT 螺纹","BSPT 螺纹","BSPP 螺纹","承插焊"],
    connectionTypesRu: ["Резьба NPT","Резьба BSPT","Резьба BSPP","Муфтовая сварка"],
    applications: ["Water Treatment","Oil & Gas","Chemical Processing","Plumbing Systems","Fire Protection","HVAC"],
    applicationsZh: ["水处理","石油与天然气","化工设备","管道系统","消防系统","暖通空调"],
    applicationsRu: ["Водоподготовка","Нефть и газ","Химическая пром.","Трубопроводы","Пожаротушение","ОВК"],
    seoTitle: "Threaded Pipe Fittings Manufacturer | Stainless Steel & Carbon Steel",
    seoTitleZh: "丝扣管件生产厂家 | 不锈钢与碳钢螺纹管件",
    seoTitleRu: "Производитель резьбовых фитингов | Нержавеющая и углеродистая сталь",
    seoDescription: "Professional manufacturer of threaded pipe fittings including elbows, tees, couplings, caps, plugs, bushings. Stainless steel 304/316 and carbon steel. OEM/ODM available from Wenzhou, China.",
    seoDescriptionZh: "专业生产丝扣管件，包括弯头、三通、接头、管帽、堵头、补芯。提供 304/316 不锈钢和碳钢材质，支持 OEM/ODM，中国温州工厂。",
    seoDescriptionRu: "Профессиональный производитель резьбовых фитингов: отводы, тройники, муфты, заглушки, пробки, переходные втулки. Нержавеющая сталь 304/316 и углеродистая сталь. OEM/ODM, Вэньчжоу, Китай.",
  },

  // ── 2. Threaded Pipes and Nipples ────────────
  {
    id: "cat-02", slug: "threaded-pipes",
    name: "Threaded Pipes and Nipples", nameZh: "丝扣管子系列", nameRu: "Резьбовые трубы и ниппели",
    shortDescription: "Polished threaded pipes, hexagon hose nipples, long nipples, and full-thread pipes fabricated from seamless and welded tubing.",
    shortDescriptionZh: "抛光螺纹管、六角皮管接头、加长管接头以及全螺纹管，由无缝和焊接管材制造。",
    shortDescriptionRu: "Полированные резьбовые трубы, шестигранные штуцеры, удлинённые ниппели и трубы с полной резьбой из бесшовных и сварных труб.",
    description: "Our threaded pipes and nipples range includes polished single-end and double-end threaded pipes, hexagon hose nipples, full-thread nipples, and extended-length nipples. Manufactured from seamless or welded stainless steel and carbon steel tubing with clean, burr-free threads.",
    descriptionZh: "我们的螺纹管和管接头系列包括抛光单头和双头螺纹管、六角皮管接头、全螺纹管接头以及加长管接头。采用无缝或焊接不锈钢和碳钢管材制造，螺纹干净无毛刺。",
    descriptionRu: "Наши резьбовые трубы и ниппели включают полированные трубы с одно- и двухсторонней резьбой, шестигранные штуцеры, ниппели с полной резьбой и удлинённые ниппели. Изготавливаются из бесшовных или сварных труб из нержавеющей и углеродистой стали с чистой резьбой.",
    image: "/images/products/threaded-pipes/polished-pipe-nipple-male.jpg", productCount: 5, hasRealImages: true,
    features: ["Seamless and welded tube options","Polished finish available","Custom lengths on request","NPT / BSPT / BSPP threading","Single and double-end threaded","Stainless steel and carbon steel"],
    featuresZh: ["无缝和焊接管可选","可提供抛光表面","可按需定制长度","NPT / BSPT / BSPP 螺纹","单头和双头螺纹","不锈钢和碳钢材质"],
    featuresRu: ["Бесшовные и сварные трубы","Полированная поверхность","Индивидуальная длина","Резьба NPT/BSPT/BSPP","Одно- и двухсторонняя резьба","Нерж. и углеродистая сталь"],
    materials: ["Stainless Steel 304","Stainless Steel 316","Carbon Steel"],
    materialsZh: ["304 不锈钢","316 不锈钢","碳钢"],
    materialsRu: ["Нерж. сталь 304","Нерж. сталь 316","Углеродистая сталь"],
    connectionTypes: ["NPT Threaded","BSPT Threaded","BSPP Threaded"],
    connectionTypesZh: ["NPT 螺纹","BSPT 螺纹","BSPP 螺纹"],
    connectionTypesRu: ["Резьба NPT","Резьба BSPT","Резьба BSPP"],
    applications: ["Fluid Transfer","Compressed Air","Instrumentation","Hydraulic Systems","Food Processing"],
    applicationsZh: ["流体输送","压缩空气","仪表管路","液压系统","食品加工"],
    applicationsRu: ["Транспортировка жидкостей","Сжатый воздух","КИП","Гидравлика","Пищевая пром."],
    seoTitle: "Threaded Pipes and Nipples Manufacturer | Polished SS Nipples",
    seoTitleZh: "丝扣管子和管接头生产厂家 | 不锈钢抛光管接头",
    seoTitleRu: "Производитель резьбовых труб и ниппелей | Полированные ниппели из нерж. стали",
    seoDescription: "Manufacturer of polished threaded pipes, hexagon hose nipples, long nipples and full-thread pipes. Stainless steel and carbon steel, custom sizes available.",
    seoDescriptionZh: "生产抛光螺纹管、六角皮管接头、加长管接头及全螺纹管。不锈钢和碳钢材质，支持定制尺寸。中国温州工厂。",
    seoDescriptionRu: "Производитель полированных резьбовых труб, шестигранных штуцеров, удлинённых и полнорезьбовых ниппелей. Нерж. и углеродистая сталь, OEM/ODM, Вэньчжоу, Китай.",
  },

  // ── 3. High Pressure Fittings ────────────────
  {
    id: "cat-03", slug: "high-pressure-fittings",
    name: "High Pressure Pipe Fittings", nameZh: "高压管件系列", nameRu: "Фитинги высокого давления",
    shortDescription: "Forged steel high pressure fittings rated up to 6000 psi. Includes threaded couplings, elbows, tees, and adapters for demanding hydraulic and industrial applications.",
    shortDescriptionZh: "锻钢高压管件，额定压力可达 6000 psi。包括螺纹接头、弯头、三通和适配器，适用于苛刻的液压和工业应用。",
    shortDescriptionRu: "Кованые фитинги высокого давления до 6000 psi. Включают резьбовые муфты, отводы, тройники и переходники для гидравлики и промышленности.",
    description: "Our high pressure fittings are forged from high-grade carbon steel and stainless steel for superior strength. Rated up to 6000 psi, each fitting is precision machined and individually tested. Ideal for hydraulic systems, high-pressure fluid transfer, and offshore applications.",
    descriptionZh: "我们的高压管件采用优质碳钢和不锈钢锻造而成，强度卓越。额定压力可达 6000 psi，每件产品均精密加工并单独测试。适用于液压系统、高压流体输送和海上平台等严苛工况。",
    descriptionRu: "Фитинги высокого давления из кованой углеродистой и нержавеющей стали. Рассчитаны на давление до 6000 psi, каждый проходят индивидуальные испытания. Идеальны для гидравлики, транспортировки под высоким давлением и морских платформ.",
    image: "/images/products/high-pressure-fittings/forged-hp-coupling.jpg", productCount: 5, hasRealImages: true,
    features: ["Forged steel construction","Rated up to 6000 psi","Precision machined threads","NPT and BSPP connections","Individual pressure testing","Traceable material certification"],
    featuresZh: ["锻钢制造","额定压力 6000 psi","精密加工螺纹","NPT 和 BSPP 连接","逐件压力测试","可追溯材质认证"],
    featuresRu: ["Кованая сталь","До 6000 psi","Точная резьба","NPT и BSPP","Индивидуальные испытания","Сертификаты материалов"],
    materials: ["Forged Carbon Steel","Forged Stainless Steel 316","Alloy Steel"],
    materialsZh: ["锻钢碳钢","锻钢 316 不锈钢","合金钢"],
    materialsRu: ["Кованая углеродистая сталь","Кованая нерж. сталь 316","Легированная сталь"],
    connectionTypes: ["NPT Threaded","BSPP Threaded","Cone & Thread"],
    connectionTypesZh: ["NPT 螺纹","BSPP 螺纹","锥面螺纹"],
    connectionTypesRu: ["Резьба NPT","Резьба BSPP","Конусная резьба"],
    applications: ["Hydraulic Systems","High-Pressure Fluid Transfer","Chemical Injection","Offshore & Marine","Oil & Gas","Power Generation"],
    applicationsZh: ["液压系统","高压流体输送","化学注入","海上平台","石油天然气","电力行业"],
    applicationsRu: ["Гидравлика","Транспортировка под давлением","Хим. впрыск","Морские платформы","Нефть и газ","Энергетика"],
    seoTitle: "High Pressure Pipe Fittings Manufacturer | Forged Steel 6000 PSI",
    seoTitleZh: "高压管件生产厂家 | 锻钢 6000 PSI 高压接头",
    seoTitleRu: "Производитель фитингов высокого давления | Кованая сталь 6000 PSI",
    seoDescription: "Forged steel high pressure fittings rated to 6000 psi. Threaded couplings, elbows, tees and adapters. Carbon steel and stainless steel. Factory direct from Wenzhou, China.",
    seoDescriptionZh: "锻钢高压管件，额定 6000 psi。螺纹接头、弯头、三通和适配器。碳钢与不锈钢材质。中国温州工厂直供。",
    seoDescriptionRu: "Кованые фитинги высокого давления до 6000 psi. Резьбовые муфты, отводы, тройники и переходники. Углеродистая и нерж. сталь. Прямые поставки из Вэньчжоу, Китай.",
  },

  // ── 4. Camlock Couplings ─────────────────────
  {
    id: "cat-04", slug: "camlock-couplings",
    name: "Camlock Couplings", nameZh: "快速接头系列", nameRu: "Быстроразъёмные соединения Camlock",
    shortDescription: "Quick-connect camlock couplings in Types A, B, C, D, E, and F. Ideal for rapid fluid transfer connections in industrial, agricultural, and chemical applications.",
    shortDescriptionZh: "A、B、C、D、E、F 型快速接头（Camlock）。适用于工业、农业和化工领域的快速流体连接。",
    shortDescriptionRu: "Быстроразъёмные соединения Camlock типов A, B, C, D, E, F для быстрой передачи жидкостей в промышленности, сельском хозяйстве и химической отрасли.",
    description: "Our camlock couplings (cam and groove couplings) provide fast, reliable, and leak-free connections for fluid transfer. Available in Types A through F with various end configurations. Manufactured from stainless steel, aluminum, and brass with precision cam arms for secure locking. Widely used in petroleum, chemical, agricultural, and food processing industries.",
    descriptionZh: "我们的 Camlock 快速接头（凸轮槽接头）为流体输送提供快速、可靠、无泄漏的连接。提供 A 型至 F 型多种接头配置。采用不锈钢、铝合金和黄铜制造，配备精密凸轮臂以确保牢固锁定。广泛应用于石油、化工、农业和食品加工行业。",
    descriptionRu: "Наши быстроразъёмные соединения Camlock обеспечивают быструю, надёжную и герметичную передачу жидкостей. Доступны типы A–F с различными концевыми конфигурациями. Изготавливаются из нержавеющей стали, алюминия и латуни с точными кулачковыми рычагами для надёжной фиксации. Широко применяются в нефтяной, химической, сельскохозяйственной и пищевой промышленности.",
    image: "/images/products/camlock-couplings/type-a.jpg", productCount: 5, hasRealImages: true,
    features: ["Quick connect / disconnect","Stainless steel cam arms","Leak-proof sealing","Interchangeable with global standards","Available in Types A, B, C, D, E, F","Various end configurations"],
    featuresZh: ["快速连接/断开","不锈钢凸轮臂","防泄漏密封","兼容国际标准","A/B/C/D/E/F 型可选","多种端部配置"],
    featuresRu: ["Быстрое соединение/разъединение","Нерж. кулачковые рычаги","Герметичное уплотнение","Совместимость с мировыми стандартами","Типы A, B, C, D, E, F","Различные концевые конфигурации"],
    materials: ["Stainless Steel 304","Stainless Steel 316","Aluminum","Brass"],
    materialsZh: ["304 不锈钢","316 不锈钢","铝合金","黄铜"],
    materialsRu: ["Нерж. сталь 304","Нерж. сталь 316","Алюминий","Латунь"],
    connectionTypes: ["Hose Shank","Male NPT Threaded","Female NPT Threaded","Adapter"],
    connectionTypesZh: ["软管接头","NPT 外螺纹","NPT 内螺纹","适配器"],
    connectionTypesRu: ["Штуцер для шланга","НР NPT","ВР NPT","Переходник"],
    applications: ["Petroleum Transfer","Chemical Handling","Agriculture & Irrigation","Food Processing","Water & Wastewater","Industrial Fluid Transfer"],
    applicationsZh: ["石油输送","化工处理","农业与灌溉","食品加工","水处理","工业流体输送"],
    applicationsRu: ["Перекачка нефтепродуктов","Химическая пром.","Сельское хозяйство","Пищевая пром.","Водоснабжение","Промышленная передача жидкостей"],
    seoTitle: "Camlock Couplings Manufacturer | Stainless Steel Quick Connectors",
    seoTitleZh: "快速接头生产厂家 | 不锈钢 Camlock 快速连接器",
    seoTitleRu: "Производитель соединений Camlock | Быстроразъёмные соединители из нерж. стали",
    seoDescription: "Stainless steel camlock couplings in Types A, B, C, D, E, F. Quick connect cam and groove couplings for fluid transfer. Aluminum and brass available. OEM from China factory.",
    seoDescriptionZh: "不锈钢 Camlock 快速接头，A/B/C/D/E/F 型可选。快速凸轮槽流体连接器。提供铝合金和黄铜材质。中国工厂 OEM 支持。",
    seoDescriptionRu: "Быстроразъёмные соединения Camlock из нерж. стали типов A–F. Алюминий и латунь. OEM с завода в Китае.",
  },

  // ── 5–10: Placeholder categories ────────────────────
  ...([
    { id:"cat-05", slug:"threaded-valves-ball-valves", en:"Threaded Valves and Ball Valves", zh:"丝扣阀门和球阀系列", ru:"Резьбовые и шаровые краны" },
    { id:"cat-06", slug:"forged-steel-ball-valves", en:"Forged Steel Ball Valves", zh:"锻钢球阀系列", ru:"Шаровые краны из кованой стали" },
    { id:"cat-07", slug:"flanged-multi-way-ball-valves", en:"Flanged Three-Way and Four-Way Ball Valves", zh:"法兰三通、四通球阀", ru:"Фланцевые трёх- и четырёхходовые шаровые краны" },
    { id:"cat-08", slug:"hard-soft-seal-ball-valves", en:"Hard Seal and Soft Seal Ball Valves", zh:"硬密封和软密封球阀系列", ru:"Шаровые краны с металлическим и мягким уплотнением" },
    { id:"cat-09", slug:"electric-ball-valves", en:"Electric Ball Valves", zh:"电动球阀", ru:"Шаровые краны с электроприводом" },
    { id:"cat-10", slug:"pneumatic-ball-valves", en:"Pneumatic Ball Valves", zh:"气动球阀", ru:"Шаровые краны с пневмоприводом" },
  ] as const).map(c => ({
    id: c.id, slug: c.slug,
    name: c.en, nameZh: c.zh, nameRu: c.ru,
    shortDescription: `Product images and specifications are being updated. Please contact us for the latest catalog.`,
    shortDescriptionZh: `产品图片和规格正在更新中。请联系我们获取最新产品目录。`,
    shortDescriptionRu: `Изображения и характеристики продукции обновляются. Пожалуйста, свяжитесь с нами для получения актуального каталога.`,
    description: `${c.en} — information being updated. Contact us for detailed specifications.`,
    descriptionZh: `${c.zh} — 信息更新中。联系我们获取详细规格。`,
    descriptionRu: `${c.ru} — информация обновляется. Свяжитесь с нами для получения спецификаций.`,
    image: null, productCount: 0, hasRealImages: false,
    features: ["Product catalog being updated"], featuresZh: ["产品目录更新中"], featuresRu: ["Каталог обновляется"],
    materials: ["Contact us"], materialsZh: ["请联系我们"], materialsRu: ["Свяжитесь с нами"],
    connectionTypes: ["Contact us"], connectionTypesZh: ["请联系我们"], connectionTypesRu: ["Свяжитесь с нами"],
    applications: ["Contact us"], applicationsZh: ["请联系我们"], applicationsRu: ["Свяжитесь с нами"],
    seoTitle: `${c.en} Manufacturer | CHANTI`,
    seoTitleZh: `${c.zh}生产厂家 | 强泰`,
    seoTitleRu: `Производитель ${c.ru} | CHANTI`,
    seoDescription: `Professional manufacturer of ${c.en.toLowerCase()}. Factory direct from Wenzhou, China.`,
    seoDescriptionZh: `专业生产${c.zh}。中国温州工厂直供。`,
    seoDescriptionRu: `Профессиональный производитель ${c.ru}. Прямые поставки из Вэньчжоу, Китай.`,
  })),
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((cat) => cat.slug === slug);
}
export function getAllCategorySlugs(): string[] {
  return productCategories.map((cat) => cat.slug);
}
