import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

interface HealthCheck {
  name: string
  status: 'healthy' | 'degraded' | 'unhealthy'
  message?: string
  latencyMs?: number
}

export async function GET() {
  const checks: HealthCheck[] = []
  const startTime = Date.now()
  
  // Check Supabase connection
  try {
    const dbStart = Date.now()
    const { error } = await supabase.from('leads').select('count').limit(1)
    const latency = Date.now() - dbStart
    
    if (error) {
      checks.push({
        name: 'database',
        status: 'unhealthy',
        message: error.message,
        latencyMs: latency
      })
    } else {
      checks.push({
        name: 'database',
        status: 'healthy',
        latencyMs: latency
      })
    }
  } catch (err) {
    checks.push({
      name: 'database',
      status: 'unhealthy',
      message: err instanceof Error ? err.message : 'Connection failed'
    })
  }
  
  // Check leads table schema - detect which version is active
  try {
    // Probe for first_name column (new schema)
    const { error: probeErr } = await supabase
      .from('leads')
      .select('first_name')
      .limit(0)
    
    if (!probeErr) {
      checks.push({
        name: 'leads_schema',
        status: 'healthy',
        message: 'Full schema (first_name/last_name columns present)'
      })
    } else if (probeErr.message.includes('first_name') || probeErr.message.includes('schema cache')) {
      // Legacy schema - app handles this gracefully, not a hard failure
      checks.push({
        name: 'leads_schema',
        status: 'degraded',
        message: 'Legacy schema active - lead capture works but run migration 005_fix_leads_columns.sql for full features'
      })
    } else {
      checks.push({
        name: 'leads_schema',
        status: 'healthy',
        message: 'Schema appears valid'
      })
    }
  } catch (err) {
    checks.push({
      name: 'leads_schema',
      status: 'degraded',
      message: err instanceof Error ? err.message : 'Unable to validate schema'
    })
  }
  
  // Check n8n connectivity (just check env var exists)
  const n8nConfigured = !!process.env.N8N_WEBHOOK_URL
  checks.push({
    name: 'n8n',
    status: n8nConfigured ? 'healthy' : 'degraded',
    message: n8nConfigured ? 'Webhook URL configured' : 'N8N_WEBHOOK_URL not set'
  })
  
  const totalLatency = Date.now() - startTime
  const overallStatus = checks.some(c => c.status === 'unhealthy') 
    ? 'unhealthy' 
    : checks.some(c => c.status === 'degraded') 
      ? 'degraded' 
      : 'healthy'
  
  return NextResponse.json({
    status: overallStatus,
    timestamp: new Date().toISOString(),
    totalLatencyMs: totalLatency,
    checks
  }, {
    status: overallStatus === 'unhealthy' ? 503 : 200
  })
}
