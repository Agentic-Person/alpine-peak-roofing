// Task 001: Primary Business Schema Implementation
// Alpine Peak Roofing - Master JSON-LD Schema
// Premium Mountain Roofing Specialist

import React from 'react'
import type { BusinessSchemaProps } from './types/SchemaTypes'

export default function PrimaryBusinessSchema({ 
  organizationName = "Alpine Peak Roofing",
  description = "Colorado's premier luxury roofing contractor specializing in high-altitude, sustainable roofing solutions for mountain communities including Aspen, Vail, and Telluride.",
  customizations = {}
}: BusinessSchemaProps = {}) {
  
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RoofingContractor", "GreenBusiness", "PremiumService"],
    
    // Core Business Identity
    "name": organizationName,
    "legalName": "Alpine Peak Roofing LLC",
    "description": description,
    "slogan": "Pinnacle of Protection, Peak of Performance",
    "foundingDate": "2015",
    "url": "https://alpinepeakroofing.com",
    
    // Premium Market Positioning
    "priceRange": "$15000-$150000+",
    "paymentAccepted": ["Cash", "Check", "Credit Card", "Financing"],
    "currenciesAccepted": "USD",
    "serviceLevel": "Premium",
    "businessType": "Luxury Service Provider",
    
    // Geographic Coverage (High-Level)
    "areaServed": [
      {
        "@type": "State",
        "name": "Colorado",
        "alternateName": "CO"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 39.7392,
        "longitude": -104.9903,
        "name": "Denver, CO"
      },
      "geoRadius": "241401" // 150 miles in meters
    },
    
    // Contact Information
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1234 Mountain View Drive",
      "addressLocality": "Denver",
      "addressRegion": "CO",
      "postalCode": "80202",
      "addressCountry": "US"
    },
    "telephone": "+1-303-555-7663", // 303-555-ROOF
    "email": "info@alpinepeakroofing.com",
    
    // Business Hours
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "08:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "00:00",
        "closes": "23:59",
        "description": "Emergency services only"
      }
    ],
    
    // Specializations (Mountain Focus)
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mountain Roofing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "High-Altitude Roofing",
            "description": "Specialized roofing solutions for elevations up to 12,000+ feet"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Extreme Weather Roofing",
            "description": "Wind-resistant systems rated for 100+ mph mountain winds"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Snow Management Systems", 
            "description": "Ice dam prevention, heat cables, snow guards for heavy snow loads"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sustainable Roofing Solutions",
            "description": "Eco-friendly materials, solar integration, energy efficiency"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Luxury Resort Roofing",
            "description": "Premium roofing for high-end mountain properties and resorts"
          }
        }
      ]
    },
    
    // Credentials & Certifications
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Better Business Bureau",
          "alternateName": "BBB"
        },
        "description": "A+ Rating with Better Business Bureau"
      },
      {
        "@type": "EducationalOccupationalCredential", 
        "credentialCategory": "Environmental Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Energy Star",
          "url": "https://www.energystar.gov/"
        },
        "description": "Energy Star Certified Partner"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Green Building",
        "recognizedBy": {
          "@type": "Organization", 
          "name": "U.S. Green Building Council",
          "alternateName": "USGBC"
        },
        "description": "LEED Project Capability"
      }
    ],
    
    // Insurance & Bonding
    "insurance": {
      "@type": "InsurancePolicy",
      "name": "Comprehensive Coverage",
      "description": "Fully licensed, bonded, and insured roofing contractor",
      "coverageAmount": {
        "@type": "MonetaryAmount",
        "currency": "USD", 
        "value": "2000000"
      },
      "coverageArea": "Colorado Statewide"
    },
    
    // Awards & Recognition
    "award": [
      "Denver's Best Roofing Contractor 2023",
      "Mountain Community Choice Award 2022",
      "Sustainability Leadership Award 2023",
      "Customer Service Excellence 2022"
    ],
    
    // Social Proof
    "aggregateRating": {
      "@type": "AggregateRating", 
      "ratingValue": "4.9",
      "reviewCount": "247",
      "bestRating": "5",
      "worstRating": "1"
    },
    
    // Social Media Presence
    "sameAs": [
      "https://www.facebook.com/AlpinePeakRoofing",
      "https://www.instagram.com/alpinepeakroofing", 
      "https://www.linkedin.com/company/alpine-peak-roofing",
      "https://www.youtube.com/c/AlpinePeakRoofing"
    ],
    
    // Emergency Services
    "additionalType": "EmergencyService",
    "serviceType": "24/7 Emergency Roofing Repairs",
    "availableAtOrFrom": {
      "@type": "Place",
      "name": "Colorado Mountain Communities",
      "description": "Emergency response within 2 hours for mountain communities"
    },
    
    // Custom Extensions
    ...customizations
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