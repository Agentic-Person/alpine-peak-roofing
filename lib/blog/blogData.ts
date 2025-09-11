// Blog posts data for Alpine Peak Roofing

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  publishDate: string;
  featured: boolean;
  tags: string[];
  content?: string; // For full article content
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "DIY vs. Professional Roofing Repairs: What Colorado Homeowners Need to Know",
    slug: "diy-vs-professional-roofing-repairs",
    excerpt: "While DIY projects can be rewarding, roofing repairs in Colorado's harsh mountain climate require professional expertise. Learn when to call the experts and why safety should always come first.",
    image: "/images/blog/blog_1_diy_vs_professional.jpg",
    category: "Safety & Maintenance",
    readTime: "8 min read",
    publishDate: "2024-12-15",
    featured: true,
    tags: ["DIY", "Safety", "Professional Repair", "Colorado Climate"]
  },
  {
    id: 2,
    title: "Post-Storm Roof Inspection: Your Complete Guide for Colorado Homeowners",
    slug: "post-storm-roof-inspection-guide",
    excerpt: "Colorado's severe weather can cause significant roof damage. Our comprehensive guide helps you understand what to look for after storms and when to call for professional inspection.",
    image: "/images/blog/blog_2_post_storm_inspection.jpg",
    category: "Storm Damage",
    readTime: "10 min read",
    publishDate: "2024-12-14",
    featured: true,
    tags: ["Storm Damage", "Inspection", "Hail", "Wind Damage"]
  },
  {
    id: 3,
    title: "Metal Roofing Investment Calculator: Is It Worth It for Your Colorado Home?",
    slug: "metal-roofing-investment-calculator",
    excerpt: "Discover the long-term value of metal roofing in Colorado's challenging climate. Our comprehensive analysis covers costs, benefits, and ROI calculations for mountain homeowners.",
    image: "/images/blog/blog_3_metal_roofing_investment.jpg",
    category: "Metal Roofing",
    readTime: "12 min read",
    publishDate: "2024-12-13",
    featured: true,
    tags: ["Metal Roofing", "Investment", "ROI", "Cost Analysis"]
  },
  {
    id: 4,
    title: "Ice Dams in Colorado: Prevention, Removal, and Long-term Solutions",
    slug: "ice-dams-colorado-prevention-solutions",
    excerpt: "Ice dams are a serious threat to Colorado mountain homes. Learn how to prevent them, safely remove existing dams, and implement long-term solutions for winter protection.",
    image: "/images/blog/blog_4_ice_dams_prevention.jpg",
    category: "Winter Protection",
    readTime: "9 min read",
    publishDate: "2024-12-12",
    featured: true,
    tags: ["Ice Dams", "Winter", "Prevention", "Insulation"]
  },
  {
    id: 5,
    title: "5 Warning Signs Your Colorado Roof Needs Attention Before Winter",
    slug: "roof-warning-signs-before-winter",
    excerpt: "Don't let winter catch you unprepared. Identify these critical warning signs that indicate your roof needs professional attention before Colorado's harsh winter weather arrives.",
    image: "/images/blog/blog_5_roof_warnings.jpg",
    category: "Maintenance",
    readTime: "7 min read",
    publishDate: "2024-12-11",
    featured: true,
    tags: ["Warning Signs", "Winter Prep", "Maintenance", "Inspection"]
  },
  {
    id: 6,
    title: "Attic Ventilation at High Altitude: Colorado's Unique Challenges",
    slug: "attic-ventilation-high-altitude-colorado",
    excerpt: "High-altitude environments present unique ventilation challenges. Learn how proper attic ventilation protects your Colorado mountain home from moisture, ice dams, and energy loss.",
    image: "/images/blog/blog_6_attic_ventilation.jpg",
    category: "Ventilation",
    readTime: "11 min read",
    publishDate: "2024-12-10",
    featured: false,
    tags: ["Ventilation", "High Altitude", "Energy Efficiency", "Moisture Control"]
  },
  {
    id: 7,
    title: "The Most Durable Roofing Materials for Colorado's Harsh Climate",
    slug: "durable-roofing-materials-colorado-climate",
    excerpt: "Colorado's extreme weather demands the toughest roofing materials. Compare metal, composite, and tile options to find the best solution for your mountain home's protection.",
    image: "/images/blog/blog_7_durable_materials.jpg",
    category: "Materials",
    readTime: "10 min read",
    publishDate: "2024-12-09",
    featured: false,
    tags: ["Materials", "Durability", "Climate Resistance", "Comparison"]
  },
  {
    id: 8,
    title: "Why Cheap Roofing Always Fails in Colorado (And Costs More Long-Term)",
    slug: "why-cheap-roofing-fails-colorado",
    excerpt: "Cutting corners on roofing in Colorado's harsh climate is a costly mistake. Learn why quality materials and professional installation save money and protect your investment.",
    image: "/images/blog/blog_8_cheap_roofing_fails.jpg",
    category: "Quality & Value",
    readTime: "8 min read",
    publishDate: "2024-12-08",
    featured: false,
    tags: ["Quality", "Cost Analysis", "Long-term Value", "Professional Installation"]
  },
  {
    id: 9,
    title: "Alpine Peak's 7-Day Roof Replacement Process: What to Expect",
    slug: "alpine-peak-roof-replacement-process",
    excerpt: "Our systematic 7-day roof replacement process ensures quality results with minimal disruption. Learn what happens each day and how we protect your home throughout the project.",
    image: "/images/blog/blog_9_replacement_process.jpg",
    category: "Process",
    readTime: "9 min read",
    publishDate: "2024-12-07",
    featured: false,
    tags: ["Replacement Process", "Timeline", "Project Management", "Quality Control"]
  },
  {
    id: 10,
    title: "Navigating Hail Damage Claims: A Colorado Homeowner's Complete Guide",
    slug: "hail-damage-claims-colorado-guide",
    excerpt: "Colorado leads the nation in hail damage claims. Our comprehensive guide helps you navigate the insurance process, document damage, and ensure fair compensation for repairs.",
    image: "/images/blog/blog_10_hail_claims.jpg",
    category: "Insurance",
    readTime: "13 min read",
    publishDate: "2024-12-06",
    featured: false,
    tags: ["Hail Damage", "Insurance Claims", "Documentation", "Compensation"]
  },
  {
    id: 11,
    title: "Gutter Systems That Actually Work in Colorado's Snow and Ice",
    slug: "gutter-systems-colorado-snow-ice",
    excerpt: "Standard gutters fail in Colorado's harsh winters. Discover high-performance gutter solutions that handle heavy snow loads, prevent ice dams, and protect your home year-round.",
    image: "/images/blog/blog_11_gutter_systems.jpg",
    category: "Gutters",
    readTime: "8 min read",
    publishDate: "2024-12-05",
    featured: false,
    tags: ["Gutters", "Snow Load", "Ice Prevention", "Winter Performance"]
  },
  {
    id: 12,
    title: "Repair vs. Replace: Alpine Peak's 25-Point Assessment System",
    slug: "repair-vs-replace-assessment-system",
    excerpt: "Not every roof problem requires replacement. Our comprehensive 25-point assessment system helps determine the most cost-effective solution for your Colorado home's roofing needs.",
    image: "/images/blog/blog_12_repair_vs_replace.jpg",
    category: "Assessment",
    readTime: "10 min read",
    publishDate: "2024-12-04",
    featured: false,
    tags: ["Assessment", "Repair vs Replace", "Cost Effectiveness", "Decision Making"]
  },
  {
    id: 13,
    title: "Understanding Snow Load Limits: Engineering for Colorado Mountain Homes",
    slug: "snow-load-limits-colorado-mountain-homes",
    excerpt: "Colorado's heavy snow loads require proper engineering calculations. Learn how snow load limits are determined and why professional assessment is crucial for mountain home safety.",
    image: "/images/blog/blog_13_snow_load_limits.jpg",
    category: "Engineering",
    readTime: "11 min read",
    publishDate: "2024-12-03",
    featured: false,
    tags: ["Snow Load", "Engineering", "Safety", "Building Codes"]
  },
  {
    id: 14,
    title: "Metal Roofing Case Studies: Real Colorado Homes, Real Results",
    slug: "metal-roofing-case-studies-colorado",
    excerpt: "See how metal roofing performs in real Colorado conditions. These case studies showcase hail resistance, snow shedding, and long-term durability in mountain environments.",
    image: "/images/blog/blog_14_metal_roofing_case_studies.jpg",
    category: "Case Studies",
    readTime: "12 min read",
    publishDate: "2024-12-02",
    featured: false,
    tags: ["Case Studies", "Metal Roofing", "Performance", "Real Results"]
  },
  {
    id: 15,
    title: "Why Choose a Local Family Business for Your Colorado Roofing Needs",
    slug: "local-family-business-colorado-roofing",
    excerpt: "Local expertise matters in Colorado's unique climate. Discover the advantages of working with a family-owned roofing company that understands mountain weather challenges.",
    image: "/images/blog/blog_15_local_family_business.jpg",
    category: "Company",
    readTime: "6 min read",
    publishDate: "2024-12-01",
    featured: false,
    tags: ["Local Business", "Family Owned", "Community", "Expertise"]
  },
  {
    id: 16,
    title: "AI-Powered Roof Inspections: The Future of Roofing Technology",
    slug: "ai-powered-roof-inspections-technology",
    excerpt: "Alpine Peak Roofing leads with cutting-edge AI technology for precise roof inspections. Learn how artificial intelligence improves accuracy and speeds up the assessment process.",
    image: "/images/blog/blog_16_ai_technology.jpg",
    category: "Technology",
    readTime: "9 min read",
    publishDate: "2024-11-30",
    featured: false,
    tags: ["AI Technology", "Innovation", "Inspection", "Accuracy"]
  },
  {
    id: 17,
    title: "Emergency Roof Repair: 24/7 Response for Colorado Weather Emergencies",
    slug: "emergency-roof-repair-24-7-response",
    excerpt: "When Colorado weather strikes, you need immediate response. Learn about our 24/7 emergency repair services and how we protect your home during severe weather events.",
    image: "/images/blog/blog_17_emergency_repair.jpg",
    category: "Emergency Services",
    readTime: "7 min read",
    publishDate: "2024-11-29",
    featured: false,
    tags: ["Emergency Repair", "24/7 Service", "Weather Response", "Protection"]
  },
  {
    id: 18,
    title: "Alpine Peak's Lifetime Warranty: The Best Protection in the Business",
    slug: "alpine-peak-lifetime-warranty-protection",
    excerpt: "Our lifetime workmanship warranty provides unmatched peace of mind. Learn what's covered, how it works, and why Alpine Peak Roofing offers the best warranties in Colorado.",
    image: "/images/blog/blog_18_warranties.jpg",
    category: "Warranty",
    readTime: "8 min read",
    publishDate: "2024-11-28",
    featured: false,
    tags: ["Warranty", "Protection", "Peace of Mind", "Quality Assurance"]
  }
];

export const categories = [
  "All Posts",
  "Safety & Maintenance", 
  "Storm Damage",
  "Metal Roofing",
  "Winter Protection",
  "Materials",
  "Technology",
  "Insurance",
  "Emergency Services"
];

// Sort blog posts by publish date (newest first)
const sortedBlogPosts = [...blogPosts].sort((a, b) => 
  new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
);

// Get the top 5 newest posts as featured posts
export const featuredPosts = sortedBlogPosts.slice(0, 5);

// Export sorted blog posts as the default export for the grid
export const sortedBlogPostsForGrid = sortedBlogPosts;