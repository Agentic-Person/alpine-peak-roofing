// Advanced Schema Relationship Mapping System
// Creates interconnected schema relationships for better LLM comprehension

import React from 'react'

// Schema relationship types for LLM optimization
export interface SchemaRelationship {
  sourceType: string
  targetType: string
  relationship: string
  strength: 'strong' | 'medium' | 'weak'
  context: string[]
}

export interface EntityDisambiguation {
  entity: string
  type: string[]
  sameAs: string[]
  alternateName: string[]
  description: string
  relatedEntities: string[]
}

// Knowledge Graph Relationships for Alpine Peak Roofing
export const SCHEMA_RELATIONSHIPS: SchemaRelationship[] = [
  {
    sourceType: 'LocalBusiness',
    targetType: 'ServiceArea',
    relationship: 'servesArea',
    strength: 'strong',
    context: ['geographic', 'operational', 'market']
  },
  {
    sourceType: 'LocalBusiness',
    targetType: 'Service',
    relationship: 'offers',
    strength: 'strong',
    context: ['commercial', 'capability', 'expertise']
  },
  {
    sourceType: 'Service',
    targetType: 'Review',
    relationship: 'hasReview',
    strength: 'medium',
    context: ['quality', 'satisfaction', 'reputation']
  },
  {
    sourceType: 'LocalBusiness',
    targetType: 'Person',
    relationship: 'employee',
    strength: 'strong',
    context: ['team', 'expertise', 'credentials']
  },
  {
    sourceType: 'Service',
    targetType: 'Product',
    relationship: 'includesObject',
    strength: 'medium',
    context: ['materials', 'components', 'systems']
  },
  {
    sourceType: 'LocalBusiness',
    targetType: 'Event',
    relationship: 'organizer',
    strength: 'weak',
    context: ['community', 'education', 'marketing']
  },
  {
    sourceType: 'Service',
    targetType: 'FAQPage',
    relationship: 'subjectOf',
    strength: 'medium',
    context: ['information', 'education', 'support']
  },
  {
    sourceType: 'LocalBusiness',
    targetType: 'CreativeWork',
    relationship: 'creator',
    strength: 'medium',
    context: ['portfolio', 'case-studies', 'documentation']
  }
]

// Entity Disambiguation for Better AI Comprehension
export const ENTITY_DISAMBIGUATION: EntityDisambiguation[] = [
  {
    entity: 'Alpine Peak Roofing',
    type: ['LocalBusiness', 'RoofingContractor', 'Organization'],
    sameAs: ['https://alpinepeakroofing.com', 'Alpine Peak Roofing LLC'],
    alternateName: ['Alpine Peak', 'APR', 'Alpine Peak Roofing LLC'],
    description: 'Premium mountain roofing contractor specializing in high-altitude installations',
    relatedEntities: ['Colorado', 'Denver', 'Aspen', 'Vail', 'Telluride', 'Mountain Communities']
  },
  {
    entity: 'High-Altitude Roofing',
    type: ['Service', 'SpecializedService'],
    sameAs: ['Mountain Roofing', 'Elevation Roofing'],
    alternateName: ['Alpine Roofing', 'Mountain Peak Roofing', 'Extreme Elevation Roofing'],
    description: 'Specialized roofing techniques for properties above 8000 feet elevation',
    relatedEntities: ['Snow Load', 'Wind Resistance', 'UV Protection', 'Extreme Weather']
  },
  {
    entity: 'Sustainable Roofing',
    type: ['Service', 'GreenBusiness', 'EnvironmentalService'],
    sameAs: ['Eco-Friendly Roofing', 'Green Roofing'],
    alternateName: ['Environmental Roofing', 'LEED Roofing', 'Energy Efficient Roofing'],
    description: 'Environmentally conscious roofing solutions with energy efficiency focus',
    relatedEntities: ['Solar Integration', 'Energy Star', 'LEED Certification', 'Recycled Materials']
  },
  {
    entity: 'Emergency Roofing',
    type: ['Service', 'EmergencyService', '24HourService'],
    sameAs: ['Storm Damage Repair', 'Urgent Roofing'],
    alternateName: ['Crisis Roofing', 'Immediate Repair', 'Storm Response'],
    description: '24/7 emergency roofing services for storm damage and urgent repairs',
    relatedEntities: ['Storm Damage', 'Insurance Claims', 'Weather Events', 'Hail Damage']
  }
]

// Generate interconnected schema with relationships
export function generateInterconnectedSchema() {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@graph': []
  }

  // Add relationship mappings
  const relationships = SCHEMA_RELATIONSHIPS.map(rel => ({
    '@type': 'Relationship',
    'relationshipType': rel.relationship,
    'source': {
      '@type': rel.sourceType,
      'identifier': `alpine-peak-${rel.sourceType.toLowerCase()}`
    },
    'target': {
      '@type': rel.targetType,
      'identifier': `alpine-peak-${rel.targetType.toLowerCase()}`
    },
    'strength': rel.strength,
    'context': rel.context
  }))

  // Add entity disambiguation
  const entities = ENTITY_DISAMBIGUATION.map(entity => ({
    '@type': 'Thing',
    'name': entity.entity,
    'additionalType': entity.type,
    'sameAs': entity.sameAs,
    'alternateName': entity.alternateName,
    'description': entity.description,
    'relatedLink': entity.relatedEntities.map(related => ({
      '@type': 'Thing',
      'name': related
    }))
  }))

  baseSchema['@graph'] = [...relationships, ...entities]
  
  return baseSchema
}

// Knowledge Graph Component for Enhanced LLM Understanding
export default function SchemaRelationshipMapper({ 
  includeVisualDebug = false 
}: { 
  includeVisualDebug?: boolean 
}) {
  const interconnectedSchema = generateInterconnectedSchema()

  return (
    <>
      {/* Core Relationship Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(interconnectedSchema, null, 2)
        }}
      />
      
      {/* Entity Relationship Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Alpine Peak Roofing',
            'mainEntity': {
              '@type': 'LocalBusiness',
              'identifier': 'alpine-peak-main'
            },
            'subOrganization': [
              {
                '@type': 'BusinessFunction',
                'name': 'High-Altitude Roofing Division',
                'parentOrganization': { '@id': 'alpine-peak-main' }
              },
              {
                '@type': 'BusinessFunction', 
                'name': 'Sustainable Solutions Division',
                'parentOrganization': { '@id': 'alpine-peak-main' }
              },
              {
                '@type': 'BusinessFunction',
                'name': 'Emergency Services Division', 
                'parentOrganization': { '@id': 'alpine-peak-main' }
              }
            ],
            'knowsAbout': [
              'High-Altitude Construction',
              'Mountain Weather Systems',
              'Snow Load Engineering',
              'Sustainable Building Practices',
              'Emergency Storm Response',
              'Luxury Property Maintenance'
            ],
            'expertise': [
              {
                '@type': 'ExpertiseArea',
                'name': 'Mountain Roofing Systems',
                'expertiseLevel': 'Expert'
              },
              {
                '@type': 'ExpertiseArea', 
                'name': 'Extreme Weather Solutions',
                'expertiseLevel': 'Expert'
              },
              {
                '@type': 'ExpertiseArea',
                'name': 'Sustainable Construction',
                'expertiseLevel': 'Advanced'
              }
            ]
          }, null, 2)
        }}
      />

      {/* Contextual Relationships for AI Understanding */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'about': {
              '@type': 'Thing',
              'name': 'Mountain Roofing Industry',
              'description': 'Specialized roofing services for high-altitude and extreme weather conditions'
            },
            'mentions': ENTITY_DISAMBIGUATION.map(entity => ({
              '@type': 'Thing',
              'name': entity.entity,
              'description': entity.description,
              'category': entity.type[0]
            })),
            'potentialAction': [
              {
                '@type': 'SearchAction',
                'target': 'https://alpinepeakroofing.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              },
              {
                '@type': 'ContactAction',
                'target': 'https://alpinepeakroofing.com/contact',
                'name': 'Get Roofing Quote'
              }
            ]
          }, null, 2)
        }}
      />

      {/* Development Debug Panel */}
      {includeVisualDebug && process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-xs font-mono z-50 max-w-md max-h-96 overflow-auto">
          <h3 className="font-bold text-sm mb-2">Schema Relationships Debug</h3>
          <div className="space-y-2">
            <div>
              <strong>Entities:</strong> {ENTITY_DISAMBIGUATION.length}
            </div>
            <div>
              <strong>Relationships:</strong> {SCHEMA_RELATIONSHIPS.length}
            </div>
            <div>
              <strong>Knowledge Graph Nodes:</strong> {interconnectedSchema['@graph'].length}
            </div>
          </div>
          
          <details className="mt-3">
            <summary className="cursor-pointer font-semibold">View Relationships</summary>
            <ul className="mt-2 space-y-1 text-xs">
              {SCHEMA_RELATIONSHIPS.map((rel, idx) => (
                <li key={idx} className="text-blue-600">
                  {rel.sourceType} →({rel.relationship})→ {rel.targetType}
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </>
  )
}

// Utility function to get related entities for a given entity
export function getRelatedEntities(entityName: string): string[] {
  const entity = ENTITY_DISAMBIGUATION.find(e => 
    e.entity === entityName || 
    e.alternateName.includes(entityName) ||
    e.sameAs.includes(entityName)
  )
  
  return entity ? entity.relatedEntities : []
}

// Utility function to find schema relationships for a type
export function getSchemaRelationships(schemaType: string): SchemaRelationship[] {
  return SCHEMA_RELATIONSHIPS.filter(rel => 
    rel.sourceType === schemaType || rel.targetType === schemaType
  )
}