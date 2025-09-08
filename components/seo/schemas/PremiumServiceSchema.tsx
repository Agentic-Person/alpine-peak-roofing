// Task 003: Premium Service Schema Implementation
// Alpine Peak Roofing - Luxury Investment Positioning
// Premium Mountain Roofing Services

import React from 'react'
import type { PremiumServiceProps } from './types/SchemaTypes'

export default function PremiumServiceSchema({ 
  serviceType = "Premium Mountain Roofing",
  priceRange = "$15000-$150000+",
  warrantyTerms = [
    "Lifetime craftsmanship warranty",
    "25-50 year material warranties", 
    "Weather damage protection"
  ],
  premiumFeatures = [
    "Master craftsman installation",
    "Premium imported materials",
    "Architectural design integration"
  ]
}: PremiumServiceProps = {}) {
  
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Service", "PremiumService", "HomeImprovement"],
    
    // Service Identity
    "name": "Premium Mountain Roofing Services",
    "description": "Investment-grade roofing solutions for Colorado's most exclusive mountain properties, featuring lifetime warranties and master craftsmanship.",
    "serviceType": serviceType,
    "category": "Luxury Home Improvement",
    
    // Investment Positioning
    "priceRange": priceRange,
    "priceCurrency": "USD",
    "paymentAccepted": ["Cash", "Check", "Credit Card", "Financing"],
    "businessFunction": "Premium Service Provider",
    
    // Service Offerings
    "hasOfferCatalog": {
      "@type": "OfferCatalog", 
      "name": "Premium Roofing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Luxury Residential Roofing",
            "description": "Custom roofing solutions for high-end mountain homes and estates",
            "priceRange": "$25000-$150000+",
            "warranty": "Lifetime craftsmanship, 50-year materials"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Resort & Commercial Roofing",
            "description": "Premium commercial roofing for luxury resorts and mountain properties",
            "priceRange": "$50000-$500000+",
            "warranty": "25-year comprehensive warranty"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Architectural Roofing Systems",
            "description": "Custom-designed roofing that integrates with mountain architecture",
            "priceRange": "$40000-$200000+", 
            "warranty": "Lifetime design warranty"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Historic Restoration Roofing",
            "description": "Authentic restoration of historic mountain properties with period-appropriate materials",
            "priceRange": "$30000-$100000+",
            "warranty": "25-year preservation warranty"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Sustainable Luxury Roofing",
            "description": "Eco-premium materials with solar integration and energy efficiency",
            "priceRange": "$35000-$175000+",
            "warranty": "Lifetime sustainability guarantee"
          }
        }
      ]
    },
    
    // Premium Materials
    "materials": {
      "@type": "PropertyValue",
      "name": "Premium Roofing Materials",
      "value": [
        {
          "@type": "Product",
          "name": "Standing Seam Copper",
          "description": "Premium European copper roofing systems",
          "warranty": "100+ year lifespan"
        },
        {
          "@type": "Product",
          "name": "Natural Slate",  
          "description": "Welsh and Vermont slate, hand-selected",
          "warranty": "100+ year lifespan"
        },
        {
          "@type": "Product",
          "name": "Cedar Shake Premium",
          "description": "Old-growth cedar, fire-treated and certified",
          "warranty": "30-50 year lifespan"
        },
        {
          "@type": "Product",
          "name": "Architectural Shingles",
          "description": "Designer collections from premium manufacturers", 
          "warranty": "25-50 year warranties"
        },
        {
          "@type": "Product",
          "name": "Zinc & Lead-Coated Copper",
          "description": "European heritage materials for luxury applications",
          "warranty": "75-100 year lifespan"
        }
      ]
    },
    
    // Craftsmanship Standards
    "provider": {
      "@type": "Organization",
      "name": "Alpine Peak Roofing Master Craftsmen",
      "description": "Team of certified master craftsmen with mountain roofing expertise",
      "hasCredential": [
        "Master Roofer Certification",
        "High-Altitude Installation Specialist", 
        "Sustainable Building Expert",
        "Historic Restoration Specialist"
      ]
    },
    
    // Quality Assurance
    "qualityControl": {
      "@type": "PropertyValue",
      "name": "Premium Quality Standards",
      "value": [
        "Multi-point inspection process",
        "Drone technology progress documentation",
        "Weather monitoring during installation",
        "Post-installation performance tracking",
        "Annual maintenance programs",
        "Lifetime relationship management"
      ]
    },
    
    // Warranty Coverage
    "warranty": {
      "@type": "Warranty",
      "warrantyPromise": warrantyTerms,
      "warrantyScope": "Comprehensive coverage including materials, labor, and weather performance",
      "durationOfWarranty": "P25Y/P50Y", // 25-50 years ISO 8601 duration
      "warrantyType": "Full replacement coverage"
    },
    
    // Investment Value
    "valueProposition": {
      "@type": "PropertyValue",  
      "name": "Investment Benefits",
      "value": [
        "15-25% property value increase",
        "Energy cost reduction up to 40%",
        "Insurance premium reductions",
        "Maintenance cost elimination",
        "Weather damage prevention",
        "Curb appeal enhancement"
      ]
    },
    
    // Service Process
    "serviceProcess": {
      "@type": "HowTo",
      "name": "Premium Service Experience",
      "description": "White-glove service process for luxury roofing projects",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Consultation & Assessment",
          "description": "Comprehensive property evaluation with drone technology and architectural consultation"
        },
        {
          "@type": "HowToStep", 
          "name": "Custom Design Development",
          "description": "Architectural integration with material selection and aesthetic optimization"
        },
        {
          "@type": "HowToStep",
          "name": "Project Planning & Permits",
          "description": "Complete permitting, HOA approvals, and neighbor notifications"
        },
        {
          "@type": "HowToStep",
          "name": "Master Installation",
          "description": "Certified craftsman installation with daily progress documentation"
        },
        {
          "@type": "HowToStep",
          "name": "Quality Verification", 
          "description": "Multi-point inspection, drone documentation, and performance testing"
        },
        {
          "@type": "HowToStep",
          "name": "Lifetime Support",
          "description": "Annual maintenance programs and lifetime warranty support"
        }
      ]
    },
    
    // Performance Guarantees
    "serviceGuarantee": {
      "@type": "PropertyValue",
      "name": "Performance Guarantees",
      "value": [
        "Wind resistance: 100+ mph mountain winds",
        "Snow load capacity: 300+ lbs per square foot",
        "UV resistance: High-altitude protection",
        "Temperature cycling: -40°F to 120°F range",
        "Hail resistance: Class 4 impact rating",
        "Fire resistance: Class A fire rating"
      ]
    },
    
    // Target Market
    "audience": {
      "@type": "Audience",
      "audienceType": "Luxury Property Owners",
      "geographicArea": "Colorado Mountain Communities",
      "description": "High-net-worth individuals seeking investment-grade roofing solutions for mountain properties"
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