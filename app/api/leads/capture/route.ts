import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEstimateGateEmail, sendLeadNotification } from '@/lib/email'
import { alertHotLead } from '@/lib/alerts'

// Use service role for schema-resilient inserts
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error('Missing Supabase env vars')
  return createClient(url, serviceKey)
}

interface LeadData {
  sessionId?: string
  source?: string
  type?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  propertyType?: string
  projectType?: string
  timeline?: string
  budgetRange?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  message?: string
}

function calculateLeadScore(leadData: LeadData): number {
  let score = 0
  if (leadData.email) score += 15
  if (leadData.phone) score += 15
  if (leadData.projectType) score += 10
  if (leadData.address) score += 15
  if (leadData.timeline) score += 10
  if (leadData.budgetRange) score += 5
  if (leadData.firstName && leadData.lastName) score += 10
  if (leadData.propertyType) score += 10
  if (leadData.sessionId) score += 10
  return Math.min(score, 100)
}

// Detect schema by checking for first_name column existence
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function detectSchema(supabase: any): Promise<'new' | 'legacy'> {
  const { error } = await supabase.from('leads').select('first_name').limit(0)
  if (error && (error.message.includes('first_name') || error.message.includes('schema cache'))) {
    return 'legacy'
  }
  return 'new'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LeadData
    const clientIP = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'
    const userAgent = request.headers.get('user-agent') || ''

    const leadScore = calculateLeadScore(body)
    let priority = 'low'
    if (leadScore >= 80) priority = 'high'
    else if (leadScore >= 50) priority = 'medium'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = getAdminClient() as any

    // Detect which schema is active
    const schema = await detectSchema(supabase)
    console.log('leads table schema detected:', schema)

    let lead: Record<string, unknown> | null = null
    let insertError: { message: string } | null = null

    if (schema === 'new') {
      // Full schema with all columns
      const { data, error } = await supabase
        .from('leads')
        .insert({
          session_id: body.sessionId,
          source: body.source || 'website',
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          phone: body.phone,
          address: body.address,
          property_type: body.propertyType || 'residential',
          project_type: body.projectType,
          timeline: body.timeline,
          budget_range: body.budgetRange,
          lead_score: leadScore,
          priority,
          utm_source: body.utmSource,
          utm_medium: body.utmMedium,
          utm_campaign: body.utmCampaign,
          ip_address: clientIP,
          user_agent: userAgent,
          status: 'new'
        })
        .select()
        .single()
      lead = data
      insertError = error
    } else {
      // Legacy schema: id, email, name, phone, session_id, lead_score, lead_source, intent, priority
      // Constraints: lead_source IN ('text_chatbot'), intent IN ('contact_sharing','general','scheduling')
      //              priority IN ('high','normal')
      const fullName = [body.firstName, body.lastName].filter(Boolean).join(' ') || null
      const sessionId = body.sessionId || `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

      // Map to allowed constraint values
      const legacyPriority = leadScore >= 70 ? 'high' : 'normal'
      const legacyIntent: 'contact_sharing' | 'general' | 'scheduling' =
        body.source?.includes('contact') ? 'contact_sharing' :
        body.projectType?.includes('schedul') || body.timeline ? 'scheduling' :
        'general'

      const { data, error } = await supabase
        .from('leads')
        .insert({
          email: body.email,
          name: fullName,
          phone: body.phone,
          session_id: sessionId,
          lead_score: leadScore,
          lead_source: 'text_chatbot', // only allowed value in current schema
          intent: legacyIntent,
          priority: legacyPriority
        })
        .select()
        .single()
      lead = data
      insertError = error
    }

    if (insertError) {
      throw new Error(`Database error: ${insertError.message}`)
    }

    // Log lead activity (if lead_activities table exists)
    if (lead?.id) {
      const { error: actErr } = await supabase
        .from('lead_activities')
        .insert({
          lead_id: lead.id,
          activity_type: 'lead_created',
          description: `Lead captured from ${body.source || 'website'} (schema: ${schema})`,
          data: { source: body.source, score: leadScore }
        })
      if (actErr) console.warn('lead_activities insert skipped:', actErr.message)
    }

    // ── Send emails (fire-and-forget, non-blocking) ──────────────────────────
    if (body.email) {
      // Welcome/gate email to the lead
      if (body.source === 'estimate_modal' || body.type === 'email_gate') {
        sendEstimateGateEmail(body.email).catch(err =>
          console.warn('[email] estimate gate email failed:', err)
        )
      }

      // Internal team email notification for every lead
      sendLeadNotification({
        email:      body.email,
        firstName:  body.firstName,
        lastName:   body.lastName,
        phone:      body.phone,
        address:    body.address,
        source:     body.source,
        leadScore,
        priority,
      }).catch(err => console.warn('[email] lead notification failed:', err))

      // Hot lead multi-channel alert (SMS + Emily + outbound call) — fire and forget
      alertHotLead({
        email:      body.email,
        firstName:  body.firstName,
        lastName:   body.lastName,
        phone:      body.phone,
        address:    body.address,
        source:     body.source,
        leadScore,
        priority,
        leadId:     lead?.id as string | undefined,
      }).catch(err => console.warn('[alert] hot lead alert failed:', err))
    }

    // Trigger n8n lead processing (fire-and-forget)
    const n8nUrl = process.env.N8N_WEBHOOK_LEAD_CAPTURE || process.env.N8N_WEBHOOK_URL
    if (n8nUrl && n8nUrl.startsWith('http')) {
      fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead?.id,
          ...body,
          leadScore,
          priority,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.warn('n8n webhook failed:', err.message))
    }

    return NextResponse.json({
      success: true,
      data: {
        leadId: lead?.id,
        leadScore,
        priority,
        message: 'Lead captured successfully',
        schema
      }
    })

  } catch (error) {
    console.error('Lead capture error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Failed to capture lead',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const checkSchema = request.nextUrl.searchParams.get('check') === 'schema'

  if (checkSchema) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabase = getAdminClient() as any
      const schema = await detectSchema(supabase)
      return NextResponse.json({
        status: 'ok',
        schema,
        message: schema === 'new'
          ? 'Full schema with first_name/last_name columns'
          : 'Legacy schema - run migration 005_fix_leads_columns.sql to upgrade'
      })
    } catch (err) {
      return NextResponse.json({
        status: 'error',
        error: err instanceof Error ? err.message : 'Unknown error'
      }, { status: 500 })
    }
  }

  return NextResponse.json({
    message: 'Lead capture endpoint is active',
    methods: ['POST'],
    requiredFields: ['email or phone'],
    optionalFields: [
      'sessionId', 'source', 'firstName', 'lastName',
      'address', 'propertyType', 'projectType', 'timeline',
      'budgetRange', 'utmSource', 'utmMedium', 'utmCampaign',
      'message'
    ],
    healthCheck: 'Add ?check=schema to verify table schema'
  })
}
