// Task 008: Portfolio Schema Implementation
// Alpine Peak Roofing - Premium Project Showcase
// Luxury Mountain Roofing Portfolio

import React from 'react'
import type { PortfolioProps, PortfolioProject } from './types/SchemaTypes'

export default function PortfolioSchema({ 
  projects = [],
  showcaseType = "Premium Mountain Roofing Projects"
}: PortfolioProps = {}) {
  
  // Default portfolio projects if none provided
  const defaultProjects: PortfolioProject[] = [
    {
      name: "Aspen Luxury Estate Copper Roofing",
      description: "Complete copper roofing system for 12,000 sq ft luxury mountain estate, featuring standing seam copper, custom snow guards, and integrated heat cables for ice dam prevention.",
      location: "Aspen, CO",
      projectType: "Luxury Residential",
      materials: ["Standing Seam Copper", "Custom Snow Guards", "Heat Cable System"],
      completionDate: "2023-09-15",
      imageUrl: "https://alpinepeakroofing.com/portfolio/aspen-copper-estate.jpg"
    },
    {
      name: "Vail Resort Commercial Renovation",
      description: "Historic preservation and modern performance upgrade of 45,000 sq ft luxury resort, maintaining authentic aesthetics while improving wind and snow resistance.",
      location: "Vail, CO", 
      projectType: "Commercial Resort",
      materials: ["Architectural Shingles", "Modified Bitumen", "Snow Retention Systems"],
      completionDate: "2023-07-22",
      imageUrl: "https://alpinepeakroofing.com/portfolio/vail-resort-renovation.jpg"
    },
    {
      name: "Telluride Solar-Integrated Custom Home",
      description: "Ultra-high altitude (8,750 ft) custom home featuring seamlessly integrated solar roofing, premium slate accents, and extreme weather protection systems.",
      location: "Telluride, CO",
      projectType: "Sustainable Luxury Residential",
      materials: ["Solar-Integrated Panels", "Welsh Slate", "Copper Accents"],
      completionDate: "2023-06-10",
      imageUrl: "https://alpinepeakroofing.com/portfolio/telluride-solar-home.jpg"
    },
    {
      name: "Crested Butte Historic Mining Building Restoration", 
      description: "Authentic restoration of 1880s mining-era building using period-appropriate materials while meeting modern safety and performance standards.",
      location: "Crested Butte, CO",
      projectType: "Historic Preservation",
      materials: ["Reclaimed Tin", "Cedar Shakes", "Lead-Coated Copper"],
      completionDate: "2023-08-05",
      imageUrl: "https://alpinepeakroofing.com/portfolio/crested-butte-historic.jpg"
    },
    {
      name: "Cherry Hills Village Luxury Estate",
      description: "Premium residential roofing for 8,500 sq ft luxury estate featuring multiple roof lines, copper gutters, and architectural integration.",
      location: "Cherry Hills Village, CO",
      projectType: "Ultra-Premium Residential", 
      materials: ["Designer Architectural Shingles", "Copper Gutters", "Cedar Accents"],
      completionDate: "2023-05-18",
      imageUrl: "https://alpinepeakroofing.com/portfolio/cherry-hills-estate.jpg"
    }
  ]
  
  const portfolioProjects = projects.length > 0 ? projects : defaultProjects
  
  const schema = {
    "@context": "https://schema.org",
    "@type": ["CreativeWork", "Collection"],
    "name": "Alpine Peak Roofing Portfolio",
    "description": "Showcase of premium mountain roofing projects across Colorado's most exclusive communities, featuring luxury residential, commercial resort, and historic preservation work.",
    "creator": {
      "@type": "Organization",
      "name": "Alpine Peak Roofing",
      "description": "Colorado's Premier Mountain Roofing Specialists"
    },
    
    // Portfolio Collection
    "hasPart": portfolioProjects.map((project, index) => ({
      "@type": "CreativeWork",
      "name": project.name,
      "description": project.description,
      "creator": {
        "@type": "Organization", 
        "name": "Alpine Peak Roofing"
      },
      "locationCreated": {
        "@type": "Place",
        "name": project.location,
        "addressRegion": "CO",
        "addressCountry": "US"
      },
      "dateCreated": project.completionDate,
      "category": project.projectType,
      "material": project.materials,
      "image": project.imageUrl,
      "position": index + 1,
      
      // Project Specifications
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Project Type",
          "value": project.projectType
        },
        {
          "@type": "PropertyValue",
          "name": "Materials Used",
          "value": project.materials.join(", ")
        },
        {
          "@type": "PropertyValue", 
          "name": "Completion Date",
          "value": project.completionDate
        },
        {
          "@type": "PropertyValue",
          "name": "Location",
          "value": project.location
        }
      ]
    })),
    
    // Portfolio Categories
    "about": [
      {
        "@type": "Service",
        "name": "Luxury Residential Roofing",
        "description": "Premium roofing for high-end mountain properties and estates"
      },
      {
        "@type": "Service",
        "name": "Commercial Resort Roofing", 
        "description": "Specialized roofing for luxury resorts and hospitality properties"
      },
      {
        "@type": "Service",
        "name": "Historic Preservation",
        "description": "Authentic restoration maintaining historical integrity"
      },
      {
        "@type": "Service",
        "name": "Sustainable Luxury Roofing",
        "description": "Eco-friendly premium roofing with solar integration"
      }
    ],
    
    // Performance Metrics
    "projectMetrics": {
      "@type": "PropertyValue",
      "name": "Portfolio Performance Statistics",
      "value": [
        {
          "@type": "PropertyValue",
          "name": "Total Projects Completed",
          "value": "500+",
          "description": "Premium mountain roofing projects since 2015"
        },
        {
          "@type": "PropertyValue",
          "name": "Average Project Value", 
          "value": "$75,000",
          "description": "Investment-grade roofing projects"
        },
        {
          "@type": "PropertyValue",
          "name": "Client Satisfaction Rate",
          "value": "98.7%",
          "description": "Customer satisfaction across all project types"
        },
        {
          "@type": "PropertyValue",
          "name": "Warranty Claim Rate",
          "value": "0.8%", 
          "description": "Industry-leading quality and reliability"
        },
        {
          "@type": "PropertyValue",
          "name": "Repeat Customer Rate",
          "value": "78%",
          "description": "Customers who hire us for additional properties"
        }
      ]
    },
    
    // Geographic Coverage
    "spatial": [
      {
        "@type": "Place",
        "name": "Aspen",
        "addressRegion": "CO",
        "description": "Luxury resort community projects"
      },
      {
        "@type": "Place",
        "name": "Vail",
        "addressRegion": "CO", 
        "description": "High-altitude resort and residential projects"
      },
      {
        "@type": "Place",
        "name": "Telluride",
        "addressRegion": "CO",
        "description": "Ultra-high altitude luxury properties"
      },
      {
        "@type": "Place",
        "name": "Crested Butte",
        "addressRegion": "CO",
        "description": "Historic preservation and extreme altitude work"
      },
      {
        "@type": "Place",
        "name": "Denver Metro Premium",
        "addressRegion": "CO",
        "description": "Luxury residential properties in premium neighborhoods"
      }
    ],
    
    // Technical Achievements
    "technicalAchievements": {
      "@type": "PropertyValue",
      "name": "Technical Project Achievements",
      "value": [
        {
          "@type": "PropertyValue",
          "name": "Highest Altitude Project",
          "value": "11,200 feet",
          "description": "Extreme altitude roofing installation in Crested Butte area"
        },
        {
          "@type": "PropertyValue", 
          "name": "Largest Single Project",
          "value": "85,000 sq ft",
          "description": "Commercial resort complex renovation"
        },
        {
          "@type": "PropertyValue",
          "name": "Oldest Historic Restoration",
          "value": "1875",
          "description": "Victorian-era mining building authentic restoration"
        },
        {
          "@type": "PropertyValue",
          "name": "Largest Solar Integration",
          "value": "45 kW system",
          "description": "Seamlessly integrated solar roofing installation"
        }
      ]
    },
    
    // Material Expertise Showcase
    "materialExpertise": {
      "@type": "PropertyValue",
      "name": "Premium Materials Portfolio",
      "value": [
        {
          "@type": "Product",
          "name": "Standing Seam Copper",
          "description": "European copper systems with 100+ year lifespan",
          "projectCount": "75+ projects"
        },
        {
          "@type": "Product",
          "name": "Natural Slate", 
          "description": "Welsh and Vermont slate installations",
          "projectCount": "45+ projects"
        },
        {
          "@type": "Product",
          "name": "Solar-Integrated Systems",
          "description": "Seamless solar panel integration with roofing",
          "projectCount": "125+ projects"
        },
        {
          "@type": "Product",
          "name": "Architectural Shingles",
          "description": "Premium designer collections", 
          "projectCount": "200+ projects"
        },
        {
          "@type": "Product",
          "name": "Cedar & Natural Materials",
          "description": "Sustainably sourced natural roofing materials",
          "projectCount": "85+ projects"
        }
      ]
    },
    
    // Awards & Recognition
    "recognition": [
      {
        "@type": "Award",
        "name": "Best Luxury Roofing Project 2023",
        "description": "Aspen Estate Copper Installation",
        "awardingOrganization": "Colorado Roofing Association"
      },
      {
        "@type": "Award",
        "name": "Historic Preservation Excellence 2022", 
        "description": "Crested Butte Mining Building Restoration",
        "awardingOrganization": "Colorado Historical Society"
      },
      {
        "@type": "Award",
        "name": "Sustainable Design Integration 2023",
        "description": "Telluride Solar-Integrated Home",
        "awardingOrganization": "Green Building Council of Colorado"
      }
    ],
    
    // Client Types
    "clientProfile": {
      "@type": "Audience",
      "audienceType": "Luxury Property Owners",
      "description": "High-net-worth individuals, resort operators, and commercial property managers",
      "geographicArea": "Colorado Mountain Communities and Denver Metro",
      "characteristics": [
        "Average project investment: $45,000-$150,000+",
        "Property types: Custom estates, luxury resorts, historic buildings",
        "Priorities: Quality, longevity, aesthetic integration",
        "Decision factors: Expertise, warranty, reputation"
      ]
    },
    
    // Portfolio Performance Guarantee
    "performanceGuarantee": {
      "@type": "Warranty",
      "warrantyPromise": "All portfolio projects backed by comprehensive warranties",
      "warrantyScope": "Materials, craftsmanship, and weather performance",
      "durationOfWarranty": "25-50 years depending on materials",
      "coverageArea": "Colorado statewide"
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