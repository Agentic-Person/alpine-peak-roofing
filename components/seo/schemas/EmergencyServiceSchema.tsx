// Task 005: Emergency Service Schema Implementation
// Alpine Peak Roofing - Rapid Response Mountain Weather Services
// 24/7 Emergency Roofing Solutions

import React from 'react'
import type { EmergencyServiceProps } from './types/SchemaTypes'

export default function EmergencyServiceSchema({ 
  responseTime = "2 hours mountain areas, 1 hour Denver metro",
  availabilityHours = "24/7/365",
  serviceTypes = [
    "Storm damage assessment",
    "Emergency leak repair", 
    "Wind damage restoration",
    "Hail damage mitigation"
  ],
  coverageArea = "All Colorado mountain communities and Denver metro"
}: EmergencyServiceProps = {}) {
  
  const schema = {
    "@context": "https://schema.org",
    "@type": ["EmergencyService", "RoofingContractor", "24HourService"],
    
    // Emergency Service Identity
    "name": "Alpine Peak Emergency Roofing Response",
    "description": "24/7 emergency roofing services for Colorado mountain communities, specializing in rapid response to storm damage, wind damage, and weather-related roofing emergencies.",
    "serviceType": "Emergency Roofing Services",
    "category": "Emergency Home Repair",
    
    // Availability & Response
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59",
      "description": "24/7/365 emergency response availability"
    },
    
    "responseTime": {
      "@type": "PropertyValue",
      "name": "Emergency Response Times",
      "value": [
        {
          "@type": "PropertyValue",
          "name": "Mountain Communities Response",
          "value": "2 hours maximum",
          "description": "Aspen, Vail, Telluride, Crested Butte, and surrounding areas"
        },
        {
          "@type": "PropertyValue", 
          "name": "Denver Metro Response",
          "value": "1 hour maximum", 
          "description": "Cherry Hills Village, Castle Pines, Greenwood Village, Golden"
        },
        {
          "@type": "PropertyValue",
          "name": "Critical Emergency Response",
          "value": "30 minutes",
          "description": "Life-threatening situations or severe structural damage"
        }
      ]
    },
    
    // Emergency Service Offerings
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Emergency Roofing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Storm Damage Assessment & Repair",
            "description": "Immediate assessment and emergency stabilization of storm-damaged roofs",
            "responseTime": "2 hours maximum",
            "availability": "24/7"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Emergency Leak Repair",
            "description": "Rapid leak detection and waterproofing to prevent interior damage",
            "responseTime": "1-2 hours",
            "availability": "24/7"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wind Damage Restoration",
            "description": "Emergency repair of wind-damaged roofing systems and blown-off materials",
            "responseTime": "2 hours maximum", 
            "availability": "24/7"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hail Damage Emergency Response",
            "description": "Immediate protection and assessment following hail storms",
            "responseTime": "1-2 hours",
            "availability": "24/7"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Snow Load Emergency Removal",
            "description": "Emergency snow removal to prevent structural damage in heavy snow conditions",
            "responseTime": "2 hours maximum",
            "availability": "Winter 24/7"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Tree Damage Roof Repair",
            "description": "Emergency response to tree damage from winter storms and high winds",
            "responseTime": "1-2 hours",
            "availability": "24/7"
          }
        }
      ]
    },
    
    // Weather-Specific Emergency Response
    "weatherEmergencyServices": {
      "@type": "PropertyValue",
      "name": "Weather-Specific Emergency Protocols",
      "value": [
        {
          "@type": "PropertyValue",
          "name": "Hailstorm Response",
          "value": "Immediate deployment with protective tarping and damage assessment",
          "responseTime": "1 hour for active storms"
        },
        {
          "@type": "PropertyValue",
          "name": "High Wind Response", 
          "value": "Emergency stabilization for roofs damaged by 60+ mph winds",
          "responseTime": "2 hours maximum"
        },
        {
          "@type": "PropertyValue",
          "name": "Heavy Snow Response",
          "value": "Emergency snow load removal and structural assessment", 
          "responseTime": "2 hours for dangerous loads"
        },
        {
          "@type": "PropertyValue",
          "name": "Ice Dam Emergency",
          "value": "Immediate ice dam removal and water intrusion prevention",
          "responseTime": "2 hours maximum"
        }
      ]
    },
    
    // Emergency Equipment & Resources
    "emergencyCapabilities": {
      "@type": "PropertyValue",
      "name": "Emergency Response Capabilities",
      "value": [
        "24/7 dispatched emergency crews",
        "Weather-monitoring early warning systems",
        "Drone damage assessment technology",
        "Emergency tarping and waterproofing supplies",
        "Structural safety evaluation expertise",
        "Direct insurance communication protocols",
        "Mountain access specialized equipment",
        "Multi-location emergency supply staging"
      ]
    },
    
    // Contact & Dispatch
    "emergencyContact": {
      "@type": "ContactPoint",
      "contactType": "Emergency Service",
      "telephone": "+1-303-555-911", // Emergency line
      "email": "emergency@alpinepeakroofing.com",
      "availableLanguage": ["English", "Spanish"],
      "hoursAvailable": "24/7/365",
      "description": "Direct emergency dispatch line - answered within 2 rings"
    },
    
    // Service Areas (Emergency Priority)
    "emergencyServiceArea": {
      "@type": "ServiceArea", 
      "name": "Emergency Response Coverage",
      "geoCovers": [
        {
          "@type": "City",
          "name": "Aspen",
          "addressRegion": "CO",
          "responseTime": "2 hours",
          "priority": "High"
        },
        {
          "@type": "City",
          "name": "Vail", 
          "addressRegion": "CO",
          "responseTime": "2 hours",
          "priority": "High"
        },
        {
          "@type": "City",
          "name": "Telluride",
          "addressRegion": "CO", 
          "responseTime": "2 hours",
          "priority": "High"
        },
        {
          "@type": "City",
          "name": "Denver Metro",
          "addressRegion": "CO",
          "responseTime": "1 hour",
          "priority": "Priority"
        }
      ]
    },
    
    // Insurance Integration
    "insuranceSupport": {
      "@type": "PropertyValue",
      "name": "Emergency Insurance Services",
      "value": [
        "Direct insurance company communication",
        "Emergency mitigation documentation", 
        "Damage assessment reporting",
        "Claims process acceleration",
        "Pre-approved emergency work authorization",
        "Digital documentation and photo evidence",
        "Preferred contractor relationships with major insurers"
      ]
    },
    
    // Safety Protocols
    "safetyProtocols": {
      "@type": "PropertyValue",
      "name": "Emergency Safety Procedures",
      "value": [
        "Structural stability assessment before work begins",
        "Personal protective equipment for extreme conditions",
        "Mountain weather monitoring and safety protocols",
        "Helicopter landing zone coordination when needed",
        "Emergency evacuation procedures for crews",
        "First aid and emergency medical response training",
        "Lightning strike and electrical hazard protocols"
      ]
    },
    
    // Performance Metrics
    "emergencyPerformanceMetrics": {
      "@type": "PropertyValue", 
      "name": "Emergency Response Performance",
      "value": [
        {
          "@type": "PropertyValue",
          "name": "Average Response Time",
          "value": "87 minutes",
          "description": "Mountain communities average response"
        },
        {
          "@type": "PropertyValue",
          "name": "Emergency Success Rate", 
          "value": "99.7%",
          "description": "Successful emergency stabilization rate"
        },
        {
          "@type": "PropertyValue",
          "name": "Customer Satisfaction",
          "value": "4.9/5",
          "description": "Emergency service satisfaction rating"
        },
        {
          "@type": "PropertyValue",
          "name": "Weather Response Coverage",
          "value": "100%", 
          "description": "Response rate during severe weather events"
        }
      ]
    },
    
    // Coordination Networks
    "emergencyNetworks": {
      "@type": "PropertyValue",
      "name": "Emergency Response Coordination",
      "value": [
        "Colorado Emergency Management coordination",
        "Local fire department partnerships",
        "Mountain rescue team communication protocols",
        "Utility company emergency coordination",
        "Regional contractor mutual aid agreements",
        "Insurance company direct communication channels"
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