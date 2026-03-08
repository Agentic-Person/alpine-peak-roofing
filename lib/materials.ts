import { images } from "./images";

export interface MaterialData {
  slug: string;
  name: string;
  shortName: string;
  manufacturer: string;
  image: string;
  warranty: string;
  lifespan: string;
  /** Material cost only per sqft */
  materialPrice: { low: number; avg: number; high: number };
  /** Fully installed (material + labor) per sqft */
  installedPrice: { low: number; avg: number; high: number };
  windRating: string;
  impactRating: string;
  fireRating: string;
  tagline: string;
  description: string;
  longDescription: string;
  idealFor: string;
  colorOptions: string;
  pros: string[];
  cons: string[];
  warrantyDetails: string[];
  whyChoose: string[];
  maintenanceTips: string[];
  coloradoConsiderations: string[];
}

export const materials: MaterialData[] = [
  {
    slug: "gaf-timberline",
    name: "GAF Timberline HDZ Architectural Shingles",
    shortName: "Architectural Shingles",
    manufacturer: "GAF — America's #1 Shingle Brand",
    image: images.materialGafTimberline,
    warranty: "Lifetime",
    lifespan: "30–50 Years",
    materialPrice: { low: 1.00, avg: 1.50, high: 2.25 },
    installedPrice: { low: 4.50, avg: 5.50, high: 7.00 },
    windRating: "Up to 130 mph (Unlimited with WindProven)",
    impactRating: "Class 4 Available (HDZ IR Variant)",
    fireRating: "Class A",
    tagline: "America's #1 selling shingle — now with LayerLock technology for unbeatable wind protection.",
    description: "Premium dimensional shingles with LayerLock technology for maximum wind resistance. The GAF Timberline HDZ delivers the look of real wood shake with the durability Colorado demands.",
    longDescription: "The GAF Timberline HDZ represents the gold standard in architectural shingles. Featuring GAF's proprietary LayerLock technology, these shingles mechanically fuse together during installation, creating a virtually impenetrable barrier against wind-driven rain. With over 20 color options designed to complement any architectural style, the Timberline HDZ delivers the dimensional beauty of real wood shake at a fraction of the cost. For Colorado homeowners, this shingle is specifically engineered to handle our extreme temperature swings, heavy snow loads, and intense UV exposure at altitude. The StainGuard Plus algae protection ensures your roof maintains its beauty for decades, while the Class A fire rating provides critical protection in wildfire-prone mountain communities.",
    idealFor: "Most residential applications — the best balance of beauty, performance, and value for Colorado homeowners.",
    colorOptions: "20+ colors including Charcoal, Weathered Wood, Barkwood, Pewter Gray, Hickory, Slate, and Mission Brown.",
    pros: [
      "America's #1 selling shingle with proven track record",
      "LayerLock technology provides mechanical bond between shingle layers",
      "WindProven warranty offers unlimited wind speed coverage when properly installed",
      "Class 4 impact resistance available (HDZ IR variant) — important for Colorado hail",
      "25-year StainGuard Plus algae protection",
      "Wide selection of 20+ colors to match any home style",
      "Lightweight — no structural reinforcement needed",
      "Excellent value: premium look at mid-range pricing",
      "Class A fire rating for wildfire protection",
      "Easy to repair — individual shingles can be replaced",
    ],
    cons: [
      "Shorter lifespan than metal, slate, or cedar (30–50 years vs. 50–200 years)",
      "Can sustain damage in severe hailstorms without IR variant",
      "Requires full replacement rather than spot repairs for major damage",
      "May show wear faster at Colorado's high altitude due to UV exposure",
      "Not as distinctive as natural materials like slate or cedar",
    ],
    warrantyDetails: [
      "Lifetime Limited Shingle & Accessory Warranty (requires GAF certified installer)",
      "WindProven Limited Wind Warranty — no maximum wind speed limit when installed with 4 qualifying accessories",
      "Standard wind warranty: 130 mph without special installation",
      "25-year StainGuard Plus Algae Protection Limited Warranty",
      "10-year Workmanship Warranty through GAF Master Elite contractors",
      "Warranty is transferable to subsequent homeowners (with some limitations)",
    ],
    whyChoose: [
      "You want the best balance of cost, beauty, and performance",
      "Your home is in a hail-prone area (choose HDZ IR variant)",
      "You want a proven product backed by America's largest roofing manufacturer",
      "You're looking for a wide range of color options",
      "You want a lightweight solution that won't require structural modifications",
    ],
    maintenanceTips: [
      "Annual visual inspection from ground level after major storms",
      "Professional inspection every 3–5 years",
      "Keep gutters clear of debris to prevent water backup",
      "Trim overhanging tree branches to prevent damage and moss growth",
      "Address any missing or damaged shingles promptly to prevent leaks",
    ],
    coloradoConsiderations: [
      "Choose the HDZ IR (Impact Resistant) variant for hail-prone Front Range areas",
      "Darker colors absorb more heat, helping with snow melt in mountain communities",
      "The Class A fire rating is essential for homes in wildfire interface zones",
      "LayerLock technology is particularly valuable in Colorado's high-wind mountain passes",
      "UV-resistant granules help combat the intense solar exposure at altitude",
    ],
  },
  {
    slug: "standing-seam",
    name: "Standing Seam Metal Roofing",
    shortName: "Standing Seam Metal",
    manufacturer: "Multiple Premium Manufacturers",
    image: images.materialStandingSeam,
    warranty: "50 Years",
    lifespan: "40–70 Years",
    materialPrice: { low: 4.00, avg: 5.50, high: 7.00 },
    installedPrice: { low: 10.00, avg: 13.00, high: 16.00 },
    windRating: "140–180 mph",
    impactRating: "Excellent — Resists Hail Damage",
    fireRating: "Class A (Non-Combustible)",
    tagline: "The ultimate mountain roof — engineered for Colorado's most extreme conditions.",
    description: "24-gauge steel panels with concealed fasteners for a clean, modern look. Standing seam metal delivers unmatched longevity and performance in Colorado's demanding alpine environment.",
    longDescription: "Standing seam metal roofing represents the pinnacle of modern roofing technology. Featuring interlocking panels with concealed fasteners, this system creates a continuous, watertight barrier that sheds snow, resists wind, and withstands decades of Colorado's punishing weather. The raised seams — standing 1 to 2 inches above the flat panel surface — channel water and snowmelt efficiently while creating the distinctive clean lines that define contemporary mountain architecture. Available in 24-gauge steel with Kynar 500 fluoropolymer paint finishes, these panels resist fading, chalking, and corrosion for decades. The thermal expansion design allows panels to move naturally with temperature changes, preventing the buckling and fastener failure common in exposed-fastener systems. For Colorado mountain homes, standing seam is the gold standard — its snow-shedding capability, fire resistance, and energy efficiency make it the preferred choice for discerning homeowners.",
    idealFor: "Mountain homes, modern architecture, long-term investment properties, and homeowners who want a 'forever roof' with minimal maintenance.",
    colorOptions: "Dozens of Kynar 500 paint colors including Matte Black, Charcoal Gray, Dark Bronze, Forest Green, Copper Penny, and Galvalume (natural metallic).",
    pros: [
      "Exceptional longevity — 40 to 70+ years with proper installation",
      "Superior snow shedding — critical for Colorado mountain homes",
      "Class A fire rating (non-combustible) — essential in wildfire zones",
      "Energy efficient — reflects solar heat, reducing cooling costs by 10–25%",
      "Concealed fastener system prevents leaks and corrosion",
      "Extremely low maintenance — no shingle replacement, no granule loss",
      "Withstands 140–180 mph winds",
      "100% recyclable at end of life",
      "Increases home resale value significantly",
      "Kynar 500 finish resists fading for 30+ years",
    ],
    cons: [
      "Higher upfront cost — roughly 2–3x the price of architectural shingles",
      "Can dent from very large hail (though less common than shingle damage)",
      "Requires specialized installation by trained metal roofing contractors",
      "Thermal expansion/contraction can cause 'oil canning' if improperly installed",
      "Rain noise can be louder without proper underlayment and insulation",
      "Limited ability to walk on roof without risking dents",
    ],
    warrantyDetails: [
      "40–50 year manufacturer warranty on steel panels",
      "30-year paint warranty on Kynar 500 fluoropolymer finish",
      "Lifetime warranty available from select manufacturers",
      "Weathertight warranty covers panel and fastener system",
      "Transferable to subsequent homeowners",
      "Workmanship warranty through certified installer (typically 10–20 years)",
    ],
    whyChoose: [
      "You want a roof that will last 50+ years with minimal maintenance",
      "Your home is in a heavy snow area and you need reliable snow shedding",
      "You value energy efficiency and want to reduce heating/cooling costs",
      "You want the clean, modern aesthetic of metal for contemporary mountain architecture",
      "You're building your forever home and want a forever roof",
    ],
    maintenanceTips: [
      "Annual visual inspection for any loose panels or sealant degradation",
      "Clear debris from panel valleys and around penetrations",
      "Check and reseal any exposed fasteners at penetration points every 5–10 years",
      "Touch up any scratches in the paint finish to prevent corrosion",
      "Ensure snow guards are secure before each winter season",
    ],
    coloradoConsiderations: [
      "Snow guards are essential to prevent dangerous snow slides",
      "Galvalume finish performs exceptionally well at Colorado's altitude",
      "The non-combustible rating is critical for mountain communities with wildfire risk",
      "Thermal movement is more pronounced at altitude — ensure proper installation allowances",
      "Dark colors paired with proper insulation create ideal snow-melt performance",
    ],
  },
  {
    slug: "natural-slate",
    name: "Natural Slate Roofing",
    shortName: "Natural Slate",
    manufacturer: "Vermont & Imported Quarries",
    image: images.materialNaturalSlate,
    warranty: "75+ Years",
    lifespan: "75–200 Years",
    materialPrice: { low: 7.00, avg: 10.00, high: 15.00 },
    installedPrice: { low: 15.00, avg: 22.00, high: 30.00 },
    windRating: "Excellent (140+ mph when properly installed)",
    impactRating: "Good — Hard Slate is Very Durable",
    fireRating: "Class A (Natural Stone — Non-Combustible)",
    tagline: "The century roof — timeless beauty that outlasts generations.",
    description: "Genuine stone slate tiles for the ultimate in beauty and longevity. Natural slate is the most prestigious roofing material available, offering a roof that can literally last centuries.",
    longDescription: "Natural slate roofing is the crown jewel of roofing materials — a genuine stone product quarried from the earth and split into individual tiles that have been protecting the world's finest buildings for centuries. Each slate tile is unique, with subtle variations in color, texture, and mineral veining that create a roof of unparalleled natural beauty. Vermont slate, considered the finest in North America, comes in rich blues, grays, greens, purples, and reds that actually deepen and improve with age. A properly installed slate roof can last 100 to 200 years — meaning it may be the last roof your home ever needs. For Colorado's luxury mountain estates, natural slate makes a statement of permanence and prestige that no other material can match. The weight and density of slate provide exceptional insulation and sound dampening, while its non-combustible nature offers the highest level of fire protection.",
    idealFor: "Luxury estates, historic homes, and homeowners who want the most prestigious, longest-lasting roof available — a true generational investment.",
    colorOptions: "Vermont Gray-Black, Unfading Green, Unfading Purple, Semi-Weathering Gray-Green, Variegated Purple, and imported Spanish/Brazilian varieties.",
    pros: [
      "Longest lasting roofing material — 75 to 200+ years",
      "Unmatched natural beauty that improves with age",
      "Non-combustible — highest fire protection available",
      "Extremely durable — resists rot, insects, and mold",
      "Increases property value significantly — a major selling point",
      "Environmentally sustainable — natural material with centuries of service life",
      "Excellent sound insulation — quiet during rain and hail",
      "Each tile is unique — creates a one-of-a-kind roof",
      "Zero maintenance for decades when properly installed",
      "Historic authenticity for period-correct restorations",
    ],
    cons: [
      "Highest cost of any residential roofing material",
      "Very heavy — typically requires structural reinforcement (800–1,500 lbs per square)",
      "Limited number of qualified slate installers — requires specialized expertise",
      "Individual tiles can crack during installation or from foot traffic",
      "Repairs are expensive and require matching slate from the same quarry",
      "Long lead times for material procurement (especially imported slate)",
      "Not suitable for all roof pitches — requires minimum 4:12 slope",
    ],
    warrantyDetails: [
      "50–100 year manufacturer warranty on slate tiles (varies by quarry)",
      "Vermont quarries typically offer 75-year warranties on unfading varieties",
      "Hard slate varieties carry the longest warranties",
      "Workmanship warranty through certified slate installer (15–25 years)",
      "Some quarries guarantee color consistency for the life of the warranty",
      "Transferable to subsequent homeowners",
    ],
    whyChoose: [
      "You're building or restoring a luxury estate and want the finest roof available",
      "You want a roof that will outlast your lifetime — a true legacy investment",
      "You value natural materials and timeless aesthetics over modern alternatives",
      "Your home's architecture calls for the prestige of natural stone",
      "You want to maximize your property's value with the most premium material",
    ],
    maintenanceTips: [
      "Professional inspection every 10–15 years by a certified slate roofer",
      "Replace any cracked or slipped tiles promptly to prevent water infiltration",
      "Inspect flashing and copper valleys during routine inspections",
      "Avoid walking on the roof — slate can crack under foot traffic",
      "Keep gutters clear to prevent ice damming at the eaves",
    ],
    coloradoConsiderations: [
      "Structural engineering review is essential — ensure your home can support the weight",
      "Choose hard slate varieties for maximum freeze-thaw resistance at altitude",
      "The non-combustible rating provides critical wildfire protection",
      "Snow guards are essential to prevent dangerous slate-and-snow slides",
      "The thermal mass of slate helps regulate attic temperature in extreme Colorado weather",
    ],
  },
  {
    slug: "cedar-shake",
    name: "Premium Cedar Shake Roofing",
    shortName: "Cedar Shake",
    manufacturer: "Premium Grade — Western Red Cedar",
    image: images.materialCedarShake,
    warranty: "30 Years",
    lifespan: "30–50 Years",
    materialPrice: { low: 3.00, avg: 4.50, high: 6.50 },
    installedPrice: { low: 8.00, avg: 11.00, high: 15.00 },
    windRating: "110–130 mph (when properly installed)",
    impactRating: "Good — Natural Impact Resistance",
    fireRating: "Class B (Class A with fire-retardant treatment)",
    tagline: "The mountain classic — natural beauty that belongs in the Rockies.",
    description: "Hand-split cedar shakes for a natural, rustic mountain aesthetic. Cedar shake roofing is the quintessential Colorado mountain roof, offering warmth, character, and natural insulation.",
    longDescription: "Cedar shake roofing is the authentic mountain roof — a natural wood product that has been protecting homes in the Rocky Mountains for over a century. Hand-split from premium Western Red Cedar, each shake has a unique texture and grain pattern that creates the warm, rustic aesthetic that defines Colorado mountain architecture. Beyond its beauty, cedar offers remarkable natural properties: it's naturally resistant to insects and decay, provides excellent thermal insulation (R-value of 6.0 per inch — twice that of asphalt), and develops a beautiful silver-gray patina over time that blends seamlessly with the mountain landscape. For homeowners in Aspen, Vail, Telluride, and other mountain communities, cedar shake isn't just a roofing choice — it's a statement of connection to the natural environment. Modern fire-retardant treatments have addressed the traditional fire concerns, making treated cedar shake a viable option even in wildfire interface zones.",
    idealFor: "Mountain homes, rustic luxury lodges, and homeowners who value natural materials and the classic Colorado mountain aesthetic.",
    colorOptions: "Natural Western Red Cedar (warm honey-brown when new, weathering to distinguished silver-gray over time). Available in various grades and thicknesses.",
    pros: [
      "Stunning natural beauty — the quintessential mountain roof aesthetic",
      "Excellent natural insulation — R-value of 6.0 per inch (2x asphalt)",
      "Naturally resistant to insects and decay (Western Red Cedar)",
      "Develops beautiful silver-gray patina with age",
      "Environmentally sustainable — renewable, biodegradable resource",
      "Good natural impact resistance from hail",
      "Provides superior ventilation compared to flat materials",
      "Each shake is unique — creates a one-of-a-kind roof",
      "Can be treated for Class A fire resistance",
      "Blends naturally with mountain landscapes and forest settings",
    ],
    cons: [
      "Requires regular maintenance — cleaning, treatment, and inspection every 3–5 years",
      "Fire risk without treatment — may not meet code in some areas without fire-retardant",
      "Susceptible to moss, mold, and mildew in shaded or humid areas",
      "Can crack, split, or curl over time — especially in extreme temperature swings",
      "Higher maintenance cost over the life of the roof compared to metal or slate",
      "Shorter lifespan than metal or slate (30–50 years with proper maintenance)",
      "Color changes over time — not all homeowners appreciate the silver-gray patina",
    ],
    warrantyDetails: [
      "30-year limited manufacturer warranty on premium grade cedar shakes",
      "Warranty requires proof of regular maintenance and treatment",
      "Fire-retardant treatment warranty typically 10–20 years (requires reapplication)",
      "Workmanship warranty through certified installer (10–15 years)",
      "Grade-specific warranties — #1 Blue Label carries the longest coverage",
      "Transferable with proof of maintenance history",
    ],
    whyChoose: [
      "You want the authentic mountain aesthetic that defines Colorado architecture",
      "You value natural materials and environmental sustainability",
      "Your home is in a forested mountain setting where cedar blends naturally",
      "You appreciate the character that comes with natural wood aging",
      "You're willing to invest in regular maintenance for a beautiful natural roof",
    ],
    maintenanceTips: [
      "Professional inspection and treatment every 3–5 years",
      "Apply UV protectant and preservative treatment to extend life",
      "Remove moss, lichen, and debris annually — especially in shaded areas",
      "Replace cracked or curled shakes promptly to prevent water infiltration",
      "Ensure proper attic ventilation to prevent moisture buildup from below",
      "Reapply fire-retardant treatment per manufacturer schedule",
    ],
    coloradoConsiderations: [
      "Check local fire codes — some mountain communities require Class A fire rating",
      "Fire-retardant treatment is strongly recommended for all Colorado installations",
      "The natural insulation properties are especially valuable at high altitude",
      "Choose premium grade (#1 Blue Label) for maximum durability in harsh conditions",
      "Regular maintenance is more critical in Colorado due to extreme UV and temperature swings",
      "The silver-gray patina blends beautifully with aspen groves and mountain landscapes",
    ],
  },
];

export function getMaterialBySlug(slug: string): MaterialData | undefined {
  return materials.find((m) => m.slug === slug);
}
