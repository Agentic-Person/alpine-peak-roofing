// Task 002: Service Area Schema Implementation
// Alpine Peak Roofing - Geographic Coverage Schema
// Premium Mountain Communities Focus

import React from 'react'
import type { ServiceAreaProps } from './types/SchemaTypes'

export default function ServiceAreaSchema({ 
  primaryMarkets = [
    "Aspen", "Vail", "Telluride", "Crested Butte"
  ],
  secondaryMarkets = [
    "Steamboat Springs", "Breckenridge", "Winter Park", "Copper Mountain"
  ],
  emergencyServiceArea = "All Colorado mountain communities",
  serviceRadius = "150 miles from Denver"
}: ServiceAreaProps = {}) {
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "ServiceArea",
    
    // Primary Coverage - Tier 1 Luxury Mountain Markets
    "geoCovers": [
      {
        "@type": "City",
        "name": "Aspen",
        "addressRegion": "CO",
        "addressCountry": "US",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 39.1911,
          "longitude": -106.8175
        },
        "elevation": "7908 feet",
        "specialization": "Luxury resort community roofing",
        "marketTier": "Premium",
        "responseTime": "2 hours emergency service"
      },
      {
        "@type": "City", 
        "name": "Vail",
        "addressRegion": "CO",
        "addressCountry": "US",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 39.6403,
          "longitude": -106.3742
        },
        "elevation": "8150 feet",
        "specialization": "High-altitude luxury ski resort roofing",
        "marketTier": "Premium",
        "responseTime": "2 hours emergency service"
      },
      {
        "@type": "City",
        "name": "Telluride", 
        "addressRegion": "CO",
        "addressCountry": "US",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 37.9375,
          "longitude": -107.8123
        },
        "elevation": "8750 feet",
        "specialization": "Extreme altitude luxury mountain homes",
        "marketTier": "Ultra-Premium", 
        "responseTime": "2 hours emergency service"
      },
      {
        "@type": "City",
        "name": "Crested Butte",
        "addressRegion": "CO", 
        "addressCountry": "US",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 38.8697,
          "longitude": -106.9878
        },
        "elevation": "8885 feet",
        "specialization": "Ultra-high altitude mountain roofing",
        "marketTier": "Premium",
        "responseTime": "2 hours emergency service"
      }
    ],
    
    // Secondary Coverage - Tier 2 Mountain Markets
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": "Secondary Service Areas",
      "value": [
        {
          "@type": "City",
          "name": "Steamboat Springs",
          "addressRegion": "CO",
          "elevation": "6732 feet",
          "marketTier": "Premium",
          "responseTime": "3 hours"
        },
        {
          "@type": "City", 
          "name": "Breckenridge",
          "addressRegion": "CO",
          "elevation": "9600 feet", 
          "marketTier": "Premium",
          "responseTime": "2 hours"
        },
        {
          "@type": "City",
          "name": "Winter Park",
          "addressRegion": "CO",
          "elevation": "9052 feet",
          "marketTier": "Premium", 
          "responseTime": "2 hours"
        },
        {
          "@type": "City",
          "name": "Copper Mountain",
          "addressRegion": "CO",
          "elevation": "9712 feet",
          "marketTier": "Premium",
          "responseTime": "2 hours"
        }
      ]
    },
    
    // Denver Metro Premium Areas
    "denverMetroAreas": {
      "@type": "PropertyValue",
      "name": "Denver Metropolitan Premium Areas",
      "value": [
        {
          "@type": "Neighborhood",
          "name": "Cherry Hills Village",
          "addressLocality": "Denver",
          "addressRegion": "CO",
          "marketTier": "Ultra-Premium",
          "responseTime": "1 hour"
        },
        {
          "@type": "Neighborhood", 
          "name": "Castle Pines",
          "addressLocality": "Denver",
          "addressRegion": "CO",
          "marketTier": "Premium",
          "responseTime": "1 hour"
        },
        {
          "@type": "Neighborhood",
          "name": "Greenwood Village",
          "addressLocality": "Denver", 
          "addressRegion": "CO",
          "marketTier": "Premium",
          "responseTime": "1 hour"
        },
        {
          "@type": "Neighborhood",
          "name": "Golden",
          "addressLocality": "Denver",
          "addressRegion": "CO",
          "marketTier": "Premium",
          "responseTime": "1 hour"  
        }
      ]
    },
    
    // Service Area Definition
    "serviceRadius": serviceRadius,
    "emergencyServiceArea": emergencyServiceArea,
    
    // Elevation Specialization
    "elevationRange": {
      "@type": "PropertyValue", 
      "name": "Elevation Service Range",
      "minValue": "5280", // Denver elevation
      "maxValue": "12000+", // High mountain peaks
      "unitText": "feet above sea level",
      "description": "Specialized high-altitude roofing expertise"
    },
    
    // Weather Conditions Expertise
    "weatherSpecialization": {
      "@type": "PropertyValue",
      "name": "Extreme Weather Expertise",
      "value": [
        "100+ mph mountain winds",
        "300+ lbs/sq ft snow loads", 
        "Extreme UV exposure at altitude",
        "Rapid temperature fluctuations",
        "Ice dam formation prevention",
        "Hail damage mitigation"
      ]
    },
    
    // Transportation & Logistics
    "serviceDelivery": {
      "@type": "DeliveryMethod",
      "name": "Mountain Service Delivery",
      "description": "Specialized equipment and vehicles for mountain access",
      "deliveryAddress": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates", 
          "latitude": 39.7392,
          "longitude": -104.9903,
          "name": "Denver Metro Hub"
        },
        "geoRadius": "241401" // 150 miles
      }
    },
    
    // Market Positioning
    "targetMarket": {
      "@type": "PropertyValue",
      "name": "Target Market Focus",
      "value": [
        "Luxury mountain resort properties",
        "High-end custom mountain homes", 
        "Premium commercial mountain properties",
        "Ultra-high-net-worth residences",
        "Sustainable luxury developments"
      ]
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