import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface ChatRequest {
  session_id: string
  message: string
  context?: {
    page?: string
    user_agent?: string
    referrer?: string
    conversation_history?: any[]
    user_info?: {
      name?: string
      email?: string
      phone?: string
    }
  }
}

const ALPINE_PEAK_SYSTEM_PROMPT = `You are an AI assistant for Alpine Peak Roofing, a premium roofing contractor serving the Denver metro area and surrounding regions. Our motto is "Pinnacle of Protection, Peak of Performance."

COMPANY OVERVIEW:
- Location: Denver metro area and surrounding regions
- Services: Residential and commercial roofing installations, repairs, storm damage restoration
- Specialties: Asphalt shingles, metal roofing, tile systems, emergency services
- Experience: Over 15 years in business
- Status: Fully licensed, insured, and bonded

KEY SERVICES & PRICING:
- Roof Inspections: FREE comprehensive inspections
- Asphalt Shingle Replacement: $8,500-$15,000 for typical 2,000 sq ft home
- Metal Roofing: $12,000-$25,000 for same size home
- Emergency Repairs: 24/7 emergency response available
- Storm Damage: Insurance claim assistance provided
- Financing: 0% interest options for qualified homeowners

RESPONSE GUIDELINES:
- Be helpful, professional, and knowledgeable about roofing
- Always offer free inspections for serious inquiries
- For pricing questions, give ranges and offer detailed estimates
- For emergencies, emphasize 24/7 availability and quick response
- Mention our motto when appropriate
- Ask qualifying questions to understand customer needs
- Provide actionable next steps (inspection, estimate, emergency service)

TONE: Professional but approachable, confident in expertise, focused on helping customers protect their homes.`

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    console.log('OpenAI API: Processing message:', body.message)
    
    if (!body.session_id || !body.message) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: session_id or message'
      }, { status: 400 })
    }

    // Build conversation context for OpenAI
    const messages = [
      {
        role: 'system' as const,
        content: ALPINE_PEAK_SYSTEM_PROMPT
      },
      {
        role: 'user' as const,
        content: body.message
      }
    ]

    // Add conversation history if available
    if (body.context?.conversation_history && Array.isArray(body.context.conversation_history)) {
      const historyMessages = body.context.conversation_history
        .slice(-6) // Only include last 6 messages to avoid token limits
        .map((msg: any) => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        }))
      
      // Insert history before the current message
      messages.splice(1, 0, ...historyMessages)
    }

    console.log('OpenAI API: Sending request with', messages.length, 'messages')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 300,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || 'I apologize, but I encountered an issue processing your message. Please try again.'

    // Analyze message for lead scoring
    const messageLower = body.message.toLowerCase()
    let lead_score = 0
    let is_hot_lead = false
    let next_action = 'continue_conversation'

    // Lead scoring logic
    if (messageLower.includes('estimate') || messageLower.includes('quote') || messageLower.includes('price')) {
      lead_score = 85
      is_hot_lead = true
      next_action = 'schedule_estimate'
    } else if (messageLower.includes('emergency') || messageLower.includes('urgent') || messageLower.includes('leak')) {
      lead_score = 95
      is_hot_lead = true
      next_action = 'emergency_response'
    } else if (messageLower.includes('schedule') || messageLower.includes('appointment') || messageLower.includes('inspection')) {
      lead_score = 75
      is_hot_lead = true
      next_action = 'schedule_inspection'
    } else if (messageLower.includes('material') || messageLower.includes('shingle') || messageLower.includes('warranty')) {
      lead_score = 45
      next_action = 'provide_info'
    } else {
      lead_score = 25
    }

    // Generate quick actions based on intent
    const quick_actions = []
    if (lead_score >= 70) {
      quick_actions.push(
        { id: 'schedule', label: 'Schedule Free Inspection', action: 'send_message', value: 'I would like to schedule a free inspection' },
        { id: 'estimate', label: 'Get Estimate', action: 'send_message', value: 'Can you provide me with an estimate?' }
      )
    } else {
      quick_actions.push(
        { id: 'services', label: 'Our Services', action: 'send_message', value: 'Tell me about your roofing services' },
        { id: 'materials', label: 'Roofing Materials', action: 'send_message', value: 'What roofing materials do you recommend?' },
        { id: 'inspection', label: 'Free Inspection', action: 'send_message', value: 'How does the free inspection work?' }
      )
    }

    console.log('OpenAI API: Response generated successfully, lead_score:', lead_score)

    return NextResponse.json({
      success: true,
      response,
      lead_score,
      is_hot_lead,
      next_action,
      session_id: body.session_id,
      quick_actions,
      source: 'openai_direct'
    })

  } catch (error) {
    console.error('OpenAI API error:', error)
    
    return NextResponse.json({
      success: false,
      response: 'I apologize, but I encountered a technical issue. Please try again in a moment.',
      error: (error as Error).message,
      session_id: 'error'
    }, { status: 500 })
  }
}