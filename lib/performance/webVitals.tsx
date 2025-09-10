'use client'

import React from 'react'

// Simplified web vitals interface - no external dependencies
export interface VitalsScore {
  cls: number
  fid: number
  fcp: number
  lcp: number
  ttfb: number
}

// Placeholder component - can be enhanced later with proper web-vitals integration
export function WebVitalsMonitor() {
  return null // No-op for now
}

// Export a noop function for any legacy references
export function reportWebVitals(metric: any) {
  // No-op - can be implemented with proper web-vitals package later
}

export default WebVitalsMonitor