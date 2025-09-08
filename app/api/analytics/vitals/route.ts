import { NextRequest, NextResponse } from 'next/server'

export interface VitalsPayload {
  cls: number
  fid: number
  fcp: number
  lcp: number
  ttfb: number
  timestamp: number
  url: string
  userAgent?: string
  deviceType?: 'mobile' | 'desktop' | 'tablet'
  connection?: string
}

// Performance metrics storage (in production, use a database)
const performanceMetrics: VitalsPayload[] = []

export async function POST(request: NextRequest) {
  try {
    const vitals: VitalsPayload = await request.json()
    
    // Validate the payload
    if (!vitals || typeof vitals.cls === 'undefined' || typeof vitals.lcp === 'undefined') {
      return NextResponse.json(
        { error: 'Invalid vitals payload' },
        { status: 400 }
      )
    }

    // Enhance with request metadata
    const enhancedVitals: VitalsPayload = {
      ...vitals,
      userAgent: request.headers.get('user-agent') || undefined,
      deviceType: getDeviceType(request.headers.get('user-agent')),
      connection: request.headers.get('connection-type') || undefined,
      timestamp: vitals.timestamp || Date.now()
    }

    // Store metrics (in production, save to database)
    performanceMetrics.push(enhancedVitals)
    
    // Keep only last 1000 entries to prevent memory issues
    if (performanceMetrics.length > 1000) {
      performanceMetrics.splice(0, performanceMetrics.length - 1000)
    }

    // Analyze performance and generate insights
    const analysis = analyzePerformance(enhancedVitals)
    
    // Log critical performance issues
    if (analysis.criticalIssues.length > 0) {
      console.warn('Performance Critical Issues:', {
        url: vitals.url,
        issues: analysis.criticalIssues,
        timestamp: new Date(vitals.timestamp).toISOString()
      })
    }

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: Date.now()
    })
    
  } catch (error) {
    console.error('Error processing vitals:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const url = searchParams.get('url')
    
    // Filter metrics
    let filteredMetrics = performanceMetrics
    if (url) {
      filteredMetrics = performanceMetrics.filter(metric => 
        metric.url.includes(url)
      )
    }
    
    // Get recent metrics
    const recentMetrics = filteredMetrics
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit)
    
    // Calculate aggregate statistics
    const aggregateStats = calculateAggregateStats(filteredMetrics)
    
    return NextResponse.json({
      metrics: recentMetrics,
      count: filteredMetrics.length,
      aggregateStats,
      timestamp: Date.now()
    })
    
  } catch (error) {
    console.error('Error fetching vitals:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper Functions

function getDeviceType(userAgent: string | null): 'mobile' | 'desktop' | 'tablet' {
  if (!userAgent) return 'desktop'
  
  const ua = userAgent.toLowerCase()
  
  if (/tablet|ipad|playbook|silk/.test(ua)) {
    return 'tablet'
  }
  
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/.test(ua)) {
    return 'mobile'
  }
  
  return 'desktop'
}

function analyzePerformance(vitals: VitalsPayload) {
  const issues: string[] = []
  const recommendations: string[] = []
  const criticalIssues: string[] = []
  
  // Analyze LCP (Largest Contentful Paint)
  if (vitals.lcp > 4000) {
    criticalIssues.push('LCP exceeds 4s - critical performance issue')
    recommendations.push('Optimize images, preload critical resources, improve server response time')
  } else if (vitals.lcp > 2500) {
    issues.push('LCP exceeds 2.5s - needs improvement')
    recommendations.push('Consider image optimization and resource preloading')
  }
  
  // Analyze FID (First Input Delay)
  if (vitals.fid > 300) {
    criticalIssues.push('FID exceeds 300ms - poor interactivity')
    recommendations.push('Reduce JavaScript execution time, split large tasks')
  } else if (vitals.fid > 100) {
    issues.push('FID exceeds 100ms - could be more responsive')
    recommendations.push('Optimize JavaScript, consider code splitting')
  }
  
  // Analyze CLS (Cumulative Layout Shift)
  if (vitals.cls > 0.25) {
    criticalIssues.push('CLS exceeds 0.25 - severe layout instability')
    recommendations.push('Set image dimensions, avoid dynamic content injection')
  } else if (vitals.cls > 0.1) {
    issues.push('CLS exceeds 0.1 - some layout instability')
    recommendations.push('Review dynamic content loading, set explicit dimensions')
  }
  
  // Analyze FCP (First Contentful Paint)
  if (vitals.fcp > 3000) {
    issues.push('FCP exceeds 3s - slow initial rendering')
    recommendations.push('Optimize critical rendering path, reduce render-blocking resources')
  } else if (vitals.fcp > 1800) {
    issues.push('FCP exceeds 1.8s - could render faster')
    recommendations.push('Consider critical CSS inlining, optimize fonts')
  }
  
  // Analyze TTFB (Time to First Byte)
  if (vitals.ttfb > 1800) {
    issues.push('TTFB exceeds 1.8s - slow server response')
    recommendations.push('Optimize server performance, use CDN, reduce redirects')
  } else if (vitals.ttfb > 800) {
    issues.push('TTFB exceeds 800ms - room for server optimization')
    recommendations.push('Consider server-side caching, optimize database queries')
  }
  
  // Calculate overall score
  const lcpScore = vitals.lcp <= 2500 ? 100 : vitals.lcp <= 4000 ? 75 : 25
  const fidScore = vitals.fid <= 100 ? 100 : vitals.fid <= 300 ? 75 : 25
  const clsScore = vitals.cls <= 0.1 ? 100 : vitals.cls <= 0.25 ? 75 : 25
  const fcpScore = vitals.fcp <= 1800 ? 100 : vitals.fcp <= 3000 ? 75 : 25
  const ttfbScore = vitals.ttfb <= 800 ? 100 : vitals.ttfb <= 1800 ? 75 : 25
  
  const overallScore = Math.round((lcpScore + fidScore + clsScore + fcpScore + ttfbScore) / 5)
  const grade = overallScore >= 90 ? 'A' : overallScore >= 80 ? 'B' : overallScore >= 70 ? 'C' : 'D'
  
  return {
    overallScore,
    grade,
    issues,
    recommendations,
    criticalIssues,
    individualScores: {
      lcp: lcpScore,
      fid: fidScore,
      cls: clsScore,
      fcp: fcpScore,
      ttfb: ttfbScore
    }
  }
}

function calculateAggregateStats(metrics: VitalsPayload[]) {
  if (metrics.length === 0) {
    return {
      avgLCP: 0,
      avgFID: 0,
      avgCLS: 0,
      avgFCP: 0,
      avgTTFB: 0,
      p75LCP: 0,
      p75FID: 0,
      p75CLS: 0,
      medianScore: 0,
      deviceBreakdown: {}
    }
  }
  
  // Calculate averages
  const avgLCP = metrics.reduce((sum, m) => sum + m.lcp, 0) / metrics.length
  const avgFID = metrics.reduce((sum, m) => sum + m.fid, 0) / metrics.length  
  const avgCLS = metrics.reduce((sum, m) => sum + m.cls, 0) / metrics.length
  const avgFCP = metrics.reduce((sum, m) => sum + m.fcp, 0) / metrics.length
  const avgTTFB = metrics.reduce((sum, m) => sum + m.ttfb, 0) / metrics.length
  
  // Calculate 75th percentile (P75)
  const sortedLCP = [...metrics].sort((a, b) => a.lcp - b.lcp)
  const sortedFID = [...metrics].sort((a, b) => a.fid - b.fid)
  const sortedCLS = [...metrics].sort((a, b) => a.cls - b.cls)
  
  const p75Index = Math.floor(metrics.length * 0.75)
  const p75LCP = sortedLCP[p75Index]?.lcp || 0
  const p75FID = sortedFID[p75Index]?.fid || 0
  const p75CLS = sortedCLS[p75Index]?.cls || 0
  
  // Device breakdown
  const deviceBreakdown = metrics.reduce((acc, metric) => {
    const device = metric.deviceType || 'unknown'
    acc[device] = (acc[device] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  // Calculate median performance score
  const scores = metrics.map(m => analyzePerformance(m).overallScore).sort((a, b) => a - b)
  const medianScore = scores[Math.floor(scores.length / 2)] || 0
  
  return {
    avgLCP: Math.round(avgLCP),
    avgFID: Math.round(avgFID),
    avgCLS: Number(avgCLS.toFixed(3)),
    avgFCP: Math.round(avgFCP),
    avgTTFB: Math.round(avgTTFB),
    p75LCP: Math.round(p75LCP),
    p75FID: Math.round(p75FID),
    p75CLS: Number(p75CLS.toFixed(3)),
    medianScore,
    deviceBreakdown
  }
}