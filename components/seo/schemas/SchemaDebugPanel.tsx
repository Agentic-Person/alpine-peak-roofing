'use client'

import React from 'react'
import { SCHEMA_RELATIONSHIPS, ENTITY_DISAMBIGUATION, generateInterconnectedSchema } from './SchemaRelationshipMapper'

// Development Debug Panel Component
export default function SchemaDebugPanel() {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const interconnectedSchema = generateInterconnectedSchema()

  return (
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
  )
}