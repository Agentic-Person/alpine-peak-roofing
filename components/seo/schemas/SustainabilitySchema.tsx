// Task 004: Sustainability Schema Implementation
// Alpine Peak Roofing - Environmental Leadership Credentials
// Green Building & Sustainable Roofing Solutions

import React from 'react'
import type { SustainabilityProps } from './types/SchemaTypes'

export default function SustainabilitySchema({ 
  certifications = [
    "Energy Star Certified Partner",
    "LEED Project Capability", 
    "Green Building Council Member",
    "EPA Lead-Safe Certified"
  ],
  ecoFriendlyFeatures = [
    "Solar integration systems",
    "Recycled material options",
    "Energy-efficient designs",
    "Carbon offset programs"
  ],
  energyEfficiencyRating = "Energy Star Certified"
}: SustainabilityProps = {}) {
  
  const schema = {
    "@context": "https://schema.org",
    "@type": ["GreenBusiness", "EnvironmentallyFriendlyService", "SustainableOrganization"],
    
    // Environmental Identity
    "name": "Alpine Peak Sustainable Roofing Solutions",
    "description": "Colorado's leading sustainable roofing contractor, specializing in eco-friendly materials, energy efficiency, and environmental stewardship for mountain communities.",
    "slogan": "Protecting Your Home, Preserving Our Mountains",
    
    // Sustainability Certifications
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Environmental Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Energy Star",
          "url": "https://www.energystar.gov/",
          "description": "U.S. Environmental Protection Agency"
        },
        "description": "Energy Star Certified Partner - Verified energy efficiency expertise"
      },
      {
        "@type": "EducationalOccupationalCredential", 
        "credentialCategory": "Green Building Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "U.S. Green Building Council",
          "alternateName": "USGBC",
          "url": "https://www.usgbc.org/"
        },
        "description": "LEED Project Capability - Leadership in Energy and Environmental Design"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Environmental Safety",
        "recognizedBy": {
          "@type": "Organization", 
          "name": "Environmental Protection Agency",
          "alternateName": "EPA"
        },
        "description": "EPA Lead-Safe Certified Firm - RRP Rule Compliance"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Sustainable Building",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Colorado Green Building Guild"
        },
        "description": "Certified Sustainable Building Specialist"
      }
    ],
    
    // Eco-Friendly Service Offerings
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Sustainable Roofing Services", 
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Solar-Integrated Roofing Systems",
            "description": "Seamlessly integrated solar panel roofing for maximum energy efficiency and aesthetic appeal",
            "environmentalImpact": "Up to 90% home energy offset"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cool Roofing Solutions",
            "description": "Reflective roofing materials that reduce energy consumption and urban heat island effect",
            "environmentalImpact": "30-50% cooling cost reduction"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Recycled Material Roofing",
            "description": "Premium roofing systems using recycled steel, rubber, and composite materials",
            "environmentalImpact": "95% recyclable materials"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Living Roof Systems",
            "description": "Green roof and living roof installations for mountain properties",
            "environmentalImpact": "Natural insulation and stormwater management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Rainwater Harvesting Integration",
            "description": "Roofing systems designed for optimal rainwater collection and filtration",
            "environmentalImpact": "50-80% water usage reduction"
          }
        }
      ]
    },
    
    // Environmental Impact Metrics
    "environmentalImpact": {
      "@type": "PropertyValue",
      "name": "Environmental Performance",
      "value": [
        {
          "@type": "PropertyValue",
          "name": "Carbon Footprint Reduction", 
          "value": "Average 40% reduction in home carbon footprint",
          "unitText": "percentage"
        },
        {
          "@type": "PropertyValue",
          "name": "Energy Efficiency Improvement",
          "value": "25-50% reduction in heating/cooling costs",
          "unitText": "percentage"
        },
        {
          "@type": "PropertyValue",
          "name": "Material Recycling Rate",
          "value": "95% of old roofing materials recycled",
          "unitText": "percentage"
        },
        {
          "@type": "PropertyValue", 
          "name": "Solar Energy Generation",
          "value": "Average 8-12 kW residential systems",
          "unitText": "kilowatts"
        }
      ]
    },
    
    // Sustainable Materials
    "sustainableMaterials": {
      "@type": "PropertyValue",
      "name": "Eco-Friendly Material Portfolio",
      "value": [
        {
          "@type": "Product",
          "name": "Recycled Steel Roofing",
          "description": "100% recycled steel with 50+ year lifespan",
          "sustainability": "Fully recyclable, low carbon footprint"
        },
        {
          "@type": "Product",
          "name": "Reclaimed Copper", 
          "description": "Reclaimed and refinished copper roofing systems",
          "sustainability": "100+ year lifespan, fully recyclable"
        },
        {
          "@type": "Product",
          "name": "Composite Recycled Shingles",
          "description": "Post-consumer recycled rubber and plastic shingles",
          "sustainability": "95% recycled content, 50-year warranty"
        },
        {
          "@type": "Product",
          "name": "Sustainably Harvested Cedar",
          "description": "FSC-certified cedar from responsibly managed forests",
          "sustainability": "Carbon-negative material, biodegradable"
        },
        {
          "@type": "Product",
          "name": "Clay Tiles", 
          "description": "Natural clay tiles with minimal processing",
          "sustainability": "100% natural, 100+ year lifespan"
        }
      ]
    },
    
    // Energy Efficiency Programs
    "energyEfficiencyPrograms": {
      "@type": "PropertyValue",
      "name": "Energy Efficiency Services",
      "value": [
        {
          "@type": "Service",
          "name": "Energy Auditing",
          "description": "Comprehensive home energy assessment and optimization recommendations"
        },
        {
          "@type": "Service",
          "name": "Insulation Optimization",
          "description": "Advanced insulation systems for mountain climate efficiency"
        },
        {
          "@type": "Service", 
          "name": "Ventilation Design",
          "description": "Optimal ventilation systems for energy efficiency and air quality"
        },
        {
          "@type": "Service",
          "name": "Smart Home Integration",
          "description": "IoT-enabled monitoring and control systems"
        }
      ]
    },
    
    // Carbon Offset & Environmental Programs
    "environmentalPrograms": {
      "@type": "PropertyValue",
      "name": "Environmental Stewardship Programs",
      "value": [
        {
          "@type": "Action",
          "name": "Carbon Offset Program",
          "description": "Every project includes verified carbon offsets through Colorado forest preservation"
        },
        {
          "@type": "Action", 
          "name": "Mountain Wildlife Protection",
          "description": "Wildlife-safe installation practices protecting Colorado's mountain ecosystems"
        },
        {
          "@type": "Action",
          "name": "Watershed Protection",
          "description": "Installation practices that protect mountain watershed areas"
        },
        {
          "@type": "Action",
          "name": "Community Education", 
          "description": "Free sustainability workshops for mountain communities"
        },
        {
          "@type": "Action",
          "name": "Tree Planting Initiative",
          "description": "One tree planted for every roofing project completed"
        }
      ]
    },
    
    // Industry Leadership
    "sustainabilityLeadership": {
      "@type": "PropertyValue",
      "name": "Industry Sustainability Leadership",
      "value": [
        "First Colorado contractor to achieve carbon-neutral operations",
        "Pioneer in solar-roofing integration technology",
        "Leading advocate for green building codes in mountain communities",
        "Research partner with Colorado State University on sustainable building",
        "Mentor for emerging sustainable contractors"
      ]
    },
    
    // Awards & Recognition
    "environmentalAwards": [
      "Colorado Sustainability Leadership Award 2023",
      "Green Business of the Year - Mountain Communities 2022",
      "EPA Environmental Excellence Award 2023",
      "USGBC Colorado Chapter Recognition 2022",
      "Mountain Conservation Award 2023"
    ],
    
    // Partnerships
    "sustainabilityPartners": [
      {
        "@type": "Organization",
        "name": "Colorado Solar Energy Industries Association",
        "description": "Solar industry leadership and advocacy"
      },
      {
        "@type": "Organization", 
        "name": "Rocky Mountain Institute",
        "description": "Clean energy research and implementation"
      },
      {
        "@type": "Organization",
        "name": "Colorado Green Building Guild",
        "description": "Sustainable building practices advancement"
      },
      {
        "@type": "Organization",
        "name": "Mountain Area Land Trust",
        "description": "Environmental conservation partnership"
      }
    ],
    
    // Measurement & Transparency
    "sustainabilityReporting": {
      "@type": "Report",
      "name": "Annual Sustainability Report",
      "description": "Transparent reporting of environmental impact, energy savings, and conservation efforts",
      "url": "https://alpinepeakroofing.com/sustainability-report",
      "publishingPrinciples": "Full transparency in environmental impact measurement"
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