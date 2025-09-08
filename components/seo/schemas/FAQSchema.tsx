// Task 007: FAQ Schema Implementation
// Alpine Peak Roofing - Mountain Roofing Expert Knowledge Base
// Common Questions for Mountain & Luxury Roofing

import React from 'react'
import type { FAQProps, FAQItem } from './types/SchemaTypes'

export default function FAQSchema({ 
  questions = [],
  category = "Mountain Roofing Expertise"
}: FAQProps = {}) {
  
  // Default FAQ items if none provided
  const defaultQuestions: FAQItem[] = [
    {
      question: "What makes Alpine Peak Roofing different from other Colorado roofing contractors?",
      answer: "Alpine Peak specializes exclusively in high-altitude mountain roofing and luxury properties. We understand the unique challenges of extreme weather, thin atmosphere UV exposure, heavy snow loads, and 100+ mph mountain winds. Our master craftsmen have specific training for elevations up to 12,000+ feet, and we use only premium materials designed for mountain climates. Most contractors avoid mountain work - we specialize in it.",
      category: "Company Expertise"
    },
    {
      question: "How do you handle roofing at high altitudes like Aspen, Vail, and Telluride?",
      answer: "High-altitude roofing requires specialized knowledge of thin atmosphere effects, extreme UV exposure, rapid temperature cycling, and wind shear patterns. We use reinforced fastening systems, UV-resistant materials, thermal expansion accommodations, and specialized installation techniques. Our crews are acclimatized to high-altitude work and use oxygen support equipment when needed above 10,000 feet.",
      category: "High-Altitude Expertise"
    },
    {
      question: "What roofing materials work best in Colorado mountain climates?",
      answer: "For mountain climates, we recommend standing seam copper (100+ year lifespan), natural slate from Wales or Vermont, premium architectural shingles with Class 4 hail rating, or sustainably harvested cedar with fire treatment. Materials must handle 300+ lbs/sq ft snow loads, 100+ mph winds, extreme UV at altitude, and rapid freeze-thaw cycles. We avoid materials that fail in mountain conditions.",
      category: "Material Selection"
    },
    {
      question: "How do you prevent ice dams and snow management issues?",
      answer: "Ice dam prevention requires a comprehensive approach: proper attic insulation and ventilation, heat cables along eaves and valleys, snow guards for controlled snow sliding, and ice and water shield protection. We design custom snow management systems based on roof pitch, orientation, and local snow load patterns. Our solutions handle Colorado's heavy, wet snow conditions.",
      category: "Snow Management"
    },
    {
      question: "What is your emergency response time during mountain storms?",
      answer: "We maintain 24/7 emergency response with guaranteed 2-hour response to mountain communities (Aspen, Vail, Telluride, Crested Butte) and 1-hour response to Denver metro. We pre-position emergency supplies and crews during storm warnings. Our response vehicles are equipped for mountain access in severe weather, and we coordinate with local emergency services when needed.",
      category: "Emergency Services"
    },
    {
      question: "How much does a premium mountain roofing project typically cost?",
      answer: "Investment-grade mountain roofing ranges from $15,000-$150,000+ depending on size, materials, complexity, and site challenges. Copper and slate systems: $25-45+ per sq ft. Premium architectural shingles: $15-25 per sq ft. Solar-integrated systems: $30-50+ per sq ft. Mountain access, extreme weather provisions, and premium materials justify the investment through 25-50 year warranties and superior performance.",
      category: "Investment & Pricing"
    },
    {
      question: "Do you offer sustainable and eco-friendly roofing options?",
      answer: "Absolutely. We're Energy Star Certified Partners with LEED project capability. Options include solar-integrated systems, cool roofing for energy efficiency, recycled steel and composite materials, sustainably harvested cedar, and rainwater harvesting integration. We offer carbon offset programs and use eco-friendly installation practices. Many clients see 40% reduction in energy costs.",
      category: "Sustainability"
    },
    {
      question: "What warranties do you provide on mountain roofing projects?",
      answer: "We provide comprehensive warranties: Lifetime craftsmanship warranty on labor and installation, 25-50 year material warranties depending on product selection, weather performance guarantees including wind and hail protection, and structural warranties for load-bearing components. We also offer annual maintenance programs to protect your investment long-term.",
      category: "Warranties"
    },
    {
      question: "How do you handle insurance claims for mountain weather damage?",
      answer: "We work directly with insurance companies and understand mountain-specific damage patterns. Our services include immediate damage assessment, emergency mitigation to prevent further damage, detailed documentation with drone technology, direct insurance company communication, and coordination with adjusters familiar with mountain conditions. We're preferred contractors with major insurers.",
      category: "Insurance"
    },
    {
      question: "Can you work on historic mountain properties and maintain authenticity?",
      answer: "Yes, historic preservation is one of our specialties. We source period-appropriate materials, work with preservation architects, follow National Historic Preservation guidelines, and maintain authentic aesthetics while upgrading performance. We've restored Victorian-era properties in Telluride, mining-era buildings in Crested Butte, and early 20th-century estates throughout Colorado's mountain communities.",
      category: "Historic Preservation"
    },
    {
      question: "How do you ensure worker safety at extreme altitudes and weather conditions?",
      answer: "Safety is paramount in mountain roofing. We use specialized high-altitude safety equipment, provide crew altitude acclimatization, monitor weather conditions continuously, use oxygen support above 10,000 feet when needed, maintain emergency medical protocols, coordinate with local emergency services, and halt work during dangerous conditions. Our safety record is exemplary.",
      category: "Safety"
    },
    {
      question: "What maintenance is required for mountain roofing systems?",
      answer: "Mountain roofs require annual inspection and maintenance due to extreme conditions. We provide comprehensive maintenance programs including: snow guard inspection and adjustment, heat cable system testing, gutter and downspout clearing, fastener tightening from wind stress, sealant inspection and renewal, and performance monitoring. Proactive maintenance extends roof life significantly.",
      category: "Maintenance"
    }
  ]
  
  const faqItems = questions.length > 0 ? questions : defaultQuestions
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Alpine Peak Roofing - Mountain Roofing Expert FAQ",
    "description": "Comprehensive answers to common questions about mountain roofing, high-altitude challenges, premium materials, and Colorado's unique climate conditions.",
    
    "mainEntity": faqItems.map((item, index) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
        "author": {
          "@type": "Organization",
          "name": "Alpine Peak Roofing",
          "description": "Colorado's Premier Mountain Roofing Specialists"
        },
        "dateCreated": "2023-01-01",
        "dateModified": "2023-12-01"
      },
      "category": item.category || "Mountain Roofing",
      "position": index + 1
    })),
    
    // FAQ Categories for Organization
    "about": [
      {
        "@type": "Thing",
        "name": "High-Altitude Roofing",
        "description": "Specialized knowledge for roofing at elevations up to 12,000+ feet"
      },
      {
        "@type": "Thing", 
        "name": "Extreme Weather Roofing",
        "description": "Solutions for 100+ mph winds, heavy snow loads, and rapid weather changes"
      },
      {
        "@type": "Thing",
        "name": "Premium Materials",
        "description": "Investment-grade materials designed for mountain climate longevity"
      },
      {
        "@type": "Thing",
        "name": "Emergency Services",
        "description": "24/7 rapid response for mountain weather emergencies"
      },
      {
        "@type": "Thing",
        "name": "Sustainability",
        "description": "Eco-friendly roofing solutions and environmental stewardship"
      },
      {
        "@type": "Thing",
        "name": "Insurance & Investment",
        "description": "Understanding of mountain roofing as a long-term property investment"
      }
    ],
    
    // Target Audience
    "audience": {
      "@type": "Audience",
      "audienceType": "Mountain Property Owners",
      "geographicArea": "Colorado Mountain Communities",
      "description": "Luxury property owners, resort managers, and residents of high-altitude communities"
    },
    
    // FAQ Performance Metrics
    "interactionStatistic": [
      {
        "@type": "InteractionCounter", 
        "interactionType": "https://schema.org/ViewAction",
        "userInteractionCount": "15847",
        "description": "FAQ page views in past 12 months"
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/SearchAction", 
        "userInteractionCount": "4293",
        "description": "FAQ search queries answered"
      }
    ],
    
    // Related Services
    "mentions": [
      {
        "@type": "Service",
        "name": "High-Altitude Roofing Installation",
        "url": "https://alpinepeakroofing.com/services/high-altitude"
      },
      {
        "@type": "Service",
        "name": "Emergency Mountain Weather Response",
        "url": "https://alpinepeakroofing.com/emergency"
      },
      {
        "@type": "Service", 
        "name": "Sustainable Luxury Roofing",
        "url": "https://alpinepeakroofing.com/sustainability"
      },
      {
        "@type": "Service",
        "name": "Premium Material Selection",
        "url": "https://alpinepeakroofing.com/materials"
      }
    ],
    
    // Knowledge Base Organization
    "hasPart": [
      {
        "@type": "Article",
        "name": "Mountain Climate Roofing Guide",
        "description": "Comprehensive guide to roofing in Colorado's mountain climates"
      },
      {
        "@type": "Article",
        "name": "High-Altitude Installation Techniques", 
        "description": "Technical guide to specialized mountain roofing methods"
      },
      {
        "@type": "Article",
        "name": "Premium Material Performance Guide",
        "description": "Comparison of luxury roofing materials in mountain conditions"
      },
      {
        "@type": "Article",
        "name": "Emergency Preparedness Guide",
        "description": "Mountain weather emergency response and preparation"
      }
    ],
    
    // Expertise Validation
    "author": {
      "@type": "Organization",
      "name": "Alpine Peak Roofing",
      "description": "Colorado's Premier Mountain Roofing Specialists",
      "expertise": [
        "High-altitude roofing (8,000-12,000+ feet)",
        "Extreme weather resistance (100+ mph winds)", 
        "Heavy snow load management (300+ lbs/sq ft)",
        "Premium luxury materials and craftsmanship",
        "Environmental sustainability and green building",
        "Historic preservation and restoration"
      ],
      "yearsInBusiness": "8+ years",
      "projectsCompleted": "500+",
      "serviceArea": "Colorado Mountain Communities and Denver Metro"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  )
}