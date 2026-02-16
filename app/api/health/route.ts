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
  
  // Check leads table schema
  try {
    const { error } = await supabase
      .from('leads')
      .insert({
        first_name: '__health_check__',
        email: 'healthcheck@test.invalid'
      })
      .select()
      .single()
    
    // Delete the test record if it was created
    if (!error) {
      await supabase
        .from('leads')
        .delete()
        .eq('email', 'healthcheck@test.invalid')
      
      checks.push({
        name: 'leads_schema',
        status: 'healthy',
        message: 'Schema validated successfully'
      })
    } else if (error.message.includes('schema cache') || error.message.includes('column')) {
      checks.push({
        name: 'leads_schema',
        status: 'unhealthy',
        message: `Schema issue: ${error.message}. Run migration 005_fix_leads_columns.sql`
      })
    } else {
      // Other errors (like RLS) don't indicate schema problems
      checks.push({
        name: 'leads_schema',
        status: 'healthy',
        message: 'Schema appears valid (insert blocked by RLS or constraints)'
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
