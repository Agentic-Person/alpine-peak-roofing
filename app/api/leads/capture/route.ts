import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import { n8nClient } from '@/lib/n8n/client'

interface LeadData {
  sessionId?: string
  source?: string
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
}

function calculateLeadScore(leadData: LeadData): number {
  let score = 0

  // Contact completeness (30 points max)
  if (leadData.email) score += 15
  if (leadData.phone) score += 15

  // Project details (40 points max)
  if (leadData.projectType) score += 10
  if (leadData.address) score += 15
  if (leadData.timeline) score += 10
  if (leadData.budgetRange) score += 5

  // Engagement level (30 points max)
  if (leadData.firstName && leadData.lastName) score += 10
  if (leadData.propertyType) score += 10
  if (leadData.sessionId) score += 10 // Engaged with chatbot

  return Math.min(score, 100)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LeadData
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1'
    const userAgent = request.headers.get('user-agent') || ''

    // Calculate lead score
    const leadScore = calculateLeadScore(body)

    // Determine priority based on score
    let priority = 'low'
    if (leadScore >= 80) priority = 'high'
    else if (leadScore >= 50) priority = 'medium'

    // Create lead in database
    const { data: lead, error } = await supabase
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

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    // Log lead activity
    if (lead) {
      await supabase
        .from('lead_activities')
        .insert({
          lead_id: lead.id,
          activity_type: 'lead_created',
          description: 'Lead captured from website',
          data: { source: body.source, score: leadScore }
        })
    }

    // Trigger n8n lead processing workflow
    try {
      await n8nClient.processLead({
        leadId: lead?.id,
        ...body,
        leadScore,
        priority,
        timestamp: new Date().toISOString()
      })
    } catch (n8nError) {
      console.error('n8n lead processing failed:', n8nError)
      // Don't fail the entire request if n8n is down
    }

    return NextResponse.json({
      success: true,
      data: {
        leadId: lead?.id,
        leadScore,
        priority,
        message: 'Lead captured successfully'
      }
    })

  } catch (error) {
    console.error('Lead capture error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to capture lead',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Lead capture endpoint is active',
    methods: ['POST'],
    requiredFields: ['email or phone'],
    optionalFields: [
      'sessionId', 'source', 'firstName', 'lastName', 
      'address', 'propertyType', 'projectType', 'timeline', 
      'budgetRange', 'utmSource', 'utmMedium', 'utmCampaign'
    ]
  })
}