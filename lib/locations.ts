// Location pages data for Alpine Peak Roofing
import { images } from "./images";

export interface LocationData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  elevation: string;
  region: string;
  image: string;
  description: string;
  stats: {
    label: string;
    value: string;
    color: string;
  }[];
  environment: {
    title: string;
    intro: string;
    challenges: {
      title: string;
      description: string;
      items: string[];
    }[];
    sidebarTitle: string;
    sidebarData: {
      category: string;
      items: string[];
    }[];
  };
  services: {
    icon: string;
    title: string;
    description: string;
    items: string[];
  }[];
  projects: {
    title: string;
    description: string;
    specs: string[];
  }[];
  seasonal: {
    season: string;
    title: string;
    items: string[];
  }[];
  emergency: {
    icon: string;
    title: string;
    description: string;
    items: string[];
  }[];
  cta: {
    headline: string;
    subheading: string;
    buttons: {
      text: string;
      link: string;
    }[];
  };
}

export const locations: LocationData[] = [
  {
    id: "aspen",
    name: "Aspen",
    slug: "aspen",
    tagline: "Elite Luxury Roofing",
    elevation: "7,908 ft",
    region: "Central Rockies",
    image: images.townAspen,
    description: "Serving Aspen's most exclusive properties with unparalleled roofing expertise. At 7,908 feet elevation, we deliver ultra-luxury roofing solutions that meet the exacting standards of the world's most discerning property owners.",
    stats: [
      { label: "Feet Elevation", value: "7,908", color: "text-blue-400" },
      { label: "Luxury Projects", value: "200+", color: "text-green-400" },
      { label: "Emergency Response", value: "2 Hr", color: "text-purple-400" },
      { label: "Average Home Value", value: "$15M+", color: "text-orange-400" },
    ],
    environment: {
      title: "Aspen's Unique Roofing Environment",
      intro: "Aspen represents the pinnacle of luxury mountain living, where property values average $15+ million and architectural excellence is non-negotiable.",
      challenges: [
        {
          title: "Ultra-Luxury Market Demands",
          description: "Architectural heritage and celebrity clientele standards require discretion, perfection, and white-glove service.",
          items: [
            "Victorian mining-era buildings require specialized restoration",
            "Modern luxury estates demand cutting-edge materials",
            "Discretion essential for celebrity and business leader properties",
            "Aesthetic excellence integrated with performance",
          ],
        },
        {
          title: "Aspen Climate Conditions",
          description: "High elevation with extreme temperature swings and UV exposure.",
          items: [
            "Winter lows: -30°F to -20°F",
            "Summer highs: 80°F to 85°F",
            "Daily temperature swings: 45°F+",
            "32% higher UV than sea level",
          ],
        },
      ],
      sidebarTitle: "Climate Data",
      sidebarData: [
        {
          category: "Temperature Extremes",
          items: [
            "Winter lows: -30°F to -20°F",
            "Summer highs: 80°F to 85°F",
            "Daily swings: 45°F+",
            "Freeze-thaw: 180+ annually",
          ],
        },
        {
          category: "Snow & Wind",
          items: [
            "Annual snowfall: 200-250 inches",
            "Ground snow load: 60-80 psf",
            "Wind gusts: 100+ mph",
            "Sustained winds: 70+ mph",
          ],
        },
      ],
    },
    services: [
      {
        icon: "👑",
        title: "Ultra-Premium Materials",
        description: "Exclusive access to the world's finest roofing materials",
        items: [
          "Swiss copper with natural patina aging",
          "German engineering standing seam systems",
          "Custom color matching and fabrication",
          "Lifetime material warranties",
        ],
      },
      {
        icon: "🏛️",
        title: "Historic Restoration",
        description: "Specialized expertise in Victorian-era mining structures",
        items: [
          "Period-authentic material sourcing",
          "Historic preservation compliance",
          "Custom millwork and fabrication",
          "National Park Service standards",
        ],
      },
      {
        icon: "⚡",
        title: "Integrated Solar Luxury",
        description: "Seamlessly integrated solar solutions maintaining architectural integrity",
        items: [
          "Tesla Solar Roof certified installer",
          "Hidden micro-inverter systems",
          "High-altitude performance optimization",
          "Net-zero energy achievement",
        ],
      },
    ],
    projects: [
      {
        title: "Red Mountain Estate",
        description: "35,000 sq ft luxury compound featuring custom copper roofing with integrated snow melting and hidden solar array",
        specs: ["Value: $45M", "Year: 2023", "Material: Premium Copper"],
      },
      {
        title: "Aspen Core Victorian Restoration",
        description: "Complete restoration of 1885 mining-era mansion using period-authentic materials and modern performance enhancements",
        specs: ["Value: $28M", "Year: 2022", "Status: Historic Landmark"],
      },
      {
        title: "Starwood Contemporary",
        description: "Ultra-modern 25,000 sq ft residence with Tesla Solar Roof integration and smart snow management systems",
        specs: ["Value: $52M", "Year: 2024", "Energy: Net-Zero"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Post-Season Assessment",
        items: [
          "Winter damage evaluation",
          "Emergency repairs",
          "Summer project planning",
          "Material pre-positioning",
        ],
      },
      {
        season: "Summer",
        title: "Primary Construction",
        items: [
          "Major installations",
          "Resort renovations",
          "Preventive maintenance",
          "System upgrades",
        ],
      },
      {
        season: "Fall",
        title: "Winter Preparation",
        items: [
          "Final inspections",
          "Snow retention installation",
          "Heating system activation",
          "Emergency prep protocols",
        ],
      },
      {
        season: "Winter",
        title: "Emergency-Only Operations",
        items: [
          "Guest safety priority",
          "Minimal disruption protocols",
          "Spring planning sessions",
          "24/7 availability",
        ],
      },
    ],
    emergency: [
      {
        icon: "⚡",
        title: "2-Hour Response",
        description: "Emergency response within 2 hours anywhere in Aspen",
        items: [
          "Storm damage assessment",
          "Immediate temporary repairs",
          "Insurance documentation",
          "24/7 availability",
        ],
      },
      {
        icon: "🛡️",
        title: "Luxury Standards",
        description: "White-glove emergency service maintaining discretion",
        items: [
          "Discreet professional teams",
          "Premium temporary materials",
          "Concierge coordination",
          "Property manager communication",
        ],
      },
      {
        icon: "📋",
        title: "Seasonal Monitoring",
        description: "Proactive inspections and snow load monitoring",
        items: [
          "Pre-season roof inspections",
          "Snow load monitoring",
          "Preventive maintenance",
          "Weather alert system",
        ],
      },
    ],
    cta: {
      headline: "Protect Your Aspen Investment",
      subheading: "Trust Colorado's most elite roofing specialists with your luxury property. Schedule a confidential consultation to discuss your ultra-premium roofing needs.",
      buttons: [
        { text: "Schedule Private Consultation", link: "/contact" },
        { text: "Luxury ROI Analysis", link: "/financing" },
      ],
    },
  },
  {
    id: "vail",
    name: "Vail",
    slug: "vail",
    tagline: "World-Class Resort Roofing",
    elevation: "8,150 ft",
    region: "Central Rockies",
    image: images.townVail,
    description: "Serving Vail's legendary resort properties and luxury residences with unmatched expertise. At 8,150 feet elevation in the heart of the Vail Valley, we deliver roofing solutions that meet the highest standards of the world's premier ski destination.",
    stats: [
      { label: "Feet Elevation", value: "8,150", color: "text-blue-400" },
      { label: "Resort Projects", value: "350+", color: "text-green-400" },
      { label: "Emergency Response", value: "90 Min", color: "text-purple-400" },
      { label: "Inches Snow/Year", value: "300+", color: "text-orange-400" },
    ],
    environment: {
      title: "Vail Resort Roofing Authority",
      intro: "Vail's reputation as America's premier ski destination demands roofing systems that perform flawlessly under extreme conditions.",
      challenges: [
        {
          title: "Resort-Grade Standards",
          description: "Zero downtime during peak seasons with meticulous scheduling and execution.",
          items: [
            "Hospitality excellence required",
            "Architectural integration across styles",
            "International standards expected",
            "Guest experience optimization",
          ],
        },
        {
          title: "Vail Valley Conditions",
          description: "High-altitude performance with extreme snow loads.",
          items: [
            "Elevation: 8,150 feet base village",
            "Ski area summit: 11,570 feet",
            "Annual snowfall: 300+ inches",
            "Champagne powder (low density)",
          ],
        },
      ],
      sidebarTitle: "Valley Conditions",
      sidebarData: [
        {
          category: "High-Altitude Performance",
          items: [
            "Elevation: 8,150 ft base",
            "Summit: 11,570 ft",
            "Reduced atmospheric pressure",
            "Extreme UV exposure",
          ],
        },
        {
          category: "Snow Engineering",
          items: [
            "Annual snowfall: 300+ inches",
            "Ground snow load: 70-90 psf",
            "Champagne powder",
            "Complex drift patterns",
          ],
        },
      ],
    },
    services: [
      {
        icon: "🏂",
        title: "Resort Property Systems",
        description: "Specialized roofing for lodges and resort facilities",
        items: [
          "Large-span commercial applications",
          "High-traffic area reinforcement",
          "Snow management automation",
          "Hospitality-grade noise control",
        ],
      },
      {
        icon: "🎿",
        title: "Ski-In/Ski-Out Properties",
        description: "Ultra-premium residences with direct slope access",
        items: [
          "Extreme snow load calculations",
          "Heated roof edge systems",
          "Custom snow retention design",
          "Slope-side weather protection",
        ],
      },
      {
        icon: "⛷️",
        title: "Alpine Village Integration",
        description: "Seamless integration with Vail Village architecture",
        items: [
          "Bavarian architectural compatibility",
          "Design review board compliance",
          "Historic district preservation",
          "Pedestrian area considerations",
        ],
      },
    ],
    projects: [
      {
        title: "Four Seasons Vail Residences",
        description: "Luxury condominium complex featuring premium metal roofing with integrated snow melting systems",
        specs: ["Size: 85,000 sq ft", "Units: 72 luxury residences", "Completion: 2023"],
      },
      {
        title: "Blue Sky Basin Lodge",
        description: "On-mountain dining facility with extreme exposure requiring specialized wind-resistant systems",
        specs: ["Elevation: 11,200 ft", "Winds: 120+ mph", "Snow Load: 200+ psf"],
      },
      {
        title: "Vail Village Penthouses",
        description: "Historic district luxury penthouses with custom copper roofing",
        specs: ["Value: $12-18M each", "Material: Premium European copper", "Year: 2022"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Post-Season Assessment",
        items: [
          "Winter damage evaluation",
          "Emergency repairs",
          "Summer project planning",
          "Material pre-positioning",
        ],
      },
      {
        season: "Summer",
        title: "Primary Construction",
        items: [
          "Major installations",
          "Resort renovations",
          "Preventive maintenance",
          "System upgrades",
        ],
      },
      {
        season: "Fall",
        title: "Winter Preparation",
        items: [
          "Final inspections",
          "Snow retention installation",
          "Heating system activation",
          "Emergency prep protocols",
        ],
      },
      {
        season: "Winter",
        title: "Emergency-Only Operations",
        items: [
          "90-minute response time",
          "Guest safety priority",
          "Minimal disruption protocols",
          "Spring planning sessions",
        ],
      },
    ],
    emergency: [
      {
        icon: "⚡",
        title: "90-Minute Response",
        description: "Rapid emergency response during peak seasons",
        items: [
          "Storm damage assessment",
          "Immediate temporary repairs",
          "Insurance documentation",
          "24/7 availability",
        ],
      },
      {
        icon: "🛡️",
        title: "Resort Protection",
        description: "Guest safety and operational continuity priority",
        items: [
          "Discreet professional teams",
          "Premium temporary materials",
          "Concierge coordination",
          "Manager communication",
        ],
      },
      {
        icon: "📋",
        title: "Seasonal Monitoring",
        description: "Proactive inspections and snow load monitoring",
        items: [
          "Pre-season inspections",
          "Snow load monitoring",
          "Preventive maintenance",
          "Weather alert system",
        ],
      },
    ],
    cta: {
      headline: "Partner with Vail's Roofing Experts",
      subheading: "Whether you manage resort properties, own luxury residences, or develop premium real estate in Vail Valley, trust our proven expertise.",
      buttons: [
        { text: "Schedule Resort Consultation", link: "/contact" },
        { text: "View Technical Guide", link: "/services" },
      ],
    },
  },
  {
    id: "telluride",
    name: "Telluride",
    slug: "telluride",
    tagline: "Historic Preservation Masters",
    elevation: "8,750 ft",
    region: "San Juan Mountains",
    image: images.townTelluride,
    description: "Preserving Telluride's legendary Victorian mining heritage while delivering modern performance. At 8,750 feet in a dramatic box canyon setting, we specialize in historic restoration and National Historic Landmark preservation projects.",
    stats: [
      { label: "Feet Elevation", value: "8,750", color: "text-orange-400" },
      { label: "Mining Era Founded", value: "1878", color: "text-yellow-600" },
      { label: "Emergency Response", value: "2 Hr", color: "text-purple-400" },
      { label: "Historic Buildings", value: "150+", color: "text-amber-400" },
    ],
    environment: {
      title: "Victorian Mining Heritage Preservation",
      intro: "Telluride's entire historic district holds National Historic Landmark designation, requiring meticulous adherence to preservation standards.",
      challenges: [
        {
          title: "National Historic Landmark Status",
          description: "Strict compliance with Secretary of Interior Standards for Historic Preservation.",
          items: [
            "Victorian architecture (1880s-1900s)",
            "National Park Service standards",
            "Material authenticity required",
            "Modern performance integration",
          ],
        },
        {
          title: "Box Canyon Challenges",
          description: "Extreme elevation and unique weather patterns.",
          items: [
            "Town elevation: 8,750 feet",
            "Surrounded by 13,000+ foot peaks",
            "Winter lows: -35°F to -25°F",
            "Wind gusts: 120+ mph in canyon",
          ],
        },
      ],
      sidebarTitle: "Canyon Challenges",
      sidebarData: [
        {
          category: "Extreme Elevation",
          items: [
            "Town elevation: 8,750 ft",
            "Surrounded by 13,000+ ft peaks",
            "Dramatic box canyon winds",
            "Limited winter sunlight",
          ],
        },
        {
          category: "Weather Extremes",
          items: [
            "Winter lows: -35°F to -25°F",
            "Summer highs: 70°F to 78°F",
            "Annual snowfall: 280-320 inches",
            "Wind gusts: 120+ mph",
          ],
        },
      ],
    },
    services: [
      {
        icon: "🏛️",
        title: "Victorian Restoration",
        description: "Period-authentic restoration of 1880s mining-era buildings",
        items: [
          "Hand-split cedar shake restoration",
          "Slate repair and replacement",
          "Period-correct metal fabrication",
          "Ornate trim and detail preservation",
        ],
      },
      {
        icon: "⛏️",
        title: "Mining Heritage Buildings",
        description: "Specialized expertise in historic mining structures",
        items: [
          "Corrugated metal heritage systems",
          "Structural timber preservation",
          "Industrial roof adaptations",
          "Mining equipment integration",
        ],
      },
      {
        icon: "🏔️",
        title: "Modern Integration",
        description: "Seamless integration while maintaining historic character",
        items: [
          "Hidden insulation systems",
          "Concealed snow melting",
          "Invisible solar integration",
          "Modern drainage behind facades",
        ],
      },
    ],
    projects: [
      {
        title: "Sheridan Opera House (1913)",
        description: "Complete restoration of historic opera house roof using period-authentic materials and modern structural reinforcement",
        specs: ["Era: 1913", "Status: National Historic Landmark", "Completion: 2022"],
      },
      {
        title: "Telluride Historic District Homes",
        description: "Comprehensive restoration program covering 25+ Victorian mining-era residences",
        specs: ["Era: 1880s-1900s", "Properties: 25+ homes", "Period: 2020-2024"],
      },
      {
        title: "Liberty Bell Mine Structures",
        description: "Historic mining building preservation at 12,000+ feet elevation",
        specs: ["Elevation: 12,200 ft", "Challenge: Extreme altitude", "Access: Helicopter only"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Assessment & Planning",
        items: [
          "Comprehensive damage assessment",
          "Summer project preparation",
          "Material inventory and staging",
          "Client consultation and planning",
        ],
      },
      {
        season: "Summer",
        title: "Critical Construction",
        items: [
          "24/7 construction operations",
          "Pre-positioned equipment",
          "Accelerated project schedules",
          "Weather-dependent planning",
        ],
      },
      {
        season: "Fall",
        title: "Winter Preparation",
        items: [
          "Snow load system activation",
          "Monitoring equipment installation",
          "Emergency supply staging",
          "Communication system testing",
        ],
      },
      {
        season: "Winter",
        title: "Active Monitoring",
        items: [
          "Real-time snow load monitoring",
          "90-minute emergency response",
          "Daily weather tracking",
          "Proactive snow removal",
        ],
      },
    ],
    emergency: [
      {
        icon: "🚨",
        title: "2-Hour Response",
        description: "Rapid emergency response throughout the box canyon",
        items: [
          "Storm damage assessment",
          "Immediate temporary repairs",
          "Insurance documentation",
          "Historic material protection",
        ],
      },
      {
        icon: "🛡️",
        title: "Heritage Protection",
        description: "Specialized procedures prioritizing historic material preservation",
        items: [
          "Period-authentic materials",
          "Historic compliance documentation",
          "Preservation authority coordination",
          "Restoration expertise",
        ],
      },
      {
        icon: "📋",
        title: "Documentation",
        description: "Comprehensive damage documentation for authorities",
        items: [
          "Insurance documentation",
          "Historic preservation records",
          "Restoration protocols",
          "Authority coordination",
        ],
      },
    ],
    cta: {
      headline: "Preserve Your Historic Investment",
      subheading: "Trust Colorado's leading historic preservation specialists with your Telluride property. Our expertise in Victorian architecture and National Historic Landmark requirements ensures your restoration meets the highest standards.",
      buttons: [
        { text: "Schedule Historic Assessment", link: "/contact" },
        { text: "View Preservation Guide", link: "/services" },
      ],
    },
  },
  {
    id: "crested-butte",
    name: "Crested Butte",
    slug: "crested-butte",
    tagline: "Extreme Weather Specialists",
    elevation: "8,885 ft",
    region: "Central Rockies",
    image: images.townCrestedButte,
    description: "Engineering roofing systems for Colorado's most extreme conditions. At 8,885 feet elevation with record-breaking snowfall exceeding 500 inches annually, we deliver uncompromising protection for Crested Butte's unique mountain environment.",
    stats: [
      { label: "Feet Elevation", value: "8,885", color: "text-blue-400" },
      { label: "Inches Snow/Year", value: "500+", color: "text-cyan-400" },
      { label: "Emergency Response", value: "90 Min", color: "text-purple-400" },
      { label: "Freeze-Thaw/Year", value: "250+", color: "text-indigo-400" },
    ],
    environment: {
      title: "Colorado's Most Extreme Roofing Environment",
      intro: "Crested Butte holds multiple Colorado snowfall records, with some seasons exceeding 600 inches.",
      challenges: [
        {
          title: "Record-Breaking Snow Loads",
          description: "Our roofing systems are engineered for snow loads that would destroy standard construction.",
          items: [
            "1978-79 season: 632 inches",
            "2018-19 season: 585 inches",
            "2010-11 season: 548 inches",
            "Ground snow loads exceed 200 psf",
          ],
        },
        {
          title: "Extreme Environment Data",
          description: "Champagne powder and extended snow season.",
          items: [
            "Record low: -47°F (1979)",
            "Winter average low: -10°F to -20°F",
            "Champagne powder characteristics",
            "Snow remains October through June",
          ],
        },
      ],
      sidebarTitle: "Extreme Data",
      sidebarData: [
        {
          category: "Temperature Extremes",
          items: [
            "Record low: -47°F (1979)",
            "Winter avg: -10°F to -20°F",
            "Daily swings: 50°F+",
            "Freeze-thaw: 250+ annually",
          ],
        },
        {
          category: "Wind & Weather",
          items: [
            "Chinook winds: 100+ mph",
            "Katabatic drainage winds",
            "Sudden weather changes",
            "Extended whiteout conditions",
          ],
        },
      ],
    },
    services: [
      {
        icon: "❄️",
        title: "Ultra-Heavy Snow Load Design",
        description: "Structural systems engineered for 300+ psf snow loads",
        items: [
          "Reinforced structural framing",
          "Computer-modeled snow drift analysis",
          "Progressive collapse prevention",
          "Redundant load path engineering",
        ],
      },
      {
        icon: "⚡",
        title: "Active Snow Management",
        description: "Integrated heating systems and mechanical snow removal",
        items: [
          "Roof-integrated heating cables",
          "Automated snow load monitoring",
          "Emergency snow removal protocols",
          "Smart system weather integration",
        ],
      },
      {
        icon: "🏔️",
        title: "Cold-Climate Materials",
        description: "Premium materials tested for extreme cold performance",
        items: [
          "Arctic-grade material specifications",
          "Thermal cycling test certification",
          "Impact resistance verification",
          "Extended cold-weather warranties",
        ],
      },
    ],
    projects: [
      {
        title: "Mt. Crested Butte Base Lodge",
        description: "45,000 sq ft ski area base facility designed for 400 psf snow loads with integrated heating systems",
        specs: ["Load Rating: 400 psf", "Heating: 500kW system", "Completion: 2021"],
      },
      {
        title: "Gothic Road Private Residence",
        description: "Ultra-isolated mountain home at 9,500 feet engineered for extreme exposure",
        specs: ["Elevation: 9,500 ft", "Max Snow: 600+ inches", "Access: Snowmobile only"],
      },
      {
        title: "Victorian Historic District",
        description: "Preservation of 1880s mining-era buildings with hidden structural reinforcement",
        specs: ["Era: 1880s-1900s", "Buildings: 15+ structures", "Challenge: Hidden reinforcement"],
      },
    ],
    seasonal: [
      {
        season: "Summer",
        title: "Critical Construction Window",
        items: [
          "24/7 construction operations",
          "Pre-positioned equipment",
          "Accelerated project schedules",
          "Weather-dependent planning",
        ],
      },
      {
        season: "Fall",
        title: "Winter Preparation Phase",
        items: [
          "Snow load system activation",
          "Monitoring equipment installation",
          "Emergency supply staging",
          "Communication system testing",
        ],
      },
      {
        season: "Winter",
        title: "Active Monitoring Period",
        items: [
          "Real-time snow load monitoring",
          "90-minute emergency response",
          "Daily weather tracking",
          "Proactive snow removal",
        ],
      },
      {
        season: "Spring",
        title: "Assessment & Planning",
        items: [
          "Comprehensive damage assessment",
          "Summer project preparation",
          "Material inventory and staging",
          "Client consultation and planning",
        ],
      },
    ],
    emergency: [
      {
        icon: "⚡",
        title: "90-Minute Response",
        description: "Rapid emergency response even during extreme weather",
        items: [
          "Specialized equipment",
          "Trained high-altitude crews",
          "Extreme weather capability",
          "24/7 availability",
        ],
      },
      {
        icon: "📡",
        title: "Real-Time Monitoring",
        description: "Advanced weather monitoring and snow load sensors",
        items: [
          "Early warning systems",
          "Extreme accumulation alerts",
          "Structural stress monitoring",
          "Automated notifications",
        ],
      },
      {
        icon: "🏔️",
        title: "Specialized Equipment",
        description: "Cold-weather certified equipment and materials",
        items: [
          "Sub-zero operations",
          "Extreme altitude capability",
          "Specialized tools",
          "Emergency protocols",
        ],
      },
    ],
    cta: {
      headline: "Engineer for Extreme Conditions",
      subheading: "Don't leave your Crested Butte property vulnerable to Colorado's most extreme weather. Our proven engineering solutions and specialized expertise ensure your roof can handle anything nature delivers.",
      buttons: [
        { text: "Schedule Extreme Weather Assessment", link: "/contact" },
        { text: "View Engineering Guide", link: "/services" },
      ],
    },
  },
  {
    id: "steamboat-springs",
    name: "Steamboat Springs",
    slug: "steamboat-springs",
    tagline: "Resort & Ranch Specialists",
    elevation: "6,732 ft",
    region: "Yampa Valley",
    image: images.townSteamboat,
    description: "Serving Steamboat Springs' unique blend of world-class resort amenities and authentic ranching heritage. At 6,732 feet in the Yampa Valley, we deliver specialized roofing solutions for both luxury resorts and working ranch operations.",
    stats: [
      { label: "Feet Elevation", value: "6,732", color: "text-green-400" },
      { label: "Ski Days/Year", value: "165", color: "text-teal-400" },
      { label: "Valley Response", value: "30 Min", color: "text-emerald-400" },
      { label: "Inches Snow/Year", value: "334", color: "text-cyan-400" },
    ],
    environment: {
      title: "Resort & Ranch Roofing Authority",
      intro: "Steamboat Springs uniquely combines world-class ski resort amenities with authentic ranching traditions.",
      challenges: [
        {
          title: "Dual Heritage Expertise",
          description: "Resort-quality craftsmanship for luxury properties and practical systems for working ranches.",
          items: [
            "Champagne powder climate",
            "Geothermal considerations",
            "Valley weather patterns",
            "Diverse property types",
          ],
        },
        {
          title: "Yampa Valley Conditions",
          description: "Unique climate with temperature inversions and distinct wind patterns.",
          items: [
            "Base elevation: 6,732 feet",
            "Ski area summit: 10,568 feet",
            "Continental climate with maritime influence",
            "Natural hot springs microclimate",
          ],
        },
      ],
      sidebarTitle: "Valley Conditions",
      sidebarData: [
        {
          category: "Climate Characteristics",
          items: [
            "Base elevation: 6,732 ft",
            "Summit: 10,568 ft",
            "Continental climate",
            "Geothermal effects",
          ],
        },
        {
          category: "Snow Characteristics",
          items: [
            "Annual snowfall: 334+ inches",
            "Champagne powder",
            "Deep base: 60-100+ inches",
            "Extended season: 165+ days",
          ],
        },
      ],
    },
    services: [
      {
        icon: "🎿",
        title: "Resort Property Systems",
        description: "Luxury ski resort facilities requiring hospitality-grade performance",
        items: [
          "Lodge and hotel roofing",
          "Guest service facility upgrades",
          "Gondola and lift building protection",
          "Resort village commercial properties",
        ],
      },
      {
        icon: "🐄",
        title: "Working Ranch Operations",
        description: "Practical, durable roofing for cattle ranches and agricultural facilities",
        items: [
          "Barn and stable roofing",
          "Equipment storage facilities",
          "Feed and grain storage",
          "Ranch residence upgrades",
        ],
      },
      {
        icon: "♨️",
        title: "Geothermal Integration",
        description: "Specialized systems accounting for natural hot springs effects",
        items: [
          "Moisture management enhancement",
          "Thermal bridging considerations",
          "Specialized ventilation systems",
          "Hot spring facility roofing",
        ],
      },
    ],
    projects: [
      {
        title: "Steamboat Grand Resort",
        description: "Luxury slopeside hotel complex featuring advanced snow management systems",
        specs: ["Size: 120,000 sq ft", "Rooms: 327 luxury suites", "Completion: 2023"],
      },
      {
        title: "Catamount Ranch Estate",
        description: "15,000-acre working cattle ranch with 25+ building complex",
        specs: ["Acreage: 15,000+ acres", "Buildings: 25+ structures", "Cattle: 2,000+ head"],
      },
      {
        title: "Strawberry Park Hot Springs",
        description: "Historic natural hot springs facility with specialized moisture management",
        specs: ["Challenge: High humidity", "Special: Geothermal effects", "Era: 1875 origins"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Planning Phase",
        items: [
          "Post-winter assessment",
          "Summer project preparation",
          "Equipment maintenance",
          "Material staging",
        ],
      },
      {
        season: "Summer",
        title: "Construction Season",
        items: [
          "Peak construction operations",
          "Resort renovations",
          "Preventive maintenance",
          "System upgrades",
        ],
      },
      {
        season: "Fall",
        title: "Preparation Phase",
        items: [
          "Final inspections",
          "Snow retention installation",
          "Heating system activation",
          "Emergency prep",
        ],
      },
      {
        season: "Winter",
        title: "Monitoring Period",
        items: [
          "Real-time monitoring",
          "30-minute response time",
          "Daily weather tracking",
          "Proactive snow removal",
        ],
      },
    ],
    emergency: [
      {
        icon: "⚡",
        title: "30-Minute Valley Response",
        description: "Rapid emergency response throughout Steamboat area",
        items: [
          "Storm damage assessment",
          "Immediate temporary repairs",
          "Insurance documentation",
          "24/7 availability",
        ],
      },
      {
        icon: "🛡️",
        title: "Resort & Ranch Protection",
        description: "Specialized response for both resort and ranch properties",
        items: [
          "Resort guest safety priority",
          "Ranch operational continuity",
          "Professional teams",
          "Premium materials",
        ],
      },
      {
        icon: "📋",
        title: "Seasonal Monitoring",
        description: "Proactive inspections and monitoring",
        items: [
          "Pre-season inspections",
          "Snow load monitoring",
          "Preventive maintenance",
          "Weather alert system",
        ],
      },
    ],
    cta: {
      headline: "Your Steamboat Springs Roofing Partner",
      subheading: "Whether you operate a luxury resort, manage a working ranch, or own property in the Yampa Valley, trust our deep understanding of Steamboat's unique conditions.",
      buttons: [
        { text: "Schedule Valley Assessment", link: "/contact" },
        { text: "Calculate ROI", link: "/financing" },
      ],
    },
  },
  {
    id: "winter-park",
    name: "Winter Park",
    slug: "winter-park",
    tagline: "Continental Divide Experts",
    elevation: "9,052 ft",
    region: "Fraser Valley",
    image: images.townWinterPark,
    description: "Mastering roofing challenges at the Continental Divide. At 9,052 feet elevation in the Fraser Valley, we specialize in extreme high-altitude conditions where standard construction methods fail and engineering precision is essential for survival.",
    stats: [
      { label: "Feet Elevation", value: "9,052", color: "text-blue-400" },
      { label: "Inches Snow/Year", value: "367", color: "text-cyan-400" },
      { label: "Emergency Response", value: "60 Min", color: "text-purple-400" },
      { label: "Record Low", value: "-40°F", color: "text-indigo-400" },
    ],
    environment: {
      title: "Continental Divide Roofing Challenges",
      intro: "Winter Park's position on the Continental Divide creates the most challenging roofing environment in Colorado.",
      challenges: [
        {
          title: "Extreme High-Altitude Effects",
          description: "At over 9,000 feet, atmospheric pressure is 30% lower than sea level.",
          items: [
            "Reduced air density effects",
            "Material performance challenges",
            "Adhesive bonding issues",
            "Worker efficiency impacts",
          ],
        },
        {
          title: "Fraser Valley Extreme Conditions",
          description: "Continental weather patterns create unpredictable and extreme conditions.",
          items: [
            "Town elevation: 9,052 feet",
            "Continental Divide: 11,300+ feet",
            "Atmospheric pressure: 70% of sea level",
            "Wind tunnel effects: 80+ mph sustained",
          ],
        },
      ],
      sidebarTitle: "Extreme Data",
      sidebarData: [
        {
          category: "Elevation Statistics",
          items: [
            "Town elevation: 9,052 ft",
            "Ski base: 9,000+ ft",
            "Continental Divide: 11,300+ ft",
            "Atmospheric pressure: 70% sea level",
          ],
        },
        {
          category: "Extreme Weather",
          items: [
            "Record low: -47°F",
            "Winter avg: -15°F to -25°F",
            "Wind gusts: 130+ mph",
            "Daily swings: 50°F+",
          ],
        },
      ],
    },
    services: [
      {
        icon: "🏔️",
        title: "Extreme Altitude Engineering",
        description: "Specialized solutions accounting for reduced atmospheric pressure",
        items: [
          "High-altitude material selection",
          "Pressure-adjusted adhesive systems",
          "Worker safety protocols",
          "Equipment performance modifications",
        ],
      },
      {
        icon: "💨",
        title: "Wind Tunnel Resistance",
        description: "Advanced systems for Fraser Valley's unique wind effects",
        items: [
          "Aerodynamic design optimization",
          "Enhanced fastening systems",
          "Wind load calculations: 150+ mph",
          "Turbulence mitigation strategies",
        ],
      },
      {
        icon: "❄️",
        title: "Continental Snow Systems",
        description: "Snow management for Continental Divide accumulation patterns",
        items: [
          "Continental drift modeling",
          "Extended-season load bearing",
          "Automated monitoring systems",
          "Emergency load relief protocols",
        ],
      },
    ],
    projects: [
      {
        title: "Winter Park Resort Village",
        description: "Multi-building resort complex featuring extreme wind-resistant systems",
        specs: ["Elevation: 9,000+ ft", "Wind Rating: 150+ mph", "Completion: 2022"],
      },
      {
        title: "Fraser Valley Research Station",
        description: "High-altitude atmospheric research facility with specialized controls",
        specs: ["Elevation: 9,200 ft", "Purpose: Atmospheric research", "Challenge: Sensitive equipment"],
      },
      {
        title: "Continental Divide Residence",
        description: "Ultra-high altitude private residence at 10,800 feet",
        specs: ["Elevation: 10,800 ft", "Access: Helicopter only", "Record: Highest altitude project"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Assessment Phase",
        items: [
          "Winter damage evaluation",
          "Emergency repairs",
          "Summer project planning",
          "Material pre-positioning",
        ],
      },
      {
        season: "Summer",
        title: "Construction Season",
        items: [
          "Major installations",
          "Resort renovations",
          "Preventive maintenance",
          "System upgrades",
        ],
      },
      {
        season: "Fall",
        title: "Preparation Phase",
        items: [
          "Final inspections",
          "Snow retention installation",
          "Heating system activation",
          "Emergency prep protocols",
        ],
      },
      {
        season: "Winter",
        title: "Emergency Operations",
        items: [
          "60-minute response time",
          "Helicopter-assisted response",
          "Continuous monitoring",
          "Automated alert systems",
        ],
      },
    ],
    emergency: [
      {
        icon: "🚁",
        title: "60-Minute Response",
        description: "Rapid helicopter-assisted emergency response",
        items: [
          "Extreme altitude rescue",
          "Specialized equipment",
          "Trained high-altitude crews",
          "24/7 availability",
        ],
      },
      {
        icon: "🎯",
        title: "Altitude Specialists",
        description: "Specialized high-altitude rescue and repair teams",
        items: [
          "Extreme elevation training",
          "Safety protocols",
          "Emergency operations",
          "Rapid response capability",
        ],
      },
      {
        icon: "📞",
        title: "24/7 Monitoring",
        description: "Continuous weather and structural monitoring",
        items: [
          "Real-time weather monitoring",
          "Snow load measurement",
          "Structural stress monitoring",
          "Automated alert systems",
        ],
      },
    ],
    cta: {
      headline: "Master the Continental Divide",
      subheading: "Don't trust your Winter Park property to contractors who don't understand extreme altitude challenges. Our Continental Divide expertise ensures your roof performs flawlessly.",
      buttons: [
        { text: "Schedule High-Altitude Assessment", link: "/contact" },
        { text: "View Altitude Guide", link: "/services" },
      ],
    },
  },
  {
    id: "glenwood-springs",
    name: "Glenwood Springs",
    slug: "glenwood-springs",
    tagline: "Gateway Roofing Authority",
    elevation: "5,761 ft",
    region: "Western Slope",
    image: images.townGlenwood,
    description: "Serving Glenwood Springs' unique geothermal environment and gateway location. At 5,761 feet in the Roaring Fork Valley, we deliver specialized roofing solutions that account for natural hot springs effects and the region's distinct climate.",
    stats: [
      { label: "Feet Elevation", value: "5,761", color: "text-orange-400" },
      { label: "Annual Snowfall", value: "60-80 in", color: "text-blue-300" },
      { label: "Geothermal Effects", value: "Active", color: "text-red-400" },
      { label: "Emergency Response", value: "45 Min", color: "text-purple-400" },
    ],
    environment: {
      title: "Gateway Roofing Environment",
      intro: "Glenwood Springs represents a unique roofing environment where geothermal activity and lower elevation create distinct challenges.",
      challenges: [
        {
          title: "Geothermal Considerations",
          description: "Natural hot springs create unique microclimates and moisture management challenges.",
          items: [
            "Hot springs proximity effects",
            "Elevated humidity levels",
            "Thermal bridging considerations",
            "Specialized ventilation needs",
          ],
        },
        {
          title: "Gateway Climate Conditions",
          description: "Lower elevation with moderate snow and distinct seasonal patterns.",
          items: [
            "Elevation: 5,761 feet",
            "Winter lows: 10°F to 20°F",
            "Summer highs: 85°F to 90°F",
            "Annual snowfall: 60-80 inches",
          ],
        },
      ],
      sidebarTitle: "Climate Data",
      sidebarData: [
        {
          category: "Temperature Patterns",
          items: [
            "Winter lows: 10°F to 20°F",
            "Summer highs: 85°F to 90°F",
            "Moderate freeze-thaw cycles",
            "Geothermal warming zones",
          ],
        },
        {
          category: "Precipitation & Snow",
          items: [
            "Annual snowfall: 60-80 inches",
            "Moderate snow loads",
            "Roaring Fork Valley location",
            "Western slope weather patterns",
          ],
        },
      ],
    },
    services: [
      {
        icon: "♨️",
        title: "Geothermal-Aware Design",
        description: "Specialized roofing accounting for hot springs effects",
        items: [
          "Moisture management enhancement",
          "Thermal bridging solutions",
          "Specialized ventilation systems",
          "Humidity-resistant materials",
        ],
      },
      {
        icon: "🏨",
        title: "Hospitality & Tourism",
        description: "Roofing for gateway town resort and hospitality properties",
        items: [
          "Hotel Colorado and historic properties",
          "Resort facility roofing",
          "Guest experience optimization",
          "Seasonal property management",
        ],
      },
      {
        icon: "🏞️",
        title: "Gateway Integration",
        description: "Roofing solutions for gateway location properties",
        items: [
          "Glenwood Canyon properties",
          "Residential and commercial mix",
          "Tourism infrastructure",
          "Mountain gateway aesthetics",
        ],
      },
    ],
    projects: [
      {
        title: "Hotel Colorado Historic Restoration",
        description: "Iconic historic hotel with specialized geothermal considerations",
        specs: ["Built: 1889", "Status: Historic landmark", "Challenge: Geothermal effects"],
      },
      {
        title: "Glenwood Springs Resort Complex",
        description: "Modern resort facility with integrated hot springs considerations",
        specs: ["Type: Resort complex", "Features: Thermal management", "Completion: Recent"],
      },
      {
        title: "Roaring Fork Valley Residences",
        description: "Luxury mountain homes with geothermal-aware roofing systems",
        specs: ["Location: Valley floor", "Challenge: Moisture management", "Type: Residential"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Assessment Phase",
        items: [
          "Winter damage evaluation",
          "Spring maintenance",
          "Summer project planning",
          "Material preparation",
        ],
      },
      {
        season: "Summer",
        title: "Construction Season",
        items: [
          "Major installations",
          "Resort renovations",
          "Preventive maintenance",
          "System upgrades",
        ],
      },
      {
        season: "Fall",
        title: "Preparation Phase",
        items: [
          "Final inspections",
          "Winter preparation",
          "Heating system checks",
          "Emergency readiness",
        ],
      },
      {
        season: "Winter",
        title: "Monitoring Period",
        items: [
          "45-minute response time",
          "Weather monitoring",
          "Preventive maintenance",
          "Emergency availability",
        ],
      },
    ],
    emergency: [
      {
        icon: "⚡",
        title: "45-Minute Response",
        description: "Rapid emergency response in Glenwood Springs area",
        items: [
          "Storm damage assessment",
          "Immediate temporary repairs",
          "Insurance documentation",
          "24/7 availability",
        ],
      },
      {
        icon: "🛡️",
        title: "Geothermal Expertise",
        description: "Specialized response accounting for hot springs effects",
        items: [
          "Moisture management expertise",
          "Thermal considerations",
          "Humidity solutions",
          "Historic property knowledge",
        ],
      },
      {
        icon: "📋",
        title: "Seasonal Monitoring",
        description: "Proactive inspections and monitoring",
        items: [
          "Pre-season inspections",
          "Moisture monitoring",
          "Preventive maintenance",
          "Weather alert system",
        ],
      },
    ],
    cta: {
      headline: "Protect Your Gateway Property",
      subheading: "Trust Glenwood Springs' roofing specialists with your property. Our expertise in geothermal considerations and gateway location challenges ensures optimal performance.",
      buttons: [
        { text: "Schedule Gateway Assessment", link: "/contact" },
        { text: "Learn About Geothermal Solutions", link: "/services" },
      ],
    },
  },
  {
    id: "frisco",
    name: "Frisco",
    slug: "frisco",
    tagline: "Summit County Central Hub",
    elevation: "9,097 ft",
    region: "Summit County",
    image: images.townFrisco,
    description: "Serving Frisco's central Summit County location with expert roofing solutions. At 9,097 feet overlooking Dillon Reservoir, we deliver high-altitude roofing for the gateway to Colorado's premier ski country.",
    stats: [
      { label: "Feet Elevation", value: "9,097", color: "text-blue-400" },
      { label: "Annual Snowfall", value: "200-250 in", color: "text-cyan-400" },
      { label: "Hub Location", value: "5 Ski Areas", color: "text-purple-400" },
      { label: "Emergency Response", value: "45 Min", color: "text-indigo-400" },
    ],
    environment: {
      title: "Summit County Central Hub",
      intro: "Frisco's central location in Summit County makes it the gateway to Colorado's premier ski country.",
      challenges: [
        {
          title: "High-Altitude Central Location",
          description: "Gateway to five major ski areas with moderate-to-heavy snow loads.",
          items: [
            "Elevation: 9,097 feet",
            "Central Summit County location",
            "Dillon Reservoir proximity",
            "Highway 9 corridor location",
          ],
        },
        {
          title: "Summit County Climate",
          description: "High elevation with significant snow and freeze-thaw cycles.",
          items: [
            "Winter lows: -15°F to -25°F",
            "Summer highs: 75°F to 82°F",
            "Annual snowfall: 200-250 inches",
            "Freeze-thaw cycles: 180+ annually",
          ],
        },
      ],
      sidebarTitle: "Climate Data",
      sidebarData: [
        {
          category: "Elevation & Location",
          items: [
            "Elevation: 9,097 ft",
            "Central Summit County",
            "Dillon Reservoir location",
            "Gateway to 5 ski areas",
          ],
        },
        {
          category: "Weather Conditions",
          items: [
            "Winter lows: -15°F to -25°F",
            "Summer highs: 75°F to 82°F",
            "Annual snowfall: 200-250 inches",
            "Moderate snow loads: 60-80 psf",
          ],
        },
      ],
    },
    services: [
      {
        icon: "🏔️",
        title: "High-Altitude Engineering",
        description: "Specialized roofing for high-elevation Summit County properties",
        items: [
          "High-altitude material selection",
          "Moderate snow load systems",
          "Altitude performance optimization",
          "Residential and commercial solutions",
        ],
      },
      {
        icon: "🎿",
        title: "Ski Area Gateway",
        description: "Roofing for properties serving five major ski areas",
        items: [
          "Resort property systems",
          "Hospitality-grade roofing",
          "Seasonal property management",
          "Commercial facility roofing",
        ],
      },
      {
        icon: "💧",
        title: "Reservoir Considerations",
        description: "Specialized solutions accounting for Dillon Reservoir proximity",
        items: [
          "Moisture management",
          "Wind pattern considerations",
          "Water reflection effects",
          "Microclimate adaptation",
        ],
      },
    ],
    projects: [
      {
        title: "Frisco Resort Community",
        description: "Mixed-use resort community with diverse roofing requirements",
        specs: ["Type: Resort community", "Elevation: 9,097 ft", "Ski access: 5 areas"],
      },
      {
        title: "Dillon Reservoir Properties",
        description: "Lakeside residences with specialized moisture management",
        specs: ["Location: Reservoir proximity", "Challenge: Moisture/wind", "Type: Residential"],
      },
      {
        title: "Summit County Commercial",
        description: "Commercial and hospitality properties in central hub",
        specs: ["Type: Commercial mix", "Location: Highway 9", "Challenge: High altitude"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Assessment Phase",
        items: [
          "Winter damage evaluation",
          "Spring maintenance",
          "Summer project planning",
          "Material preparation",
        ],
      },
      {
        season: "Summer",
        title: "Construction Season",
        items: [
          "Major installations",
          "Resort renovations",
          "Preventive maintenance",
          "System upgrades",
        ],
      },
      {
        season: "Fall",
        title: "Preparation Phase",
        items: [
          "Final inspections",
          "Winter preparation",
          "Snow retention installation",
          "Emergency readiness",
        ],
      },
      {
        season: "Winter",
        title: "Monitoring Period",
        items: [
          "45-minute response time",
          "Weather monitoring",
          "Snow load tracking",
          "Emergency availability",
        ],
      },
    ],
    emergency: [
      {
        icon: "⚡",
        title: "45-Minute Response",
        description: "Rapid emergency response in Frisco area",
        items: [
          "Storm damage assessment",
          "Immediate temporary repairs",
          "Insurance documentation",
          "24/7 availability",
        ],
      },
      {
        icon: "🛡️",
        title: "Hub Location Expertise",
        description: "Specialized response for central Summit County",
        items: [
          "High-altitude expertise",
          "Resort property knowledge",
          "Seasonal property management",
          "Commercial facility experience",
        ],
      },
      {
        icon: "📋",
        title: "Seasonal Monitoring",
        description: "Proactive inspections and monitoring",
        items: [
          "Pre-season inspections",
          "Snow load monitoring",
          "Preventive maintenance",
          "Weather alert system",
        ],
      },
    ],
    cta: {
      headline: "Protect Your Summit County Property",
      subheading: "Trust Frisco's roofing specialists with your property. Our expertise in high-altitude engineering and central hub location ensures optimal performance.",
      buttons: [
        { text: "Schedule Summit Assessment", link: "/contact" },
        { text: "View Technical Guide", link: "/services" },
      ],
    },
  },
  {
    id: "silverthorne",
    name: "Silverthorne",
    slug: "silverthorne",
    tagline: "Modern Mountain Engineering",
    elevation: "8,790 ft",
    region: "Summit County",
    image: images.townSilverthorne,
    description: "Modern mountain engineering for Silverthorne's contemporary alpine community. At 8,790 feet in Summit County, we deliver premium roofing solutions for modern mountain homes and commercial properties.",
    stats: [
      { label: "Feet Elevation", value: "8,790", color: "text-teal-400" },
      { label: "Annual Snowfall", value: "158 in", color: "text-cyan-400" },
      { label: "Sunny Days/Year", value: "247", color: "text-yellow-400" },
      { label: "Emergency Response", value: "45 Min", color: "text-purple-400" },
    ],
    environment: {
      title: "Modern Mountain Engineering",
      intro: "Silverthorne's contemporary architecture and modern mountain community require specialized roofing solutions.",
      challenges: [
        {
          title: "Modern Construction Standards",
          description: "Contemporary mountain architecture with high-performance requirements.",
          items: [
            "Modern building standards",
            "Contemporary material systems",
            "High-altitude engineering",
            "Aesthetic integration",
          ],
        },
        {
          title: "Summit County Climate",
          description: "High elevation with moderate snow and abundant sunshine.",
          items: [
            "Elevation: 8,790 feet",
            "Winter lows: -15°F to -25°F",
            "Summer highs: 75°F to 82°F",
            "Annual snowfall: 158 inches",
          ],
        },
      ],
      sidebarTitle: "Climate Data",
      sidebarData: [
        {
          category: "Location & Elevation",
          items: [
            "Elevation: 8,790 ft",
            "Summit County location",
            "Blue River Valley",
            "Gore Range views",
          ],
        },
        {
          category: "Weather Patterns",
          items: [
            "Winter lows: -15°F to -25°F",
            "Summer highs: 75°F to 82°F",
            "Annual snowfall: 158 inches",
            "247 sunny days per year",
          ],
        },
      ],
    },
    services: [
      {
        icon: "🏗️",
        title: "Modern Material Systems",
        description: "Contemporary roofing for modern mountain architecture",
        items: [
          "Modern material selection",
          "High-performance systems",
          "Contemporary aesthetics",
          "Energy-efficient solutions",
        ],
      },
      {
        icon: "🏘️",
        title: "Residential & Commercial",
        description: "Roofing for modern mountain homes and commercial properties",
        items: [
          "Residential estates",
          "Commercial properties",
          "Retail facilities",
          "Mixed-use developments",
        ],
      },
      {
        icon: "⛰️",
        title: "Alpine Community Integration",
        description: "Roofing solutions reflecting modern mountain community values",
        items: [
          "Outdoor recreation focus",
          "Environmental considerations",
          "Community aesthetics",
          "Sustainable practices",
        ],
      },
    ],
    projects: [
      {
        title: "Silverthorne Modern Estate",
        description: "Contemporary luxury home with high-performance roofing systems",
        specs: ["Type: Residential", "Elevation: 8,790 ft", "Style: Modern mountain"],
      },
      {
        title: "Blue River Commercial",
        description: "Modern commercial properties with contemporary roofing",
        specs: ["Type: Commercial", "Location: Blue River Valley", "Challenge: Modern standards"],
      },
      {
        title: "Summit County Retail",
        description: "Modern retail and hospitality properties",
        specs: ["Type: Commercial mix", "Location: Silverthorne", "Challenge: High altitude"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Assessment Phase",
        items: [
          "Winter damage evaluation",
          "Spring maintenance",
          "Summer project planning",
          "Material preparation",
        ],
      },
      {
        season: "Summer",
        title: "Construction Season",
        items: [
          "Major installations",
          "Property renovations",
          "Preventive maintenance",
          "System upgrades",
        ],
      },
      {
        season: "Fall",
        title: "Preparation Phase",
        items: [
          "Final inspections",
          "Winter preparation",
          "Snow retention installation",
          "Emergency readiness",
        ],
      },
      {
        season: "Winter",
        title: "Monitoring Period",
        items: [
          "45-minute response time",
          "Weather monitoring",
          "Snow load tracking",
          "Emergency availability",
        ],
      },
    ],
    emergency: [
      {
        icon: "⚡",
        title: "45-Minute Response",
        description: "Rapid emergency response in Silverthorne area",
        items: [
          "Storm damage assessment",
          "Immediate temporary repairs",
          "Insurance documentation",
          "24/7 availability",
        ],
      },
      {
        icon: "🛡️",
        title: "Modern Property Expertise",
        description: "Specialized response for contemporary properties",
        items: [
          "Modern system knowledge",
          "High-performance materials",
          "Contemporary aesthetics",
          "Energy-efficient solutions",
        ],
      },
      {
        icon: "📋",
        title: "Seasonal Monitoring",
        description: "Proactive inspections and monitoring",
        items: [
          "Pre-season inspections",
          "Snow load monitoring",
          "Preventive maintenance",
          "Weather alert system",
        ],
      },
    ],
    cta: {
      headline: "Protect Your Modern Mountain Home",
      subheading: "Trust Silverthorne's roofing specialists with your property. Our expertise in modern engineering and contemporary aesthetics ensures optimal performance.",
      buttons: [
        { text: "Schedule Modern Assessment", link: "/contact" },
        { text: "View Technical Guide", link: "/services" },
      ],
    },
  },
  {
    id: "central-mountains",
    name: "Central Mountains",
    slug: "central-mountains",
    tagline: "Multi-Peak Coverage",
    elevation: "Varies",
    region: "Central Rockies",
    image: images.townCentralMountains,
    description: "Serving the diverse communities of Colorado's central mountain region. From mountain passes to alpine valleys, we deliver specialized roofing solutions across the broader central mountain communities.",
    stats: [
      { label: "Elevation Range", value: "8,500-10,000 ft", color: "text-green-400" },
      { label: "Coverage Area", value: "Multi-Peak", color: "text-emerald-400" },
      { label: "Communities", value: "10+", color: "text-teal-400" },
      { label: "Emergency Response", value: "60 Min", color: "text-purple-400" },
    ],
    environment: {
      title: "Central Mountain Region Coverage",
      intro: "The central mountains represent Colorado's diverse alpine communities, each with unique roofing challenges.",
      challenges: [
        {
          title: "Diverse Elevation Challenges",
          description: "Coverage area spans from 8,500 to 10,000+ feet with varying climate conditions.",
          items: [
            "Keystone Resort area",
            "Dillon and Montcalm",
            "Tenmile Canyon",
            "Copper Mountain area",
          ],
        },
        {
          title: "Central Mountain Climate",
          description: "High elevation with significant snow and diverse weather patterns.",
          items: [
            "Winter lows: -15°F to -20°F",
            "Summer highs: 75°F to 82°F",
            "Annual snowfall: 200-300 inches",
            "Freeze-thaw cycles: 180-220 annually",
          ],
        },
      ],
      sidebarTitle: "Regional Data",
      sidebarData: [
        {
          category: "Elevation & Location",
          items: [
            "Elevation range: 8,500-10,000+ ft",
            "Multiple ski resort areas",
            "Tenmile Range geography",
            "Mountain pass locations",
          ],
        },
        {
          category: "Weather Patterns",
          items: [
            "Winter lows: -15°F to -20°F",
            "Summer highs: 75°F to 82°F",
            "Annual snowfall: 200-300 inches",
            "Heavy snow loads: 80-120 psf",
          ],
        },
      ],
    },
    services: [
      {
        icon: "🏔️",
        title: "Diverse Elevation Solutions",
        description: "Specialized roofing for varied elevation and climate zones",
        items: [
          "Multi-elevation engineering",
          "Diverse property types",
          "Varied snow load systems",
          "Regional expertise",
        ],
      },
      {
        icon: "🎿",
        title: "Resort & Residential",
        description: "Roofing for resort, residential, and commercial properties",
        items: [
          "Resort-grade systems",
          "Residential estates",
          "Commercial facilities",
          "Mixed-use developments",
        ],
      },
      {
        icon: "🗻",
        title: "Multi-Peak Expertise",
        description: "Comprehensive coverage across central mountain communities",
        items: [
          "Keystone Resort area",
          "Copper Mountain region",
          "Tenmile Canyon",
          "Snake River area",
        ],
      },
    ],
    projects: [
      {
        title: "Keystone Resort Complex",
        description: "Multi-building resort with diverse roofing requirements",
        specs: ["Type: Resort complex", "Elevation: 9,000+ ft", "Coverage: Multi-peak"],
      },
      {
        title: "Central Mountain Residences",
        description: "Luxury homes across central mountain communities",
        specs: ["Type: Residential", "Elevation: Varies", "Challenge: Multi-elevation"],
      },
      {
        title: "Commercial Mountain Properties",
        description: "Commercial and hospitality properties across region",
        specs: ["Type: Commercial mix", "Coverage: Multi-community", "Challenge: Diverse elevations"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Assessment Phase",
        items: [
          "Winter damage evaluation",
          "Spring maintenance",
          "Summer project planning",
          "Material preparation",
        ],
      },
      {
        season: "Summer",
        title: "Construction Season",
        items: [
          "Major installations",
          "Property renovations",
          "Preventive maintenance",
          "System upgrades",
        ],
      },
      {
        season: "Fall",
        title: "Preparation Phase",
        items: [
          "Final inspections",
          "Winter preparation",
          "Snow retention installation",
          "Emergency readiness",
        ],
      },
      {
        season: "Winter",
        title: "Monitoring Period",
        items: [
          "60-minute response time",
          "Weather monitoring",
          "Snow load tracking",
          "Emergency availability",
        ],
      },
    ],
    emergency: [
      {
        icon: "⚡",
        title: "60-Minute Response",
        description: "Rapid emergency response across central mountains",
        items: [
          "Storm damage assessment",
          "Immediate temporary repairs",
          "Insurance documentation",
          "24/7 availability",
        ],
      },
      {
        icon: "🛡️",
        title: "Regional Expertise",
        description: "Specialized response across diverse communities",
        items: [
          "Multi-elevation knowledge",
          "Resort property experience",
          "Residential expertise",
          "Commercial facility knowledge",
        ],
      },
      {
        icon: "📋",
        title: "Seasonal Monitoring",
        description: "Proactive inspections and monitoring",
        items: [
          "Pre-season inspections",
          "Snow load monitoring",
          "Preventive maintenance",
          "Weather alert system",
        ],
      },
    ],
    cta: {
      headline: "Protect Your Central Mountain Property",
      subheading: "Trust the central mountains' roofing specialists with your property. Our expertise across diverse elevations and communities ensures optimal performance.",
      buttons: [
        { text: "Schedule Regional Assessment", link: "/contact" },
        { text: "View Technical Guide", link: "/services" },
      ],
    },
  },
  {
    id: "breckenridge",
    name: "Breckenridge",
    slug: "breckenridge",
    tagline: "High-Altitude Luxury Specialists",
    elevation: "9,600 ft",
    region: "Summit County",
    image: images.townBreckenridge,
    description: "Engineering roofing for Colorado's highest incorporated city. At 9,600 feet base elevation with peaks reaching 12,998 feet, we deliver luxury roofing solutions engineered for extreme alpine conditions.",
    stats: [
      { label: "Feet Elevation", value: "9,600", color: "text-indigo-400" },
      { label: "Annual Snowfall", value: "300", color: "text-cyan-400" },
      { label: "Peak Elevation", value: "12,998 ft", color: "text-blue-400" },
      { label: "Emergency Response", value: "60 Min", color: "text-purple-400" },
    ],
    environment: {
      title: "High-Altitude Luxury Environment",
      intro: "Breckenridge represents Colorado's highest incorporated city with extreme altitude and luxury market demands.",
      challenges: [
        {
          title: "Extreme Altitude Engineering",
          description: "At 9,600 feet base with peaks reaching 12,998 feet, altitude challenges are paramount.",
          items: [
            "Base elevation: 9,600 feet",
            "Summit: 12,998 feet",
            "Extreme altitude effects",
            "Specialized engineering required",
          ],
        },
        {
          title: "Breckenridge Climate",
          description: "Heavy snow loads and extended winter season.",
          items: [
            "Winter lows: -15°F to -25°F",
            "Summer highs: 75°F to 82°F",
            "Annual snowfall: 300 inches",
            "Snow season: October through May",
          ],
        },
      ],
      sidebarTitle: "Altitude Data",
      sidebarData: [
        {
          category: "Elevation Statistics",
          items: [
            "Base elevation: 9,600 ft",
            "Summit: 12,998 ft",
            "Highest incorporated city",
            "Extreme altitude effects",
          ],
        },
        {
          category: "Weather Extremes",
          items: [
            "Winter lows: -15°F to -25°F",
            "Summer highs: 75°F to 82°F",
            "Annual snowfall: 300 inches",
            "Snow season: 8+ months",
          ],
        },
      ],
    },
    services: [
      {
        icon: "🏔️",
        title: "Extreme Altitude Engineering",
        description: "Specialized solutions for Colorado's highest city",
        items: [
          "High-altitude material selection",
          "Extreme elevation optimization",
          "Altitude performance testing",
          "Specialized installation methods",
        ],
      },
      {
        icon: "👑",
        title: "Luxury Property Systems",
        description: "Premium roofing for Breckenridge's luxury market",
        items: [
          "Ultra-premium materials",
          "Custom fabrication",
          "Architectural integration",
          "Lifetime warranties",
        ],
      },
      {
        icon: "🏛️",
        title: "Historic District Expertise",
        description: "Specialized restoration for Victorian mining-era buildings",
        items: [
          "Period-authentic materials",
          "Historic preservation",
          "Custom millwork",
          "National standards compliance",
        ],
      },
    ],
    projects: [
      {
        title: "Breckenridge Luxury Estate",
        description: "Ultra-high altitude luxury residence with premium roofing",
        specs: ["Elevation: 9,600+ ft", "Type: Luxury residential", "Material: Premium systems"],
      },
      {
        title: "Peak 8 Resort Facilities",
        description: "Resort facilities at extreme elevation with specialized systems",
        specs: ["Elevation: 11,000+ ft", "Type: Resort", "Challenge: Extreme altitude"],
      },
      {
        title: "Historic Victorian District",
        description: "Preservation of historic mining-era buildings",
        specs: ["Era: Mining heritage", "Type: Historic", "Challenge: Preservation"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Assessment Phase",
        items: [
          "Winter damage evaluation",
          "Spring maintenance",
          "Summer project planning",
          "Material preparation",
        ],
      },
      {
        season: "Summer",
        title: "Construction Season",
        items: [
          "Major installations",
          "Resort renovations",
          "Preventive maintenance",
          "System upgrades",
        ],
      },
      {
        season: "Fall",
        title: "Preparation Phase",
        items: [
          "Final inspections",
          "Winter preparation",
          "Snow retention installation",
          "Emergency readiness",
        ],
      },
      {
        season: "Winter",
        title: "Monitoring Period",
        items: [
          "60-minute response time",
          "Weather monitoring",
          "Snow load tracking",
          "Emergency availability",
        ],
      },
    ],
    emergency: [
      {
        icon: "⚡",
        title: "60-Minute Response",
        description: "Rapid emergency response in Breckenridge area",
        items: [
          "Storm damage assessment",
          "Immediate temporary repairs",
          "Insurance documentation",
          "24/7 availability",
        ],
      },
      {
        icon: "🛡️",
        title: "Altitude Specialists",
        description: "Specialized response for extreme elevation",
        items: [
          "High-altitude expertise",
          "Luxury property knowledge",
          "Historic preservation",
          "Extreme weather capability",
        ],
      },
      {
        icon: "📋",
        title: "Seasonal Monitoring",
        description: "Proactive inspections and monitoring",
        items: [
          "Pre-season inspections",
          "Snow load monitoring",
          "Preventive maintenance",
          "Weather alert system",
        ],
      },
    ],
    cta: {
      headline: "Protect Your Breckenridge Investment",
      subheading: "Trust Colorado's highest city's roofing specialists with your property. Our expertise in extreme altitude engineering ensures optimal performance.",
      buttons: [
        { text: "Schedule Altitude Assessment", link: "/contact" },
        { text: "View Technical Guide", link: "/services" },
      ],
    },
  },
  {
    id: "durango",
    name: "Durango",
    slug: "durango",
    tagline: "Southern Colorado Heritage Specialists",
    elevation: "6,512 ft",
    region: "San Juan Region",
    image: images.townDurango,
    description: "Serving Durango's diverse market with heritage expertise. At 6,512 feet in the Animas River Valley, we deliver roofing solutions that honor the Old West character while providing modern performance.",
    stats: [
      { label: "Feet Elevation", value: "6,512", color: "text-amber-400" },
      { label: "Annual Snowfall", value: "71 in", color: "text-blue-300" },
      { label: "Four-Season", value: "Climate", color: "text-green-400" },
      { label: "Emergency Response", value: "60 Min", color: "text-purple-400" },
    ],
    environment: {
      title: "Southern Colorado Heritage Environment",
      intro: "Durango represents southern Colorado's unique blend of historic heritage and modern mountain living.",
      challenges: [
        {
          title: "Heritage & Modern Balance",
          description: "Lower elevation with moderate snow and diverse property types.",
          items: [
            "Historic mining town heritage",
            "Modern mountain development",
            "Diverse market segments",
            "Gateway to San Juan Mountains",
          ],
        },
        {
          title: "Animas Valley Climate",
          description: "Mild winters with moderate snowfall and four-season climate.",
          items: [
            "Elevation: 6,512 feet",
            "Winter lows: 10°F to 20°F",
            "Summer highs: 85°F to 92°F",
            "Annual snowfall: 71 inches",
          ],
        },
      ],
      sidebarTitle: "Climate Data",
      sidebarData: [
        {
          category: "Location & Elevation",
          items: [
            "Elevation: 6,512 ft",
            "Animas River Valley",
            "Southern Colorado",
            "San Juan gateway",
          ],
        },
        {
          category: "Weather Patterns",
          items: [
            "Winter lows: 10°F to 20°F",
            "Summer highs: 85°F to 92°F",
            "Annual snowfall: 71 inches",
            "Moderate freeze-thaw cycles",
          ],
        },
      ],
    },
    services: [
      {
        icon: "🏛️",
        title: "Historic Preservation",
        description: "Specialized restoration for Durango's heritage buildings",
        items: [
          "Victorian mining-era restoration",
          "Historic preservation standards",
          "Period-authentic materials",
          "Custom fabrication",
        ],
      },
      {
        icon: "🏘️",
        title: "Residential & Commercial",
        description: "Roofing for diverse market segments",
        items: [
          "Residential estates",
          "Commercial properties",
          "Agricultural facilities",
          "Tourism infrastructure",
        ],
      },
      {
        icon: "🚂",
        title: "Gateway Integration",
        description: "Roofing reflecting Durango's heritage and outdoor focus",
        items: [
          "Narrow gauge railroad heritage",
          "Outdoor recreation focus",
          "Tourism property roofing",
          "San Juan gateway aesthetics",
        ],
      },
    ],
    projects: [
      {
        title: "Historic Durango Restoration",
        description: "Victorian mining-era building restoration",
        specs: ["Type: Historic", "Era: Mining heritage", "Challenge: Preservation"],
      },
      {
        title: "Animas Valley Residences",
        description: "Modern mountain homes with heritage aesthetics",
        specs: ["Type: Residential", "Location: Valley", "Style: Heritage-modern"],
      },
      {
        title: "Durango Commercial",
        description: "Commercial and hospitality properties",
        specs: ["Type: Commercial mix", "Location: Durango", "Challenge: Heritage integration"],
      },
    ],
    seasonal: [
      {
        season: "Spring",
        title: "Assessment Phase",
        items: [
          "Winter damage evaluation",
          "Spring maintenance",
          "Summer project planning",
          "Material preparation",
        ],
      },
      {
        season: "Summer",
        title: "Construction Season",
        items: [
          "Major installations",
          "Property renovations",
          "Preventive maintenance",
          "System upgrades",
        ],
      },
      {
        season: "Fall",
        title: "Preparation Phase",
        items: [
          "Final inspections",
          "Winter preparation",
          "Maintenance checks",
          "Emergency readiness",
        ],
      },
      {
        season: "Winter",
        title: "Monitoring Period",
        items: [
          "60-minute response time",
          "Weather monitoring",
          "Preventive maintenance",
          "Emergency availability",
        ],
      },
    ],
    emergency: [
      {
        icon: "⚡",
        title: "60-Minute Response",
        description: "Rapid emergency response in Durango area",
        items: [
          "Storm damage assessment",
          "Immediate temporary repairs",
          "Insurance documentation",
          "24/7 availability",
        ],
      },
      {
        icon: "🛡️",
        title: "Heritage Expertise",
        description: "Specialized response for historic properties",
        items: [
          "Historic preservation knowledge",
          "Period-authentic materials",
          "Heritage building expertise",
          "Modern performance integration",
        ],
      },
      {
        icon: "📋",
        title: "Seasonal Monitoring",
        description: "Proactive inspections and monitoring",
        items: [
          "Pre-season inspections",
          "Preventive maintenance",
          "Weather monitoring",
          "Alert system",
        ],
      },
    ],
    cta: {
      headline: "Protect Your Durango Property",
      subheading: "Trust southern Colorado's roofing specialists with your property. Our expertise in heritage preservation and diverse market segments ensures optimal performance.",
      buttons: [
        { text: "Schedule Heritage Assessment", link: "/contact" },
        { text: "Learn About Our Services", link: "/services" },
      ],
    },
  },
];
