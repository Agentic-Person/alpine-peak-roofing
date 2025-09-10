// Schema Relationship Mapper for AI Comprehension Enhancement
// Provides interconnected schema relationships for LLM-first SEO optimization

export interface SchemaRelationship {
  sourceType: string
  relationship: string
  targetType: string
  context: string
}

export interface EntityDisambiguation {
  entityType: string
  identifier: string
  alternateNames: string[]
  context: string
}

// Define entity disambiguation for AI understanding
export const ENTITY_DISAMBIGUATION: EntityDisambiguation[] = [
  {
    entityType: "LocalBusiness",
    identifier: "alpine-peak-roofing",
    alternateNames: ["Alpine Peak Roofing", "Alpine Peak", "APR"],
    context: "Premium mountain roofing contractor in Colorado"
  },
  {
    entityType: "ServiceArea",
    identifier: "colorado-mountains",
    alternateNames: ["Colorado High Country", "Colorado Rockies", "Mountain Communities"],
    context: "Geographic service region including luxury resort towns"
  },
  {
    entityType: "PremiumService",
    identifier: "luxury-roofing",
    alternateNames: ["Premium Roofing", "High-End Roofing", "Luxury Home Roofing"],
    context: "Exclusive roofing services for premium properties"
  },
  {
    entityType: "SustainabilityPractice",
    identifier: "green-roofing",
    alternateNames: ["Eco-Friendly Roofing", "Sustainable Roofing", "Green Building"],
    context: "Environmentally responsible roofing practices"
  },
  {
    entityType: "EmergencyService",
    identifier: "24-7-response",
    alternateNames: ["Emergency Roofing", "Storm Response", "Urgent Repair"],
    context: "Round-the-clock emergency roofing services"
  }
]

// Define schema relationships for knowledge graph construction
export const SCHEMA_RELATIONSHIPS: SchemaRelationship[] = [
  {
    sourceType: "LocalBusiness",
    relationship: "offersService",
    targetType: "PremiumService",
    context: "Alpine Peak Roofing offers premium mountain roofing services"
  },
  {
    sourceType: "LocalBusiness",
    relationship: "serviceArea",
    targetType: "ServiceArea",
    context: "Business operates in Colorado mountain communities"
  },
  {
    sourceType: "LocalBusiness",
    relationship: "hasCredential",
    targetType: "SustainabilityPractice",
    context: "Business certified in sustainable roofing practices"
  },
  {
    sourceType: "LocalBusiness",
    relationship: "providesService",
    targetType: "EmergencyService",
    context: "Business provides 24/7 emergency response"
  },
  {
    sourceType: "PremiumService",
    relationship: "availableAtLocation",
    targetType: "ServiceArea",
    context: "Premium services available in luxury mountain communities"
  },
  {
    sourceType: "PremiumService",
    relationship: "incorporates",
    targetType: "SustainabilityPractice",
    context: "Premium services include sustainable materials and practices"
  },
  {
    sourceType: "EmergencyService",
    relationship: "covers",
    targetType: "ServiceArea",
    context: "Emergency response covers all mountain service areas"
  },
  {
    sourceType: "SustainabilityPractice",
    relationship: "enhances",
    targetType: "PremiumService",
    context: "Sustainable practices add value to premium offerings"
  },
  {
    sourceType: "ServiceArea",
    relationship: "requires",
    targetType: "EmergencyService",
    context: "Mountain locations require specialized emergency response"
  },
  {
    sourceType: "ServiceArea",
    relationship: "benefits",
    targetType: "SustainabilityPractice",
    context: "Mountain environments benefit from sustainable practices"
  }
]

// Generate interconnected schema for enhanced AI understanding
export function generateInterconnectedSchema() {
  const knowledgeGraph = {
    "@context": "https://schema.org",
    "@type": "KnowledgeGraph",
    "@graph": [
      // Primary business entity with relationships
      {
        "@type": ["LocalBusiness", "RoofingContractor", "GreenBusiness"],
        "@id": "https://alpinepeakroofing.com/#business",
        "name": "Alpine Peak Roofing",
        "alternateName": ["Alpine Peak", "APR"],
        "description": "Premium mountain roofing contractor specializing in high-altitude installations and sustainable practices",
        "sameAs": [
          "https://alpinepeakroofing.com",
          "https://www.linkedin.com/company/alpine-peak-roofing",
          "https://www.facebook.com/alpinepeakroofing"
        ],
        "offersService": {
          "@id": "https://alpinepeakroofing.com/#premium-service"
        },
        "serviceArea": {
          "@id": "https://alpinepeakroofing.com/#service-area"
        },
        "hasCredential": {
          "@id": "https://alpinepeakroofing.com/#sustainability-credential"
        }
      },
      
      // Service area entity with geographic context
      {
        "@type": "GeoShape",
        "@id": "https://alpinepeakroofing.com/#service-area",
        "name": "Colorado Mountain Service Area",
        "alternateName": ["Colorado High Country", "Mountain Communities"],
        "addressRegion": "Colorado",
        "addressCountry": "US",
        "description": "Luxury mountain communities including Aspen, Vail, Telluride, and surrounding resort areas",
        "geoContains": [
          {
            "@type": "City",
            "name": "Aspen",
            "addressRegion": "Colorado"
          },
          {
            "@type": "City", 
            "name": "Vail",
            "addressRegion": "Colorado"
          },
          {
            "@type": "City",
            "name": "Telluride", 
            "addressRegion": "Colorado"
          }
        ]
      },

      // Premium service entity with luxury positioning
      {
        "@type": ["Service", "ProfessionalService"],
        "@id": "https://alpinepeakroofing.com/#premium-service",
        "name": "Premium Mountain Roofing Services",
        "alternateName": ["Luxury Roofing", "High-End Roofing"],
        "description": "Specialized roofing services for luxury mountain properties with premium materials and craftsmanship",
        "serviceType": "Roofing Installation and Repair",
        "audience": {
          "@type": "Audience",
          "audienceType": "Luxury Property Owners"
        },
        "availableAtLocation": {
          "@id": "https://alpinepeakroofing.com/#service-area"
        }
      },

      // Sustainability credential entity
      {
        "@type": "EnvironmentalCredential",
        "@id": "https://alpinepeakroofing.com/#sustainability-credential",
        "name": "Sustainable Roofing Practices",
        "alternateName": ["Green Building", "Eco-Friendly Roofing"],
        "description": "Certified sustainable roofing practices including energy-efficient materials and waste reduction",
        "credentialCategory": "Environmental Sustainability",
        "recognizedBy": ["Energy Star", "LEED", "Green Building Council"]
      }
    ],
    
    // Relationship mappings for AI understanding
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": "https://alpinepeakroofing.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    ],
    
    // Semantic annotations for LLM comprehension
    "additionalType": [
      "https://alpinepeakroofing.com/ontology/MountainRoofingExpert",
      "https://alpinepeakroofing.com/ontology/LuxuryServiceProvider",
      "https://alpinepeakroofing.com/ontology/SustainabilityLeader"
    ]
  }

  return knowledgeGraph
}

// Export for use in other components
export function getSchemaRelationships() {
  return {
    relationships: SCHEMA_RELATIONSHIPS,
    entities: ENTITY_DISAMBIGUATION,
    knowledgeGraph: generateInterconnectedSchema()
  }
}

// Utility function to find related schemas
export function findRelatedSchemas(schemaType: string): SchemaRelationship[] {
  return SCHEMA_RELATIONSHIPS.filter(
    rel => rel.sourceType === schemaType || rel.targetType === schemaType
  )
}

// Utility function to get entity context
export function getEntityContext(entityType: string): EntityDisambiguation | undefined {
  return ENTITY_DISAMBIGUATION.find(entity => entity.entityType === entityType)
}