/**
 * testimonials.ts — Alpine Peak Roofing
 * Service-specific customer testimonials for ReviewSchema and display
 */

export interface Testimonial {
  name: string;
  location: string;
  rating: number; // 1-5
  date: string; // ISO date
  serviceSlug: string;
  text: string;
  projectType?: string;
}

export const testimonials: Testimonial[] = [
  // ============================================
  // RESIDENTIAL: Complete Roof Replacement
  // ============================================
  {
    name: "Michael & Sarah Henderson",
    location: "Aspen, CO",
    rating: 5,
    date: "2025-11-15",
    serviceSlug: "complete-roof-replacement",
    text: "Alpine Peak replaced our entire roof on our 4,500 sq ft mountain home. The crew was professional, on time every day, and the standing seam metal roof they installed is absolutely stunning. They handled everything from permits to final inspection. Our energy bills dropped 20% the first month.",
    projectType: "Standing Seam Metal Roof",
  },
  {
    name: "Robert Chambers",
    location: "Vail, CO",
    rating: 5,
    date: "2025-09-22",
    serviceSlug: "complete-roof-replacement",
    text: "After 25 years, our cedar shake roof needed a complete replacement. Alpine Peak guided us through material options and we chose a synthetic slate that looks incredible. The project was completed in 6 days despite challenging mountain access. Couldn't be happier with the result.",
    projectType: "Synthetic Slate Replacement",
  },
  {
    name: "Jennifer Walsh",
    location: "Breckenridge, CO",
    rating: 5,
    date: "2025-08-10",
    serviceSlug: "complete-roof-replacement",
    text: "We interviewed four roofing companies and Alpine Peak was the clear winner. Their detailed proposal included 3D renderings of what our new roof would look like. The installation team was meticulous and cleaned up every day. Our neighbors have already asked for their number.",
    projectType: "GAF Timberline HDZ",
  },

  // ============================================
  // RESIDENTIAL: Roof Repairs
  // ============================================
  {
    name: "David & Lisa Thornton",
    location: "Steamboat Springs, CO",
    rating: 5,
    date: "2025-12-03",
    serviceSlug: "roof-repairs",
    text: "We discovered a leak during a heavy snowstorm and called Alpine Peak in a panic. They had someone out the next morning, identified the problem — damaged flashing around our chimney — and had it repaired by afternoon. Fast, professional, and fairly priced.",
    projectType: "Emergency Flashing Repair",
  },
  {
    name: "Patricia Morales",
    location: "Frisco, CO",
    rating: 5,
    date: "2025-10-18",
    serviceSlug: "roof-repairs",
    text: "Several shingles blew off during a windstorm. Alpine Peak matched our existing shingles perfectly and the repair is completely invisible. They also spotted a potential issue with our ridge vent and fixed it preventatively. Great attention to detail.",
    projectType: "Shingle Replacement & Ridge Vent",
  },
  {
    name: "Thomas Keller",
    location: "Winter Park, CO",
    rating: 4,
    date: "2025-07-25",
    serviceSlug: "roof-repairs",
    text: "Had some ice dam damage from last winter that needed repair. Alpine Peak did a thorough inspection, documented everything for our insurance claim, and completed the repairs within a week. The insurance documentation alone saved us thousands.",
    projectType: "Ice Dam Damage Repair",
  },

  // ============================================
  // RESIDENTIAL: New Construction
  // ============================================
  {
    name: "James & Emily Richardson",
    location: "Telluride, CO",
    rating: 5,
    date: "2025-06-14",
    serviceSlug: "new-construction",
    text: "Building our dream home at 9,200 feet required a roofing team that understood mountain construction. Alpine Peak worked seamlessly with our builder, installed a beautiful copper standing seam roof, and stayed on schedule throughout. The roof is the crown jewel of our home.",
    projectType: "Copper Standing Seam",
  },
  {
    name: "Andrew Park",
    location: "Crested Butte, CO",
    rating: 5,
    date: "2025-04-20",
    serviceSlug: "new-construction",
    text: "Our architect recommended Alpine Peak for our new construction project. They provided engineering calculations for our complex roofline and the installation was flawless. Two years in and not a single issue despite extreme weather. Worth every penny.",
    projectType: "Multi-Material Complex Roofline",
  },

  // ============================================
  // RESIDENTIAL: Gutter Systems
  // ============================================
  {
    name: "Karen & Bill Stevens",
    location: "Silverthorne, CO",
    rating: 5,
    date: "2025-11-02",
    serviceSlug: "gutter-systems",
    text: "We had chronic ice dam problems every winter. Alpine Peak installed heated gutters with leaf guards and the difference is night and day. No more ice dams, no more water damage worries. The copper gutters also look fantastic against our stone exterior.",
    projectType: "Heated Copper Gutter System",
  },
  {
    name: "Nancy Chen",
    location: "Glenwood Springs, CO",
    rating: 5,
    date: "2025-09-08",
    serviceSlug: "gutter-systems",
    text: "Our old gutters were constantly clogging with pine needles. Alpine Peak installed seamless aluminum gutters with micro-mesh guards. Haven't had to clean them once in over a year. The drainage system they designed also solved our basement moisture problem.",
    projectType: "Seamless Aluminum with Guards",
  },
  {
    name: "Mark Donovan",
    location: "Durango, CO",
    rating: 5,
    date: "2025-08-15",
    serviceSlug: "gutter-systems",
    text: "After foundation issues caused by poor drainage, we called Alpine Peak. They designed a complete gutter and downspout system that directs water well away from our foundation. Professional installation, clean work, and the system performs perfectly.",
    projectType: "Complete Drainage Solution",
  },

  // ============================================
  // RESIDENTIAL: Ventilation
  // ============================================
  {
    name: "Scott & Diana Palmer",
    location: "Winter Park, CO",
    rating: 5,
    date: "2025-10-05",
    serviceSlug: "ventilation",
    text: "Our attic was 140°F in summer and we had ice dams every winter. Alpine Peak installed a balanced ridge and soffit ventilation system. Summer attic temps dropped to 95°F and we had zero ice dams last winter. Our heating bill decreased noticeably too.",
    projectType: "Ridge & Soffit Ventilation",
  },
  {
    name: "Laura Mitchell",
    location: "Aspen, CO",
    rating: 5,
    date: "2025-07-12",
    serviceSlug: "ventilation",
    text: "We were getting moisture buildup and early signs of mold in our attic. Alpine Peak assessed the situation, installed proper ventilation, and the problem was solved within weeks. They also added insulation baffles to maintain airflow. Extremely knowledgeable team.",
    projectType: "Moisture Control Ventilation",
  },

  // ============================================
  // RESIDENTIAL: Skylights & Solar
  // ============================================
  {
    name: "Chris & Amanda Foster",
    location: "Steamboat Springs, CO",
    rating: 5,
    date: "2025-05-20",
    serviceSlug: "skylights-solar",
    text: "Alpine Peak installed three VELUX skylights in our great room and the transformation is incredible. Natural light floods the space and the views of the mountains are breathtaking. Zero leaks through two seasons of heavy snow. Masterful installation.",
    projectType: "VELUX Skylight Installation",
  },
  {
    name: "Rachel & Tom Nguyen",
    location: "Frisco, CO",
    rating: 5,
    date: "2025-03-15",
    serviceSlug: "skylights-solar",
    text: "We wanted solar panels but were worried about our roof integrity at 9,000 feet. Alpine Peak designed a system that integrates perfectly with our standing seam roof — no penetrations needed. We're generating 80% of our electricity and the installation looks clean and professional.",
    projectType: "Solar Panel Integration",
  },

  // ============================================
  // COMMERCIAL: Flat Roof Systems
  // ============================================
  {
    name: "Mountain Village Resort & Spa",
    location: "Telluride, CO",
    rating: 5,
    date: "2025-08-28",
    serviceSlug: "flat-roof-systems",
    text: "Alpine Peak replaced the flat roof on our 15,000 sq ft resort building with a TPO membrane system. The project was completed on schedule with minimal disruption to our guests. The new roof has performed flawlessly through two heavy snow seasons. Highly recommend for commercial projects.",
    projectType: "TPO Membrane System",
  },
  {
    name: "Summit County Medical Center",
    location: "Frisco, CO",
    rating: 5,
    date: "2025-06-10",
    serviceSlug: "flat-roof-systems",
    text: "Our medical facility needed a roof replacement without disrupting patient care. Alpine Peak worked in sections, maintained a clean and safe environment, and the EPDM system they installed exceeded our specifications. Professional from start to finish.",
    projectType: "EPDM Commercial Replacement",
  },

  // ============================================
  // COMMERCIAL: Metal Roofing
  // ============================================
  {
    name: "Elk Creek Brewing Company",
    location: "Breckenridge, CO",
    rating: 5,
    date: "2025-09-15",
    serviceSlug: "commercial-metal-roofing",
    text: "Our brewery needed a roof that could handle heavy snow loads and look great for our customers. Alpine Peak installed a stunning standing seam metal roof in weathered copper. It's become an architectural feature of our building. Snow slides off perfectly and we've had zero issues.",
    projectType: "Standing Seam Commercial",
  },
  {
    name: "Vail Valley Shopping Center",
    location: "Vail, CO",
    rating: 5,
    date: "2025-07-22",
    serviceSlug: "commercial-metal-roofing",
    text: "Alpine Peak re-roofed our entire shopping center with commercial metal panels. The project involved coordinating around 12 different tenant businesses and they handled the logistics perfectly. Not a single complaint from our tenants about noise or disruption.",
    projectType: "Commercial Metal Panel System",
  },

  // ============================================
  // COMMERCIAL: Maintenance Programs
  // ============================================
  {
    name: "Aspen Highlands Condominium Association",
    location: "Aspen, CO",
    rating: 5,
    date: "2025-11-20",
    serviceSlug: "commercial-maintenance",
    text: "We've had Alpine Peak on our annual maintenance contract for three years. They inspect all 24 buildings twice a year, handle any repairs promptly, and provide detailed reports to our board. Their proactive approach has saved us from several potentially costly issues.",
    projectType: "Annual Maintenance Contract",
  },
  {
    name: "Steamboat Grand Hotel",
    location: "Steamboat Springs, CO",
    rating: 5,
    date: "2025-10-12",
    serviceSlug: "commercial-maintenance",
    text: "Managing a large hotel roof requires a reliable maintenance partner. Alpine Peak responds quickly, documents everything thoroughly, and their preventive maintenance program has extended our roof's life significantly. They understand the hospitality industry's need for minimal disruption.",
    projectType: "Hotel Roof Maintenance",
  },

  // ============================================
  // COMMERCIAL: Roof Coatings
  // ============================================
  {
    name: "Crested Butte Community Center",
    location: "Crested Butte, CO",
    rating: 5,
    date: "2025-04-18",
    serviceSlug: "roof-coatings",
    text: "Instead of a full replacement, Alpine Peak recommended a silicone roof coating for our community center. It cost 40% less than replacement, added 15 years of life to our roof, and improved our energy efficiency. The white reflective coating keeps our building noticeably cooler in summer.",
    projectType: "Silicone Roof Coating",
  },
  {
    name: "Durango Business Park",
    location: "Durango, CO",
    rating: 4,
    date: "2025-03-25",
    serviceSlug: "roof-coatings",
    text: "Alpine Peak applied an elastomeric coating to our three commercial buildings. The process was quick — about two days per building — and the results are excellent. UV protection and waterproofing in one application. Good value for the investment.",
    projectType: "Elastomeric Coating Application",
  },

  // ============================================
  // COMMERCIAL: Snow & Ice Management
  // ============================================
  {
    name: "Keystone Resort Properties",
    location: "Silverthorne, CO",
    rating: 5,
    date: "2025-12-08",
    serviceSlug: "snow-ice-management",
    text: "Alpine Peak manages snow removal for our resort properties. Their heated cable systems prevent ice dams and their emergency snow removal team responds within hours of heavy storms. They've prevented thousands in potential damage. Essential service for mountain commercial properties.",
    projectType: "Heated Cable & Snow Removal",
  },
  {
    name: "Winter Park Village Shops",
    location: "Winter Park, CO",
    rating: 5,
    date: "2025-01-15",
    serviceSlug: "snow-ice-management",
    text: "After a roof collapse scare at a neighboring building, we hired Alpine Peak for snow load monitoring and management. They installed sensors and respond proactively when loads approach critical levels. Peace of mind through the entire winter season.",
    projectType: "Snow Load Monitoring",
  },

  // ============================================
  // COMMERCIAL: Emergency Services
  // ============================================
  {
    name: "Glenwood Springs Marriott",
    location: "Glenwood Springs, CO",
    rating: 5,
    date: "2025-09-30",
    serviceSlug: "commercial-emergency",
    text: "A severe hailstorm damaged our hotel roof and we needed emergency tarping and repairs immediately. Alpine Peak had a crew on-site within 3 hours, tarped the damaged areas, and completed permanent repairs within a week. Their emergency response saved us from extensive interior water damage.",
    projectType: "Emergency Storm Response",
  },
  {
    name: "Breckenridge Town Hall",
    location: "Breckenridge, CO",
    rating: 5,
    date: "2025-02-28",
    serviceSlug: "commercial-emergency",
    text: "A heavy wet snow event caused a partial roof failure on our municipal building. Alpine Peak responded immediately, secured the structure, and coordinated with our engineers on the repair plan. Their professionalism during a stressful situation was outstanding. The repair was completed ahead of schedule.",
    projectType: "Structural Emergency Repair",
  },
];

export function getTestimonialsByService(serviceSlug: string): Testimonial[] {
  return testimonials.filter((t) => t.serviceSlug === serviceSlug);
}

export function getAverageRating(serviceSlug: string): number {
  const serviceTestimonials = getTestimonialsByService(serviceSlug);
  if (serviceTestimonials.length === 0) return 5;
  return (
    serviceTestimonials.reduce((sum, t) => sum + t.rating, 0) /
    serviceTestimonials.length
  );
}
