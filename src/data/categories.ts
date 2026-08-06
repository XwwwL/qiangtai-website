// ══════════════════════════════════════════════════════════════
// Product Categories Data
// ══════════════════════════════════════════════════════════════

import { ProductCategory } from "@/types";

export const productCategories: ProductCategory[] = [
  // ── 1. Threaded Pipe Fittings (丝扣管件系列) ────────────────
  {
    id: "cat-01",
    slug: "threaded-pipe-fittings",
    name: "Threaded Pipe Fittings",
    nameZh: "丝扣管件系列",
    shortDescription:
      "Wide range of threaded pipe fittings including elbows, tees, couplings, caps, plugs, and more. Available in stainless steel and carbon steel with precision threading.",
    description:
      "Our threaded pipe fittings are manufactured to meet international standards including ANSI, DIN, BS, and JIS. We produce a comprehensive range covering threaded elbows, tees, crosses, couplings, unions, caps, plugs, bushings, and specialty fittings. Available in stainless steel (304, 316, 316L) and carbon steel with various surface treatments including galvanizing, polishing, and passivation. Each fitting undergoes strict dimensional inspection and pressure testing before shipment.",
    image: "/images/products/threaded-fittings/pipe-cap.jpg",
    productCount: 18,
    features: [
      "Precision NPT / BSPT / BSPP threading",
      "Available in 1/8\" to 4\" sizes",
      "Stainless steel 304, 316, 316L",
      "Carbon steel with galvanized finish",
      "ANSI / DIN / BS / JIS standards",
      "150# to 3000# pressure ratings",
    ],
    materials: [
      "Stainless Steel 304",
      "Stainless Steel 316",
      "Stainless Steel 316L",
      "Carbon Steel",
      "Galvanized Steel",
    ],
    connectionTypes: [
      "NPT Threaded",
      "BSPT Threaded",
      "BSPP Threaded",
      "Socket Weld",
    ],
    applications: [
      "Water Treatment",
      "Oil & Gas",
      "Chemical Processing",
      "Plumbing Systems",
      "Fire Protection",
      "HVAC",
    ],
    seoTitle: "Threaded Pipe Fittings Manufacturer | Stainless Steel & Carbon Steel",
    seoDescription:
      "Professional manufacturer of threaded pipe fittings including elbows, tees, couplings, caps, plugs, bushings. Stainless steel 304/316 and carbon steel. OEM/ODM available from Wenzhou, China.",
    hasRealImages: true,
  },

  // ── 2. Threaded Pipes and Nipples (丝扣管子系列) ───────────
  {
    id: "cat-02",
    slug: "threaded-pipes",
    name: "Threaded Pipes and Nipples",
    nameZh: "丝扣管子系列",
    shortDescription:
      "Polished threaded pipes, hexagon hose nipples, long nipples, and full-thread pipes fabricated from seamless and welded tubing with various end configurations.",
    description:
      "Our threaded pipes and nipples range includes polished single-end and double-end threaded pipes, hexagon hose nipples, full-thread nipples, and extended-length nipples. Manufactured from seamless or welded stainless steel and carbon steel tubing, our threaded pipes feature clean, burr-free threads and smooth polished surfaces. Custom lengths, diameters, and thread types are available to meet your exact specifications.",
    image: "/images/products/threaded-pipes/polished-pipe-nipple-male.jpg",
    productCount: 5,
    features: [
      "Seamless and welded tube options",
      "Polished finish available",
      "Custom lengths on request",
      "NPT / BSPT / BSPP threading",
      "Single and double-end threaded",
      "Stainless steel and carbon steel",
    ],
    materials: [
      "Stainless Steel 304",
      "Stainless Steel 316",
      "Carbon Steel",
    ],
    connectionTypes: ["NPT Threaded", "BSPT Threaded", "BSPP Threaded"],
    applications: [
      "Fluid Transfer",
      "Compressed Air",
      "Instrumentation",
      "Hydraulic Systems",
      "Food Processing",
    ],
    seoTitle: "Threaded Pipes and Nipples Manufacturer | Polished SS Nipples",
    seoDescription:
      "Manufacturer of polished threaded pipes, hexagon hose nipples, long nipples and full-thread pipes. Stainless steel and carbon steel, custom sizes available. OEM factory in Wenzhou, China.",
    hasRealImages: true,
  },

  // ── 3. High Pressure Fittings (高压管件系列) ────────────────
  {
    id: "cat-03",
    slug: "high-pressure-fittings",
    name: "High Pressure Pipe Fittings",
    nameZh: "高压管件系列",
    shortDescription:
      "Forged steel high pressure fittings rated up to 6000 psi. Includes threaded couplings, elbows, tees, and adapters for demanding hydraulic and industrial applications.",
    description:
      "Our high pressure fittings are forged from high-grade carbon steel and stainless steel for superior strength and durability. The range includes threaded couplings, elbows, tees, and adapters designed for pressures up to 6000 psi. Each fitting is forged, precision machined, and individually tested. Ideal for hydraulic systems, high-pressure fluid transfer, chemical injection, and offshore applications where reliable performance under extreme pressure is critical.",
    image: "/images/products/high-pressure-fittings/forged-hp-coupling.png",
    productCount: 5,
    features: [
      "Forged steel construction",
      "Rated up to 6000 psi",
      "Precision machined threads",
      "NPT and BSPP connections",
      "Individual pressure testing",
      "Traceable material certification",
    ],
    materials: [
      "Forged Carbon Steel",
      "Forged Stainless Steel 316",
      "Alloy Steel",
    ],
    connectionTypes: ["NPT Threaded", "BSPP Threaded", "Cone & Thread"],
    applications: [
      "Hydraulic Systems",
      "High-Pressure Fluid Transfer",
      "Chemical Injection",
      "Offshore & Marine",
      "Oil & Gas",
      "Power Generation",
    ],
    seoTitle: "High Pressure Pipe Fittings Manufacturer | Forged Steel 6000 PSI",
    seoDescription:
      "Forged steel high pressure fittings rated to 6000 psi. Threaded couplings, elbows, tees and adapters. Carbon steel and stainless steel. Factory direct from Wenzhou, China.",
    hasRealImages: true,
  },

  // ── 4. Camlock Couplings (快速接头系列) ─────────────────────
  {
    id: "cat-04",
    slug: "camlock-couplings",
    name: "Camlock Couplings",
    nameZh: "快速接头系列",
    shortDescription:
      "Quick-connect camlock couplings in Types A, B, C, D, E, and F. Ideal for rapid fluid transfer connections in industrial, agricultural, and chemical applications.",
    description:
      "Our camlock couplings (also known as cam and groove couplings) provide fast, reliable, and leak-free connections for fluid transfer. Available in Types A through F with various end configurations including male/female threaded, hose shank, and adapter styles. Manufactured from stainless steel, aluminum, and brass with precision cam arms for secure locking. Widely used in petroleum, chemical, agricultural, and food processing industries.",
    image: "/images/products/camlock-couplings/type-a.png",
    productCount: 5,
    features: [
      "Quick connect / disconnect",
      "Stainless steel cam arms",
      "Leak-proof sealing",
      "Interchangeable with global standards",
      "Available in Types A, B, C, D, E, F",
      "Various end configurations",
    ],
    materials: [
      "Stainless Steel 304",
      "Stainless Steel 316",
      "Aluminum",
      "Brass",
    ],
    connectionTypes: [
      "Hose Shank",
      "Male NPT Threaded",
      "Female NPT Threaded",
      "Adapter",
    ],
    applications: [
      "Petroleum Transfer",
      "Chemical Handling",
      "Agriculture & Irrigation",
      "Food Processing",
      "Water & Wastewater",
      "Industrial Fluid Transfer",
    ],
    seoTitle: "Camlock Couplings Manufacturer | Stainless Steel Quick Connectors",
    seoDescription:
      "Stainless steel camlock couplings in Types A, B, C, D, E, F. Quick connect cam and groove couplings for fluid transfer. Aluminum and brass available. OEM from China factory.",
    hasRealImages: true,
  },

  // ── 5. Threaded Valves and Ball Valves ─────────────────────
  {
    id: "cat-05",
    slug: "threaded-valves-ball-valves",
    name: "Threaded Valves and Ball Valves",
    nameZh: "丝扣阀门和球阀系列",
    shortDescription:
      "Threaded ball valves, gate valves, globe valves, and check valves for industrial piping systems. Compact design with reliable shut-off and flow control performance.",
    description:
      "Our threaded valve series includes ball valves, gate valves, globe valves, and check valves with threaded end connections. Designed for reliable flow control and shut-off in industrial piping, water treatment, and process systems. Available in stainless steel and carbon steel with various seat and seal material options. Each valve is tested for seat leakage and shell pressure in accordance with API 598 and related standards.",
    image: null,
    productCount: 0,
    features: [
      "Blow-out proof stem design",
      "ISO 5211 mounting pad",
      "Fire-safe design available",
      "Full and reduced bore options",
      "Locking device option",
      "Threaded NPT / BSPT ends",
    ],
    materials: [
      "Stainless Steel 304",
      "Stainless Steel 316",
      "Carbon Steel",
      "PTFE Seats",
    ],
    connectionTypes: ["NPT Threaded", "BSPT Threaded", "BSPP Threaded"],
    applications: [
      "Water Treatment",
      "Chemical Processing",
      "Oil & Gas",
      "General Industrial",
    ],
    seoTitle: "Threaded Ball Valves Manufacturer | Stainless Steel Threaded Valves",
    seoDescription:
      "Professional manufacturer of threaded ball valves, gate valves, globe valves and check valves. Stainless steel and carbon steel. Factory direct pricing from Wenzhou, China.",
    hasRealImages: false,
  },

  // ── 6. Forged Steel Ball Valves ────────────────────────────
  {
    id: "cat-06",
    slug: "forged-steel-ball-valves",
    name: "Forged Steel Ball Valves",
    nameZh: "锻钢球阀系列",
    shortDescription:
      "Forged steel ball valves for high-pressure and high-temperature applications. Robust forged body design with superior mechanical properties and reliable sealing performance.",
    description:
      "Our forged steel ball valves are manufactured from high-grade forged steel for maximum strength and structural integrity. Suitable for high-pressure and elevated-temperature service conditions where cast valves may not provide adequate performance. Available in two-piece and three-piece body designs with flanged or threaded ends. Each valve undergoes rigorous pressure testing and is supplied with material certifications.",
    image: null,
    productCount: 0,
    features: [
      "Forged body construction",
      "Two-piece and three-piece designs",
      "High-pressure capability",
      "Fire-safe design option",
      "Anti-static device",
      "Full port available",
    ],
    materials: [
      "Forged Carbon Steel A105",
      "Forged Stainless Steel F316",
      "Forged Alloy Steel F11/F22",
      "PTFE / RPTFE Seats",
    ],
    connectionTypes: [
      "Flanged",
      "NPT Threaded",
      "SW (Socket Weld)",
      "BW (Butt Weld)",
    ],
    applications: [
      "Oil & Gas",
      "Petrochemical",
      "Power Generation",
      "Steam Service",
      "High-Pressure Process",
    ],
    seoTitle: "Forged Steel Ball Valves Manufacturer | High Pressure Valve Factory",
    seoDescription:
      "Forged steel ball valves for high pressure and high temperature service. Two-piece and three-piece forged body, flanged or threaded ends. Certified manufacturer in Wenzhou, China.",
    hasRealImages: false,
  },

  // ── 7. Flanged Three-Way and Four-Way Ball Valves ──────────
  {
    id: "cat-07",
    slug: "flanged-multi-way-ball-valves",
    name: "Flanged Three-Way and Four-Way Ball Valves",
    nameZh: "法兰三通、四通球阀",
    shortDescription:
      "Multi-port flanged ball valves for flow diversion, mixing, and distribution applications. Three-way and four-way configurations with L-port, T-port, and X-port ball designs.",
    description:
      "Our flanged multi-way ball valves provide flexible flow control solutions for diverting, mixing, and distributing media in complex piping networks. Available in three-way (L-port and T-port) and four-way configurations with flanged end connections to international standards. Ideal for tank farms, heat exchangers, manifolds, and process systems requiring flow switching or combining. Manufactured with precision-machined balls and seats for reliable sealing across all ports.",
    image: null,
    productCount: 0,
    features: [
      "Three-way L-port and T-port designs",
      "Four-way configuration available",
      "Flanged to ANSI / DIN / JIS",
      "Compact multi-port design",
      "Blow-out proof stem",
      "ISO 5211 mounting",
    ],
    materials: [
      "Stainless Steel 304",
      "Stainless Steel 316",
      "Carbon Steel",
      "PTFE Seats",
    ],
    connectionTypes: ["Flanged ANSI 150", "Flanged ANSI 300", "Flanged DIN PN16/40"],
    applications: [
      "Flow Diversion",
      "Media Mixing",
      "Tank Farm Manifolds",
      "Heat Exchanger Systems",
      "Process Control",
    ],
    seoTitle: "Three-Way Four-Way Flanged Ball Valves Manufacturer | Multi-Port Valves",
    seoDescription:
      "Manufacturer of flanged three-way and four-way ball valves with L-port, T-port, X-port configurations. Multi-port valves for flow diversion and mixing. Factory in Wenzhou, China.",
    hasRealImages: false,
  },

  // ── 8. Hard Seal and Soft Seal Ball Valves ─────────────────
  {
    id: "cat-08",
    slug: "hard-soft-seal-ball-valves",
    name: "Hard Seal and Soft Seal Ball Valves",
    nameZh: "硬密封和软密封球阀系列",
    shortDescription:
      "Hard seal (metal-to-metal) and soft seal (PTFE/RPTFE) ball valves for diverse service conditions. Metal-seated valves for high-temperature and abrasive media; soft-seated for tight shut-off.",
    description:
      "We offer both hard seal (metal-to-metal) and soft seal (PTFE/RPTFE) ball valves to cover a wide spectrum of service conditions. Hard seal valves with metal seats are ideal for high-temperature, abrasive, and slurry applications where soft seats would degrade rapidly. Soft seal valves deliver exceptional leak-tight performance for general industrial fluids, water, oil, and gas at moderate temperatures. Both types are available in floating ball and trunnion-mounted designs.",
    image: null,
    productCount: 0,
    features: [
      "Metal-to-metal hard seal option",
      "PTFE / RPTFE soft seal option",
      "Floating and trunnion ball designs",
      "High temperature capability (hard seal)",
      "Tight shut-off (soft seal)",
      "Wide material compatibility",
    ],
    materials: [
      "Stainless Steel Body",
      "Carbide Coated Ball (Hard Seal)",
      "Stellite Seats (Hard Seal)",
      "PTFE / RPTFE Seats (Soft Seal)",
      "PEEK Seats",
    ],
    connectionTypes: ["Flanged", "Threaded", "Welded"],
    applications: [
      "High Temperature Process",
      "Abrasive Slurry",
      "Chemical Processing",
      "Steam Service (Hard Seal)",
      "General Industrial (Soft Seal)",
    ],
    seoTitle: "Hard Seal and Soft Seal Ball Valves | Metal Seated & PTFE Seated Valves",
    seoDescription:
      "Manufacturer of hard seal (metal-to-metal) and soft seal (PTFE) ball valves. Metal seated for high temperature and abrasive media, soft seated for tight shut-off. China factory.",
    hasRealImages: false,
  },

  // ── 9. Electric Ball Valves ────────────────────────────────
  {
    id: "cat-09",
    slug: "electric-ball-valves",
    name: "Electric Ball Valves",
    nameZh: "电动球阀",
    shortDescription:
      "Automated electric ball valves with electric actuators for remote operation and process automation. Available with on/off and modulating control functions.",
    description:
      "Our electric ball valves combine precision ball valve design with reliable electric actuation for automated flow control. Available in on/off and modulating configurations with various voltage options (24V AC/DC, 110V AC, 220V AC, 380V AC). Actuators feature manual override, visual position indication, and IP67 weatherproof enclosures. Ideal for remote operation, process automation, and integration with PLC/DCS control systems.",
    image: null,
    productCount: 0,
    features: [
      "Electric actuator driven",
      "On/off and modulating control",
      "Manual override handwheel",
      "Visual position indicator",
      "IP67 weatherproof enclosure",
      "Multi-voltage options",
    ],
    materials: [
      "Stainless Steel 304",
      "Stainless Steel 316",
      "Carbon Steel",
    ],
    connectionTypes: ["Flanged", "Threaded", "Wafer"],
    applications: [
      "Process Automation",
      "Remote Operation",
      "Water Treatment Plants",
      "Chemical Dosing",
      "HVAC Control",
    ],
    seoTitle: "Electric Ball Valves Manufacturer | Automated Actuated Ball Valves",
    seoDescription:
      "Electric actuated ball valves for process automation. On/off and modulating control, IP67 enclosure, multi-voltage. Stainless steel body. Manufacturer in Wenzhou, China.",
    hasRealImages: false,
  },

  // ── 10. Pneumatic Ball Valves ──────────────────────────────
  {
    id: "cat-10",
    slug: "pneumatic-ball-valves",
    name: "Pneumatic Ball Valves",
    nameZh: "气动球阀",
    shortDescription:
      "Pneumatic actuated ball valves for fast, reliable automated flow control. Double-acting and spring-return pneumatic actuators with solenoid valve integration.",
    description:
      "Our pneumatic ball valves provide fast, reliable automated flow control for industrial processes. Available with double-acting and spring-return (fail-safe) pneumatic actuators. Compact rack-and-pinion actuator design with NAMUR mounting interface for solenoid valve integration. Suitable for on/off and throttling applications across a wide range of industries. Each assembly is cycle-tested to ensure reliable long-term operation.",
    image: null,
    productCount: 0,
    features: [
      "Double-acting and spring-return",
      "Rack-and-pinion actuator",
      "NAMUR solenoid interface",
      "Fast open/close response",
      "Fail-safe option (spring-return)",
      "Compact lightweight design",
    ],
    materials: [
      "Stainless Steel 304",
      "Stainless Steel 316",
      "Carbon Steel",
    ],
    connectionTypes: ["Flanged", "Threaded", "Wafer"],
    applications: [
      "Compressed Air Systems",
      "Automated Production Lines",
      "Chemical Processing",
      "Food & Beverage",
      "Water Treatment",
    ],
    seoTitle: "Pneumatic Ball Valves Manufacturer | Air Actuated Ball Valves",
    seoDescription:
      "Pneumatic actuated ball valves with double-acting and spring-return actuators. Fast automated flow control with NAMUR solenoid interface. Factory in Wenzhou, China.",
    hasRealImages: false,
  },
];

// ── Helper: get category by slug ──────────────────────────────
export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((cat) => cat.slug === slug);
}

// ── Helper: get all category slugs ────────────────────────────
export function getAllCategorySlugs(): string[] {
  return productCategories.map((cat) => cat.slug);
}
