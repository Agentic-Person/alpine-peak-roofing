'use client'

import React from 'react'
import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals'

// Performance monitoring and Core Web Vitals tracking
export interface VitalsScore {
  cls: number
  fid: number
  fcp: number
  lcp: number
  ttfb: number
  timestamp: number
  url: string
}

class PerformanceMonitor {
  private vitals: Partial<VitalsScore> = {}
  private callbacks: Array<(vitals: VitalsScore) => void> = []
  
  constructor() {
    this.initializeVitalsCollection()
  }
  
  private initializeVitalsCollection() {
    const handleMetric = (metric: Metric) => {
      this.vitals[metric.name as keyof VitalsScore] = metric.value
      
      // If we have all vitals, report them
      if (this.hasAllVitals()) {
        const completeVitals: VitalsScore = {
          cls: this.vitals.cls || 0,
          fid: this.vitals.fid || 0,
          fcp: this.vitals.fcp || 0,
          lcp: this.vitals.lcp || 0,
          ttfb: this.vitals.ttfb || 0,
          timestamp: Date.now(),
          url: window.location.pathname
        }
        
        this.callbacks.forEach(callback => callback(completeVitals))
        this.reportToAnalytics(completeVitals)
      }
    }
    
    // Initialize all vitals collection
    getCLS(handleMetric)
    getFID(handleMetric)
    getFCP(handleMetric)
    getLCP(handleMetric)
    getTTFB(handleMetric)
  }
  
  private hasAllVitals(): boolean {
    return !!(
      typeof this.vitals.cls === 'number' &&
      typeof this.vitals.fid === 'number' &&
      typeof this.vitals.fcp === 'number' &&
      typeof this.vitals.lcp === 'number' &&
      typeof this.vitals.ttfb === 'number'
    )
  }
  
  private async reportToAnalytics(vitals: VitalsScore) {
    try {
      // Send to analytics endpoint
      await fetch('/api/analytics/vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vitals),
      })
    } catch (error) {
      console.warn('Failed to report vitals:', error)
    }
  }
  
  public onVitalsReady(callback: (vitals: VitalsScore) => void) {
    this.callbacks.push(callback)
  }
  
  public getVitalsScore(): { score: number; grade: string; recommendations: string[] } {
    if (!this.hasAllVitals()) {
      return { score: 0, grade: 'N/A', recommendations: [] }
    }
    
    const scores = {
      lcp: this.vitals.lcp! <= 2500 ? 100 : this.vitals.lcp! <= 4000 ? 75 : 25,
      fid: this.vitals.fid! <= 100 ? 100 : this.vitals.fid! <= 300 ? 75 : 25,
      cls: this.vitals.cls! <= 0.1 ? 100 : this.vitals.cls! <= 0.25 ? 75 : 25,
      fcp: this.vitals.fcp! <= 1800 ? 100 : this.vitals.fcp! <= 3000 ? 75 : 25,
      ttfb: this.vitals.ttfb! <= 800 ? 100 : this.vitals.ttfb! <= 1800 ? 75 : 25,
    }
    
    const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / 5
    
    const grade = avgScore >= 90 ? 'A' : avgScore >= 80 ? 'B' : avgScore >= 70 ? 'C' : 'D'
    
    const recommendations = this.generateRecommendations(scores)
    
    return { score: Math.round(avgScore), grade, recommendations }
  }
  
  private generateRecommendations(scores: Record<string, number>): string[] {
    const recommendations: string[] = []
    
    if (scores.lcp < 75) {
      recommendations.push('Optimize Largest Contentful Paint: Use image optimization, preload critical resources')
    }
    if (scores.fid < 75) {
      recommendations.push('Reduce First Input Delay: Minimize main thread work, split long tasks')
    }
    if (scores.cls < 75) {
      recommendations.push('Fix Cumulative Layout Shift: Set image dimensions, avoid dynamic content insertion')
    }
    if (scores.fcp < 75) {
      recommendations.push('Improve First Contentful Paint: Reduce server response time, eliminate render-blocking resources')
    }
    if (scores.ttfb < 75) {
      recommendations.push('Optimize Time to First Byte: Use CDN, optimize server response, reduce redirects')
    }
    
    return recommendations
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null

export function getPerformanceMonitor(): PerformanceMonitor {
  if (typeof window === 'undefined') {
    // Return a no-op for server-side rendering
    return {
      onVitalsReady: () => {},
      getVitalsScore: () => ({ score: 0, grade: 'N/A', recommendations: [] })
    } as PerformanceMonitor
  }
  
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor()
  }
  
  return performanceMonitor
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const [vitals, setVitals] = React.useState<VitalsScore | null>(null)
  const [score, setScore] = React.useState<{ score: number; grade: string; recommendations: string[] } | null>(null)
  
  React.useEffect(() => {
    const monitor = getPerformanceMonitor()
    
    monitor.onVitalsReady((vitalsData) => {
      setVitals(vitalsData)
      setScore(monitor.getVitalsScore())
    })
  }, [])
  
  return { vitals, score }
}

// Component for displaying performance metrics in development
export function PerformanceDashboard() {
  const { vitals, score } = usePerformanceMonitor()
  
  if (process.env.NODE_ENV !== 'development' || !vitals || !score) {
    return null
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-sm font-mono z-50 max-w-sm">
      <h3 className="font-bold text-lg mb-2">Performance Score: {score.grade} ({score.score}/100)</h3>
      
      <div className="space-y-1 mb-3">
        <div>LCP: {vitals.lcp.toFixed(0)}ms</div>
        <div>FID: {vitals.fid.toFixed(0)}ms</div>
        <div>CLS: {vitals.cls.toFixed(3)}</div>
        <div>FCP: {vitals.fcp.toFixed(0)}ms</div>
        <div>TTFB: {vitals.ttfb.toFixed(0)}ms</div>
      </div>
      
      {score.recommendations.length > 0 && (
        <div>
          <h4 className="font-semibold mb-1">Recommendations:</h4>
          <ul className="text-xs space-y-1">
            {score.recommendations.map((rec, index) => (
              <li key={index} className="text-orange-600">• {rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}