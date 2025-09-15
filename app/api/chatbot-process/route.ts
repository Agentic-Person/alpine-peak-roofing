import { NextRequest, NextResponse } from 'next/server'
import { n8nClient } from '@/lib/n8n/client'

interface ChatbotProcessRequest {
  session_id: string
  message: string
  context?: {
    page?: string
    user_agent?: string
    referrer?: string
    conversation_history?: any[]
    user_info?: Record<string, any>
    session_start?: string
    last_activity?: string
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const body: ChatbotProcessRequest = await request.json()
    const { session_id, message, context } = body

    console.log('Chatbot Process API: Processing message for session:', session_id)
    console.log('Message preview:', message?.substring(0, 50) + '...')

    if (!session_id || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: session_id, message',
          session_id: session_id || 'unknown',
          processing_time_ms: Date.now() - startTime
        },
        { status: 400 }
      )
    }

    try {
      // Process the message through n8n workflow
      console.log('Calling n8n workflow...')
      const result = await n8nClient.processChatMessage(session_id, message, context || {})
      console.log('n8n workflow completed successfully')

      // Normalize the response format
      const normalizedResult = {
        success: true,
        response: result.response || result.message || 'I received your message.',
        lead_score: result.lead_score || result.leadScore || 0,
        is_hot_lead: result.is_hot_lead || result.isHotLead || false,
        requires_human: result.requires_human || result.requiresHuman || false,
        is_emergency: result.is_emergency || result.isEmergency || false,
        next_action: result.next_action || result.nextAction || 'continue_conversation',
        quick_actions: result.quick_actions || result.quickActions || [],
        session_id: session_id,
        metadata: {
          processing_time_ms: Date.now() - startTime,
          n8n_status: 'success',
          workflow_version: result.version || '1.0'
        }
      }

      return NextResponse.json(normalizedResult)

    } catch (n8nError) {
      console.error('n8n workflow failed:', n8nError)

      // Return graceful error response
      return NextResponse.json({
        success: false,
        response: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
        session_id: session_id,
        error: n8nError instanceof Error ? n8nError.message : 'n8n workflow failed',
        metadata: {
          processing_time_ms: Date.now() - startTime,
          n8n_status: n8nError instanceof Error && n8nError.message.includes('timeout') ? 'timeout' : 'error'
        }
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Chatbot process API error:', error)

    return NextResponse.json(
      {
        success: false,
        response: 'I encountered an unexpected error. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
        session_id: 'unknown',
        metadata: {
          processing_time_ms: Date.now() - startTime,
          n8n_status: 'api_error'
        }
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'operational',
    service: 'alpine-peak-chatbot-process',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    n8n_configured: !!(process.env.N8N_WEBHOOK_URL),
    endpoints: {
      POST: {
        description: 'Process chatbot messages through n8n workflow',
        required_fields: ['session_id', 'message'],
        optional_fields: ['context'],
        response_format: {
          success: 'boolean',
          response: 'string',
          lead_score: 'number',
          session_id: 'string',
          metadata: 'object'
        }
      }
    },
    health: {
      webhook_url: process.env.N8N_WEBHOOK_URL ? 'configured' : 'missing',
      api_key: process.env.N8N_API_KEY ? 'configured' : 'missing'
    }
  })
}